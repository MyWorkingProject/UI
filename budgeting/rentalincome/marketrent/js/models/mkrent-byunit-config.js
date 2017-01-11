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
                width: 90, key: "unitNumber",
                state: {
                    active: true,
                    locked: true
                },
                templateUrl: "rentalincome/marketrent/templates/mktrent-unit-chaticon.html"
            }, {
                width: 200, key: "floorPlan",
                state: {
                    active: true,
                    locked: true
                },
                //classNames: "toggle-icon"
                templateUrl: "rentalincome/marketrent/templates/mktrent-unit-type-desription.html"
            }];

             var totalColumn = {
                width: 100, key: "total", label: "Total",
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
                key: "unitNumber", text: "Unit Number", isSortable: true, ASC: true
            }, {
                key: "floorPlan", text: "Unit Type", isSortable: true, ASC: true
            }];

            var totalHeader =  { key: "total", text: "Total" , classNames:"text-right" };
            var commentCount =  { key: "", text: ""  };

            //headers = [defaultHeaders.concat(marketRentSettingModel.getHeaders(periodModel))];
            defaultHeaders = defaultHeaders.concat(marketRentSettingModel.getHeaders(periodModel));
            defaultHeaders = defaultHeaders.concat(totalHeader);
            defaultHeaders = defaultHeaders.concat(commentCount);
            headers = [defaultHeaders];

            defaultEditable = [{
                key: "unitNumber"
            }, {
                key: "floorPlan"
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
            editable = defaultEditable.concat(sEditable);
            model.rowHeightClass = marketRentSettingModel.getRowHeigthClass();

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

    angular.module("budgeting").factory("mkrentByUnitGridConfig", ["MarketRentSettingModel", factory]);
})(angular);
