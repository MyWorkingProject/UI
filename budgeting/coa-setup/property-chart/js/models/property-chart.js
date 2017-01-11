//  Property List Model

(function (angular) {
    "use strict";

    function factory(propertyChart, gridModel, gridConfig, langTranslate, propertyChartNotification) {
        var grid,
            model = {};

        var text,
          translate;
        translate = langTranslate('propertyChart').translate;

        text = {
            showFilters: translate('bdgt_propertychart_showfilterText'),
            hideFilters: translate('bdgt_propertychart_hidefilterText'),
            pageHeading: translate('bdgt_propertychart_pageHeading')
        };

        model = {
            text: text
        };

        model.init = function () {
            grid = model.grid = gridModel();
            grid.subscribe('sortBy', model.load);
            grid.subscribe('filterBy', model.load);
            grid.subscribe('paginate', model.paginate);
            grid.setConfig(gridConfig).setEmptyMsg(translate('bdgt_propertychart_getEmptyMsg'));
            return model;
        };

        model.load = function () {
            var data = grid.busy(true).flushData().getQuery();
            //var params = {
            //    datafilter:data
            //};
            //return propertyChart.getPropertyChartList.get(data).$promise.then(model.setGridData, propertyChartNotification.getPropertyChartError);

            return propertyChart.abort().get(data).then(model.setGridData, propertyChartNotification.getPropertyChartError);

        };


        model.paginate = function () {
            var data = grid.getQuery();
            //var params = {
            //    datafilter: data
            //};
            //return propertyChart.getPropertyChartList.get(data).$promise.then(model.addGridData, propertyChartNotification.getPropertyChartError);
            return propertyChart.abort().get(data).then(model.addGridData, propertyChartNotification.getPropertyChartError);
        };

        model.setGridData = function (response) {
            grid.setData(response.data).busy(false);
        };

        model.addGridData = function (response) {
            grid.addData(response.data);
        };

        model.setGridFilterState = function (state) {
            grid.setFilterState(state);
            return model;
        };

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('propertyChartModel', [
            'propertyChartSvc',
            'rpGridModel',
            'propertyChartListConfig', 'appLangTranslate', 'propertyChartNotification',
            factory
        ]);
})(angular);

