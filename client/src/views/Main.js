import React, {Component} from 'react';
import User from '../components/User';
import '../App.css';
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = theme => ({
  root:{
    width:'100%',
    overflowX:"auto"
  }
})

class Main extends Component{

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){ 

  }
}

export default withStyles(styles)(Main);