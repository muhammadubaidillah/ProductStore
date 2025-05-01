import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  loadCategories,
  loadProductsByCategory,
  setCategory,
} from '../redux/productsSlice';
import { toggleFavorite } from '../redux/favoritesSlice';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import HeaderCartButton from '../components/CartButton';

const renderHeaderCartButton = () => <HeaderCartButton />;

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
      headerRight: renderHeaderCartButton,
    });
  }, [navigation]);

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
          contentContainerStyle={{ paddingBottom: 16 }}
          ListFooterComponent={<View style={{ height: 48 }} />}
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
});

export default HomeScreen;
