import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Link, withStyles } from '@material-ui/core';

import '../App.css';
import logo from '../img/logo.png';
import LoginCheckButton from './LoginCheckButton';

const styles = theme => ({
    root:{
      padding:'10px 50px 0 50px'
    },
    menuBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    menuItems: {
      display: 'flex',
      alignItems: 'center',
      '& li':{
        color: 'black',
        listStyle: 'none',
        margin: '0px 50px 10px 10px',
        '&:hover': {
          color: '#ff5252'
        }
      }
    },
    logo: {
      width: '80px',
      height: '80px'
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
                <div>
                  <ul className={classes.menuBox}>
                    <div>
                      <Link component={RouterLink} to="/">
                        <img src={logo} className={classes.logo} alt="logo"/>
                      </Link>
                    </div>
                    <div className={classes.menuItems}>
                      <Link component={RouterLink} to="/appt" style={{textDecoration:'none'}}>
                        <li>진료예약</li>
                      </Link>
                      <Link component={RouterLink} to="/appt_check" style={{textDecoration:'none'}}>
                        <li>예약조회</li>
                      </Link>
                      <Link component={RouterLink} to="/med_history" style={{textDecoration:'none'}}>
                        <li>진료내역조회</li>
                      </Link>
                      <li><LoginCheckButton /></li>
                    </div>
                  </ul>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(MenuBar);