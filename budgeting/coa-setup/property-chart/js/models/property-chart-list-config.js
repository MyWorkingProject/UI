//  Roles List Config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, actions, langTranslate) {
        var config, model = gridConfig();
        var translate;
        translate = langTranslate('propertyChart').translate;
        model.get = function () {
            return [
                {
                    key: 'action',
                    type: 'actionsMenu',
                    getActions: actions.get
                },
                {
                    key: 'propertyName'
                },
                {
                    key: 'clonedMasterChartName',
                },
                {
                    key: 'lastModifiedByName',
                },
                {
                    key: 'lastModifiedDate',
                }

            ];
        };

        model.getHeaders = function () {
            return [
                [
                    {
                        text: translate('bdgt_propertychart_column_action'),
                        key: 'action',
                        isSortable: false,
                        className: 'action-menu'
                    }, {
                        text: translate('bdgt_propertychart_column_propertyname'),
                        key: 'propertyName',
                        isSortable: false,
                        className: 'property-name'
                    }, {
                        text: translate('bdgt_propertychart_column_chartname'),
                        key: 'clonedMasterChartName',
                        isSortable: false,
                        className: 'cloned-master-chart-name'

                    }, {
                        text: translate('bdgt_propertychart_column_lastmodifiedBbyname'),
                        key: 'lastModifiedByName',
                        isSortable: false,
                        className: 'last-modified-by-name'
                    }, {
                        text: translate('bdgt_propertychart_column_lastModifiedDate'),
                        key: 'lastModifiedDate',
                        isSortable: false,
                        className: 'last-modified-date'
                    }

                ]
            ];
        };

        model.getFilters = function () {
            return [

                {
                    key: 'action'
                },
                {
                    key: 'propertyName',
                    type: 'text',
                    placeholder: translate('bdgt_propertychart_filterPropertyText')
                },
                {
                    key: 'clonedMasterChartName',
                    type: 'text',
                    placeholder: translate('bdgt_propertychart_filterChartText')
                },
                {
                    key: 'lastModifiedByName',
                    type: 'text',
                    placeholder: translate('bdgt_propertychart_filterModifiedText')
                }


            ];
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('propertyChartListConfig', ['rpGridConfig', 'propertyChartListActions', 'appLangTranslate', factory]);
})(angular);

