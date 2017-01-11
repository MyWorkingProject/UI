(function (angular) {
    "use strict";

    function changeRentGridDataFactory(dateUtils, pricingUtils) {
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

                if(activePeriod !== undefined && activePeriod !== null){
                    sourceData[keyStr] = activePeriod[keyStr] || "0";
                }
                monthlyData[keyStr] = null;
                resultsYear[keyStr] = null;

                if(hasDateRange && !dateUtils.isWithin(activeDate, startDate, endDate, "month")) {
                    applyChanges[keyStr] = "disabled";
                } else {
                    applyChanges[keyStr] = true;
                }

                activeDate.add(1, "months");
            }
            if(activePeriod !== undefined && activePeriod !== null){
                sourceData.total = activePeriod.total;
            }

            return [
                sourceData, //source data
                monthlyData, //monthly input data (for increase/decrease monthly)
                applyChanges, //apply changeRent changes?
                resultsYear //results for the computation based on method chosen
            ];
        };

    }

    angular
        .module("budgeting")
        .factory("changeRentGridData", [
            "changeRentDateUtility",
            "rentPricingUtility",
            //"rentTranslatorSvc",
            changeRentGridDataFactory
        ]);
})(angular);

