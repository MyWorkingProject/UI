// New Contract - Properties Wizard Controller

(function (angular) {
    "use strict";

    function ContractPropertiesCtrl($scope, contractModel, cpConstants, propertiesGridModel, 
            glAccountListModel, notifSvc, i18n, rpWatchList, propSvc, pageState, asideModal) {
        var vm = this,
            assignGLAcctsAside,
            addPropertiesAside;

        //filter configurarion
        vm.propertyGridFilter = {
            state: propertiesGridModel.model.filtersModel.state,
            config: cpConstants.gridFilterConfig
        };
        vm.propertiesGridModel = propertiesGridModel.model;

        vm.glaccounts = glAccountListModel;        
        vm.state = contractModel.state.property;
        vm.translate = i18n.translate;

        vm.init = function () {
            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on("$destroy", vm.destroy));

            assignGLAcctsAside = asideModal("assignGLAccounts")
                .done(vm.assignGLAccounts);
            addPropertiesAside = asideModal("addPropertiesOptions")
                .done(vm.addSelectedProperties);

            propertiesGridModel.setSrc(vm);

            propertiesGridModel.initStates(contractModel.model.id);
            propertiesGridModel.load();            
        };

        vm.destroy = function () {
            propertiesGridModel.reset();
            assignGLAcctsAside.destroy();
            addPropertiesAside.destroy();
            vm.watchList.destroy();
        };
        
        vm.isDisplayForm = function() {
            return contractModel.isDisplayForm();
        };

        vm.initAssignGLModal = function() {
            if(propertiesGridModel.isPropsSelected()) {
                var charts = propertiesGridModel.getChartsSelected();                
                propSvc.abort().getCharts(charts).then(vm.showAssignGLModal);
            } else {
                notifSvc.error("bdgt_properties_tool_tip");
            }
        };

        vm.assignGLAccounts = function(response) {
            propertiesGridModel.assignGlToProps(
                response.isOverwriteAssignment, response.masterCharts);
        };

        vm.showAssignGLModal = function(response) {
            var masterChartIDs = [];
            if(response && response.data && response.data.records) {
                angular.forEach(response.data.records, function(curr) {
                    masterChartIDs.push(curr.masterChartID);
                });
            }
            
            var resolveData = {
                assignGLParams: function() {
                    return {
                        masterChartIDs: masterChartIDs
                    };
                }
            };
            assignGLAcctsAside.resolve(resolveData).show();
        };

        vm.addPropertiesAsideModel = function () {
            var resolveData = {
                displayProperties: function () {
                    return {
                        mastarChart: true,
                        dataFilter:''
                    };
                },
                addPropertiesSvc: function () {
                    return propSvc;
                }
            };
            addPropertiesAside
                .resolve(resolveData)
                .show();
        };  

        vm.addSelectedProperties = function (selectedProperties) {
            propertiesGridModel.appendToGrid({
                data: {
                    records: selectedProperties
                } 
            });
        }; 

        vm.confirmDeleteProperty = function(record) {
            propertiesGridModel.setActiveProperty(record);
            notifSvc.confirmDialog("bdgt_properties_del_title", "bdgt_properties_del_ask",
                vm.deleteProperty);
        };

        vm.deleteProperty = function() {
            propertiesGridModel.deleteProperty();
            $scope.$apply();
        };

        vm.toggleGLSelector = function(record) {
            propertiesGridModel.editGLAccount(record);
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("ContractPropertiesCtrl", [
            "$scope",
            "contractModel",
            "contractPropsConstantModel",
            "propertiesGridModel",
            "glAcctListModel",
            "contractNotifSvc",
            "contractTranslatorSvc",            
            "rpWatchList",
            "contractPropertiesSvc",
            "pageState",
            "rpBdgtAsideModalService",
            ContractPropertiesCtrl
        ]);
})(angular);
