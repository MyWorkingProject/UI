//  Payment Terms Grid Model Configuration

(function (angular) {
    "use strict";

    // Define the list of headers
    function defineHeaders(i18n) {
        var hdConfig = [[{
            text: i18n.translate("bdgt_new_contract_hd_action"),
            key: "action",
            isSortable: false
        }, {
            text: i18n.translate("bdgt_new_contract_hd_start_date"),
            key: "startDate",
            isSortable: true
        }, {
            text: i18n.translate("bdgt_new_contract_hd_end_date"),
            key: "endDate",
            isSortable: true

        }, {
            text: i18n.translate("bdgt_new_contract_hd_frequency"),
            key: "frequency",
            isSortable: true
        }, {
            text: i18n.translate("bdgt_new_contract_hd_amount"),
            key: "amount",
            isSortable: true
        }, {
            text: i18n.translate("bdgt_new_contract_hd_total"),
            key: "total",
            isSortable: true
        }]];

        var hdSetup = function () {
            return hdConfig;
        };

        return hdSetup;
    }

    // Define the list of filters
    function defineFilters(i18n) {
        var filterConfig = [{
            key: "action"
        }, {
            key: "startDate",
            type: "text",
            placeholder: i18n.translate("bdgt_new_contract_filter_start_date")
        }, {
            key: "endDate",
            type: "text",
            placeholder: i18n.translate("bdgt_new_contract_filter_end_date")
        }, {
            key: "frequency",
            value: "%",
            type: 'menu',
            options: [{
                name: i18n.translate("bdgt_new_contract_filter_fq_all"),
                value: "%"
            }, {
                name: i18n.translate("bdgt_new_contract_filter_fq_weekly"),
                value: i18n.translate("bdgt_new_contract_filter_fq_weekly")
            }, {
                name: i18n.translate("bdgt_new_contract_filter_fq_biweekly"),
                value: i18n.translate("bdgt_new_contract_filter_fq_biweekly")
            }, {
                name: i18n.translate("bdgt_new_contract_filter_fq_monthly"),
                value: i18n.translate("bdgt_new_contract_filter_fq_monthly")
            }, {
                name: i18n.translate("bdgt_new_contract_filter_fq_quarterly"),
                value: i18n.translate("bdgt_new_contract_filter_fq_quarterly")
            }, {
                name: i18n.translate("bdgt_new_contract_filter_fq_annually"),
                value: i18n.translate("bdgt_new_contract_filter_fq_annually")
            }, {
                name: i18n.translate("bdgt_new_contract_filter_fq_annualized"),
                value: i18n.translate("bdgt_new_contract_filter_fq_annualized")
            }, {
                name: i18n.translate("bdgt_new_contract_filter_fq_others"),
                value: i18n.translate("bdgt_new_contract_filter_fq_others")
            }],
        }, {
            key: "amount",
            type: "text",
            placeholder: i18n.translate("bdgt_new_contract_filter_amount")
        }, {
            key: "total",
            type: "text",
            placeholder: i18n.translate("bdgt_new_contract_filter_total")
        }];

        var filterSetup = function () {
            return filterConfig;
        };

        return filterSetup;
    }

    // Define the list of columns
    function defineColumns(actionsModel) {
        var columnConfig = [{
            key: "action",
            type: "actionsMenu",
            getActions: actionsModel.get
        }, {
            key: "startDate",
            type: "date"
        }, {
            key: "endDate",
            type: "date"
        }, {
            key: "frequency",
            type: "text"
        }, {
            key: "amount",
            type: "custom",
            templateUrl: "app/templates/grid.currency-display.html"
        }, {
            key: "total",
            type: "custom",
            templateUrl: "app/templates/grid.currency-display.html"
        }];

        var columnSetup = function() {
            return columnConfig;
        };

        return columnSetup;
    }

    function gridFactory(actionsModel, rpGridConfig, i18n) {
        var gridConfig = rpGridConfig();

        //initialize payment terms' grid model
        gridConfig.get = defineColumns(actionsModel);
        gridConfig.getHeaders = defineHeaders(i18n);
        gridConfig.getFilters = defineFilters(i18n);

        return gridConfig;
    }

    angular
        .module("budgeting")
        .factory("paymentTermsGridConfigModel", [
                "paymentTermsActionsModel",
                "rpGridConfig",
                "contractTranslatorSvc",
                gridFactory
        ]);

})(angular);