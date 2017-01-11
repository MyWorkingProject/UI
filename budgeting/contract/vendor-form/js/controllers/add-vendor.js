//  Sample Input Text Controller

(function (angular) {
    "use strict";

    function AddVendorCtrl(formModel, formConfig, formData) {
        var vm = this,
        form = formModel();
        vm.init = function () {
            vm.formData = formData;
            vm.formConfig = formConfig;
            formConfig.setMethodsSrc(vm);
            formData.getStates(); 
            formData.assignStatus();   
        };
        vm.submit = function (form) {
            if (form.$invalid) {
                form.$setSubmitted();
            }
            else {
                formData.saveData(formData.getFormDetails());
                form.$setPristine();
            }
        };
        vm.init();
    }
    angular
        .module("budgeting")
        .controller("AddVendorCtrl", [
            "baseForm",
            "vendorFormConfig",
            "vendorFormData",
             AddVendorCtrl
        ]);
})(angular);
