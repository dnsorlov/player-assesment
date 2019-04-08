
const getQuery = params => {
    const arr = Object.keys(params).map( key =>
        key + '=' + encodeURIComponent(params[key])
    );
    return '?' + arr.join('&')
};

const api = {
    searchArtist: term => fetch('https://itunes.apple.com/search'+getQuery({term, entity:'musicTrack',attribute:'allArtistTerm'})),
    getAlbum: id => fetch('https://itunes.apple.com/lookup'+getQuery({id, entity:'song'}))
};

export default api
