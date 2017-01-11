//  SampleCg Service

(function(angular) {
    'use strict';

    function factory($resource) {
        var svc = {},
        baseUrl = '/api/budgeting';

        function glAccountReferenceData() {
            var url = baseUrl + '/coa/glaccountreferencedata',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getGLAccountReferenceData(params) {
            var extendedParams = {};
            extendedParams["glRefDataParams.glAccountNumber"] = params.glAccountNumber;
            extendedParams["glRefDataParams.distributedID"] = params.distID;
            extendedParams["glRefDataParams.noOfPeriods"] = params.noOfPeriods;

            return glAccountReferenceData().get(extendedParams).$promise;
        }

        svc.getGLAccountReferenceData = getGLAccountReferenceData;

        return svc;
    }

    angular
        .module('budgeting')
        .factory('glAccountReferenceDataSVC', ['$resource', factory]);
})(angular);