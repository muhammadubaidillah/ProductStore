import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { productId: number };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Catalog' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Details' }} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
