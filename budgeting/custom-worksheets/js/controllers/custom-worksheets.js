//  custom worksheet Controller

(function(angular) {
    "use strict";

    function CustomWorksheetsCtrl(
        $q,
        $scope,
        $state,
        $stateParams,
        budgetDetails,
        customWorksheetsModel,
        customWorksheetsContent,
        customWorksheetFormConfig,
        customWorksheetsGridConfig,
        svc,
        breadcrumbs) {
        var vm = this,
            formConfig,
            model;

        vm.init = function() {
            var budgetModel = budgetDetails.getModelDetails(),
                accessPrivilages = budgetDetails.getAccessPrivileges();
            vm.fieldLabels = customWorksheetsContent;
            formConfig = vm.formConfig = customWorksheetFormConfig;
            formConfig.setMethodsSrc(vm);
            var gridConfig = customWorksheetsGridConfig(vm,
                budgetModel.budgetYear,
                budgetModel.startMonth - 1,
                budgetModel.noOfPeriods);


            model = vm.model = customWorksheetsModel(gridConfig);
            //breadcrumb
            breadcrumbs.updateLink('budgetmodel.overview', { distID: $stateParams.distID }, budgetModel.modelName);
            var categoriesParams = {
                masterChartID: budgetModel.masterChartID,
                accountTypeID: 0
            };
            $q
                .all([
                    svc.getAccountTypes(),
                    svc.getAccountCategories(categoriesParams),
                    svc.getCustomWorksheets()
                ])
                .then(vm.setData);
        };

        vm.setData = function(responses) {
            formConfig
                .setAccountTypes(responses[0].records)
                .setAccountCategories(responses[1].records);
            model.setData(responses[0].records, responses[2].records);
        };

        vm.accountTypeChanged = function(value) {
            model.showSelectedAccounType(parseFloat(value));
        };
        vm.accountCategoryChanged = function(value) {
            model.showSelectedCategories(parseFloat(value));
        };
        vm.filterGridChanged = function(value) {
            model.showMatchedWorksheets(value);
        };
        vm.navigateTo = function(colum, row) {
            //Todo: navigate to custom worksheet
            //$state.go
        };

        vm.destroy = function() {

        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("CustomWorksheetsCtrl", [
            '$q',
            '$scope',
            '$state',
            '$stateParams',
            'budgetDetails',
            'customWorksheetsModel',
            'customWorksheetsContentModel',
            'customWorksheetFormConfigModel',
            'customWorksheetsGridConfigModel',
            'customWorksheetsSVC',
            'rpBdgtBreadcrumbsModel',
            CustomWorksheetsCtrl
        ]);
})(angular);
