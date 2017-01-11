(function (angular) {
    function BudgetCommentsCtrl(
        $scope,
        asideModalInstance,
        notificationModel,
        formConfig,
        commentsContent,
        commentsModel,
        commentParams,
        commentsSvc,
        rpWatchList) {

        var vm = this,
            model;

        vm.init = function () {
            model = vm.model = commentsModel(commentParams);
            vm.formConfig = formConfig;
            vm.fieldLabels = commentsContent;

            formConfig.setMethodsSrc(vm);

            vm.getComments();

            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on("$destroy", vm.destroy));
        };

        vm.getComments = function () {
            commentsSvc
                .getCommentList(commentParams)
                .then(model.setComments);
        };
 
        vm.postComment = function (form) {
            if (!form.$valid) {
                form.$setSubmitted();
                return;
            }

            var params = angular.extend({
                commentID: 0,
                commentText: model.getCommentText()
            }, commentParams);
            commentsSvc
                .postComment(params)
                .then(vm.saveCommentUpdate);
            model.resetCommentState();
            form.$setPristine();
        };

        vm.saveCommentUpdate = function () {
            notificationModel.success("Comment created successfully");
            vm.getComments();
        };

        vm.editCommentDetails = function (comment) {
            model
                .resetCommentState()
                .setSelectedComment(comment);
        };

        vm.updateComment = function (form) {
            if (!form.$valid) {
                form.$setSubmitted();
                return;
            }


            var params = angular.extend({
                commentID: model.getSelectedCommentID(),
                commentText: model.getSelectedCommentText()
            }, commentParams);
            commentsSvc
                .updateComment(params)
                .then(vm.editCommentUpdate);
            model.resetCommentState();
            form.$setPristine();
        };

        vm.editCommentUpdate = function () {
            notificationModel.success("Comment updated successfully");
            vm.getComments();
        };

        vm.deleteComment = function (comment) {
            commentsSvc
                .deleteComment(comment.commentID)
                .then(vm.deleteUpdate);
        };

        vm.deleteUpdate = function () {
            notificationModel.success("Comment deleted successfully");
            vm.getComments();
        };

        vm.close = function () {
            asideModalInstance.cancel();
        };

        vm.hideComment = function () {
            model.resetCommentState();
        };

        vm.destroy = function () {
            asideModalInstance
               .done(model.getTotalComments());
            model = undefined;
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BudgetCommentsCtrl', [
          '$scope',
          'rpBdgtAsideModalInstance',
          'notificationService',
          'commentsFormConfig',
          'budgetCommentsContent',
          'budgetCommentsModel',
          'commentParams',
          'commentsSvc',
          'rpWatchList',
           BudgetCommentsCtrl
        ]);
})(angular);
