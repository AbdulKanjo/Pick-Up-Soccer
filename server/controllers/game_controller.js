const newGame = (req, res, next) => {
  const db = req.app.get("db");
  const { game_title, game_creator, time, date, duration } = req.body;
  console.log(req.body);
  db.add_new_game([game_title, game_creator, time, date, duration])
    .then(games => res.status(200).send(games))
    .catch(e => res.status(500).send("Something is wrong"));
};

const getGames = (req, res, next) => {
  const db = req.app.get("db");
  db.get_all_games()
    .then(games => res.status(200).send(games))
    .catch(e => res.status(500).send("something is wrong"));
};

const getFriends = (req, res, next) => {
  const db = req.app.get("db");
  const { auth_id } = req.params;
  db.get_friends_by_auth([auth_id])
    .then(friends => res.status(200).send(friends))
    .catch(e => res.status(500).send("something is wrong"));
};

module.exports = {
  newGame,
  getGames,
  getFriends
};
