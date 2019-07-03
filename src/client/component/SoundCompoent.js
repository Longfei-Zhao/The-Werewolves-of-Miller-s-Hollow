import React from 'react';
import Sound from 'react-sound';
import Sound1 from '../sound/1.mp3';

export default class SoundCompoent extends React.Component {
    render() {
        return (
            (
                this.props.gameOn && 
                <Sound
                    url={Sound1}
                    playStatus={Sound.status.PLAYING} />
            )

        )
    }
}