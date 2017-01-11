(function (angular) {
    "use strict";

    function calcGridDataFactory(dateUtils, pricingUtils, i18n) {
        var genericData = { columnTitle: null, total: null, rowType: null }; 

        return function(stateParams) {
            var startYear = stateParams.startYear, 
                startMonth = stateParams.startMonth, 
                noOfPeriods = stateParams.noOfPeriods,
                activePeriod = stateParams.activePeriod;

            var monthlyData = angular.copy(genericData);
                monthlyData.columnTitle = "Monthly Data";
                monthlyData.rowType = "monthlyAmount";

            var applyChanges = angular.copy(genericData);
                applyChanges.columnTitle = "Apply Change";
                applyChanges.rowType = "applyChanges";

            var resultsYear = angular.copy(genericData);
                resultsYear.columnTitle = "Results";
                resultsYear.rowType = "results";

            var sourceData = angular.copy(genericData);
                sourceData.columnTitle = "Source Data";
                sourceData.rowType = "activePeriod";

            var hasDateRange = (stateParams.dateRange && stateParams.dateRange.startDate && stateParams.dateRange.endDate),
                startDate = null, 
                endDate = null;
                
            if(hasDateRange) {
                startDate = stateParams.dateRange.startDate;
                endDate = stateParams.dateRange.endDate;
            }

            //create the monthly columns depending on the number of periods
            var activeDate = dateUtils.createDate(startYear, startMonth-1, 1);
            for(var i=0; i<noOfPeriods; i++) {
                var keyStr = pricingUtils.getMonthKey(i+1);

                sourceData[keyStr] = activePeriod[keyStr] || "0.00";
                monthlyData[keyStr] = null;
                resultsYear[keyStr] = null;

                if(hasDateRange && !dateUtils.isWithin(activeDate, startDate, endDate, "month")) {
                    applyChanges[keyStr] = "disabled";
                } else {
                    applyChanges[keyStr] = true;
                }

                activeDate.add(1, "months");
            }
            sourceData.total = activePeriod.total;

            return [
                sourceData, //source data
                monthlyData, //monthly input data (for increase/decrease monthly)
                applyChanges, //apply calculation changes?
                resultsYear //results for the computation based on method chosen
            ];
        };

    }

    angular
        .module("budgeting")
        .factory("calculationGridData", [
            "calcuDateUtility",
            "calcPricingUtility",
            "calcuTranslatorSvc",
            calcGridDataFactory
        ]);
})(angular);

