import React from 'react';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GameBoard from './component/GameBoard';
import SocketIOClient from "socket.io-client";

const emptyPlayer = {
  name: null,
  avatar: null,
  whatsup: null
}
let emptyPlayers = [];
for (let i = 0; i < 12; i++) {
  emptyPlayers.push({
    id: i,
    ...emptyPlayer
  })
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myInfo: {
        name: '',
        whatsup: '',
        avatar: null,
        id: null
      },
      open: false,
      id: null,
      players: emptyPlayers
    };
  }

  handleSitHereButtonClick = (e, id) => {
    let players = [...this.state.players];
    players[this.state.id] = { ...emptyPlayer, id: this.state.id };
    players[id] = { ...this.state.myInfo, id };
    this.setState({
      id,
      players
    });
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
      myInfo: {
        ...this.state.myInfo,
        name: e.target.value
      }
    })
  }

  handleWhatsupTextFieldChange = (e) => {
    this.setState({
      myInfo: {
        ...this.state.myInfo,
        whatsup: e.target.value
      }
    })
  }

  render() {
    const socket = SocketIOClient('localhost:8080');
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Button color="inherit" onClick={this.handleChangeInfoButtonClick}>Player Information</Button>
          </Toolbar>
        </AppBar>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Enter your information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
                        </DialogContentText>
            <TextField
              autoFocus
              value={this.state.myInfo.name}
              onChange={this.handleNameTextFieldChange}
              margin="dense"
              id="name"
              label="Player name"
              fullWidth
            />
            <TextField
              autoFocus
              value={this.state.myInfo.whatsup}
              onChange={this.handleWhatsupTextFieldChange}
              margin="dense"
              id="whatsup"
              label="What's up"
              fullWidth
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
                    </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
                    </Button>
          </DialogActions>
        </Dialog>
        <GameBoard
          id={this.state.id}
          players={this.state.players}
          handleSitHereButtonClick={this.handleSitHereButtonClick}
          handleStandUpButtonClick={this.handleStandUpButtonClick} />
      </div>
    )
  }
}