import React, {Component} from 'react';
import { withStyles } from '@material-ui/core';

import '../App.css';
import MenuBar from '../components/MenuBar';
import logo from '../img/logo.png';
import cat from '../img/cat.jpg';

const styles = theme => ({
  root:{
    width:'100%',
    overflowX:"auto",
    '& h1':{
      fontSize:'2.75rem'
    }
  },
  'section':{
    margin:'0px 50px 30px 50px',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    '& div':{
      margin:'0 50px 0 50px'
    },
    '&:last-of-type':{
      margin:'30px 0px 0px 0px',
      padding: '0 50px 0 50px',
      backgroundColor:'#fef9e6',
      '& div:last-child':{
        padding:'0 50px 0 0',
        margin:'0'
      }
    }
  },
  logo:{
    width:'300px',
    height:'300px'
  },
  cat:{
    width:'350px',
    height:'300px',
    margin:'30px 0px 30px 0px'
  },
  footer:{
    backgroundColor:'#333333',
    color:'#ffffff',
    textAlign:'center',
    display:'block',
    padding:'50px 0 50px 0',
    '& h5':{
      margin:0
    }
  }
})

class Main extends Component{
  render(){ 
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MenuBar />
        <section className={classes.section}>
          <div>
            <h1>O-SON DO-SON</h1>
            <h4>오손도손</h4>
            <h5>이제는 인터넷으로 편하게 예약하고<br/>진료내역까지 확인하세요!</h5>
          </div>
          <div>
            <img src={logo} className={classes.logo} alt="logo"/>
          </div>
        </section>
        <section className={classes.section}>
          <div>
            <img src={cat} className={classes.cat} alt="cat"/>
          </div>
          <div>
            <h2>병원과 반려인의<br/>소통공간을 제공하는 새로운 플랫폼!</h2>
            <h5>A new platform that provides a communication space between hospitals and their partners!</h5>
          </div>
        </section>
        <footer className={classes.footer}>
          <h5>Copyright © 오손도손 All Rights Reserved.</h5>
        </footer>
      </div>
    )
  }
}

export default withStyles(styles)(Main);