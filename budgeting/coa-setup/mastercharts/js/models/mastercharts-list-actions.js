//  Users List Actions Model

(function (angular) {
    "use strict";

    function factory(langTranslate, masterChartsListSvc, notifications,grid, newMasterchartModel, $location) {
        var model = {},
        translate = langTranslate('mastercharts').translate;

        model.dilogMessages = {
            deletDilogMessage: translate('bdgt_masterchart_dilog_deletDilogMessage'),
            responseDilogMessage: translate('bdgt_masterchart_dilog_responseDilogMessage'),
            deletDilogMessageInfo: translate('bdgt_masterchart_dilog_deletDilogMessageInfo'),
            unDeleteReason: translate('bdgt_masterchart_dilog_unDeleteReason'),
            deletDilogQuestion: translate('bdgt_masterchart_dilog_deletDilogQuestion'),
            copyMasterChartTitle: translate('bdgt_masterchart_dilog_copyMasterChartTitle'),
            copyMasterChartInfo: translate('bdgt_masterchart_dilog_copyMasterChartInfo'),
            msgInvalidParam: translate('bdgt_masterchart_dilog_msgInvalidParam'),
            deleteButton: translate('bdgt_masterchart_actions_delete')
        };

        model.copyChart = function (params) {
            var paramsData = {
                masterChartID: params.masterChartID,
                isAlternativeCOA: params.copyMasterChartflag
            };
            var promise = model.getCopyMasterchartPromise(paramsData);
            promise.then(model.copyOnSuccess, model.copyMasterChartException);
            //masterChartsListSvc.copyMasterChart.putData(paramsData, '').$promise.then(model.copyOnSuccess, model.copyMasterChartException);
        };

        model.getCopyMasterchartPromise = function (paramsData) {
            return masterChartsListSvc.copyMasterChart(paramsData, '').$promise;
        };

        model.copyOnSuccess = function (resp) {
            grid.load();
            notifications.showSuccessNotification(translate('bdgt_masterchart_dilog_msgCopyMasterChart'));

        };

        model.copyMasterChartException = function (resp) {
            if (resp.status === 400) {
                notifications.showErrorNotification(model.dilogMessages.copyMasterChartTitle, model.dilogMessages.copyMasterChartInfo);
            }

        };

        model.viewMasterChart = function (record) {
            newMasterchartModel.edit(false);
            model.viewEditSetup(record);
        };

        model.viewEditSetup = function (record) {
            if (model.isRecordsCompleted(record)) {
                model.moveToViewMode(record);
            }
            else {
                model.moveToWizard(record);
            }
        };

        model.isRecordsCompleted = function (record) {
            if (record.status === "Completed") {
                return true;
            }
            return false;
        };

        model.moveToViewMode = function (record) {
            $location.path('/admin/coa/editmasterchart/' + record.masterChartID);
        };

        model.moveToWizard = function (record) {
            if (model.isRecordAlternative(record)) {
                $location.path('/admin/coa/wiz/new/alt/' + record.masterChartID);
            }
            else {
                $location.path('/admin/coa/wiz/new/normal/' + record.masterChartID);
            }
        };

        model.isRecordAlternative = function (record) {
            if (record.isAlternativeCOA) {
                return true;
            }
            return false;
        };

        model.editMasterChart = function (record) {
            newMasterchartModel.edit(true);
            model.viewEditSetup(record);
        };

        model.setEditViewMode = function () {
            newMasterchartModel.edit(false);
        };

        model.getDelDialogTitle = function () {
            return model.dilogMessages.deletDilogMessage;
        };

        model.getDelDialogQues = function () {
            return model.dilogMessages.deletDilogQuestion;
        };

        model.getDelDialogInfo = function () {
            return model.dilogMessages.deletDilogMessageInfo;
        };

        model.getDeleteButtonText = function () {
            return model.dilogMessages.deleteButton;
        };

        model.deleteMasterChart = function (masterchartId) {
            var params = {
                masterchartId: masterchartId
            };
            var promise = model.getDeleteMasterchartPromise(params);
            promise.then(model.loadGridDataOnSuccess, model.showErrorMessage);

        };

        model.getDeleteMasterchartPromise = function (params) {
            return masterChartsListSvc.deleteMasterChart(params).$promise;

        };

        model.loadGridDataOnSuccess = function (resp) {
            grid.load();
        };

        model.showErrorMessage = function (resp) {
            var reason;
            if (resp.status === 400) {
                if (resp.data.message === "CHART_CLONED") {
                    reason = model.dilogMessages.unDeleteReason;

                }
                else if (resp.data.message === "INVALID_PARAM") {
                    reason = model.dilogMessages.msgInvalidParam;
                }

            }
            notifications.showErrorNotification(model.dilogMessages.responseDilogMessage, reason);
        };


        return model;
    }

    angular
        .module("budgeting")
        .factory('masterchartListActions', ['appLangTranslate',
            'masterChartsListSvc',
            'masterchartNotifications',
            'masterchartGridFactory',
            'newMasterchartModel',
            '$location',
            factory]);
})(angular);

