(function (angular) {
    "use strict";

    function lineBarChartConfigFactory(oarBudgetDetails, lineBarChartConfig, lineBarChart, rpColors, moment) {
        return function(oarSummaryModel) {

            var chart = lineBarChart(),
                summaryLineBarConfig = angular.copy(lineBarChartConfig.settings),
                startYear = oarBudgetDetails.getStartYear(),
                startMonth = oarBudgetDetails.getStartMonth() - 1,
                noOfPeriods = oarBudgetDetails.getNoOfPeriods(),
                categoryFormat = "MMM YYYY",
                categories = [],
                seriesObj = {},
                activeDate = moment();


            if(oarBudgetDetails.isDisplayLeaseRenewals()) {
                seriesObj.leaseRenewals = angular.copy(lineBarChartConfig.columnSeries);
                seriesObj.leaseRenewals.name = oarSummaryModel.leaseRenewals.itemDescription;
            }

            if(oarBudgetDetails.isDisplayOccupancyVacancy()) {
                seriesObj.moveIns = angular.copy(lineBarChartConfig.columnSeries);
                seriesObj.moveIns.name = oarSummaryModel.moveIns.itemDescription;

                seriesObj.moveOuts = angular.copy(lineBarChartConfig.columnSeries);
                seriesObj.moveOuts.name = oarSummaryModel.moveOuts.itemDescription;
                
                seriesObj.occupancyPercent = angular.copy(lineBarChartConfig.lineSeries);
                seriesObj.occupancyPercent.name = oarSummaryModel.occupancyPercent.itemDescription;
            }

            activeDate.year(startYear)
                .month(startMonth)
                .date(1);

            for(var i=0; i<noOfPeriods; i++) {
                var keyStr = "period" + (i+1),
                    category = activeDate.format(categoryFormat);

                if(oarBudgetDetails.isDisplayLeaseRenewals()) {
                    seriesObj.leaseRenewals.data.push(oarSummaryModel.leaseRenewals[keyStr] || 0);                    
                }

                if(oarBudgetDetails.isDisplayOccupancyVacancy()) {
                    seriesObj.moveIns.data.push(oarSummaryModel.moveIns[keyStr] || 0);                    
                    seriesObj.moveOuts.data.push(oarSummaryModel.moveOuts[keyStr] || 0);                    
                    seriesObj.occupancyPercent.data.push(oarSummaryModel.occupancyPercent[keyStr] || 0);                    
                }

                categories.push(category);
                activeDate.add(1, "months");
            }

            summaryLineBarConfig.xAxis.categories = categories;

            //add the series based on a specific order
            if(seriesObj.moveIns) {
                summaryLineBarConfig.series.push(seriesObj.moveIns);
                summaryLineBarConfig.colors.push(rpColors.prim);
            }
            if(seriesObj.moveOuts) {
                summaryLineBarConfig.series.push(seriesObj.moveOuts);
                summaryLineBarConfig.colors.push(rpColors.unk3);
            }
            if(seriesObj.leaseRenewals) {
                summaryLineBarConfig.series.push(seriesObj.leaseRenewals);
                summaryLineBarConfig.colors.push(rpColors.neut04);
            }
            if(seriesObj.occupancyPercent) {
                summaryLineBarConfig.series.push(seriesObj.occupancyPercent);
                summaryLineBarConfig.colors.push(rpColors.accent);
            }

            return chart.setData(summaryLineBarConfig);
        };        
    }
    
    angular
        .module("budgeting")
        .factory("oarSummaryLineBarChartModel", [
                "oarBudgetDetails",
                "oarSummaryLineBarChartConfig",
                "rpLineChart2Model",
                "rpColors",
                "moment",
                lineBarChartConfigFactory
        ]);

})(angular);