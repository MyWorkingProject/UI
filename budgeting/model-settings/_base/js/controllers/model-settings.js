(function (angular) {
    "use strict";

    function ModelSettingsCtrl($scope, $stateParams, $window, nav, bdgtModelDetails, bdgtModelSvc, bdgtMsgModel,budgetDetails, scrollingTabsMenu) {
        var vm = this, tabsMenu = scrollingTabsMenu(), unSubscribeTabChangeEvent;

        vm.init = function () {
            vm.bdgtModel = bdgtModelDetails;
            unSubscribeTabChangeEvent = tabsMenu
                .setData(nav.data())
                .subscribe("change", vm.setActiveTab);
            vm.scrollingTabs = tabsMenu;
        /*    bdgtModelDetails.setDistID($stateParams.distID);
            bdgtModelDetails.getModelDetails().then(vm.setBreadCrumbs, bdgtMsgModel.onError); */

            //budgetDetails.events.update.subscribe(vm.setBreadCrumbs);
            //if(!budgetDetails.ready){
            //        budgetDetails.getPropertyInfo($stateParams.distID);
            //}
            //else{
            //      //model.assBugetDetails(budgetDetails.getModelDetails());
            //       vm.setBreadCrumbs(budgetDetails.getModelDetails());
            //}
            vm.setBreadCrumbs(budgetDetails.getModelDetails());
            vm.loadInfo();
        };

        vm.setActiveTab = function(){

        };

         vm.loadInfo=function(){
            nav.setDistID($stateParams.distID);
            nav.setNavUrls();
            //vm.scrollingTabs = nav.data();
            nav.setState($window.location.hash);
            $scope.$on('$destroy', vm.destroy);         
        };

        vm.destroy = function () {
            bdgtModelDetails.reset();
            vm.bdgtModel = undefined;
            nav.reset();
            unSubscribeTabChangeEvent();
            vm = undefined;
        };
        

        vm.setBreadCrumbs = function (resp) {
            bdgtModelDetails.setModelDetails(resp);   
           // nav.setModelDetails(resp);  
            bdgtModelDetails.setPageTitle(nav.getPageTitle(resp));
            bdgtModelDetails.hideUnits();
            bdgtModelDetails.showChartName();
           // bdgtModelDetails.setBreadCrumbs(nav.getPageTitle(resp));
            nav.removeLeaseOptions(resp);
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("ModelSettingsCtrl", [
            "$scope",
            "$stateParams",
            "$window",
            "ModelSettingsNav",
            "BdgtModelDetails",
            "BdgtModelSvc",
            "BdgtModelMsg",
            "budgetDetails",
            "rpScrollingTabsMenuModel",
            ModelSettingsCtrl
        ]);
})(angular);
