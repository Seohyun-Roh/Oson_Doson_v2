import React, {Component} from 'react';
import '../App.css';
import { withStyles } from '@material-ui/core/styles';

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