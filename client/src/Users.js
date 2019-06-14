import React from "react";
// import { withRouter } from "react-router-dom";
import withAuth from "./auth";
import api from "./api";

class Users extends React.Component {
  state = {
    users: []
  };

  async componentDidMount() {
    try {
      const result = await api.get("/users");
      //   console.log(result);
      this.setState({
        users: result.data
      });
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 403) {
        this.props.history.push("/login");
      } else {
        console.error(err);
      }
    }
  }

  render() {
    console.log(this.state.users);
    return (
      <>
        <h3>Users:</h3>
        <ul>
          {this.state.users.map((user, i) => {
            return <li key={i}>{user.username}</li>;
          })}
        </ul>
      </>
    );
  }
}

export default withAuth(Users);
