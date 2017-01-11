// Calculation Sources Options

(function (angular) {
    "use strict";

    function calculationSourcesFactory(i18n, dropdownUtils) {
        var curr_row = {
                    value: "current-row",
                    name: i18n.translate("bdgt_change_rent_src_curr_row")
                };
        var options = {
                CURR_ROW: curr_row ,
                START_PT: {
                    value: "starting-point",
                    name: i18n.translate("bdgt_change_rent_src_start_pt")
                }
            };

        var calculator = angular.copy(options);
        calculator.defaultOptions = dropdownUtils.toSelectOptions(options);
        calculator.options = {};

        //returns the options into array
        calculator.getList = function (addStartPoint) {
            if(addStartPoint){
                 calculator.defaultOptions = dropdownUtils.toSelectOptions(options);
            }
            else{
                var newOptions = {   CURR_ROW: curr_row
                              };
                calculator.defaultOptions = dropdownUtils.toSelectOptions(newOptions);
                return calculator.defaultOptions;
                
            }
            return calculator.defaultOptions;
        };

        calculator.updateList = function(otherSourceList) {
            var list = [angular.copy(options.CURR_ROW)].concat(otherSourceList);
            
            calculator.options.average = list;
            calculator.options.id_monthly = list.concat([angular.copy(options.START_PT)]);
        };

        calculator.getSourceListOptions = function(method) {
            if(calculator.options[method]) {
                return calculator.options[method];
            }
            return calculator.defaultOptions.options;
        };

        calculator.reset = function() {
            calculator.options = {};
        };

        return calculator;
    }

    angular
        .module("budgeting")
        .factory("changeRentSources", [
            "changeRentTranslatorSvc",
            "rentDropdownUtilities",
            calculationSourcesFactory
        ]);
})(angular);

