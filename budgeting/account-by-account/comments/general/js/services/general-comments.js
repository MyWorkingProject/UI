//General comments service
(function (angular) {
    'use strict';
    function factory($resource)
    {
        var svc = {}, defaults = {};

        function getGeneralComments() {
            var url, actions;
            url = '/api/budgeting/common/distribute/:distributedID/commentsource/:commentSource/commentsourceid/:commentSourceID/budgetcomments';
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        distributedID: 0, 
                        commentSource: 0,
                        commentSourceID: 0
                    }
                }
            };
            return $resource(url, defaults, actions);
        }  

        function postGeneralComments() {
            var url, actions;
            url = '/api/budgeting/common/glaccountcomment';
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

        function deleteGeneralComment(){
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
        svc.deleteGeneralComment = deleteGeneralComment().delete;
        svc.getGeneralComments = getGeneralComments().getData;
        svc.postGeneralComments = postGeneralComments().post;
        svc.updateGeneralComments = postGeneralComments().put;
        return svc;
    }

angular
        .module('budgeting')
        .factory('generalCommentsSvc', ['$resource', factory]);
})(angular);
