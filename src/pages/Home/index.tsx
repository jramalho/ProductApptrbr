import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import * as service from '../../services';
import * as S from './styles';
import { IProductItem, ISelectInput } from '../../types';
import { INFOS_PRODUCT, initialCategory, LIMIT, sortOptions } from '../../constants';
import SortButton from '../../components/SortButton';
import ProductItem from '../../components/ProductItem';
import notifee from '@notifee/react-native';


const Home: React.FC = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory.value);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState<ItemType>(initialCategory);
  const [sortOptionsList, setSortOptionsList] = useState(sortOptions);
  const [categoryList, setCategoryList] = useState<ISelectInput[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [productCount, setProductCount] = useState<number>(0);
  const [productsList, setProductsList] = useState<IProductItem[]>([]);

  const showProduct = (itemId: number) => {
    navigation.navigate('ProductPage', { itemId });
  };

  const getProducts = async () => {
    setLoading(true);
    setError(null);

    const url = selectedCategoryItem.value;
    const queryString =
      `limit=${LIMIT}&skip=${productCount}&select=${INFOS_PRODUCT}&sortBy=${sortBy}&order=${sortOrder}`;

    const products = await service.getProducts(url, queryString);
    
    if (products.length === 0 && productCount === 0) {
      setError('Unable to load products. Please check your connection and try again.');
    } else {
      const newProductsList = productsList.concat(products);
      setProductsList(newProductsList);
      setProductCount(newProductsList.length);
    }
    
    setLoading(false);
  };

  const getCategories = async () => {
    const categoriesList: ISelectInput[] = [];
    const categories = await service.getCategories();

    categoriesList.push(initialCategory);

    categories.map((category) => {
      categoriesList.push({
        label: category.name,
        value: category.url,
      });
    });

    setCategoryList(categoriesList);
  };

  const sortAction = async (index: number) => {
    setSortOptionsList(prevState => {
      const itemClickedIsActive = prevState[index].active;

      setSortBy(itemClickedIsActive ? '' : sortOptionsList[index].value);
      setSortOrder(sortOptionsList[index].order);

      return prevState.map((option, prevIndex) => {
        if (prevIndex === index) {
          return { ...option, active: !itemClickedIsActive };
        } else {
          return { ...option, active: itemClickedIsActive ? option.active : false };
        }
      });
    });
  };

  const sendNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'Local Notification',
      body: 'Welcome to the new ProductApp!',
      android: {
        channelId,
        smallIcon: 'ic_launcher',
      },
      ios: {
        sound: 'default',
      },
    });
  };

  useEffect(() => {
    notifee.requestPermission().then((granted) => {
      if (granted) {
        setTimeout(() => {
          sendNotification();
        }, 10000);
      }
    });
  }, []);

  useEffect(() => {
    if (!productCount) {
      getProducts();
    }
  }, [productCount]);

  useEffect(() => {
    setProductsList([]);
    setProductCount(0);

    if (!categoryList.length) {
      getCategories();
    }
  },[selectedCategoryItem, sortOptionsList]);

  const currentCategoryLabel = selectedCategoryItem.label || 'All Products';
  const activeSortOption = sortOptionsList.find(opt => opt.active);
  const sortStatusLabel = activeSortOption 
    ? `Sorted by ${activeSortOption.name}` 
    : 'Not sorted';

  return (
    <S.Container>
      <S.Title 
        accessibilityRole="header"
        accessibilityLabel="Product App Home"
      >
        Product APP
      </S.Title>
      <S.Subtitles accessibilityRole="text">Category filter:</S.Subtitles>
      <DropDownPicker
        loading={loading}
        open={categoryOpen}
        value={selectedCategory}
        items={categoryList}
        setOpen={setCategoryOpen}
        setValue={setSelectedCategory}
        onSelectItem={setSelectedCategoryItem}
        testID="dropDownPicker"
        accessible={true}
        accessibilityLabel={`Category filter. Currently selected: ${currentCategoryLabel}`}
        accessibilityHint="Double tap to open category selection menu"
        accessibilityRole="button"
      />
      <S.Subtitles accessibilityRole="text">Sort:</S.Subtitles>
      <S.SortList 
        accessible={true}
        accessibilityRole="menu"
        accessibilityLabel={`Sort options. ${sortStatusLabel}`}
      >
        {sortOptionsList.map(({name, icon, active}, index) => {
          return (
            <SortButton
              key={index}
              name={name}
              icon={icon}
              active={active}
              action={() => sortAction(index)}
              testID={`sort-button-${index}`}
            />
          );
        })}
      </S.SortList>
      <S.Subtitles accessibilityRole="text">
        Items: {productsList.length > 0 ? `${productsList.length} products` : ''}
      </S.Subtitles>
      {error ? (
        <Text 
          style={{textAlign: 'center', padding: 20, color: 'red'}}
          accessible={true}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      ) : null}
      <FlashList
        refreshing={loading}
        onRefresh={getProducts}
        data={productsList}
        renderItem={({ item }) =>
          <ProductItem
            title={item.title}
            price={item.price}
            thumbnail={item.thumbnail}
            rating={item.rating}
            action={() => showProduct(item.id)}
          />
        }
        estimatedItemSize={200}
        onEndReached={getProducts}
        ListEmptyComponent={
          !loading ? (
            <Text 
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel="No products found"
            >
              No items found!
            </Text>
          ) : <></>
        }
        accessible={true}
        accessibilityRole="list"
        accessibilityLabel={`Product list. ${productsList.length} products displayed.`}
      />
    </S.Container>
  );
};

export default Home;
