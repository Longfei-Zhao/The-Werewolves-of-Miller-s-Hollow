import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

export default class Header extends React.Component {

    render() {
        let { role } = this.props
        
        return (
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    {role &&
                        <Button color="inherit" onClick={this.props.handleRoleButtonClick}>
                            Role
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        )

    }
}