import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

export default class UserInfoDialog extends React.Component {
    render() {
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
                        value={this.props.name}
                        onChange={this.props.handleNameTextFieldChange}
                        margin="dense"
                        id="name"
                        label="Player name"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        value={this.props.whatsup}
                        onChange={this.props.handleWhatsupTextFieldChange}
                        margin="dense"
                        id="whatsup"
                        label="What's up"
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}