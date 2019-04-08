import React from 'react';
import PT from 'prop-types';
import './PlaylistItem.styl';
import IconSound from '../static/sound.svg'

import cn from 'classnames';

const b = 'PlaylistItem';

const PlaylistItem = (
    {
        track:{ artworkUrl60, trackName, artistName, collectionName },
        isCurrent,
        isSelected,
        onClick
    }) => {

    return(
        <div className={cn(b, {'is-selected':isSelected})} {...{onClick}}>
            <div className={b+'__art'}>
                <img src={artworkUrl60} alt="art"/>
            </div>

            <div className={b+'__info'}>
                <div className={b+'__song'}>{trackName}</div>
                <div className={b+'__artist'}>{artistName}</div>
                <div className={b+'__album'}>{collectionName}</div>
            </div>

            {isCurrent &&
            <IconSound className={b+'__indicator'}/>
            }
        </div>
    )
};

PlaylistItem.propTypes = {
    track: PT.object,
    isActive: PT.bool,
    onClick:PT.func,
    isCurrent: PT.bool,
    isSelected: PT.bool
};

export default PlaylistItem