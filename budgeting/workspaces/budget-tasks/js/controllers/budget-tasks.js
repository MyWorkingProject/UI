(function (angular) {
    "use strict";

    var fn = angular.noop;

    function BudgetTasksCtrl($scope, $state, gridConfig, gridActions, gridModel, model, $location, session, taskActions, commentsModel,/*dirModel, */ rpCookie, asideModal, taskCommentService, budgetDetails, breadcrumbs) {
        var vm = this, tabsCookie = rpCookie.read('WorkspaceLink'), saveCmnt, delCmnt, closeCmnt, commentsAside;


        vm.init = function () {
            vm.model = model;
            vm.commentsModel = commentsModel;
            vm.getData();
            vm.sessionWatch = session.subscribe("update", vm.getData);
            $scope.$on('$destroy', vm.destroy);
            commentsAside = asideModal("budgetComments")
                .done();

            if ($state.current.name === 'budgetmodel.tasks') {
                breadcrumbs.updateLinkText(budgetDetails.getModelDetails().modelName);
            }
            /*saveCmnt = dirModel.events.subscribe("saveComments",vm.saveComments);
            delCmnt =  dirModel.events.subscribe("deleteComment",vm.deleteComment);
            closeCmnt =  dirModel.events.subscribe("closeComments",vm.closeComments); */

        };

        vm.getData = function () {
            if (session.isReady()) {
                model.reset();
                gridConfig.setSrc(vm);
                gridActions.setSrc(vm);
                $scope.gridFactory = gridModel;
                model.updateTaskFlag();
                gridModel.ApplyFilter(tabsCookie);
                gridModel.load();
                if (vm.initModelWatch) {
                    vm.initModelWatch();
                }
            }
            else {
                vm.initModelWatch = session.subscribe(vm.getData);
            }
        };

        vm.newTask = function () {
            $location.path("/manage-tasks/new-task");
        };

        vm.markTaskAsComplete = function (record) {
            taskActions.markTaskAsComplete(record);

        };

        vm.deleteTask = function (record) {
            taskActions.deleteTask(record);

        };

        vm.addComments = function (record) {
            // commentsModel.getTaskComments(record);
            var resolveData = {
                commentParams: function () {
                    return {
                        taskID: record.taskID,
                        subTitle: record.title,
                        accessPrivilages: true
                    };
                },
                commentsSvc: function () {
                    return taskCommentService;
                }
            };
            commentsAside.resolve(resolveData).show();
        };

        vm.hideCommentsForm = function () {
            commentsModel.form.showForm(false);
        };

        vm.saveComments = function (data) {
            commentsModel.saveTaskComment(data);
        };

        vm.deleteComment = function (CommentID) {
            commentsModel.deleteTaskComment(CommentID);
        };

        vm.closeComments = function () {
            commentsModel.closeComments();
        };

        vm.destroy = function () {
            model.reset();
            commentsModel.reset();
            vm.sessionWatch();
            /* saveCmnt();
             delCmnt();
             closeCmnt();*/
            //dirModel.events.destroy();
        };

        vm.init();
    }


    angular
           .module("budgeting")
           .controller('BudgetTasksCtrl', [
                       '$scope',
                       '$state',
                        'budgetTaskConfig',
                        'budgetTaskActionsDef',
                        'budgetTasksGridFactory',
                        'budgetTaskModel',
                        '$location',
                        'sessionInfo',
                        'budgetTaskActions',
                        'budgetTaskComments',
                        /*'commentsModel',*/'rpCookie',
                        'rpBdgtAsideModalService',
                        'taskCommentService',
                        'budgetDetails',
                        'rpBdgtBreadcrumbsModel',
                       BudgetTasksCtrl]);
})(angular);