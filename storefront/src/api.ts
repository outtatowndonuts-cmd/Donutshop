import { debugLog } from './debug';

export async function fetchProducts() {
  debugLog('fetchProducts called');
  const res = await fetch('/api/craftplan/products');
  debugLog('fetchProducts response', { status: res.status, statusText: res.statusText, url: res.url });
  const text = await res.text();
  debugLog('fetchProducts raw response', text);
  try {
    const json = JSON.parse(text);
    debugLog('fetchProducts parsed JSON', json);
    return json;
  } catch (e) {
    debugLog('fetchProducts JSON parse error', e);
    throw new Error('Failed to fetch products: ' + text);
  }
}

export async function fetchProduct(id: number) {
  debugLog('fetchProduct called', { id });
  const res = await fetch(`/api/craftplan/products/${id}`);
  debugLog('fetchProduct response', { status: res.status, statusText: res.statusText, url: res.url });
  const text = await res.text();
  debugLog('fetchProduct raw response', text);
  try {
    const json = JSON.parse(text);
    debugLog('fetchProduct parsed JSON', json);
    return json;
  } catch (e) {
    debugLog('fetchProduct JSON parse error', e);
    throw new Error('Failed to fetch product: ' + text);
  }
}

export async function createOrder(order: any) {
  debugLog('createOrder called', order);
  const res = await fetch('/api/craftplan/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  debugLog('createOrder response', { status: res.status, statusText: res.statusText, url: res.url });
  const text = await res.text();
  debugLog('createOrder raw response', text);
  try {
    const json = JSON.parse(text);
    debugLog('createOrder parsed JSON', json);
    return json;
  } catch (e) {
    debugLog('createOrder JSON parse error', e);
    throw new Error('Failed to create order: ' + text);
  }
}
