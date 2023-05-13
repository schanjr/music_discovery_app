export interface Track {
    name: string;
    duration: number;
    url: string;
}

interface AlbumDetail {
    name: string;
    artist: string;
    image: string;
    listeners: number;
    summary: string;
    playCount: number;
    tracks: Track[]
}

export default AlbumDetail