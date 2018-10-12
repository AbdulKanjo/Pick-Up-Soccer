import React, { Component } from "react";
import axios from "axios";
class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      user: ""
    };
  }

  componentDidMount() {
    this.getFriends();
  }

  async getFriends() {
    await axios
      .get("/api/me")
      .then(res => this.setState({ user: res.data }))
      .catch(e => console.log("not logged in"));
    await axios
      .get(`/api/frindslist/${this.state.user.auth_id}`)
      .then(res => this.setState({ friends: res.data }));
  }

  render() {
    // console.log(this.state.user.auth_id);
    console.log(this.state.friends);
    let mappedFriends = this.state.friends.map((e, i) => {
      return (
        <div key={i}>
          <div>{e.name}</div>
          <img width="40px" src={e.picture} />
          <button>add</button>
        </div>
      );
    });

    return <div>{mappedFriends}</div>;
  }
}

export default Friends;
