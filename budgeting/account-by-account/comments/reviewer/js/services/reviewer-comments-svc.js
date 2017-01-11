//General comments service
(function (angular) {
    'use strict';
    function factory($resource, $q, $http) {
        var svc = {}, defaults = {};
        function getReviewerComments() {
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
        function getReviewerCommentUsers() {
            var url, actions;
            url = '/api/budgeting/common/comment/:commentID/commentviewer';
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        commentID: 0
                    }
                }
            };
            return $resource(url, defaults, actions);
        }
        svc.abortGetUsers =
        function () {
            if (svc.getUsers) {
                svc.getUsers.resolve();
                svc.getUsers = undefined;
            }
            return svc;
        };

        svc.getUsersList = function (searchKey) {
            var url = '/api/budgeting/common/user/searchkey/:searchKey/userdetail';//?datafilter.pages.resultsPerPage=100';
            url = url.replace(':searchKey', searchKey);
            svc.getUsers = $q.defer();
            return $http({
                data: {},
                method: 'GET',
                url: url,
                timeout: svc.getUsers.promise
            });
        };

        function postReviewerComments() {
            var url, actions;
            url = '/api/budgeting/common/reviewercommentmodel';
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
        function deleteReviewerComment() {
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
        svc.deleteReviewerComment = deleteReviewerComment().delete;
        svc.getReviewerComments = getReviewerComments().getData;
        svc.postReviewerComments = postReviewerComments().post;
        svc.updateReviewerComments = postReviewerComments().put;
        svc.getReviewerCommentUsers = getReviewerCommentUsers().getData;
        return svc;
    }

    angular
            .module('budgeting')
            .factory('reviewerCommentsSVC', ['$resource', '$q',
                '$http', factory]);
})(angular);
