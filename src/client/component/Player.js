import React from 'react';
import defaultAvatar from '../image/default_avatar.png';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Operation from './Operation';


class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleSitHereButtonClick = (e) => {
        this.props.handleSitHereButtonClick(e, this.props.id)
    }

    handleStandUpButtonClick = () => {
        this.props.handleStandUpButtonClick()
    }

    render() {
        const {
            player: {
                name,
                whatsup,
                prepared
            },
            playerId,
            id
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
                </CardContent>
                <Operation
                    id={id}
                    playerId={playerId}
                    prepared={prepared}
                    handleSitHereButtonClick={this.props.handleSitHereButtonClick} />
            </Card>
        );
    }
}

export default Player;