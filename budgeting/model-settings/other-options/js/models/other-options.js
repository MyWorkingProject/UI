//  Model settings - Other options Model

(function (angular) {
    'use strict';
    function factory(langTranslate, otherOptionsSvc, errorHandling, $location, $filter,formData,moment,notifications,budgetDetails,config,datetimepickerConfig/*, session, moment*/) {
        var model;
        var translate;
        translate = langTranslate('otherOptions').translate;

        model = {};
      ///  model.form = {};
        model.getLangValue = function (key) {
            return translate(key);
        };


        model.defaultFormValues = {
            distributedID : 0,
            hudID: "",
            owner: "",
            yearBuilt: "",
            propertyCode: "",
            attachedGarages: "",
            storageUnits: "",
            detachedGarages: "",
            carports: "",
            dateOfIncrease: "",
            increasePercent:"",
            visible:false,
            productToolTip:false,
            isFinalize:false
        };

       model.form = {};
       angular.copy(model.defaultFormValues, model.form);

        model.showForm=function(){
            model.setFormFlag(true);
        };
        
         model.cancel=function(){
            model.setFormFlag(false);
        };

         model.setFormFlag=function(flag){
            model.form.visible=flag;
        };

          
        model.checkForFinalize=function(data){
            model.form.isFinalize=data.isFinal;
        };

        model.isModelFinalized=function(){
            return  model.form.isFinalize;
        };


      /*  model.init = function () {
            angular.copy(model.defaultFormValues, model.form);
            return model;
        }; */

         model.showProductToooltip = function(){
            model.form.productToolTip = !model.form.productToolTip;
        };
        
        
        model.getProductToooltip = function(){
           return model.form.productToolTip ;
        };

        model.setProductToooltip = function(val){
            model.form.productToolTip = val;
        };

        model.reset = function () {
             angular.copy(model.defaultFormValues, model.form);
        };

        
        model.isValidData = function () {
            if(formData.yearBuilt===""){
                  return true;
            }
            else if(formData.yearBuilt > 1990 || formData.yearBuilt < 2099 ){
               return true;                
            }
            
           return false;
        };


        model.getFormDetails = function (distID) {
            /*var returnObj = {
                distributedID: distID,
                hudID: model.form.hudID,
                owner: model.form.owner,
                yearBuilt: model.form.yearBuilt,
                propertyCode: model.form.propertyCode,
                attachedGarages: model.form.attachedGarages,
                storageUnits: model.form.storageUnits,
                detachedGarages: model.form.detachedGarages,
                carports: model.form.carports,
                dateOfIncrease: $filter('date')(model.form.dateOfIncrease, 'MM/dd/yyyy'),
                increasePercent: model.form.increasePercent
            };
            return returnObj;*/
            formData.propertyID=budgetDetails.getModelDetails().propertyID;
            formData.payrollIncreaseDate=$filter('date')(new Date(formData.payrollIncreaseDate),'MM/dd/yyyy');            
            return formData;
        };

        model.getOtherOptionsData = function (distID) {
            var params = {
                distributedID: distID
            };
            if (parseInt(distID) > 0) {
                model.getOtherOptionPromise(params).then(model.updateOtherOptions, errorHandling.showOtherOptionsGetException);
              
            }
            else if (distID === undefined || distID === "" || distID === null) {
                $location.path('/budgeting/#');
            }
        };

        model.getOtherOptionPromise = function (params) {
            return otherOptionsSvc.getOtherOptions(params).$promise;
        };

        model.updateOtherOptions=function(data){
          
            angular.extend(formData, data.records);
             model.setDefConversions(data.records);
           
        };

        model.setDefConversions=function(data){
          //  formData.payrolDate=$filter('date')(new Date(data.payrollIncreaseDate),'MM/dd/yyyy');
            data.payrollIncreaseDate=moment(data.payrollIncreaseDate,'MM/DD/YYYY'); 
            formData.payrollIncreaseDate =data.payrollIncreaseDate; 
            config.payrollIncreaseDate.setOption("defaultDate",data.payrollIncreaseDate) ;
           // formData.payrollIncreaseDate=moment(new Date(formData.payrollIncreaseDate),'MM/dd/yyyy');//moment('9/14/2016','MM/DD/YYYY'); 
           // config.payrollIncreaseDate.options.defaultDate=data.payrollIncreaseDate;    
   
        };

        

        model.saveData = function (distID) {           
            var postData = model.getFormDetails(distID);            
            model.saveOtherOptionsData(postData).then(model.onSaveSuccess, errorHandling.showOtherOptionsSaveException);
        };

        model.onSaveSuccess=function(data){
            notifications.showSuccessNotification(model.getLangValue('saveSuccess'));
            formData.payrolDate=$filter('date')(new Date(formData.payrollIncreaseDate),'MM/DD/YYYY'); 
            model.cancel();
        };


        model.saveOtherOptionsData = function (data) {
            return otherOptionsSvc.saveOtherOptions(data).$promise;
        };


        return model;
    }


    angular
    .module('budgeting')
    .factory('manageOtherOptionsModel', [
            'appLangTranslate',
            'otherOptionsSvc',
            'manageOtherOptionsErrorHandling',
            '$location',
            '$filter',
             'options-form-data',          
             'moment',
            'otherOptionsNotifications',
             'budgetDetails', 
             'options-form-config',
             'rpDatetimepickerConfig',          
             /*'session',
             'moment',*/
            factory
    ]);
})(angular);

