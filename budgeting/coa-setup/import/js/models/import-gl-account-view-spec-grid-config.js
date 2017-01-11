//  View Specifications Template Grid Model

(function (angular) {
    "use strict";

    function viewImportSpecGridConfig(gridConfig) {
        var model = gridConfig();
        model.get = function () {
            return [{
                key: 'columnName'
            }, {
                key: 'desc'
            }];
        };

        model.getHeaders = function () {
            return [
                [{
                    text: 'Column',
                    key: 'columnName',
                    isSortable: false
                }, {
                    text: 'Description',
                    key: 'desc',
                    isSortable: false
                }]
            ];
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('viewImportSpecGridConfig', [
            'rpGridConfig',
            viewImportSpecGridConfig
        ]);
})(angular);
