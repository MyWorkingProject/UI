(function(angular) {
    function factory(
        moment,
        payrollItem) {

        return function() {
            var model = payrollItem(),
                isEdit,
                payrollByInfo;

            model.setData = function(payrollByModel) {
                payrollByInfo = payrollByModel.details;
                model.allocationPercent = payrollByInfo.allocationPercent;
                model.payType = payrollByInfo.payrateType;
                model.startDate = moment(new Date(payrollByInfo.startDate));
                model.endDate = payrollByInfo.endDate !== "" ? moment(new Date(payrollByInfo.endDate)) : '-';

                return model;
            };

            model.edit = function(flag) {
                model.isEdit = flag;
                return model;
            };

            model.resetForm = function() {
                if (model.isEdit) {
                    model.form.$setSubmitted();
                } else {
                    model.form.$setPristine();
                }
            };

            model.validate = function() {
                return model.form.$valid;
                };

            model.getPayrollByModelChanges = function() {
                return {
                    allocationPercent: model.allocationPercent,
                    payrateType: model.payType
                };
            };

            model.save = function() {
                return {
                    payroll: angular.extend(payrollByInfo, model.getPayrollByModelChanges())
                };
            };

            model.destroy = function() {
                model = undefined;
            };

            return model;
        };
    }

    angular
        .module('budgeting')
        .factory('employeeAllocationModel', [
            'moment',
            'payrollItemModel',
            factory
        ]);
})(angular);
