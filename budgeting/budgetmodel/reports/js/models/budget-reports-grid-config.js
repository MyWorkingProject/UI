//  Users List Config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, langTranslate) {
        var model = gridConfig();
        var translate = langTranslate('budgetReports').translate;

        model.get = function () {
            return [
                     {
                        key: 'reportName',
                        type: 'custom',
                        templateUrl: 'app/templates/reports-link.html'

                    }, {
                        key: 'description',
                    }, {
                        key: 'favCol',
                        type: 'custom',
                        templateUrl: 'app/templates/reports-description.html',
                        className:'fav-col'
                    }
            ];
        };

        model.getHeaders = function () {
            return [
                [
                    {
                        text: translate('bdgt_reports_grdNameText'),
                        key: 'reportName',
                        isSortable: true

                    }, {
                        text: translate('bdgt_reports_grdDescText'),
                        key: 'description',
                        isSortable: true

                    }, {
                        text: '',
                        key: 'favCol',
                        isSortable: false,
                        className:'fav-col'
                    }
                ]
            ];
        };


        return model;
    }

    angular
        .module("budgeting")
        .factory('budgetReportsConfig', ['rpGridConfig',  'appLangTranslate', factory]);
})(angular);
