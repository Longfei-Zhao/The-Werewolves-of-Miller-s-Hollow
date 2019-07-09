import React from 'react';
import defaultAvatar from '../image/default_avatar.png';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Operation from './Operation';
import '../css/common.css';
import bloodImg from '../image/blood.png';
import { PLAYERSTATUS } from '../util';

class Player extends React.Component {

    state = {

    };

    render() {
        const {
            player: {
                name,
                whatsup,
                prepared,
                status
            },
            playerId,
            seatId,
            operation
        } = this.props

        return (
            <Card
                className='card'
                variant="contained"
                color="default">
                {
                    status === PLAYERSTATUS.DEAD &&
                    <img className='dead' src={bloodImg} />
                }
                <CardContent className='cardContent'>
                    <Typography
                        variant="h6"
                    >
                        #{seatId}
                    </Typography>
                    <Avatar alt="avatar" src={defaultAvatar} />
                    <Typography variant="body1">
                        {name ? name : 'Empty'}
                    </Typography>
                    <Typography variant="body2">
                        {whatsup ? whatsup : "What's up..."}
                    </Typography>
                    {/* <Typography variant="body1" gutterBottom>
                        {status ? status : ""}
                    </Typography> */}
                </CardContent>
                <Operation
                    seatId={seatId}
                    status={status}
                    playerId={playerId}
                    prepared={prepared}
                    operation={operation}
                    handleOperationButtonClick={this.props.handleOperationButtonClick} />
            </Card>
        );
    }
}

export default Player;