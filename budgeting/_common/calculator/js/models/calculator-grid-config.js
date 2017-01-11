/* CLASSIC GRID CONFIGURATION */
(function (angular) {
    "use strict";

    function gridFactory(rpGridConfig, pricingUtils, i18n, moment) {
        var grid = {},
            gridConfig = rpGridConfig(),
            templateUrl = "app/templates/calculator.grid-monthly.html";

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
                templateUrl: "app/templates/calculator.grid-col-title.html"
            });
        };

        grid.addTotalConfig = function(hdConfig, columnConfig) {
            hdConfig.push({
                text: i18n.translate("bdgt_calculator_total"),
                key: "total",
                isSortable: false
            });

            columnConfig.push({
                key: "total",
                type: "custom",
                templateUrl: "app/templates/calculator.grid-total.html"
            });
        };

        grid.initColumns = function(startYear, startMonth, noOfPeriods) {
            var activeDate = moment(),
                columnConfig = [],
                hdConfig = [],
                dateFormat = "MMM YYYY";

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

            if(startYear && startMonth == 1 && noOfPeriods <= 12) {
                dateFormat = "MMM";
            }

            //set active date for tracking purposes
            activeDate.year(startYear)
                .month(startMonth - 1) //month is index 0
                .date(1); //assumes it's always the first day of the month

            for(var i=0; i<noOfPeriods; i++) {
                var keyStr = pricingUtils.getMonthKey(i+1); 

                hdConfig.push({
                    key: keyStr,
                    text: activeDate.format(dateFormat),
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
        .factory("calculatorGridConfig", [
                "rpGridConfig",   
                "calcPricingUtility",
                "calcuTranslatorSvc",
                "moment",
                gridFactory
        ]);

})(angular);

/* COMPLEX GRID CONFIGURATION */
/*
(function (angular) {
    "use strict";

    // Define the list of headers
    function defineHeaders(i18n) {
        var hdConfig = [[{
            text: "",
            key: "columnTitle",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_calculator_jan"),
            key: "jan",
            isSortable: false        
        }, {
            text: i18n.translate("bdgt_calculator_feb"),
            key: "feb",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_calculator_mar"),
            key: "mar",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_calculator_apr"),
            key: "apr",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_calculator_may"),
            key: "may",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_calculator_jun"),
            key: "jun",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_calculator_jul"),
            key: "jul",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_calculator_aug"),
            key: "aug",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_calculator_sep"),
            key: "sep",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_calculator_oct"),
            key: "oct",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_calculator_nov"),
            key: "nov",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_calculator_dec"),
            key: "dec",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_calculator_total"),
            key: "total",
            isSortable: false
        }]];

        // var hdSetup = function () {
        //     return hdConfig;
        // };

        return hdConfig;
    }

    // Define the list of columns
    function defineColumns(i18n) {
        var templatePath = "app/templates/calculator.results-grid.html";
        var columnConfig = [{
                key: "columnTitle",
                type: "text",
                state: {
                    active: true,
                    locked: true
                },
                width: 75,
            }, {
                key: "jan",
                type: "custom",
                state: {
                    active: true,
                    locked: true //locked: false
                },
                isDataColumn: true,
                width: 75,
                templateUrl: templatePath
            }, {
                key: "feb",
                type: "custom",
                state: {
                    active: true,
                    locked: true //locked: false
                },
                isDataColumn: true,
                width: 75,
                templateUrl: templatePath
            }, {
                key: "mar",
                type: "custom",
                state: {
                    active: true,
                    locked: true //locked: false
                },
                isDataColumn: true,
                width: 75,
                templateUrl: templatePath
            }, {
                key: "apr",
                type: "custom",
                state: {
                    active: true,
                    locked: true //locked: false
                },
                isDataColumn: true,
                width: 75,
                templateUrl: templatePath
            }, {
                key: "may",
                type: "custom",
                state: {
                    active: true,
                    locked: true //locked: false
                },
                isDataColumn: true,
                width: 75,
                templateUrl: templatePath
            }, {
                key: "jun",
                type: "custom",
                state: {
                    active: true,
                    locked: true //locked: false
                },
                isDataColumn: true,
                width: 75,
                templateUrl: templatePath
            }, {
                key: "jul",
                type: "custom",
                state: {
                    active: true,
                    locked: true //locked: false
                },
                isDataColumn: true,
                width: 75,
                templateUrl: templatePath
            }, {
                key: "aug",
                type: "custom",
                state: {
                    active: true,
                    locked: true //locked: false
                },
                isDataColumn: true,
                width: 75,
                templateUrl: templatePath
            }, {
                key: "sep",
                type: "custom",
                state: {
                    active: true,
                    locked: true //locked: false
                },
                isDataColumn: true,
                width: 75,
                templateUrl: templatePath
            }, {
                key: "oct",
                type: "custom",
                state: {
                    active: true,
                    locked: true //locked: false
                },
                isDataColumn: true,
                width: 75,
                templateUrl: templatePath
            }, {
                key: "nov",
                type: "custom",
                state: {
                    active: true,
                    locked: true //locked: false
                },
                isDataColumn: true,
                width: 75,
                templateUrl: templatePath
            }, {
                key: "dec",
                type: "custom",
                state: {
                    active: true,
                    locked: true //locked: false
                },
                isDataColumn: true,
                width: 75,
                templateUrl: templatePath
            }, {
                key: "total",
                type: "custom",
                state: {
                    active: true,
                    locked: true
                },
                isDataColumn: true,
                width: 75,
                templateUrl: templatePath
            }];

        // var columnSetup = function() {
        //     return columnConfig;
        // };

        return columnConfig;
    }

    function defineApplyChangesRow() {
        var applyChangesTemplate = "app/templates/calculator.apply-changes.html";
        var rowConfig = [{
                key: "columnTitle"
            }, {
                key: "jan",
                templateUrl: applyChangesTemplate
            }, {
                key: "feb",
                templateUrl: applyChangesTemplate                
            }, {
                key: "mar",
                templateUrl: applyChangesTemplate                
            }, {
                key: "apr",
                templateUrl: applyChangesTemplate
            }, {
                key: "may",
                templateUrl: applyChangesTemplate
            }, {
                key: "jun",
                templateUrl: applyChangesTemplate
            }, {
                key: "jul",
                templateUrl: applyChangesTemplate
            }, {
                key: "aug",
                templateUrl: applyChangesTemplate
            }, {
                key: "sep",
                templateUrl: applyChangesTemplate
            }, {
                key: "oct",
                templateUrl: applyChangesTemplate
            }, {
                key: "nov",
                templateUrl: applyChangesTemplate
            }, {
                key: "dec",
                templateUrl: applyChangesTemplate
            }, {
                key: "total",
                templateUrl: "app/templates/cgrid.currency-display.html"
            }];
        return rowConfig;
    }

    function defineEditableRow() {
        var editableTemplate = "app/templates/calculator.currency-grid-editable.html";
        var rowConfig = [{
                key: "columnTitle"
            }, {
                key: "jan",
                templateUrl: editableTemplate
            }, {
                key: "feb",
                templateUrl: editableTemplate                
            }, {
                key: "mar",
                templateUrl: editableTemplate                
            }, {
                key: "apr",
                templateUrl: editableTemplate
            }, {
                key: "may",
                templateUrl: editableTemplate
            }, {
                key: "jun",
                templateUrl: editableTemplate
            }, {
                key: "jul",
                templateUrl: editableTemplate
            }, {
                key: "aug",
                templateUrl: editableTemplate
            }, {
                key: "sep",
                templateUrl: editableTemplate
            }, {
                key: "oct",
                templateUrl: editableTemplate
            }, {
                key: "nov",
                templateUrl: editableTemplate
            }, {
                key: "dec",
                templateUrl: editableTemplate
            }, {
                key: "total",
                templateUrl: "app/templates/cgrid.currency-display.html"
            }];
        return rowConfig;
    }
    
    function gridFactory(i18n) {
        var columns = defineColumns(i18n),
            headers = defineHeaders(i18n),
            applyChangesRow = defineApplyChangesRow(),
            editableRow = defineEditableRow();

        return function(gridConfig) {

            gridConfig.setColumns(columns)
                        .setHeaders(headers)
                        .setRowConfig("monthlyAmount", editableRow)
                        .setRowConfig("applyChanges", applyChangesRow)
                        .setRowConfig("results", editableRow);


            return gridConfig;
        };        
    }

    angular
        .module("budgeting")
        .factory("calculatorGridConfig", [
                //"rpGridConfig",            
                "calcuTranslatorSvc",
                gridFactory
        ]);

})(angular);
*/