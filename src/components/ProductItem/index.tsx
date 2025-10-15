import React from 'react';
import * as S from './styles';
import FavoriteButton from '../FavoriteButton';
import { useFavoritesContext } from '../../contexts/FavoritesContext';

interface ProductItemProps {
  id?: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  action: () => void;
  isFavorite?: boolean;
  showFavoriteButton?: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  title,
  price,
  rating,
  thumbnail,
  action,
  isFavorite: isFavoriteProp,
  showFavoriteButton = true,
}) => {
  const { toggleFavorite, isFavorite: isInFavorites } = useFavoritesContext();

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    if (id) {
      toggleFavorite({ id, title, price, rating, thumbnail });
    }
  };

  const favoriteStatus = isFavoriteProp !== undefined ? isFavoriteProp : isInFavorites(id || 0);

  return (
    <S.Container onPress={action}>
      <S.Thumbnail source={{ uri: thumbnail }} />
      <S.TitleRating>
        <S.Title>{title}</S.Title>
        <S.Title>
          rating: <S.Rating>{rating}</S.Rating>
        </S.Title>
      </S.TitleRating>
      <S.PriceContainer>
        <S.Price>$ {price}</S.Price>
        {showFavoriteButton && id && (
          <FavoriteButton
            isFavorite={favoriteStatus}
            onPress={handleFavoritePress}
            testID={`favorite-button-${id}`}
            size={20}
          />
        )}
      </S.PriceContainer>
    </S.Container>
  );
};

export default ProductItem;
