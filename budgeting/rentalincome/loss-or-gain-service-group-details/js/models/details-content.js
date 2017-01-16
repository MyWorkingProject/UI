(function(angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('service.details').translate,
            model = {
                headerTitle: translate('header_title'),
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("detailsContentModel", [
            'appLangTranslate',
            factory
        ]);
})(angular);