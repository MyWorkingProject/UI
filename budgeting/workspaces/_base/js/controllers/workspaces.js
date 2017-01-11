//  Workspaces Controller

(function (angular) {
    "use strict";

    // Determines if page content is a wizard by checking window.location.hash.
    function isPageContentWizard(urlHash) {
        if (urlHash === null || urlHash.length === 0) {
            return false;
        }
        if (urlHash.indexOf("/wiz") != -1) {
            return true;
        }
        return false;
    }

    function WorkspaceDetailsCtrl($scope, $window, nav, scrollingTabsMenu) {
        var vm = this, tabsMenu = scrollingTabsMenu(), unSubscribeTabChangeEvent = angular.noop;

        vm.setWizard = function (isWizard) {
            if (isWizard !== undefined && isWizard !== null) {
                vm.isWizard = isWizard;
            } else {
                vm.isWizard = isPageContentWizard($window.location.hash);
            }
        };

        vm.init = function () {
            var watchKeys = [
                'page.dateRange.startDate',
                'page.dateRange.endDate'
            ],
            currUrl = $window.location.hash;
            unSubscribeTabChangeEvent = tabsMenu
                .setData(nav.data())
                .subscribe("change", vm.setActiveTab);
            vm.scrollingTabs = tabsMenu;

            //vm.dateRange = dateRange.data();
            //vm.dateRangeState = dateRange.state;
            //vm.dateRangeOptions = dateRange.options;

            nav.setState(currUrl);

            //$scope.$watchGroup(watchKeys, dateRange.publish);

            // Hide scrolling tabs if page content is a wizard.
            vm.setWizard();
            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };
        
        vm.setActiveTab = function(){

        };

        vm.destroy = function(){
            unSubscribeTabChangeEvent();
            //tabsMenu.destory();
            vm = undefined;
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('WorkspaceDetailsCtrl', [
            '$scope',
            '$window',
             'workspaceDetailsNav',
             'rpScrollingTabsMenuModel',
            WorkspaceDetailsCtrl
        ]);
})(angular);
