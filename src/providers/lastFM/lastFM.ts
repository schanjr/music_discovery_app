import Album from './album.interface'
import AlbumDetail from './albumDetail.interface';


class LastFM {
    private readonly apiKey: string
    private apiUrl = 'https://ws.audioscrobbler.com/2.0/';

    constructor(apiKey?: string) {
        this.apiKey = apiKey || process.env.REACT_APP_LASTFM_API_KEY || '';
    }

    public async getArtistTopAlbums(artistName: string, page = 1, limit = 1000): Promise<Album[]> {
        const response = await this.makeApiRequest({
            method: 'artist.getTopAlbums',
            artist: artistName,
            page: page,
            limit: limit
        });

        const albumResults = response?.topalbums?.album;

        if (!albumResults) {
            throw new Error(`No results found for artist "${artistName}"`);
        }
        // eslint-disable-next-line
        return albumResults.map((album: any) => ({
            name: album.name,
            artist: album.artist.name,
            image: album.image?.[1]?.['#text'] || '',
            playCount: album.playcount
        }));
    }

    public async getAlbumDetails(artistName: string, albumName: string): Promise<AlbumDetail> {
        const response = await this.makeApiRequest({
            method: 'album.getinfo',
            artist: artistName,
            album: albumName
        });

        const album = response?.album;

        if (!album) {
            throw new Error(`No results found for artist "${artistName}" with album "${albumName}"`);
        }
        // console.log(album)

        return ({
            name: album.name,
            artist: album.artist,
            image: album.image?.[2]?.['#text'] || '',
            listeners: album.listeners,
            summary: album?.wiki?.summary,
            playCount: album.playcount,
            // eslint-disable-next-line
            tracks: [album?.tracks?.track.map((track: any) => ({
                name: track.name,
                duration: track.duration,
                url: track.url
            }))]
        })
    }

    // eslint-disable-next-line
    private async makeApiRequest(params: any): Promise<any> {
        const query = new URLSearchParams({
            ...params,
            api_key: this.apiKey,
            format: 'json',
        });

        const response = await fetch(`${this.apiUrl}?${query.toString()}`);

        if (!response.ok) {
            throw new Error(`Error making Last.fm API request: ${response.statusText}`);
        }

        return response.json();
    }
}

export default LastFM;
