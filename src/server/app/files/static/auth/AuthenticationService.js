baseURL = "http://localhost:5000";

function sendRequestToServer(args) {

    if ('isCallback' in args) {
        ajaxRequest(args['resolve'], args['reject'], args)
        return;
    }
    return new Promise(function (resolve, reject) {
        ajaxRequest(resolve, reject, args);
    })
}


function ajaxRequest(resolve, reject, args) {
    console.log(args.url)
    $.ajax({
        type: args.type,
        url: baseURL + args.url,
        data: args.data == undefined ? {} : args.data,
        headers: {
            Authorization: args.url == '/authentication/log-out' ? "Bearer " + getRefreshToken() : "Bearer " + getAccessToken(),
        },
        statusCode: {
            400: function () {
                alert("400 status code! user error");
            },
            401: function () {
                silentLogin(getRefreshToken(), sendRequestToServer, args, resolve, reject);
            },
            801: function () {
                console.log("801 Fehler.")
            }
        },
        success: function (data) {
            resolve(data);
        },
    })
}

function silentLogin(callback, args, resolve, reject) {
    $.ajax({
        type: "POST",
        url: baseURL + "/authentication/refresh_token",
        headers: {
            Authorization: "Bearer " + getRefreshToken(),
        },
        statusCode: {
            400: function () {
                alert("400 status code! user error");
            },
            401: function () {
                alert("500 status code! server error");
            },
        },
        success: function (data) {
            args["isCallback"] = true;
            args['resolve'] = resolve;
            args['reject'] = reject;
            setAccessToken(data);
            callback(args);
        },
    });
}

function logOut() {
    sendRequestToServer({ type: "GET", url: "/authentication/log-out" }).then(data => {
        setAccessToken(null);
        setRefreshToken(null);
        window.location.href = "www.duretard.at";
    });
}

function setAccessToken(access) {
    if (!checkToken(access)) {
        return;
    }

    localStorage.setItem("access", access);
}

function setRefreshToken(refresh) {
    if (!checkToken(refresh)) {
        return;
    }

    localStorage.setItem("refresh", refresh);
}

function getAccessToken() {
    return localStorage.getItem("access");
}

function getRefreshToken() {
    return localStorage.getItem("refresh");
}

function checkToken(token) {
    if (token == null || token == undefined || token === '') {
        return false;
    }
    return true;
}



