//  Roles List Config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, langTranslate) {
        var config, model = gridConfig();
        var translate;
        translate = langTranslate('defaultAdjustment').translate;

        var updateGridModel = function (data) {
            model.get = function () {
                return [
                     {
                         key: 'selectedBit',
                         idKey: 'accountCategoryID',
                         type: 'select'
                     },
                    {
                        key: 'accountTypeCode'
                    },
                    {
                        key: 'accountCategoryName'
                    },
                    {
                        key: 'adjPercent',
                        type: 'custom',
                        templateUrl: 'templates/default-adjustment/default-adjustmentText.html'
                    }
                ];
            };


            model.getHeaders = function () {
                return [
                    [
                        {
                            type: 'select',
                            key: 'selectedBit',
                            className: 'select-all'
                        }, {
                            text: 'Account Type',
                            key: 'accountTypeCode',
                            isSortable: false
                        }, {
                            text: 'Account Category',
                            key: 'accountCategoryName',
                        }, {
                            text: 'Default %',
                            key: 'adjPercent',
                        }

                    ]
                ];
            };

            model.getFilters = function () {
                return [

                    {
                        key: 'selectedBit'
                    },
                    {
                        key: 'accountTypeCode',
                        type: 'menu',
                        options: data
                    },
                    {
                        key: 'accountCategoryName',
                        type: 'text',
                        placeholder: 'Filter by account category'
                    },
                    {
                        key: 'adjPercent',
                        type: 'text',
                        placeholder: ''
                    }
                ];
            };

            return model;
        };

        return { updateGridModel: updateGridModel };
    }

    angular
        .module("budgeting")
        .factory('defaultAdjustmentConfig', ['rpGridConfig', 'appLangTranslate', factory]);
})(angular);

