import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
// import AlbumDetail from './components/AlbumDetail';
// import AlbumOverview from './components/AlbumList';
import Home from './views/Home';
import ArtistAlbums from "./views/ArtistAlbums/ArtistAlbums";
import AlbumDetails from "./views/AlbumDetails/AlbumDetails";
import Artists from "./views/Artists";
import Favorites from "./views/Favorites/Favorites";
import ThreeD from "./views/ThreeD/ThreeD";
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
                <Route path="/favorites" element={<Favorites/>}/>
                <Route path="/artists" element={<Artists/>}/>
                <Route path="/artists/:artistId/albums" element={<ArtistAlbums/>}/>
                <Route path="/artists/:artistId/albums/:albumId" element={<AlbumDetails/>}/>
                <Route path="/test" element={<ThreeD/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
