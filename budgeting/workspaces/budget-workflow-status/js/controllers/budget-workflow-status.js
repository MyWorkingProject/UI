(function (angular) {
    'use strict';

    var fn = angular.noop;

    function BudgetWorkflowStatusCtrl($scope, model, tabsMenuModel , budgetWorkflowStatusSvc, $filter, timeout, grid, bgtStatusOperations, exception,session,gridConfig, workflowCommonSVC,rpCookie, formConfig) {
        var vm = this,tabsCookie = rpCookie.read('WorkspaceLink'),
            listSVC = budgetWorkflowStatusSvc,
           pgData, body, btnClick;

        vm.init = function () {           
            model.resetSrcPage();
            vm.model = model;
            vm.formConfig = formConfig;
            formConfig.setMethodsSrc(vm);
            vm.bgtStatusOperations = bgtStatusOperations;         
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
            var tabsMenu = tabsMenuModel();
            tabsMenu.setOptions([model.getInProgress(), model.getNeedApproval()]);
            model.setTabsMenu(tabsCookie);
            vm.tabsMenu = tabsMenu;
            vm.gridFactory = grid;
            vm.sessionWatch = session.subscribe("update",vm.getData);   
            vm.workflowCommon = workflowCommonSVC.subscribe("update",model.setSrcPage);   
            $scope.$watch('page.model.form.needApproval.isActive', vm.getData);
            $scope.$on('$destroy', vm.destroy);
        };

        
        vm.getData = function () {
            model.setConfigReady(false);
            if (session.isReady()) { 
                model.getBdgtModel().then(vm.loadGridData, exception.showBdgtModelException);
                if (vm.initModelWatch) {
                        vm.initModelWatch();
                    }
            }
            else {
                vm.initModelWatch = session.subscribe(vm.getData);
            } 
        };

        vm.selectAll = function(){
            grid.selectAll(model.getSelectAll());
        };

        vm.loadGridData = function (resp) {
            model.reset();
            //model.setPropertyID(session.get("siteID"),session.get("pmcid"));
            var filters = model.updateFiltTypes(resp.records);
            model.updateSlideCommentsFlag(false);
            grid.setGridReady(filters, model.getInProgressActive());     
            model.setConfigReady(true);
            //vm.configLoaded=true;      
            grid.updateGrid();
            grid.ApplyFilter(tabsCookie);
            grid.load();
            model.setSelectAll(false);           
        };        

        vm.showCommentsForm = function (btnText) {
            model.updateToolTip(btnText);
            if ((grid.getSelectedRecords()).length > 0) {
                bgtStatusOperations.showForm(btnText);
                formConfig.updateText(btnText);
            }
            else {
                model.showHideToolTip();
                timeout(vm.bindMenu);
            }
            
        };

        vm.updateWorkflowStatus = function (form) {
             if (form.$invalid) {
                form.$setSubmitted();
            }
            else {
                model.setConfigReady(false);
                var data = grid.getSelectedRecords();
                bgtStatusOperations.updateStatus(data);
                model.setSelectAll(false);
                form.$setPristine();   
            }
        };

      
        vm.hideCommentsForm = function () {
            bgtStatusOperations.clearControls();
            model.updateSlideCommentsFlag(false);
        };

        vm.bindMenu = function () {
            if (model.isToolTipisMenuOn()) {
                vm.bindMenuClick();
            }
        };

        vm.bindMenuClick = function () {
            body.on(btnClick, vm.hideMenu);
        };

        vm.unbindMenuClick = function () {
            body.off(btnClick);
        };

        vm.hideMenu = function () {
            $scope.$apply(function () {
                model.updateTipisMenuOn(false);
                vm.unbindMenuClick();
            });
        };

        vm.showOverWriteInfo = function () {
            bgtStatusOperations.showModelHelpInfo();
            timeout(vm.bindHelpInfoText);
        };

         vm.bindHelpInfoText = function () {
             if (bgtStatusOperations.getHelpInfoToolTip()) {             
                vm.bindHelpInfo();
            }
        };

         vm.bindHelpInfo = function () {
            body.on(btnClick, vm.hideHelpInfo);
         };


        vm.hideHelpInfo = function () {
            $scope.$apply(function () {
                bgtStatusOperations.setHelpInfo(false);
                vm.unbindMenuClick();
            });
        };

        vm.destroy = function () {          
            model.reset();
            grid.retainFilterState();
            bgtStatusOperations.reset();
            vm.sessionWatch();
            vm.workflowCommon(); 
            vm.gridFactory = undefined;
        };
    
        vm.showData = function(type){
            model.updateTabs(type);
       };

       vm.editModel =function(record){
           model.editModel(record); 
       };

      /* vm.showPopUp = function(record){
            model.showPopUp(record);
       };*/
 
        vm.init();
    }

    angular
        .module('budgeting')
        .controller('BudgetWorkflowStatusCtrl', [
            '$scope',
            'budgetWorkflowStatusModel',
            'rpTabsMenuModel',
            'budgetWorkflowStatusSvc',
            '$filter',
             '$timeout',
             'budgetWorkflowStatusGridFactory',
             'budgetWorkflowStatusOperations',
             'budgetWorkflowStatusErrorHandling',
             'sessionInfo',
             'budgetWorkflowStatusConfig',
             'workflowCommonSVC',
             'rpCookie',
             'budgetWorkflowStatusFormConfig',
            BudgetWorkflowStatusCtrl
        ]);
})(angular);
