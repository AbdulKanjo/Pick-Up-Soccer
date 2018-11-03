insert into friends
    (auth_id,friend_auth_id)
values
    ($1, $2)
RETURNING *;