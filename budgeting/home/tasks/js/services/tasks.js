//  Tasks Module Service

(function (angular) {
    "use strict";

    var data, url;

    //startDate : Task Due Start DateTime - datetime in milliseconds
    //endDate : Task Due End DateTime - datetime in milliseconds

    data = {
        startDate: '1376006400000',
        endDate: '1414540800000'
    };

    url = '/api/leasing-and-rents/tasks/:' + 1376006400000 + '/:' + 1414540800000;

    function Tasks($resource) {
        return $resource(url, data);
    }

    angular
        .module("budgeting")
        .factory('Tasks', ['$resource', Tasks]);
})(angular);
