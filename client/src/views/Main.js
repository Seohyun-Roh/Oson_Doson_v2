import React, {Component} from 'react';
import '../App.css';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';

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
  }
})

class Main extends Component{

  constructor(props){
    super(props);
    this.state = {
      toggle: false
    }
  }

  handleButtonClick = (e) => {
    this.props.history.push('/login')
  }

  handleDrawerToggle = () => this.setState({toggle: !this.state.toggle})

  render(){ 
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
            <Button color="inherit" onClick={this.handleButtonClick}>Login</Button>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.toggle}>
          <MenuItem onClick={this.handleDrawerToggle}>
            <Link component={RouterLink} to="/">
            Home
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleDrawerToggle}>
            <Link component={RouterLink} to="/">
            진료예약
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleDrawerToggle}>
            <Link component={RouterLink} to="/">
            예약조회
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleDrawerToggle}>
            <Link component={RouterLink} to="/">
            진료내역조회
            </Link>
          </MenuItem>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(Main);