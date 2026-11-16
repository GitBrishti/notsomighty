import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { catalogRepository } from './repositories/mockCatalogRepository.js';
import { notFound, errorHandler } from './middleware/errors.js';

export function createApp({ repository = catalogRepository, allowedOrigins = ['http://localhost:5173'] } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin not allowed'));
  } }));
  app.use(express.json({ limit: '32kb' }));
  app.use('/api', rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: 'draft-7', legacyHeaders: false }));

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'notsomighty-api', mode: 'mock', database: 'not_connected' });
  });

  app.get('/api/categories', async (req, res, next) => {
    try { res.json({ data: await repository.listCategories() }); } catch (error) { next(error); }
  });
  app.get('/api/categories/:id', async (req, res, next) => {
    try {
      const category = await repository.findCategoryById(req.params.id);
      if (!category) return res.status(404).json({ error: { code: 'CATEGORY_NOT_FOUND', message: 'Category not found.' } });
      res.json({ data: category });
    } catch (error) { next(error); }
  });
  app.get('/api/products', async (req, res, next) => {
    try {
      const { category, featured, q } = req.query;
      if (Array.isArray(category) || Array.isArray(featured) || Array.isArray(q) ||
          (featured !== undefined && featured !== 'true' && featured !== 'false') ||
          (q !== undefined && (typeof q !== 'string' || q.length > 100))) {
        return res.status(400).json({ error: { code: 'INVALID_QUERY', message: 'Invalid product filters.' } });
      }
      const result = await repository.listProducts({ category, featured: featured === undefined ? undefined : featured === 'true', query: q?.trim() });
      res.json({ data: result, count: result.length });
    } catch (error) { next(error); }
  });
  app.get('/api/products/:id', async (req, res, next) => {
    try {
      const product = await repository.findProductById(req.params.id);
      if (!product) return res.status(404).json({ error: { code: 'PRODUCT_NOT_FOUND', message: 'Product not found.' } });
      res.json({ data: product });
    } catch (error) { next(error); }
  });

  // These endpoints intentionally never store orders, accept payments, or report success.
  const unavailable = (req, res) => res.status(503).json({ error: {
    code: 'CHECKOUT_NOT_AVAILABLE',
    message: 'Ordering and payments are not available until pricing, delivery rules, and the database are configured.'
  } });
  app.post('/api/orders', unavailable);
  app.get('/api/orders/:id', unavailable);
  app.post('/api/payments/create', unavailable);
  app.post('/api/payments/webhook', unavailable);
  app.get('/api/orders/lookup/:reference', unavailable);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
