
(function () {
    "use strict";

    function translatorFactory(appLangTranslate) {
        var i18n = {},
            convert = appLangTranslate("occupanyRenewalsSummary").translate;

        i18n.translate = function (key) {
            return convert(key);
        };

        return i18n;
    }

    angular
       .module("budgeting")
       .factory("oarSummaryTranslatorSvc", [
            "appLangTranslate",
            translatorFactory
       ]);
})();