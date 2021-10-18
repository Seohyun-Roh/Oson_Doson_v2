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

import MenuBar from '../components/MenuBar';

const styles = theme => ({
  root:{
    width:'100%',
    overflowX:"auto"
  }
})

class Main extends Component{

  constructor(props){
    super(props);
  }

  render(){ 
    const {classes}=this.props;
    return (
      <MenuBar />
    )
  }
}

export default withStyles(styles)(Main);