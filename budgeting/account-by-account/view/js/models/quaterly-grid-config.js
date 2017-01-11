//  SampleCg Grid Config Model

(function (angular) {
    "use strict";

    function factory(ConfigSettings, manageConfig, configKeys) {
        return function (model, periodModel, refTypes) {
            var total,
                columns, editable, colHeaderGroups,
                headers, descColumn, otherColumnsWithRefTypes, RollingActualsColumn, otherColumnsWithRefTypesForTotal,
                refDataForHeaders, otherColumnsWithRefTypesForHeaders, RollingActualsHeader, refDataForTotals, refColumns;


            /* BUILDING COLUMNS CONFIG */

            descColumn = [{
                width: 270,
                key: "description",
                state: {
                    active: true,
                    locked: true
                },
                classNames: "toggle-icon"
            }];



            var defWithPeriods = descColumn.concat(ConfigSettings.getQuaterlyHeaders(periodModel, "Columns"));

            // Concating Total & Avg Total Column
            var totalWithPeriods = defWithPeriods.concat(configKeys.columns.totalAndAvgColumns);


            //Handling Ref COLUMNS
            var refRows = manageConfig.handleRefRowsForcolumns(refTypes);
            if (refRows.length > 0) {
                refColumns = totalWithPeriods.concat(refRows);
            }

            //Concating Default Columns Based on condition
            if (refRows.length > 0) {
                otherColumnsWithRefTypes = refColumns.concat(configKeys.columns.otherDefColumns);
            }
            else {
                otherColumnsWithRefTypes = totalWithPeriods.concat(configKeys.columns.otherDefColumns);
            }

            //Concating RollingActuals
            var rolingActual = manageConfig.handleRolingActualsForColumns();
            if (rolingActual.length > 0) {
                RollingActualsColumn = otherColumnsWithRefTypes.concat(rolingActual);
            }

            //Concatination Comments             
            if (rolingActual.length > 0) {
                columns = RollingActualsColumn.concat(configKeys.columns.commentCount);
            }
            else {
                columns = otherColumnsWithRefTypes.concat(configKeys.columns.commentCount);
            }

            /* END OF BUILDING COLUMNS CONFIG*/

            /*START OF BUILDING  HEADERS CONFIG */

            var defaultHeaders =
                 [{
                     key: "description",
                     text: "."
                 }];
        

            // Concating Periods
            var defHeadersWithPeriods = defaultHeaders.concat(ConfigSettings.getQuaterlyHeaders(periodModel, "Headers"));

            //Concating Total and Avg Monthly Total
            var headerTotalAndAvgTotal = defHeadersWithPeriods.concat(configKeys.headers.headerTotalAndAvgTotal);

            //Handling Ref data for Headers 
            var refHeaders = manageConfig.handleRefForHeaders(refTypes);
            if (refHeaders.length > 0) {
                refDataForHeaders = headerTotalAndAvgTotal.concat(refHeaders);
            }

            //Concating Default Columns Based on condition
            if (refHeaders.length > 0) {
                otherColumnsWithRefTypesForHeaders = refDataForHeaders.concat(configKeys.headers.otherDefHeaders);
            }
            else {
                otherColumnsWithRefTypesForHeaders = headerTotalAndAvgTotal.concat(configKeys.headers.otherDefHeaders);
            }

            //Concating RollingActuals
            var rolingActualHeaders = manageConfig.handleRolingActualsForHeaders();
            if (rolingActualHeaders.length > 0) {
                RollingActualsHeader = otherColumnsWithRefTypesForHeaders.concat(rolingActualHeaders);
            }


            //Concatination Comments             
            if (rolingActualHeaders.length > 0) {
                headers = [RollingActualsHeader.concat(configKeys.headers.commentCount)];
            }
            else {
                headers = [otherColumnsWithRefTypesForHeaders.concat(configKeys.headers.commentCount)];
            }

            /*END OF BUILDING  HEADERS CONFIG */


            /*    var  defaultTotals = [{
                      key: "description"
                  }];
                var  defQtPeriods = [{
                      key: "period1",
                      methodName: "getTotal",
                      dataType: "currency"
                  }, {
                      key: "period2",
                      methodName: "getTotal"
                  }, {
                      key: "period3",
                      methodName: "getTotal"
                  }, {
                      key: "period4",
                      methodName: "getTotal"
                  }];
      
                  var  defDescPeriods = defaultTotals.concat(defQtPeriods);
      
                 //Concating Total And Avg Monthly Total
                  var totalAndAvgForTotal = defDescPeriods.concat(configKeys.totals.totalAndAvgForTotal);
      
                  
                      //Handling Ref data for Totals 
                  var refInfoForTotal=manageConfig.handleRefForTotals(refTypes);       
                  if(refInfoForTotal.length>0){
                      refDataForTotals= totalAndAvgForTotal.concat(refInfoForTotal);  
                  }
                  
                   //Concating Default Columns Based on condition
                  if(refInfoForTotal.length>0){
                     otherColumnsWithRefTypesForTotal=  refDataForTotals.concat(configKeys.totals.otherDefTotals); 
                  }
                  else{
                     otherColumnsWithRefTypesForTotal=  totalAndAvgForTotal.concat(configKeys.totals.otherDefTotals); 
                  }
                  
      
                   //Concating RollingActuals
                   var rolingActualTotal=manageConfig.handleRolingActualsForTotal();
                   if(rolingActualTotal.length>0){
                      total= otherColumnsWithRefTypesForTotal.concat(rolingActualTotal); 
                   }
                   else{
                       total = otherColumnsWithRefTypesForTotal;
                   }
                     
      
                     /*END OF BUILDING  TOTAL CONFIG */

            editable = [{
                key: "description",
                navigateToDetailView: model.getMethod("navigateToDetailView"),
                templateUrl: "account-by-account/view/templates/column-title.html"
            }];

            var index = columns.length - 1;

            editable[index] = {
                key: "commentCount",
                loadComments: model.getMethod("loadComments"),
                templateUrl: "account-by-account/view/templates/account-by-account-chart.html"
            };

            colHeaderGroups = [
             [{
                 key: "columnTitle",
                 text: "",
                 classNames: "title-header-group",
                 colspan: "12",
                 state: {
                     active: true,
                     locked: true
                 },
             }, {
                 key: "yearGroup",
                 text: "",
                 classNames: "year-header-group",
                 colspan: columns.length,
                 state: {
                     active: true,
                     locked: false
                 }
             }]];



            model
                .setColumns(columns)
                .setHeaders(headers)
                .setRowConfig("total", columns)
                .setRowConfig("editable", editable)
                .setColHeaderGroups(colHeaderGroups)
                .setRowConfig("groupHeader", columns);

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("accountByAccountQuaterlyGridConfig", ["ConfigSettings", "manageConfig", "configKeys", factory]);
})(angular);
