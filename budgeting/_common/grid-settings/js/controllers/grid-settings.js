(function (angular) {
    "use strict";

    function GridSettingsCtrl(
        $scope,
        langTranslate,
        gridSettings,
        asideModelInstace) {
        var vm = this,
            model;

        vm.init = function () {
            vm.model = model = gridSettings.getData();
            var translate = langTranslate('grid-settings').translate;
            vm.cancelBtnText = translate("lbl_cancel_btn_text");
            vm.applyBtnText = translate("lbl_apply_btn_text");
            vm.headerTitle = translate("lbl_page_title");
            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };

        vm.onChange = function (option, item) {
            if (angular.isFunction(gridSettings.changed)) {
                gridSettings.changed(option, item, model);
            }
        };

        vm.close = function () {
            asideModelInstace.cancel();
        };

        vm.assign = function () {
            asideModelInstace.done(model);
        };

        vm.destroy = function () {
            vm.destWatch();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("GridSettingsCtrl", [
            "$scope",
            "appLangTranslate",
            "rpBdgtGridSettings",
            "rpBdgtAsideModalInstance",
            GridSettingsCtrl
        ]);
})(angular);
