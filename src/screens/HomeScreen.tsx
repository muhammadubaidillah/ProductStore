import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  loadCategories,
  loadProductsByCategory,
  setCategory,
  clearProducts,
} from '../redux/productsSlice';
import { toggleFavorite } from '../redux/favoritesSlice';
import CategoryTabs from '../components/categoryTabs';
import ProductCard from '../components/productCard';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/appNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import HeaderRightButtons from '../components/headerRightButton';

const createHeaderRight = (onSearchPress: () => void) => () => (
  <HeaderRightButtons onSearchPress={onSearchPress} />
);

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { categories, products, selectedCategory, loading } = useAppSelector((state) => state.products);
  const favoriteIds = useAppSelector((state) => state.favorites.items);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>((null));

  const handleCategorySelect = useCallback((category: string) => {
    dispatch(setCategory(category));
  }, [dispatch]);

  const handleProductPress = (productId: number) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(loadCategories()).then(() => {
      setIsRefreshing(false);
      scrollViewRef.current?.scrollTo({ x: 0, animated: true });
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: createHeaderRight(() => {
        dispatch(clearProducts());
        navigation.navigate('Search');
      }),
    });
  }, [navigation, dispatch]);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(loadProductsByCategory(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    if (categories.length > 0) {
      handleCategorySelect(categories[0].slug);
    }
  }, [categories, handleCategorySelect]);

  return (
    <View>
      <CategoryTabs
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
        scrollViewRef={scrollViewRef}
      />

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.containerStyle}
          ListFooterComponent={<View style={styles.footerComponent} />}
          renderItem={({ item }) => (
            <ProductCard
              id={item.id}
              title={item.title}
              description={item.description}
              price={item.price}
              thumbnail={item.thumbnail}
              isFavorite={favoriteIds.includes(item.id)}
              onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
              onPress={() => handleProductPress(item.id)}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginTop: 32,
  },
  containerStyle: {
    paddingBottom: 16,
  },
  footerComponent: {
    height: 48,
  },
});

export default HomeScreen;
