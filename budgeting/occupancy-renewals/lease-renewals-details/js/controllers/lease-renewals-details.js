(function(angular) {
    "use strict";

    function LrDetailsCtrl(
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
            //svc
            //    .getServiceGroupDetails({
            //        distID: payrollByModel.distID              
            //    })
            //    .then(vm.setServiceGroupDataDetails)
            //    .catch(vm.error);

            vm.setDetails(mockData.getOccupancyDetails());

            vm.destWatch = $scope.$on("$destroy", vm.destroy);

            commentsAside = asideModal('budgetComments')
                .done(vm.updateCommentCount);
        };



        vm.setDetails = function(response) {
            model
                .setData(response.records);
        };
        vm.updateCommentCount = function(response) {};

        vm.makeLeaseComment = function(col, row) {
            console.log(row.data.units);
            var params = {
                distributedID: budgetModel.distributedID,
                commentSource: 'MarketRentUnit',
                commentSourceID: 1,
                accessPrivilages: budgetDetails.getAccessPrivileges().allowComments
            };
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
        vm.destroy = function() {
            model.destroy();
            vm.destWatch();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("LrDetailsCtrl", [
            '$scope',
            'lrDetailsModel',
            'lrDetailsGridConfig',
            'budgetDetails',
            'lrDetailsService',
            'lrDetailsMock', 'rpBdgtAsideModalService', 'commentSvc',
            LrDetailsCtrl
        ]);
})(angular);