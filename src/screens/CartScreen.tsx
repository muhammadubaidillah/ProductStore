import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearCart, removeFromCart, updateQuantity } from '../redux/cartSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigator';

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [showSummary, setShowSummary] = useState(false);

  const total = useMemo(() =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]
  );

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) { return; }
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleOutsideTouch = () => {
    if (showSummary) {
      setShowSummary(false);
    }
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      'Thank you for your purchase!',
      [
        {
          text: 'OK',
          onPress: () => {
            dispatch(clearCart());
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price} × {item.quantity}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
            style={styles.qtyBtn}
          >
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyVal}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
            style={styles.qtyBtn}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeBtn}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {showSummary && (
        <TouchableWithoutFeedback onPress={handleOutsideTouch}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
        contentContainerStyle={styles.containerStyle}
      />

      {cartItems.length > 0 && (
        <TouchableOpacity style={styles.checkoutToggle} onPress={() => setShowSummary(!showSummary)}>
          <Text style={styles.checkoutToggleText}>
            {showSummary ? 'Hide Summary' : 'View Summary'}
          </Text>
        </TouchableOpacity>
      )}

      {showSummary && (
        <View style={styles.bottomSheet}>
          <Text style={styles.summaryTitle}>Checkout Summary</Text>
          {cartItems.map((item) => (
            <Text key={item.id} style={styles.summaryItem}>
              {item.title} × {item.quantity} = ${item.price * item.quantity}
            </Text>
          ))}
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutBtnText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerStyle: {
    paddingBottom: 100,
  },
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  info: { flexDirection: 'column' },
  title: { fontSize: 16, fontWeight: '500' },
  price: { fontSize: 14, color: '#333', marginVertical: 4 },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginRight: 8,
  },
  qtyText: { fontSize: 18 },
  qtyVal: { fontSize: 16, marginRight: 8 },
  removeBtn: {
    marginLeft: 'auto',
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  removeText: { color: '#fff', fontSize: 12 },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  checkoutToggle: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    alignItems: 'center',
  },
  checkoutToggleText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
    zIndex: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryItem: {
    fontSize: 14,
    marginBottom: 6,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  checkoutBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },
});

export default CartScreen;
