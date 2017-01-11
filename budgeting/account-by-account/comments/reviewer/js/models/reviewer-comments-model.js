
// Reviewer comments model

(function (angular) {
    'use strict';
    function factory(langTranslate,
        svc,
        budgetDetails,
        formData,
        $filter,
        commentModel) {
        var translate, model = {};
        translate = langTranslate('reviewerComments').translate;
        model = {
            
            commentSource: 'AccountByAccountReviewer',
            commentID: 0,
            editCommentID:0,
            commentViewerID: 0,
            commentUserID: 0,
            userList: [],
            searchKey: '',
            isEditable: false,
            visibleToAll: false,
            isVisibleComments: false,
            commentViewers: [
                {
                    commentViewerID: 0,
                    commentID: 0,
                    commentUserID: 0,
                }],
            deleteCommentViewers: []
        };
        model.fieldLabel = {
            showVisibilityText: translate('budget_model_comments_reviewer_showVisibilityText'),
            hideVisibilityText: translate('budget_model_comments_reviewer_hideVisibilityText'),
        };
        model.showComments = false;
        model.toggleReviewerComments = function () {
            model.showComments = !model.showComments;
        };
        model.load = function () {
            model.distributedID = budgetDetails.getModelDetails().distributedID;
            model.accessPrivilages = budgetDetails.getAccessPrivileges().allowReviewerComments && !budgetDetails.getModelDetails().isFinal;
            model.commentSourceID = commentModel.getGLAccountNumber();

            svc.getReviewerComments({
                distributedID: budgetDetails.getModelDetails().distributedID,
                commentSource: 'AccountByAccountReviewer',
                commentSourceID: commentModel.getGLAccountNumber(),
            }, model.setComments);

            return model;
        };
        model.resetForm = function () {
            formData.form.commentsText = '';
            model.commentID = 0;
            formData.selectedUsers = [];
            formData.selectUsers = [];
        };
        model.editCommentDetails = function (comment) {
            model.editCommentID = comment.commentID;
            formData.form.editCommentText = comment.comment;
            svc.getReviewerCommentUsers({
                commentID: model.editCommentID
            }, model.loadUISelect);
        };
        model.loadUISelect = function (response) {
            formData.selectedUsers = '';
            var records = response.records;
            formData.selectedUsers = response.records;
        };
        model.resetUserList = function () {
            model.userList = [];
        };
        model.getUser = function (user) {
            model.resetUserList();
            if (user !== '') {
                model.getUserList(user).then(model.setUserList);
            }
        };
        model.getUserList = function (user) {
            return svc.abortGetUsers().getUsersList(user);
        };
        model.setComments = function (data) {
            model.comments = data.records;
            commentModel.updateReviewerCommentCount(data.totalRecords);
            model.setCommentVisibility(model.comments);
        };
        model.setCommentVisibility = function(comment)
        {
            model.isVisibleComments = model.comments.length > 0 ? true:false;
        };
        model.setCommentAssignedUsers = function (data) {
            model.commentAssignedUsers = data.records;
        };
        model.setUserList = function (response) {
            var records = response.data.records;
            formData.selectedUsers.forEach(function (item) {
                var propRecord = $filter('filter')(records, function (d) {
                    return d.userID === item.userID;
                });

                if (propRecord.length > 0) {
                    propRecord.forEach(function (record) {
                        var index = records.indexOf(record);
                        records.remove(index);
                    });
                }
            });
            model.userList = records;
        };
        model.postComment = function (commentSource, glAccountNumber, comment, commentID, commentViewerID, commentUserID) {
            model.commentViewers = [];
            if (formData.selectUsers.length > 0) {
                formData.selectUsers.forEach(function (item) {
                    if (item.commentUserID) {
                        item.userID = item.commentUserID;
                    }
                    model.commentViewers.push({
                        commentViewerID: item.userID,
                        commentID: model.commentID,
                        commentUserID: item.userID
                    });
                });
                model.visibleToAll = false;
            }
            else {
                model.visibleToAll = true;
            }
            var data = {
                glAccountComment: {
                    commentID: commentID,
                    distributedID: budgetDetails.getModelDetails().distributedID,
                    glAccountNumber: commentModel.getGLAccountNumber(),
                    comment: comment,
                    commentSource: commentSource,
                    visibleToAll: model.visibleToAll
                },
                commentViewers: model.commentViewers,
                deleteCommentViewers: model.deleteCommentViewers
            };
            svc.postReviewerComments({}, data, model.load);
            commentModel.reviewerCommentAdded();
            return true;
        };
        model.updateComment = function (commentSource, glAccountNumber, comment, commentID, commentViewerID, commentUserID) {
            model.commentViewers = [];
            if (formData.selectedUsers.length > 0) {
                formData.selectedUsers.forEach(function (item) { 
                    if (item.commentUserID) {
                        item.userID = item.commentUserID;
                    }
                    model.commentViewers.push({
                        commentViewerID: item.userID,
                        commentID: model.editCommentID,
                        commentUserID: item.userID
                    });
                });
                model.visibleToAll = false;
            }
            else {
                model.visibleToAll = true;
            }
            var data = {
                glAccountComment: {
                    commentID: commentID,
                    distributedID: budgetDetails.getModelDetails().distributedID,
                    glAccountNumber: commentModel.getGLAccountNumber(),
                    comment: comment,
                    commentSource: commentSource,
                    visibleToAll: model.visibleToAll
                },
                commentViewers: model.commentViewers,
                deleteCommentViewers: model.deleteCommentViewers
            };
            svc.updateReviewerComments({}, data, model.load);
            return true;
        };
        model.deleteComment = function (commentID) {
            svc.deleteReviewerComment({
                commentID: commentID
            }, model.load);
        };
        return model;
    }
    angular
        .module('budgeting')
        .factory('reviewerCommentsModel', [
            'appLangTranslate',
            'reviewerCommentsSVC',
            'budgetDetails',
            'reviewerCommentsFormData',
            '$filter',
            'commentModel',
            factory
        ]);
})(angular);



