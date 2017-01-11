//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function validateConventional(RentOptionSettings,exHandling,notifications, $filter,validateInpMethods) {
        var model = {},data;      
         model.baseParams = {   
              
               validMarketRentGl:true,
               validActualRentGL: true,
               eitherOfGlFlag: true,
               flgSaveConventional: true

        };
        
       model.saveValidations = {};

       angular.copy(model.baseParams, model.saveValidations);       

        model.validateConventional=function(){
             data=RentOptionSettings.getRentOptionObject();
          //   model.validateMarketRentForConv();
           //  model.validateActualRentForConv();
             model.validateLossGain();
             model.setValidationFlagsForConv();
        };

        model.isMarketRentMethod=function(){
            if(!validateInpMethods.isIncomeModelNone(data.records.rentOptions.incomeModel)){
                return true;
            }
            else{
                return false;
            }
        };

        model.isMarketRentGl=function(){
            var  mrRecords=  $filter('filter')(data.records.marketRentGLAccounts, { glAccountNumber: ''}, true);
            if(mrRecords.length>0){
                return false;
            }
            else{
                return true;
            }
        };

        model.setValidMarketRentGL=function(flag){
            model.saveValidations.validMarketRentGl=flag;
        };

         model.isValidMarketRentGL=function(){
           return model.saveValidations.validMarketRentGl;
        };


        /* Setting actual rent gl Flags */
        model.isActualRentMethod=function(){            
            if(!validateInpMethods.isScheduleMethodNone(data.records.rentOptions.scheduleRentMethod)){
                return true;
            }
            else{
                return false;
            }
        };

        model.isActualRentGl=function(){
            var  arRecords=  $filter('filter')(data.records.scheduleRentGLAccounts, { glAccountNumber: ''}, true);
            if(arRecords.length>0){
                return false;
            }
            else{
                return true;
            }
        };

        model.setValidActualRentGL=function(flag){
            model.saveValidations.validActualRentGL=flag;
        };

         model.isValidActualRentGL=function(){
            return model.saveValidations.validActualRentGL;
         };

        //setEitherOfGlFlag
         model.setEitherOfGlFlag = function (flag) {
             model.saveValidations.eitherOfGlFlag = flag;
         };

         model.isEitherOfGlFlag = function () {
             return model.saveValidations.eitherOfGlFlag;
         };
        
        /* validation for Market Gl Conditions */

         // model.validateMarketRentForConv=function(){
         //       if(model.isMarketRentMethod()){
         //           if(model.isMarketRentGl()){
         //               model.setValidMarketRentGL(true);
         //           }
         //           else {
         //               model.setValidMarketRentGL(false);
         //           }
         //       }
         //       else{
         //           model.setValidMarketRentGL(true);
         //       }
         //};

            

        /* validation for Actual Gl Conditions */
        // model.validateActualRentForConv=function(){
        //    if(model.isActualRentMethod()){
        //        if(model.isActualRentGl()){
        //            model.setValidActualRentGL(true);
        //        }
        //        else{
        //            model.setValidActualRentGL(false);
        //        }
        //    }
        //    else{
        //        model.setValidActualRentGL(true);
        //    }
        //};

           /* Setting Loass To lease gl Flags */
        model.validateLossGain=function(){
                if(model.isLossGainMethod()){
                    if(model.isLossGainGl()){
                        model.setValidLossGainGL(true);
                    }
                    else {
                        model.setValidLossGainGL(false);
                    }
                }
                else{
                    model.setValidLossGainGL(true);
                }
         };

        model.isLossGainMethod=function(){
            if(!validateInpMethods.isLossToLeaseMethodNone(data.records.rentOptions.lossToLeaseMethod)){
                return true;
            }
            else{
                return false;
            }
        };

        model.isLossGainGl=function(){
            if ((data.records.rentOptions.lossToLeaseGLAccount !== "" && data.records.rentOptions.lossToLeaseGLAccount !== undefined) || (data.records.rentOptions.gainToLeaseGLAccount !== "" && data.records.rentOptions.gainToLeaseGLAccount !== undefined)) {
                return true;
            }
            else{
                return false;
            }
        };

         model.setValidLossGainGL=function(flag){
            model.saveValidations.ValidLossGainGL=flag;
        };

         model.isValidLossGainGL=function(){
            return model.saveValidations.ValidLossGainGL;
         };

         model.marketAndScheduleRentValidations = function () {
             if (!model.isMarketRentMethod() && !model.isActualRentMethod()) {
                 /*Both market rent and actual rent are NONE */
                 return true;
             }
             else if (model.isMarketRentMethod() && !model.isActualRentMethod()) {
                 /* Market Rent is not None and actual rent is None,
                 so Market Rent should not be empty */
                 if (model.isMarketRentGl()) {
                     return true;
                 }
                 model.setValidMarketRentGL(false);
                 return false;
             }
             else if (!model.isMarketRentMethod() && model.isActualRentMethod()) {
                 /* Market Rent is  None and actual rent is not None,
                 so actual Rent should not be empty */
                 if (model.isActualRentGl()) {
                     return true;
                 }
                 model.setValidActualRentGL(false);
                 return false;

             }
             else if (model.isMarketRentMethod() && model.isActualRentMethod()) {
                 /* Market Rent is not None and actual rent is not None,
                 so either of the one can be empty */
                 if (model.isMarketRentGl() || model.isActualRentGl()) {
                     return true;
                 }
                 model.setEitherOfGlFlag(false);
                 return false;

             }
         };

        
        model.setValidationFlagsForConv=function(){
            if ((model.marketAndScheduleRentValidations()) && model.isValidLossGainGL()) {
                    model.saveValidations.flgSaveConventional=true;
            }
            else if (!model.marketAndScheduleRentValidations() || !model.isValidLossGainGL()) {
                    model.saveValidations.flgSaveConventional=false;
            } 
        } ;

        model.isConventionalSave=function(){
                return model.saveValidations.flgSaveConventional;
          };

          model.showValidations=function(){ 
              if (!model.isEitherOfGlFlag()) {
                  exHandling.validateBothGL();
            }        
            else if (!model.isValidMarketRentGL()) {
                  exHandling.validateMarketRentGL();
            }
            else if (!model.isValidActualRentGL()) {
                exHandling.validateActualRentGL();
            }
            else if (!model.isValidLossGainGL()) {
                exHandling.validateLossGain();
            }
        };
      
       model.reset = function () {
           angular.copy(model.baseParams, model.saveValidations);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('validateConventional', [       
                            'RentOptionSettings', 
                            'rentOptionsErrorHandling',                              
                            'rentOptionsNotifications',  
                            '$filter',
                            'RentOptionsValidateMethods',         
                             validateConventional]);
})(angular);
