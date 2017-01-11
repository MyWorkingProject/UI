//  Pricing Grid Model Configuration

(function (angular) {
    "use strict";

    // Define the list of headers
    function defineHeaders(i18n) {
        var hdConfig = [[{
            text: "", //i18n.translate("bdgt_new_contract_year")
            key: "year",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_jan"),
            key: "jan",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_feb"),
            key: "feb",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_mar"),
            key: "mar",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_apr"),
            key: "apr",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_may"),
            key: "may",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_jun"),
            key: "jun",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_jul"),
            key: "jul",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_aug"),
            key: "aug",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_sep"),
            key: "sep",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_oct"),
            key: "oct",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_nov"),
            key: "nov",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_dec"),
            key: "dec",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_total"),
            key: "total",
            isSortable: false
        }]];

        var hdSetup = function () {
            return hdConfig;
        };

        return hdSetup;
    }

    // Define the list of columns
    function defineColumns() {
        var templatePath = "app/templates/grid.pricing-editable.html";
        var columnConfig = [{
                type: "text",
                key: "year",
            }, {
                type: "custom",
                key: "jan",
                templateUrl: templatePath
            }, {
                type: "custom",
                key: "feb",
                templateUrl: templatePath
            }, {
                type: "custom",
                key: "mar",
                templateUrl: templatePath
            }, {
                type: "custom",
                key: "apr",
                templateUrl: templatePath
            }, {
                type: "custom",
                key: "may",
                templateUrl: templatePath
            }, {
                type: "custom",
                key: "jun",
                templateUrl: templatePath
            }, {
                type: "custom",
                key: "jul",
                templateUrl: templatePath
            }, {
                type: "custom",
                key: "aug",
                templateUrl: templatePath
            }, {
                type: "custom",
                key: "sep",
                templateUrl: templatePath
            }, {
                type: "custom",
                key: "oct",
                templateUrl: templatePath
            }, {
                type: "custom",
                key: "nov",
                templateUrl: templatePath
            }, {
                type: "custom",
                key: "dec",
                templateUrl: templatePath
            }, {
                type: "custom",
                key: "total",
                templateUrl: "app/templates/grid.currency-display.html"
            }];

        var columnSetup = function() {
            return columnConfig;
        };

        return columnSetup;
    }

    function gridFactory(rpGridConfig, i18n) {
        var gridConfig = rpGridConfig();

        //initialize payment terms' grid model
        gridConfig.get = defineColumns();
        gridConfig.getHeaders = defineHeaders(i18n);

        return gridConfig;
    }

    angular
        .module("budgeting")
        .factory("pricingGridConfigModel", [
                "rpGridConfig",
                "contractTranslatorSvc",
                gridFactory
        ]);

})(angular);