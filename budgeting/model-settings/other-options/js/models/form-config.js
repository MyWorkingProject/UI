
(function (angular) {
    "use strict";

    function factory(baseFormConfig, inputConfig,datetimepickerConfig,langTranslate,moment) {
        var model = baseFormConfig();
          var translate;
        translate = langTranslate('otherOptions').translate;

         model.getLangValue = function (key) {
            return translate(key);
        };

        model.hudid = inputConfig({
            id: "hudID",
            fieldName: "hudID",
            maxlength: 10,
            placeholder:model.getLangValue('ph_hudid')
        });

        model.owner = inputConfig({
            id: "owner",
            fieldName: "owner",
            maxlength: 150,
            placeholder:model.getLangValue('ph_owner')
        });

          model.yearBuilt = inputConfig({
            id: "yearBuilt",           
            fieldName: "yearBuilt",
            errorMsgs: [{
                name: "checkYear",
                text: "Year should be between 1900-2099"
            }],
            validators: {
                checkYear: model.methods.get("checkYear")
            },
            modelOptions: {               
                allowInvalid: true
            },
            onChange: model.methods.get("onYearChange"),
            placeholder:model.getLangValue('ph_yearbuilt')
        });
       

        model.propertyCode = inputConfig({
            id: "propertyCode",
            fieldName: "propertyCode",
            maxlength: 20 ,
            placeholder:model.getLangValue('ph_propertycode')           
          
        });

        model.attachedGarages = inputConfig({
            id: "attachedGarages",
            fieldName: "attachedGarages",
             maxlength: 4,
            errorMsgs: [{
                name: "chkAttachedGarages",
                text:model.getLangValue('validation_attachedGarages')
            }],
            validators: {
                chkAttachedGarages: model.methods.get("chkAttachedGarages")
            },
            modelOptions: {               
                allowInvalid: true
            },
            onChange: model.methods.get("onAttachedGarageChange"),
            placeholder:model.getLangValue('ph_attachedGarages')
           
        });

        model.storageUnits = inputConfig({
            id: "storageUnits",
            fieldName: "storageUnits",
             maxlength: 4,
             errorMsgs: [{
                name: "chkStorageUnits",
                text: model.getLangValue('validation_storageUnits')
            }],
            validators: {
                chkStorageUnits: model.methods.get("chkStorageUnits")
            },
            modelOptions: {               
                allowInvalid: true
            },
            onChange: model.methods.get("onStorageUnitsChange"),
            placeholder:model.getLangValue('ph_storageUnits')
           
        });

        model.detachedGarages = inputConfig({
            id: "detachedGarages",
            fieldName: "detachedGarages",
             maxlength: 4,
             errorMsgs: [{
                name: "chkDetachedGarages",
                text: model.getLangValue('validation_detachedGarages')
            }],
            validators: {
                chkDetachedGarages: model.methods.get("chkDetachedGarages")
            },
            modelOptions: {               
                allowInvalid: true
            },
            onChange: model.methods.get("onDetachedGaragesChange"),
            placeholder:model.getLangValue('ph_detachedGarages')
           
        });

        model.carports = inputConfig({
            id: "carports",
            fieldName: "carports",
             maxlength: 4,
             errorMsgs: [{
                name: "chkCarports",
                text: model.getLangValue('validation_carports') 
            }],
            validators: {
                chkCarports: model.methods.get("chkCarports")
            },
            modelOptions: {               
                allowInvalid: true
            },
            onChange: model.methods.get("onCarportsChange"),
            placeholder:model.getLangValue('ph_carports')
           
        });        
        
    
         model.payrollIncreaseDate = datetimepickerConfig({
            id: "payrollIncreaseDate",
            fieldName: "payrollIncreaseDate",
            placeholder:model.getLangValue('ph_dateofincrease')
            //defaultDate:model.
        });

        model.payrollIncreasePercent = inputConfig({
            id: "payrollIncreasePercent",
            fieldName: "payrollIncreasePercent",
            suffix: "%" ,
            dataType:"text",           
            errorMsgs: [{
                name: "chkPayrollIncrease",
                text: model.getLangValue('validation_payrollPercent')
            }],
            validators: {
                chkPayrollIncrease: model.methods.get("chkPayrollIncrease")
            },
            modelOptions: {               
                allowInvalid: true
            },
            onChange: model.methods.get("onPayrollPercentChange"),
            placeholder:model.getLangValue('ph_increasePercent')          
        });
        
        model.onChange = function (data) {
            logc(data.format("MM/DD/YYYY"));
        };

        



        return model;
    }

    angular
        .module("budgeting")
        .factory("options-form-config", [
            "baseFormConfig",
            "rpFormInputTextConfig", 
             "rpDatetimepickerConfig", 
             "appLangTranslate","moment",       
            factory
        ]);
})(angular);
