//  Roles List Config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, langTranslate) {
        var config, model = gridConfig();
        var translate;
        translate = langTranslate('cloneMasterchart').translate;

        model.get = function () {
            return [
                 {
                     key: 'isSelected',
                     idKey: 'propertyID',
                     type: 'select'
                 },
                {
                    key: 'propertyName'
                },
                {
                    key: 'currentChart',
                },
                {
                    key: 'lastClonedDate',
                },
                {
                    key: 'clonedBy',
                }
            ];
        };

        model.getHeaders = function () {
            return [
                [
                    {
                        type: 'select',
                        key: 'isSelected'
                    }, {
                        text: translate('bdgt_clonemasterchart_grdPropertyText'),
                        key: 'propertyName',
                        isSortable: false,
                        className: 'propertyName'
                    }, {
                        text: translate('bdgt_clonemasterchart_grdChartText'),
                        key: 'currentChart',
                        isSortable: false,
                        className: 'currentChart'

                    }, {
                        text: translate('bdgt_clonemasterchart_grdDateText'),
                        key: 'lastClonedDate',
                        isSortable: false,
                        className: 'lastClonedDate'
                    }, {
                        text: translate('bdgt_clonemasterchart_grdByText'),
                        key: 'clonedBy',
                        isSortable: false,
                        className: 'clonedBy'
                    }


                ]
            ];
        };

        model.getFilters = function () {
            return [

                {
                    key: 'isSelected'
                },
                {
                    key: 'propertyName',
                    type: 'text',
                    placeholder: translate('bdgt_clonemasterchart_filterPropertyText')
                },
                {
                    key: 'currentChart',
                    type: 'text',
                    placeholder: translate('bdgt_clonemasterchart_filterChartText')
                }
            ];
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('cloneMasterChartConfig', ['rpGridConfig', 'appLangTranslate', factory]);
})(angular);

