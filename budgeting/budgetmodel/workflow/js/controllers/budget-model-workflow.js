//  Budget Model Workflow Controller

(function (angular) {
    function BdgtWorkflowCtrl($scope, $stateParams, levelModel, msgModel, workflowSVC, budgetDetails, breadcrumbs) {
        var vm = this;

        vm.init = function () {
            vm.levelModel = levelModel;
            vm.load();
            vm.workFlowSVC = workflowSVC.subscribe("update", vm.load);

            //breadcrumb
            breadcrumbs
                .updateLinkText(budgetDetails.getModelDetails().modelName);
            $scope.$on('$destroy', vm.destroy);
        };

        vm.load = function(){
            if(workflowSVC.isCalledFromGrid()){
                levelModel.setShowPopUp(true);
                levelModel.setDistID(workflowSVC.getDistributeID());
                levelModel.getModelData();
            }
            else{    
                levelModel.setShowPopUp(false);
                levelModel.setDistID($stateParams.distID);
            }
            levelModel.getLevelSections().then(levelModel.setLevelSections, msgModel.onError);
        };

        vm.destroy = function () {
            levelModel.reset();
            workflowSVC.resetData();
            vm.levelModel = undefined;
            vm.workFlowSVC();
            vm = undefined;
        };

        vm.toggleAllDetails = function () {
            levelModel.toggleAllDetails();
        };
        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtWorkflowCtrl', [
            '$scope',
            '$stateParams',
            'BdgtWorkFlowLevel',
            'BdgtModelWorkflowMsg',
            'workflowCommonSVC',
            'budgetDetails',
            'rpBdgtBreadcrumbsModel',
            BdgtWorkflowCtrl
        ]);
})(angular);
