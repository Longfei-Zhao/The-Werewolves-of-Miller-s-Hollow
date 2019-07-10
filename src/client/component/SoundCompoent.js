import React from 'react';
import Sound from 'react-sound';
import howlSound from '../sound/howl.mp3';
import GAMESTATUS from '../gameStatus';

export default class SoundCompoent extends React.Component {

    render() {
        let { gameStatus } = this.props
        switch (gameStatus) {
            case GAMESTATUS.START:
                return <Sound
                    url={howlSound}
                    playStatus={Sound.status.PLAYING} />
            default:
                return null
        }
        // return (
        //     ( switch(gameStatus) {
        //         case GAMESTATUS.START:
        //                 return <Sound
        //                         url={Sound1}
        //                         playStatus={Sound.status.PLAYING} />
        //     })
        //     // { renderSwitch(gameStatus) }
        //     // (
        //     //     true && 
        //     //     <Sound
        //     //         url={Sound1}
        //     //         playStatus={Sound.status.PLAYING} />
        //     // )

        // )
    }
}