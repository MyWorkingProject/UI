//  Mastercharts Service

(function (angular) {
    "use strict";

    function commonCOAServices($q, $http) {
        var svc, url, deferred;

        svc = {
            abort: function () {
                if (deferred && deferred.resolve) {
                    deferred.resolve();
                }

                return svc;
            },
            getAccCategory: function (param, masterChartID) {

                deferred = $q.defer();
                logc("service call managegl");
                logc(param);

                var Accurl = '/api/budgeting/coa/accountcategory/listcombo/:masterChartID/:accountTypeID';

                var reqUrl = Accurl.replace(':masterChartID', masterChartID);
                reqUrl = reqUrl.replace(':accountTypeID', param);

                return $http({
                    url: reqUrl,
                    method: 'GET',
                    timeout: deferred.promise
                });
            },
            getAccTypes: function () {
                deferred = $q.defer();

                return $http({
                    url: '/api/budgeting/coa/accounttype/list',
                    method: 'GET',
                    timeout: deferred.promise
                });
            },

        };

        return svc;
    }

    angular
        .module("budgeting")
        .factory('commonCOAServices', ['$q', '$http', commonCOAServices]);
})(angular);
