import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <a href={process.env.REACT_APP_LOGIN}>login</a>
      </div>
    );
  }
}

export default Home;
