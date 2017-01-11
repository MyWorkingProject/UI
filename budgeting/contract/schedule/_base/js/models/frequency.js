// Frequency Options

(function (angular) {
    "use strict";

    function frequencyFactory(i18n) {
        var options = {
                WEEKLY: {
                    value: "weekly",
                    name: i18n.translate("bdgt_new_contract_filter_fq_weekly")
                },
                BIWEEKLY: {
                    value: "bi-weekly",
                    name: i18n.translate("bdgt_new_contract_filter_fq_biweekly")
                },
                MONTHLY: {
                    value: "monthly",
                    name: i18n.translate("bdgt_new_contract_filter_fq_monthly")
                },
                QUARTERLY: {
                    value: "quarterly",
                    name: i18n.translate("bdgt_new_contract_filter_fq_quarterly")
                },
                ANNUALLY: { //action is perfomed from the start period and done every year
                    value: "annually",
                    name: i18n.translate("bdgt_new_contract_filter_fq_annually")
                },
                ANNUALIZED: { //single action is divided into 12 (months)
                    value: "annualized",
                    name: i18n.translate("bdgt_new_contract_filter_fq_annualized")
                },
                OTHERS: { //none of the above
                    value: "others",
                    name: i18n.translate("bdgt_new_contract_filter_fq_others")
                }
            };

        var frequency = angular.copy(options);

        frequency.list = [];
        angular.forEach(options, function (value) {
            frequency.list.push(value);
        });        

        return frequency;
    }

    angular
        .module("budgeting")
        .factory('frequency', [
            "contractTranslatorSvc",
            frequencyFactory
        ]);
})(angular);