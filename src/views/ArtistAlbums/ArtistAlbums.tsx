import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import Album from "../../providers/lastFM/album.interface";
import { makeStyles } from '@material-ui/core/styles';
import LastFM from "../../providers/lastFM/lastFM";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    TableSortLabel
} from '@material-ui/core';
import {useNavigate} from "react-router-dom";
import {setAlbumDetails} from "../../store/albumDetailsSlice";
import {encodePathString} from "../../utils/handleUrls";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    albumImage: {
        width: 50,
        height: 50
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: '#32de66',
            opacity: '98%',
            cursor: 'pointer',
        },
    },
});

const ArtistAlbums: React.FC = () => {
    const classes = useStyles();
    const albums = useSelector((state: RootState) => state.albums.albums);
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [orderBy, setOrderBy] = useState<"name" | "playCount">("playCount");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSort = (property: "name" | "playCount") => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const sortedAlbums = albums.slice().sort((a: Album, b: Album) => {
        const isAsc = order === "asc";
        if (orderBy === "name") {
            return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        return isAsc ? a.playCount - b.playCount : b.playCount - a.playCount;
    });

    const handleRowClick = async (albumName: string, artistName: string) => {
        const encodedArtistName = encodePathString(artistName)
        const encodedAlbumName = encodePathString(albumName)
        try {
            const lastFM = new LastFM()
            const albumDetails = await lastFM.getAlbumDetails(artistName, albumName)
            dispatch(setAlbumDetails(albumDetails));
            navigate(`/artists/${encodedArtistName}/albums/${encodedAlbumName}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Album Cover</TableCell>
                            <TableCell sortDirection={orderBy === "name" ? order : false}>
                                <TableSortLabel
                                    active={orderBy === "name"}
                                    direction={orderBy === "name" ? order : "asc"}
                                    onClick={() => handleSort("name")}
                                >
                                    Album Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sortDirection={orderBy === "playCount" ? order : false}>
                                <TableSortLabel
                                    active={orderBy === "playCount"}
                                    direction={orderBy === "playCount" ? order : "asc"}
                                    onClick={() => handleSort("playCount")}
                                >
                                    Playcount
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedAlbums.map((album: Album) => (
                            <TableRow key={album.name} className={classes.tableRowHover} onClick={() => handleRowClick(album.name, album.artist)}>
                                <TableCell component="th" scope="row">
                                    <Avatar variant="square" src={album.image} className={classes.albumImage} />
                                </TableCell>
                                <TableCell>{album.name}</TableCell>
                                <TableCell>{album.playCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ArtistAlbums;
