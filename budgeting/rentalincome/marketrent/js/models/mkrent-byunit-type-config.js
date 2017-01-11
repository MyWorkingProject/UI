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
                width: 200, key: "description",
                state: {
                    active: true,
                    locked: true
                },
                templateUrl: "rentalincome/marketrent/templates/mktrent-unittype-chaticon.html"
            }, {
                width: 50, key: "unitCount",
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
                templateUrl: "rentalincome/marketrent/templates/mktrent-comment-count.html",
                makeRentComment: model.getMethod("makeRentComment"),
                isDataColumn: false, classNames: "toggle-text text-right"
            };

            columns = defaultColumns.concat(marketRentSettingModel.getColumns(periodModel));
            columns = columns.concat(totalColumn);
            columns = columns.concat(commentColumn);


            defaultHeaders = [{
                key: "description", text: "Unit Type", isSortable: true
            }, {
                key: "unitCount", text: "Units"
            }];

            var totalHeader =  { key: "total", text: "Total" , classNames:"text-right" };
            var commentCount =  { key: "", text: ""  };

            //headers = [defaultHeaders.concat(marketRentSettingModel.getHeaders(periodModel))];
            defaultHeaders = defaultHeaders.concat(marketRentSettingModel.getHeaders(periodModel));
            defaultHeaders = defaultHeaders.concat(totalHeader);
            defaultHeaders = defaultHeaders.concat(commentCount);
            headers = [defaultHeaders];


            defaultEditable = [{
                key: "description"
            }, {
                key: "unitCount"
            }];

            var sEditable = [];

            for (var i = 0; i < periodModel.noOfPeriods; i++) {
                var item = {
                    key: "period" + (i + 1), isSortable: false,
                    templateUrl: "rentalincome/marketrent/templates/mktrent-editable.html",
                    makeRentVal: model.getMethod("makeRentVal"),
                    makeRentFocus: model.getMethod("makeRentFocus")
                };
                sEditable.push(item);
            }
            sEditable.push({key: "total"});
            sEditable.push({key: "commentCount"});
            editable = defaultEditable.concat(sEditable);

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
                .setRowConfig("groupHeader", columns)   
                .setRowConfig("editable", editable);

            return model;
        };
    }

    angular.module("budgeting").factory("mkrentByUnittypeGridConfig", ["MarketRentSettingModel", factory]);
})(angular);
