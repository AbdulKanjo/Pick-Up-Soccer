const getUserInfo = (req, res, next) => {
  const db = req.app.get("db");
  const { auth_id } = req.params;
  console.log(req.params);
  db.get_profile_info([auth_id])
    .then(info => res.status(200).send(info))
    .catch(e => res.status(500).send(e));
};

const getAllUsers = (req, res, next) => {
  const db = req.app.get("db");
  db.get_all_users()
    .then(users => res.status(200).send(users))
    .catch(e => res.status(500).send(e));
};

const numOfUsers = (req, res, next) => {
  const db = req.app.get("db");
  db.get_num_of_users()
    .then(numberOfUsers => res.status(200).send(numberOfUsers))
    .catch(e => console.log(e));
};

module.exports = {
  getUserInfo,
  getAllUsers,
  numOfUsers
};
