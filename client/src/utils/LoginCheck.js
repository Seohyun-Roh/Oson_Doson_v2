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

    handleLink = () => {
        if(!this.state.isLogedIn){
            return '/login';
        } else {
            return '/';
        }
    }

    handleSubmit = () => {
        if(this.state.isLogedIn){
            const { cookies } = this.props;
        cookies.remove('loginUser');
        this.stateRefresh();
        }
    }

    stateRefresh = () => {
        const { cookies } = this.props;
        this.setState({
            loginUser: cookies.get('loginUser'),
            isLogedIn: false
        })
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleSubmit} color="inherit" component={RouterLink} to={this.handleLink}>{this.state.isLogedIn ? 'Logout' : 'Login'}</Button>
            </div>
        )
    }
}

export default withCookies(LoginCheck);