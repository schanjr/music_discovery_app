import React, {useState} from "react";
import ArtistAlbumSearchbar from "src/components/ArtistAlbumSearchbar";
import {useDispatch} from 'react-redux';
import lastFM from "src/providers/lastFM/lastFM";
import {setAlbums} from 'src/store/albumSlice';
import {useNavigate} from 'react-router-dom';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import theme from 'src/styles/theme';
import {encodePathString} from "src/utils/handleUrls";


const ArtistsView: React.FC = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (artistName: string) => {
        setIsLoading(true);
        try {
            const api = new lastFM();
            let albums = await api.getArtistTopAlbums(artistName);
            albums = albums.filter(album => album.artist.toLowerCase() === artistName.toLowerCase());
            dispatch(setAlbums(albums));
            navigate(`/artists/${encodePathString(artistName)}/albums`);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            marginTop: theme.spacing(6),
            position: 'relative',
            height: '90',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
    }));
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <h1>Search Artists</h1>
                <br/>
                <ArtistAlbumSearchbar onSearch={handleSearch} isLoading={isLoading}/>
            </div>
        </ThemeProvider>
    );
};

export default ArtistsView;
