import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { ROLE, ROLE_IMAGE } from '../util';

export default class RoleDialog extends React.Component {

    render() {
        let src;

        switch (this.props.role) {
            case ROLE.WEREWOLF:
                src = ROLE_IMAGE.WEREWOLF;
                break;
            case ROLE.SEER:
                src = ROLE_IMAGE.SEER;
                break;
            case ROLE.WITCH:
                src = ROLE_IMAGE.WITCH;
                break;
            case ROLE.HUNTER:
                src = ROLE_IMAGE.HUNTER;
                break;
            case ROLE.IDIOT:
                src = ROLE_IMAGE.IDIOT;
                break;
            case ROLE.VILLAGER:
                src = ROLE_IMAGE.VILLAGER;
                break;
        }
        console.log(src)
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <img height='500px' src={src} />
            </Dialog>
        )
    }
}