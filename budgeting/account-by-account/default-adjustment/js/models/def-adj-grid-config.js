(function (angular) {
    "use strict";

    function gridFactory(rpGridConfig, i18n, moment) {
        var grid = {},
            gridConfig = rpGridConfig(),
            templateUrl = "app/templates/default-adjustment.grid-cell.html";


        grid.config = gridConfig;

        /* Note: for other languages, combine moment.locale() with i18n */

        grid.addDescriptionConfig = function(hdConfig, columnConfig) {
            hdConfig.push({
                text: i18n.translate("def_adj_desc"),
                key: "description",
                isSortable: false
            });

            columnConfig.push({
                key: "description",
                type: "custom",
                templateUrl: "app/templates/default-adjustment.desc.html"
            });            
        };

        grid.addTotalConfig = function(hdConfig, columnConfig) {
            hdConfig.push({
                text: i18n.translate("def_adj_total"),
                key: "total",
                isSortable: false,
                className: "month-col"
            });

            columnConfig.push({
                key: "total",
                type: "custom",
                templateUrl: templateUrl
            });
        };

        grid.initColumns = function(startYear, startMonth, noOfPeriods) {
            var activeDate = moment(),
                columnConfig = [],
                hdConfig = [];

            if(startMonth === null || startMonth === undefined) {
                startMonth = 1;
            }
            if(noOfPeriods === null || noOfPeriods === undefined) {
                noOfPeriods = 0;
            }

            //add description as first column
            grid.addDescriptionConfig(hdConfig, columnConfig);

            //set active date for tracking purposes
            activeDate.year(startYear)
                .month(startMonth - 1) //month is index 0
                .date(1); //assumes it's always the first day of the month

            for(var i=0; i<noOfPeriods; i++) {
                var keyStr = activeDate.format("MMM-YYYY").toLowerCase();

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

            //add total as last column
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

    /*
    // Define the list of headers
    function defineHeaders(i18n) {
        var hdConfig = [[{
            text: i18n.translate("def_adj_desc"),
            key: "description",
            isSortable: false
        }, {
            text: i18n.translate("def_adj_jan"),
            key: "jan",
            isSortable: false        
        }, {
            text: i18n.translate("def_adj_feb"),
            key: "feb",
            isSortable: false
        }, {
            text: i18n.translate("def_adj_mar"),
            key: "mar",
            isSortable: false
        }, {
            text: i18n.translate("def_adj_apr"),
            key: "apr",
            isSortable: false
        }, {
            text: i18n.translate("def_adj_may"),
            key: "may",
            isSortable: false
        }, {
            text: i18n.translate("def_adj_jun"),
            key: "jun",
            isSortable: false
        }, {
            text: i18n.translate("def_adj_jul"),
            key: "jul",
            isSortable: false
        }, {
            text: i18n.translate("def_adj_aug"),
            key: "aug",
            isSortable: false
        }, {
            text: i18n.translate("def_adj_sep"),
            key: "sep",
            isSortable: false
        }, {
            text: i18n.translate("def_adj_oct"),
            key: "oct",
            isSortable: false
        }, {
            text: i18n.translate("def_adj_nov"),
            key: "nov",
            isSortable: false
        }, {
            text: i18n.translate("def_adj_dec"),
            key: "dec",
            isSortable: false
        }, {
            text: i18n.translate("def_adj_total"),
            key: "total",
            isSortable: false
        }]];

        var hdSetup = function () {
            return hdConfig;
        };

        return hdSetup;
    }

    // Define the list of columns
    function defineColumns(i18n) {
        var templatePath = "app/templates/calculator.results-grid.html"; //TODO
        var columnConfig = [{
                key: "description",
                type: "text"
            }, {
                key: "jan",
                type: "custom",
                templateUrl: templatePath
            }, {
                key: "feb",
                type: "custom",
                templateUrl: templatePath
            }, {
                key: "mar",
                type: "custom",
                templateUrl: templatePath
            }, {
                key: "apr",
                type: "custom",
                templateUrl: templatePath
            }, {
                key: "may",
                type: "custom",
                templateUrl: templatePath
            }, {
                key: "jun",
                type: "custom",
                templateUrl: templatePath
            }, {
                key: "jul",
                type: "custom",
                templateUrl: templatePath
            }, {
                key: "aug",
                type: "custom",
                templateUrl: templatePath
            }, {
                key: "sep",
                type: "custom",
                templateUrl: templatePath
            }, {
                key: "oct",
                type: "custom",
                templateUrl: templatePath
            }, {
                key: "nov",
                type: "custom",
                templateUrl: templatePath
            }, {
                key: "dec",
                type: "custom",
                templateUrl: templatePath
            }, {
                key: "total",
                type: "custom",
                templateUrl: templatePath
            }];

        var columnSetup = function() {
            return columnConfig;
        };

        return columnSetup;
    }
    */

    
    angular
        .module("budgeting")
        .factory("defaultAdjGridConfig", [
                "rpGridConfig",            
                "defaultAdjTranslatorSvc",
                "moment",
                gridFactory
        ]);

})(angular);