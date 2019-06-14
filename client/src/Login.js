import React from "react";
import axios from "axios";
import api from "./api";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = async ev => {
    ev.preventDefault();

    try {
      const result = await api.post("/login", {
        username: this.state.username,
        password: this.state.password
      });

      // document.cookie = `token=${result.data.token}`;
      localStorage.setItem("token", result.data.authToken);
      this.props.history.push("/users");
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  render() {
    return (
      <>
        <h3>Login:</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />

          <input
            type="text"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <button>Login</button>
        </form>
      </>
    );
  }
}

export default withRouter(Login);
