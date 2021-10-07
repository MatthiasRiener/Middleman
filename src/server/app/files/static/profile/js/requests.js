function requestUpdate(key, value, confirmationPassword) {
    console.log(`Requesting to update ${key} to ${value}`);
    // TODO: aktuell noch nicht verschlüsselt und über data -> später verbessern

    sendRequestToServer({
        type: "PUT",
        url: "/profile/edit",
        data: { "key": key, "value": value, "password": confirmationPassword }
    }).then((res) => {
        console.log("Received result from server (update): ");
        console.log(res);
    });
}


function deleteUser(confirmationPassword) {
    console.log(`Requesting to delete user. ${confirmationPassword}`);

    sendRequestToServer({
        type: "DELETE",
        url: "/profile/delete",
        data: { "password": confirmationPassword }

    }).then((res) => {
        console.log("Received result from server (delete): ");
        console.log(res);
    });
}

function deactivateUser(confirmationPassword) {
    console.log(`Requesting to deactivate user. ${confirmationPassword}`);

    sendRequestToServer({
        type: "PUT",
        url: "/profile/deactivate",
        data: { "password": confirmationPassword }

    }).then((res) => {
        console.log("Received result from server (deactivate): ");
        console.log(res);
    });
}



/*

Vorübergehend nur zum testn

*/

$(document).keypress(function (event) {

    var key = (event.keyCode ? event.keyCode : event.which);
    var ch = String.fromCharCode(key);

    if (ch == '+') {
        getClosest();
    } else if (ch == '#') {
        getAllUsers();
    }
});


function getClosest() {
    console.log('Requesting to get closest user.');

    sendRequestToServer({
        type: "GET",
        url: "/profile/get-close-users"
    }).then((res) => {
        console.log("Closest users: ");
        console.log(res);
    });
}

function getAllUsers() {
    console.log('Requesting to get all users.');

    sendRequestToServer({
        type: "GET",
        url: "/profile/get-all"
    }).then((res) => {
        console.log("All users");
        console.log(res);
    });
}