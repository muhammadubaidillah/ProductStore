import React, { useCallback, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
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

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { categories, products, selectedCategory, loading } = useAppSelector((state) => state.products);
  const favoriteIds = useAppSelector((state) => state.favorites.items);

  const handleCategorySelect = useCallback((category: string) => {
    dispatch(setCategory(category));
  }, [dispatch]);

  const handleProductPress = (productId: number) => {
    navigation.navigate('ProductDetail', { productId });
  };

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
      />

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
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
