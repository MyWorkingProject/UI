(function (angular) {
    "use strict";

    function AccountByAccountBaseCtrl(
        $scope,
        model,
        $stateParams,
        budgetDetails,
        breadcrumbs) {
        var vm = this;

        vm.init = function () {
            vm.model = model;
            model.assBugetDetails(budgetDetails.getModelDetails());
          /*  budgetDetails.events.update.subscribe(model.assBugetDetails);
            model.setBudgetDetails($stateParams.distID);
           
            model.form.modelDetails.pageTitle="Account By Account";  
            model.form.modelDetails.subTitle="Has reference data";
            logc(model.form.modelDetails);   */
            breadcrumbs.updateLink('budgetmodel.overview', { distID: $stateParams.distID }, budgetDetails.getModelDetails().modelName);
        };

        vm.assignBudgetDetails=function(data){
            model.assBugetDetails(data);  
            //model.form.modelDetails.pageTitle="Account By Account";  
            //model.form.modelDetails.subTitle="Has reference data";
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("AccountByAccountBaseCtrl", [
            "$scope",
            "accountByAccountBase",  
             "$stateParams",
             "budgetDetails",
            'rpBdgtBreadcrumbsModel',
            AccountByAccountBaseCtrl
        ]);
})(angular);
