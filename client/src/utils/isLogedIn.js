import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class isLogedIn extends Component {
    constructor(props){
        super(props);
        const { cookies } = props;
        this.state = {
            loginUser: cookies.get('loginUser')
        }
        this.toggle();
    }

    componentDidMount() {
        this.toggle();
    }

    toggle = () => {
        if(!this.state.loginUser){
            alert("로그인 후 이용해주세요.");
            this.props.history.push("/login");
        }
    }

    render() {
        const { classes } = this.props;
        return (
        <div>
        </div>
        )
    }
}

export default withCookies(withStyles(styles)(isLogedIn));