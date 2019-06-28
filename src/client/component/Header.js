import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import role from '../role';


export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roleHidden: true
        };
    }

    handleRoleButtonClick = () => {
        this.setState(prevState => ({ roleHidden: !prevState.roleHidden }))
    }

    render() {
        let { roleHidden } = this.state
        return (
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    {/* <Button color="inherit" onClick={this.props.handleChangeInfoButtonClick}>Player Information</Button> */}
                    <Button color="inherit" onClick={this.handleRoleButtonClick}>
                        {roleHidden ? 'Role' : role[this.props.roles[this.props.id]]}
                    </Button>
                </Toolbar>
            </AppBar>
        )

    }
}