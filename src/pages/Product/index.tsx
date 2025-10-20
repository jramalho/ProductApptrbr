import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, NativeModules } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import * as service from '../../services';
import * as S from './styles';
import { IProductItem } from '../../types';
import { INFOS_PRODUCT_ITEM } from '../../constants';

const Home: React.FC = ({ route, navigation }) => {
  const { CalendarModule } = NativeModules;
  const { itemId } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [productItem, setProductItem] = useState<IProductItem | null>(null);

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
      <S.Loading 
        accessible={true}
        accessibilityRole="progressbar"
        accessibilityLabel="Loading product details"
      >
        <ActivityIndicator accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants" />
      </S.Loading>
    );
  }

  if (error) {
    return (
      <S.Container>
        <S.Body>
          <S.Label 
            accessible={true}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            {error}
          </S.Label>
          <S.Footer 
            onPress={handleRetry} 
            testID="retry-button"
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Retry loading product"
            accessibilityHint="Double tap to retry loading the product details"
          >
            <S.Label importantForAccessibility="no-hide-descendants">Retry</S.Label>
          </S.Footer>
        </S.Body>
      </S.Container>
    );
  }

  if (!productItem) {
    return null;
  }

  const formattedPrice = `$${productItem.price.toFixed(2)}`;
  const stockStatus = productItem.stock > 0 ? `${productItem.stock} units in stock` : 'Out of stock';

  return (
    <S.Container>
      <S.Header 
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel={`${productItem.title}, priced at ${formattedPrice}, rating ${productItem.rating} out of 5`}
      >
        <S.Thumbnail 
          source={{uri:productItem.thumbnail}}
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel={`${productItem.title} product image`}
        />
        <S.HeaderInfomation>
          <S.Title accessibilityRole="text">{productItem.title}</S.Title>
          <S.Rating accessibilityLabel={`Rating: ${productItem.rating} out of 5 stars`}>
            Rating: {productItem.rating}
          </S.Rating>
          <S.Price accessibilityLabel={formattedPrice}>$ {productItem.price}</S.Price>
        </S.HeaderInfomation>
      </S.Header>
      <S.Body>
        <S.Label accessibilityRole="text">
          Brand: <S.Value accessibilityLabel={`Brand is ${productItem.brand}`}>{productItem.brand}</S.Value>
        </S.Label>
        <S.Label accessibilityRole="text">
          Description: <S.Value accessibilityLabel={productItem.description}>{productItem.description}</S.Value>
        </S.Label>
        <S.Label accessibilityRole="text">
          Stock: <S.Value accessibilityLabel={stockStatus}>{productItem.stock}</S.Value>
        </S.Label>
      </S.Body>
      <S.Footer 
        onPress={addEventToCalendar} 
        testID="create-reminder-button"
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Create a reminder for this product"
        accessibilityHint="Double tap to add a calendar event reminder for this product"
      >
        <S.Label importantForAccessibility="no-hide-descendants">Create a reminder</S.Label>
        <FontAwesome6 name="bell" iconStyle="solid" importantForAccessibility="no-hide-descendants" />
      </S.Footer>
    </S.Container>
  );
};

export default Home;
