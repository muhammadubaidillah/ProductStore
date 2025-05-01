import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/product';

interface CartItem {
    id: number;
    quantity: number;
    price: number;
    title: string;
    thumbnail: string;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    lastUpdated: number | null;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    lastUpdated: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Product>) => {
            const { id, price, title, thumbnail } = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ id, quantity: 1, price, title, thumbnail });
            }

            state.totalQuantity += 1;
            state.lastUpdated = Date.now();
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === id);

            if (itemIndex >= 0) {
                state.totalQuantity -= state.items[itemIndex].quantity;
                state.items.splice(itemIndex, 1);
                state.lastUpdated = Date.now();
            }
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(tempItem => tempItem.id === id);

            if (item && quantity > 0) {
                state.totalQuantity += quantity - item.quantity;
                item.quantity = quantity;
                state.lastUpdated = Date.now();
            }
        },
        clearCart: () => initialState,
    },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
