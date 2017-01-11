//  Payroll Hourly Pay Item Controller

(function (angular) {
    "use strict";

    function RenewalsWorksheetCtrl(
         $scope,
        worksheetContent,
        worksheetModel,
        worksheetGridConfig,
        budgetDetails,
        svc,
        asideModel,
        mockData,
        commentSvc,
        oarBudgetDetails,
        leaseGridOptionConfig) {
        var vm = this,
            model,
            budgetModel,
            tableSettingsModel,
                calculatorAside,
                commentsAside;

        vm.init = function () {
            vm.fieldLabels = worksheetContent;
            budgetModel = budgetDetails.getModelDetails();

            var gridConfig = worksheetGridConfig(vm,
                    budgetModel.budgetYear,
                    budgetModel.startMonth - 1,
                    budgetModel.noOfPeriods
                  );

            model = vm.model = worksheetModel(gridConfig);
            //svc
            //    .getWorksheetDetails({
            //        distID: payrollByModel.distID              
            //    })
            //    .then(vm.setWorksheetDataDetails)
            //    .catch(vm.error);


            tableSettingsModel = asideModel('gridSettings').done(vm.applyGridSettings);

            calculatorAside = asideModel("calculator")
                          .done(model.applyCalculatorChanges);

            commentsAside = asideModel("budgetComments")
                          .done(vm.updateCommentCount);

            vm.setWorksheetDataDetails(mockData.getWorksheetDetails(), budgetModel);

            leaseGridOptionConfig
                .setData(model.getColumns())
                .loadPreference()
                .then(function (data) {
                    //leaseGridOptionConfig.restorePreference(data.records); //TODO
                    vm.applyGridSettings();
                });

            vm.destWatch = $scope.$on("$destroy", vm.destroy);

            oarBudgetDetails.handlePageTabs(true);
            //breadcrumbs.updateLink('occupancyRenewals.leaseRenewalsUnitTypeSummary', { distID: $stateParams.distID }, "Occupancy & Renewals");
        };

        vm.showTableSettings = function () {
            var resolve = {
                rpBdgtGridSettings: function () {
                    return leaseGridOptionConfig;
                }
            };
            tableSettingsModel
                .resolve(resolve)
                .show();
        };

        vm.selectRow = function (col, row) {
            model.selectRow(col, row);
        };

        vm.openCalculator = function () {
            var resolveData = {
                calculatorParamData: model.getCalculatorData
            };
            calculatorAside.resolve(resolveData).show();
        };

        vm.openComments = function () {
            var params = model.getCommentParams(budgetDetails.getAccessPrivileges().allowComments);
            var resolveData = {
                commentParams: function () {
                    return params;
                },
                commentsSvc: function () {
                    return commentSvc;
                }
            };
            commentsAside.resolve(resolveData).show();
        };

        //TODO: DOM updation for comments count
        vm.updateCommentCount = function () {

        };

        vm.applyGridSettings = function (settings) {
            model
                .setGridSize(leaseGridOptionConfig.getGridRowSize())
                .toggleReferenceData(leaseGridOptionConfig.getActiveLevel())
                .updateColumnVisibility(leaseGridOptionConfig.getColumnOptions());
        };

        vm.setFormInput = function () {
            model.setFormInput();
        };

        vm.onValueChange = function (column, row) {
            model.reCalculate();
        };

        vm.setWorksheetDataDetails = function (response, budgetModelSettings) {
            model
                .setData(response.records, budgetModelSettings);
        };

        vm.navigateToOccupancyWorksheet = function (col, row) {
            model.navigateToOccupancyWorksheet(col, row);
        };

        vm.destroy = function () {
            model.destroy();
            vm.destWatch();
            oarBudgetDetails.tabStatus = true;
            leaseGridOptionConfig.reset();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("RenewalsUnitTypeCtrl", [
            '$scope',
            'renewalsUnitTypeContentModel',
            'renewalsUnitTypeModel',
            'renewalsUnitTypeGridConfigModel',
            'budgetDetails',
            'renewalsUnitTypeService',
            'rpBdgtAsideModalService',
            'renewalsUnitTypeMock',
            'commentSvc',
            'oarBudgetDetails',
            'renewalsGridOptionConfigModel',
            RenewalsWorksheetCtrl]);
})(angular);
