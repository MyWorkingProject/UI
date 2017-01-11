//  Admin Nav Directive

(function (angular) {
    "use strict";

    function topNav() {
        function link(scope, elem, attr) {}

        return {
            link: link,
            restrict: 'E',
            scope: {
                topnavmodel: "="
            },
            replace: true,
            templateUrl: "templates/topnav.html"
        };
    }

    angular
        .module("budgeting")
        .directive('topNav', [topNav]);
})(angular);
