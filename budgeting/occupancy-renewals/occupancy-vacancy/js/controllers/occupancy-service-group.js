//  Payroll Hourly Pay Item Controller

(function(angular) {
    "use strict";

    function ServiceGroupCtrl(
        $scope,
        serviceGroupContent,
        serviceGroupModel,
        serviceGroupGridConfig,
        budgetDetails,
        svc,
        mockData,
        settings,
        occupancyDetailsModel,
        ovDetailsGridConfig, bmCalculation, serviceGridOptionConfig) {
        var vm = this,
            model, occDetailsModel,
            budgetModel,
            gridSettingAside;

        vm.init = function() {
            vm.fieldLabels = serviceGroupContent;
            budgetModel = budgetDetails.getModelDetails();

            var gridConfig = serviceGroupGridConfig(vm,
                budgetModel.budgetYear,
                budgetModel.startMonth - 1,
                budgetModel.noOfPeriods
            );

            model = vm.model = serviceGroupModel(gridConfig);

            var detailsGridConfig = ovDetailsGridConfig(vm,
                budgetModel.budgetYear,
                budgetModel.startMonth - 1,
                budgetModel.noOfPeriods
            );
            serviceGridOptionConfig
                .setData(model.getColumns())
                .loadPreference()
                .then(function(data) {
                    serviceGridOptionConfig.restorePreference(data.records);
                });
            occDetailsModel = vm.occDetailsModel = occupancyDetailsModel(detailsGridConfig);


            svc
                .getServiceGroupDetails({
                    distributedID: budgetModel.distributedID,
                    noOfPeriods: budgetModel.noOfPeriods
                })
                .then(vm.setServiceGroupDataDetails)
                .catch(vm.error);


            gridSettingAside = settings('gridSettings')
                .done(vm.applyGridSettings);
            vm.destWatch = $scope.$on("$destroy", vm.destroy);
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
                .toggleReferenceData(serviceGridOptionConfig.getActiveLevel())
                .updateColumnVisibility(serviceGridOptionConfig.getColumnOptions());
        };



        vm.getRowAvg = function(col, row, rows) {
            return model.getRowAvg(col, row, rows);
        };
        vm.getRowTotal = function(column, row, rows) {
            return bmCalculation.getRowTotal(column, row, rows);
        };
        vm.setServiceGroupDataDetails = function(response) {
            model
                .setData(response.records, budgetModel);
            // vm.applyGridSettings();
        };

        vm.destroy = function() {
            serviceGridOptionConfig.updatePreference();
            serviceGridOptionConfig.reset();
            model.destroy();
            vm.destWatch();

        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("ServiceGroupCtrl", [
            '$scope',
            'serviceGroupContentModel',
            'serviceGroupModel',
            'serviceGroupGridConfigModel',
            'budgetDetails',
            'serviceGroupService',
            'serviceGroupMock',
            'rpBdgtAsideModalService',
            "occupancyDetailsModel",
            'ovDetailsGridConfig',
            'bmGridCalculationModel',
            'serviceGridOptionConfigModel',
            ServiceGroupCtrl
        ]);
})(angular);