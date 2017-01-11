//  Budget Model Controller

(function (angular) {
    function BdgtModelCtrl(
        $scope,
        $window,
        $stateParams,
        nav,
        model,
        msgModel,
        budgetDetails,
        scrollingTabsMenu) {
        var vm = this, tabsMenu = scrollingTabsMenu(), unSubscribeTabChangeEvent;

        vm.init = function () {
            vm.model = model;
            model.setDistID($stateParams.distID);
            unSubscribeTabChangeEvent = tabsMenu
                .setData(nav.data());
                //.subscribe("change", vm.setActiveTab);
            vm.scrollingTabs = tabsMenu;
            vm.loadInfo();
        };

        vm.loadInfo = function () {
            model.setModelDetails(budgetDetails.getModelDetails());
            nav.setDistID($stateParams.distID);
            nav.setNavUrls();
            //vm.scrollingTabs = nav.data();
            nav.setState($window.location.hash);
            nav.getTabDataCount().then(nav.updateTabData, msgModel.onError);
            $scope.$on('$destroy', vm.destroy);
        };



        vm.destroy = function () {
            model.reset();
            nav.reset();
            msgModel.reset();
            //unSubscribeTabChangeEvent();
            //tabsMenu.destory();
            //vm = undefined;
            //vm.model = undefined;
            vm = undefined;
        };


        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtModelCtrl', [
            '$scope',
            '$window',
            '$stateParams',
			'BdgtModelNav',
            'BdgtModelDetails',
            'BdgtModelMsg',
           'budgetDetails',
            'rpScrollingTabsMenuModel',
            BdgtModelCtrl
        ]);
})(angular);
