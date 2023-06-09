// Encode a string to URL path friendly format
const encodePathString = (str: string) => {
    return encodeURI(str.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '.'));
}

// Decode a string from URL path friendly format
const decodePathString =  (str: string) => {
    return decodeURI(str.replace(/-/g, ' ').replace(/\./, '/'));
}

const toAlbumDetailsSliceKey = (artistId = '', artistAlbum = '') => {
    return encodePathString(`${artistId}--${artistAlbum}`);
}

export {encodePathString, decodePathString, toAlbumDetailsSliceKey};

