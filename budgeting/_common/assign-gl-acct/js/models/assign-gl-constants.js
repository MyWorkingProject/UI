// Assign GL Accounts "Constant" Values

(function (angular) {
    "use strict";

    function factory() {
        var model = {};

        model.columnKey = {
        	masterChart: "masterChartName",
    		glAccount: "glAccount"
        };

        model.templateConfig = {
        	glAccountSelector: "app/templates/gl-selector.html"
        };


        return model;
    }

    angular
        .module("budgeting")
        .factory("assignGLsConstantModel", [factory]);
})(angular);
