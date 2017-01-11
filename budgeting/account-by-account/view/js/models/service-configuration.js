//AccountByAccountView Model


(function (angular) {
    "use strict";

    function serviceConfiguration(viewModel,svc) {     
        var model = {};
        
         model.getMonthlyViewData = function () {
            //var url= model.buildMonthlyViewURL(); 
            var data=viewModel.prepareReqObjectForSVC();          
            return svc.getMonthlyViewData(data).$promise;
        };



        model.buildMonthlyViewURL=function(){
            var data=viewModel.prepareReqObjectForSVC();
            
           var url= "/api/budgeting/coa/accountbyaccount?" +
            "accountbyaccountPref.distributedID="+ data.distributedID + "&" + 
            "accountbyaccountPref.budgetModelID="+data.BudgetModelID  + "&" +  
            "accountbyaccountPref.propertyID="+data.propertyID  + "&" + 
            "accountbyaccountPref.hasReferenceRows="+data.hasReferenceRows + "&" + 
            "accountbyaccountPref.hideZeroRows="+data.hideZeroRows  + "&" + 
            "accountbyaccountPref.gridViewType="+data.gridViewType + "&" + 
            "accountbyaccountPref.firstReferenceData="+data.firstReferenceData + "&" + 
            "accountbyaccountPref.forecastUseData="+data.forecastUseData  + "&" + 
            "accountbyaccountPref.rollingActual="+data.rollingActual  + "&" + 
            "accountbyaccountPref.accountTypeID="+data.accountTypeID  + "&" + 
            "accountbyaccountPref.accountCategoryID="+data.accountCategoryID  + "&" + 
            "accountbyaccountPref.masterChartID="+data.masterChartID ;

            return url;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('serviceConfiguration', [ 
                                            'accountByAccountView', 
                                            'accountByAccountSVC',
                                             serviceConfiguration]);
})(angular);
