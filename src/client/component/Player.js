import React from 'react';
import defaultAvatar from '../image/default_avatar.png';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Operation from './Operation';


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
            id,
            operation
        } = this.props

        return (
            <Card variant="contained" color="default">
                <CardContent>
                    <Avatar alt="avatar" src={defaultAvatar} />
                    <Typography variant="h6" gutterBottom>
                        #{id}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {name ? name : 'Empty'}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {whatsup ? whatsup : "What's up..."}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {status ? status : ""}
                    </Typography>
                </CardContent>
                <Operation
                    id={id}
                    status={status}
                    playerId={playerId}
                    prepared={prepared}
                    operation={operation}
                    handleSitHereButtonClick={this.props.handleSitHereButtonClick}
                    handleOperationButtonClick={this.props.handleOperationButtonClick} />
            </Card>
        );
    }
}

export default Player;