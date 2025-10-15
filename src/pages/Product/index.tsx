import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, NativeModules } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import * as service from '../../services';
import * as S from './styles';
import { IProductItem } from '../../types';
import { INFOS_PRODUCT_ITEM } from '../../constants';
import FavoriteButton from '../../components/FavoriteButton';
import { useFavoritesContext } from '../../contexts/FavoritesContext';

const Home: React.FC = ({ route, navigation }) => {
  const { CalendarModule } = NativeModules;
  const { itemId } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [productItem, setProductItem] = useState<IProductItem | null>(null);
  const { toggleFavorite, isFavorite } = useFavoritesContext();

  const addEventToCalendar = () => {
    const title = 'Important Reminder';
    const description = 'You still have a product to buy today!';

    CalendarModule.addEvent(
      title,
      description,
      (successMessage: string) => {
        Alert.alert('Success', successMessage);
      },
      (errorMessage: string) => {
        Alert.alert('Error', errorMessage);
      }
    );
  };

  const handleFavoritePress = () => {
    if (productItem) {
      toggleFavorite({
        id: productItem.id,
        title: productItem.title,
        price: productItem.price,
        rating: productItem.rating,
        thumbnail: productItem.thumbnail,
      });
    }
  };

  const getProductItem = async (id: number) => {
    setLoading(true);
    setError(null);
    const queryString = `?select=${INFOS_PRODUCT_ITEM}`;
    const item = await service.getProductsItem(id, queryString);

    if (!item) {
      setError('Product not found. Please try again later.');
    } else {
      setProductItem(item);
    }
    setLoading(false);
  };

  const handleRetry = () => {
    getProductItem(itemId);
  };

  useEffect(() => {
    getProductItem(itemId);
  }, [itemId]);

  if (loading) {
    return (
      <S.Loading>
        <ActivityIndicator />
      </S.Loading>
    );
  }

  if (error) {
    return (
      <S.Container>
        <S.Body>
          <S.Label>{error}</S.Label>
          <S.Footer onPress={handleRetry} testID="retry-button">
            <S.Label>Retry</S.Label>
          </S.Footer>
        </S.Body>
      </S.Container>
    );
  }

  if (!productItem) {
    return null;
  }

  return (
    <S.Container>
      <S.Header>
        <S.Thumbnail source={{uri:productItem.thumbnail}}/>
        <S.HeaderInfomation>
          <S.Title>{productItem.title}</S.Title>
          <S.Rating>Rating: {productItem.rating}</S.Rating>
          <S.PriceRow>
            <S.Price>$ {productItem.price}</S.Price>
            <FavoriteButton
              isFavorite={isFavorite(productItem.id)}
              onPress={handleFavoritePress}
              testID="product-favorite-button"
              size={28}
            />
          </S.PriceRow>
        </S.HeaderInfomation>
      </S.Header>
      <S.Body>
        <S.Label>Brand: <S.Value>{productItem.brand}</S.Value></S.Label>
        <S.Label>Description: <S.Value>{productItem.description}</S.Value></S.Label>
        <S.Label>Stock: <S.Value>{productItem.stock}</S.Value></S.Label>
      </S.Body>
      <S.Footer onPress={addEventToCalendar} testID="create-reminder-button">
        <S.Label>Create a reminder</S.Label>
        <FontAwesome6 name="bell" iconStyle="solid" />
      </S.Footer>
    </S.Container>
  );
};

export default Home;
