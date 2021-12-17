import React, { Component } from "react";
import { Button } from "@material-ui/core";

export default class RegisterChoicePage extends Component {
  UserRegisterBtnClick = e => {
    e.preventDefault();
    this.props.history.push("/user_register");
  };

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.UserRegisterBtnClick}
        >
          일반 회원 회원 가입
        </Button>
        <Button variant="contained" color="primary">
          병원 회원 회원 가입
        </Button>
      </div>
    );
  }
}
