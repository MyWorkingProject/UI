(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [];

        appLangKeys.app("payrollEmpSelector").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
