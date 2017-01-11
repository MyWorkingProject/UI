//  Payroll Hourly Pay Item Controller

(function(angular) {
    "use strict";

    function LrSummaryCtrl(
        $scope,
        serviceGroupContent,
        serviceGroupModel,
        serviceGroupGridConfig,
        budgetDetails,
        svc,
        mockData,
        settings,
        tsModel,
        occupancyDetailsModel,
        ovDetailsGridConfig,
        leaseGridOptionConfigModel
    ) {
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
            occDetailsModel = vm.occDetailsModel = occupancyDetailsModel(detailsGridConfig);
            gridSettingAside = settings('gridSettings')
                .done(vm.applyGridSettings);
            //svc
            //    .getServiceGroupDetails({
            //        distID: budgetModel.distributedID,
            //        noOfPeriods: budgetModel.noOfPeriods
            //    })
            //    .then(vm.setServiceGroupDataDetails)
            //    .catch(vm.error);

            vm.setServiceGroupDataDetails(mockData.getServiceGroupDetails());

            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };
        vm.showTableSettings = function() {
            var resolve = {
                rpBdgtGridSettings: function() {
                    return serviceGroupGridConfig;
                }
            };
            gridSettingAside
                .resolve(resolve)
                .show();
        };






        vm.setServiceGroupDataDetails = function(response) {
            model
                .setData(response.records);
        };

        vm.destroy = function() {
            model.destroy();
            vm.destWatch();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("LrSummaryCtrl", [
            '$scope',
            'lrSummaryContentModel',
            'lrSummaryModel',
            'lrSummaryGridConfigModel',
            'budgetDetails',
            'lrSummaryService',
            'lrSummaryMock',
            'rpBdgtAsideModalService',
            'tableSettingsModel',
            "lrDetailsModel",
            "lrDetailsGridConfig",
            'leaseGridOptionConfigModel',
            LrSummaryCtrl
        ]);
})(angular);