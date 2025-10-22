import axios, { AxiosError } from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { IProductItem, ICategories } from '../types';
import { BASE_URL, BASE_URL_CATEGORIES } from '../constants';

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
  try {
    const { data } = await retryRequest(() => 
      axios.get(`${path}?${queryString}`)
    );

    return data.products || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error; // Re-throw to allow caller to handle
  }
};

export const getCategories = async (): Promise<ICategories[]> => {
  try {
    const { data } = await retryRequest(() => 
      axios.get(BASE_URL_CATEGORIES)
    );

    return data || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error; // Re-throw to allow caller to handle
  }
};

export const getProductsItem = async (itemId: number, queryString: string): Promise<IProductItem | null> => {
  try {
    const { data } = await retryRequest(() => 
      axios.get(`${BASE_URL}/${itemId}?${queryString}`)
    );

    return data;
  } catch (error) {
    console.error('Failed to fetch product item:', error);
    throw error; // Re-throw to allow caller to handle
  }
};
