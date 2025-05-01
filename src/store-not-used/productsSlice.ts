import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { fetchProducts } from '../api';

interface ProductsState {
    items: Product[];
    categories: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    categories: [],
    status: 'idle',
    error: null,
};

export const loadProducts = createAsyncThunk(
    'products/loadProducts',
    async () => {
        const response = await fetchProducts();
        return response;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.products;
                state.categories = [...new Set(action.payload.products.map(p => p.category))];
            })
            .addCase(loadProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to load products';
            });
    },
});

export default productsSlice.reducer;
