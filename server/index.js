require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const strategy = require("./strategy");
const massive = require("massive");
const session = require("express-session");
const {
  newGame,
  getGames,
  getFriends
} = require("./controllers/game_controller");
const app = express();
const { logout, login, getUser } = require("./controllers/auth_controller");
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(e => console.log(e));

//---------------session-------------------------

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2 //2 weeks
    }
  })
);

//----------------Passport-----------------

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
  console.log("first", user.id);
  const db = app.get("db");
  db.get_user_by_authid(user.id)
    .then(response => {
      if (!response[0]) {
        console.log("response", response);
        db.add_user_by_authid([
          user.displayName,
          user.id,
          `https://graph.facebook.com/${user.id.substring(
            9
          )}/picture?width=9999`
        ])
          .then(res => {
            session.auth_id = res[0].auth_id;
            // console.log("new", session.auth_id);
            done(null, res[0]);
          })
          .catch(err => done(err, null));
      } else {
        session.auth_id = response[0].auth_id;
        return done(null, response[0]);
      }
    })
    .catch(err => done(err, null));
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//------------------Auth Endpoints--------------------
app.get("/login", login);
app.post("/api/logout", logout);
app.get("/api/me", getUser);

//---------------------Test Endpoints------------------

app.get("/api/movie", (req, res, next) => {
  console.log("sdadss");

  res.status(200).send({ new: "as" });
});

//----------------------Games Endpoints------------------

app.get("/api/games/area", getGames);
app.post("/api/createnewgame", newGame);

//----------------------Friends Endpoint-----------------

app.get("/api/frindslist/:auth_id", getFriends);

//----------------------Port Info------------------------

const port = 3002;
app.listen(port, () => {
  console.log(`Server is listening ${port}`);
});
