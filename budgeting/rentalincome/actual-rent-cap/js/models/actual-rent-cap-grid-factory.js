
(function (angular) {
    'use strict';

    function factory(rpGridModel, gridConfig, svc, $filter,exHandling, capModel, formConfig) {
        var model, translate, grid, filterState,gridModel = null ;
        model = {};
        model.filterState= false;
        model.gridData = {
            records: ""
        };
        model.capModel = capModel;
       
        var noResultsMsg ="No results were found";
                   
       
        model.init = function () {
            model.grid = gridModel = rpGridModel();
            //gridModel.capState = capModel.getState(); //used by grid templates
            gridModel.setConfig(gridConfig).setEmptyMsg(noResultsMsg);
            return model;
        };
       

        model.setSrc = function (controller) {
            gridConfig.setSrc(controller);
        };

        
        model.load = function () {
            //capModel.init();
            gridModel.capState = capModel.getState(); //used by grid templates 
            gridModel.formConfig = formConfig;
            var data = gridModel.busy(true).flushData().getQuery();
            capModel.getActualRentCap(data).success(model.setGridData,exHandling.onGetError);
            //svc.getRuleBaseComments(params,data).success(model.setGridData,exHandling.onGetError);//;, exHandling.getBdgtWorkflowStatusException);
        };

      
        model.setGridData = function (response) {
           // model.setSelectColumn(response);
            capModel.setActualRentCapData(response);
            var gridData = {records:[]}; 
            gridData.records = response.records.actualRentCapValueData;
            //ruleModel.updateModelData(response);
            gridModel.setData(gridData).busy(false);
        };

        model.setSelectColumn = function (data) {
            angular.forEach(data.records, function (item) {
                item.isSelected = false;
                item.statusPer = Math.floor((Math.random() * 100) + 1);
            });
        };

        model.reset = function() {
            gridModel.flushData();
            //gridModel.ruleState = null; 
            //grid.propertiesList = null;
            //grid.selectedProps = null;
        };
        

        return model.init();
    }
    angular
        .module('budgeting')
        .factory('actualRentCapFactory', [
            'rpGridModel',
            'actualRentCapConfig',
            'actualRentCapSvc',
            '$filter',
            'actualRentCapError',
            'actualRentCapModel',
            'actual-rent-cap-config',
            factory
        ]);
})(angular);