import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
    items: number[];
}

const initialState: FavoriteState = {
    items: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<number>) {
            if (state.items.includes(action.payload)) {
                state.items = state.items.filter(id => id !== action.payload);
            } else {
                state.items.push(action.payload);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
