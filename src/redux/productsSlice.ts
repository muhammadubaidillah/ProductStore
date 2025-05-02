import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchProductsByCategory, fetchProductsByQuery } from '../api/products';
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

export const loadProductsByQuery = createAsyncThunk(
    'products/byQuery',
    async (query: string) => {
        return await fetchProductsByQuery(query);
    },
);

interface ProductState {
    categories: Category[];
    products: Product[];
    selectedCategory: string;
    loading: boolean;
    searchQuery: string;
}

const initialState: ProductState = {
    categories: [],
    products: [],
    selectedCategory: '',
    loading: false,
    searchQuery: '',
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategory(state, action) {
            state.selectedCategory = action.payload;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
        clearProducts(state) {
            state.products = [];
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
            })
            .addCase(loadProductsByQuery.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadProductsByQuery.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(loadProductsByQuery.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setCategory, setSearchQuery, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
