import React from 'react';
import Sound from 'react-sound';
import howlSound from '../sound/howl.mp3';
import startSound from '../sound/2.mp3';
import seerSound from '../sound/seerSound.mp3';
import witchSound from '../sound/witchSound.mp3';
import finishSound from '../sound/finishSound.mp3';
import { GAMESTATUS } from '../util';


// eslint-disable-next-line react/prefer-stateless-function
export default class SoundCompoent extends React.Component {

  render() {
    const { gameStatus } = this.props;

    switch (gameStatus) {
      case GAMESTATUS.START:
        return (
          <Sound
            url={startSound}
            playStatus={Sound.status.PLAYING} />
        );
      case GAMESTATUS.SEER_MOVE:
        return (
          <Sound
            url={seerSound}
            playStatus={Sound.status.PLAYING} />
        );
      case GAMESTATUS.WITCH_MOVE:
        return (
          <Sound
            url={witchSound}
            playStatus={Sound.status.PLAYING} />
        );
      case GAMESTATUS.FINISH:
        return (
          <Sound
            url={finishSound}
            playStatus={Sound.status.PLAYING} />
        );
      default:
        return null;
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
