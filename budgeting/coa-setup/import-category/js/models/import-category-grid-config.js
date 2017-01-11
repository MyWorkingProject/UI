//  GL Accounts Grid Config

(function (angular) {
    "use strict";

    function importCategoryGrid(gridConfig) {
        var model = gridConfig();

        model.get = function () {
            return [
                {
                    key: 'selectedBit',
                    idKey: 'accountCategory',
                    type: 'select'
                }, {
                    key: 'accountCategory'
                }
            ];
        };

        model.getHeaders = function () {
            return [
                [
                    {
                        type: 'select',
                        key: 'selectedBit',
                        isSortable: false
                    }, {
                        text: 'Description',
                        key: 'accountCategory',
                        isSortable: false
                    }
                ]
            ];
        };

        model.getFilters = function () {
            return [
                {
                    key: 'selectedBit',
                }, {
                    key: 'accountCategory',
                    type: 'text',
                    placeholder: 'Filter by description'
                }
            ];
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('importCategoryGrid', [
            'rpGridConfig',
            importCategoryGrid
        ]);
})(angular);
