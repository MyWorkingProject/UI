//  Budgeting Overview List Model

(function (angular) {
    "use strict";

    function BdgtReportsListModel($filter,$location,langTranslate,budgetModelSVC,reportsSVC,sessionSvc) {
        var model = {},translate;
        translate = langTranslate('budgetReports').translate;
        model.reportName="";
        model.placeHolder={
            reportName:translate('bdgt_reports_searchPlaceText'),
        };
        model.text={
            searchBtn:translate('bdgt_reports_searchBtnText'),
            modelPackage:translate('bdgt_reports_packageText'),
            narrative:translate('bdgt_reports_narrativeText'),
            reportGrps:translate('bdgt_reports_reportGrpsText'),
            portfolio:translate('bdgt_reports_portfolioText'),
            multiYear:translate('bdgt_reports_multiYearText'),
            allReports:translate('bdgt_reports_allReportsText'),
            reports:translate('bdgt_reports_reportsText'),
            all:translate('bdgt_reports_reportsAllText'),
            favText:translate('bdgt_reports_reportsFavText'),
            recText:translate('bdgt_reports_reportsRecText'),
            mdlViewText:translate('bdgt_reports_reportsViewsText'),
            custRptsText:translate('bdgt_reports_reportsCustText'),
            stdRptsText:translate('bdgt_reports_reportsStandText')
        };
        model.isScrhd = false;
        model.intialLoad = true;
        model.distID=0;
        model.originalData={viewData:[]};
        model.showAll=true;
        model.showFav=false;
        model.showRec=false;
       
        model.reportsData={
            viewData:[
                    {
                        "reportName": "Detail View",
                        "description": "Model Detail view displays all accounts that are for a selected property, Model, and year",
                        "url": "#"
                    },
                    {
                       "reportName": "Summary",
                        "description": "Model Summary view displays all account categories that are for a selected property, Model, and year",
                        "url": "#"
                    }
          ],
         standardReports : [],   
         customReports : []
       };
         
      model.standardReports={};  
      model.orgStandardReports={};  
      model.customReports={};  
      model.orgCustomReports={};    
      model.reportsViewData={};  
      model.orgReportsViewData={};       

        angular.copy(model.reportsData.viewData,model.originalData.viewData);
        
        model.isLink = function (data) {
            return data.url !== undefined;
        };

        model.updatedSrchd = function(val){
            model.isScrhd = val;
        };

        model.getModelViewData = function(){
              var response={};
              response.records =  model.reportsData.viewData;   
              return   response;
        };

        model.getReports=function(){
               //Should call service and data should be returned
               //return model.listData;
               model.setModelViewDetails();
        };

        model.reset = function () {
            model.reportName="";
            model.showAll=true;
            model.showFav=false;
            model.showRec=false;
            model.standardReports={};  
            model.orgStandardReports={};  
            model.customReports={};  
            model.orgCustomReports={}; 
            model.isScrhd = false; 
            model.text.allReports = translate('bdgt_reports_allReportsText');
            angular.copy(model.originalData.viewData,model.reportsData.viewData);
        };

        model.setStandardReports = function(data,cpyOrg){
            model.standardReports = data;
            if(cpyOrg){
                model.orgStandardReports = {records:[]};
                angular.copy(data.records,model.orgStandardReports.records);// = data;  
            }
        };

       model.getStandardReportsData = function(){
             return model.standardReports;
       };

       model.getCustomReportsData = function(){
            return model.customReports;
       };

       model.getOrgStandardReportsData = function(){
             return model.orgStandardReports;
       };

       model.getOrgCustomReportsData = function(){
            return model.orgCustomReports;
       }; 

        model.restoreStandardReports = function(){
            angular.copy(model.standardReports,model.orgStandardReports);
        };

        model.setCustomReports = function(data,cpyOrg){
            model.customReports = data;
            if(cpyOrg){
               model.orgCustomReports = {records:[]};
               angular.copy(data.records,model.orgCustomReports.records);// = data;  
            }
        };

        model.restoreCustomReports = function(){
            angular.copy(model.customReports,model.orgCustomReports);
        };

       model.getReportName = function(){
            return model.reportName;
       };

       model.resetReportName = function(){
            model.reportName="";
       };   

        model.navigateReport=function(reportType){
           if(reportType==="Package") {
                $location.path("/#");
           }
           else if(reportType==="Narrative") {
                $location.path("/#");
           }
           else if(reportType==="reportGrps") {
                $location.path("/#");
           }
           else if(reportType==="portfolio") {
                $location.path("/#");
           }
           else if(reportType==="multiYear") {
                $location.path("/#");
           }
        };

        model.search=function(){
            model.intialLoad = false;
            if(model.reportName!==""){
                model.filterRecords(model.reportName);
            }
        };

        model.filterRecords=function(reportName){
            var srchStandRecords=[];
            reportName=reportName.toLowerCase();
            angular.forEach(model.orgStandardReports.records,function(item){
                 model.addData(srchStandRecords,item,reportName);
            });
            model.standardReports.records=srchStandRecords;
    
            var srchCustRecords=[];
            angular.forEach(model.orgCustomReports.records,function(item){
                 model.addData(srchCustRecords,item,reportName);
            });
            model.customReports.records=srchCustRecords; 

            var srchViewRecords=[];
            angular.forEach(model.orgReportsViewData.records,function(item){
                 model.addData(srchViewRecords,item,reportName);
            });
            model.reportsData.viewData=srchViewRecords; 
        };
        

        model.addData=function(srchRecords,item,srchWord){
            if(item.reportName.toLowerCase().indexOf(srchWord)>=0){
                srchRecords.push(item);
            }
            
        };

        model.getSubItem=function(reportItem){
             var newItem={
                    name:reportItem.name,
                    summary:reportItem.summary,
                    url:reportItem.url
                };
                return newItem;
        };

        model.showAll=function(){
            if(model.reportName===""){
                angular.copy(model.originalData,model.listData);
            }
        };

        model.setDistID = function(distID){
            model.distID = distID;
        };
        
        model.getModelDetails = function () {
            var params = {
                distID: model.distID
            };
            return budgetModelSVC.getPropertyModelDetails(params).$promise;
        };

        model.setModelViewDetails =function(){
             model.getModelDetails().then(model.setViewDetails);
        };

        model.setViewDetails = function (resp) {
            angular.forEach(model.reportsData.viewData,function(reportItem) {
                  reportItem.reportName = resp.records.budgetType + " " + reportItem.reportName; 
                });
            model.orgReportsViewData = {records:[]};
            angular.copy(model.reportsData.viewData,model.orgReportsViewData.records); 
            return model.getModelViewData();
        };

       model.resetViewDetails = function(){
          angular.copy(model.orgReportsViewData.records,model.reportsData.viewData);   
       };
      
        model.getStandardReports = function(data){
           var params = {parentSiteID : sessionSvc.getPropertyID()}; 
            return reportsSVC.getStandardReports(params, data);
        };

        model.getRecentReports = function(data){
             return reportsSVC.getRecentReports(data);
        };

        model.getCustomReports = function(data){
             return reportsSVC.getCustomReports(data);
        };

        model.leftNav = function(val){
            model.intialLoad = true;
            if(val==="all"){
                model.showAll=true;
                model.showFav=false;
                model.showRec=false;
                model.text.allReports = translate('bdgt_reports_allReportsText'); 
            }
            else if(val==="fav"){
                model.showAll=false;
                model.showFav=true;
                model.showRec=false;
                model.text.allReports = translate('bdgt_reports_favReportsText'); 
            }
            else{
                model.showAll=false;
                model.showFav=false;
                model.showRec=true; 
                model.text.allReports = translate('bdgt_reports_recReportsText');
            }     
        };

       model.getFavReports = function(){
            
       };

       model.getRecFavReports = function(){
            
       };   

        return model;
    }

    angular
        .module("budgeting")
        .factory('BdgtReportsListModel', ['$filter','$location','appLangTranslate',
        'BdgtModelSvc','budgetReportsSvc','sessionInfo', BdgtReportsListModel]);
})(angular);
