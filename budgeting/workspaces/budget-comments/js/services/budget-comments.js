

(function (angular) {
    "use strict";

    function commentsSvc($q, $http, $resource) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

      

        svc.getDashboardComments = function (params, data) {           
            url = '/api/budgeting/common/comment/dashboardcomment/:propertyID';
            url = url.replace(":propertyID",params.propertyID);
            deferred = $q.defer();

            return $http({
                data: {},
                url: url + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };
        
        svc.getBudgetModelComments = function (params, data) {           
            url = '/api/budgeting/common/comment/modellandingpagecomment/:distributedID';
            url = url.replace(":distributedID",params.distributedID);
            deferred = $q.defer();

            return $http({
                data: {},
                url: url + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };


        svc.getAllPropertiesTasks = function (params, data) {
            url = '/api/budgeting/common/budgettask/budgettasklist';

            deferred = $q.defer();

            return $http({
                data: {},
                url: url + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };

        svc.getPropertyTasks = function (params, data) {
            url = '/api/budgeting/common/budgettask/property/:propertyID/budgettasklist';
            url = url.replace(':propertyID', params.propertyID);


            deferred = $q.defer();

            return $http({
                data: {},
                url: url + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };


        svc.getBudgetModelTasksList = function (params, data) {
            url = '/api/budgeting/common/budgettask/distribute/:distributedID/budgettasklist';
            url = url.replace(':distributedID', params.distributedID);

            deferred = $q.defer();

            return $http({
                data: {},
                url: url + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };

        function markTaskAsComplete() {
            var url, actions, defaults;
            url = '/api/budgeting/common/budgettask/:taskID/status/complete';
            defaults = {};
            actions = {
                putData: {
                    method: 'PUT',
                    params: {
                        taskID: 1
                    }
                }
            };
            return $resource(url, defaults, actions);
        }


        function deleteTask() {
            var defaults, actions,
            url = '/api/budgeting/common/budgettask/:taskID';
            defaults = {};
            actions = {
                delete: {
                    method: 'DELETE',
                    params: {
                        taskID: 1
                    }
                }
            };

            return $resource(url, defaults, actions);
        }

        function saveTaskComment() {

            url = '/api/budgeting/common/taskcomment';

            actions = {
                save: {
                    method: 'POST'

                }
            };
            return $resource(url, defaults, actions);

        }

        function updateTaskComment() {

            url = '/api/budgeting/common/taskcomment';
            actions = {
                update: {
                    method: 'PUT'

                }
            };
            return $resource(url, defaults, actions);

        }

        function getCommentsByTaskID() {
            var url, actions, defaults;
            url = '/api/budgeting/common/budgettask/:taskID/taskcomment';
            defaults = {};
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        taskID: 1
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        function getCommentByTaskCommentID() {
            var url, actions, defaults;
            url = '/api/budgeting/common/taskcomment/:taskcommentID';
            defaults = {};
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        taskcommentID: 1
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        function deleteTaskComment() {
            var defaults, actions,
            url = '/api/budgeting/common/taskcomment/:taskcommentID';
            defaults = {};
            actions = {
                delete: {
                    method: 'DELETE',
                    params: {
                        taskcommentID: 1
                    }
                }
            };

            return $resource(url, defaults, actions);
        }


        svc.markTaskAsComplete = markTaskAsComplete().putData;
        svc.deleteTask = deleteTask().delete;
        svc.saveTaskComment = saveTaskComment().save;
        svc.updateTaskComment = updateTaskComment().update;
        svc.getCommentsByTaskID = getCommentsByTaskID().getData;
        svc.getCommentByTaskCommentID = getCommentByTaskCommentID().getData;
        svc.deleteTaskComment = deleteTaskComment().delete;


        return svc;

    }

    angular
        .module("budgeting")
        .factory('commentsSvc', [
             '$q',
            '$http','$resource',
            commentsSvc]);
})(angular);
