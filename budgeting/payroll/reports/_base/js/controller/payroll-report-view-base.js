//  Payroll Report Controller

(function(angular) {
    function PayrollReportViewBaseCtrl(
        $scope,
        scrollingTabsMenu,
        langTranslate,
        asideModalInstance) {
        var vm = this,
            unSubscribeTabChangeEvent,
            translate = langTranslate('payroll.reports').translate,
            tabs = [{
                id: 0,
                isActive: true,
                text: translate('bdgt_payroll_payrollItemView'),
                tabViewUrl: 'payroll/reports/payroll-item-view/index.html'
            }, {
                id: 1,
                isActive: false,
                text: translate('bdgt_payroll_payrollglAccountView'),
                tabViewUrl: 'payroll/reports/payroll-gl-view/index.html'
            }];

        vm.init = function() {
            vm.activeTab = tabs.first();
            vm.pageTitle = translate('bdgt_payroll_pageTitle');
            vm.scrollingTabs = scrollingTabsMenu().setData(tabs);
            unSubscribeTabChangeEvent = vm.scrollingTabs.subscribe("change", vm.setActiveTab);
            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };

        vm.setActiveTab = function(tab) {
            vm.activeTab = tab;
        };

        vm.destroy = function() {
            unSubscribeTabChangeEvent();
            vm.scrollingTabs.destroy();
            vm.destWatch();
            vm = undefined;
        };

        vm.close = asideModalInstance.cancel;
        vm.init();
    }

    angular
        .module("budgeting")
        .controller('PayrollReportViewBaseCtrl', [
            '$scope',
            'rpScrollingTabsMenuModel',
            'appLangTranslate',
            'rpBdgtAsideModalInstance',
            PayrollReportViewBaseCtrl
        ]);
})(angular);
