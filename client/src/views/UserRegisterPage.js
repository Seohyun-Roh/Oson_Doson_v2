import React from "react";
import { post } from "axios";
import { TextField, Button, withStyles } from "@material-ui/core";
import { withRouter } from "react-router";

import puppy from "../img/puppy.jpg";
import MenuBar from "../components/MenuBar";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItem: "center",
    margin: "30px 30px 30px 30px",
  },
  hidden: {
    display: "none",
  },
  Input: {
    marginTop: 100,
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: "40px",
    paddingRight: "10px",
    "& h2": {
      margin: 0,
    },
  },
  pageContainer: {
    display: "grid",
    placeItems: "center",
    height: "83vh",
    backgroundColor: "#eff0f2",
  },
  loginFormBox: {
    width: "85%",
    maxWidth: "900px",
    height: "75%",
    maxHeight: "800px",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "20px",
    boxShadow: "27px 43px 43px -26px rgb(89 89 89 / 39%)",
    backgroundColor: "#ffffff",
    borderRadius: "6px",
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "20px",
    "& img": {
      width: "30vw",
      height: "40vw",
      maxWidth: "370px",
      maxHeight: "400px",
    },
  },
  btnRegister: {
    fontSize: "15px",
    textAlign: "center",
    textDecoration: "none",
    fontFamily: "Noto Sans KR",
    height: "30px",
    display: "inline-block",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#d9d9d9",
    padding: "3px 0 3px 0",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#ffc000",
    },
    transition: "0.3s ease",
  },
  register: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "10px",
    "& span": {
      fontSize: "14px",
      color: "#666565",
    },
  },
});

class UserRegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //???????????? ????????? ???????????? ?????? ????????? ?????? ??? ????????? ?????????
      file: null, //????????? ????????? ?????????
      userName: "",
      birth: "",
      userid: "",
      userpw: "",
      fileName: "", //???????????? ?????? ?????? ???????????? ??????(?????????)
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    this.addUser().then(response => {
      console.log(response.data);
      if (response.data.registerSuccess) {
        // ???????????? ??????
        alert(response.data.message);
        this.props.history.push("/login");
      } else {
        // ???????????? ??????
        alert(response.data.message);
      }
    });
  };

  handleFileChange = e => {
    this.setState({
      //e.target-> event??? ????????? input ??? ??????.
      file: e.target.files[0], //files[0]->????????? ????????? ????????? ????????? ??? ??? ????????? ???.
      fileName: e.target.value,
    });
  };

  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  addUser = () => {
    const url = "/api/users/register";
    const formData = new FormData();
    formData.append("image", this.state.file); //?????? ????????? ?????? ?????? ????????????????????? image?????? ???????????? ??????
    formData.append("name", this.state.userName);
    formData.append("birth", this.state.birth);
    formData.append("userid", this.state.userid);
    formData.append("userpw", this.state.userpw);

    //????????? ???????????? ?????? ???????????? ????????? ??????????????? ?????????
    //??? ????????? ?????? ????????? ??????????????? ???
    const config = {
      headers: {
        "content-type": "multipart/form-data", //??????????????? ?????? ???????????? ????????? ???????????? ?????? ??? ????????????????????? ??????
      },
    };
    //post -> axios??? ?????????????????? ???????????????
    return post(url, formData, config);
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <MenuBar />
        <div className={classes.pageContainer}>
          <div className={classes.loginFormBox}>
            <div className={classes.logo}>
              <img src={puppy} alt="puppy" />
            </div>
            <div className={classes.loginForm}>
              <h2>REGISTER ????</h2>
              <input
                className={classes.hidden}
                accept="image/*"
                id="raised-button-file"
                type="file"
                file={this.state.file}
                value={this.state.fileName}
                onChange={this.handleFileChange}
              />
              <br />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  component="span"
                  name="file"
                  style={{
                    borderRadius: "4px",
                    backgroundColor: "#ffc000",
                    fontSize: "14px",
                    marginBottom: "5px",
                  }}
                >
                  {this.state.fileName === ""
                    ? "????????? ????????? ??????"
                    : this.state.fileName}
                </Button>
              </label>
              <TextField
                label="ID"
                type="text"
                name="userid"
                value={this.state.userid}
                onChange={this.handleValueChange}
              />
              <br />
              <TextField
                label="Password"
                type="password"
                name="userpw"
                value={this.state.userpw}
                onChange={this.handleValueChange}
              />
              <br />
              <TextField
                label="??????"
                type="text"
                name="userName"
                value={this.state.userName}
                onChange={this.handleValueChange}
              />
              <br />
              <TextField
                label="????????????"
                type="text"
                name="birth"
                value={this.state.birth}
                onChange={this.handleValueChange}
              />
              <br />
              <button
                className={classes.btnRegister}
                onClick={this.handleFormSubmit}
              >
                ????????????
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(UserRegisterPage));
