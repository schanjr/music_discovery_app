import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './albumSlice';
import albumDetailsReducer from './albumDetailsSlice'
import favoritesReducer from './favoritesSlice'

const store = configureStore({
    reducer: {
        albums: albumReducer,
        albumDetails: albumDetailsReducer,
        favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
