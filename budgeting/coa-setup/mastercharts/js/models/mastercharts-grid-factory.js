//  Users List Model

(function (angular) {
    "use strict";

    function factory(mastechartSVC, gridModel, gridConfig, notifications, langTranslate) {
        var grid,
             translate = langTranslate('mastercharts').translate,
            model = {};


        model.dilogMessages = {

            msgNotFound: translate('bdgt_masterchart_dilog_msgNotFound'),
            msgNoRecFound: translate('bdgt_masterchart_dilog_msgNoRecFound')
        };

        model.init = function () {
            grid = model.grid = gridModel();
            grid.subscribe('sortBy', model.load);
            grid.subscribe('filterBy', model.load);
            grid.subscribe('paginate', model.paginate);
            grid.setConfig(gridConfig).setEmptyMsg('No results were found');
            return model;
        };

        model.load = function () {
            var data = grid.busy(true).flushData().getQuery();
            return mastechartSVC.getMasterchartList(data).success(model.setGridData, model.onLoadListError);

        };

        model.paginate = function () {
            var data = grid.getQuery();
            return mastechartSVC.getMasterchartList(data).success(model.addGridData, model.onLoadListError);
        };

        model.setGridData = function (response) {
            grid.setData(response).busy(false);
        };

        model.addGridData = function (response) {
            grid.addData(response);
        };

        model.setGridFilterState = function (state) {
            grid.setFilterState(state);
            return model;
        };

        model.onLoadListError = function (resp) {
            if (resp.status === 404) {
                notifications.showErrorNotification(model.dilogMessages.msgNotFound, model.dilogMessages.msgNoRecFound);
            }
        };

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('masterchartGridFactory', [
            'masterChartsListSvc',
            'rpGridModel',
            'masterchartListConfig',
            'masterchartNotifications',
            'appLangTranslate',
            factory
        ]);
})(angular);
