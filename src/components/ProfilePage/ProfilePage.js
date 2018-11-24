import React, { Component } from "react";
import axios from "axios";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      friendsNum: 0
    };
  }

  componentDidMount() {
    this.userInfo();
    this.numOfFriends();
  }
  userInfo() {
    axios
      .get(`/api/userinfo/${this.props.match.params.auth_id}`)
      .then(res => this.setState({ userInfo: res.data[0] }));
  }
  numOfFriends() {
    axios
      .get(`/api/numoffriends/${this.props.match.params.auth_id}`)
      .then(res => this.setState({ friendsNum: res.data[0].count }));
  }

  render() {
    console.log(this.state.friendsNum);

    return (
      <div>
        {this.state.userInfo.name}
        <img width="40px" src={this.state.userInfo.picture} />
      </div>
    );
  }
}

export default ProfilePage;
