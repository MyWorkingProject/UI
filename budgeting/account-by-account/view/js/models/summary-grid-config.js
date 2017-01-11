
(function (angular) {
    "use strict";

    function factory(ConfigSettings,manageConfig,configKeys) {
        return function (model,refTypes) {

            var total,
                columns, editable, colHeaderGroups,
                headers,descColumn,otherColumnsWithRefTypes,RollingActualsColumn,otherColumnsWithRefTypesForTotal,
                refDataForHeaders,otherColumnsWithRefTypesForHeaders,RollingActualsHeader,refDataForTotals,refColumns;
        

            /* BUILDING COLUMNS CONFIG */
            var totalHeader= manageConfig.getTotalLabelForSumamry();
             descColumn = [{
                width: 270,
                key: "description",
                state: {
                    active: true,
                    locked: true
                },
                classNames: "toggle-icon"
            },{
                             width: 80,
                            key: "total",
                            label:totalHeader,
                            state: {
                                active: true,
                                locked: false
                            },
                            isDataColumn: true,
                            classNames: "toggle-text"
            }]; 
            

            //Handling Ref COLUMNS
            var refRows=manageConfig.handleRefRowsForcolumns(refTypes);
            if(refRows.length>0){
                refColumns= descColumn.concat(refRows);  
            }

            //Concating Default Columns Based on condition
            if(refRows.length>0){
               otherColumnsWithRefTypes=  refColumns.concat(configKeys.columns.otherDefColumns); 
            }
            else{
               otherColumnsWithRefTypes=  descColumn.concat(configKeys.columns.otherDefColumns); 
            }

            //Concating RollingActuals
             var rolingActual=manageConfig.handleRolingActualsForColumns();
             if(rolingActual.length>0){
               RollingActualsColumn=  otherColumnsWithRefTypes.concat(rolingActual); 
             }

            //Concatination Comments             
            if(rolingActual.length>0){
               columns=  RollingActualsColumn.concat(configKeys.columns.commentCount); 
            }
            else{
               columns=  otherColumnsWithRefTypes.concat(configKeys.columns.commentCount); 
            }
            
           /* END OF BUILDING COLUMNS CONFIG*/
 
      

           /*START OF BUILDING  HEADERS CONFIG */

           var  defaultHeaders = 
                [{
                    key: "description",
                    text: "."
                },{
                    key: "total",
                    text:totalHeader
                    }];           
    

            //Handling Ref data for Headers 
            var refHeaders=manageConfig.handleRefForHeaders(refTypes);       
            if(refHeaders.length>0){
                refDataForHeaders= defaultHeaders.concat(refHeaders);  
            }
            
            //Concating Default Columns Based on condition
            if(refHeaders.length>0){
               otherColumnsWithRefTypesForHeaders=  refDataForHeaders.concat(configKeys.headers.otherDefHeaders); 
            }
            else{
               otherColumnsWithRefTypesForHeaders=  defaultHeaders.concat(configKeys.headers.otherDefHeaders); 
            }

            //Concating RollingActuals
             var rolingActualHeaders=manageConfig.handleRolingActualsForHeaders();
             if(rolingActualHeaders.length>0){
               RollingActualsHeader=  otherColumnsWithRefTypesForHeaders.concat(rolingActualHeaders); 
             }

            
            //Concatination Comments             
            if(rolingActualHeaders.length>0){
               headers=  [RollingActualsHeader.concat(configKeys.headers.commentCount)]; 
            }
            else{
               headers=  [otherColumnsWithRefTypesForHeaders.concat(configKeys.headers.commentCount)]; 
            }

            /*END OF BUILDING  HEADERS CONFIG */

            editable = [{
                key: "description",
                navigateToDetailView: model.getMethod("navigateToDetailView"),
                templateUrl: "account-by-account/view/templates/column-title.html"
            }];
            
            var index= columns.length - 1;

            editable[index]={
                key: "commentCount",
                loadComments: model.getMethod("loadComments"),
                templateUrl: "account-by-account/view/templates/account-by-account-chart.html"
            };

            colHeaderGroups =[
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
        .factory("summaryGridConfig", ["ConfigSettings","manageConfig","configKeys",factory]);
})(angular);
