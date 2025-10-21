import * as S from './styles';

interface ProductItemProps {
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  action: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ title, price, rating, thumbnail, action }) => {

  return (
    <S.Container onPress={action}>
      <S.Thumbnail source={{uri:thumbnail}}/>
      <S.TitleRating>
        <S.Title>{title}</S.Title>
        <S.Title>rating: <S.Rating>{rating}</S.Rating></S.Title>
      </S.TitleRating>
      <S.Price>$ {price}</S.Price>
    </S.Container>
  );
};

export default ProductItem;
