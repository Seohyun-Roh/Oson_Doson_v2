import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Link, AppBar, Toolbar, IconButton, Typography, Drawer, MenuItem, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import '../App.css';
import LoginCheck from '../utils/LoginCheck';

const styles = theme => ({
    root:{
      width:'100%',
      overflowX:"auto"
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    drawer:{
      position: 'relative'
    },
    btnClose:{
      position: 'absolute',
      right: '4px'
    },
    hidden: {
      display: 'none'
    }
  })

class MenuBar extends Component {
    constructor(props){
        super(props);
        this.state = {
          toggle: false
        }
    }
    
    handleDrawerToggle = () => this.setState({toggle: !this.state.toggle})

    render() {
        const {classes}=this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" onClick={this.handleDrawerToggle}>
                    <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    오손도손🐾
                    </Typography>
                    <div className={classes.grow} />
                    <LoginCheck />
                </Toolbar>
                </AppBar>
                <Drawer open={this.state.toggle} className={classes.drawer}>
                <MenuItem onClick={this.handleDrawerToggle}>
                    <Link component={RouterLink} to="/">
                    Home
                    </Link>
                </MenuItem>
                <MenuItem onClick={this.handleDrawerToggle} className={classes.btnClose}>
                    X
                </MenuItem>
                <MenuItem onClick={this.handleDrawerToggle}>
                    <Link component={RouterLink} to="/appt">
                    진료예약
                    </Link>
                </MenuItem>
                <MenuItem onClick={this.handleDrawerToggle}>
                    <Link component={RouterLink} to="/appt_check">
                    예약조회
                    </Link>
                </MenuItem>
                <MenuItem onClick={this.handleDrawerToggle}>
                    <Link component={RouterLink} to="/med_history">
                    진료내역조회
                    </Link>
                </MenuItem>
                </Drawer>
            </div>
        )
    }
}

export default withStyles(styles)(MenuBar);