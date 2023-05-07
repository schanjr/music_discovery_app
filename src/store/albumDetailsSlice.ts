import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AlbumDetailInterface from "../providers/lastFM/albumDetail.interface";

interface AlbumDetailState {
    albumDetails: AlbumDetailInterface;
}

const initialState: AlbumDetailState = {
    albumDetails: {
        name: '',
        artist: '',
        image: '',
        listeners: 0,
        summary: '',
        playCount: 0,
        tracks: [{
            name: '',
            duration: 0,
            url: ''
        }]
    },
};

export const albumDetailsSlice = createSlice({
    name: 'albumDetails',
    initialState,
    reducers: {
        setAlbumDetails: (state, action: PayloadAction<AlbumDetailInterface>) => {
            state.albumDetails = action.payload;
        },
    },
});

export const {setAlbumDetails} = albumDetailsSlice.actions;

export default albumDetailsSlice.reducer;
