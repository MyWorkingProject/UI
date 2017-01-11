//  SampleCg Grid Config Model

(function (angular) {
    "use strict";

    function factory(marketRentSettingModel) {
        return function (model, periodModel) {
            var total,
                columns,
                headers, defaultColumns, defaultHeaders, colHeaderGroups;

            defaultColumns = [{
                width: 210,
                key: "rowTitle",
                state: {
                    active: true,
                    locked: true
                },
                classNames: "toggle-text"
            }, {
                width: 75,
                key: "units",
                label: "",
                state: {
                    active: true,
                    locked: true
                },
                isDataColumn: false,
                classNames: "toggle-text text-right"
            }];

            columns = defaultColumns.concat(marketRentSettingModel.getColumns(periodModel));
            columns = columns.concat({
                width: 100,
                key: "total",
                label: "",
                state: {
                    active: true,
                    locked: false
                },
                isDataColumn: true,
                classNames: "toggle-text text-right",
                templateUrl: "rentalincome/marketrent/templates/mktrent-total.html"
            });

            defaultHeaders = [{
                key: "rowTitle",
                text: "Summary"
            }, {
                key: "units",
                text: periodModel.isStudentUnit ? "Apts/Beds" : (periodModel.isStudentUnitType ? "Beds" : "Units")
            }];

            defaultHeaders = defaultHeaders.concat(marketRentSettingModel.getHeaders(periodModel));
            defaultHeaders = defaultHeaders.concat( {
                key: "total",
                text: "Total"
            });
            headers = [defaultHeaders];

             colHeaderGroups = 
                [{
                    key: "columnTitle",
                    text: "",
                    classNames: "title-header-group",
                    colspan: "2",
                    state: {
                        active: true,
                        locked: true
                    },
                }];

            marketRentSettingModel.getGroupHeader(periodModel, columns.length).forEach(function (items) {
                colHeaderGroups.push(items);
            });

            colHeaderGroups = [colHeaderGroups];

            model
            .setColumns(columns)
            .setHeaders(headers)
            .setColHeaderGroups(colHeaderGroups)
            .setRowConfig("groupHeader", columns);    
            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("MarketRentModelConfig", ["MarketRentSettingModel", factory]);
})(angular);
