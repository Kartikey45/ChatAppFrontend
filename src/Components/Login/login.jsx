import React, { Component } from "react";
import "./login.scss";
import Button from "react-bootstrap/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import UserService from "../../Services/UserService";
import CustomToast from "../CustomToast";

const emailValidation = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,

      formErrors: {
        errorEmail: "",
        errorPassword: "",
      },

      Open: false,
      Message: "",
    };
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    let inputs = this.state.formErrors;

    switch (e.target.name) {
      case "email":
        inputs.errorEmail =
          emailValidation.test(e.target.value) === true
            ? ""
            : "Enter Valid email";
        break;
      case "password":
        inputs.errorPassword =
          passwordValidation.test(e.target.value) === true
            ? ""
            : "Enter Valid password";
        break;

      default:
        break;
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    let userData = {
      Email: this.state.email,
      Password: this.state.password
    };

    if (this.state.email === null || this.state.password === null) {
      console.log("Some input are not filled");
      this.setState({
        Open: true,
        Message: "Some input fields are not filled",
      });
    } else if (
      this.state.formErrors.errorEmail !== "" ||
      this.state.formErrors.errorPassword !== ""
    ) {
      console.log("Input Fields are not correctly filled");
      this.setState({
        Open: true,
        Message: "Input Fields are not correctly filled",
      });
    } else {
      UserService.login(userData)
        .then((data) => {
          console.log("Login Successfull", data);
          localStorage.setItem('token', data.data.id)
          this.setState({
            Open: true,
            Message: "Login Successfull",
          });
          //this.props.history.push("/dashboard")
        })
        .catch((error) => {
          console.log("Login failed", error);
          this.setState({
            Open: true,
            Message: "Login failed",
          });
        });
    }
  };

  render() {
    return (
      <div className="outerCard">
        <div className="loginCard">
          <div className="fundooAlign">
            <div className="Fcolor">C</div>
            <div className="Fcolor">h</div>
            <div className="Fcolor">a</div>
            <div className="Fcolor">t</div>
            <div className="Fcolor">-</div>
            <div className="Fcolor">A</div>
            <div className="Fcolor">p</div>
            <div className="Fcolor">p</div>
          </div>
          <div className="font1">
            <h5>Sign In</h5>
          </div>
          <div className="input1">
            <div className="inputEmail">
              <TextField
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
                required
                fullWidth
                name="email"
                onChange={this.onValueChange}
              />
              <span className="errorMessage">
                {this.state.formErrors.errorEmail}
              </span>
            </div>

            <div className="inputEmail">
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                ref="password"
                hintText="Password"
                floatingLabelText="Password"
                type="password"
                required
                fullWidth
                name="password"
                onChange={this.onValueChange}
              />
              <span className="errorMessage">
                {this.state.formErrors.errorPassword}
              </span>
            </div>
          </div>
          <br />
          <div className="forgetText">
            <Link to="/forgetPass">
              <h6>Forget password ?</h6>
            </Link>
          </div>
          <div className="buttonForLogin">
            <Link to="/signup">
              <h6>Create account</h6>
            </Link>
            <Button type="submit" onClick={this.onSubmit} variant="primary">
              Login
            </Button>
          </div>
        </div>
        <CustomToast
          display={this.state.Open}
          Message={this.state.Message}
          onClose={() => {
            this.setState({ Open: false });
          }}
        />
      </div>
    );
  }
}
