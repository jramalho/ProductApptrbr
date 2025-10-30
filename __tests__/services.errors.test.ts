import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {
  getProducts,
  getProductById,
  getCategories,
} from '../src/services';
import { BASE_URL, BASE_URL_CATEGORIES, LIMIT, INFOS_PRODUCT, INFOS_PRODUCT_ITEM } from '../src/constants';

jest.mock('axios');
jest.mock('@react-native-community/netinfo');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedNetInfo = NetInfo as jest.Mocked<typeof NetInfo>;

describe('Services - API Error Scenarios', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedNetInfo.fetch.mockResolvedValue({
      isConnected: true,
      isInternetReachable: true,
    } as any);
  });

  describe('getProducts - Network Errors', () => {
    it('should handle network timeout errors', async () => {
      const timeoutError = new Error('timeout of 5000ms exceeded');
      (timeoutError as any).code = 'ECONNABORTED';
      mockedAxios.get.mockRejectedValue(timeoutError);

      await expect(getProducts()).rejects.toThrow('timeout of 5000ms exceeded');
    });

    it('should handle network disconnection', async () => {
      const networkError = new Error('Network Error');
      (networkError as any).code = 'ERR_NETWORK';
      mockedAxios.get.mockRejectedValue(networkError);

      await expect(getProducts()).rejects.toThrow('Network Error');
    });

    it('should retry on 503 Service Unavailable', async () => {
      const error503 = {
        response: { status: 503 },
        message: 'Service Unavailable',
      };
      
      // First call fails, second succeeds
      mockedAxios.get
        .mockRejectedValueOnce(error503)
        .mockResolvedValueOnce({
          data: {
            products: [
              { id: 1, title: 'Product 1', price: 100, rating: 4.5, thumbnail: 'url' },
            ],
            total: 1,
          },
        });

      const result = await getProducts();
      expect(result.products).toHaveLength(1);
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });

    it('should retry on 429 Too Many Requests', async () => {
      const error429 = {
        response: { status: 429 },
        message: 'Too Many Requests',
      };
      
      mockedAxios.get
        .mockRejectedValueOnce(error429)
        .mockResolvedValueOnce({
          data: {
            products: [],
            total: 0,
          },
        });

      const result = await getProducts();
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });

    it('should handle 500 Internal Server Error', async () => {
      const error500 = {
        response: { status: 500 },
        message: 'Internal Server Error',
      };
      mockedAxios.get.mockRejectedValue(error500);

      await expect(getProducts()).rejects.toMatchObject({ response: { status: 500 } });
    });

    it('should handle 401 Unauthorized', async () => {
      const error401 = {
        response: { status: 401 },
        message: 'Unauthorized',
      };
      mockedAxios.get.mockRejectedValue(error401);

      await expect(getProducts()).rejects.toMatchObject({ response: { status: 401 } });
    });

    it('should handle 404 Not Found', async () => {
      const error404 = {
        response: { status: 404 },
        message: 'Not Found',
      };
      mockedAxios.get.mockRejectedValue(error404);

      await expect(getProducts()).rejects.toMatchObject({ response: { status: 404 } });
    });
  });

  describe('getProductById - Error Scenarios', () => {
    it('should handle product not found (404)', async () => {
      const error404 = {
        response: { status: 404 },
        message: 'Product not found',
      };
      mockedAxios.get.mockRejectedValue(error404);

      await expect(getProductById(99999)).rejects.toMatchObject({
        response: { status: 404 },
      });
    });

    it('should handle network timeout for single product', async () => {
      const timeoutError = new Error('timeout');
      (timeoutError as any).code = 'ECONNABORTED';
      mockedAxios.get.mockRejectedValue(timeoutError);

      await expect(getProductById(1)).rejects.toThrow('timeout');
    });

    it('should retry on 503 for single product', async () => {
      const error503 = {
        response: { status: 503 },
        message: 'Service Unavailable',
      };
      
      mockedAxios.get
        .mockRejectedValueOnce(error503)
        .mockResolvedValueOnce({
          data: {
            id: 1,
            title: 'Product',
            price: 100,
            rating: 4.5,
            thumbnail: 'url',
          },
        });

      const result = await getProductById(1);
      expect(result?.id).toBe(1);
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });

    it('should handle invalid product ID (negative)', async () => {
      mockedAxios.get.mockRejectedValue({
        response: { status: 400 },
        message: 'Bad Request',
      });

      await expect(getProductById(-1)).rejects.toMatchObject({
        response: { status: 400 },
      });
    });

    it('should handle malformed response data', async () => {
      mockedAxios.get.mockResolvedValue({
        data: null,
      });

      const result = await getProductById(1);
      expect(result).toBeNull();
    });
  });

  describe('getCategories - Error Scenarios', () => {
    it('should handle network timeout for categories', async () => {
      const timeoutError = new Error('timeout');
      (timeoutError as any).code = 'ECONNABORTED';
      mockedAxios.get.mockRejectedValue(timeoutError);

      await expect(getCategories()).rejects.toThrow('timeout');
    });

    it('should retry on 503 for categories', async () => {
      const error503 = {
        response: { status: 503 },
        message: 'Service Unavailable',
      };
      
      mockedAxios.get
        .mockRejectedValueOnce(error503)
        .mockResolvedValueOnce({
          data: [
            { slug: 'smartphones', name: 'Smartphones', url: 'url1' },
          ],
        });

      const result = await getCategories();
      expect(result).toHaveLength(1);
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });

    it('should handle empty categories array', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [],
      });

      const result = await getCategories();
      expect(result).toEqual([]);
    });

    it('should handle malformed categories data', async () => {
      mockedAxios.get.mockResolvedValue({
        data: null,
      });

      const result = await getCategories();
      expect(result).toEqual([]);
    });

    it('should handle 500 error for categories', async () => {
      const error500 = {
        response: { status: 500 },
        message: 'Internal Server Error',
      };
      mockedAxios.get.mockRejectedValue(error500);

      await expect(getCategories()).rejects.toMatchObject({
        response: { status: 500 },
      });
    });
  });

  describe('API Request Parameters', () => {
    it('getProducts should use correct URL parameters', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { products: [], total: 0 },
      });

      await getProducts('price', 'asc', 0);
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining(BASE_URL),
        expect.objectContaining({
          params: expect.objectContaining({
            limit: LIMIT,
            skip: 0,
            select: INFOS_PRODUCT,
            sortBy: 'price',
            order: 'asc',
          }),
        })
      );
    });

    it('getProductById should use correct URL with product ID', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { id: 123, title: 'Test', price: 100, rating: 4, thumbnail: 'url' },
      });

      await getProductById(123);
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${BASE_URL}/123`,
        expect.objectContaining({
          params: expect.objectContaining({
            select: INFOS_PRODUCT_ITEM,
          }),
        })
      );
    });

    it('getCategories should use correct categories URL', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [],
      });

      await getCategories();
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        BASE_URL_CATEGORIES,
        expect.any(Object)
      );
    });
  });

  describe('Network Status Detection', () => {
    it('should check network before making request', async () => {
      mockedNetInfo.fetch.mockResolvedValue({
        isConnected: false,
        isInternetReachable: false,
      } as any);

      mockedAxios.get.mockRejectedValue(new Error('Network Error'));

      await expect(getProducts()).rejects.toThrow();
      expect(mockedNetInfo.fetch).toHaveBeenCalled();
    });

    it('should proceed with request when network is available', async () => {
      mockedNetInfo.fetch.mockResolvedValue({
        isConnected: true,
        isInternetReachable: true,
      } as any);

      mockedAxios.get.mockResolvedValue({
        data: { products: [], total: 0 },
      });

      await getProducts();
      expect(mockedNetInfo.fetch).toHaveBeenCalled();
      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });

  describe('Concurrent Requests', () => {
    it('should handle multiple concurrent product requests', async () => {
      mockedAxios.get
        .mockResolvedValueOnce({ data: { products: [], total: 0 } })
        .mockResolvedValueOnce({ data: { id: 1, title: 'P1', price: 10, rating: 4, thumbnail: 'u1' } })
        .mockResolvedValueOnce({ data: [{ slug: 's1', name: 'N1', url: 'u1' }] });

      const [products, product, categories] = await Promise.all([
        getProducts(),
        getProductById(1),
        getCategories(),
      ]);

      expect(products.products).toEqual([]);
      expect(product?.id).toBe(1);
      expect(categories).toHaveLength(1);
      expect(mockedAxios.get).toHaveBeenCalledTimes(3);
    });

    it('should handle mixed success and failure in concurrent requests', async () => {
      mockedAxios.get
        .mockResolvedValueOnce({ data: { products: [], total: 0 } })
        .mockRejectedValueOnce(new Error('Failed'));

      const results = await Promise.allSettled([
        getProducts(),
        getProductById(999),
      ]);

      expect(results[0].status).toBe('fulfilled');
      expect(results[1].status).toBe('rejected');
    });
  });
});
