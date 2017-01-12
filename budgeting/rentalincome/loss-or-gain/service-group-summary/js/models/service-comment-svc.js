(function(angular) {
    "use strict";

    function commentSvc($q, $http, $resource) {
        var model = {},
            url, deferred, actions, defaults = {},
            prefix;

        function saveMarketRentComment() {

            url = '/api/budgeting/common/glaccountcomment';

            actions = {
                save: {
                    method: 'POST'

                }
            };
            return $resource(url, defaults, actions);

        }

        function updateMarketRentComment() {

            url = '/api/budgeting/common/glaccountcomment';
            actions = {
                update: {
                    method: 'PUT'

                }
            };
            return $resource(url, defaults, actions);

        }

        function deleteMarketRentComment() {
            var defaults, actions,
                url = '/api/budgeting/common/comment/:commentID';
            defaults = {};
            actions = {
                delete: {
                    method: 'DELETE',
                    params: {
                        commentID: 1
                    }
                }
            };

            return $resource(url, defaults, actions);
        }

        function getCommentsByMarketRent(params) {
            var url, actions, defaults;
            url = '/api/budgeting/common/distribute/:distributedID/commentsource/:commentSource/commentsourceid/:commentSourceID/budgetcomments';
            defaults = {};
            actions = {
                getData: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions);
        }

        function setSaveData(data) {
            var returnData = {
                "commentSourceID": data.commentSourceID ? data.commentSourceID : 0,
                "distributedID": data.distributedID,
                "comment": data.commentText,
                "commentSource": data.commentSource,
                "commentID": data.commentID,
                "serviceGroupID": data.serviceGroupID
            };
            return returnData;
        }

        function postComment(params) {
            var data = setSaveData(params);
            return saveMarketRentComment().save(data).$promise;

        }

        function updateComment(params) {
            var data = setSaveData(params);
            return updateMarketRentComment().update(data).$promise;
        }

        function deleteComment(commnetID) {
            return deleteMarketRentComment().delete({ commentID: commnetID }).$promise;
        }

        function getComments(response) {
            return response;
        }

        function getCommentList(params) {
            //getCommentSource(params);
            var _params = {
                distributedID: params.distributedID,
                commentSource: params.commentSource,
                commentSourceID: params.commentSourceID,
            };
            return getCommentsByMarketRent().getData(_params).$promise.then(getComments);
        }
        model.getCommentList = getCommentList;
        model.postComment = postComment;
        model.updateComment = updateComment;
        model.deleteComment = deleteComment;


        return model;
    }

    angular
        .module("budgeting")
        .factory('commentSvc', [
            '$q',
            '$http',
            '$resource',
            commentSvc
        ]);
})(angular);