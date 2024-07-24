/**
 * @jest-environment node
 */
import { getProducts, getProductsInPages } from './route'

it('should return products with status 200', async () => {
  const response = await getProducts();

  expect(response?.status).toBe(200);
}
);

it('should return products in pages with status 200', async () => {
  const response = await getProductsInPages(1, 5);

  expect(response?.status).toBe(200);
}
);