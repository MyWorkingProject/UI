//  SampleCg Model

(function (angular) {
    'use strict';

    function factory() {
        var model = {};
        model.emptyData = {
              columns: [], headers: [], totals: [], editable: []
        };

        model.form = {};

        angular.copy(model.emptyData, model.form);
        
        model.reset = function(){
            angular.copy(model.emptyData, model.form);
        };
        
        
        model.getColumns = function (periodModel) {
            if (model.form.columns.length !== 0) {
                return model.form.columns;
            }

            var getKeyItemCol = function (val, month, year) {
                var item = {
                    width: 100,
                    key: "period" + val,
                    label: month + " " + year,
                    state: {
                        active: true,
                        locked: false
                    },
                    isDataColumn: true,
                    classNames: "toggle-text text-right"
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
                    text: month + " " + year,
                    isSortable: true
                };

                return item;
            };

            var startDt = new Date();
            startDt.setFullYear(periodModel.year, parseInt(periodModel.startMonth) - 1, 1);
            for (var i = 0; i < periodModel.noOfPeriods; i++) {
                model.form.headers.push(getKeyItemHeader(i + 1, periodModel.months[startDt.getMonth()], startDt.getFullYear()));
                startDt.setMonth(startDt.getMonth() + 1);
               // model.form.headers.push(getKeyItemHeader(i + 1, periodModel.months[i % 12], periodModel.year));
            }
            return model.form.headers;
        };


        model.getTotal = function (periodModel) {
            if (model.form.totals.length !== 0) {
                return model.form.totals;
            }
            var getKeyItemTotal = function (val, methodName) {
                var item = {
                    key: "period" + val,
                    methodName: "getTotal"
                };
                return item;
            };

            for (var i = 0; i < periodModel.noOfPeriods; i++) {
                model.form.totals.push(getKeyItemTotal(i + 1, periodModel.months[i % 12]));
            }
            return model.form.totals;
        };

      


  

        return model;
    }

    angular
        .module('budgeting')
        .factory('ConfigSettings', [factory]);
})(angular);
