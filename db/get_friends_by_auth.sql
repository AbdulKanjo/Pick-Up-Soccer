SELECT name, us.auth_id, picture
FROM friends fs
    join users us on fs.friend_auth_id=us.auth_id
where fs.auth_id=$1;