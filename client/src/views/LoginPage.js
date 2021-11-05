import React from 'react';
import axios from 'axios';
import { TextField, withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';

import logo from '../img/logo.png';
import MenuBar from '../components/MenuBar';

const styles = theme => ({
    loginForm: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginRight:'40px',
        paddingRight:'10px'
    },
    pageContainer:{
        display:'grid',
        placeItems:'center',
        height:'83vh',
        backgroundColor:'#eff0f2'
    },
    loginFormBox:{
        width:'85%',
        maxWidth:'900px',
        height:'75%',
        maxHeight:'800px',
        display:'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridColumnGap: '20px',
        boxShadow:'27px 43px 43px -26px rgb(89 89 89 / 39%)',
        backgroundColor:'#ffffff',
        borderRadius:'6px'
    },
    logo:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:'20px',
        '& img':{
            width:'35vw',
            height:'35vw',
            maxWidth:'400px',
            maxHeight:'400px',
        }
    },
    btnLogin:{
        fontSize:'15px',
        textAlign:'center',
        textDecoration:'none',
        height:'30px',
        display:'inline-block',
        border:'none',
        borderRadius:'4px',
        backgroundColor:'#d9d9d9',
        '&:hover':{
            cursor:'pointer',
            backgroundColor:'#ffc000'
        },
        transition:'0.3s ease'
    },
    register:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        marginTop:'10px',
        '& span':{
            fontSize:'14px',
            color:'#666565'
        }
    },
    btnRegister:{
        fontSize:'15px',
        textAlign:'center',
        textDecoration:'none',
        marginLeft:'10px',
        backgroundColor:'#ffffff',
        border:'none',
        fontFamily: 'Noto Sans KR',
        '&:hover':{
            cursor:'pointer',
            textDecoration:'underline'
        }
    }
});

class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userid: '',
            userpw: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(this.state);
        axios.post('/api/users/login', 
        { userid: this.state.userid, userpw: this.state.userpw})
        .then((response) => {
            console.log(response.data)
            if(response.data.success){
                this.props.history.push('/')
            } else{
                alert(response.data.message);
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleButtonClick = (e) => {
        e.preventDefault();
        this.props.history.push('/register');
    }

    keyPress = (e) => {
        if(window.event.keyCode === 13){
            this.handleFormSubmit(e);
        }
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
                <MenuBar />
                <div className={classes.pageContainer}>
                    <div className={classes.loginFormBox}>
                        <div className={classes.logo}>
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className={classes.loginForm}>
                            <h2>LogIn 🐱</h2>
                            <TextField label="ID" type="text" name="userid" value={this.state.userid} onChange={this.handleValueChange} /><br/>
                            <TextField label="Password" type="password" name="userpw" value={this.state.userpw} onChange={this.handleValueChange} onKeyPress={this.keyPress}/><br/>
                            <button className={classes.btnLogin} onClick={this.handleFormSubmit}>Login</button>
                            <div className={classes.register}>
                                <span>계정이 없으신가요?</span>
                                <button className={classes.btnRegister} onClick={this.handleButtonClick}>회원가입</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(LoginPage));