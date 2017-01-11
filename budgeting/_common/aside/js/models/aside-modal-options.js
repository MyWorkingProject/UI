(function () {
    'use strict';

    function factory() {
        var optionConfig = {};


        optionConfig.advanceActuals = {
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            controller: 'AdvanceActualsCtrl',
            controllerAs: 'page',
            templateUrl: 'account-by-account/view/advance-actuals/index.html'
        };

        optionConfig.copyComments = {
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            controller: 'CopyCommentsCtrl',
            controllerAs: 'page',
            templateUrl: 'account-by-account/view/copy-comments/index.html'
        };

        optionConfig.assignGLAccounts = {
            resolve: {
                assignGLParams: angular.noop
            },
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            controller: 'AssignGLAcctsCtrl',
            controllerAs: 'page',
            templateUrl: 'app/templates/assign-gl-accts.html'
        };
        optionConfig.budgetComments = {
            resolve: {
                comments: angular.noop
            },
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            backdrop: true,
            controller: 'BudgetCommentsCtrl',
            controllerAs: 'page',
            templateUrl: 'budget-comments/templates/index.html'
        };
        optionConfig.defaultAdjustment = {
            resolve: {
                selectedDefaultAdjModel: angular.noop
            },
            animation: 'am-fade-and-slide-bottom',
            placement: 'bottom',
            controller: 'DefaultAdjCtrl',
            controllerAs: 'page',
            templateUrl: 'app/templates/default-adjustment.html'
        };
        optionConfig.jobPositionDetail = {
            resolve: {
                jobPosition: angular.noop
            },
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            controller: 'JobPositionDetailsCtrl',
            controllerAs: 'page',
            templateUrl: 'payroll/job-position/index.html'
        };
        optionConfig.payrollEmpSelector = {
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            backdrop: true,
            controller: 'PayrollEmpSelectorCtrl',
            controllerAs: 'page',
            templateUrl: 'payroll/payroll-selector/index.html'
        };
        optionConfig.annualizeTaxes = {
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            backdrop: true,
            controller: 'AnnualizeTaxesCtrl',
            controllerAs: 'page',
            templateUrl: 'payroll/annualize-taxes/index.html'
        };
        optionConfig.distributedAllocation = {
            resolve: {
                distributedSettingModel: angular.noop
            },
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            backdrop: true,
            controller: 'DistributedAllocationCtrl',
            controllerAs: 'page',
            templateUrl: 'allocations/distributed-allocations/index.html'
        };
        optionConfig.recallDestAllocation = {
            resolve: {
                recallDistSettingModel: angular.noop
            },
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            backdrop: true,
            controller: 'RecallDistAllocationCtrl',
            controllerAs: 'page',
            templateUrl: 'allocations/recall-dist-allocations/index.html'
        };
        optionConfig.glComment = {
            resolve: {
                commentInfoModel: angular.noop
            },
            backdrop: true,
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            controller: 'CommentsCtrl',
            controllerAs: 'page',
            templateUrl: 'account-by-account/comments/index.html'
        };
        optionConfig.glAccountHistory = {
            resolve: {
                glHistoryParamData: angular.noop
            },
            placement: 'right',
            controller: 'GLAcctHistoryCtrl',
            controllerAs: 'page',
            templateUrl: 'app/templates/gl-acct-history.html'
        };
        optionConfig.glAccountFind = {
            resolve: {
                selectedGlAccountData: angular.noop
            },
            backdrop: true,
            animation: 'am-fade-and-slide-right am-fade',
            placement: 'right',
            controller: 'FindGlAccountCtrl',
            controllerAs: 'page',
            templateUrl: 'app/templates/gl-account-find.html'
        };
        optionConfig.calculator = {
            resolve: {
                calculatorParamData: angular.noop
            },
            animation: 'am-fade-and-slide-bottom',
            placement: 'bottom',
            controller: 'CalculatorCtrl',
            controllerAs: 'page',
            templateUrl: 'app/templates/calculator.html'
        };
        optionConfig.actualRentCap = {
            resolve: {
                actualRentParamModel: angular.noop
            },
            backdrop: false,
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            controller: 'ActualRentCapCtrl',
            controllerAs: 'page',
            templateUrl: 'rentalincome/actual-rent-cap/index.html'
        };

        optionConfig.payrollReportView = {
            resolve: {
                payrollReportViewModel: angular.noop
            },
            backdrop: true,
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            controller: 'PayrollReportViewBaseCtrl',
            controllerAs: 'page',
            templateUrl: 'payroll/reports/index.html',

        };

        optionConfig.accountByAccountTableSettings = {
            resolve: {
                tableSettingsModel: angular.noop
            },
            backdrop: true,
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            controller: 'AccountByAccountTableSettingsCtrl',
            controllerAs: 'page',
            templateUrl: 'account-by-account/view-table-settings/index.html',

        };
        optionConfig.addPropertiesOptions = {
            resolve: {
                selectedGlAccountData: angular.noop
            },
            backdrop: true,
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            controller: 'AddPropertiesCtrl',
            controllerAs: 'page',
            templateUrl: 'app/templates/add-properties-aside.html'
        };
        optionConfig.selectUnitTypeOptions = {
            resolve: {
                selectedGlAccountData: angular.noop
            },
            backdrop: true,
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            controller: 'SelectUnitTypeCtrl',
            controllerAs: 'page',
            templateUrl: 'app/templates/select-unit-type-aside.html'
        };

        optionConfig.employeeDetail = {
            resolve: {
                selectedGlAccountData: angular.noop
            },
            backdrop: true,
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            controller: 'PayrollEmployeeDetailsCtrl',
            controllerAs: 'page',
            templateUrl: 'payroll/employee-details/index.html'
        };

        optionConfig.changeRent = {
            resolve: {
                changeRentParamData: angular.noop
            },
            animation: 'am-fade-and-slide-bottom',
            placement: 'bottom',
            controller: 'ChangeRentCtrl',
            controllerAs: 'page',
            templateUrl: 'rentalincome/change-rent/index.html'
        };

        optionConfig.occupancySettings = {
            resolve: {
                occupancySettingsInfo: angular.noop
            },
            backdrop: true,
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            controller: 'OccupancyTableSettingsCtrl',
            controllerAs: 'page',
            templateUrl: 'occupancy-renewals/occupancy-table-settings/index.html'
        };

        optionConfig.gridSettings = {
            resolve: {
                rpBdgtGridSettings: angular.noop
            },
            backdrop: true,
            animation: 'am-fade-and-slide-right',
            placement: 'right',
            controller: 'GridSettingsCtrl',
            controllerAs: 'page',
            templateUrl: 'common/grid-settings/index.html'
        };        

        return function (name) {
            if (!angular.isDefined(name) || !optionConfig.hasOwnProperty(name)) {
                logc('Aside Option: ' + name + ' not found');
                return {};
            }
            return angular.copy(optionConfig[name]);
        };
    }

    angular
        .module("budgeting")
        .factory("rpBdgtAsideOptions", [
            factory
        ]);
})();
