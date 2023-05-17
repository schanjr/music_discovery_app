import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AlbumDetailInterface from "../providers/lastFM/albumDetail.interface";

type albumDetailsId = string;

interface AlbumDetailState {
  [id: albumDetailsId]: AlbumDetailInterface;
}

const initialState: AlbumDetailState = {};
export const albumDetailsSlice = createSlice({
  name: 'albumDetails',
  initialState,
  reducers: {
    setAlbumDetails: (state, action: PayloadAction<{ [id: albumDetailsId]: AlbumDetailInterface }>) => {
      const key = Object.keys(action.payload)[0]
      state[key] = action.payload[key]
    }
  },
});
export const {setAlbumDetails} = albumDetailsSlice.actions;
export default albumDetailsSlice.reducer;
