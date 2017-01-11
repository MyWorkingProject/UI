//Occupancy and Renewals > Summary > Line Bar Chart Config Model

(function (angular) {
    "use strict";

    function factory(rpColors) {
        var config = {};

        config.settings = {
            colors: [],
            exporting: {
                enabled: false
            },
            title: {
                text: "",
                x: -20 //center
            },
            xAxis: {
                categories: []
            },
            yAxis: [{ //Left
                title: {
                    text: ""
                }
            }, { //Right
                title: {
                    text: ""
                },
                min: 0,
                max: 100,
                labels: {
                    format: "{value}%",
                    style: {
                        color: rpColors.accent
                    }
                },
                // tickAmount: 2,

                opposite: true
            }],
            legend: {
                align: "right",
                verticalAlign: "top",
                borderWidth: 0
            },
            series: []
        };

        config.columnSeries = {
            type: "column",
            data: []
        };

        config.lineSeries = {
            type: "line",
            data: [],
            marker: {
                enabled: true,
                symbol: "circle",
                height: 6,
                width: 6,
                lineWidth: 1,
                radius: 3,
                fillColor: rpColors.white,
                lineColor: rpColors.accent
            },
            yAxis: 1,
        };

        return config;
    }

    angular
        .module("budgeting")
        .factory("oarSummaryLineBarChartConfig", [
            "rpColors",
            factory
        ]);
})(angular);