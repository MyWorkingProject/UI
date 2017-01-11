//  Users List Header Model

(function (angular) {
    "use strict";

    function factory(gridHeadersModel, langTranslate) {
        var headers, model;
        var translate;
        translate = langTranslate('mastercharts').translate;
        logc("translate object");
        logc(translate);

        headers = [[{
            text: translate('bdgt_masterchart_column_action'),
            key: 'action',
            isSortable: false,
            className: 'action-menu'
        }, {
            text: translate('bdgt_masterchart_column_name'),
            key: 'Name',
            isSortable: false,
            className: 'name'
        }, {
            text: translate('bdgt_masterchart_column_isalternativecoa'),
            key: 'isAlternativeCOA',
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
        }]];

        model = gridHeadersModel(headers);
        model.className = 'rp-grid-header-1';

        return model;
    }

    angular
        .module("budgeting")
        .factory('masterChartListHeader', ['rpGridHeadersModel', 'appLangTranslate', factory]);
})(angular);
