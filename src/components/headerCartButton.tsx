import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppState } from '../types/appState';

const HeaderCartButton: React.FC = () => {
    const navigation = useNavigation();
    const cartCount = useSelector((state: AppState) => state.cart.totalQuantity);

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Cart' as never)}
        >
            <Ionicons name="cart-outline" size={22} color="#000" />
            {cartCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginRight: 16,
        padding: 2,
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 7,
        minWidth: 14,
        height: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HeaderCartButton;
