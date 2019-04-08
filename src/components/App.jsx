import React, {useState, useEffect}        from 'react'
import './App.styl';
import Player from "./Player";
import PlayList from "./Playlist";
import api from "../api";
import cn from 'classnames';


const App = ( ) => {
    const b = 'App';

    const [list, setList] = useState(null);
    const [layout, setLayout] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [playState, setPlayState] = useState('paused');

    const isCurrentSelected =
        currentTrack && selectedTrack && currentTrack.trackId === selectedTrack.trackId;

    // Layout
    useEffect(()=>{
        function handleResize() {
            const layout = document.body.clientWidth > 959 ? 'full' : 'compact';
            setLayout(layout)
        }
        handleResize();
        window.addEventListener('resize', handleResize);
    },[]);

    async function handleSearch( string ) {
        const resp = await api.searchArtist( string ).catch(handleError);
        const list = await resp.json();
        setList(list.results)
    }

    async function getAlbum( collectionId ) {
        setSelectedAlbum(null);
        const resp = await api.getAlbum(collectionId).catch(handleError);
        const album = await resp.json();
        setSelectedAlbum(album.results)
    }

    function togglePause(){
        setPlayState(playState === 'paused' || !isCurrentSelected ? 'playing' : 'paused');
        setCurrentTrack(selectedTrack);

    }

    function handleSelect(track){
        if ( layout==='full' ) {
            setSelectedTrack(track);
            if (!selectedAlbum || selectedAlbum.collectionId !== track.collectionId)
                getAlbum(track.collectionId)
        }
        else {
            setSelectedTrack(track);
            setCurrentTrack(track);
            setPlayState('playing')
        }
    }

    function handleError(e) {
        console.log(e)
    }

    return (
        <div className={cn(b, {'hasTrackSelected': !!selectedTrack})}>

            <PlayList
                onSearch={handleSearch}
                onItemClick={handleSelect}
                {...{list, currentTrack, selectedTrack}}
            />

            {selectedTrack &&
            <Player
                url={currentTrack && currentTrack.previewUrl}
                fullMode={layout==='full'}
                {...{playState, selectedAlbum, togglePause, isCurrentSelected}}
            />}

        </div>
    )
};

export default App