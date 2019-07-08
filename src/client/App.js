import React from 'react';
import 'typeface-roboto';
import Header from './component/Header';
import GameBoard from './component/GameBoard';
import UserInfoDialog from './component/UserInfoDialog';
import SoundCompoent from './component/SoundCompoent';
import Snackbar from '@material-ui/core/Snackbar';
import SocketIOClient from "socket.io-client";
import {
    GAMESTATUS,
    ROLE,
    PLAYERSTATUS,
    OPERATION_TYPE
} from './util';
import Operation from './component/Operation';
const socket = SocketIOClient('localhost:8080');

export default class App extends React.Component {

    state = {
        roomId: null,
        playerId: null,
        prepared: false,
        open: true,
        players: [],
        roles: [],
        gameStatus: null,
        message: '',
        snackbarOpen: false
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
        socket.on('updatePlayers', players => {
            this.setState({ players })
        });
        socket.on('updateGameStatus', (gameStatus) => {
            this.setState({ gameStatus })
        })
    }

    handleJoinRoomButton = (roomId, name, whatsup) => {
        socket.emit('joinRoom', roomId, name, whatsup)
        this.setState({
            open: false,
            roomId
        })
    }

    // handleKillButtonClick = (e, playerId) => {
    //     socket.emit('updateGameStatus', GAMESTATUS.WEREWOLF_MOVED, playerId)
    // }

    // handleSeeButtonClick = (e, playerId) => {
    //     const message = `Player ${playerId} is a ${this.state.roles[playerId] === ROLE.WEREWOLF ? 'BAD' : 'GOOD'} people.`
    //     this.setState({
    //         snackbarOpen: true,
    //         message
    //     })
    //     socket.emit('updateGameStatus', GAMESTATUS.SEER_MOVED)
    // }

    // handleSaveButtonClick = (e, playerId) => {
    //     socket.emit('updateGameStatus', GAMESTATUS.WITCH_MOVED, playerId, true)
    // }

    // handlePoisonButtonClick = (e, playerId) => {
    //     socket.emit('updateGameStatus', GAMESTATUS.WITCH_MOVED, playerId, false)
    // }

    handleOperationButtonClick = (e, operation, playerId) => {
        switch (operation) {
            case OPERATION_TYPE.SIT:
                this.setState({ playerId });
                socket.emit('sit', playerId);
                break;
            case OPERATION_TYPE.KILL:
                socket.emit('updateGameStatus', GAMESTATUS.WEREWOLF_MOVED, playerId)
                break;
            case OPERATION_TYPE.SEE:
                const message = `Player ${playerId} is a ${this.state.roles[playerId] === ROLE.WEREWOLF ? 'BAD' : 'GOOD'} people.`
                this.setState({
                    snackbarOpen: true,
                    message
                });
                socket.emit('updateGameStatus', GAMESTATUS.SEER_MOVED);
                break;
            case OPERATION_TYPE.WITCH:
                let save = this.state.players[playerId].status === PLAYERSTATUS.DEAD;
                socket.emit('updateGameStatus', GAMESTATUS.WITCH_MOVED, playerId, save)
                break;
            default:
                break;
        }
    }

    render() {
        let {
            playerId,
            gameStatus,
            open,
            roles,
            players,
            roomId,
            message,
            snackbarOpen
        } = this.state;
        let operation, role;
        if (playerId === null) {
            operation = OPERATION_TYPE.SIT;
            role = null;
        }
        else {
            role = roles[playerId];
            switch (true) {
                case role === ROLE.WEREWOLF &&
                    gameStatus === GAMESTATUS.START:
                    operation = OPERATION_TYPE.KILL;
                    break
                case role === ROLE.SEER &&
                    gameStatus === GAMESTATUS.SEER_MOVE:
                    operation = OPERATION_TYPE.SEE;
                    break
                case role === ROLE.WITCH &&
                    gameStatus === GAMESTATUS.WITCH_MOVE:
                    operation = OPERATION_TYPE.WITCH;
                    break
                default:
                    break
            }
        }

        return (
            <div>
                <Header
                    role={role} />
                <UserInfoDialog
                    open={open}
                    handleClose={this.handleClose}
                    handleJoinRoomButton={this.handleJoinRoomButton} />
                <GameBoard
                    playerId={playerId}
                    players={players}
                    roomId={roomId}
                    operation={operation}
                    handleSitHereButtonClick={this.handleSitHereButtonClick}
                    handleOperationButtonClick={this.handleOperationButtonClick} />
                {/* <SoundCompoent
                    gameStatus={gameStatus} /> */}
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    message={message} />
            </div>
        )
    }
}