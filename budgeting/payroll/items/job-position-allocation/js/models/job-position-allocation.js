(function(angular) {
    function factory(
        moment,
        payrollItem) {

        return function() {
            var model = payrollItem(),
                isEdit,
                payrollByInfo;

            model.setData = function(payrollByModel, totalPayRateCount) {
                payrollByInfo = payrollByModel.details;
                model.allocationPercent = payrollByInfo.allocationPercent;
                model.noOfEmployees = payrollByInfo.payrateCount;
                model.positionCount = payrollByInfo.positionCount;
                model.payType = payrollByInfo.payrateType;
                model.startDate = moment(new Date(payrollByInfo.startDate));
                model.endDate = moment(new Date(payrollByInfo.endDate));
                model.totalPayRateCount = totalPayRateCount - payrollByInfo.payrateCount;

                return model;
            };

            model.onChangeStartDate = function(date) {
                model.startDate = moment(new Date(date));
            };
            model.onChangeEndDate = function(date) {
                model.endDate = moment(new Date(date));
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
                // Ideal Code
                //return model.form.$valid;
                var isValid = true;
                // Bad code because of unsupport from core.
                if(!model.form.$valid){
                    for(var key in model.form.$error){
                        if(key!== "dateTime"){
                            isValid = false;
                            return;
                        }
                    }
                }
                return isValid;
            };            

            model.getPayRateTotal = function(){
                return parseFloat(model.totalPayRateCount) + parseFloat(model.noOfEmployees);
            };

            model.getPayrollByModelChanges = function (total) {
                var payload = {
                    allocationPercent: model.allocationPercent,
                    payrateCount: model.noOfEmployees,
                    payrateType: model.payType,
                    startDate: model.startDate.format("MM/DD/YYYY"),
                    endDate: model.endDate.format("MM/DD/YYYY")
                };
                if (!payrollByInfo.isLockCount) {
                    payload.positionCount = model.getPayRateTotal();
                }
                return payload;
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
        .factory('jobPositionAllocationModel', [
            'moment',
            'payrollItemModel',
            factory
        ]);
})(angular);
