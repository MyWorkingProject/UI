//  GL Accounts Grid Model

(function (angular) {
    "use strict";

    function factory(gridConfig, appTranslate) {
        var translate = appTranslate('import').translate;
        var model = gridConfig();

        var updateLRGridModel = function () {

            model.get = function () {
                return [
                    {
                        key: 'selectedBit',
                        idKey: 'propertyID',
                        type: 'select'
                    }, {
                        key: 'propertyName'
                    }, {
                        key: 'message',
                    }, {
                        key: 'importDate',
                    }
                ];
            };

            model.getHeaders = function () {
                return [[
                    {
                        type: 'select',
                        key: 'selectedBit',
                        isSortable: false
                    }, {
                        text: 'Name',
                        key: 'propertyName',
                        isSortable: false
                    }, {
                        text: 'Result',
                        key: 'message',
                        isSortable: false
                    }, {
                        text: 'Date Imported',
                        key: 'importDate',
                        isSortable: false
                    }
                ]];
            };

            model.getFilters = function () {
                return [
                    {
                        key: 'selectedBit',
                    }, {
                        key: 'propertyName',
                        type: 'text',
                        placeholder: translate('bdgt_import_grid_filter_name')
                    }, {
                        key: 'message',
                        type: 'text',
                        placeholder: translate('bdgt_import_grid_filter_message')
                    }
                ];
            };

            return model;
        };

        return { updateLRGridModel: updateLRGridModel };
    }

    angular
        .module("budgeting")
        .factory('importGlLrGrid', [
            'rpGridConfig',
            'appLangTranslate',
            factory
        ]);
})(angular);
