(function (angular, jQuery) {
    "use strict";

    function glAcctHistoryDirective() {

        var GLAcctHistoryLink = function(scope, elem, attrs) {
            elem.attr("data-toggle", "modal")
                .attr("data-target", "#gl-account-history")
                .attr("ui-toggle-class", "modal-open-aside")
                .attr("ui-target", "body");
        };

        return {
            link: GLAcctHistoryLink,
            restrict: "C"
        };
    }

    angular
        .module("budgeting")
        .directive("glAcctHistoryBtn", [
            glAcctHistoryDirective
        ]);
})(angular, $);