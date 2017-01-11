(function (angular) {
    'use strict';
    function ReviewerCommentsCtrl(formModel,
        formConfig,
        formData,
        model,
        reiviwerCommentsContent) {
        var vm = this,
          form = formModel();
        var selectedComment;
        vm.init = function () {
            vm.fieldLabel = reiviwerCommentsContent;
            vm.formData = formData;
            form.setData(formData);
            vm.formConfig = formConfig;
            formConfig.setMethodsSrc(vm);
            vm.model = model.load();
            vm.resetComment();
        };
        vm.toggleReviewerComments = function () {
            model.toggleReviewerComments();
        };
        vm.submit = function (form) {
            form.$setSubmitted();
            if (form.$valid) {
                form.$setPristine();
            }
        };
        vm.editComment = function (comment) {
            if (selectedComment) {
                selectedComment.isEdit = false;
            }
            selectedComment = comment;
            selectedComment.isEdit = true;
            model.editCommentDetails(comment);

        };
        vm.toggleEditComment = function (comment) {
            selectedComment = comment;
            selectedComment.isEdit = false;
        };
        vm.deleteComment = function (commentID) {
            model.deleteComment(commentID);
        };
        vm.postComment = function (form, commentsText) {
            if (form.$valid) {
                model.postComment('AccountByAccountReviewer',
                '',
                commentsText,
                model.commentID,
                model.commentViewerID,
                model.commentUserID);

                vm.resetComment();
                form.$valid = true;
            }
            else {
                form.$setSubmitted();
            }
        };
        vm.updateComment = function (form, commentsText) {
            if (form.$valid) {
                model.updateComment('AccountByAccountReviewer',
                '',
                commentsText,
                model.editCommentID,
                model.commentViewerID,
                model.commentUserID);

                vm.resetComment();
                form.$valid = true;
            }
            else {
                form.$setSubmitted();
            }
        };
        vm.resetComment = function () {
            model.resetForm();
        };
        vm.getUsers = function (user) {
            model.getUser(user);
        };
        vm.init();
    }
    angular
        .module('budgeting')
        .controller('ReviewerCommentsCtrl', [
            'baseForm',
            'reviewerCommentsFormConfig',
            'reviewerCommentsFormData',
            'reviewerCommentsModel',
            'reiviwerCommentsContentModel',
            ReviewerCommentsCtrl
        ]);
})(angular);
