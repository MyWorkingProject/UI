//  Workspace View Service

(function (angular) {
    "use strict";

    function factory() {
        var style = {
            width: ''
        };

        return style;
    }

    angular
        .module("budgeting")
        .factory('workspaceView', [factory]);
})(angular);
