

(function (angular) {
    "use strict";

    function occupancyTableSettings(langTranslate) {
        var model = {},translate;
        translate = langTranslate('occupancy-table-settings').translate;
      

        model.getLangValue = function (key) {
            return translate(key);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('occupancyTableSettings', [ 
                                            'appLangTranslate',                                           
                                            occupancyTableSettings]);
})(angular);
