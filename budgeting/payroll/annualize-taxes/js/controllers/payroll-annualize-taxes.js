(function (angular) {
    "use strict";

    function AnnualizeTaxesCtrl($stateParams,
        asideModalInstance,
        annualizeTaxModel,
        gridConfig,
        gridModel,
        svc,
        errorHandling) {
        var vm = this,
            model;
        vm.init = function () {
            gridConfig
                .setSrc(vm);
            model = vm.model = annualizeTaxModel(gridConfig);
            vm.getAnnualizeTaxes()
                .then(model.setGridData);
        };
        vm.getAnnualizeTaxes = function () {
            var params = {
                distributedID: $stateParams.distID
            };
            return svc.getAnnualizeTaxesData(params);
        };
        vm.saveAnualizeTax = function () {
            var selectedList = model.getSelectedList($stateParams.distID);
            svc.saveAnnualizeTaxes(selectedList)
                .$promise
                .then(vm.showAnnualTaxesSuccessInfo);
        };
        vm.showAnnualTaxesSuccessInfo = function () {
            errorHandling.showAnnualTaxSuccess();
            asideModalInstance.done();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("AnnualizeTaxesCtrl", [
            "$stateParams",
            "rpBdgtAsideModalInstance",
            "annualizeTaxGridModel",
            "annualizeTaxGridConfig",
            "annualizeTaxesGridFactory",
            "annualizeTaxesSvc",
            "annualizeTaxesErrorHandling",
             AnnualizeTaxesCtrl]);
})(angular);