import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

export default class UserInfoDialog extends React.Component {

    state = {
        name: '',
        whatsup: '',
        roomId: ''
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

    handleRoomIdTextFieldChange = (e) => {
        this.setState({
            roomId: e.target.value
        })
    }

    handleJoinRoomButton = () => {
        let { name, whatsup, roomId } = this.state;
        this.props.handleJoinRoomButton(roomId, name, whatsup)
    }

    render() {
        let { name, whatsup, roomId } = this.state;
        return (
            <Dialog
                open={this.props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Enter your information</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={name}
                        onChange={this.handleNameTextFieldChange}
                        margin="dense"
                        label="Player name"
                        fullWidth
                    />
                    <TextField
                        value={whatsup}
                        onChange={this.handleWhatsupTextFieldChange}
                        margin="dense"
                        label="What's up"
                        fullWidth
                    />
                    <TextField
                        value={roomId}
                        onChange={this.handleRoomIdTextFieldChange}
                        margin="dense"
                        label="Room ID"
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleJoinRoomButton} color="primary">
                        Join room
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}