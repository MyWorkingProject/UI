//  Users List Config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, langTranslate) {
        var model = gridConfig();
        var translate = langTranslate('contracts-csv').translate;

        model.get = function () {
            return [
                     {
                        key: 'columnName'

                    }, {
                        key: 'desc'

                    }
            ];
        };

        model.getHeaders = function () {
            return [
                [
                    {
                        text: translate('bdgt_contracts_vwSpecColumnText'),
                        key: 'columnName'
                        //isSortable: true

                    }, {
                        text: translate('bdgt_contracts_vwSpecDescText'),
                        key: 'desc'
                        //isSortable: true

                    }
                ]
            ];
        };


        return model;
    }

    angular
        .module("budgeting")
        .factory('contractCSVViewConfig', ['rpGridConfig',  'appLangTranslate', factory]);
})(angular);
