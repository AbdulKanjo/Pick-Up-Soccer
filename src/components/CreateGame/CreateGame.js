import React, { Component } from "react";
import Axios from "axios";

import Friends from "../Friends/Friends";

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
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
    console.log("hit");
    Axios.get("/api/games/area")
      .then(res => {
        this.setState({ games: res.data });
        console.log(res.data);
      })
      .catch(e => console.log(e));
  };

  getUser = () => {
    Axios.get("/api/me")
      .then(res => this.setState({ user: res.data }))
      .catch(e => console.log("not logged in"));
  };

  createNewGame = () => {
    Axios.post("/api/createnewgame", {
      game_title: this.state.title,
      game_creator: this.state.user.auth_id,
      time: this.state.time,
      date: this.state.date,
      duration: this.state.duration
    })
      .then(() => this.resetInput())
      .then(() => this.getGames())
      .catch(e => console.log(e));
  };

  resetInput = () => {
    this.setState({ title: "", time: "", date: "", duration: "" });
  };

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
    console.log(this.state.user.picture);

    let mappedGames = this.state.games.map((e, i) => {
      return <div key={i}>{e.game_title}</div>;
    });
    const { name, picture } = this.state.user;
    return (
      <div>
        {this.state.user ? (
          <div>
            <div>{name}</div>
            <img alt={name} width="40px" src={picture} />
            <input
              value={this.state.title}
              placeholder="title"
              onChange={e => this.handleTitle(e.target.value)}
            />
            <input
              value={this.state.time}
              placeholder="time"
              onChange={e => this.handleTime(e.target.value)}
            />
            <input
              value={this.state.duration}
              placeholder="duration"
              onChange={e => this.handleDuration(e.target.value)}
            />
            <input
              value={this.state.date}
              placeholder="date"
              onChange={e => this.handleDate(e.target.value)}
            />
            <button onClick={() => this.createNewGame()}>create game</button>
            <div>{mappedGames}</div>
            <Friends />
          </div>
        ) : (
          "please log in"
        )}
      </div>
    );
  }
}

export default CreateGame;
