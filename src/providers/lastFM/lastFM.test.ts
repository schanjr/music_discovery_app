import  LastFM from './lastFM';
import albumInterface from "./album.interface";

describe('lastFm service', () => {
    it('should fetch artist data', async () => {
        const artist = 'Justin Bieber';
        const lastFM = new LastFM();
        const result = await lastFM.getArtistTopAlbums(artist, 1, 1);
        // expect(result.artist.name).toEqual(artist);
        result.forEach((album: albumInterface) => {
            expect(album.artist).toEqual(artist);
        })

    });

    it('should throw an error for invalid artist name', async () => {
        const artist = 'InvalidArtistName';
        const lastFM = new LastFM();
        await expect(lastFM.getArtistTopAlbums(artist, 1, 1)).rejects.toThrow(`No results found for artist "${artist}"`);
    });

    it('should fetch album detail data', async () => {
        const artist = 'Justin Bieber';
        const album = 'Believe';
        const lastFM = new LastFM();
        const result = await lastFM.getAlbumDetails(artist, album);
        expect(result.artist).toEqual(artist);
        expect(result.name).toEqual(album);
    });

    it('should fetch album detail data', async () => {
        const artist = 'InvalidArtistName';
        const album = 'InvalidAlbumName';
        const lastFM = new LastFM();
        await expect(lastFM.getAlbumDetails(artist, album)).rejects.toThrow(`Error making Last.fm API request: Not Found`);
    });



});
