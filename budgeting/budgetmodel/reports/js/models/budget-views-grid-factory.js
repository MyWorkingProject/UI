//  Users List Model

(function (angular) {
    "use strict";

    function factory(gridModel, gridConfig, reportsSvc,BdgtReportsListModel,$window,$filter) {
        var gridModelView,
            model = {};

        model.init = function () {
            gridModelView = model.gridModelView = gridModel();
            gridModelView.subscribe('sortBy', model.sortBy);
            gridModelView.setConfig(gridConfig).setEmptyMsg("No results were found");
            return model;
        };
       

         model.loadModelView = function () {
            return BdgtReportsListModel.getModelDetails().then(model.setGridData);//,exception.getTasksException);
        };

        model.sortBy = function () {

            var sortObj = gridModelView.getQuery();
            sortObj = sortObj.replace("?datafilter=","");
            sortObj = $window.atob(sortObj);
           
             var gridData = BdgtReportsListModel.getModelViewData();
             var sortedData = model.getSortedData(gridData,sortObj); 
             gridModelView.setData(sortedData).busy(false);
            
        };

        model.getSortedData = function(data,sortObj){
            var sortedData={};
            sortObj = JSON.parse(sortObj);
            if(sortObj.sortBy.reportName!=="" && sortObj.sortBy.reportName!==undefined){
                sortedData =  $filter('orderBy')(data.records,"reportName",sortObj.sortBy.reportName==="ASC"?false:true);
            }
            else if(sortObj.sortBy.description!=="" && sortObj.sortBy.description!==undefined){
                sortedData =  $filter('orderBy')(data.records,"description",sortObj.sortBy.description==="ASC"?false:true);
            }
            return {records:sortedData};
        };    

        model.setGridData = function (response) {
            var data = BdgtReportsListModel.setViewDetails(response);
            gridModelView.setData(data).busy(false);
        };

        model.setSelectColumn = function (data) {
            angular.forEach(data.records, function (item) {
                item.isSelected = false;
            });
        };

        model.addGridData = function (response) {
            model.setSelectColumn(response);
            gridModelView.addData(response).busy(false);
        };

        model.setGridFilterState = function (state) {
            gridModelView.setFilterState(state);
            return model;
        };

        model.resetGridData= function(){
            BdgtReportsListModel.resetViewDetails();
            model.bindData();
        };

        model.bindData = function(){
            gridModelView.setData(BdgtReportsListModel.getModelViewData()).busy(false);
        };

        model.setGridViewData = function(reportName){
            if(reportName!=="" && reportName!== undefined){
                model.bindData();
            }
            else{
                model.resetGridData();
            }
        };

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('budgetViewsGridFactory', [
            'rpGridModel',
            'budgetViewsConfig',           
            'budgetReportsSvc',    
            'BdgtReportsListModel',
            '$window',
            '$filter',       
            factory
        ]);
})(angular);
