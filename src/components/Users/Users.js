import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios
      .get("/api/allusers")
      .then(res => this.setState({ users: res.data }))
      .catch(e => console.log(e));
  }

  render() {
    let mappedUsers = this.state.users.map((e, i) => {
      return <div>{e.name}</div>;
    });

    return (
      <div>
        <div>{mappedUsers}</div>
      </div>
    );
  }
}

export default Users;
