(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_editMasterchart_glAccountText',
            'bdgt_editMasterchart_categoryText',
            'bdgt_editMasterchart_cloneChartText'
        ];

        appLangKeys.app('editMasterchart').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
