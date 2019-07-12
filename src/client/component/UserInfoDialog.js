import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';



export default class UserInfoDialog extends React.Component {

    state = {
        name: '',
        whatsup: '',
        roomId: '',
        createRoom: false,
        numWerewolf: 4,
        numVillager: 4,
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

    handleCreatRoomSwitchChange = () => {
        this.setState(prevState => ({ createRoom: !prevState.createRoom }))
    }

    handleNumberOfWerewolfSlider = (e, newValue) => {
        this.setState({numWerewolf: newValue})
    }

    handleNumberOfVillagerSlider = (e, newValue) => {
        this.setState({numVillager: newValue})
    }

    handleJoinRoomButton = () => {
        let { name, whatsup, roomId, createRoom, numWerewolf, numVillager } = this.state;
        createRoom ? 
        this.props.handleCreateRoomButton(roomId, name, whatsup, numWerewolf, numVillager)
        : 
        this.props.handleJoinRoomButton(roomId, name, whatsup)
    }

    render() {
        let {
            name,
            whatsup,
            roomId,
            createRoom,
            numWerewolf,
            numVillager
        } = this.state;
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
                    <Grid alignItems="flex-end" container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                value={roomId}
                                onChange={this.handleRoomIdTextFieldChange}
                                margin="dense"
                                label="Room ID"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={createRoom}
                                        onChange={this.handleCreatRoomSwitchChange}
                                        value="checkedB"
                                    />
                                }
                                label="Create"
                            />
                        </Grid>
                    </Grid>
                    {
                        createRoom &&
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography gutterBottom>
                                    # Werewolf
                            </Typography>
                                <Slider
                                    defaultValue={numWerewolf}
                                    onChange={this.handleNumberOfWerewolfSlider}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={1}
                                    max={5}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>
                                    # Villager
                            </Typography>
                                <Slider
                                    defaultValue={numVillager}
                                    onChange={this.handleNumberOfVillagerSlider}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={1}
                                    max={5}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled
                                                checked
                                            />
                                        }
                                        label="Seer"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled
                                                checked
                                            />
                                        }
                                        label="Hunter"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled
                                                checked
                                            />
                                        }
                                        label="Witch"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled
                                                checked
                                            />
                                        }
                                        label="Idiot"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    }
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleJoinRoomButton}
                        color="primary">
                        {createRoom ? 'Create Room' : 'Join Room'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}