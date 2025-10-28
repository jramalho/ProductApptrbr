import axios, { AxiosError } from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { IProductItem, ICategories } from '../types';
import { BASE_URL, BASE_URL_CATEGORIES } from '../constants';
import { getFromCache, setToCache } from '../utils/cache';

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

const wait = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

const shouldRetry = (error: AxiosError): boolean => {
  if (!error.response) {
    return true;
  }
  const status = error.response.status;
  return status === 408 || status === 429 || (status >= 500 && status < 600);
};

const checkNetworkConnection = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.isConnected === true && state.isInternetReachable !== false;
};

const retryRequest = async <T,>(
  requestFn: () => Promise<T>,
  retries = MAX_RETRIES
): Promise<T> => {
  try {
    // Check network connection before making request
    const hasConnection = await checkNetworkConnection();
    if (!hasConnection) {
      throw new Error('No internet connection');
    }
    
    return await requestFn();
  } catch (error) {
    if (retries > 0 && shouldRetry(error as AxiosError)) {
      await wait(RETRY_DELAY);
      return retryRequest(requestFn, retries - 1);
    }
    throw error;
  }
};

export const getProducts = async (
  path: string, queryString: string
): Promise<IProductItem[]> => {
  const cacheKey = `products:${path}:${queryString}`;
  
  try {
    // Try to fetch from network
    const { data } = await retryRequest(() => 
      axios.get(`${path}?${queryString}`)
    );

    const products = data.products || [];
    
    // Cache the successful response
    await setToCache(cacheKey, products);
    
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    
    // Try to return cached data as fallback
    const cachedProducts = await getFromCache<IProductItem[]>(cacheKey);
    if (cachedProducts) {
      console.log('Returning cached products data');
      return cachedProducts;
    }
    
    return [];
  }
};

export const getCategories = async (): Promise<ICategories[]> => {
  const cacheKey = 'categories';
  
  try {
    // Try to fetch from network
    const { data } = await retryRequest(() => 
      axios.get(BASE_URL_CATEGORIES)
    );

    const categories = data || [];
    
    // Cache the successful response
    await setToCache(cacheKey, categories);
    
    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    
    // Try to return cached data as fallback
    const cachedCategories = await getFromCache<ICategories[]>(cacheKey);
    if (cachedCategories) {
      console.log('Returning cached categories data');
      return cachedCategories;
    }
    
    return [];
  }
};

export const getProductsItem = async (itemId: number, queryString: string): Promise<IProductItem | null> => {
  const cacheKey = `product:${itemId}:${queryString}`;
  
  try {
    // Try to fetch from network
    const { data } = await retryRequest(() => 
      axios.get(`${BASE_URL}/${itemId}?${queryString}`)
    );

    // Cache the successful response
    if (data) {
      await setToCache(cacheKey, data);
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch product item:', error);
    
    // Try to return cached data as fallback
    const cachedProduct = await getFromCache<IProductItem>(cacheKey);
    if (cachedProduct) {
      console.log('Returning cached product data');
      return cachedProduct;
    }
    
    return null;
  }
};
