import React from 'react';
import 'typeface-roboto';
import Header from './component/Header';
import GameBoard from './component/GameBoard';
import UserInfoDialog from './component/UserInfoDialog';
import SoundCompoent from './component/SoundCompoent';
import Snackbar from '@material-ui/core/Snackbar';
import gameStatus from './gameStatus';
import SocketIOClient from "socket.io-client";
const socket = SocketIOClient('localhost:8080');

export default class App extends React.Component {

  state = {
    roomId: null,
    playerId: null,
    prepared: false,
    open: true,
    players: [],
    roles: [],
    gameStatus: null
  }

  componentDidMount() {
    fetch('/api/init')
      .then(res => res.json())
      .then(res => {
        let { players } = res;
        this.setState({ players });
      })
    socket.on('updateRoomInfo', roomInfo => {
      let { players, roles, status } = roomInfo;
      this.setState({
        players,
        roles,
        status
      })
    })

    socket.on('updatePlayers', players => this.setState({ players }));
    socket.on('updateGameStatus', (gameStatus) => {
      this.setState({ gameStatus })
    })
  }

  handleSitHereButtonClick = (e, playerId) => {
    console.log(1)
    this.setState({ playerId }) 
    socket.emit('sit', playerId);
  }

  // handleStandUpButtonClick = () => {
  //   let players = [...this.state.players];
  //   players[this.state.id] = { ...emptyPlayer, id: this.state.id };
  //   this.setState({
  //     id: null,
  //     players
  //   });
  // }

  // handleChangeInfoButtonClick = () => {
  //   this.setState({ open: true });
  // }

  // handleDialogOkButtonClick = () => {

  // }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleJoinRoomButton = (roomId, name, whatsup) => {
    socket.emit('joinRoom', roomId, name, whatsup)
    this.setState({
      open: false,
      roomId
    })
  }

  render() {
    let {
      playerId,
      gameStatus,
      open,
      roles,
      players,
      roomId
    } = this.state

    return (
      <div>
        <Header
          playerId={playerId}
          roles={roles} />
        <UserInfoDialog
          open={open}
          handleClose={this.handleClose}
          handleJoinRoomButton={this.handleJoinRoomButton} />
        <GameBoard
          playerId={playerId}
          players={players}
          roomId={roomId}
          handleSitHereButtonClick={this.handleSitHereButtonClick}
          handleStandUpButtonClick={this.handleStandUpButtonClick} />
        <SoundCompoent
          gameStatus={gameStatus} />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={true}
          message='Test' />
      </div>
    )
  }
}