(function (angular) {
    "use strict";

    function PayrollEmpSelectorCtrl($stateParams,
        asideModalInstance,
        employeeSelectorModel,
        gridConfig,
        svc) {
        var vm = this,
            model;

        vm.init = function () {
            gridConfig.setSrc(vm);
            model = vm.model = employeeSelectorModel(gridConfig);
            vm.getEmployeeList()
                .then(model.setGridData);
        };
        vm.getEmployeeList = function () {
            var params = {
                distributedID: $stateParams.distID
            };
            return svc.getPayrollEmployeeList(params);
        };
        vm.changeEmployee = function (row) {
            var params = {
                payrollBy: row.payrollBy.toLowerCase(),
                payrollByID: row.payrollBy.toLowerCase() === "employee" ? row.employeePropertyID : row.jobPositionID,
                payrollID: row.payrollID
            };
            asideModalInstance.done(params);
        };

        vm.close = asideModalInstance.cancel;

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("PayrollEmpSelectorCtrl", [
                    "$stateParams",
                    "rpBdgtAsideModalInstance",
                    "employeeSelectorModel",
                    "employeeSelectorGridConfig",
                    "employeeSelectorSvc",
                     PayrollEmpSelectorCtrl]);
})(angular);
