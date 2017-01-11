//  Mastercharts Service

(function (angular) {
    'use strict';

    function budgetWorkflowStatusSvc($resource, $q, $http) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

        //function getBudgetWorkFlowStatusList(pgdata) {
        //    var url, actions;

        //    url = '/api/budgeting/budgetmodel/sequence/:statusType/budgetworkflowstatus';
        //    actions = {
        //        getData: {
        //            method: 'GET',
        //            params: {
        //                statusType: 1,
        //                datafilter: {}
        //            }
        //        }
        //    };
        //    return $resource(url, defaults, actions);
        //}

        //function updateWorkflowStatus() {
        //    var url, actions;
        //    url = '/api/budgeting/budgetmodel/workflow/budgetstatus';
        //    actions = {
        //        putData: {
        //            method: 'POST'

        //        }
        //    };
        //    return $resource(url, defaults, actions);
        //}

        //function getBdgtModel() {
        //    var url, actions;
        //    url = '/api/budgeting/budgetmodel/budgetmodelyear';
        //    actions = {
        //        get: {
        //            method: 'GET'
        //        }
        //    };
        //    return $resource(url, defaults, actions);
        //}

        //return {
        //    getBudgetWorkFlowStatusList: getBudgetWorkFlowStatusList(),
        //    updateWorkflowStatus: updateWorkflowStatus(),
        //    getBdgtModel: getBdgtModel()

        //};

        svc.getBudgetWorkFlowStatusList = function (params, data) {
            url = '/api/budgeting/budgetmodel/property/:propertyID/sequence/:statusType/budgetworkflowstatus';

            var reqUrl = url.replace(':statusType', params.statusType);
            reqUrl = reqUrl.replace(':propertyID', params.propertyID);
            deferred = $q.defer();

            return $http({
                data: {},
                url: reqUrl + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };


        function updateWorkflowStatus() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/workflow/budgetstatus';
            actions = {
                putData: {
                    method: 'POST'

                }
            };
            return $resource(url, defaults, actions);
        }

        function getBdgtModel() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/budgetmodelyear';
            actions = {
                get: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions);
        }

        function getWorkflowSequenceStatus() {
            var url, actions;
            
            url = '/api/budgeting/budgetmodel/workflow/distribute/:distributedID/sequence/:sequence';
            actions = {
                get: {
                    method: 'GET',
                     params: {
                        distributedID: 123456,
                        sequence:1
                    }
                }
            };

           return $resource(url, defaults, actions);
        }

        svc.updateWorkflowStatus = updateWorkflowStatus().putData;
        svc.getBdgtModel = getBdgtModel().get;
        svc.getWorkflowSequenceStatus = getWorkflowSequenceStatus().get;
        return svc;
    }

    angular
        .module('budgeting')
        .factory('budgetWorkflowStatusSvc', ['$resource',
           '$q',
            '$http',
            budgetWorkflowStatusSvc]);
})(angular);
