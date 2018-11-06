import React, { Component } from "react";
import axios from "axios";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: []
    };
  }

  componentDidMount() {
    axios
      .get(`/api/userinfo/${this.props.match.params.auth_id}`)
      .then(res => this.setState({ userInfo: res.data[0] }));
  }

  render() {
    // console.log();

    return (
      <div>
        {this.state.userInfo.name}
        <img width="40px" src={this.state.userInfo.picture} />
      </div>
    );
  }
}

export default ProfilePage;
