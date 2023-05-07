import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {addToFavorites, FavoriteType, removeFromFavorites} from "../../store/favoritesSlice";

import {Typography, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AlbumDetail, {Track} from "../../providers/lastFM/albumDetail.interface";

const useStyles = makeStyles({
    albumImage: {
        width: 200,
        height: 200
    },
    table: {
        marginTop: 20,
    },
});

const AlbumDetailsView: React.FC = () => {
    const classes = useStyles();
    const albumDetails = useSelector((state: RootState) => state.albumDetails.albumDetails);
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites);
    const [favoriteTracks, setFavoriteTracks] = useState(new Set(Object.keys(favorites || {})));

    const isFavorite = (trackId: string) => {
        return favoriteTracks.has(trackId);
    }

    const toggleFavorite = (albumDetails: AlbumDetail, track: Track) => {
        const trackId = track.url
        if (isFavorite(trackId)) {
            dispatch(removeFromFavorites(trackId));
            setFavoriteTracks((prev) => {
                const newSet = new Set(prev);
                newSet.delete(trackId);
                return newSet;
            });
        } else {
            const trackFavorite: FavoriteType = {
                id: trackId,
                songTitle: track.name,
                duration: track.duration,
                album: albumDetails.name,
                artist: albumDetails.artist,
                albumImage: albumDetails.image
            }
            dispatch(addToFavorites(trackFavorite));
            setFavoriteTracks((prev) => {
                const newSet = new Set(prev);
                newSet.add(trackId);
                return newSet;
            });
        }
    }

    return (
        <div>
            <Typography variant="h4" color={"textPrimary"}>{albumDetails.name}</Typography>
            <Avatar variant="square" src={albumDetails.image} className={classes.albumImage}/>
            <Typography variant="subtitle1" color={"textPrimary"}>
                Listeners: {albumDetails.listeners}
            </Typography>
            <Typography variant="subtitle1" color={"textPrimary"}>Playcount: {albumDetails.playCount}</Typography>
            <Typography variant="body1">Summary:</Typography>
            <div style={{color: "white"}} dangerouslySetInnerHTML={{__html: albumDetails.summary}}></div>
            <TableContainer component={Paper} className={classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Track Name</TableCell>
                            <TableCell>Favorite</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {albumDetails?.tracks[0]?.map((track: Track) => (
                            <TableRow key={track.url}>
                                <TableCell>
                                    <Link href={track.url} target="_blank" rel="noreferrer" color={"textSecondary"}>
                                        {track.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="toggle favorite"
                                        onClick={() => toggleFavorite(albumDetails, track)}
                                    >
                                        {isFavorite(track.url) ? <FavoriteIcon style={{color: red[500]}}/> : <FavoriteBorderIcon/>}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AlbumDetailsView;

