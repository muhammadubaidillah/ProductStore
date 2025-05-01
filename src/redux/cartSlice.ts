import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        },
        updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) { item.quantity = action.payload.quantity; }
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
