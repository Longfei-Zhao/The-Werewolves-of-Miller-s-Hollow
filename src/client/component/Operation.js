import React from 'react';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { OPERATION_TYPE } from '../util';
const PLAYERSTATUS = {
    ALIVE: 'alive',
    DEAD: 'dead'
}

class Operation extends React.Component {

    state = {
        open: false
    }

    // useSkill = () => {
    //     this.setState({
    //         skillUsed: true
    //     })
    // }

    // handleSitHereButtonClick = (e) => {
    //     this.props.handleSitHereButtonClick(e, this.props.id);
    // }

    // handleKillButtonClick = (e) => {
    //     useSkill();
    //     this.props.handleKillButtonClick(e, this.props.id);
    // }

    // handleSeeButtonClick = (e) => {
    //     useSkill();
    //     this.props.handleSeeButtonClick(e, this.props.id);
    // }

    // handlePoisonButtonClick = (e) => {
    //     useSkill();
    //     this.props.handlePoisonButtonClick(e, this.props.id);
    // }

    // handleSaveButtonClick = (e) => {
    //     useSkill();
    //     this.props.handleSaveButtonClick(e, this.props.id);
    // }

    // handleButtonClick = () => {
    //     this.setState({
    //         skillUsed: true
    //     })
    //     switch (this.props.role) {
    //         case role === ROLE.WEREWOLF:
    //             this.props.handleKillButtonClick(e, this.props.id);
    //             break
    //         case role === ROLE.SEER:
    //             this.props.handleSeeButtonClick(e, this.props.id);
    //             break
    //         case role === ROLE.WITCH:
    //             this.props.status == PLAYERSTATUS.DEAD ?
    //                 this.props.handleSaveButtonClick(e, this.props.id) :
    //                 this.props.handlePoisonButtonClick(e, this.props.id);
    //             break
    //         default:
    //             break
    //     }
    // }

    handleOperationButtonClick = (e) => {
        this.props.handleOperationButtonClick(e, this.props.operation, this.props.seatId)
    }

    render() {
        let {
            seatId,
            playerId,
            prepared,
            status,
            operation
        } = this.props;
        let open, buttonMessage;

        switch (true) {
            case operation === OPERATION_TYPE.SIT && !prepared:
                open = true;
                buttonMessage = 'Sit here';
                break
            case operation === OPERATION_TYPE.SEE && playerId !== seatId:
                open = true;
                buttonMessage = 'See';
                break
            case operation === OPERATION_TYPE.KILL:
                open = true;
                buttonMessage = 'Kill';
                break
            case operation === OPERATION_TYPE.WITCH:
                open = true;
                buttonMessage = status === PLAYERSTATUS.DEAD ? 'Save' : 'Poison';
                break
        }

        return (
            open ?
                <CardActions>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={this.handleOperationButtonClick}>
                        {buttonMessage}
                    </Button>
                </CardActions>
                :
                null
        )
    }
}

export default Operation;