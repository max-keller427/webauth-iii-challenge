import React from "react";
import { Route, NavLink } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Users from "./Users";
import { withRouter } from "react-router-dom";

class App extends React.Component {
  logout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <h1> Lets Auth</h1>

        <ul>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
          <li>
            <button onClick={this.logout}>Logout</button>
          </li>
        </ul>

        <main>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/users" component={Users} />
        </main>
      </div>
    );
  }
}

export default withRouter(App);
