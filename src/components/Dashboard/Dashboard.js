import React, { Component } from "react";
import Axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: "",
      user: "",
      title: "",
      duration: "",
      date: "",
      time: ""
    };
  }
  componentDidMount() {
    this.getUser();
    this.getGames();
  }

  getGames = () => {
    Axios.get("/api/games/area")
      .then(res => this.setState({ games: res.data }))
      .catch(e => console.log("error with games"));
  };

  getUser = () => {
    Axios.get("/api/me")
      .then(res => this.setState({ user: res.data }))
      .catch(e => console.log("not logged in"));
  };

  createNewGame() {
    Axios.post("/api/createnewgame", {
      game_title: this.state.title,
      game_creator: this.state.user.auth_id,
      time: this.state.time,
      date: this.state.date,
      duration: this.state.duration
    })
      .then(() => alert("created"))
      .catch(e => console.log(e));
  }

  handleTime = e => {
    this.setState({ time: e });
  };

  handleTitle = e => {
    this.setState({ title: e });
  };

  handleDuration = e => {
    this.setState({ duration: e });
  };

  handleDate = e => {
    this.setState({ date: e });
  };

  render() {
    console.log(this.state);

    const { name, picture } = this.state.user;
    return (
      <div>
        {name ? (
          <div>
            <div>{name}</div>
            <img width="40px" src={picture} />
            <input
              placeholder="title"
              onChange={e => this.handleTitle(e.target.value)}
            />
            <input
              placeholder="time"
              onChange={e => this.handleTime(e.target.value)}
            />
            <input
              placeholder="duration"
              onChange={e => this.handleDuration(e.target.value)}
            />
            <input
              placeholder="date"
              onChange={e => this.handleDate(e.target.value)}
            />
            <button onClick={() => this.createNewGame()}>create game</button>
          </div>
        ) : (
          "please log in"
        )}
      </div>
    );
  }
}

export default Dashboard;
