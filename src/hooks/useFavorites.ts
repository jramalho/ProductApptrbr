import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = '@ProductApp:favorites';

export interface FavoriteProduct {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from AsyncStorage on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        const parsed = JSON.parse(storedFavorites);
        setFavorites(parsed.ids || []);
        setFavoriteProducts(parsed.products || []);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (ids: number[], products: FavoriteProduct[]) => {
    try {
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify({ ids, products })
      );
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const toggleFavorite = useCallback(
    (product: FavoriteProduct) => {
      const isFavorite = favorites.includes(product.id);
      let newFavorites: number[];
      let newProducts: FavoriteProduct[];

      if (isFavorite) {
        // Remove from favorites
        newFavorites = favorites.filter((id) => id !== product.id);
        newProducts = favoriteProducts.filter((p) => p.id !== product.id);
      } else {
        // Add to favorites
        newFavorites = [...favorites, product.id];
        newProducts = [...favoriteProducts, product];
      }

      setFavorites(newFavorites);
      setFavoriteProducts(newProducts);
      saveFavorites(newFavorites, newProducts);

      return !isFavorite;
    },
    [favorites, favoriteProducts]
  );

  const isFavorite = useCallback(
    (productId: number) => {
      return favorites.includes(productId);
    },
    [favorites]
  );

  const clearFavorites = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(FAVORITES_STORAGE_KEY);
      setFavorites([]);
      setFavoriteProducts([]);
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  }, []);

  return {
    favorites,
    favoriteProducts,
    loading,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
};
