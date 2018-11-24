select count(friend_auth_id)
from friends
where auth_id=$1;