(function (angular) {
    "use strict";

    function newMasterchartSVC($resource) {
        var svc, url, deferred, postUrl, getUrl;
        var defaults = {};

        function updateWizStep() {
            var url, actions;
            url = '/api/budgeting/common/wizard/wizardstatus';
            actions = {
                post: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }

        function getMasterChartData() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/:chartID';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        chartID: 123456
                    }
                }
            };

            return $resource(url, defaults, actions);
        }

        function saveNewMasterChart() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart';
            actions = {
                put: {
                    method: 'POST'
                }
            };

            return $resource(url, defaults, actions);
        }

        function saveMasterChart() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart';
            actions = {
                post: {
                    method: 'PUT'
                }
            };

            return $resource(url, defaults, actions);
        }

        return {
            getMasterChartData: getMasterChartData().get,
            saveNewMasterChart: saveNewMasterChart().put,
            saveMasterChart: saveMasterChart().post,
            updateWizStep: updateWizStep().post
        };

    }

    angular
        .module("budgeting")
        .factory('newMasterchartSVC', ['$resource', newMasterchartSVC]);

})();
