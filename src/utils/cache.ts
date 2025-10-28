import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = '@ProductApp:cache:';
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

/**
 * Generate cache key with prefix
 */
const getCacheKey = (key: string): string => `${CACHE_PREFIX}${key}`;

/**
 * Check if cache entry is still valid
 */
const isValidCache = <T,>(entry: CacheEntry<T>): boolean => {
  const now = Date.now();
  return now - entry.timestamp < CACHE_EXPIRY_TIME;
};

/**
 * Get data from cache
 */
export const getFromCache = async <T,>(key: string): Promise<T | null> => {
  try {
    const cacheKey = getCacheKey(key);
    const cached = await AsyncStorage.getItem(cacheKey);
    
    if (!cached) {
      return null;
    }
    
    const entry: CacheEntry<T> = JSON.parse(cached);
    
    if (!isValidCache(entry)) {
      // Cache expired, remove it
      await AsyncStorage.removeItem(cacheKey);
      return null;
    }
    
    return entry.data;
  } catch (error) {
    console.error('Failed to get from cache:', error);
    return null;
  }
};

/**
 * Store data in cache
 */
export const setToCache = async <T,>(key: string, data: T): Promise<void> => {
  try {
    const cacheKey = getCacheKey(key);
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
    };
    
    await AsyncStorage.setItem(cacheKey, JSON.stringify(entry));
  } catch (error) {
    console.error('Failed to set cache:', error);
  }
};

/**
 * Clear specific cache entry
 */
export const clearCache = async (key: string): Promise<void> => {
  try {
    const cacheKey = getCacheKey(key);
    await AsyncStorage.removeItem(cacheKey);
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
};

/**
 * Clear all cached data
 */
export const clearAllCache = async (): Promise<void> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
    await AsyncStorage.multiRemove(cacheKeys);
  } catch (error) {
    console.error('Failed to clear all cache:', error);
  }
};
