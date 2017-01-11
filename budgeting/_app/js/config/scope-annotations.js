//  Scope Annotation Config

(function (angular) {
    "use strict";

    function config($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }

    angular
        .module("budgeting")
        .config(['$compileProvider', config]);
})(angular);
