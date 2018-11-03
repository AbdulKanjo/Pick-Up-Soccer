INSERT INTO games
    (game_title, game_creator, time, date, duration)
VALUES
    ($1, $2, $3, $4, $5)
RETURNING *;
