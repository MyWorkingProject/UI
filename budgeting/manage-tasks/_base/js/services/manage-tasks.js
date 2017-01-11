//  Mastercharts Service

(function (angular) {
    'use strict';

    function manageTasksSvc($resource, $q, $http) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

      
/* this code is comments and implemented using $http instead of $resource bcz of abort methods  
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

        function getBudgetTaskModels() {
            var url, actions;
            url = '/api/budgeting/common/budgettask/:taskID/budgettaskmodel?datafilter.pages.resultsPerPage=100';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        taskID: 0
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        function getBudgetTaskUsers() {
            var url, actions;
            
            url = '/api/budgeting/common/budgettask/:taskID/budgettaskuser?datafilter.pages.resultsPerPage=100';
            actions = {
                get: {
                    method: 'GET',
                     params: {
                        taskID: 0
                    }
                }
            };

           return $resource(url, defaults, actions);
        }

        function getBudgetTaskProperties() {
            var url, actions;
            
            url = '/api/budgeting/common/budgettask/:taskID/budgettaskproperty?datafilter.pages.resultsPerPage=100';
            actions = {
                get: {
                    method: 'GET',
                     params: {
                        taskID: 0
                    }
                }
            };

           return $resource(url, defaults, actions);
        }

        //svc.updateWorkflowStatus = updateWorkflowStatus().putData;
        svc.getBudgetTaskModels = getBudgetTaskModels().get;
        svc.getBudgetTaskUsers = getBudgetTaskUsers().get;
        svc.getBudgetTaskProperties = getBudgetTaskProperties().get;
        return svc;
*/

        svc.abortGetUsers =
             function () {
                 if (svc.getUsers) {
                     svc.getUsers.resolve();
                     svc.getUsers = undefined;
                 }
                 return svc;

             };

        svc.getUsersList = function (params) {
             url =  '/api/budgeting/common/user/searchkey/:searchkey/userdetail';//?datafilter.pages.resultsPerPage=100';

            var reqUrl = url.replace(':searchkey', params);
            svc.getUsers = $q.defer();

            return $http({
                data: {},
                method: 'GET',
                url: reqUrl,
                timeout: svc.getUsers.promise
            });
        };

         svc.abortGetModels =
             function () {
                 if (svc.getModels) {
                     svc.getModels.resolve();
                     svc.getModels = undefined;
                 }
                 return svc;

             };

        svc.getModelsList = function (params) {
             url =  '/api/budgeting//budgetmodel/searchkey/:searchkey/budgetmodellist';//?datafilter.pages.resultsPerPage=100';

            var reqUrl = url.replace(':searchkey', params);
            svc.getModels = $q.defer();

            return $http({
                data: {},
                method: 'GET',
                url: reqUrl, 
                timeout: svc.getModels.promise
            });
        };

        svc.abortGetProperties =
             function () {
                 if (svc.getProperties) {
                     svc.getProperties.resolve();
                     svc.getProperties = undefined;
                 }
                 return svc;

             };

        svc.getTaskPropertiesList = function (params) {
             url =  '/api/budgeting/common/propertysearch/:searchkey';//?datafilter.pages.resultsPerPage=100';
                    

            var reqUrl = url.replace(':searchkey', params);
            svc.getProperties = $q.defer();

            return $http({
                data: {},
                method: 'GET',
                url: reqUrl ,
                timeout: svc.getProperties.promise
            });
        };

        function saveTask() {
            var url, actions;
            url = '/api/budgeting/common/budgettask';
            actions = {
                postData: {
                    method: 'POST'

                }
            };
            return $resource(url, defaults, actions);
        }

        function updateTask() {
            var url, actions;
            url = '/api/budgeting/common/budgettask';
            actions = {
                putData: {
                    method: 'PUT'

                }
            };
            return $resource(url, defaults, actions);
        }

        function getTaskDetails() {
            var url, actions;
             url = '/api/budgeting/common/budgettask/:taskID';
            actions = {
                get: {
                    method: 'GET',
                     params: {
                        taskID: 1
                    }
                }
            };

            return $resource(url, defaults, actions);
        }

        function getTaskUsers() {
            var url, actions;
            url = '/api/budgeting/common/budgettask/:taskID/budgettaskuser';
            actions = {
                get: {
                    method: 'GET',
                     params: {
                        taskID: 1
                    }
                }
            };

            return $resource(url, defaults, actions);
        }

        function getTaskModels() {
            var url, actions;
             url = '/api/budgeting/common/budgettask/:taskID/budgettaskmodel';
            actions = {
                get: {
                    method: 'GET',
                     params: {
                        taskID: 1
                    }
                }
            };

            return $resource(url, defaults, actions);
        }

        function getTaskProperties() {
            var url, actions;
             url = '/api/budgeting/common/budgettask/:taskID/budgettaskproperty';
            actions = {
                get: {
                    method: 'GET',
                     params: {
                        taskID: 1
                    }
                }
            };

            return $resource(url, defaults, actions);
        }

    

        svc.saveTask=saveTask().postData;
        svc.updateTask=updateTask().putData;
        svc.getTask=getTaskDetails().get;
        svc.getTaskUsers=getTaskUsers().get;
        svc.getTaskModels=getTaskModels().get;
        svc.getTaskProperties=getTaskProperties().get;
     return svc;

    }

    angular
        .module('budgeting')
        .factory('manageTasksSvc', ['$resource',
           '$q',
            '$http',
            manageTasksSvc]);
})(angular);



