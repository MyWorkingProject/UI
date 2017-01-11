//  Roles List Data Service

(function (angular) {
    "use strict";

    function importglaccountSvc($q, $http) {

        return function () {
            var svc, url, deferred;

            url = '/api/core/common/roles';

            svc = {
                abort: function () {
                    if (deferred && deferred.resolve) {
                        deferred.resolve();
                    }

                    return svc;
                },

                delitem: function (data) {
                    deferred = $q.defer();

                    return $http({
                        url: url,
                        data: data,
                        method: 'Delete',
                        cache: false,
                        timeout: deferred.promise
                    });
                },

                get: function (data) {
                    deferred = $q.defer();

                    return $http({
                        url: url,
                        data: data,
                        method: 'POST',
                        timeout: deferred.promise
                    });
                }
            };

            return svc;
        };
    }

    angular
        .module("budgeting")
        .factory('importglaccountSvc', ['$q', '$http', importglaccountSvc]);
})(angular);
