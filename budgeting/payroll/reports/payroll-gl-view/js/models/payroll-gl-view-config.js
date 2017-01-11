

(function (angular) {
    "use strict";

    function factory(ConfigSettings) {
        return function (model, headerModel,refTypes) {

            var total,
                columns,editable,
                headers,descColumn,totalColumn;
        

          

          descColumn = [{
                width: 270,
                key: "jobTitle",
                state: {
                    active: true,
                    locked: true
                },               
                classNames: "toggle-icon"
            }];
           
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

            var defWithPeriods = descColumn.concat(totalColumn);  
            
          
            columns = defWithPeriods.concat(ConfigSettings.getColumns(headerModel)); 
           

         

           var  defaultHeaders = 
                [{
                    key: "jobTitle",
                    text: "Job Position"
                }];

            totalColumn = [{
                 key: "total",
                 text: "Total"
                                
            }];

            var defHeadersWithPeriods = defaultHeaders.concat(totalColumn);
            
           
            headers =[ defHeadersWithPeriods.concat(ConfigSettings.getHeaders(headerModel))];  


            model
                .setColumns(columns)
                .setHeaders(headers);
                 
            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("payrollglConfig", ["glConfigSettings",factory]);
})(angular);
