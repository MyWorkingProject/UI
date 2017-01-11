(function(angular) {
    "use strict";

    function OccupancyDetailsCtrl(
        $scope,
        detailModel,
        detailsGridConfig,
        budgetDetails,
        svc,
        mockData, asideModal, commentSvc) {
        var vm = this,
            model,
            budgetModel, commentsAside;

        vm.init = function() {
            budgetModel = budgetDetails.getModelDetails();
            var gridConfig = detailsGridConfig(vm,
                budgetModel.budgetYear,
                budgetModel.startMonth - 1,
                budgetModel.noOfPeriods
            );
            model = vm.model = detailModel(gridConfig);
            svc
                .getServiceGroupDetails({
                    distributedID: budgetModel.distributedID
                })
                .then(vm.setDetails)
                .catch(vm.error);
            vm.destWatch = $scope.$on("$destroy", vm.destroy);

            commentsAside = asideModal("budgetComments")
                .done(vm.updateCommentCount);

        };

        vm.updateCommentCount = function(response) {
            model.updateGrid(response);
        };

        vm.setDetails = function(response) {
            model
                .setData(response.records);
        };


        vm.onServiceGroupClick = function(col, row) {
            model.redirectToService(col, row);
        };
        vm.destroy = function() {
            model.destroy();
            vm.destWatch();
        };

        vm.onOpenComments = function(col, row) {
            var params = model.getCommentParams(col, row);
            model.selectedServiceGroup(col, row);
            var resolveData = {
                commentParams: function() {
                    return params;
                },
                commentsSvc: function() {
                    return commentSvc;
                }
            };
            commentsAside.resolve(resolveData).show();

        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("OccupancyDetailsCtrl", [
            '$scope',
            'occupancyDetailsModel',
            'ovDetailsGridConfig',
            'budgetDetails',
            'occupancyDetailsService',
            'occupancyDetailsMock', 'rpBdgtAsideModalService', 'commentSvc',
            OccupancyDetailsCtrl
        ]);
})(angular);