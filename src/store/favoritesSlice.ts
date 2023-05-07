import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteType {
    id: string;
    album: string;
    artist: string;
    songTitle: string;
    duration: number;
    albumImage: string;
}

type FavoriteId = string;
interface FavoritesState {
    [id: FavoriteId]: FavoriteType;
}

const initialState: FavoritesState = JSON.parse(localStorage.getItem('favorites') ?? '{}');

export const FavoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites: (state, action: PayloadAction<FavoriteType[]>) => {
            const favoritesObject = action.payload.reduce((acc, curr) => {
                acc[curr.id] = curr;
                return acc;
            }, {} as FavoritesState);
            localStorage.setItem('favorites', JSON.stringify(favoritesObject));
            return favoritesObject;
        },
        addToFavorites: (state, action: PayloadAction<FavoriteType>) => {
            const payload = action.payload;
            state[payload.id] = payload;
            localStorage.setItem('favorites', JSON.stringify(state));
        },
        removeFromFavorites: (state, action: PayloadAction<FavoriteId>) => {
            delete state[action.payload];
            localStorage.setItem('favorites', JSON.stringify(state));
        },
    },
});

export const { setFavorites, addToFavorites, removeFromFavorites } = FavoritesSlice.actions;
export default FavoritesSlice.reducer;
