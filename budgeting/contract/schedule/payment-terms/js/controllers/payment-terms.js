// Payment Terms (Contract Activity) Controller

(function (angular) {
    "use strict";
    function PaymentTermsCtrl($scope, ptGridModel, contractModel, scheduleForm,
                notifSvc, i18n, rpWatchList, dateUtils) {
        var vm = this;

        vm.init = function () {
            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on("$destroy", vm.destroy));

            vm.gridModel = ptGridModel.model;
            ptGridModel.setSrc(vm);

            vm.state = contractModel.state.page;

            //Note: initial content is instantiated by ContractDefineCtrl along with contract model
        };

        vm.destroy = function () {
            vm.clearActivePayment();
            ptGridModel.clear();
            vm.watchList.destroy();
        };

        vm.editPaymentTerm = function (pt) {
            scheduleForm.setFormToEdit(pt);
            contractModel.toggleAddSchedule(true);
        };

        //Displays a popup to confirm to payment term deletion. Used by paymentTermsActionsModel
        vm.confirmDeletePaymentTerm = function (pt) {
            vm.activePaymentTerm = pt;
            notifSvc.confirmDialog("bdgt_new_contract_dlg_del_pt_title", "bdgt_new_contract_dlg_del_pt_ask", vm.deletePaymentTerm);
        };

        //Performs actual deletion of payment term
        vm.deletePaymentTerm = function () {
            var deletePTData = vm.activePaymentTerm;
            deletePTData.lastModifiedDateTime = dateUtils.today().format(dateUtils.dateFormat.timestamp);

            contractModel.deleteSchedule(deletePTData.contractActivityID);
            ptGridModel.deletePaymentTerm(deletePTData);            
            $scope.$apply(); //needs to be triggered for the contents to update

            vm.clearActivePayment();
        };

        //Remove active payment term
        vm.clearActivePayment = function() {
            vm.activePaymentTerm = null;
        };


        vm.init();
    }

    angular
        .module("budgeting")
        .controller("PaymentTermsCtrl", [
            "$scope",
            "paymentTermsGridModel",
            "contractModel",
            "scheduleForm",
            "contractNotifSvc",
            "contractTranslatorSvc",
            "rpWatchList",
            "dateUtility",
            PaymentTermsCtrl
        ]);

})(angular);
