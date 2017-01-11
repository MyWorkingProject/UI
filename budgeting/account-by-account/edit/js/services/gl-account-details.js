//  SampleCg Service

(function (angular) {
    'use strict';

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';

        function glBudgetData() {
            var url = baseUrl + '/coa/glbudgetdata',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function glBudgetDetailModel() {
            var url = baseUrl + '/coa/glbudgetdetailmodel',
                defaults = {},
                actions = {
                    'update': {
                        method: 'PUT'
                    }
                };
            return $resource(url, defaults, actions);
        }

        function getGLAccountDetails(params) {
            var extendedParams = {};
            extendedParams["glBudgetDataParam.glAccountNumber"] = params.glAccountNumber;
            extendedParams["glBudgetDataParam.distributedID"] = params.distID;
            extendedParams["glBudgetDataParam.propertyID"] = params.propertyID;
            extendedParams["glBudgetDataParam.masterChartID"] = params.masterChartID;
            extendedParams["glBudgetDataParam.noOfPeriods"] = params.noOfPeriods;
            extendedParams["glBudgetDataParam.modelType"] = params.budgetType;
            extendedParams["glBudgetDataParam.budgetModelID"] = params.budgetModelID;

            return glBudgetData().get(extendedParams).$promise;
        }

        function saveGLAccountDetails(data) {
            return glBudgetDetailModel().update(data).$promise;
        }

        svc.getGLAccountDetails = getGLAccountDetails;
        svc.saveGLAccountDetails = saveGLAccountDetails;
        return svc;
    }

    angular
        .module('budgeting')
        .factory('glAccountDetailsSVC', ['$resource', factory]);
})(angular);
