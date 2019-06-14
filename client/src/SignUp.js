import React from "react";
import api from "./api";

class SignUp extends React.Component {
  state = {
    department: "",
    username: "",
    password: ""
  };

  handleSubmit = async ev => {
    ev.preventDefault();

    try {
      const result = await api.post("/register", {
        department: this.state.department,
        username: this.state.username,
        password: this.state.password
      });

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
        <h3>Sign Up:</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="department"
            placeholder="Department"
            onChange={this.handleChange}
            value={this.state.department}
          />

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
          <button type="submit">Login</button>
        </form>
      </>
    );
  }
}

export default SignUp;
