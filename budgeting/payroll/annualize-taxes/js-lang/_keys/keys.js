(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [];

        appLangKeys.app("payroll.annualize-taxes").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
