// view service controller

(function (angular) {
    "use strict";

    function ServiceCtrl($scope, $stateParams, serviceModel, serviceContent, formConfig, asideModal) {
        var vm = this,
            glAccountFindAside;

        //$stateParams.servID = 0
        // $stateParams.isEdit 

        vm.init = function () {
            vm.fieldLabels = serviceContent;
            vm.formConfig = formConfig;
            vm.serviceId = $stateParams.servID;
            vm.isEdit = $stateParams.isEdit;
            if (!vm.isEdit) {
                vm.serviceDetails = serviceModel.serviceDetails;
            }
            glAccountFindAside = asideModal('glAccountFind');
               
            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };

        vm.findGlAccount = function (data) {
            var resolve = {
                selectedGlAccountData: serviceModel.getCurrentGLAccountForSearch
            };

            glAccountFindAside
                .resolve(resolve)
                .show();

        };

        vm.edit = function () {
            vm.isEdit = !vm.isEdit;
        };

        vm.cancel = function () {
            vm.isEdit = !vm.isEdit;
        };

        vm.save = function () {
            return;
        };

        vm.destroy = function () {
           
            glAccountFindAside.destroy();
            vm.destWatch();
        };

        vm.init();


    }

    angular
         .module('budgeting')
         .controller('ServiceCtrl', [
             '$scope',
             '$stateParams',
             'serviceModel',
             'serviceContentModel',
             'serviceConfig',
             'rpBdgtAsideModalService',
         ServiceCtrl]);

})(angular);