(function(angular) {
    "use strict";
    angular
        .module("budgeting")
        .controller("summaryCtrl", [
            '$scope',
            'summaryContentModel', 'summaryModel', 'summaryGridConfigModel', 'bmGridCalculationModel', 'budgetDetails', 'serviceGroupSVC', 'serviceGroupMock',
            function(
                $scope,
                summaryContentModel, summaryModel, summaryGridConfigModel, bmCalculation, budgetDetails, serviceGroupSVC, mock) {
                var vm = this,
                    model, budgetModel;
                vm.init = function() {
                    vm.fieldLabels = summaryContentModel;
                    budgetModel = budgetDetails.getModelDetails();
                    var gridConfig = summaryGridConfigModel(vm,
                        budgetModel.budgetYear,
                        budgetModel.startMonth - 1,
                        budgetModel.noOfPeriods
                    );
                    model = vm.model = summaryModel(gridConfig);
                    //serviceGroupSVC.getServiceGroupSummary().then(vm.setServiceData);
                    vm.setServiceData(mock.serviceGroups());
                    vm.destWatch = $scope.$on("$destroy", vm.destroy);
                };
                vm.setServiceData = function(data) {
                    model.setData(data);
                };
                vm.getRowAvg = function(col, row, rows) {
                    return model.getRowAvg(col, row, rows);
                };
                vm.getRowTotal = function(column, row, rows) {
                    return bmCalculation.getRowTotal(column, row, rows);
                };
                vm.destroy = function() {
                    vm.destWatch();
                };

                vm.init();
            }
        ]);


})(angular);