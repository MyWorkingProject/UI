(function (angular) {
    'use strict';
    function factory(langTranslate, svc, budgetDetails, formData, commentModel) {
        var model = {},
            distributedID,
            commentSourceID,
            commentSource = 'AccountByAccount',
            selectedComment;
        model.init = function () {
            return model;
        };
        model.load = function () {
            distributedID = budgetDetails.getModelDetails().distributedID;
            commentSourceID = commentModel.getGLAccountNumber();
            model.accessPrivilages = budgetDetails.getAccessPrivileges().allowComments && !budgetDetails.getModelDetails().isFinal;
            model.isVisibleComments = false;
            svc.getGeneralComments({
                distributedID: distributedID,
                commentSource: commentSource,
                commentSourceID: commentSourceID
            }, model.setComments);
            return model;
        };
        model.setComments = function (data) {
            model.comments = data.records;
            commentModel.updateGeneralCommentCount(data.totalRecords);
            model.isVisibleComments = data.totalRecords > 0;
        };
        model.toggleReviewerComments = function () {
            model.showComments = !model.showComments;
        };
        model.editCommentDetails = function (comment) {
            if (selectedComment) {
                selectedComment.isEdit = false;
            }
            selectedComment = comment;
            selectedComment.isEdit = true;
            formData.form.editCommentText = comment.comment;
        };
        model.postComment = function (comment) {
            var data = {
                commentID: 0,
                distributedID: distributedID,
                glAccountNumber: commentSourceID,
                comment: comment,
                commentSource: commentSource
            };
            svc.postGeneralComments({}, data, model.load);
            commentModel.generalCommentAdded();
        };
        model.updateComment = function (comment) {
            var data = {
                commentID: selectedComment.commentID,
                distributedID: distributedID,
                glAccountNumber: commentSourceID,
                comment: comment,
                commentSource: commentSource
            };
            svc.updateGeneralComments({}, data, model.load);
        };
        model.deleteComment = function (commentID) {
            svc.deleteGeneralComment({
                commentID: commentID
            }, model.load);
        };
        return model.init();
    }
    angular
        .module('budgeting')
        .factory('generalCommentsModel', [
            'appLangTranslate',
            'generalCommentsSvc',
            'budgetDetails',
            'generalCommentsFormData',
            'commentModel',
            factory
        ]);
})(angular);
