//  SampleCg Model

(function (angular) {
    'use strict';

    function factory() {
        var model = {};
        model.emptyData = {
              columns: [], headers: [], totals: [], editable: [], rowHeightClass:"small", groupHeader:[]
        };

        model.form = {};

        angular.copy(model.emptyData, model.form);
        
        model.reset = function(){
            angular.copy(model.emptyData, model.form);
        };
        
        model.getRowHeigthClass = function(){
            return model.form.rowHeightClass;
        };

        model.setColumnState = function(options){
            model.form.columns.forEach(function (item , index) {
               item.state.active = options[index].value;
                     // postData.push(model.getMRProformaTypesRecord(item));
            });
        };

        model.getColumnData = function(){
            return model.form.columns;
        };
        
        model.getColumns = function (periodModel) {
            if (model.form.columns.length !== 0) {
                return model.form.columns;
            }

            var getKeyItemCol = function (val, month, year) {
                var item = {
                    width: 85,
                    key: "period" + val,
                    label: month, //+ " " + year,
                    colName: month + " " + year,
                    state: {
                        active: true,
                        locked: false
                    },
                    isDataColumn: true,
                    classNames: "toggle-text, text-right"
                };

                return item;
            };
            var startDt = new Date();
            startDt.setFullYear(periodModel.year, parseInt(periodModel.startMonth) - 1, 1);
            for (var i = 0; i < periodModel.noOfPeriods; i++) {
                model.form.columns.push(getKeyItemCol(i + 1, periodModel.months[startDt.getMonth()], startDt.getFullYear()));
                startDt.setMonth(startDt.getMonth() + 1);
            }
            return model.form.columns;
        };

        model.getHeaders = function (periodModel) {
            if (model.form.headers.length !== 0) {
                return model.form.headers;
            }
            var getKeyItemHeader = function (val, month, year) {
                var item = {
                    key: "period" + val,
                    text: month,
                    colName: month + " " + year,
                    isSortable: false
                };

                return item;
            };

            var startDt = new Date();
            startDt.setFullYear(periodModel.year, parseInt(periodModel.startMonth) - 1, 1);
            for (var i = 0; i < periodModel.noOfPeriods; i++) {
                model.form.headers.push(getKeyItemHeader(i + 1, periodModel.months[startDt.getMonth()], startDt.getFullYear()));
                startDt.setMonth(startDt.getMonth() + 1);
            }
            return model.form.headers;
        };

        model.getGroupHeader = function (periodModel, totalColCount) {
            model.form.groupHeader = [];

            var getKeyItemCol = function (text, colSpan) {
                var item = {
                    key: "yearGroup",
                    text: text,
                    classNames: "year-header-group",
                    colspan: colSpan,
                    state: {
                        active: true,
                        locked: false
                    }
                };

                return item;
            };
            var startDt = new Date();
            startDt.setFullYear(periodModel.year, parseInt(periodModel.startMonth) - 1, 1);
            var startYear = startDt.getFullYear();
            var currentYear = startDt.getFullYear();
            var spanCnt = 0;         
            for (var i = 0; i < periodModel.noOfPeriods; i++) {
                spanCnt++;
                startDt.setMonth(startDt.getMonth() + 1);
                if (startDt.getFullYear() !== currentYear) {
                    model.form.groupHeader.push(getKeyItemCol(currentYear, spanCnt));
                    spanCnt = 0;
                    currentYear = startDt.getFullYear();
                }
                if (i === periodModel.noOfPeriods - 1) {
                    if (startYear !== currentYear && spanCnt !==0) {
                        model.form.groupHeader.push(getKeyItemCol(currentYear, spanCnt));
                        spanCnt = 0;
                    }
                }
            }
            
         var extraColumnCount = model.getExtraColumnCount(totalColCount, model.form.groupHeader);
            model.form.groupHeader.push(getKeyItemCol("", extraColumnCount));
            return model.form.groupHeader;
        };


         model.getExtraColumnCount = function (totalColCount, data) {
            var colCount = 0;
            angular.forEach(data, function (item) {
                colCount = colCount + item.colspan;

            });
            return totalColCount - colCount;

        }; 

        model.getTotal = function (periodModel) {
            if (model.form.totals.length !== 0) {
                return model.form.totals;
            }
            var getKeyItemTotal = function (val, methodName) {
                var item = {
                    key: "period" + val,
                    methodName: methodName
                };
                return item;
            };

            for (var i = 0; i < periodModel.noOfPeriods; i++) {
                model.form.totals.push(getKeyItemTotal(i + 1, periodModel.months[i % 12]));
            }
            return model.form.totals;
        };

        //model.getEditable = function (periodModel) {
        //    if (model.editable.length !== 0) {
        //        return model.editable;
        //    }
        //    var getKeyItemEditable = function (val, templateUrl, methodName) {
        //        var item = {
        //            key: "period" + val,
        //            templateUrl: templateUrl,
        //            methodName: "model.getMethod(" + methodName + ")"
        //        };
        //        return item;
        //    };

        //    for (var i = 0; i < periodModel.noOfPeriods; i++) {
        //        model.totals.push(getKeyItemEditable(i + 1, periodModel.months[i % 12]));
        //    }
        //};

        return model;
    }

    angular
        .module('budgeting')
        .factory('MarketRentSettingModel', [factory]);
})(angular);
