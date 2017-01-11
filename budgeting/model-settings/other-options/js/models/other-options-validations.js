//  Model settings - Other options Model

(function (angular) {
    'use strict';
    function factory(langTranslate,formData,formConfig) {
        var model;
        var translate;
        translate = langTranslate('otherOptions').translate;

        model = {};
        model.form = {};
        model.getLangValue = function (key) {
            return translate(key);
        };        
        
        model.isValidateYear = function () {
            if(formData.yearBuilt===""){
                  return true;
            }
            else if(formData.yearBuilt > 1900 && formData.yearBuilt < 2099 ){
               return true;                
            }
            
           return false;
        };

        model.isValidateAssumptions = function (data) {
            if(data===""){
                  return true;
            }
            else if(data >= 0){
               return true;                
            }
            
           return false;
        };

        model.isValidatePayrollPercent=function(data){
            if(data===""){
                  return true;
            }
            else if(data >= 0 && data <= 100){
               return true;                
            }
            
           return false;
        };
       
      return model;

    }


    angular
    .module('budgeting')
    .factory('validateModel', [
            'appLangTranslate',           
             'options-form-data',
            'options-form-config',            
            factory
    ]);
})(angular);

