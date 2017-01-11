//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function RentOptionsModel(langTranslate,$stateParams,rentOptionsSvc,$location,formConfig,inputOptions,validateInpMethods) {
        var model = {};
        var convert;
        convert = langTranslate('RentOptions').translate;
        
        model.getLangValue = function (key) {
            return convert(key);
        };

         model.basicRentOptions = {           
              marketRentOptions: [],
              scheduleRentGLAccounts: [],
              lossGainToLeaseOptions: [],
              isConventional:false,
              isAffordable:false,
              isStudentLiving:false,
              isSeniorLiving:false,
              loadRentOptions:false,
              visible:false,
              hasEditRights:true,
              isRentOptionReady:false,
              isFinalize: false,
              productToolTip:false
        };
        
        model.rentOptions = {};

       angular.copy(model.basicRentOptions, model.rentOptions);

        
          model.form={
            marketRentMethod:'UnitType',
            marketRentGL:"",
            actualRentMethod:'UnitTypeProgram',
            actualRentGL:"",
            lossGainToLeaseMethod:"Worksheet",
            lossToLeaseGL:"",
            gainToLossGL:"",
            marketRentTitle:"Market Rent Method",
            marketRentGLTitle:"Market Rent",
            actualRentTitle:"Actual Rent Method",
            actualRentGLTitle:"Actual Rent" ,
            marketRentLabel:"",
            actualRentLabel:"",
            LossToLeaseLabel:""           
            
          };

          model.showProductToooltip = function () {
              model.rentOptions.productToolTip = !model.rentOptions.productToolTip;
          };


          model.getProductToooltip = function () {
              return model.rentOptions.productToolTip;
          };

          model.setProductToooltip = function (val) {
              model.rentOptions.productToolTip = val;
          };

        
        model.setAssetType=function(data){
             if(data.assetType=="Conventional"){
                model.setConventionalType(true);
            }
            else if(data.assetType=="Affordable"){
               model.setAffordableType(true);
            }
            else if(data.assetType=="Student Living"){
               model.setStudentLivingType(true);
            }
            else if(data.assetType=="Senior Living"){
                model.setSeniorLivingType(true);
            }
        };

        /* Setting values to Asset Types*/
        model.setConventionalType=function(flag){
            model.rentOptions.isConventional=flag;
        };

        model.setAffordableType=function(flag){
            model.rentOptions.isAffordable=flag;
        };

        model.setStudentLivingType=function(flag){
            model.rentOptions.isStudentLiving=flag;
        };

        model.setSeniorLivingType=function(flag){
             model.rentOptions.isSeniorLiving=flag;
        };

        /*Get Methods for Asset Types */

         model.getConventionalType=function(){
           return model.rentOptions.isConventional;
        };

        model.getAffordableType=function(){
           return model.rentOptions.isAffordable;
        };

        model.getStudentLivingType=function(){
            return model.rentOptions.isStudentLiving;
        };

        model.getSeniorLivingType=function(){
           return  model.rentOptions.isSeniorLiving;
        };

        model.loadInputSettings=function(data){
            model.setAssetType(data.records.rentOptions);
            model.setInputMethodsByAssetTypes();
        };

         model.showForm=function(){
            model.setFormFlag(true);
        };
        
         model.cancel=function(){
            model.setFormFlag(false);
        };

         model.setFormFlag=function(flag){
            model.rentOptions.visible=flag;
        };

        model.setEditPermission=function(data){
            if(data.records.rentOptions.editInputMethod===false && data.records.rentOptions.editGLAccounts===false){
                model.rentOptions.hasEditRights=false;
            }
            else{
                 model.rentOptions.hasEditRights=true;
            }
        };

        model.checkForFinalize=function(data){
            model.rentOptions.isFinalize=data.isFinal;
        };

        model.isModelFinalized=function(){
            return  model.rentOptions.isFinalize;
        };

        
       model.hasShowEditRights=function(data){
            if(model.hasEditInputMethod(data) || model.isModelFinalized()){
                model.setEditPermission(false);
            }          
            else{
                   model.setEditPermission(true);
            }
       };

       model.hasEditInputMethod=function(data){
            if(data.records.rentOptions.editInputMethod===false && data.records.rentOptions.editGLAccounts===false){
               return true;
            }
            return false;
        };

       model.setEditPermission=function(flag){
             model.rentOptions.hasEditRights=flag;    
       };

       
       model.setInputMethodsByAssetTypes = function () {
           // formConfig.flushData();
           var defaultInputOptions = inputOptions.getOptions();
            if(model.getSeniorLivingType()){
                model.setOptionsForSL(defaultInputOptions);
            }
            else{
                model.setOptionsForNonSL(defaultInputOptions);
            }
        };

       model.setOptionsForSL = function (defaultInputOptions) {
           
             model.rentOptions.marketRentOptions=defaultInputOptions.slOptionsForMARent;
             model.rentOptions.scheduleRentGLAccounts=defaultInputOptions.slOptionsForMARent;
             model.rentOptions.lossGainToLeaseOptions=defaultInputOptions.slLossGainOptions;
        };
        
       model.setOptionsForNonSL = function (defaultInputOptions) {
             model.rentOptions.marketRentOptions=defaultInputOptions.nonSLOptionsForMARent;
             model.rentOptions.scheduleRentGLAccounts=defaultInputOptions.nonSLOptionsForMARent;
             model.rentOptions.lossGainToLeaseOptions=defaultInputOptions.nonSLLossGainOptions;
        };
       
        model.loadConfigOptions=function(){
            //   model.emptyPreviousOptions();
             
              formConfig
                .setOptions("marketRentOptions", model.rentOptions.marketRentOptions)
                .setOptions("scheduleRentGLAccounts", model.rentOptions.scheduleRentGLAccounts)
                .setOptions("lossGainToLeaseOptions", model.rentOptions.lossGainToLeaseOptions);           
        };

        

        model.loadInputTypes=function(){
              formConfig.marketRentOptions.options=model.rentOptions.marketRentOptions;
                formConfig.scheduleRentGLAccounts.options=model.rentOptions.scheduleRentGLAccounts;
                formConfig.lossGainToLeaseOptions.options=model.rentOptions.lossGainToLeaseOptions; 

              /*  formConfig
                .setOptions("marketRentOptions", [])
                .setOptions("scheduleRentGLAccounts", [])
                .setOptions("lossGainToLeaseOptions", []);  */
             
        };
      

        model.setRentOptionsFlag=function(){
              var path=$location.absUrl();
              if (path.indexOf("model-settings") > 0) {
                     model.rentOptions.loadRentOptions=true;
                }
        };
        

        model.isRentOption=function(){
            return model.setRentOptionsFlag();
        };
        

        model.getRentOptions = function () {
              var paramsData = {
                distributedID: $stateParams.distID
            };
            return rentOptionsSvc.getRentOptions(paramsData, '').$promise;
        };

        model.validateInputType=function(data){
            if( model.getSeniorLivingType()){
                 model.manageSLInputTypes(data);
            }
            else{
                model.manageNonSLInputTypes(data);                    
            }
            
        };

      /*  model.manageNonSLInputTypes=function(data){
            if(data.incomeModel=="None" || data.scheduleRentMethod=="None" ){
                model.scheduleIncomeTypeForNone(data);
                   
              }
            else{
                 model.scheduleIncomeType(data);                    
                }
        }; */

         model.manageNonSLInputTypes=function(data){
            if(validateInpMethods.isIncomeModelNone(data.incomeModel) || validateInpMethods.isScheduleMethodNone(data.scheduleRentMethod)){
                model.scheduleIncomeTypeForNone(data);
                   
              }
            else{
                 model.scheduleIncomeType(data);                    
                }
        };

        model.scheduleIncomeTypeForNone=function(data){
            model.rentOptions.lossGainToLeaseOptions=[];
            model.checkForWorksheetOption(data);              
            model.rentOptions.lossGainToLeaseOptions= inputOptions.getOptions().lossGainOptionsForNone;
        };

      /*  model.checkForWorksheetOption=function(data){
             if(data.lossToLeaseMethod!=="Worksheet"){
                data.lossToLeaseMethod="None";
            }
            else{
                data.lossToLeaseMethod="Worksheet";
            }  
        }; */

          model.checkForWorksheetOption=function(data){
             if(!validateInpMethods.isLossToLeaseMethodWorkSheet(data.lossToLeaseMethod)){
                data.lossToLeaseMethod="None";
            }
            else{
                data.lossToLeaseMethod="Worksheet";
            }  
        };

        model.scheduleIncomeType=function(data){
            model.checkLossToLeaseOfNone(data);
            model.rentOptions.lossGainToLeaseOptions=[];
            model.rentOptions.lossGainToLeaseOptions= inputOptions.getOptions().nonSLLossGainOptions;
        };

     /*   model.checkLossToLeaseOfNone=function(data){
           if(data.lossToLeaseMethod==="None"){
                data.lossToLeaseMethod="None";
            }
            else{
                data.lossToLeaseMethod=data.lossToLeaseMethod;
            }
        }; */

        
        model.checkLossToLeaseOfNone=function(data){
           if(validateInpMethods.isLossToLeaseMethodNone(data.lossToLeaseMethod)){
                data.lossToLeaseMethod="None";
            }
            else{
                data.lossToLeaseMethod=data.lossToLeaseMethod;
            }
        };

        model.setLossGainOptionForNone=function(data){
               model.rentOptions.lossGainToLeaseOptions=[];
               data.lossToLeaseMethod="None";
               model.setLossGainToNull();              
        };

        model.setLossGainToNull=function(){//lossGainToLeaseNoneOptions
             model.rentOptions.lossGainToLeaseOptions= inputOptions.getOptions().lossGainToLeaseNoneOptions;
        };

        model.setLossGainOptions=function(data){
             model.rentOptions.lossGainToLeaseOptions=[];
               model.checkServiceGroup(data);
                model.setLossGainToServiceGroup();
                
        };

       /* model.checkServiceGroup=function(data){
             if(data.lossToLeaseMethod!=="Service group"){
                    data.lossToLeaseMethod="None";
                }
                else{
                     data.lossToLeaseMethod="Service group";
                }
        }; */

        model.checkServiceGroup=function(data){
             if(!validateInpMethods.isLossToLeaseMethodServiceGroup(data.lossToLeaseMethod)){
                    data.lossToLeaseMethod="None";
                }
                else{
                     data.lossToLeaseMethod="Service group";
                }
        };

        model.setLossGainToServiceGroup=function(){//lossGainToLeaseServiceGrp
             model.rentOptions.lossGainToLeaseOptions= inputOptions.getOptions().lossGainToLeaseServiceGrp;
        };

        model.setLossGainOptionForUnitType=function(data){
            model.rentOptions.lossGainToLeaseOptions=[];
            data.lossToLeaseMethod="None";
            model.checkForMarketScheduleRent(data);               
            model.setLossGainToScheduleRent();
        }; 

     /*   model.checkForMarketScheduleRent=function(data){
             if( data.lossToLeaseMethod!=="MarketScheduleRent"){
                    data.lossToLeaseMethod="None";
            }
            else{
                    data.lossToLeaseMethod="MarketScheduleRent";
            }
        }; */

         model.checkForMarketScheduleRent=function(data){
             if(!validateInpMethods.isLossToLeaseMethodMarketScheduleRent(data.lossToLeaseMethod)){
                    data.lossToLeaseMethod="None";
            }
            else{
                    data.lossToLeaseMethod="MarketScheduleRent";
            }
        };


        model.setLossGainToScheduleRent=function(){//lossGainToLeaseMarketScheduleRent
            model.rentOptions.lossGainToLeaseOptions= inputOptions.getOptions().lossGainToLeaseMarketScheduleRent;
        };

      /*  model.manageSLInputTypes=function(data){           
            if(data.incomeModel=="None" || data.scheduleRentMethod =="None"){
                model.setLossGainOptionForNone(data);              
            }
            else if((data.incomeModel=="Service group" || data.scheduleRentMethod== "Service group") && (data.incomeModel !=="None" || data.scheduleRentMethod !=="None")){
                model.setLossGainOptions(data);               
            }
            else if((data.incomeModel=="Unit" || data.incomeModel=="Unit type") &&  (data.scheduleRentMethod=="Unit" || data.scheduleRentMethod=="Unit type")){
                model.setLossGainOptionForUnitType(data);                
            }
        }; */

         model.manageSLInputTypes=function(data){           
            if(validateInpMethods.isIncomeModelNone(data.incomeModel) || validateInpMethods.isScheduleMethodNone(data.scheduleRentMethod)){
                model.setLossGainOptionForNone(data);              
            }
            else if(( validateInpMethods.isIncomeModelServiceGroup(data.incomeModel) ||validateInpMethods.isScheduleMethodServiceGroup(data.scheduleRentMethod)) && (!validateInpMethods.isIncomeModelNone(data.incomeModel) || !validateInpMethods.isScheduleMethodNone(data.scheduleRentMethod))){
                model.setLossGainOptions(data);               
            }
            else if((validateInpMethods.isIncomeModelUnit(data.incomeModel) || validateInpMethods.isIncomeModelUnitType(data.incomeModel)) &&  (validateInpMethods.isScheduleMethodUnit(data.scheduleRentMethod) || validateInpMethods.isScheduleMethodUnitType(data.scheduleRentMethod))){
                model.setLossGainOptionForUnitType(data);                
            }
        };


        model.isRentOptionReady=function(type){
            model.setIsRentOptionReady(type);
        };

        model.setIsRentOptionReady=function(type){
            model.rentOptions.isRentOptionReady=type;
        };

        model.getRentOpData=function(data){
            return data.records.rentOptions;
        };

        model.setLabelOnEdit=function(data){
            model.setScheduleRentLabelOnEdit(data);
            model.setMarketRentLabelOnEdit(data);
            model.setLossToLeaseLabelOnEdit(data);
        };

        model.setScheduleRentLabelOnEdit=function(data){
             if(data.scheduleRentMethod !== "Program"){
                  model.form.actualRentLabel=data.scheduleRentMethod;
             }
            else{
                 model.form.actualRentLabel="Unit type - program";
            }
        };

         model.setMarketRentLabelOnEdit=function(data){
             if(data.incomeModel !== "Program"){
                  model.form.marketRentLabel=data.incomeModel;
             }
            else{
                 model.form.marketRentLabel="Unit type - program";
            }
        };

         model.setLossToLeaseLabelOnEdit=function(data){
             if(data.lossToLeaseMethod === "MarketScheduleRent"){
                  model.form.LossToLeaseLabel="Market/Scheduled difference";
             }
            else if(data.lossToLeaseMethod === "Service group"){
                 model.form.LossToLeaseLabel="Service group - Market/Scheduled difference";
            }
           else{
                 model.form.LossToLeaseLabel=data.lossToLeaseMethod;
            }
        };

        model.reset = function () {
           angular.copy(model.basicRentOptions, model.rentOptions);
        };



        return model;
    }

    angular
        .module("budgeting")
        .factory('RentOptionsModel', [
                    'appLangTranslate',
                    '$stateParams',     
                    'rentOptionsSvc', 
                    '$location',
                    'rent-option-config',
                    'RentOptionsInputTypes',
                    'RentOptionsValidateMethods',
            RentOptionsModel]);
})(angular);
