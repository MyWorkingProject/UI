//Budget Comments - Responses Service
(function (angular) {
    'use strict';
    function factory($resource, $q, $http)
    {
        var svc = {}, defaults = {};
        
        function getGeneralComments() {
            var url, actions;
            url = '/api/budgeting/common/comment/:commentId/dashboardcommentmodel';
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        commentId:0                        
                    }
                }
            };
            return $resource(url, defaults, actions);
        }
        function getBudgetModelComments() {
            var url, actions;
            url = "/api/budgeting/common/comment/:commentId/landingpagecommentmodel";
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        commentId: 0
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        
        function getNewCommentPropertyFields(){
            var url, actions;
            url = '/api/budgeting/common/propertysearch/m';            
            actions = {
                getData: {
                    method: 'GET'                   
                }
            };
            return $resource(url, defaults, actions);
        }
        function getNewCommentYearFields() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/budgetmodelyear';
            actions = {
                getData: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions);
        }
        function deleteCommentResponse(){
            var url, actions;
            url = '/api/budgeting/common/commentresponse/:responseID';
            actions = {
                delete: {
                    method: 'DELETE',
                    params: {
                        commentID: 0
                    }
                }
            };
            return $resource(url, defaults, actions);
        } 
        
        function postCommentResponse() {
            var url, actions;
            url = '/api/budgeting/common/commentresponse';
            actions = {
                post: {
                    method: 'POST'
                },
                put: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }
        function addDashboardCommentsDetails() {
            var url, actions;
            url = '/api/budgeting/common/dashboardcomment';
            actions = {
                postData: {
                    method: 'POST'
                }
            };
            return $resource(url, defaults, actions);
        }
        
        svc.abortGetYears = function () {
                 if (svc.getYears) {
                     svc.getYears.resolve();
                     svc.getYears = undefined;
                 }
                 return svc;

             };

            svc.getTaskYearsList = function (params) {
                var url = '/api/budgeting/budgetmodel/budgetmodelyear';//?datafilter.pages.resultsPerPage=100';


            var reqUrl = url; //.replace(':searchkey', params);
            svc.getYears = $q.defer();

            return $http({
                data: {},
                method: 'GET',
                url: reqUrl,
                timeout: svc.getYears.promise
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
            var url = '/api/budgeting/common/propertysearch/:searchkey';//?datafilter.pages.resultsPerPage=100';


            var reqUrl = url.replace(':searchkey', params);
            svc.getProperties = $q.defer();

            return $http({
                data: {},
                method: 'GET',
                url: reqUrl,
                timeout: svc.getProperties.promise
            });
        };

        function editDashboardCommentData() {
            var url, actions;
            url = '/api/budgeting/common/propertysearch/m';
            actions = {
                getData: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions);
        }
        function saveEditDashboardCommentsDetails() {
            var url, actions;
            url = '/api/budgeting/common/dashboardcomment';
            actions = {
                postData: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);           
        }

        function deleteDashboardComment() {
            var url, actions;
            url = '/api/budgeting/common/comment/:commentID';
            actions = {
                delete: {
                    method: 'DELETE',
                    params: {
                        commentID: 0
                    }
                }
            };
            return $resource(url, defaults, actions);
        }
        svc.deleteDashboardComment = deleteDashboardComment().delete;
        svc.addDashboardCommentsDetails = addDashboardCommentsDetails().postData;
        svc.saveEditDashboardCommentsDetails = saveEditDashboardCommentsDetails().postData;
        svc.editDashboardCommentData = editDashboardCommentData().getData;
        svc.deleteCommentResponse = deleteCommentResponse().delete;        
        svc.getBudgetModelComments = getBudgetModelComments().getData;
        svc.getGeneralComments = getGeneralComments().getData;
        svc.getNewCommentPropertyFields = getNewCommentPropertyFields().getData;
        svc.getNewCommentYearFields = getNewCommentYearFields().getData;
        svc.postCommentResponse = postCommentResponse().post;
        svc.updateCommentResponse = postCommentResponse().put;

        return svc;
    }

angular
        .module('budgeting')
        .factory('commentsRespSvc', ['$resource', '$q', '$http',
            factory]);
})(angular);
