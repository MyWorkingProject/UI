//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function RentOptionsSave(RentOptionSettings, exHandling, rentOptionsSvc, notifications, $filter, validateConventional, validateAffordable, seniorValidation, RentOptionsModel, validateInpMethods, budgetDetails) {
        var model = {};

         model.baseParams = {   
               mrGLPercentage:false,
               arGLPercentage:false,
               mrGLAccount:false,
               arGLAccount:false,
               permitSave:false

        };
        
       model.saveSettings = {};

       angular.copy(model.baseParams, model.saveSettings);

       model.saveRentOption = function (data) {
           var flag;
            data=  model.getDataToPost(data);
            if(RentOptionSettings.isConventionalType() || RentOptionSettings.isStudentLivingType()){
                model.saveConventional(data);
            }
            else if(RentOptionSettings.isAffordableType()){
                 model.saveAffordable(data);
            }
            else if(RentOptionSettings.isSeniorLivingType()){
                model.saveSeniorLiving(data);
            }
      
       };

        model.saveConventional=function(data){
            validateConventional.validateConventional();              
            if(validateConventional.isConventionalSave()){
                model.saveOptions(data);
                RentOptionsModel.cancel();              
            }
            else{
                validateConventional.showValidations();
                validateConventional.reset();              
            }
        };

        model.saveSeniorLiving=function(data){
             seniorValidation.validateSeniorLiving();              
            if(seniorValidation.isSeniorLivingSave()){
                model.saveOptions(data);
                seniorValidation.reset();
                RentOptionsModel.cancel();
            }
            else{
                seniorValidation.showValidations();
                seniorValidation.reset();
            }
        };

       model.saveAffordable=function(data){
            validateAffordable.validateAffordable();              
            if(validateAffordable.isAffordableSave()){
                model.saveOptions(data);
                validateAffordable.reset();
                RentOptionsModel.cancel();
            }
            else{
                validateAffordable.showValidations();
                validateAffordable.reset();
            }
        };

        model.flgSaveConventional=function(data){
            model.validateConventionalType(data);
        };
        

        model.getDataToPost=function(data){
           return model.prepareDataToSave(data);
        };

       model.saveOptions=function(data){
           // var postData= model.getDataToPost(data);
            model.saveRentOptionsPromise(data).then(model.onSaveSuccess,exHandling.onSaveException);
        };
        
        model.saveRentOptionsPromise = function (data) {           
                return rentOptionsSvc.saveRentOptions(data).$promise;
           
        };
       
        model.onSaveSuccess=function(resp){             
            notifications.showSuccessNotification("Rent Options Saved Successfully");  
            RentOptionsModel.setLabelOnEdit(RentOptionSettings.getRentOptionObject().records.rentOptions);
            budgetDetails.forceLoad();
          //  RentOptionSettings.addExtraPropToData();
        };

       model.prepareDataToSave=function(data){
           var dataToSave;
          if( model.isAffordableOrConventional(data.records.rentOptions)){
              dataToSave= model.prepareCAData(data);
            }
           else{
              dataToSave=  model.prepareSLData(data);
            }
           return model.preparePostData(dataToSave);           
        };

        model.preparePostData=function(data){
            var postData={};
             angular.copy(data.records, postData);
            return postData;
        };
        
        model.prepareCAData=function(data){
           model.updateObjWithLossGain(data);
           model.updateGLForNoneInputType(data);
            return data;
        };

        model.updateObjWithLossGain=function(data){         
           model.addDataToLossToLease(data);
            data.records.rentOptions.gainToLeaseGLAccount=RentOptionSettings.rentSettings.gainToLease.glAccountNumber;
            data.records.rentOptions.gainToLeaseGLDescription=RentOptionSettings.rentSettings.gainToLease.glAccountDescription;
         return data;
        };
        
        model.addDataToLossToLease=function(data){
             data.records.rentOptions.lossToLeaseGLAccount=RentOptionSettings.rentSettings.lossToLease.glAccountNumber;
            data.records.rentOptions.lossToLeaseGLDescription=RentOptionSettings.rentSettings.lossToLease.glAccountDescription;
        };

       model.updateGLForNoneInputType=function(data){
            model.updateGLMRForNone(data);
            model.updateGLARForNone(data);
            model.updateLossGainGLForNone(data);
       };

        model.updateGLMRForNone=function(data){
            if(validateInpMethods.isIncomeModelNone(data.records.rentOptions.incomeModel)){
                //update gl
                data.records.marketRentGLAccounts=[];
            }    
        };

        model.updateGLARForNone=function(data){
            if(validateInpMethods.isScheduleMethodNone(data.records.rentOptions.scheduleRentMethod)){
                //update gl
                data.records.scheduleRentGLAccounts=[];
            }
        };

       model.updateLossGainGLForNone=function(data){
            if(validateInpMethods.isLossToLeaseMethodNone(data.records.rentOptions.lossToLeaseMethod)){
                 model.emptyLossLeasData(data);
                data.records.rentOptions.gainToLeaseGLAccount="";
                data.records.rentOptions.gainToLeaseGLDescription="";
                RentOptionSettings.rentSettings.gainToLease.glAccountNumber = "";
                RentOptionSettings.rentSettings.gainToLease.glAccountDescription = "";

                RentOptionSettings.rentSettings.lossToLease.glAccountNumber = "";
                RentOptionSettings.rentSettings.lossToLease.glAccountDescription = "";
            }
           
        };

        model.emptyLossLeasData=function(data){
               data.records.rentOptions.lossToLeaseGLAccount="";
                data.records.rentOptions.lossToLeaseGLDescription="";
        };

        model.prepareSLData=function(data){  
            model.updateMRObjectByInputType(data);
            model.updateARObjectByInputType(data);
            model.updateLeaseObjectByInputType(data);
           return data;
        };

        /*update data for serive group and senior living for Market Rent */
        model.updateMRObjectByInputType=function(data){
           if(RentOptionSettings.getMRFlag()){
                model.updateSGObjectWithMR(data);
            }
            else{
                 model.updatMRObjForNonSL(data);
            }
        };

        /*update data for serive group and senior living for Actual Rent */
         model.updateARObjectByInputType=function(data){
           if(RentOptionSettings.getARFlag()){
                model.updateSGObjectWithAR(data);
            }
            else{
                 model.updatARObjForNonSL(data);
            }
           
        };

        /*update data for serive group and senior living for Loss To Lease */
         model.updateLeaseObjectByInputType=function(data){
           if(RentOptionSettings.getlossToLeaseFlag()){
                 model.updateSGObjectWithLossToLease(data);
            }
            else{
                 model.updatLossGainObjForNonSL(data);
            }
        };
            
        model.updatMRObjForNonSL=function(data){
                if(validateInpMethods.isIncomeModelNone(data.records.rentOptions.incomeModel)){
                      data.records.marketRentGLAccounts=[];
                       model.updatePropObjForMR(data);
                }
                else{
                    model.updatePropObjForMR(data);
                }
        };

         model.updatARObjForNonSL=function(data){
                if(validateInpMethods.isScheduleMethodNone(data.records.rentOptions.scheduleRentMethod)){
                      data.records.scheduleRentGLAccounts=[];
                      model.updatePropObjForAR(data);
                }
                else{
                    model.updatePropObjForAR(data);
                }
           
        };

         model.updatLossGainObjForNonSL=function(data){
            if(validateInpMethods.isLossToLeaseMethodNone(data.records.rentOptions.lossToLeaseMethod)){
                    model.emptyLossLeasData(data);
                    model.updatePropObjForLossToLease(data);
            }
            else{
                model.addDataToLossToLease(data);
                model.updatePropObjForLossToLease(data);
            }
        };
        

        model.updatePropObjForMR=function(data){           
            angular.forEach(data.records.propertyServiceGroups,function(item){
                item.marketRentGL="";
                item.marketRentGLDescription="";
            });
           
        };

        model.updatePropObjForAR=function(data){           
             angular.forEach(data.records.propertyServiceGroups,function(item){
                item.actualRentGL="";
                item.actualRentGLDescription="";
            });
        };

         model.updatePropObjForLossToLease=function(data){
            angular.forEach(data.records.propertyServiceGroups,function(item){
                item.lossToLeaseGL="";
                item.lossToLeaseGLDescription="";
            });
        };


        model.updateSGObjectWithMR=function(data){
            var index=0;
            var mrData=RentOptionSettings.getMRGLForSG();
          /*  angular.forEach(data.records.propertyServiceGroups,function(item){              
                   item.marketRentGL=mrData[index].glAccountNumber;
                    item.marketRentGLDescription=mrData[index].glAccountDescription; 
                index++;  
            }); */
             angular.forEach(mrData,function(item){              
                   data.records.propertyServiceGroups[index].marketRentGL=item.glAccountNumber;
                   data.records.propertyServiceGroups[index].marketRentGLDescription=item.glAccountDescription; 
                index++;  
            });
            data.records.marketRentGLAccounts=[];
        };

        model.updateSGObjectWithAR=function(data){
              var index=0;
            var arData=RentOptionSettings.getARGLForSG();
          /*    angular.forEach(data.records.propertyServiceGroups,function(item){              
                   item.actualRentGL=arData[index].glAccountNumber;
                    item.actualRentGLDescription=arData[index].glAccountDescription; 
                index++;  
            }); */
              angular.forEach(arData,function(item){              
                   data.records.propertyServiceGroups[index].actualRentGL=item.glAccountNumber;
                   data.records.propertyServiceGroups[index].actualRentGLDescription=item.glAccountDescription; 
                index++;  
            });
               data.records.scheduleRentGLAccounts=[];
        };

        model.updateSGObjectWithLossToLease=function(data){
            var LGdata=RentOptionSettings.getLossLeaseGLForSG();
                var index=0;
          /*  angular.forEach(data.records.propertyServiceGroups,function(item){            
                   item.lossToLeaseGL=LGdata[index].glAccountNumber;
                    item.lossToLeaseGLDescription=LGdata[index].glAccountDescription; 
                index++;  
            }); */
            angular.forEach(LGdata,function(item){              
                   data.records.propertyServiceGroups[index].lossToLeaseGL=item.glAccountNumber;
                   data.records.propertyServiceGroups[index].lossToLeaseGLDescription=item.glAccountDescription; 
                index++;  
            });
        };

       model.validateBeforeSave=function(data){
             model.validateMarketActualGL(data);           
            if(model.getMRGL() && model.getARGL() && model.getMRGLPercentage()){
                model.isReadyForSave(true);        
            }
            else{
                model.isReadyForSave(false);   
            }
        
        };

       model.isReadyForSave=function(flag){
            model.saveSettings.permitSave=flag;
        };

        model.permitSave=function(flag){
           return model.saveSettings.permitSave;
        };

    

       model.setMRGLPercentage=function(flag){
            model.saveSettings.mrGLPercentage=flag;
        };

        model.setARGLPercentage=function(flag){
            model.saveSettings.arGLPercentage=flag;
        };


        model.getMRGLPercentage=function(){
            return model.saveSettings.mrGLPercentage;
        };


        model.getARGLPercentage=function(){
            return model.saveSettings.arGLPercentage;
        };

         model.setMRGL=function(flag){
            model.saveSettings.mrGLAccount=flag;
        };

        model.setARGL=function(flag){
            model.saveSettings.arGLAccount=flag;
        };


        model.getMRGL=function(){
            return model.saveSettings.mrGLAccount;
        };


        model.getARGL=function(){
            return model.saveSettings.arGLAccount;
        };

       model.isAffordableOrConventional=function(data){
            //if(data.assetType=="Affordable" || data.assetType=="Conventional" || data.assetType=="Student Living"){
            if(data.assetType !=="Senior Living"){
                 return true;
            }
            return false;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('RentOptionsSave', [       
                            'RentOptionSettings', 
                            'rentOptionsErrorHandling',  
                            'rentOptionsSvc', 
                            'rentOptionsNotifications',  
                            '$filter',  
                            'validateConventional',  
                            'validateAffordable',
                            'validateSeniorLiving',
                            'RentOptionsModel', 
                            'RentOptionsValidateMethods',
                            'budgetDetails',
                             RentOptionsSave]);
})(angular);
