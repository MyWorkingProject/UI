(function() {
    "use strict";

    function config(appLangKeys) {
        var keys = ['header_title'];

        appLangKeys.app("service.details").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();