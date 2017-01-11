//  Users List Model

(function (angular) {
    "use strict";

    function factory(gridModel, gridConfig, reportsSvc,BdgtReportsListModel,exception,$window,$filter) {
        var gridModelCustReports,gridModelStdReports,
            model = {};
            model.request="all";

        model.reset = function(){
            model.request="all";
        };

        model.init = function () {
            gridModelCustReports = model.gridModelCustReports = gridModel();
            gridModelCustReports.subscribe('sortBy', model.sortByCust);

            gridModelStdReports = model.gridModelStdReports = gridModel();
            gridModelStdReports.subscribe('sortBy', model.sortByStand);

            //gridModelView.subscribe('filterBy', model.load);
            //gridModelReports.subscribe('paginate', model.paginate);
            gridModelCustReports.setConfig(gridConfig).setEmptyMsg("No results were found");
            gridModelStdReports.setConfig(gridConfig).setEmptyMsg("No results were found");
            return model;
        };
       

         model.loadModelStdReport = function () {
            var data = gridModelStdReports.busy(true).flushData().getQuery();
            if(model.request==="all" || model.request==="fav"){
                return BdgtReportsListModel.getStandardReports(data).success(model.setStdGridData, exception.getDefReportsException);
            }
            else{
               return BdgtReportsListModel.getRecentReports(data).success(model.setStdCustRecGridData, exception.getDefReportsException);
           }
        };

        
        model.loadModelCustReport = function () {
            var data = gridModelCustReports.busy(true).flushData().getQuery();
            if(model.request==="all" || model.request==="fav"){
                return BdgtReportsListModel.getCustomReports(data).success(model.setCustGridData, exception.getCustReportsException);
            }
        };


        model.sortByCust = function () {
            var sortObj = gridModelCustReports.getQuery();
            sortObj = sortObj.replace("?datafilter=","");
            sortObj = $window.atob(sortObj);
           
             var gridData = model.request==="fav" ? model.getFavReports(BdgtReportsListModel.getCustomReportsData()) : BdgtReportsListModel.getCustomReportsData();
             var sortedData = model.getSortedData(gridData,sortObj); 
             model.setCustGridData(sortedData,false);
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


        model.sortByStand = function () {
            
            var sortObj = gridModelStdReports.getQuery();
            sortObj = sortObj.replace("?datafilter=","");
            sortObj = $window.atob(sortObj);
           
             var gridData = model.request==="fav" ? model.getFavReports(BdgtReportsListModel.getStandardReportsData()) : BdgtReportsListModel.getStandardReportsData();
             var sortedData = model.getSortedData(gridData,sortObj); 
             model.setStdGridData(sortedData,false);
         
        };

        model.sortRecStandData = function(response){
             var finalResponse = model.getRecData(response);
             model.setRecStdData(finalResponse.stdResponse); 
        };

        model.sortRecCustData = function(response){
             var finalResponse = model.getRecData(response);   
             model.setRecCustData(finalResponse.custResponse);   
        };
        

        model.setStdGridData = function (response,val) {
           var stdResponse = {records:[]} ;  
           if(val===undefined){
             val = true;
           }
           if(model.request ==="all"){ 
                gridModelStdReports.setData(response).busy(false);
                BdgtReportsListModel.setStandardReports(response,val);
           }
           else{
               stdResponse = model.getFavReports(response);  
               BdgtReportsListModel.setStandardReports(stdResponse,val); 
               gridModelStdReports.setData(stdResponse).busy(false); 
           } 
        };

        model.getFavReports = function(response){
            var returnResponse = {records:[]} ;  
             angular.forEach(response.records, function (item) {
                if(item.isFavorite){
                    returnResponse.records.push(item);
                }
             });   
            return returnResponse;
       };

        model.setStdCustRecGridData = function (response) {
           var finalResponse = model.getRecData(response) ;
           BdgtReportsListModel.setStandardReports(finalResponse.stdResponse,true); 
           BdgtReportsListModel.setCustomReports(finalResponse.custResponse,true); 
           model.setRecCustData(finalResponse.custResponse);
           model.setRecStdData(finalResponse.stdResponse); 
           
        };

       model.getRecData = function(data) {
            var finalResponse = {stdResponse:{records:[]},
                                custResponse:{records:[]} 
                               }; 
        
           angular.forEach(data.records, function (item) {
                if(item.type==="Custom"){
                    finalResponse.custResponse.records.push(item);
                }
                else{
                    finalResponse.stdResponse.records.push(item);
                }
            }); 
        return finalResponse;
       };

        model.setRecCustData = function(data){
            gridModelCustReports.setData(data).busy(false);
        };

        model.setRecStdData = function(data){
            gridModelStdReports.setData(data).busy(false);
        };

        model.setCustGridData = function (response,val) {
           var stdResponse = {records:[]} ;  
           if(val===undefined){
             val = true;
           } 
           if(model.request === "all"){ 
                gridModelCustReports.setData(response).busy(false);
                BdgtReportsListModel.setCustomReports(response,val);
           }
           else{
               stdResponse = model.getFavReports(response);
               BdgtReportsListModel.setCustomReports(stdResponse,val);      
               gridModelCustReports.setData(stdResponse).busy(false); 
           } 
        };

       
        model.addGridStdData = function (response) {
            gridModelStdReports.addData(response).busy(false);
        };

        model.addGridCustData = function (response) {
            gridModelCustReports.addData(response).busy(false);
        };

        model.setGridFilterState = function (state) {
            return model;
        };


        model.loadReports = function(val){
            model.request=val;
            model.loadModelStdReport(); 
            model.loadModelCustReport(); 
        };

        model.updateList = function(record){
            if(model.request === "fav"){
                 model.refreshData(record);
            }
        };

        model.refreshData = function(record){
            var reportType = "";
            if(record.type!==undefined && record.type!==""){
                    reportType = record.type;
            }
            else if(record.reportType!==undefined && record.reportType!==""){
                reportType="Default";
            }
            else{
                reportType="Custom";    
            }

            if(reportType === "Default"){
               model.loadModelStdReport();
            }
            else if(reportType === "Custom"){
                model.loadModelCustReport();
            }
        };

       model.updateGridData = function(reportName){
            if(reportName!=="" && reportName!==undefined){
                model.updateSearchData();
            }
            else{
                model.setRecStdData(BdgtReportsListModel.getOrgStandardReportsData());
                model.setRecCustData(BdgtReportsListModel.getOrgCustomReportsData());    
           }        
       };

       model.updateSearchData = function(){
            if(model.request === "fav"){
                model.setRecStdData(model.getFavReports(BdgtReportsListModel.getStandardReportsData()));
                model.setRecCustData(model.getFavReports(BdgtReportsListModel.getCustomReportsData()));
            }
            else{
                model.setRecStdData(BdgtReportsListModel.getStandardReportsData());
                model.setRecCustData(BdgtReportsListModel.getCustomReportsData());
            }
       };

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('budgetReportsGridFactory', [
            'rpGridModel',
            'budgetReportsConfig',           
            'budgetReportsSvc',    
            'BdgtReportsListModel', 
            'budgetReportsErrorHandling',
            '$window',
            '$filter',
            factory
        ]);
})(angular);
