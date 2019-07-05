import React from 'react';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

class Operation extends React.Component {

    handleSitHereButtonClick = (e) => {
        this.props.handleSitHereButtonClick(e, this.props.id)
      }

    render() {
        let {
            playerId,
            prepared
        } = this.props
        return (
            <CardActions>
                { playerId === null && !prepared &&
                    <Button size="small" onClick={this.handleSitHereButtonClick}>
                        Sit here
                    </Button>
                }
            </CardActions>
        )
    }
}

export default Operation;