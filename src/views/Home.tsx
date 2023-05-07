import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Typography,
    Card,
    CardContent,
    Grow
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(6),
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        height: 250,
        width: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
        margin: 2,
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#32de66'},
    },
    cardContent: {
        flexGrow: 1,
        padding: 25,
    },
}));

const Home = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [showFavoriteCard, setShowFavoriteCard] = React.useState(false);
    const [showArtistCard, setShowArtistCard] = React.useState(false);
    const [showSongCard, setShowSongCard] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => setShowFavoriteCard(true), 300);
        setTimeout(() => setShowArtistCard(true), 600);
        setTimeout(() => setShowSongCard(true), 900);
    }, []);

    return (
        <Grid container alignItems="center" className={classes.root}>
            <Grid item >
                <Grow in={showFavoriteCard} timeout={500}>
                    <Card className={classes.card} onClick={() => { navigate('/favorites')}}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Visit Your <FavoriteIcon style={{color: red[500]}}/> List
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Organize your Favorite Songs
                            </Typography>
                        </CardContent>
                    </Card>
                </Grow>
            </Grid>
            <Grid item >
                <Grow in={showArtistCard} timeout={500}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent} onClick={() => { navigate('/artists')}}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Search Artists
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Find information about your favorite artists
                            </Typography>
                        </CardContent>
                    </Card>
                </Grow>
            </Grid>
            <Grid item>
                <Grow in={showSongCard} timeout={500}>
                    <Card className={classes.card} onClick={() => { navigate('/songs')}} >
                        <CardContent className={classes.cardContent}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Search Songs (under construction)
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Discover new songs and lyrics
                            </Typography>
                        </CardContent>
                    </Card>
                </Grow>
            </Grid>
        </Grid>
    );
};

export default Home;
