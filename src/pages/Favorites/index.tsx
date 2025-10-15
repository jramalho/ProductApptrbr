import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import * as S from './styles';
import { useFavoritesContext } from '../../contexts/FavoritesContext';
import ProductItem from '../../components/ProductItem';

const Favorites: React.FC = ({ navigation }) => {
  const { favoriteProducts, loading, isFavorite } = useFavoritesContext();

  const showProduct = (itemId: number) => {
    navigation.navigate('ProductPage', { itemId });
  };

  if (loading) {
    return (
      <S.Container>
        <S.LoadingContainer>
          <ActivityIndicator size="large" />
        </S.LoadingContainer>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>My Favorites</S.Title>
      {favoriteProducts.length === 0 ? (
        <S.EmptyContainer>
          <S.EmptyText>No favorites yet!</S.EmptyText>
          <S.EmptySubtext>
            Add products to your favorites by tapping the heart icon
          </S.EmptySubtext>
        </S.EmptyContainer>
      ) : (
        <FlashList
          data={favoriteProducts}
          renderItem={({ item }) => (
            <ProductItem
              title={item.title}
              price={item.price}
              thumbnail={item.thumbnail}
              rating={item.rating}
              action={() => showProduct(item.id)}
              isFavorite={isFavorite(item.id)}
            />
          )}
          estimatedItemSize={200}
          ListEmptyComponent={<Text>No favorites found!</Text>}
        />
      )}
    </S.Container>
  );
};

export default Favorites;
