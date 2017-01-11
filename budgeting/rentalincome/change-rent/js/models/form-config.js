(function (angular) {
    "use strict";

    function factory(baseFormConfig,menuConfig, i18n, moment, pricingUtils, inputConfig) {
        var model = baseFormConfig();

         model.amt1 = inputConfig({
            id: "amt1",
            fieldName: "amt1",
            required:true,
            //onChange: model.methods.get("amnt1Change"),
            //placeholder: translate('ph_title'),
             errorMsgs: [{
                name: "required",
                text: "Required"
            }]
        });

        model.amt2 = inputConfig({
            id: "amt2",
            fieldName: "amt2",
            required:true,
           // onChange: model.methods.get("amnt2Change"),
            //placeholder: translate('ph_title'),
             errorMsgs: [{
                name: "required",
                text: "Required"
            }]
        });

         model.periodSource = menuConfig({                    
            nameKey: "description", //description
            valueKey: "name",
            onChange: model.methods.get("periodChange") 
        });

         model.unitType = menuConfig({                    
            nameKey: "name", //description
            valueKey: "id",
            onChange: model.methods.get("unitTypeChange") 
        });

         model.unit = menuConfig({                    
            nameKey: "name", //description
            valueKey: "id",
            onChange: model.methods.get("unitChange") 
        });

       model.expirePeriods = menuConfig({                    
            nameKey: "name", //description
            valueKey: "id",
            onChange: model.methods.get("expireChange") 
        }); 
       
       model.setExpirePeriodsOptions = function(startMonth, startYear, noOfPeriods){
            model["expirePeriods"].flushOptions();
            model.flushKeys("expirePeriods");  
            var activeDate = moment();
            activeDate.year(startYear)
                .month(startMonth - 1) //month is index 0
                .date(1);
            var data = [];
            for(var i=0; i<noOfPeriods; i++) {
                var keyStr = pricingUtils.getMonthKey(i+1); 
                data.push({"name": activeDate.format("MMM YYYY"),"id": (i+1)});
                activeDate.add(1, "months");
            }
            model.setOptions("expirePeriods", data);
        }; 

        model.setPeriodOptions = function(rentMethod, isMarketRent){
            model["periodSource"].flushOptions();
            model.flushKeys("periodSource");
            var data = [];
            data.push({"description": i18n.translate('bdgt_change_rent_all_periods'),"name": "all periods"});
            if(rentMethod.toLowerCase() === "unit" && !isMarketRent){
               data.push({"description": i18n.translate('bdgt_change_rent_expire_periods'),"name": "expire periods"});
               
            }  
          /*  else{
               /* if(rentMethod.toLowerCase() === "unit" && !isMarketRent){
                  data.push({"description": i18n.translate('bdgt_change_rent_expire_periods'),"name": "expire periods"});
                  //data.push({"description": i18n.translate('bdgt_change_rent_expire_select_periods'),"name": "selected expire periods"});    
                }
               data.push({"description": i18n.translate('bdgt_change_rent_selectd_periods'),"name": "selected periods"});
           }   */
           data.push({"description": i18n.translate('bdgt_change_rent_selectd_periods'),"name": "selected periods"});  
           model.setOptions("periodSource", data);  
        };

        model.updateSelectPeriodOptions = function(rentMethod, selectedMethod, isMarketRent){
            var data = [];
            model["periodSource"].flushOptions();
            model.flushKeys("periodSource");  
            if(selectedMethod !== "applyAR" && selectedMethod !== "id-monthly-currency-expiry" && selectedMethod !== "id-monthly-percent-percent-expiry"){
                 data.push({"description": i18n.translate('bdgt_change_rent_all_periods'),"name": "all periods"});
            }
            if(rentMethod.toLowerCase() === "unit" && !isMarketRent){
              data.push({"description": i18n.translate('bdgt_change_rent_expire_periods'),"name": "expire periods"});
              //data.push({"description": i18n.translate('bdgt_change_rent_expire_select_periods'),"name": "selected expire periods"});    
            }
            if(selectedMethod !== "applyAR" && selectedMethod !== "id-monthly-currency-expiry" && selectedMethod !== "id-monthly-percent-percent-expiry"){
                data.push({"description": i18n.translate('bdgt_change_rent_selectd_periods'),"name": "selected periods"});
            }
            model.setOptions("periodSource", data);   
        };

        model.setUnitTypeOptions = function(unitType){
            model["unitType"].flushOptions();
            model.flushKeys("unitType");   
            var data = [{"name": i18n.translate('bdgt_change_rent_all'),"id": -1}];
            unitType.forEach(function (item) {
              data.push({"name": item.name,"id": item.id});
            });
            
            model.setOptions("unitType", data);
        };

        model.setUnitOptions = function(unit){
            model["unit"].flushOptions();
            model.flushKeys("unit");
            var data = [{"name": i18n.translate('bdgt_change_rent_all'),"id": -1}];
            unit.forEach(function (item) {
              data.push({"name": item.name,"id": item.id});
            });
            
            model.setOptions("unit", data);
        };

        model.flushKeys = function(fieldName){
             if(model[fieldName].keys){
                model[fieldName].keys = [];
            }
        };
        
        
        model.setOptions = function (fieldName, fieldOptions) {
            if (model[fieldName]) {
                model[fieldName].setOptions(fieldOptions);
            }
            else {
                logc("market-rent-config.setOptions: " + fieldName + " is not a valid field name!");
            }

            return model;
        };



        return model;
    }

    angular
        .module("budgeting")
        .factory("changeRentFormConfig", [
            "baseFormConfig",          
             "rpFormSelectMenuConfig",
            "changeRentTranslatorSvc",
            "moment",
            "rentPricingUtility",
            "rpFormInputTextConfig",
            factory
        ]);
})(angular);
