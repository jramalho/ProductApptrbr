import * as S from './styles';

const ProductItem: React.FC = ({ title, price, rating, thumbnail, action }) => {
  const formattedPrice = `$${price.toFixed(2)}`;
  const accessibilityLabel = `${title}, priced at ${formattedPrice}, rating ${rating} out of 5`;
  const accessibilityHint = 'Double tap to view product details';

  return (
    <S.Container 
      onPress={action}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      <S.Thumbnail 
        source={{uri:thumbnail}}
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel={`${title} product image`}
      />
      <S.TitleRating>
        <S.Title accessibilityRole="text">{title}</S.Title>
        <S.Title accessibilityRole="text">
          rating: <S.Rating accessibilityLabel={`${rating} out of 5 stars`}>{rating}</S.Rating>
        </S.Title>
      </S.TitleRating>
      <S.Price accessibilityRole="text" accessibilityLabel={formattedPrice}>$ {price}</S.Price>
    </S.Container>
  );
};

export default ProductItem;
