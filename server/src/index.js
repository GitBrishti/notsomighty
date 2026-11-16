import 'dotenv/config';
import { createApp } from './app.js';

const port = Number(process.env.PORT ?? 4000);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
const allowedOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173')
  .split(',').map((origin) => origin.trim()).filter(Boolean);
const app = createApp({ allowedOrigins });
app.listen(port, () => console.log(`NotSoMighty mock API running at http://localhost:${port}`));
