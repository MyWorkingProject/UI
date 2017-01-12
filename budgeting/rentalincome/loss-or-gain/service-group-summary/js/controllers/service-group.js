//  Payroll Hourly Pay Item Controller

(function(angular) {
    "use strict";

    function serviceGroupCtrl(
        $scope,
        worksheetContent,
        worksheetModel,
        worksheetGridConfig,
        budgetDetails,
        svc,

        tableSettings,
        confirmModal,
        timeout, $stateParams, commentSvc, notifSvc, $state, mock, bmCalculation, oarBudgetDetails, serviceGridOptionConfig) {
        var vm = this,
            body, btnClick,
            model,
            budgetModel,
            alertModal,
            alertOccupancyGoal, commentsAside, calculatorAside, accessPrivilages, gridSettingAside;

        vm.init = function(serviceGroupID) {
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
            vm.fieldLabels = worksheetContent;
            budgetModel = budgetDetails.getModelDetails();
            accessPrivilages = budgetDetails.getAccessPrivileges();
            var gridConfig = worksheetGridConfig(vm,
                budgetModel.budgetYear,
                budgetModel.startMonth - 1,
                budgetModel.noOfPeriods
            );


            vm.isEditable = accessPrivilages.allowEdit;
            model = vm.model = worksheetModel(gridConfig, accessPrivilages.allowEdit);
            serviceGridOptionConfig
                .setData(model.getColumns())
                .loadPreference()
                .then(function(data) {
                    serviceGridOptionConfig.restorePreference(data.records);
                });
            model.currentServiceGroup(serviceGroupID === undefined ? $stateParams.serviceGroupID : serviceGroupID);

            svc
                .getSgWorksheetDetails({
                    distID: budgetModel.distributedID,
                    noOfPeriods: budgetModel.noOfPeriods,
                    serviceGroupID: model.currentServiceGroupId //TODO
                })
                .then(vm.setWorksheetDataDetails)
                .catch(vm.error);



            commentsAside = tableSettings('budgetComments')
                .done(vm.updateCommentCount);

            calculatorAside = tableSettings("calculator")
                .done(model.applyCalculatorChanges);
            gridSettingAside = tableSettings('gridSettings')
                .done(vm.applyGridSettings);
            alertOccupancyGoal = confirmModal.confirm().accept(model.onOccupancyGoalChage).reject(vm.loadCancel);
            svc.getSgServiceGroupDetails({ distributedID: budgetModel.distributedID }).then(vm.storeServiceGroupsData).catch(vm.error);
            vm.destWatch = $scope.$on("$destroy", vm.destroy);
            oarBudgetDetails.handlePageModelDetails(false);
        };

        vm.setWorksheetDataDetails = function(response) {
            model
                .setData(response.records);
            model.setFormInput();
        };
        vm.showTableSettings = function() {
            var resolve = {
                rpBdgtGridSettings: function() {
                    return serviceGridOptionConfig;
                }
            };
            gridSettingAside
                .resolve(resolve)
                .show();
        };

        vm.applyGridSettings = function(settings) {
            model
                .setGridSize(serviceGridOptionConfig.getGridRowSize())
                .updateColumnVisibility(serviceGridOptionConfig.getColumnOptions());
        };



        vm.onOccupancyGoalChange = function() {
            alertOccupancyGoal.setContent({
                title: worksheetContent.ogp_title,
                message: worksheetContent.ogp_message,
                btnAcceptText: worksheetContent.ogp_btnUpdate,
                btnRejectText: worksheetContent.ogp_cancel
            }).show();
        };

        vm.storeServiceGroupsData = function(data) {
            model.storeServiceGroups(data);
            model.storeServiceGroupId(model.currentServiceGroupId);
        };




        vm.setFormInput = function() {
            model.setFormInput();
        };

        vm.onMoveInsValueChange = function(column, row) {
            model.reCalculate(column, row);
            model.onOccupancyGoalChage(false, false);
        };
        vm.onValueChange = function(column, row) {
            model.reCalculate(column, row);

            model.onOccupancyGoalChage(true, row.data.itemDescription !== worksheetContent.occupancyGoal);
        };
        vm.selectRow = function(col, row) {
            model.selectRow(col, row);
        };

        vm.makeLeaseComment = function() {
            var params = model.getCommentParams();
            var resolveData = {
                commentParams: function() {
                    return params;
                },
                commentsSvc: function() {
                    return commentSvc;
                }
            };
            commentsAside.resolve(resolveData).show();

        };
        vm.updateCommentCount = function(response) {
            model.updateCommentCount(response);
        };
        vm.showCalculator = function() {
            var resolveData = {
                calculatorParamData: model.getCalculatorData
            };

            calculatorAside
                .resolve(resolveData)
                .show();
        };
        vm.save = function() {
            svc.saveWorksheetDetails({ distributedID: budgetModel.distributedID },
                model.save(vm.model.grid, vm.model.grid.getRows())).then(vm.saveWorksheetDetails);
            svc.saveInoutoccupancy(model.inputOccupancy());
        };
        vm.saveWorksheetDetails = function() {
            notifSvc.success(vm.fieldLabels.worksheetsavedmsg);
        };
        vm.destroy = function() {
            serviceGridOptionConfig.updatePreference();
            serviceGridOptionConfig.reset();
            model.destroy();
            vm.destWatch();
            oarBudgetDetails.handlePageModelDetails(true);
            commentsAside.destroy();
            calculatorAside.destroy();
        };
        //serviceGroupSearch
        vm.showsearchServiceGroup = function() {
            vm.isSearchServiceGroup = true;
        };

        vm.hideSearchServiceGroup = function() {
            vm.isSearchServiceGroup = false;
        };
        vm.onSelectedServiceGroup = function(selectedServiceGroup) {
            vm.isSearchServiceGroup = false;
            vm.changeServiceGroup(selectedServiceGroup.serviceGroupID);
        };
        vm.changeServiceGroup = function(serviceGroupID) {
            $state.go('occupancyRenewals.occupancyVacancyServiceGroup', {
                    distID: $state.params.distID,
                    serviceGroupID: serviceGroupID
                }, {
                    location: "replace",
                    inherit: false,
                    relative: $state.$current,
                    notify: false
                })
                .then(function() {
                    vm.init(serviceGroupID);
                });
        };
        vm.getRowTotal = function(column, row, rows) {
            return bmCalculation.getRowTotal(column, row, rows);
        };
        vm.getRowAvg = function(col, row, rows) {
            return model.getRowAvg(col, row, rows);
        };
        vm.cancel = function() {
            $state.go('occupancyRenewals.occupancyVacancy');
        };
        vm.init();
    }

    angular
        .module("budgeting")
        .controller("serviceGroupCtrl", [
            '$scope',
            'sgworksheetContentModel',
            'sgworksheetModel',
            'sgworksheetGridConfigModel',
            'budgetDetails',
            'sgworksheetService',
            'rpBdgtAsideModalService',
            'rpBdgtModalService',
            '$timeout', '$stateParams', 'commentSvc',
            'notificationService',
            '$state',
            'worksheetMock',
            'bmGridCalculationModel',
            'oarBudgetDetails',
            'serviceGridOptionConfigModel',
            serviceGroupCtrl
        ]);
})(angular);