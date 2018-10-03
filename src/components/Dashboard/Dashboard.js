import React, { Component } from "react";
import Axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }
  componentDidMount() {
    this.getUser();
  }
  getUser() {
    Axios.get("/api/me")
      .then(res => this.setState({ user: res.data }))
      .catch(e => console.log("not logged in"));
  }

  render() {
    const { name, picture } = this.state.user;
    return (
      <div>
        {name ? (
          <div>
            <div>{name}</div>
            <img width="40px" src={picture} />
          </div>
        ) : (
          "please log in"
        )}
      </div>
    );
  }
}

export default Dashboard;
