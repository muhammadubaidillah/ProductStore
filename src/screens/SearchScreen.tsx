import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loadProductsByQuery } from '../redux/productsSlice';
import HeaderSearchBar from '../components/headerSearchBar';
import ProductCard from '../components/productCard';
import { toggleFavorite } from '../redux/favoritesSlice';

const createSearchHeader = (
    value: string,
    onChange: (text: string) => void,
    onSubmit: () => void
  ) => () => (
    <HeaderSearchBar value={value} onChange={onChange} onSubmit={onSubmit} />
  );

const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);
  const favoriteIds = useAppSelector((state) => state.favorites.items);

  const [query, setQuery] = useState('');

  const onSearchSubmit = useCallback(() => {
    dispatch(loadProductsByQuery(query));
  }, [dispatch, query]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: createSearchHeader(query, setQuery, onSearchSubmit),
    });
  }, [navigation, query, onSearchSubmit]);

  useEffect(() => {
    console.log(JSON.stringify(products));
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
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
              onPress={() => {}}
            />
          )}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    paddingBottom: 16,
  },
  footerComponent: {
    height: 48,
  },
});
