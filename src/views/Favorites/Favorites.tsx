import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@material-ui/core';
import {FavoriteType, removeFromFavorites} from "../../store/favoritesSlice";
import {encodePathString} from "../../utils/handleUrls";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(6),
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    tableContainer: {
        marginTop: theme.spacing(2),
        width: '80%',
        height: '80%',
    },
    table: {
        minWidth: 650,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
    },
}));

const Favorites = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector((state: { favorites: FavoriteType[] }) => state.favorites);


    const handleRemoveFavorite = (index: string) => {
        dispatch(removeFromFavorites(index));
    };

    return (
        <div className={classes.root}>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} aria-label="favorites table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>Album</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Album Name</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Song Title</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Duration</TableCell>
                            <TableCell className={classes.tableHeaderCell}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(favorites)?.map((favorite: FavoriteType) => (
                            <TableRow hover key={favorite.id}>
                                <TableCell>
                                    <img src={favorite.albumImage} alt={favorite.album} style={{width: 50, height: 50}}/>
                                </TableCell>
                                <TableCell>{favorite.album}</TableCell>
                                <TableCell>{favorite.songTitle}</TableCell>
                                <TableCell>{favorite.duration}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`/artists/${encodePathString(favorite.artist)}/albums/${encodePathString(favorite.album)}`)}
                                    >
                                        View Album
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleRemoveFavorite(favorite.id)}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Favorites;
