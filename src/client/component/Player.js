import React from 'react';
import defaultAvatar from '../image/default_avatar.png';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


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
      playerId
    } = this.props
    return (
      <Card variant="contained" color="default">
        <CardContent>
          <Avatar alt="avatar" src={defaultAvatar} />
          <Typography variant="h6" gutterBottom>
            #{this.props.id}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {name ? name : 'Empty'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {whatsup ? whatsup : "What's up..."}
          </Typography>
          {this.props.name &&
            <p className="userName">
              {this.props.userName}
            </p>
          }
        </CardContent>


        { playerId === null && !prepared &&
          <CardActions>
            <Button size="small" onClick={this.handleSitHereButtonClick}>
              Sit here
            </Button>
          </CardActions>
        }
      </Card>
    );
  }
}

export default Player;