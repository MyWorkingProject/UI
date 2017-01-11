//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function RentOptionSettings(budgetDetails,validateInpMethods) {
        var model = {};

        model.baseRentSettings = {   
              addGLOptions:false ,
              lossToLeaseFlag:false,
              mrFlag:false,
              alFlag:false,
              lossToLease:[],
              gainToLease:[],
              lossToLeaseForSG:[],
              mrGLForSG:[],
              arGLForSG:[],
              showGainToLease:false ,
              showlossToLease:false ,    
              rentOptions:[]
        };

       model.rentSettings = {};

       angular.copy(model.baseRentSettings, model.rentSettings);

        model.setRentOptions=function(data){
                model.rentSettings.rentOptions=data;
        };

        model.prepareFormData=function(){ 
            model.setControlsByAssetType();
            model.addExtraPropToData();
            model.addGLCondByAssetType();
           
        };


        model.addExtraPropToData=function(){
            model.addDataToMRObject(model.rentSettings.rentOptions);   
            model.addDataToARObject(model.rentSettings.rentOptions);
            model.loadLossToLeaseTypes(model.rentSettings.rentOptions);
            model.prepareGainToLeaseGL(model.rentSettings.rentOptions);
            /* updating object for service Group */
            model.prepareLTLForServiceGroup(model.rentSettings.rentOptions);           
            model.prepareMRGLForServiceGroup(model.rentSettings.rentOptions);
            model.prepareARGLForServiceGroup(model.rentSettings.rentOptions); 
        };    

       model.addDataToMRObject=function(data)
        {
            if(data.records.marketRentGLAccounts.length>0){
                 var id=0;
                angular.forEach(data.records.marketRentGLAccounts,function(item){                   
                    data.records.marketRentGLAccounts[id]["del"]=id+1;
                    data.records.marketRentGLAccounts[id]["masterchartID"]=budgetDetails.getModelDetails().masterChartID;
                    data.records.marketRentGLAccounts[id]["siteID"]=budgetDetails.getModelDetails().propertyID;

                    id++;
                });
            }
            else
            {
                  model.updateGLModel(data.records.marketRentGLAccounts);
            }   
        };
    
        model.addDataToARObject=function(data)
        {
            if(data.records.scheduleRentGLAccounts.length>0){
                 var id=0;
                angular.forEach(data.records.scheduleRentGLAccounts,function(item){                   
                    data.records.scheduleRentGLAccounts[id]["del"]=id+1;
                    data.records.scheduleRentGLAccounts[id]["masterchartID"]=budgetDetails.getModelDetails().masterChartID;
                    data.records.scheduleRentGLAccounts[id]["siteID"]=budgetDetails.getModelDetails().propertyID;
                    id++;
                });
            } 
            else
            {
                  model.updateGLModel(data.records.scheduleRentGLAccounts);
            }   
             
        };

         model.loadLossToLeaseTypes=function(data){
           /*   model.rentSettings.lossToLease={
                        "masterchartID":budgetDetails.getModelDetails().masterChartID,
                        "siteID":budgetDetails.getModelDetails().propertyID,
                        "glAccountNumber":data.records.rentOptions.lossToLeaseGLAccount,
                        "glAccountDescription":data.records.rentOptions.lossToLeaseGLDescription
            }; */

              model.rentSettings.lossToLease= model.PrepareData(data.records.rentOptions.lossToLeaseGLAccount,data.records.rentOptions.lossToLeaseGLDescription);

            
        };

         model.prepareGainToLeaseGL=function(data){                    
              /*   model.rentSettings.gainToLease={
                          "masterchartID":budgetDetails.getModelDetails().masterChartID,
                          "siteID":budgetDetails.getModelDetails().propertyID,
                          "glAccountNumber":data.records.rentOptions.gainToLeaseGLAccount,
                          "glAccountDescription":data.records.rentOptions.gainToLeaseGLDescription
                }; */
               model.rentSettings.gainToLease=model.PrepareData(data.records.rentOptions.gainToLeaseGLAccount,data.records.rentOptions.gainToLeaseGLDescription);
               model.rentSettings.showGainToLease=true;
        };

        model.addDataToSLObject=function(data)
        {
            if(data.records.propertyServiceGroups.length>0){
                 var id=0;
                angular.forEach(data.records.propertyServiceGroups,function(item){                   
                    data.records.propertyServiceGroups[id]["del"]=id+1;
                    data.records.propertyServiceGroups[id]["masterchartID"]=budgetDetails.getModelDetails().masterChartID;
                    data.records.propertyServiceGroups[id]["siteID"]=budgetDetails.getModelDetails().propertyID;
                    id++;
                });
            }
        else
            {
                  model.updateGLModel(data.records.propertyServiceGroups);
            }     
             
        };

        model.PrepareData=function(gl,glDesc){
                return{
                         "masterchartID":budgetDetails.getModelDetails().masterChartID,
                          "siteID":budgetDetails.getModelDetails().propertyID,
                          "glAccountNumber":gl,
                          "glAccountDescription":glDesc
                };
        };

       
        //prepareLossToLeaseGLForSL
       model.prepareLTLForServiceGroup =function(data)
        {         
                if(data.records.propertyServiceGroups.length>0){ 
                    model.rentSettings.lossToLeaseForSG=[]; 
                    angular.forEach(data.records.propertyServiceGroups,function(item){
                        var dataToPush=model.PrepareData(item.lossToLeaseGL,item.lossToLeaseGLDescription);
                            model.rentSettings.lossToLeaseForSG.push(dataToPush);
                   
                        });
                
                    } 
             
        };

      

        model.prepareMRGLForServiceGroup=function(data){
            // if(model.getMRFlag()){
                if(data.records.propertyServiceGroups.length>0){  
                     model.rentSettings.mrGLForSG=[];
                    angular.forEach(data.records.propertyServiceGroups,function(item){     
                         var dataToPush=model.PrepareData(item.marketRentGL,item.marketRentGLDescription); 
                         model.rentSettings.mrGLForSG.push(dataToPush);
                   
                });
                
               }          
        };


        model.prepareARGLForServiceGroup=function(data){
            // if(model.getARFlag()){
                if(data.records.propertyServiceGroups.length>0){  
                    model.rentSettings.arGLForSG=[];
                    angular.forEach(data.records.propertyServiceGroups,function(item){  
                        var dataToPush=model.PrepareData(item.actualRentGL,item.actualRentGLDescription);
                         model.rentSettings.arGLForSG.push(dataToPush);

                     });
                
                 } 
           /* }
            else
            {
                 model.updateGLModel(model.rentSettings.arGLForSG);
            } */
        };

        
        model.getMRGLForSG=function(){
            return model.rentSettings.mrGLForSG;
        };
        
         model.getARGLForSG=function(){
            return model.rentSettings.arGLForSG;
        };

        model.getLossLeaseGLForSG=function(){
            return model.rentSettings.lossToLeaseForSG;
        };

        model.getMasterChartID=function(){
            return budgetDetails.getModelDetails().masterChartID;
        };

         model.getPropertyID=function(){
            return budgetDetails.getModelDetails().propertyID;
        };

        model.getIDForDeleteGL=function(data){
            return data.length + 1;
        };

        model.updateGLModel=function(data){
          var adddata= model.addAdditionalProp(model.getIDForDeleteGL(data));
           data.push(adddata);           

        };

        model.addAdditionalProp=function(del){
                return {
                          "budgetModelID": 0,
                          "propertyID":0,
                          "glAccountNumber": "",
                          "glAccountDescription": "",
                          "incomePercent": "",
                          "del":del,
                          "masterchartID":model.getMasterChartID(),
                          "siteID":model.getPropertyID()
                        };
        };

        model.PerformAddGLOption=function(data){
          /*  if(model.hasGLLimit(data)){
                model.updateGLModel(data);
            } */
             model.updateGLModel(data);
        };

        model.hasGLLimit=function(data){                  
             if(data.length < 4) {
                   return true;
             }   
             return false;     
        };

        model.addGLCondByAssetType=function(){
             if(model.isAffordableType()){
                model.setAddGLFlag(true);
             }
            else{
                  model.setAddGLFlag(false);
            }
        };
      
        model.isAffordableType=function(){
            if(model.rentSettings.rentOptions.records.rentOptions.assetType=='Affordable'){
                   return true;
            }
            return false;
        };

        model.isConventionalType=function(){
            if(model.rentSettings.rentOptions.records.rentOptions.assetType=='Conventional'){
                   return true;
            }
            return false;
        };

        model.isSeniorLivingType=function(){
            if(model.rentSettings.rentOptions.records.rentOptions.assetType=='Senior Living'){
                   return true;
            }
            return false;
        };

        model.isStudentLivingType=function(){
            if(model.rentSettings.rentOptions.records.rentOptions.assetType=='Student Living'){
                   return true;
            }
            return false;
        };
        
        model.showHideGLLink=function(data){
            if(model.isAffordableType()){
                model.setAddGLByCondition(data);
            }
            else{
                model.setAddGLFlag(false);
            }
           
        };

        model.setAddGLFlag=function(flag){
             model.rentSettings.addGLOptions=flag;
        };

        model.setAddGLByCondition=function(data){                 
          /*  if(data.length==4){
                model.setAddGLFlag(false);               
            }
            else{
                model.setAddGLFlag(true);              
            } */
             model.setAddGLFlag(true);  
        };

        model.getRentOptionObject=function(){
            return model.rentSettings.rentOptions;
        };

        model.reset=function(){
             angular.copy(model.baseRentSettings, model.rentSettings);
        };

        model.setControlsByAssetType=function(){
            model.updateModelFlagsByCondition(model.rentSettings.rentOptions.records.rentOptions);
        };

        model.updateModelFlagsByCondition=function(obj){
            
            model.updateMRFlag(obj);
            model.updateARFlag(obj);
            model.updateSLFlag(obj);
           
        };

        model.isAssetTypeSeniorLiving=function(obj){
              if(obj.assetType=="Senior Living"){
                 return true;
              }
                return false;
        };

       model.updateMRFlag=function(obj){             
            if(model.isAssetTypeSeniorLiving(obj) && validateInpMethods.isIncomeModelServiceGroup(obj.incomeModel)){
               model.setMRFlag(true);
              // model.prepareMRGLForServiceGroup(model.rentSettings.rentOptions);// Remove this logic
            }
            else{
               model.setMRFlag(false);
            }
        };

       model.updateARFlag=function(obj){             
            if(model.isAssetTypeSeniorLiving(obj) && validateInpMethods.isScheduleMethodServiceGroup(obj.scheduleRentMethod)){
               model.setARFlag(true);
              //  model.prepareARGLForServiceGroup(model.rentSettings.rentOptions); //Remove this logic
            }
            else{
               model.setARFlag(false);
            }
        };

       model.updateSLFlag=function(obj){             
            if(model.isAssetTypeSeniorLiving(obj) && validateInpMethods.isLossToLeaseMethodServiceGroup(obj.lossToLeaseMethod)){
               model.setlossToLeaseFlag(true);
              // model.prepareLossToLeaseGL(model.rentSettings.rentOptions); 
            }
            else{
               model.setlossToLeaseFlag(false);
                model.rentSettings.showlossToLease=true;
              //  model.loadLossToLeaseTypes();
            }
        };

        model.setlossToLeaseFlag=function(flag){
            model.rentSettings.lossToLeaseFlag=flag;
        };

        model.getlossToLeaseFlag=function(){
            return  model.rentSettings.lossToLeaseFlag;
        };

        model.setMRFlag=function(flag){
            model.rentSettings.mrFlag=flag;
        };

        model.getMRFlag=function(){
            return  model.rentSettings.mrFlag;
        };

        model.setARFlag=function(flag){
            model.rentSettings.arFlag=flag;
        };

        model.getARFlag=function(){
            return  model.rentSettings.arFlag;
        };

        model.convertToDecimals=function(obj){
             if(obj.incomePercent!==""){
               obj.incomePercent= parseInt(obj.incomePercent); 
            }
            else{
             obj.incomePercent= 0; 
            }
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('RentOptionSettings', [   'budgetDetails','RentOptionsValidateMethods',                
            RentOptionSettings]);
})(angular);
