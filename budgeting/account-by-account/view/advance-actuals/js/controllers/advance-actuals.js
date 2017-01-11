(function (angular) {
    'use strict';
    function AdvanceActualsCtrl(
        $scope,
        asideModalInstance,
        modal,
        rpWatchList,
        contentModel,
        advanceActualsModel,
        formConfig,
        svc,
        notificationModel
        ) {

        var vm = this,
            model,
            advanceActualsAside,
            confirmModal;

        vm.init = function () {
            vm.fieldLabels = contentModel;
            model = vm.model = advanceActualsModel;

            vm.formConfig = formConfig;
            formConfig.advanceActuals.setOptions(model.getAdvanceActuals());
            formConfig.setMethodsSrc(vm);

            confirmModal = modal
                .confirm({ templateUrl: 'app/common/templates/advance-actuals-confirm.html' })
                .setContent({
                    title: contentModel.lblModalTitle,
                    message: contentModel.lblModalData,
                    confirmMessage: contentModel.lblConfirmText,
                    btnAcceptText: contentModel.lblUpdate,
                    btnRejectText: contentModel.lblCancel
                })
                .accept(vm.saveAdvanceActuals)
                .reject(vm.cancelAdvanceActuals);

            model.setAdvanceActuals();

            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on('$destroy', vm.destroy));
        };

        vm.saveAdvanceActuals = function () {
            vm.saveAdvanceActualsData(model.getFormDetails()).then(vm.onSaveSuccess);
        };

        vm.saveAdvanceActualsData = function (data) {
            return svc.saveAdvanceActuals(data).$promise;
        };

        vm.onSaveSuccess = function (data) {
            var msg = contentModel.lblSuccessMsg + ' ' + model.form.adActuals;
            notificationModel.success(msg);
            asideModalInstance.cancel();
        };

        vm.doAdvanceActuals = function (form) {
            if (form.$invalid) {
                form.$setSubmitted();
            }
            else {
                confirmModal
                .show();
            }
   
        };
        vm.cancel = function () {
            asideModalInstance.cancel();
        };

        vm.destroy = function () {
            model = undefined;
        };

        vm.close = function () {
            asideModalInstance.cancel();
        };

        vm.init();

    }

    angular
        .module('budgeting')
        .controller('AdvanceActualsCtrl', [
            '$scope',
            'rpBdgtAsideModalInstance',
            'rpBdgtModalService',
            'rpWatchList',
            'advanceActualsContentModel',
            'advanceActualsModel',
            'advanceActualsFormConfig',
            'advanceActualsSvc',
            'notificationService',
            AdvanceActualsCtrl
        ]);
})(angular);
