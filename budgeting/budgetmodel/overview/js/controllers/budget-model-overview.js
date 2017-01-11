//  Budget Model Overview Controller

(function (angular) {
    function BdgtOverviewCtrl($scope, $state, $stateParams, model, workflow, budgetDetails, breadcrumbs) {
        var vm = this, budgetDetailEventSubscribe;

        vm.init = function () {
            vm.model = model;
            vm.workflow = workflow;
            model.setDistID($stateParams.distID);
            model.getSectionDrivers().then(model.setSectionDrivers);
            workflow.setDistID($stateParams.distID);          
            workflow.getCurrSeqWorkflow().then(workflow.setLevelOperations);
            //breadcrumb
            breadcrumbs
                .updateLinkText(budgetDetails.getModelDetails().modelName);

            $scope.$on('$destroy', vm.destroy);
           
        };

        vm.destroy = function () {
            model.reset();
            workflow.reset();
            vm.model = undefined;
            vm = undefined;
        };

        vm.reload = function (resp) {
            model.reset();
            workflow.reset();
            vm.init();
        };

        vm.updateStatus = function (record) {
            model.updateStatus(record);
        };

        vm.updateSubStatus = function (item, record) {
            model.updateSubStatus(item, record);
        };

        vm.toggleSubmitWorkflow = function () {
            workflow.toggleSubmitWorkflow();
        };

        vm.updateSubmitWorkflow = function () {
            //to submit workflow comments
            workflow.submitWorkflow().then(vm.reload);
        };

        vm.toggleApproveWorkflow = function () {
            workflow.hideRejectWorkflow();
            workflow.toggleApproveWorkflow();
        };

        vm.approveWorkflow = function () {
            //to approve workflow comments
            workflow.approveWorkflow().then(vm.reload);
        };

        vm.toggleRejectWorkflow = function () {
            workflow.hideApproveWorkflow();
            workflow.toggleRejectWorkflow();
        };

        vm.rejectWorkflow = function () {
            //to reject workflow comments
            workflow.rejectWorkflow().then(vm.reload);
        };

        vm.navigateToPage = function (driverID, isDisplay, type, categoryCode) {
            var routeInfo = model.setRouteUrl(driverID, $stateParams.distID, isDisplay, type, categoryCode);
            if (routeInfo.routeName) {
                $state.go(routeInfo.routeName, routeInfo.params);
            }
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtOverviewCtrl', [
            '$scope',
            '$state',
            '$stateParams',
			'BdgtOverviewListModel',
            'BdgtOverviewWorkflowModel',
            'budgetDetails',
            'rpBdgtBreadcrumbsModel',
            BdgtOverviewCtrl
        ]);
})(angular);
