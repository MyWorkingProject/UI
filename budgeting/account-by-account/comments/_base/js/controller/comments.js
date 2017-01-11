(function (angular) {
    'use strict';

    function CommentsCtrl(
        scrollingTabsMenu,
        commentModel,
        commentInfoModel,
        commentsContent,
        asideModalInstance) {
        var vm = this,
            model,
            unSubscribeTabChangeEvent = angular.noop,
            activeTab;

        vm.init = function () {
            vm.model = model = commentModel.init(commentInfoModel);
            vm.fieldLabels = commentsContent;
            var tabs = model.getTabs();
            vm.tabsMenu = scrollingTabsMenu();
            vm.activeTab = activeTab = tabs.first();
            unSubscribeTabChangeEvent = vm.tabsMenu
                .setData(tabs)
                .subscribe('change', vm.setActiveTab);

        };

        vm.setActiveTab = function (tab) {
                vm.activeTab = tab;
        };

        vm.getScrollingTabs = function () {
            return model.getTabs();
        };

        vm.close = function () {
            asideModalInstance.done(commentInfoModel);
        };

        vm.destroy = function () {
            unSubscribeTabChangeEvent();
        };

        vm.init();
    }

    angular
        .module('budgeting')
        .controller('CommentsCtrl', [
            'rpScrollingTabsMenuModel',
            'commentModel',
            'commentInfoModel',
            'commentsContentModel',
            'rpBdgtAsideModalInstance',
            CommentsCtrl
        ]);
})(angular);
