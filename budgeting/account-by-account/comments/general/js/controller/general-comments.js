(function (angular) {
    'use strict';
    function GeneralCommentsCtrl(formModel,
        formConfig,
        formData,
        generalCommentModel,
        generalCommentsContent
        ) {
        var vm = this,
            form = formModel(),
            model = generalCommentModel;
        vm.init = function () {
            vm.fieldLabels = generalCommentsContent;
            vm.model = model;
            vm.formData = formData;
            form.setData(formData);
            vm.formConfig = formConfig;
            formConfig.setMethodsSrc(vm);
            model.load();
        };      
        vm.editComment = function (comment) {
            model
                .editCommentDetails(comment);
        };
        vm.deleteComment = function (commentId) {
            model
                .deleteComment(commentId);
        };
        vm.postComment = function (form, commentsText) {
            if (form.$valid) {
                model.postComment(commentsText);
                vm.resetComment();
                form.$setPristine();
            }
            else {
                form.$setSubmitted();
            }
        };
        vm.updateComment = function (form, commentsText) {
            if (form.$valid) {
                model.updateComment(commentsText);
                vm.resetComment();
                form.$setPristine();
            }
            else {
                form.$setSubmitted();
            }
        };
        vm.hideComment = function (comment) {
            comment.isEdit = false;
        };
        vm.resetComment = function () {
            vm.formData.form.commentsText = '';            
        };
        vm.init();
    }
    angular
        .module('budgeting')
        .controller('GeneralCommentsCtrl', [
            'baseForm',
            'generalCommentsFormConfig',
            'generalCommentsFormData',
            'generalCommentsModel',
            'generalCommentsContentModel',
            GeneralCommentsCtrl
        ]);
})(angular);
