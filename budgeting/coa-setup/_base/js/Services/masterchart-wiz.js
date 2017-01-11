//  Master Chart Wizard Service

(function (angular) {
    "use strict";

    function masterChartWizardService($resource) {
        var defaults = {};

        function getWizStep() {
            var url, actions;
            url = '/api/budgeting/common/wizard/wizardtype/:wizType/reference/:chartID/wizardstatus';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        wizType: 0,
                        chartID: 123456789
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        return {
            getWizStep: getWizStep()
        };
    }

    angular
        .module("budgeting")
        .factory('masterChartWizardService', ['$resource', masterChartWizardService]);
})(angular);
