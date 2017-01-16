(function() {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us")
            .app("service.details");

        bundle.set({
            'header_title': 'Loss/Gain to Lease Details'
        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();