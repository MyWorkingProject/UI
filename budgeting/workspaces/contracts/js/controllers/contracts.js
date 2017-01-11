(function (angular) {
    "use strict";

    function ContractsCtrl($scope, model, tabsMenuModel,gridConfig,  gridModel,session,contractOperations,timeout,csvModel,rpCookie) {
        var vm, grid, headers, filters, pagination, pgData, activeWatch, body, btnClick,tabsCookie = rpCookie.read('WorkspaceLink');

        vm = this;

        vm.init = function () {
          
           var tabsMenu = tabsMenuModel();
            vm.model = model;
            vm.contractOperations=contractOperations;
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
            tabsMenu.setOptions([model.getAllContractsFlag(),model.getExpContractsFlag()]);
            vm.tabsMenu = tabsMenu;
            $scope.allContracts = model.getAllContractsFlag();
            $scope.$watch('page.model.form.allcontracts.isActive', vm.getData);
            vm.sessionWatch = session.subscribe("update",vm.getData);
            $scope.$on('$destroy', vm.reset);
            vm.csvRefresh = csvModel.subscribe("load",vm.refreshOnImport);
            vm.selectWatch = $scope.$watch('page.model.state.isSelectAll', vm.toggleSelectAll);
        };

        vm.showData=function(data){
            model.setData(data);
            vm.getData();
        };

        vm.getData = function () {
            if (session.isReady()) { 
                gridConfig.setSrc(vm);
                $scope.gridFactory = gridModel;
                gridModel.loadGridConfig();
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

        vm.deleteContract=function(btnText){
            contractOperations.setPopUpID("");
            contractOperations.hideToolTip();
            // contractOperations.updateToolTip(btnText);
            if ((gridModel.getSelectedRecords()).length > 0) {
                contractOperations.setPopUpID("#alertDialog");           
            }
            else {
                contractOperations.showToolTip();
                //timeout(vm.bindMenu);
            }
        };

         vm.delContract=function(){
            contractOperations.setPopUpID("");

            if(model.state.isSelectAll === true && model.state.selectType === "all") {
                var params = {
                    propertyID: session.getPropertyID()  
                },
                dataFilter = gridModel.getDataFilter();

                contractOperations.bulkDeleteContracts(params, dataFilter);
            } else {
                contractOperations.deleteSelected();
            }
        };

        vm.removeContract=function(btnText){
            contractOperations.hideToolTip(); 
            // contractOperations.updateToolTip(btnText);
            if ((gridModel.getSelectedRecords()).length > 0) { 

                if(model.state.isSelectAll === true && model.state.selectType === "all") {
                    var params = {
                        propertyID: session.getPropertyID()  
                    },
                    dataFilter = gridModel.getDataFilter();

                    contractOperations.bulkRemoveContracts(params, dataFilter);
                } else {
                    contractOperations.removeSelected();
                }
            }
            else {
                contractOperations.showToolTip();
                //timeout(vm.bindMenu);
            }
        };

        vm.toggleSelectAll = function() {
            gridModel.selectAll(model.state.isSelectAll);       
        };

        vm.bindMenu = function () {
            if (contractOperations.isToolTipisMenuOn()) {
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
                contractOperations.updateTipisMenuOn(false);
                contractOperations.hideToolTip();
                vm.unbindMenuClick();
            });
        };       

        vm.reset = function () {
            model.reset();
            vm.sessionWatch();
            vm.selectWatch();
            vm.csvRefresh();
        };

        vm.refreshOnImport = function(){
            csvModel.reset(); 
            model.importContract();
            gridModel.load();
        };

        vm.importContract = function(){
            csvModel.reset();
            model.importContract();
            vm.selectWatch();
            vm.sessionWatch();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('ContractsCtrl', [
            '$scope',
            'contractsModel',
            'rpTabsMenuModel',
            'contractsConfig',
            'contractsGridFactory',
            'sessionInfo',
            'contractOperations',
             '$timeout','contractsCSVModel', 'rpCookie',
            ContractsCtrl
        ]);
})(angular);
