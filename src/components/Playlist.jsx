import React, {useState} from 'react'
import PT from 'prop-types'
import PlaylistItem from "./PlaylistItem";
import './Playlist.styl'

const b = 'Playlist';

const PlayList = ({list, onSearch, onItemClick, currentTrack, selectedTrack}) => {

    const [text, setText] = useState('');

    function handleSearch() {
        onSearch(text)
    }

    function handleSubmin(e) {
        e.preventDefault();
        e.stopPropagation();
        handleSearch()
    }

    return (
        <div className={b}>
            <form className={b + '__search'} onSubmit={handleSubmin}>
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className={b + '__input'}
                    placeholder="artist name"
                />

                <div className={b + '__search-button'} onClick={handleSearch}>search</div>
            </form>

            <div className={b + '__list'}>
                {list && list.map(v => v.kind === 'song' &&
                    <PlaylistItem
                        key={v.trackId}
                        onClick={() => onItemClick(v)}
                        track={v}
                        isCurrent={currentTrack && v.trackId === currentTrack.trackId}
                        isSelected={selectedTrack && v.trackId === selectedTrack.trackId}
                    />
                )}
            </div>
        </div>
    )
};

PlayList.propTypes = {
    list: PT.array,
    onSearch: PT.func,
    onItemClick: PT.func,
    currentTrack: PT.object,
    selectedTrack: PT.object,
};

export default PlayList