//  Source: _lib\realpage\user\js\_bundle.inc
angular.module("rpUser", []);

//  Source: _lib\realpage\user\js\services\authentication.js
//  Authentication Service

(function (angular) {
    "use strict";

    function authentication($http, serialize) {
        var req,
            data,
            headers,
            svc = {};

        headers = {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        };

        data = {
            username: "",
            password: "",
            sessionGuid: "abc",
            client_id: "OS_web",
            grant_type: "password"
        };

        req = {
            data: data,
            method: "POST",
            headers: headers,
            transformRequest: serialize,
            url: "/api/core/authentication/login"
        };

        svc.validate = function (user) {
			//DEVNOTEROY:  Need to confirm with Peter Selvaraj that this is OK.  It introduces a dependency upon RealPage.ContextTransfer module
			// req.data.sessionGuid = RealPage.ContextTransfer.ConnectionID;
            req.data = angular.extend(data, {
                username: user.username,
                password: user.password
            });

            return $http(req);
        };

        return svc;
    }

    angular
        .module("rpUser")
        .factory("authentication", [
            "$http",
            "serialize",
            authentication
        ]);
})(angular);

//  Source: _lib\realpage\user\js\services\session.js
//  Session Service

(function (angular) {
    "use strict";

    function session(eventStream) {
        var svc = {},
            sessionData = {
                timeout: 2700000
            };

        svc.isReady = false;

        svc.events = {
            update: eventStream()
        };

        svc.get = function () {
            return sessionData;
        };

        svc.update = function (data) {
            svc.isReady = true;
            angular.extend(sessionData, data);
            svc.events.update.publish(sessionData);
        };

        svc.destroy = function () {

        };

        svc.extend = function () {

        };

        svc.publish = function (newData) {
            sessionData = newData;
            svc.isReady = true;
            svc.events.update.set(newData);
            logc('publishing update...');
        };

        window.sessionUpdate = svc.update;

        return svc;
    }

    angular
        .module("rpUser")
        .factory('session', ['eventStream', session]);
})(angular);

//  Source: _lib\realpage\user\js\models\user.js
//  User Model

(function (angular) {
    "use strict";

    function factory($q, cookie, authentication) {
        var user,
            data,
            model = {};

        user = {
            username: "",
            password: ""
        };

        data = {
            isAuthenticated: false
        };

        model.user = user;

        model.authenticate = function () {
            data.deferred = $q.defer();

            authentication
                .validate(user)
                .then(model.updateSession, model.destroySession);

            return data.deferred.promise;
        };

        model.updateSession = function (resp) {
            model.createAuth(resp.data);
            data.isAuthenticated = true;
            data.deferred.resolve(resp.data);
        };

        model.createAuth = function (data) {
            var token = data.access_token,
                expires = data.expires_in / (60 * 24);
            cookie.create("authorization", token, expires);
        };

        model.destroySession = function () {
            data.isAuthenticated = false;
            data.deferred.reject();
        };

        model.isAuthenticated = function () {
            return data.isAuthenticated;
        };

        return model;
    }

    angular
        .module("rpUser")
        .factory("userModel", ["$q", "rpCookie", "authentication", factory]);
})(angular);

