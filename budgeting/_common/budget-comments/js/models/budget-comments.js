//  Users List Model

(function (angular) {
    "use strict";

    function factory() {
        return function (commentParams) {
            var model = {
                newCommentText: '',
                editCommentText: '',
                selectedComment: {},
                comments: [],
                totalComments: 0,
                subTitle: commentParams.subTitle,
                accessPrivilages: commentParams.accessPrivilages
            };

            model.getCommentText = function () {
                return model.newCommentText;
            };

            model.getSelectedCommentText = function () {
                return model.editCommentText;
            };

            model.getSelectedCommentID = function () {
                return model.selectedComment.commentID;
            };

            model.getTotalComments = function () {
                return model.totalComments;
            };

            model.setComments = function (response) {
                model.comments = response.records;
                model.totalComments = response.totalRecords;
            };

            model.setSelectedComment = function (comment) {
               
                model.selectedComment = comment;
                model.selectedComment.isEdit = true;
                model.editCommentText = comment.comment;
            };

            model.resetCommentState = function () {
                if (model.selectedComment) {
                    model.selectedComment.isEdit = false;
                }
                model.newCommentText = '';
                model.editCommentText = '';
                return model;
            };

            return model;
        };
    }
    angular
        .module("budgeting")
        .factory('budgetCommentsModel', [
                factory
        ]);
})(angular);
