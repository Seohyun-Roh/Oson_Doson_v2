import React, { Component } from 'react'
import { withCookies } from 'react-cookie';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

class LoginCheck extends Component {
    constructor(props){
        super(props);
        const { cookies } = props;
        this.state = {
            loginUser: cookies.get('loginUser'),
            isLogedIn: false
        }
    }

    componentDidMount() {
        this.toggle();
    }

    toggle = () => {
        if(this.state.loginUser){
            this.setState({
                isLogedIn: true
            })
        } else{
            this.setState({
                isLogedIn: false
            })
        }
    }

    render() {
        return (
            <div>
                <Button color="inherit" component={RouterLink} to={this.state.isLogedIn ? '/' : '/login'}>{this.state.isLogedIn ? 'Logout' : 'Login'}</Button>
            </div>
        )
    }
}

export default withCookies(LoginCheck);