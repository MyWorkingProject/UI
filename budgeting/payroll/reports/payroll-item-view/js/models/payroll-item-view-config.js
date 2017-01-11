

(function (angular) {
    "use strict";

    function factory(ConfigSettings) {
        return function (model, periodModel,refTypes) {

            var total,
                columns,editable,
                headers,descColumn,totalColumn;
        

          

          descColumn = [{
                width: 270,
                key: "payrollItemName",
                state: {
                    active: true,
                    locked: true
                },               
                classNames: "toggle-icon"
            }];
          
            var defWithPeriods = descColumn.concat(ConfigSettings.getColumns(periodModel));  
            
             totalColumn = [{
                width: 100,
                key: "total",
                state: {
                    active: true,
                    locked: false
                },               
                isDataColumn: true,
                classNames: "toggle-text text-right"
            }];

          
            columns=defWithPeriods.concat(totalColumn);  

         

           var  defaultHeaders = 
                [{
                    key: "payrollItemName",
                    text: "."
                }];
           
            var defHeadersWithPeriods = defaultHeaders.concat(ConfigSettings.getHeaders(periodModel));
            
             totalColumn = [{
                 key: "total",
                 text: "Total"
                                
            }];
         
            headers = [defHeadersWithPeriods.concat(totalColumn)]; 


            model
                .setColumns(columns)
                .setHeaders(headers);
                 
            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("payrollItemConfig", ["ConfigSettings",factory]);
})(angular);
