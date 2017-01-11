
(function () {
    "use strict";

    function glHistoryParamsFactory(glAcctDataType, moment) {

        var expectedParams = {
            masterChartID: 0,
            propertyID: 0,
            distributedID: 0,

            glAcctNumber: "",
            glAcctDescription: "",

            bookType: "", //all uppercases
            periodValue: 0,

            dataType: glAcctDataType.ACTUAL.value, //Actual/BudgetModel
            type: "", //Forecast/Actual/Budget
            month: "", //full month's name, first letter capitalized
            year: 0
        };

        return function(initialParams) {
            var params = this;

            //convert number month to full name month
            if(initialParams && initialParams.month && !isNaN(initialParams.month)) {
                initialParams.month = moment().month(initialParams.month - 1).format("MMMM");
            }

            params.model = angular.extend({}, expectedParams, initialParams);

            params.setData = function(obj) {
                angular.extend(params.model, obj);
            };

            /* GL Account History by period is indicated by month & year. So it is assumed
                that when there is no month then we are getting GL Account History in general.
            */
            params.isByPeriod = function() {
                if(params.model.month && params.model.month !== "") {
                    return true;
                }
                return false; 
            };

            params.getParamData = function() {
                return params.model;
            };

            params.getParamValue = function(name) {
                return params.model[name];
            };

            params.getDataTypeLabel = function() {
                return params.model.type;
                // return glAcctDataType.getLabel(params.model.dataType);
            };

            return params;
        };
    }

    angular
        .module("budgeting")
        .factory("glHistoryParameters", [
            "glAcctDataType",
            "moment",
            glHistoryParamsFactory
        ]);
})();