//  Model Details Directive

(function (angular) {
    "use strict";

    function modelDetails() {
        function link(scope, elem, attr) {

            var dir = {};

            dir.init = function () {
                dir.destWatch = scope.$on('$destroy', dir.destroy);
            };

            dir.destroy = function () {
                dir.destWatch();
            };

            dir.init();
        }
        return {
            scope: {},
            restrict: 'E',
            replace: true,
            templateUrl: "app/templates/model-basic-info.html",
            controller: 'ModelDetailsInfoCtrl',
            controllerAs: 'page',
            bindToController: true,
            link: link
        };
    }

    angular
        .module("budgeting")
        .directive('modelBasicInfo', [
            modelDetails
        ]);
})(angular);
