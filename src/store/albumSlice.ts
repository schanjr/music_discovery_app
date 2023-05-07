import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AlbumInterface from "../providers/lastFM/album.interface";

interface AlbumState {
    albums: AlbumInterface[];
}

const initialState: AlbumState = {
    albums: [],
};

export const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        setAlbums: (state, action: PayloadAction<AlbumInterface[]>) => {
            state.albums = action.payload;
        },
    },
});

export const { setAlbums } = albumSlice.actions;

export default albumSlice.reducer;
