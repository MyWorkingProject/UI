/* CLASSIC GRID CONFIGURATION */
(function (angular) {
    "use strict";

    function gridFactory(rpGridConfig, pricingUtils, i18n, moment) {
        var grid = {},
            gridConfig = rpGridConfig(),
            templateUrl = "app/templates/rent.grid-monthly.html";

        var defaultConfig = {
            startMonth: 1,
            startYear: moment().format("YYYY"),
            noOfPeriods: 12
        };

        grid.config = gridConfig;

        grid.addRowTitleConfig = function(hdConfig, columnConfig) {
            hdConfig.push({
                text: "",
                key: "columnTitle",
                isSortable: false
            });

            columnConfig.push({
                key: "columnTitle",
                type: "custom",
                templateUrl: "app/templates/rent.grid-col-title.html"
            });
        };

        grid.addTotalConfig = function(hdConfig, columnConfig) {
            hdConfig.push({
                text: i18n.translate("bdgt_change_rent_total"),
                key: "total",
                isSortable: false
            });

            columnConfig.push({
                key: "total",
                type: "custom",
                templateUrl: "app/templates/rent.grid-total.html"
            });
        };

        grid.initColumns = function(startYear, startMonth, noOfPeriods) {
            var activeDate = moment(),
                columnConfig = [],
                hdConfig = [];

            if(startYear === null || startYear === undefined) {
                startYear = defaultConfig.startYear;
            }
            if(startMonth === null || startMonth === undefined) {
                startMonth = defaultConfig.startMonth;
            }
            if(noOfPeriods === null || noOfPeriods === undefined) {
                noOfPeriods = defaultConfig.noOfPeriods;
            }

            grid.addRowTitleConfig(hdConfig, columnConfig);

            //set active date for tracking purposes
            activeDate.year(startYear)
                .month(startMonth - 1) //month is index 0
                .date(1); //assumes it's always the first day of the month

            for(var i=0; i<noOfPeriods; i++) {
                var keyStr = pricingUtils.getMonthKey(i+1); 

                hdConfig.push({
                    key: keyStr,
                    text: activeDate.format("MMM YYYY"),
                    isSortable: false        
                });

                columnConfig.push({
                    key: keyStr,
                    type: "custom",
                    templateUrl: templateUrl
                });

                //prepare next date
                activeDate.add(1, "months");
            }

            grid.addTotalConfig(hdConfig, columnConfig);            

            //initialize default adjustment grid model
            gridConfig.get = function() {
                return columnConfig;
            };
            gridConfig.getHeaders = function() {
                return [hdConfig];
            };
        };

        grid.setSrc = function(src) {
            gridConfig.setSrc(src);
        };
        
        return grid;
    }
    
    angular
        .module("budgeting")
        .factory("changeRentGridConfig", [
                "rpGridConfig",   
                "rentPricingUtility",
                "changeRentTranslatorSvc",
                "moment",
                gridFactory
        ]);

})(angular);

