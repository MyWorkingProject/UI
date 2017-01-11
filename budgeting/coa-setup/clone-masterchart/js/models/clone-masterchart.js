//  User Properties Model

(function (angular) {
    "use strict";

    function factory(langTranslate, $filter, $location, cloneSvc, breadcrumbs, newMasterChartSVC, newMasterchartModel, gridModel, cloneNotification, gridConfig) {
        var text, grid,
            model, translate;
        translate = langTranslate('cloneMasterchart').translate;
        text = {
            showFilters: translate('bdgt_clonemasterchart_showfilterText'),
            hideFilters: translate('bdgt_clonemasterchart_hidefilterText'),
            pageHeading: translate('bdgt_clonemasterchart_pageHeading'),
            saveBtnText: translate('bdgt_clonemasterchart_saveBtnText'),
            cloneBtnText: translate('bdgt_clonemasterchart_cloneBtnText')
        };

        model = {
            text: text,
            reLoad: false,
            isEditMode: false,
            wizard: false,
            editModel: newMasterchartModel,
            PostData: []
        };

        model.init = function () {
            grid = model.grid = gridModel();
            grid.subscribe('sortBy', model.load);
            grid.subscribe('filterBy', model.load);
            grid.subscribe('paginate', model.paginate);
            grid.setConfig(gridConfig).setEmptyMsg(translate('bdgt_clonemasterchart_getEmptyMsg'));
            return model;
        };

        model.load = function () {
            var data = grid.busy(true).flushData().getQuery();
            //var params = {
            //    datafilter:data
            //};

            //return cloneSvc.getMasterChartPropertyCloneList.get(data).$promise.then(model.setGridData, cloneNotification.getCloneChartError);
            return cloneSvc.abortGet().get(data).then(model.setGridData, cloneNotification.getCloneChartError);
        };

        model.paginate = function () {
            var data = grid.getQuery();
            //var params = {
            //    datafilter: data
            //};
            //return cloneSvc.getMasterChartPropertyCloneList.get(data).$promise.then(model.addGridData, cloneNotification.getCloneChartError);
            return cloneSvc.abortGet().get(data).then(model.addGridData, cloneNotification.getCloneChartError);
        };

        model.getData = function () {
            return model.grid.data;
        };

        model.setGridData = function (response) {
            model.resetCloneData(response);
            grid.setData(response.data).busy(false);
        };

        model.addGridData = function (response) {
            model.resetCloneData(response);
            grid.addData(response.data);
        };

        model.resetCloneData = function (data) {
            angular.forEach(data.records, function (item) {
                item.isSelected = false;
            });
        };

        model.setGridFilterState = function (state) {
            grid.setFilterState(state);
            return model;
        };


        model.updateWizardStep = function (masterChartID) {
            var reqdata = {
                "wizardType": "MasterChart",
                "referenceID": masterChartID,
                "stepID": 5
            };
            //cloneSvc.updateWizStep.post(reqdata).$promise.then(model.updateWizardSuccess, cloneNotification.wizardFailure);
            //cloneSvc.updateWizStep(reqdata).then(model.updateWizardSuccess, cloneNotification.wizardFailure);
            var promise =   model.getUpdateWizPromise(reqdata);
            promise.then(model.updateWizardSuccess, cloneNotification.wizardFailure);
        };

        model.getUpdateWizPromise = function (reqdata) {
            return cloneSvc.updateWizStep(reqdata).$promise;
        };

        model.updateWizardSuccess = function (resp) {
            $location.path('/admin/coa');
        };

        model.updateState = function () {
            if (model.isWizard()) {
                newMasterchartModel.edit(true);
            }
            else if (!(newMasterchartModel.getEditState())) {
                newMasterchartModel.edit(false);
            }
        };

        model.isWizard = function () {
            if ($location.absUrl().indexOf('admin/coa/wiz') > 0) {
                return true;
            }
            return false;
        };

        model.saveData = function (cloneData) {
            model.getPostData(cloneData);
            if (model.PostData.length > 0) {
                //cloneSvc.cloneMasterChart.post(model.PostData).$promise.then(model.saveSuccessCallBack, cloneNotification.getCloneChartError);
                var promise= model.getPostPromise(model.PostData);
                promise.then(model.saveSuccessCallBack, cloneNotification.getCloneChartError);
            }
        };

        model.getPostPromise = function (data) {
            return cloneSvc.cloneMasterChart(data).$promise;
        };

        model.getPostData = function (cloneData) {
            model.PostData = [];
            var chekedRows = $filter('filter')(cloneData.records, { isSelected: 'true' });
            angular.forEach(chekedRows, function (item) {
                var data = {
                    "masterChartID": item.masterChartID,
                    "propertyID": item.propertyID,
                    "source": "MasterChart"
                };

                model.PostData.push(data);
            });
            return model.PostData;
        };


        model.saveSuccessCallBack = function (data) {
            if (model.isWizard()) {
                model.updateWizardStep(model.PostData[0].masterChartID);
            }
        };

        model.updateBreadcrumbs = function (masterChartID) {
            var params = {
                chartID: masterChartID
            };
            //newMasterChartSVC.getMasterChartData(params).$promise.then(model.getMasterChartSuccess, cloneNotification.getCloneChartError);
            var promise= model.getChartPromise(params);
            promise.then(model.getMasterChartSuccess, cloneNotification.getCloneChartError);
        };

        model.getChartPromise = function (params) {
            return newMasterChartSVC.getMasterChartData(params).$promise;
        };

        model.getMasterChartSuccess = function (chartdata) {
            breadcrumbs.updateCurrent({
                text: chartdata.records.name
            });
        };

        model.setInitials = function (currentPath, type) {
            if (currentPath.indexOf("editmasterchart") > -1) {
                model.setIsEditMode(true);
            }
            else {
                model.setIsEditMode(false);
            }

            if (currentPath.indexOf("/wiz") > 0) {
                model.setIsWizard(true);
            }
            else {
                model.setIsWizard(false);
            }
        };

        model.setIsEditMode = function (bln) {
            model.isEditMode = bln;
        };

        model.setIsWizard = function (bln) {
            model.wizard = bln;
        };

        model.getIsEditMode = function () {
            return model.isEditMode;
        };

        model.getIsWizard = function () {
            return model.wizard;
        };

        model.wizardFailure = function (response) {
            if (response.status === 400) {
                cloneNotification.wrapShowMsg(response.data.message, model.wizErrorObj);
            }
        };

        return model.init();
    }
    angular
        .module("budgeting")
        .factory('cloneMasterChartModel', [
             'appLangTranslate', '$filter', '$location', 'cloneMasterChartSvc', 'rpBreadcrumbsModel', 'newMasterchartSVC', 'newMasterchartModel', 'rpGridModel', 'cloneChartNotification', 'cloneMasterChartConfig',
            factory
        ]);
})(angular);
