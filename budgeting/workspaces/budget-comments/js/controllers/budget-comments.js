(function (angular) {
    "use strict";
       // var fn = angular.noop;
    function BudgetCommentsCtrl($scope,$state, model, session, budgetComment, dashboardComment, formConfig, budgetDetails, breadcrumbs) {
        var vm = this,
            selectedComment;

        vm.init = function () {
            vm.model = model;
            vm.getData();
            vm.responseID = 0;
            vm.budgetComment = budgetComment;
            vm.dashboardComment = dashboardComment;
            vm.formConfig = formConfig;
            formConfig.setMethodsSrc(vm);
            vm.sessionWatch = session.subscribe("update", vm.getData);
            //breadcrumb
            if ($state.current.name === 'budgetmodel.comments') {
                breadcrumbs.updateLinkText(budgetDetails.getModelDetails().modelName);
            }
            $scope.$on('$destroy', vm.destroy);
        };
        
        vm.submitNewComment = function (form) {
            if (form.$invalid) {
                form.$setSubmitted();
            }
            else {               
                if (dashboardComment.isValidProperty() && dashboardComment.isValidModel() && dashboardComment.isValidYear() && dashboardComment.isValidCommentResponse()) {
                    dashboardComment.saveData().then(function () {
                        dashboardComment.onSaveSuccess();
                        form.$setPristine();
                        //form.$setUntouched();
                        model.load();                       
                    }, dashboardComment.onSaveError);
                    
                }
           }
        };
        vm.submitEditComment = function (form) {
            if (form.$invalid) {
                form.$setSubmitted();
            }
            else {
                if (dashboardComment.isValidProperty() && dashboardComment.isValidModel() && dashboardComment.isValidYear() && dashboardComment.isValidCommentResponse()) {
                    dashboardComment.saveEditData().then(function () {
                        dashboardComment.onUpdateSuccess();
                        form.$setPristine();
                        dashboardComment.taskCommentResp();
                        model.load();
                    }, dashboardComment.onEditError);
                }
            }          
        };

        vm.navigateToPage = function (data) {
            dashboardComment.navigateToPage(data);
        };
        vm.deleteDashboardComment = function (commentID) { 
            dashboardComment.deleteDashboardComment(commentID).then(function () {
                dashboardComment.onDeleteSuccess();                
                model.load();
            }, dashboardComment.onDeleteError);
        };

        
        vm.editDashboardComment = function (data) {
            dashboardComment.editDashboardComment(data);
        };

        vm.editCommentResponse = function (commentID, responseID, response) {
            vm.dashboardComment.commentsResponse = response;
            vm.commentID = commentID;
            vm.responseID = responseID;
        };

        vm.deleteCommentResponse = function (responseID, commentID) {
            dashboardComment.deleteCommentResponse(responseID, commentID).then(function () {
                dashboardComment.onResponseDeleteSuccess();                
                model.load();
            }, dashboardComment.onResponseDeleteError);
        };

        vm.postCommentResponse = function (commentID,form) {
            if (form.$invalid) {
                form.$setSubmitted();
            }
            else {
                if (dashboardComment.isValidCommentResponses()) {
                    dashboardComment.postCommentResponse(commentID).then(function () {
                        dashboardComment.onResponseSaveSuccess();
                        form.$setPristine();
                        //form.$setUntouched();
                        model.load();
                        dashboardComment.resetResponsedata();
                    }, dashboardComment.onResponseSaveError);
                }
            }
           
        };

        vm.postEditResponse = function (commentID, response, form) {
            if (form.$invalid) {
                form.$setSubmitted();
            }
            else {
                 if (dashboardComment.isValidEditResponse()) {
                dashboardComment.postEditResponse(commentID, response);
                form.$setPristine();
                 }
            }
        };

        vm.getNewCommentFields = function () {
            dashboardComment.getNewCommentFields();
           
        };


        vm.getData = function () {
            if (session.isReady()) { 
                 model.load();
                    if (vm.initModelWatch) {
                            vm.initModelWatch();
                        }
                    }
            else {
                vm.initModelWatch = session.subscribe(vm.getData);
            }
        };
        vm.resetComment = function () {
            vm.dashboardComment.commentsResponse = "";
            vm.dashboardComment.pinToStart = null;
            vm.commentID = 0;
            vm.responseID = 0;

        };

        vm.getProperties = function (query) {
            dashboardComment.getProperties(query);
        };

        vm.getModels = function (query) {
            dashboardComment.getModels(query);
        };

        vm.getYears = function (query) {
            dashboardComment.getYears(query);
        };

        vm.propertyDelete = function (item) {
            dashboardComment.addDeletedProperty(item);
        };

        vm.modelDelete = function (item) {
            dashboardComment.addDeletedModel(item);
        };

        vm.yearDelete = function (item) {
            dashboardComment.addDeletedYear(item);
        };
        vm.resetForm = function (form) {
            form.$setPristine();
            vm.pinToStart = undefined;
            dashboardComment.reset(form);
        };
        vm.enableEditor = function (text) {
            dashboardComment.enableEditor();
        };

        model.disableEditor = function () {
            dashboardComment.disableEditor();
        };

        vm.save = function () {
            dashboardComment.save();
        };

        vm.editComment = function (comment) {
            if (selectedComment) {
                selectedComment.isEdit = false;
            }
            selectedComment = comment;
            selectedComment.isEdit = true;
            selectedComment.editResponse = selectedComment.response;
        };

        vm.toggleEditComment = function (comment) {
            selectedComment = comment;
            selectedComment.isEdit = false;
        };

        vm.destroy = function () {
            vm.sessionWatch();
            model.reset();
            dashboardComment.reset();
            budgetComment.reset();
        };
        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BudgetCommentsCtrl', [
            '$scope',
            '$state',
            'budgetCommentsGridFactory',
            'sessionInfo',
            'budgetComment',
            'dashboardComment',
            'budgetCommentsResponses',            
            'budgetDetails',
            'rpBdgtBreadcrumbsModel',
            BudgetCommentsCtrl
        ]);
})(angular);
