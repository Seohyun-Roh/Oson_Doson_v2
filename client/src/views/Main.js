import React, {Component} from 'react';
import { withStyles } from '@material-ui/core';

import '../App.css';
import MenuBar from '../components/MenuBar';

const styles = theme => ({
  root:{
    width:'100%',
    overflowX:"auto"
  }
})

class Main extends Component{

  render(){ 
    return (
      <MenuBar />
    )
  }
}

export default withStyles(styles)(Main);