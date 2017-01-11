//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function RentOptionsValidateMethods() {
        var model = {};
    
        /* Validate Income model */

        model.isIncomeModelNone=function(type){
            if (type=="None"){
                    return true;
            }
            return false;
        };

        model.isIncomeModelUnit=function(type){
            if (type=="Unit"){
                    return true;
            }
            return false;
        };

        model.isIncomeModelUnitType=function(type){
            if (type=="Unit type"){
                    return true;
            }
            return false;
        };
        

        model.isIncomeModelServiceGroup=function(type){
            if (type=="Service group"){
                    return true;
            }
            return false;
        };  

        /* Validate Schedule model */

        model.isScheduleMethodNone=function(type){
            if (type=="None"){
                    return true;
            }
            return false;
        };

        model.isScheduleMethodUnit=function(type){
            if (type=="Unit"){
                    return true;
            }
            return false;
        };

        model.isScheduleMethodUnitType=function(type){
            if (type=="Unit type"){
                    return true;
            }
            return false;
        };
        

        model.isScheduleMethodServiceGroup=function(type){
            if (type=="Service group"){
                    return true;
            }
            return false;
        }; 

         /* Validate Loss to lease Method */

        model.isLossToLeaseMethodNone=function(type){
            if (type=="None"){
                    return true;
            }
            return false;
        };

        model.isLossToLeaseMethodWorkSheet=function(type){
            if (type=="Worksheet"){
                    return true;
            }
            return false;
        };

        model.isLossToLeaseMethodServiceGroup=function(type){
            if (type=="Service group"){
                    return true;
            }
            return false;
        };
        

        model.isLossToLeaseMethodMarketScheduleRent=function(type){
            if (type=="MarketScheduleRent"){
                    return true;
            }
            return false;
        }; 


        return model;
    }

    angular
        .module("budgeting")
        .factory('RentOptionsValidateMethods', [                    
            RentOptionsValidateMethods]);
})(angular);
