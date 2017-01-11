//  Users List Config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, actions, langTranslate) {
        var model = gridConfig();
        var translate = langTranslate('mastercharts').translate;

        model.get = function () {
            return [
                    {
                        key: 'action',
                        type: 'actionsMenu',
                        getActions: actions.get
                    },
                    {
                        key: 'name',
                        type: 'custom',
                        templateUrl: 'templates/mastercharts/masterchart-status.html'
                    }, {
                        key: 'isAlternativeCOA',
                        type: 'custom',
                        templateUrl: 'templates/mastercharts/masterchart-alternate-coa.html'
                    }, {
                        key: 'mappedChartNames',
                        text: 'mappedChartNames',
                        className: 'mapped-chart-names'
                    }, {
                        key: 'lastModifiedByName',
                        text: 'lastModifiedByName',
                        className: 'last-modified-by-name'
                    }, {
                        key: 'lastModifiedDate',
                        type: 'date',
                        className: 'last-modified-date',
                        text: 'lastModifiedDate'
                    }
            ];
        };

        model.getHeaders = function () {
            return [
                [
                    {
                        text: translate('bdgt_masterchart_column_action'),
                        key: 'action',
                        isSortable: false,
                        className: 'action-menu'

                    }, {
                        text: translate('bdgt_masterchart_column_name'),
                        key: 'name',
                        isSortable: false,
                        className: 'name'
                    }, {
                        text: translate('bdgt_masterchart_column_isalternativecoa'),
                        key: 'isAlternativeCoa',
                        isSortable: false,
                        className: 'is-alternative-coa'

                    }, {
                        text: translate('bdgt_masterchart_column_mappedchartnames'),
                        key: 'mappedChartNames',
                        isSortable: false,
                        className: 'mapped-chart-names'
                    }, {
                        text: translate('bdgt_masterchart_column_lastmodifiedBbyname'),
                        key: 'lastModifiedByName',
                        isSortable: false,
                        className: 'last-modified-by-name'
                    }, {
                        text: translate('bdgt_masterchart_column_lastmodifieddate'),
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
                   type: '',
                   key: 'action'
               },
               {
                   key: 'name',
                   type: 'text',
                   className: 'name',
                   placeholder: translate('bdgt_masterchart_filter_name')
               }, {
                   key: 'isAlternativeCoa',
                   type: 'menu',
                   value: '',
                   className: 'is-alternative-coa',

                   options: [
                          {
                              value: '',
                              name: 'All'
                          }, {
                               name: 'Yes',
                               value: 'Yes'
                          }, {
                               name: 'No',
                               value: 'No'
                          }]
               }, {
                   key: 'mappedChartNames',
                   type: 'text',
                   className: 'mapped-chart-names',
                   placeholder: translate('bdgt_masterchart_filter_mappedchartnames'),

               }, {
                   key: 'lastModifiedByName',
                   type: 'text',
                   className: 'last-modified-by-name',
                   placeholder: translate('bdgt_masterchart_filter_lastmodifiedBbyname')
               }
            ];
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('masterchartListConfig', ['rpGridConfig', 'masterchartListActionsDef', 'appLangTranslate', factory]);
})(angular);
