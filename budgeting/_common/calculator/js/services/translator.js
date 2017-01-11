//  Responsible for mapping the i18n keys to actual readable texts

(function () {
    "use strict";

    function translatorFactory(appLangTranslate) {
        var i18n = {},
            convert = appLangTranslate("calculator").translate;

        i18n.translate = function (key) {
            return convert(key);
        };

        return i18n;
    }

    angular
       .module("budgeting")
       .factory("calcuTranslatorSvc", [
            "appLangTranslate",
            translatorFactory
       ]);
})();