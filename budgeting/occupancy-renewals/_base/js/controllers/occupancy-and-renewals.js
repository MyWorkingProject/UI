(function() {
    "use strict";

    function OccupancyAndRenewalsCtrl($rootScope, $scope, $stateParams, $window,
        budgetDetails, oarBudgetDetails, oarScrollTabsConfig, appLangTranslate, rpWatchList, scrollingTabsMenu, breadcrumbs) {
        var vm = this,
            locationChanged = null,
            tabsMenu = scrollingTabsMenu(),
            unSubscribeTabChangeEvent;

        var defaultStates = {
            isReady: false
        };

        vm.state = angular.copy(defaultStates);

        vm.init = function() {
            // console.debug("INIT: OCCUPANCY & RENEWALS");
            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on("$destroy", vm.destroy));

            vm.initPage(budgetDetails.getModelDetails());
            oarBudgetDetails.handlePageModelDetails(true);
        };

        vm.setActiveTab = function() {

        };

        vm.initPage = function(bmDetails) {
            //set budget model details
            vm.pageTitle = bmDetails.pageTitle = vm.translate("oar_main_hd");
            vm.bmDetails = oarBudgetDetails;
            oarBudgetDetails.setBudgetModelDetails(bmDetails);
            vm.budgetModelDetails = oarBudgetDetails.getBudgetModelDetails();

            vm.initNavigation();
            breadcrumbs.updateLink('budgetmodel.overview', { distID: $stateParams.distID }, vm.budgetModelDetails.modelName);
            vm.state.isReady = true;
        };

        vm.initNavigation = function() {
            locationChanged = $rootScope.$on("$locationChangeStart", oarScrollTabsConfig.updateNavState);
            oarScrollTabsConfig.init($stateParams.distID, $window.location.hash);
            unSubscribeTabChangeEvent = tabsMenu
                .setData(oarScrollTabsConfig.getTabs())
                .subscribe("change", vm.setActiveTab);
            vm.scrollingTabs = tabsMenu;
            //vm.scrollingTabsConfig = oarScrollTabsConfig.getTabs();
        };

        vm.translate = function(key) {
            return appLangTranslate("occupancyAndRenewals").translate(key);
        };

        vm.destroy = function() {
            locationChanged();
            vm.watchList.destroy();
            unSubscribeTabChangeEvent();
            oarScrollTabsConfig.reset();
            oarBudgetDetails.reset();
            vm.budgetModelDetails = null;
            vm.scrollingTabsConfig = null;

            // console.debug("DESTROYED: OCCUPANCY & RENEWALS");
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("OccupancyAndRenewalsCtrl", [
            "$rootScope",
            "$scope",
            "$stateParams",
            "$window",
            "budgetDetails",
            "oarBudgetDetails",
            "oarScrollTabsConfig",
            "appLangTranslate",
            "rpWatchList",
            "rpScrollingTabsMenuModel",
            "rpBdgtBreadcrumbsModel",
            OccupancyAndRenewalsCtrl
        ]);
})();