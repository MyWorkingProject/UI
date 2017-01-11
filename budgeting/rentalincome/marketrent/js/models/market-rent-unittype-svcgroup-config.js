//  SampleCg Grid Config Model

(function (angular) {
    "use strict";

    function factory(marketRentSettingModel) {
        return function (model, periodModel) {
            var total,
                columns,
                headers,
                editable,
                defaultColumns, defaultHeaders, defaultTotals, defaultEditable, colHeaderGroups;


            defaultColumns = [{
                width: 300,
                key: "rowTitle",
                state: {
                    active: true,
                    locked: true
                },
                classNames: "toggle-text",
                templateUrl: "rentalincome/marketrent/templates/mktrent-stud-servicegrpheader.html"
            }, /*{
                width: 50,
                key: "commentCount",
                state: {
                    active: true,
                    locked: true
                },
                classNames: "toggle-text"
            },*/ {
                width: 100,
                key: "serviceUnitCount",
                state: {
                    active: true,
                    locked: true
                },
                classNames: "toggle-text text-right"
            }];

             var totalColumn = {
                width: 80, key: "total", label: "Total",
                state: {
                    active: true,
                    locked: false
                },
                isDataColumn: true, classNames: "toggle-text text-right"
            };

            var commentColumn = {
                width: 70, key: "", label: "",
                state: {
                    active: true,
                    locked: false
                },
                templateUrl: "rentalincome/marketrent/templates/mktrent-grp-comment-count.html",
                makeRentComment: model.getMethod("makeRentComment"),
                isDataColumn: false, classNames: "toggle-text text-right"
            };

            columns = defaultColumns.concat(marketRentSettingModel.getColumns(periodModel));
            columns = columns.concat(totalColumn);
            columns = columns.concat(commentColumn);

            defaultHeaders = [{
                key: "rowTitle",
                text: "Service Group"
            },/* {
                key: "commentCount",
                text: ""
            },*/ {
                key: "serviceUnitCount",
                text: "Units"
            }];

            var totalHeader =  { key: "total", text: "Total" , classNames:"text-right" };
            var commentCount =  { key: "", text: ""  };

            //headers = [defaultHeaders.concat(marketRentSettingModel.getHeaders(periodModel))];
            defaultHeaders = defaultHeaders.concat(marketRentSettingModel.getHeaders(periodModel));
            defaultHeaders = defaultHeaders.concat(totalHeader);
            defaultHeaders = defaultHeaders.concat(commentCount);
            headers = [defaultHeaders];

            defaultTotals = [{
                key: "rowTitle"
            },/* {
                key: "commentCount"
            },*/ {
                key: "serviceUnitCount"
            }];

            total = [defaultTotals.concat(marketRentSettingModel.getTotal(periodModel))];

            defaultEditable = [{
                key: "rowTitleUnitCalculation",
                templateUrl: "rentalincome/marketrent/templates/rent-title.html"
            },/* {
                key: "commentCount"
            },*/ {
                key: "serviceUnitCount",
                templateUrl: "rentalincome/marketrent/templates/mktrent-service-unit-editable.html",
                makeRentUnitVal: model.getMethod("makeRentUnitVal"),
                makeRentCountFocus: model.getMethod("makeRentCountFocus")
            }];

            var sEditable = [];           
           
            for (var i = 0; i < periodModel.noOfPeriods; i++) {
                var item = {
                    key: "period" + (i + 1),  isSortable: false,
                    templateUrl: "rentalincome/marketrent/templates/mktrent-editable.html",
                    makeRentVal: model.getMethod("makeRentVal"),
                    makeRentFocus: model.getMethod("makeRentFocus")
                };
                sEditable.push(item);
            }
            sEditable.push({key: "total"});
            sEditable.push({key: "commentCount"});
            editable  = defaultEditable.concat(sEditable);

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
                .setRowConfig("editable", editable)
                .setColHeaderGroups(colHeaderGroups)
                .setRowConfig("groupHeader", total);

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("MarketRentServiceGroupModelConfig", ["MarketRentSettingModel", factory]);
})(angular);
