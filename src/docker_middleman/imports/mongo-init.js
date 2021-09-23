
use admin
db.createUser(
    {
        user: "middlemanadmin",
        pwd: "soos",
        roles: ["root"]
    }
)

use middlemandb