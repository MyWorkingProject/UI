(function(angular) {
    "use strict";



    angular
        .module("budgeting")
        .factory("serviceGroupSVC", ["$resource", 'serviceGroupMock', function($resource, mock) {
            var svc = {},
                baseUrl = '/api/budgeting';

            function summaryData() {
                var url = baseUrl + '/serviceGroups',
                    defaults = {},
                    actions = {};
                return $resource(url, defaults, actions);
            }



            function getSummaryData(params) {
                return summaryData().get(params).$promise;
            }


            svc.getServiceGroupSummary = getSummaryData;

            return svc;
        }]);

    angular.module('budgeting').run(function($httpBackend, serviceGroupMock) {
        $httpBackend.whenGET('/api/budgeting/serviceGroups').respond(function(method, url, data) {
            return [200, serviceGroupMock.serviceGroups()];
        });
    });
})(angular);