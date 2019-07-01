import React from 'react';
import 'typeface-roboto';
import Header from './component/Header';
import GameBoard from './component/GameBoard';
import UserInfoDialog from './component/UserInfoDialog';
import SocketIOClient from "socket.io-client";
import Sound from 'react-sound';
// import soundTest from './sound/hello.mp3';
const socket = SocketIOClient();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: '',
      whatsup: '',
      open: true,
      prepared: false,
      players: []
    };
  }

  componentDidMount() {
    fetch('/api/getPlayers')
      .then(res => res.json())
      .then(res => {
        let {players, roles} = res;
        this.roles = roles;
        this.setState({ players });
      })
    socket.on('updatePlayers', players => this.setState({ players }));
  }

  handleSitHereButtonClick = (e, id) => {
    let { name, whatsup } = this.state;
    this.setState({
      prepared: true,
      id
    })
    socket.emit('sit', id, name, whatsup);
  }

  handleStandUpButtonClick = () => {
    let players = [...this.state.players];
    players[this.state.id] = { ...emptyPlayer, id: this.state.id };
    this.setState({
      id: null,
      players
    });
  }

  handleChangeInfoButtonClick = () => {
    this.setState({ open: true });
  }

  handleDialogOkButtonClick = () => {

  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleNameTextFieldChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleWhatsupTextFieldChange = (e) => {
    this.setState({
      whatsup: e.target.value
    })
  }

  render() {
    let { id, open, name, whatsup, prepared, players } = this.state
    return (
      <div>
        <Header
          id={id}
          role={this.roles}
          handleChangeInfoButtonClick={this.handleChangeInfoButtonClick} />
        <UserInfoDialog
          open={open}
          name={name}
          whatsup={whatsup}
          handleClose={this.handleClose}
          handleNameTextFieldChange={this.handleNameTextFieldChange}
          handleWhatsupTextFieldChange={this.handleWhatsupTextFieldChange} />
        <GameBoard
          id={id}
          players={players}
          prepared={prepared}
          handleSitHereButtonClick={this.handleSitHereButtonClick}
          handleStandUpButtonClick={this.handleStandUpButtonClick} />
        <Sound
          url={'./src/client/sound/hello.mp3'}
          playStatus={Sound.status.PLAYING} />
      </div>
    )
  }
}