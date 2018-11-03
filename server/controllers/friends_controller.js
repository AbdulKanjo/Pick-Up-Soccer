const getFriends = (req, res, next) => {
  const db = req.app.get("db");
  const { auth_id } = req.params;
  db.get_friends_by_auth([auth_id])
    .then(friends => res.status(200).send(friends))
    .catch(e => res.status(500).send("something is wrong"));
};

const newFriend = (req, res, next) => {
  const db = req.app.get("db");
  const { auth_id, friend_auth_id } = req.body;
  console.log(req.body);
  db.add_new_friend([auth_id, friend_auth_id])
    .then(friends => res.status(200).send(friends))
    .catch(e => res.status(500).send("Something is wrong"));
};

module.exports = {
  getFriends,
  newFriend
};
