//  Tasks Date Range Model

(function (angular) {
    "use strict";

    function factory() {
        var model = {};

        model.id = 'tasksDateRange';

        return model;
    }

    angular
        .module("budgeting")
        .factory('tasksDateRange', [factory]);
})(angular);
