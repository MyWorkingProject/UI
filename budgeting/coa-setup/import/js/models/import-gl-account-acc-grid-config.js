//  GL Accounts Grid Model

(function (angular) {
    "use strict";

    function factory(gridConfig, appTranslate) {
        var translate;
        var model = gridConfig();
        translate = appTranslate('import').translate;

        var updateGridModel = function (data) {

            model.get = function () {
                return [
                    {
                        key: 'selectedBit',
                        idKey: 'glAccountNumber',
                        type: 'select'
                    }, {
                        key: 'glAccountNumber'
                    }, {
                        key: 'description'
                    }, {
                        key: 'glAccountType'
                    }, {
                        key: 'category'
                    }, {
                        key: 'accountLevel'
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
                            text: 'Account Number',
                            key: 'glAccountNumber',
                            isSortable: false
                        }, {
                            text: 'Description',
                            key: 'description',
                            isSortable: false
                        }, {
                            text: 'Type',
                            key: 'glAccountType',
                            isSortable: false
                        }, {
                            text: 'Category',
                            key: 'category',
                            isSortable: false
                        }, {
                            text: 'Level',
                            key: 'accountLevel',
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
                        key: 'glAccountNumber',
                        type: 'text',
                        placeholder: translate('bdgt_import_grid_filter_accNumber')
                    }, {
                        key: 'description',
                        type: 'text',
                        placeholder: translate('bdgt_import_grid_filter_desc')
                    }, {
                        key: 'glAccountType',
                        value: 'All',
                        type: 'menu',
                        options: data
                    }, {
                        key: 'category',
                        type: 'text',
                        placeholder: translate('bdgt_import_grid_filter_category')
                    }, {
                        key: 'accountLevel',
                        type: 'text',
                        placeholder: translate('bdgt_import_grid_filter_level')
                    }
                ];
            };

            return model;
        };

        return { updateGridModel: updateGridModel };

    }

    angular
        .module("budgeting")
        .factory('importGlAccGrid', [
            'rpGridConfig',
            'appLangTranslate',
            factory
        ]);
})(angular);
