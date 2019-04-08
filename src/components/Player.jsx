import React, {useEffect, useRef} from 'react'
import PT from 'prop-types'
import cn from 'classnames'
import IconPlay from '../static/play.svg'
import IconPause from '../static/pause.svg'
// import IconPrev from '../static/step-back.svg'
// import IconNext from '../static/step-fwd.svg'

import './Player.styl'

const b = 'Player';

const Player = ({url, playState, selectedAlbum, fullMode, togglePause, isCurrentSelected}) => {
    const player = useRef();

    useEffect(() => {
        if (player.current && url) {
            player.current.src = url;
            player.current.play();
            player.current.addEventListener('ended', togglePause)
        }

    }, [url]);

    useEffect(() => {
        playState === 'paused' ? player.current.pause() : player.current.play()
    }, [playState]);


    return (
        <div className={cn(b, {'-full-mode': fullMode})}>

            {fullMode &&
            <div className={cn(b + '__art', {'h-loader': !selectedAlbum})}>
                {selectedAlbum && <img src={selectedAlbum[0].artworkUrl100} alt=""/>}
            </div>
            }

            <div className={b + '__controls'}>

                {/*{isCurrentSelected &&*/}
                {/*<IconPrev className={b + '__prev-track'}/>}*/}

                <div className={b + '__play-pause'} onClick={togglePause}>
                    {playState === 'paused' || !isCurrentSelected
                        ? <IconPlay/>
                        : <IconPause/>
                    }
                </div>

                {/*{isCurrentSelected &&*/}
                {/*<IconNext className={b + '__next-track'}/>}*/}

                {/*<div className={b+'__bar'}> </div>*/}
            </div>

            {fullMode &&
            <div className={cn(b + '__songs', {'h-loader': !selectedAlbum})}>
                {selectedAlbum && selectedAlbum.map((v, i) => v.wrapperType === 'track' &&
                    <div key={i} className={b + '__song'}>{v.trackNumber}.&nbsp; {v.trackName}</div>
                )}
            </div>
            }

            <audio ref={player}/>
        </div>
    )
};

Player.propTypes = {
    url: PT.string,
    playState: PT.string,
    selectedAlbum: PT.object,
    fullMode: PT.bool,
    togglePause: PT.func,
    isCurrentSelected: PT.bool
};

export default Player