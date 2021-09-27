class AuthenticationService {
    constructor() {
        console.log("AuthenticationService initialized.")
        this.baseURL = "http://localhost:5000";
    }

    sendRequestToServer(args) {

        if('isCallback' in args) {
            this.ajaxRequest(args['resolve'], args['reject'], args)
            return;
        } 
        return new Promise(function(resolve, reject) {
            this.ajaxRequest(resolve, reject, args);
        })
    }


    ajaxRequest(resolve, reject, args) {
        $.ajax({
            type: args.type,
            url: this.baseURL + args.url,
            data: args.data == undefined ? {} : args.data,
            headers: {
                Authorization: "Bearer " + this.getAccessToken(),
            },
            statusCode: {
                400: function () {
                    alert("400 status code! user error");
                },
                401: function () {
                    this.silentLogin(this.getRefreshToken(), this.sendRequestToServer, args, resolve, reject);
                },
                801: function() {
                    console.log("801 Fehler.")
                }
            },
            success: function (data) {
                resolve(JSON.parse(data));
            },
        })
    }

    silentLogin(callback, args, resolve, reject) {
        $.ajax({
            type: "POST",
            url: baseURL + "/authentication/refresh_token",
            headers: {
            Authorization: "Bearer " + this.getRefreshToken(),
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
                this.setAccessToken(data);
                callback(args);
            },
        });
     }



    setAccessToken(access) {
        if(!this.checkToken(access)) {
            return;
        }

        localStorage.setItem("access", access);
    }

    setRefreshToken(refresh) {
        if(!this.checkToken(refresh)) {
            return;
        }

        localStorage.setItem("refresh", refresh);
    }

    getAccessToken() {
        return localStorage.getItem("access");
    }

    getRefreshToken() {
        return localStorage.getItem("refresh");
    }

    checkToken(token) {
        if(token == null || token == undefined || token === '') {
            return false;
        }
        return true;
    }

}


const aService = new AuthenticationService();

