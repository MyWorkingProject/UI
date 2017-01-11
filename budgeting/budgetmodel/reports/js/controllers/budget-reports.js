//  Budget Model Overview Controller

(function (angular) {
    function BdgtReportsCtrl($scope, model,watchList,$stateParams,viewsGridFactory,viewsGridConfig,reportsGridFactory,reportsGridConfig, budgetDetails, breadcrumbs) {
        var vm = this;
        vm.watchList = watchList();

        vm.init = function () {
            vm.model = model;
            model.setDistID($stateParams.distID);
            //model.getReports();
            vm.getData();
            //breadcrumb
            breadcrumbs
                .updateLinkText(budgetDetails.getModelDetails().modelName);
            vm.watchList.add($scope.$on('$destroy', vm.destroy));
            //vm.watchList.add($scope.$watch('page.model.reportName', model.showAll));
        };

          vm.getData=function(){           
            viewsGridConfig.setSrc(vm);           
            $scope.viewsGridFactory = viewsGridFactory;
            viewsGridFactory.loadModelView();

            reportsGridConfig.setSrc(vm);           
            $scope.reportsGridFactory = reportsGridFactory;
            reportsGridFactory.loadModelStdReport();
            reportsGridFactory.loadModelCustReport();
         };

        vm.destroy = function () {
            model.reset();
            reportsGridFactory.reset();
            vm.watchList.destroy();
            vm.model = undefined;
            vm = undefined;
        };

        vm.search = function () {
            model.updatedSrchd(true);
            model.search();
            reportsGridFactory.updateGridData(model.getReportName());
            viewsGridFactory.setGridViewData(model.getReportName());
        };

        vm.navigateReport = function (reportName) {
            model.navigateReport(reportName);
        };

        vm.leftNav = function(val){
            model.updatedSrchd(true);
            model.leftNav(val);
            model.resetReportName();
            reportsGridFactory.loadReports(val);
            viewsGridFactory.setGridViewData("");
        };

        vm.updateList = function(record){
            reportsGridFactory.updateList(record);
        };

        vm.setSrchd = function(){
            model.updatedSrchd(false);
            //model.updatedSrchd(false);
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtReportsCtrl', [
            '$scope',
			'BdgtReportsListModel','rpWatchList','$stateParams','budgetViewsGridFactory','budgetViewsConfig','budgetReportsGridFactory','budgetReportsConfig',
            'budgetDetails',
            'rpBdgtBreadcrumbsModel',
            BdgtReportsCtrl
        ]);
})(angular);
