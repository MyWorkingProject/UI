//  Payroll Hourly Pay Item Controller

(function(angular) {
    "use strict";

    function WorksheetCtrl(
        $scope,
        worksheetContent,
        worksheetModel,
        worksheetGridConfig,
        budgetDetails,
        svc,

        tableSettings,
        confirmModal,
        timeout, commentSvc, worksheetValidationModel, notifSvc, $state, worksheetGridOptionConfig) {
        var vm = this,
            body, btnClick,
            model,
            budgetModel,
            alertModal,
            alertOccupancyGoal, commentsAside, calculatorAside, accessPrivilages, gridSettingAside;

        vm.init = function() {
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
            worksheetGridOptionConfig
                .setData(model.getColumns())
                .loadPreference()
                .then(function(data) {
                    worksheetGridOptionConfig.restorePreference(data.records);
                });

            svc
                .getWorksheetDetails({
                    distID: budgetModel.distributedID,
                    noOfPeriods: budgetModel.noOfPeriods
                })
                .then(vm.setWorksheetDataDetails)
                .catch(vm.error);



            commentsAside = tableSettings('budgetComments')
                .done(vm.updateCommentCount);

            calculatorAside = tableSettings("calculator")
                .done(model.applyCalculatorChanges);

            alertModal = confirmModal.confirm().accept(model.updateOccupiedUnits).reject(vm.loadCancel);
            alertOccupancyGoal = confirmModal.confirm().accept(model.onOccupancyGoalChage).reject(vm.loadCancel);

            gridSettingAside = tableSettings('gridSettings')
                .done(vm.applyGridSettings);
            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };
        vm.showCalculator = function() {
            var resolveData = {
                calculatorParamData: model.getCalculatorData
            };

            calculatorAside
                .resolve(resolveData)
                .show();
        };
        vm.setWorksheetDataDetails = function(response) {
            model
                .setData(response.records, budgetModel);
        };

        vm.showLoad = function(data) {
            model.setUpdatedBeginingUnits(data.records);
            alertModal.setContent({
                title: worksheetContent.bou_title,
                message: worksheetContent.bou_message + data.records.beginingOccupiedUnits,
                btnAcceptText: worksheetContent.bou_btnUpdate,
                btnRejectText: worksheetContent.bou_cancel,
            }).show();
        };
        vm.showTableSettings = function() {
            var resolve = {
                rpBdgtGridSettings: function() {
                    return worksheetGridOptionConfig;
                }
            };
            gridSettingAside
                .resolve(resolve)
                .show();
        };

        vm.applyGridSettings = function(settings) {
            model
                .setGridSize(worksheetGridOptionConfig.getGridRowSize())
                .toggleReferenceData(worksheetGridOptionConfig.getActiveLevel())
                .updateColumnVisibility(worksheetGridOptionConfig.getColumnOptions());
        };
        vm.onOccupancyGoalChange = function() {
            alertOccupancyGoal.setContent({
                title: worksheetContent.ogp_title,
                message: worksheetContent.ogp_message,
                btnAcceptText: worksheetContent.ogp_btnUpdate,
                btnRejectText: worksheetContent.ogp_cancel
            }).show();
        };



        vm.helpTextForBeginingUnits = function(column, row) {
            model.updateHelpText(column, row);
        };

        vm.helpTextForBeginingUnits = function(column, row) {
            model.updateHelpText(column, row, true);
            timeout(vm.bindMenu);
        };

        vm.bindMenu = function() {
            if (model.getBOUToolTipflag()) {
                vm.bindMenuClick();
            }
        };

        vm.bindMenuClick = function() {
            body.on(btnClick, vm.hideMenu);
        };

        vm.unbindMenuClick = function() {
            body.off(btnClick);
        };

        vm.hideMenu = function() {
            $scope.$apply(function() {
                model.updateBOUHelpText(false);
                vm.unbindMenuClick();
            });
        };





        vm.setFormInput = function() {
            model.setFormInput();
        };


        vm.onValueChange = function(column, row) {
            model.reCalculate(column, row);
        };
        vm.selectRow = function(col, row) {
            model.selectRow(col, row);
        };
        vm.updateOccupiedUnits = function(column, row) {
            svc
                .getBeginingOccupiedUnits({
                    budgetModelID: budgetModel.budgetModelID,
                    propertyID: budgetModel.propertyID
                })
                .then(vm.showLoad)
                .catch(vm.error);
        };
        vm.updateCommentCount = function(response) {
            model.updateCommentCount(response);
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

        vm.cancel = function() {
            $state.go('budgetmodel.overview', { distID: budgetModel.distributedID });
        };

        vm.destroy = function() {
            model.destroy();
            vm.destWatch();
        };
        vm.save = function() {
            svc.saveWorksheetDetails({ distributedID: budgetModel.distributedID }, model.save(vm.model.grid, vm.model.grid.getRows())).then(vm.saveWorksheetDetails);
            svc.saveInoutoccupancy(model.inputOccupancy());
        };
        vm.saveWorksheetDetails = function() {
            notifSvc.success(vm.fieldLabels.worksheetsavedmsg);
        };
        vm.init();
    }

    angular
        .module("budgeting")
        .controller("WorksheetCtrl", [
            '$scope',
            'worksheetContentModel',
            'worksheetModel',
            'worksheetGridConfigModel',
            'budgetDetails',
            'worksheetService',
            'rpBdgtAsideModalService',
            'rpBdgtModalService',
            '$timeout', 'commentSvc', 'worksheetValidationModel', 'notificationService', '$state', 'worksheetGridOptionConfigModel',
            WorksheetCtrl
        ]);
})(angular);