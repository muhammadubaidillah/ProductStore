import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigator';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleFavorite } from '../redux/favoritesSlice';
import { addToCart } from '../redux/cartSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartItem } from '../types/cartItem';
import HeaderCartButton from '../components/headerCartButton';

type DetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const renderHeaderCartButton = () => <HeaderCartButton />;

const ProductDetailScreen = () => {
  const { params } = useRoute<DetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const product = useAppSelector((state) =>
    state.products.products.find((item) => item.id === params.productId)
  );

  const isFavorite = useAppSelector((state) =>
    state.favorites.items.includes(params.productId)
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderCartButton,
    });
  }, [navigation]);

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    const data: CartItem = {
      id: product.id,
      quantity: 1,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };

    dispatch(addToCart(data));
    Alert.alert('Added to Cart', `${product.title} has been added to your cart.`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.imageContainer} resizeMode="contain" />
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.title}>{product.title}</Text>
          <TouchableOpacity onPress={() => dispatch(toggleFavorite(product.id))}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color="#ff4d4d"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: 'white', // Set background color to white
    justifyContent: 'center', // Optional: center the image vertically
    alignItems: 'center', // Optional: center the image horizontally
  },
  image: {
    width: '100%',
    height: 250,
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 18,
    color: '#007bff',
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetailScreen;
