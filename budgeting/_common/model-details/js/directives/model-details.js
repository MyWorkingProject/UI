//  Model Details Directive

(function (angular) {
    "use strict";

    function modelDetails() {

        return {
            scope: {
                info: '='
            },
            restrict: 'E',
            replace: false,
            templateUrl: "app/templates/model-details.html"
        };
    }

    angular
        .module("budgeting")
        .directive('modelDetails', [
            modelDetails
        ]);
})(angular);
