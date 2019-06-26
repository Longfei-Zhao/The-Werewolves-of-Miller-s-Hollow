import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Player from './Player';

class GameBoard extends React.Component {

  render() {
    return (
      <Container maxWidth='lg'>
        <Typography variant="h6" component="h6" gutterBottom>
          Room number:
        </Typography>
        <Grid container spacing={2}>
          {this.props.players.map(player =>
            <Grid item xs={6}>
              <Player
                id={this.props.id}
                player={player}
                handleSitHereButtonClick={this.props.handleSitHereButtonClick}
                handleStandUpButtonClick={this.props.handleStandUpButtonClick} />
            </Grid>
          )}
        </Grid>
      </Container>
    );
  }
}

export default GameBoard;