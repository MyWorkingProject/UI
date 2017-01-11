

(function (angular) {
    function BdgtRentalIncomeCtrl($scope, $window, $stateParams, nav, scrollingTabsMenu, mrModel, calcModel, confirmModal, breadcrumbs, budgetDetails, $state) {
        var vm = this, tabsMenu = scrollingTabsMenu(), unSubscribeTabChangeEvent, changeModal;

        vm.init = function () {
            nav.init();
            var budgetModel = budgetDetails.getModelDetails();
            unSubscribeTabChangeEvent = tabsMenu
                .setData(nav.data())
                .subscribe("change", vm.setActiveTab);
            vm.scrollingTabs = tabsMenu;
            nav.setDistID($stateParams.distID);
            nav.setNavUrls();
            breadcrumbs.updateLink('budgetmodel.overview', { distID: $stateParams.distID },  budgetModel.modelName);
            changeModal = confirmModal.confirm().accept(vm.onChangesOK).reject(vm.onChangesCancel);  
            //vm.scrollingTabs = nav.data();
            nav.setState($window.location.hash);
            vm.budgetDetails = nav;
            vm.destWatch = $scope.$on("$destroy", vm.destroy);
            //$scope.$watchGroup(watchKeys, dateRange.publish);
        };

        vm.isReady = function(){
            return nav.isModelReady();
        };

        vm.destroy = function () {
            nav.reset();
            unSubscribeTabChangeEvent();
            //tabsMenu.destory();
            vm.destWatch();
            vm = undefined;
        };

        vm.setActiveTab = function(tab){
           /* vm.tab = tab;
            logc(tabsMenu);
            tab.isActive = false;
            if(calcModel.isDataModified()){
                changeModal.setContent({
                      title: nav.getKeyValue('bdgt_rental_mr_changes_header'),
                      message: nav.getKeyValue('bdgt_rental_mr_changes_desc') + mrModel.getWorksheetText(),
                      btnAcceptText: nav.getKeyValue('bdgt_rental_mr_changes_ok'),
                      btnRejectText: nav.getKeyValue('bdgt_rental_mr_refresh_cancel')
                  }).show();
            } */
        };

        vm.onChangesOK = function(tab){
            vm.tab.isActive = true;
        };

        vm.onChangesCancel = function(tab){
           
        };
        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtRentalIncomeCtrl', [
            '$scope',
            '$window',
            '$stateParams',
            'BdgtRentalIncomeModelNav',
            'rpScrollingTabsMenuModel',
            'MarketRentModel',
            'MarketRentCalculationModel',
            'rpBdgtModalService',
            'rpBdgtBreadcrumbsModel',
            'budgetDetails',
            '$state',
            BdgtRentalIncomeCtrl
        ]);
})(angular);

