//  MasterChart Filters Model

(function (angular) {
    "use strict";

    function factory(gridFiltersModel, langTranslate) {
        var filters, model;
        var translate;
        translate = langTranslate('mastercharts').translate;

        filters = [
            {
                type: '',
                key: 'action'
             },
            {
                key: 'name',
                //className: 'name',
                placeholder: translate('bdgt_masterchart_filter_name')
        }, {
                key: 'isAlternativeCOA',
                // className: 'is-alternative-coa' ,
                type: 'menu',
                options: [{
                    name: 'All',
                    value: ''
            }, {
                    name: 'Yes',
                    value: 'Yes'
            }, {
                    name: 'No',
                    value: 'No'
            }]
        }, {
                key: 'mappedChartNames',
                placeholder: translate('bdgt_masterchart_filter_mappedchartnames') //,
                    // className: 'mapped-chart-names'
        }, {
                key: 'lastModifiedByName',
                //  className: 'last-modified-by-name',
                placeholder: translate('bdgt_masterchart_filter_lastmodifiedBbyname')
        }
    ];

        model = gridFiltersModel(filters);

        model.className = 'rp-grid-filter-1';
        return model;

    }

    angular
        .module("budgeting")
        .factory('masterChartFilter', ['rpGridFiltersModel', 'appLangTranslate', factory]);
})(angular);
