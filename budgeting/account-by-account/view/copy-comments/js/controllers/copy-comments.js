(function (angular) {
    'use strict';

    function CopyCommentsCtrl(
        $scope,
        rpWatchList,
        asideModalInstance,
        budgetDetails,
        contentModel,
        copyCommentsModel,
        formConfig,
        svc
        ) {
        var vm = this,
            copycommentsAside,
            initModelWatch,
            model;

        vm.init = function () {
            vm.fieldLabels = contentModel;
            model = vm.model = copyCommentsModel;

            vm.formConfig = formConfig;
            formConfig.setMethodsSrc(vm);

            formConfig
             .copyCommentsModelType
             .setOptions(model.form.models);

            vm.getModelNamesForSelect();

            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on('$destroy', vm.destroy));

        };

        vm.getCopyCommentsModelName = function () {
            vm.getModelNamesForSelect();
            
        };

        vm.saveCopyComments = function (form) {
            if (form.$invalid) {
                form.$setSubmitted();
            }
            else {
                vm.saveData();
                form.$setPristine();
            }
        };

        vm.getModelNamesForSelect = function () {
            model.form.cpyModelName = '';

            svc
            .getModelNames({
                distributedID: model.form.distributedID,
                propertyID: model.form.propertyID,
                budgetYear: model.form.budgetYear,
                budgetType: model.getBudgetType()
            },
                vm.assignSelectedModel);
        };

        vm.assignSelectedModel = function (response) {
            formConfig.copyCommentsModelName.flushOptions();
            formConfig
                .copyCommentsModelName
               .setOptions(model.assignModelNames(response));
        };

        vm.saveData = function () {
            svc
                .copyComments(model.form.distributedID, model.form.cpyModelName)
                .postData(vm.onSaveSuccess);
        };

        vm.onSaveSuccess = function () {
            model.showSuccessMsg();
            asideModalInstance.cancel();
        };

        vm.close = function () {
            asideModalInstance.cancel();
        };

        vm.destroy = function () {
            model = undefined;
        };

        vm.init();
    }

    angular
        .module('budgeting')
        .controller('CopyCommentsCtrl', [
            '$scope',
            'rpWatchList',
            'rpBdgtAsideModalInstance',
            'budgetDetails',
            'copyCommentsContentModel',
            'copyCommentsModel',
            'copyCommentsFormConfig',
            'copyCommentsSvc',
            CopyCommentsCtrl
        ]);
})(angular);
