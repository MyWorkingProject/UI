//  SampleCg Model

(function (angular) {
    'use strict';

    function factory(preferences) {
        var model = {};
        model.emptyData = {
            columns: [], headers: [], totals: [], editable: [], quaterlyColumns: [], quaterlyHeaders: [], groupHeader:[]
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
                    label: month,
                    colName: month + " " + year,
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


        model.getGroupHeader = function (periodModel,totalColCount) {
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
       

        model.getHeaders = function (periodModel) {
            if (model.form.headers.length !== 0) {
                return model.form.headers;
            }
            var getKeyItemHeader = function (val, month, year) {
                var item = {
                    key: "period" + val,
                    text: month ,
                    colName: month + " " + year,
                    isSortable: true
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

      


        model.buildQuaterlyColumns=function(startMonth,endMonth,startYear,endYear,val){
                var item = {
                    width: 75,
                    key: "period"+val,                  
                    label: startMonth + " " + startYear.toString().substring(2, 4) + " - " + endMonth + " " + endYear.toString().substring(2, 4),
                    colName: startMonth + " " + startYear.toString().substring(2, 4) + " - " + endMonth + " " + endYear.toString().substring(2, 4),
                    state: {
                        active: true,
                        locked: false
                    },
                    isDataColumn: true,
                    classNames: "toggle-text"
                };

                return item;
        };


          model.getQuaterlyHeaders = function (periodModel,colType) {
            var items = [];
            var currentMonth,currentEndMonth,currentStartMonth,item;
            var year=  periodModel.year;
              var startMonth= periodModel.startMonth;
             var noOfPeriods= periodModel.noOfPeriods; 
              var startDt = new Date();
              startDt.setFullYear(year, parseInt(startMonth) - 1, 1);
                startDt.getFullYear();
              var months=periodModel.months;                    
             var totalQuaters=(Math.floor(noOfPeriods/3))+((noOfPeriods%3) > 0 ? 1: 0);
            var lastMonths = noOfPeriods % 3;
            var startYear, EndYear, EndDate = new Date();
            EndDate.setFullYear(year, parseInt(startMonth) - 1, 1);
            startYear = startDt.getFullYear(); 
             currentMonth=startMonth-1;
             for (var i = 0; i < totalQuaters; i++) {
                    EndDate =new Date(startDt.getFullYear(),startDt.getMonth(), 1);
                    if(i === totalQuaters - 1 && lastMonths > 0){
                      EndDate.setMonth(startDt.getMonth() + (lastMonths-1)); 
                    }
                    else{
                        EndDate.setMonth(startDt.getMonth() + 2); 
                    }
                    EndYear = EndDate.getFullYear(); 
                if(colType==="Columns"){
                     item=model.buildQuaterlyColumns(months[startDt.getMonth()],months[EndDate.getMonth()],startYear,EndYear,i+1); 
                }
                else if(colType==="Headers"){
                     item=model.buildQuaterlyHeaders(months[startDt.getMonth()],months[EndDate.getMonth()],startYear,EndYear,i+1); 
                }
                  
                  items.push(item);
                  startDt =new Date(EndDate.getFullYear(),EndDate.getMonth(), 1);
                  startDt.setMonth(startDt.getMonth() + 1); 
                  startYear = startDt.getFullYear(); 
            }
            return  items;
        };

         model.buildQuaterlyHeaders=function(startMonth,endMonth,startYear,endYear,val){
                var item = {                  
                    key: "period"+val,                  
                    text: startMonth + " " + startYear.toString().substring(2, 4) + " - " + endMonth + " " + endYear.toString().substring(2, 4),
                    colName: startMonth + " " + startYear.toString().substring(2, 4) + " - " + endMonth + " " + endYear.toString().substring(2, 4),

                    isSortable: true
                };

                return item;
        };

  

        return model;
    }

    angular
        .module('budgeting')
        .factory('ConfigSettings', ['managePreferences',factory]);
})(angular);
