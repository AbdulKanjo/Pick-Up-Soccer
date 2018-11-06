const getUserInfo = (req, res, next) => {
  const db = req.app.get("db");
  const { auth_id } = req.params;
  console.log(req.params);
  db.get_profile_info([auth_id])
    .then(info => res.status(200).send(info))
    .catch(e => res.status(500).send(e));
};

module.exports = {
  getUserInfo
};
