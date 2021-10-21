import React from 'react';
import axios from 'axios';
import { TextField, Button, withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItem: 'center',
        width: '100%',
        margin: '30px 30px 30px 30px'
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
        // this.props.history.push('/');
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

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <TextField label="ID" type="text" name="userid" value={this.state.userid} onChange={this.handleValueChange} /><br/>
                <TextField label="Password" type="password" name="userpw" value={this.state.userpw} onChange={this.handleValueChange} /><br/>
                <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>Login</Button>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(LoginPage));