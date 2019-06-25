import React from 'react';
import Grid from '@material-ui/core/Grid';
import Player from './Player';

class GameBoard extends React.Component {

  render() {
    return (
      // <Button variant="contained" color="primary" onClick={this.handleButtonClick}>
      //   <div className="player">
      //     <Avatar alt="Remy Sharp" src={defaultAvatar} />
      //     {this.props.name &&
      //       <p className="userName">
      //         {this.props.userName}
      //       </p>
      //     }

      //     <p>{this.props.id}</p>
      //   </div>
      // </Button>
      <Grid container spacing={2}>
        {this.props.players.map(player =>
          <Grid item xs={6}>
            <Player
              id={this.props.id}
              player={player}
              handleSitHereButtonClick={this.props.handleSitHereButtonClick} 
              handleStandUpButtonClick={this.props.handleStandUpButtonClick}/>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default GameBoard;