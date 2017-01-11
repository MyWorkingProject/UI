//  Payroll Item Comment Service

(function (angular) {
    'use strict';
    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';
        function getTaskComments() {
            var url = baseUrl + '/common/budgettask/:taskID/taskcomment',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }
  

       
        function getComments(response) {
            response.records.forEach(function (item) {
                item.commentID = item.taskCommentID;
                item.comment = item.comment;
                item.sourceID= item.taskID ;
                item.lastModifiedDate= item.lastModifiedDate ;
                item.lastModifiedBy= item.lastModifiedBy ;
                          
            });
             return response;
        }


        function getCommentList(params) {
            var _params = {
                taskID: params.taskID
            };
            return getTaskComments().get(_params).$promise.then(getComments);
        }
      


         function saveTaskComment() {

          var defaults,   url = '/api/budgeting/common/taskcomment',
 
            actions = {
                save: {
                    method: 'POST'

                }
            };
            return $resource(url, defaults, actions);

        }

         function updateTaskComment() {
        var defaults, 
           url = '/api/budgeting/common/taskcomment',
            actions = {
                update: {
                    method: 'PUT'

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

      


        function postComment(params) {
            var comment = {
                    "taskCommentID":params.commentID,
                    "taskID":params.taskID, 
                    "comment":params.commentText

            };           
           return saveTaskComment().save(comment).$promise;
        }

        function updateComment(params) {
            var comment = {
                    "taskCommentID":params.commentID,
                    "taskID":params.taskID, 
                    "comment":params.commentText

            };  
            return updateTaskComment().update(comment).$promise;
        }

     function deleteComment(taskcommentID) {
            var params={
                taskcommentID:taskcommentID
            };
            return deleteTaskComment().delete(params).$promise;
        }



        
        svc.getCommentList = getCommentList;
        svc.postComment = postComment;
        svc.updateComment = updateComment;
        svc.deleteComment = deleteComment;
        return svc;
    }

    angular
        .module('budgeting')
        .factory('taskCommentService', ['$resource', factory]);
})(angular);
