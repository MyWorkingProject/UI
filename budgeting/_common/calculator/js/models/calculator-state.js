(function (angular) {
    "use strict";

    function calculatorStateFactory() {

        return function(json) {
            var defaultParameters = {
                display: false,
                gridReady: false,

                // Required Block
                activePeriod: null,
                startMonth: null,
                startYear: null,
                noOfPeriods: 0,

                sourceDropdownData: null,

                dateRange: {
                    startDate: null,
                    endDate: null
                },

                maxDecimalCount: 0,

                errMsgRequired: ""
            };

            var calculator = null;
            if(json) {
                calculator = angular.extend(defaultParameters, json);
            } else {
                calculator = angular.copy(defaultParameters);
            }

            calculator.setErrorMessage = function(msg) {
                calculator.errMsgRequired = msg;
            };

            calculator.reset = function () {
                calculator.display = false;
                calculator.gridReady = false; 
                
                calculator.activePeriod = null;
                calculator.startMonth = null;
                calculator.startYear = null;
                calculator.noOfPeriods = 0;

                calculator.sourceDropdownData = null;
                calculator.errMsgRequired = "";

                calculator.dateRange.startDate = null;
                calculator.dateRange.endDate = null;
            };

            return calculator;
        };
    }

    angular
        .module("budgeting")
        .factory("calculatorStateModel", [
            calculatorStateFactory
        ]);

})(angular);

/*  For Calculator, you are required to set activePeriod, startMonth, startYear, and noOfPeriods.

    calculator.startMonth - Start of Month. The calculator grid will start with this month and 
        end depending on the no of periods.
    calculator.startYear - Start of Year
    calculator.noOfPeriods - Number of months affected.

    calculator.activePeriod - JSON object that is affected by the calculator. 
        The contents will depend on the startMonth, startYear, and noOfPeriods.
            activePeriod = {
                "period1": 1000,
                "period2": 1000,
                "period3": 1000,
                "period4": 1000,
                "period5": 1000,
                "period6": 1000,
                "period7": 1000,
                "period8": 1000
            };

    calculator.dateRange - will set the date range. Anything outside this will be automatically disabled.

    calculator.sourceDropdown
    [{  
      "rowTitle":"2015 Forecast",
      "period1":157158,
      "period2":158403,
      "period3":148718,
      "period4":69404,
      "period5":69404,
      "period6":69404,
      "period7":69404,
      "period8":69404,
      "period9":69404,
      "period10":69404,
      "period11":69404,
      "period12":69404,
      "total":1088915,
     }, {..}
    ]

*/