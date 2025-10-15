import React, { createContext, useContext, ReactNode } from 'react';
import { useFavorites, FavoriteProduct } from '../hooks/useFavorites';

interface FavoritesContextType {
  favorites: number[];
  favoriteProducts: FavoriteProduct[];
  loading: boolean;
  toggleFavorite: (product: FavoriteProduct) => boolean;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const favoritesData = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesData}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};
