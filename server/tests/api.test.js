import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';

async function withServer(fn) {
  const server = createApp().listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  try { await fn(`http://127.0.0.1:${server.address().port}`); }
  finally { await new Promise((resolve, reject) => server.close((err) => err ? reject(err) : resolve())); }
}

test('health check confirms mock mode', () => withServer(async (base) => {
  const response = await fetch(`${base}/api/health`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).database, 'not_connected');
}));

test('catalog contains existing artwork and no invented prices', () => withServer(async (base) => {
  const response = await fetch(`${base}/api/products`);
  const result = await response.json();
  assert.equal(response.status, 200);
  assert.equal(result.count, 8);
  assert.equal(result.data.find((p) => p.id === 'masaan').price, null);
  assert.deepEqual(result.data.find((p) => p.id === 'masaan').variants, []);
}));

test('category filter and individual product work', () => withServer(async (base) => {
  const list = await (await fetch(`${base}/api/products?category=calendars`)).json();
  assert.equal(list.count, 4);
  const product = await (await fetch(`${base}/api/products/masaan`)).json();
  assert.equal(product.data.name, 'Masaan');
}));

test('unknown products return 404', () => withServer(async (base) => {
  const response = await fetch(`${base}/api/products/unknown`);
  assert.equal(response.status, 404);
}));

test('invalid query returns 400', () => withServer(async (base) => {
  const response = await fetch(`${base}/api/products?featured=maybe`);
  assert.equal(response.status, 400);
}));

test('orders and payments cannot be created in mock mode', () => withServer(async (base) => {
  for (const path of ['/api/orders', '/api/payments/create', '/api/payments/webhook']) {
    const response = await fetch(`${base}${path}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).error.code, 'CHECKOUT_NOT_AVAILABLE');
  }
}));
