(function (angular) {
    "use strict";

    function oarSummaryGridConfigFactory(bmGridConfigModel, oarGridConst) {
        return function(src, startYear, startMonth, noOfPeriods) {
            var gridConfig = bmGridConfigModel(src, startYear, startMonth, noOfPeriods),
                headers = gridConfig.buildHeaders(oarGridConst.config.header, oarGridConst.columns),
                gridHeaderGroups = gridConfig.buildGroupHeaders(oarGridConst.config.groupHeader, oarGridConst.groupColumns),
                periods = null,
                columns = null,
                totalRow = null;
                

            var createPeriodKey = function(index) {
                return "period" + (index + 1);
            };

            //column configuration
            columns = []
                .concat(
                     gridConfig.generateColumns(oarGridConst.config.column, 1, function (column, index) {
                        column.width = oarGridConst.columns.title.width;
                        column.key = oarGridConst.columns.title.key;
                        column.state = {
                            active: oarGridConst.columns.title.state.active,
                            locked: oarGridConst.columns.title.state.locked
                        };
                        column.isDataColumn = oarGridConst.columns.title.isDataColumn;
                        column.templateUrl = oarGridConst.templateConfig.itemDescription;
                    }))
                .concat(
                    gridConfig.generateColumns(oarGridConst.config.column, noOfPeriods, function (column, index) {
                        column.key = createPeriodKey(index);
                        column.label = gridConfig.getPeriodLabel(index);
                        column.month = gridConfig.getPeriodMonth(index);
                        column.period = index + 1;
                        column.year = gridConfig.getPeriodYear(index);
                    }))
                .concat(
                    gridConfig.generateColumns(oarGridConst.config.column, 1, function (column, index) {
                        column.key = oarGridConst.columns.total.key;
                        column.label = oarGridConst.columns.total.text;
                        column.state = {
                            active: oarGridConst.columns.total.state.active,
                            locked: oarGridConst.columns.total.state.locked
                        };
                    }));

            //data row configuration
            totalRow = []
                .concat(
                    gridConfig.generateColumns(oarGridConst.config.customRow, 1, function (column, index) {
                        column.key = oarGridConst.columns.title.key;
                        column.templateUrl = oarGridConst.templateConfig.itemDescription;
                    }))
                .concat(
                    gridConfig.generateColumns(oarGridConst.config.customRow, noOfPeriods, function (column, index) {
                        column.key = createPeriodKey(index);                        
                    }))
                .concat(
                    gridConfig.generateColumns(oarGridConst.config.customRow, 1, function (column, index) {
                        column.key = oarGridConst.columns.total.key;
                    }));


            gridConfig.setColumns(columns)
                        .setHeaders([headers])
                        .setColHeaderGroups([gridHeaderGroups])
                        .setRowConfig("summaryRow", totalRow);

            return gridConfig;
        };        
    }
    
    angular
        .module("budgeting")
        .factory("oarSummaryGridConfig", [
                "bmGridConfigModel", 
                "oarSummaryGridConst",                
                oarSummaryGridConfigFactory
        ]);

})(angular);