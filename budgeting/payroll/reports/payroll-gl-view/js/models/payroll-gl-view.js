//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function PayrollglView(langTranslate,svc,budgetDetails,$location,$stateParams) {
        var translate;
        translate = langTranslate('payrollReportViewTabs').translate;

        var model = {};

        
         model.form={
              payrollHeaders:{}           
            };      

    
         model.getPayrollglHeaders=function(){ 
             var data=model.getPayrollHeaderData(); 
             return svc.getPayrollHeaders(data).$promise;
        };

        model.getPayrollHeaderData=function(){
            return {
                     propertyID: budgetDetails.getModelDetails().propertyID,            
                     budgetModelID: budgetDetails.getModelDetails().budgetModelID,
                };
           
        };

         model.updateHeaderData = function (data) {
            angular.extend(model.form.payrollHeaders, data); 
        };

        model.getHeaderData=function(){
            return model.form.payrollHeaders;
        };

        model.getPayrollglData=function(){ 
              var params = {
                distributedID: budgetDetails.getModelDetails().distributedID
            }; 
             return svc.getPayrollglData(params);
        };  

         return model;
    }
    angular
        .module("budgeting")
        .factory('PayrollglView', [          
            'appLangTranslate',
            'payrollglSvc',
            'budgetDetails',
            '$location',
            '$stateParams',
            PayrollglView]);
})(angular);
