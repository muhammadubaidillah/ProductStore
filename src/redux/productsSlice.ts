import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchProductsByCategory } from '../api/products';
import { Category } from '../types/category';
import { Product } from '../types/product';

export const loadCategories = createAsyncThunk('products/categories', async () => {
    return await fetchCategories();
});

export const loadProductsByCategory = createAsyncThunk(
    'products/byCategory',
    async (category: string) => {
        return await fetchProductsByCategory(category);
    }
);

interface ProductState {
    categories: Category[];
    products: Product[];
    selectedCategory: string;
    loading: boolean;
}

const initialState: ProductState = {
    categories: [],
    products: [],
    selectedCategory: '',
    loading: false,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategory(state, action) {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                if (action.payload.length > 0) {
                    state.selectedCategory = action.payload[0];
                }
            })
            .addCase(loadProductsByCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadProductsByCategory.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(loadProductsByCategory.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setCategory } = productsSlice.actions;
export default productsSlice.reducer;
