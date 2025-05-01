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
            <Ionicons name="cart-outline" size={16} color="#000" />
            {cartCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginRight: 16,
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -6,
        backgroundColor: 'red',
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 1,
        minWidth: 16,
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default HeaderCartButton;
