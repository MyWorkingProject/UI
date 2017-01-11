//Occupancy and Renewals > Summary > Pie Chart Config Model

(function (angular) {
    "use strict";

    function factory(rpPieChartModel, rpPieChartConfig, i18n) {

        return function(type, chartData) {
            var pieChart = rpPieChartModel(),
                pieChartConfig = rpPieChartConfig(),
                tooltipValueLabelLookup = {};

            if(type == "leaseRenewals") {
                tooltipValueLabelLookup = {
                    0: i18n.translate("oar_turnover"),
                    1: i18n.translate("oar_lease_renewals"),
                };
            } else {
                tooltipValueLabelLookup = {
                    0: i18n.translate("oar_vacancy"),
                    1: i18n.translate("oar_occupancy"),
                };
            }

            pieChartConfig.extend({
                tooltipFormat: '<span style="color: {{color}}">&#9679;</span> {{offset:label}}',
                tooltipValueLookups: {
                    label: tooltipValueLabelLookup
                }
            });

            return pieChart.setConfig(pieChartConfig)
                        .setData(chartData);

        };
    }

    angular
        .module("budgeting")
        .factory("oarSummaryPieChartModel", [
            "rpPieChart1Model",
            "rpPieChart1Config",
            "oarSummaryTranslatorSvc",
            factory
        ]);
})(angular);