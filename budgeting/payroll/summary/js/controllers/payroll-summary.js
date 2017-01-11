//Payroll summary controller
(function(angular) {
    "use strict";
    var fn = angular.noop;

    function PayrollSummaryCtrl(
        $scope,
        $state,
        $stateParams,
        asideModal,
        payrollBaseModel,
        model,
        payrollGridConfig,
        actions,
        summaryContent
        ) {
        var vm = this,
            payrollReportView,
            annualizeTaxAside,
            employeeDetailAside,
            record = {},
            jobPositionDetailAside,
            unSubscribeEvent = angular.noop,
            gridConfig = payrollGridConfig;

        vm.init = function() {
            unSubscribeEvent();
            vm.fieldLabels = summaryContent;
            payrollGridConfig.setSrc(vm);
            vm.model = model.initConfig(payrollGridConfig);

            vm.loadGridData();
            payrollReportView = asideModal('payrollReportView');
            annualizeTaxAside = asideModal('annualizeTaxes')
                .done(vm.loadGridData);
            jobPositionDetailAside = asideModal('jobPositionDetail')
                .done(vm.loadGridData);
            employeeDetailAside = asideModal('employeeDetail')
                .done(vm.loadGridData);
            actions.setSrc(vm);
            $scope.$on('$destroy', vm.destroy);
        };

        vm.navigateToPayrollBy = function(row, stateFlag) {
            var params = {
                payrollID: row.payrollID,
                payrollBy: angular.lowercase(row.payrollBy),
                payrollByID: angular.lowercase(row.payrollBy) === 'employee' ? row.employeePropertyID : row.jobPositionID,
                isEdit: stateFlag
            };
            $state.go('payroll.payrollBy', params);
        };

        vm.viewPayrollBy = function(row) {
            vm.navigateToPayrollBy(row, false);
        };

        vm.editPayrollBy = function(row) {
            vm.navigateToPayrollBy(row, true);
        };

        vm.viewDetails = function(row) {
            var resolveData;
            if (angular.lowercase(row.payrollBy) === 'employee') {
                resolveData = {
                    empDetailParam: function() {
                        return {
                            payrollID: row.payrollID,
                            employeeID: row.employeeID,
                            employeePropertyID: row.employeePropertyID,
                            newEmployee: false,
                            record: row
                        };
                    }
                };
                employeeDetailAside
                    .resolve(resolveData)
                    .show();
            } else {
                resolveData = {
                    jobPosition: function() {
                        return {
                            state: "edit",
                            id: row.jobPositionID
                        };
                    }
                };
                jobPositionDetailAside
                    .resolve(resolveData)
                    .show();
            }
        };

        vm.newJobPosition = function() {
            var resolveData = {
                jobPosition: function() {
                    return {
                        state: "new",
                        id: 0
                    };
                }
            };
            jobPositionDetailAside
                .resolve(resolveData)
                .show();
        };

        vm.newEmployee = function() {
            var resolve = {
                empDetailParam: function() {
                    return {
                        payrollID: 0,
                        employeeID: 0,
                        employeePropertyID: 0,
                        newEmployee: true,
                        record: undefined
                    };
                }
            };
            employeeDetailAside
                .resolve(resolve)
                .show();
        };        

        vm.showReports = function() {
            payrollReportView
                .show();
        };

        vm.showAnnualizeTaxes = function() {
            annualizeTaxAside
                .show();
        };

        vm.loadGridData = function() {
            model.load();
        };

        vm.destroy = function() {
            annualizeTaxAside.destroy();
            payrollReportView.destroy();
            employeeDetailAside.destroy();
            jobPositionDetailAside.destroy();
            vm.model = undefined;
        };

        if (payrollBaseModel.ready) {
            vm.init();
        } else {
            unSubscribeEvent = payrollBaseModel.events.onPayrollItemUpdate.subscribe(vm.init);
        }
    }

    angular
        .module('budgeting')
        .controller('PayrollSummaryCtrl', [
            '$scope',
            '$state',
            '$stateParams',
            'rpBdgtAsideModalService',
            'payrollBaseModel',
            'payrollModel',
            'payrollGridConfig',
            'budgetPayrollSummaryActionsDef',
            'payrollSummaryContent',
            PayrollSummaryCtrl
        ]);
})(angular);
