import React from 'react';
import 'typeface-roboto';
import Header from './component/Header';
import GameBoard from './component/GameBoard';
import UserInfoDialog from './component/UserInfoDialog';
import SoundCompoent from './component/SoundCompoent';
import Snackbar from '@material-ui/core/Snackbar';
import gameStatus from './gameStatus';
import io from "socket.io-client";
const socket = io('http://localhost:8080');

export default class App extends React.Component {

  state = {
    roomId: null,
    playerId: null,
    open: true,
    players: [],
    gameOn: false,
    hunted: false
  }

  componentDidMount() {
    fetch('/api/init')
      .then(res => res.json())
      .then(res => {
        let { players, roles } = res;
        this.roles = roles;
        this.setState({ players });
      })
    socket.on('updatePlayers', players => this.setState({ players }));
    socket.on('gameOn', () => {
      this.setState({ gameOn: true })
    })
  }

  handleSitHereButtonClick = (e, playerId) => {
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
      open,
      prepared,
      players,
      roomId
    } = this.state

    return (
      <div>
        <Header
          playerId={playerId}
          role={this.roles}
          handleChangeInfoButtonClick={this.handleChangeInfoButtonClick} />
        <UserInfoDialog
          open={open}
          handleClose={this.handleClose}
          handleJoinRoomButton={this.handleJoinRoomButton} />
        <GameBoard
          playerId={playerId}
          players={players}
          prepared={prepared}
          roomId={roomId}
          handleSitHereButtonClick={this.handleSitHereButtonClick}
          handleStandUpButtonClick={this.handleStandUpButtonClick} />
        <SoundCompoent gameOn={this.state.gameOn} />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={true}
          message='Test' />
      </div>
    )
  }
}