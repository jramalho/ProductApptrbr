import axios from 'axios';
import { getProducts, getCategories, getProductsItem } from '../src/services';
import { BASE_URL, BASE_URL_CATEGORIES } from '../src/constants';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should fetch and return products successfully', async () => {
      const mockProducts = [
        {
          id: 1,
          title: 'Product 1',
          price: 10.99,
          rating: 4.5,
          thumbnail: 'https://example.com/1.jpg',
        },
        {
          id: 2,
          title: 'Product 2',
          price: 20.99,
          rating: 4.8,
          thumbnail: 'https://example.com/2.jpg',
        },
      ];

      mockedAxios.get.mockResolvedValue({
        data: { products: mockProducts },
      });

      const path = BASE_URL;
      const queryString = 'limit=10&skip=0';
      const result = await getProducts(path, queryString);

      expect(mockedAxios.get).toHaveBeenCalledWith(`${path}?${queryString}`);
      expect(result).toEqual(mockProducts);
    });

    it('should return empty array when API call fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      const path = BASE_URL;
      const queryString = 'limit=10&skip=0';
      const result = await getProducts(path, queryString);

      expect(mockedAxios.get).toHaveBeenCalledWith(`${path}?${queryString}`);
      expect(result).toEqual([]);
    });

    it('should return empty array when API returns invalid data', async () => {
      mockedAxios.get.mockResolvedValue({
        data: null,
      });

      const path = BASE_URL;
      const queryString = 'limit=10&skip=0';
      const result = await getProducts(path, queryString);

      expect(result).toEqual([]);
    });

    it('should handle network timeout errors', async () => {
      mockedAxios.get.mockRejectedValue({
        code: 'ECONNABORTED',
        message: 'timeout of 5000ms exceeded',
      });

      const path = BASE_URL;
      const queryString = 'limit=10&skip=0';
      const result = await getProducts(path, queryString);

      expect(result).toEqual([]);
    });

    it('should handle 404 errors gracefully', async () => {
      mockedAxios.get.mockRejectedValue({
        response: {
          status: 404,
          statusText: 'Not Found',
        },
      });

      const path = BASE_URL;
      const queryString = 'limit=10&skip=0';
      const result = await getProducts(path, queryString);

      expect(result).toEqual([]);
    });

    it('should handle 500 server errors gracefully', async () => {
      mockedAxios.get.mockRejectedValue({
        response: {
          status: 500,
          statusText: 'Internal Server Error',
        },
      });

      const path = BASE_URL;
      const queryString = 'limit=10&skip=0';
      const result = await getProducts(path, queryString);

      expect(result).toEqual([]);
    });
  });

  describe('getCategories', () => {
    it('should fetch and return categories successfully', async () => {
      const mockCategories = ['electronics', 'clothing', 'home'];

      mockedAxios.get.mockResolvedValue({
        data: mockCategories,
      });

      const result = await getCategories();

      expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL_CATEGORIES);
      expect(result).toEqual(mockCategories);
    });

    it('should return empty array when API call fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      const result = await getCategories();

      expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL_CATEGORIES);
      expect(result).toEqual([]);
    });

    it('should handle network timeout errors', async () => {
      mockedAxios.get.mockRejectedValue({
        code: 'ECONNABORTED',
        message: 'timeout exceeded',
      });

      const result = await getCategories();

      expect(result).toEqual([]);
    });

    it('should handle 401 unauthorized errors', async () => {
      mockedAxios.get.mockRejectedValue({
        response: {
          status: 401,
          statusText: 'Unauthorized',
        },
      });

      const result = await getCategories();

      expect(result).toEqual([]);
    });

    it('should return empty array when API returns null', async () => {
      mockedAxios.get.mockResolvedValue({
        data: null,
      });

      const result = await getCategories();

      expect(result).toEqual([]);
    });
  });

  describe('getProductsItem', () => {
    it('should fetch and return a single product successfully', async () => {
      const mockProduct = {
        id: 1,
        title: 'Test Product',
        price: 99.99,
        rating: 4.5,
        thumbnail: 'https://example.com/product.jpg',
        brand: 'Test Brand',
        description: 'Test description',
        stock: '50',
      };

      mockedAxios.get.mockResolvedValue({
        data: mockProduct,
      });

      const itemId = 1;
      const queryString = 'select=title,price';
      const result = await getProductsItem(itemId, queryString);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${BASE_URL}/${itemId}?${queryString}`
      );
      expect(result).toEqual(mockProduct);
    });

    it('should return null when API call fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      const itemId = 1;
      const queryString = 'select=title,price';
      const result = await getProductsItem(itemId, queryString);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${BASE_URL}/${itemId}?${queryString}`
      );
      expect(result).toBeNull();
    });

    it('should return null when product is not found (404)', async () => {
      mockedAxios.get.mockRejectedValue({
        response: {
          status: 404,
          statusText: 'Not Found',
        },
      });

      const itemId = 999;
      const queryString = '';
      const result = await getProductsItem(itemId, queryString);

      expect(result).toBeNull();
    });

    it('should handle network timeout errors', async () => {
      mockedAxios.get.mockRejectedValue({
        code: 'ECONNABORTED',
        message: 'timeout exceeded',
      });

      const itemId = 1;
      const queryString = '';
      const result = await getProductsItem(itemId, queryString);

      expect(result).toBeNull();
    });

    it('should handle malformed response data', async () => {
      mockedAxios.get.mockResolvedValue({
        data: undefined,
      });

      const itemId = 1;
      const queryString = '';
      const result = await getProductsItem(itemId, queryString);

      expect(result).toBeUndefined();
    });

    it('should handle server errors (500)', async () => {
      mockedAxios.get.mockRejectedValue({
        response: {
          status: 500,
          statusText: 'Internal Server Error',
        },
      });

      const itemId = 1;
      const queryString = '';
      const result = await getProductsItem(itemId, queryString);

      expect(result).toBeNull();
    });

    it('should work with empty query string', async () => {
      const mockProduct = {
        id: 5,
        title: 'Another Product',
        price: 49.99,
      };

      mockedAxios.get.mockResolvedValue({
        data: mockProduct,
      });

      const itemId = 5;
      const queryString = '';
      const result = await getProductsItem(itemId, queryString);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${BASE_URL}/${itemId}?${queryString}`
      );
      expect(result).toEqual(mockProduct);
    });
  });

  describe('Error handling edge cases', () => {
    it('getProducts should handle axios cancellation', async () => {
      mockedAxios.get.mockRejectedValue({
        __CANCEL__: true,
        message: 'Request cancelled',
      });

      const result = await getProducts(BASE_URL, '');

      expect(result).toEqual([]);
    });

    it('getCategories should handle DNS resolution errors', async () => {
      mockedAxios.get.mockRejectedValue({
        code: 'ENOTFOUND',
        message: 'getaddrinfo ENOTFOUND',
      });

      const result = await getCategories();

      expect(result).toEqual([]);
    });

    it('getProductsItem should handle connection refused errors', async () => {
      mockedAxios.get.mockRejectedValue({
        code: 'ECONNREFUSED',
        message: 'connect ECONNREFUSED',
      });

      const result = await getProductsItem(1, '');

      expect(result).toBeNull();
    });
  });
});
