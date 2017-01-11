//  employee Model

(function (angular) {
    "use strict";

    function factory($filter, payrollByContent) {
        return function () {
            var model = {},
                payrollBys = [],
                positionCount;

            model.init = function () {
                model.isEmployee = true;
                model.isReadonly = false;
                model.isEdit = false;
                model.payrollByTitle = '';
                model.payrollBySubTitle = '';
                model.payrate = 0;
                model.departmentName = '';
                model.workerClassName = '';
                return model;
            };

            model.setPayRates = function (payrollBys) {
                model.payrollBys = payrollBys;
                return model;
            };
            
            model.setPayrollBy = function (flag, payrollByInfo) {
                model.isEmployee = flag;
                positionCount = payrollByInfo.positionCount;
                model.viewDetailTitle = flag ? payrollByContent.viewEmployeeDetails : payrollByContent.viewJobPositionDetails;
                model.payrollByTitle = flag ? payrollByInfo.employeeName : payrollByInfo.jobTitle;
                model.payrollBySubTitle = flag ? payrollByInfo.jobTitle + ' - ' + model.formatRate(payrollByInfo) : model.formatNoOfPostion();
                model.departmentName = payrollByInfo.departmentName;
                model.workerClassName = payrollByInfo.workerClassName;
                return model;
            };

            model.edit = function (flag) {
                model.isEdit = flag;
                return model;
            };

            model.getPayrollByTitle = function () {
                return model.payrollByTitle;
            };

            model.readonly = function (flag) {
                model.isReadonly = flag;
                return model;
            };

            model.getIsReadonly = function () {
                return model.isReadonly;
            };

            model.formatRate = function (payrollBy) {
                var rateText = payrollByContent.preSuffixCurrency + ' ' + Math.round(payrollBy.payrate) + ' ';
                rateText += angular.lowercase(payrollBy.payrateType) === "salary" ? payrollByContent.preSuffixYear : payrollByContent.preSuffixHourly;
                return rateText;
            };

            model.formatNoOfPostion = function() {
                return positionCount.toLocaleString() + ' ' + payrollByContent.employeeText;
            };

            model.formatNoPayRateCount = function (payrollBy) {
                return payrollBy.payrateCount.toLocaleString() + ' ' + payrollByContent.employeeText;
            };

            model.destroy = function() {
                model = undefined;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("payrollByModel", [
            '$filter',
            'payrollByContentModel',
            factory
        ]);
})(angular);
