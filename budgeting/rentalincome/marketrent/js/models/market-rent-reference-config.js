//  SampleCg Grid Config Model

(function (angular) {
    "use strict";

    function factory(marketRentSettingModel) {
        return function (model, periodModel) {
            var total,
                columns,
                headers, defaultColumns, defaultHeaders;


            defaultColumns = [{
                width: 250,
                key: "rowTitle",
                state: {
                    active: true,
                    locked: true
                },
                classNames: "toggle-text"
            }, {
                width: 80,
                key: "total",
                label: "",
                state: {
                    active: true,
                    locked: true
                },
                isDataColumn: true,
                classNames: "toggle-text"
            }];

            columns = defaultColumns.concat(marketRentSettingModel.getColumns(periodModel));

            defaultHeaders = [{
                key: "rowTitle",
                text: ""
            }, {
                key: "total",
                text: "Total"
            }];

            headers = [defaultHeaders.concat(marketRentSettingModel.getHeaders(periodModel))];

            model
                .setColumns(columns)
                .setHeaders(headers);

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("MarketRentRefModelConfig", ["MarketRentSettingModel", factory]);
})(angular);
