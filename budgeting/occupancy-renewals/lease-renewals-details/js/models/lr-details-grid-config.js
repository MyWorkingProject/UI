(function (angular) {
    "use strict";

    function lrDetailsGridConfig(bmGridConfigModel, ovGridConst) {
        return function (src, startYear, startMonth, noOfPeriods) {
            var gridConfig = bmGridConfigModel(src, startYear, startMonth, noOfPeriods),
                periods = null,
                headers = null,
                columns = null,
                totalRow = null;


            var createPeriodKey = function (index) {
                return "period" + (index + 1);
            };

            //header configuration
            headers = []
                .concat(
                    gridConfig.generateColumns(ovGridConst.config.header, 1, function (column, index) {
                        column.key = ovGridConst.columns.title.key;
                        column.text = ovGridConst.columns.title.text;
                    }))
                 .concat(
                    gridConfig.generateColumns(ovGridConst.config.header, 1, function (column, index) {
                        column.key = ovGridConst.detailscolumn.commentCount.key;
                        column.text = ovGridConst.detailscolumn.commentCount.text;
                    }))
                 .concat(
                    gridConfig.generateColumns(ovGridConst.config.header, 1, function (column, index) {
                        column.key = ovGridConst.detailscolumn.units.key;
                        column.text = ovGridConst.detailscolumn.units.text;
                    }))
                .concat(
                     gridConfig.generateColumns(ovGridConst.config.header, noOfPeriods, function (column, index) {
                         column.key = createPeriodKey(index);
                         column.text = gridConfig.getPeriodLabel(index);
                     }))
                .concat(
                    gridConfig.generateColumns(ovGridConst.config.header, 1, function (column, index) {
                        column.key = ovGridConst.columns.total.key;
                        column.text = ovGridConst.columns.total.text;
                    }));

            //column configuration
            columns = []
                .concat(
                     gridConfig.generateColumns(ovGridConst.config.column, 1, function (column, index) {
                         column.width = ovGridConst.columns.title.width;
                         column.key = ovGridConst.columns.title.key;
                         column.state = {
                             active: ovGridConst.columns.title.state.active,
                             locked: ovGridConst.columns.title.state.locked
                         };
                         column.isDataColumn = ovGridConst.columns.title.isDataColumn;
                         column.templateUrl = ovGridConst.templateConfig.serviceGroupName;
                     }))
                .concat(
                     gridConfig.generateColumns(ovGridConst.config.column, 1, function (column, index) {
                         column.width = ovGridConst.detailscolumn.commentCount.width;
                         column.key = ovGridConst.detailscolumn.commentCount.key;
                         column.state = {
                             active: ovGridConst.detailscolumn.commentCount.state.active,
                             locked: ovGridConst.detailscolumn.commentCount.state.locked
                         };
                         column.isDataColumn = ovGridConst.detailscolumn.commentCount.isDataColumn;
                         column.templateUrl = ovGridConst.templateConfig.commentCount;
                         column.action = {
                              'makeLeaseComment': gridConfig.getMethod('makeLeaseComment')
                          };
                     }))
                .concat(
                     gridConfig.generateColumns(ovGridConst.config.column, 1, function (column, index) {
                         column.width = ovGridConst.detailscolumn.units.width;
                         column.key = ovGridConst.detailscolumn.units.key;
                         column.state = {
                             active: ovGridConst.detailscolumn.units.state.active,
                             locked: ovGridConst.detailscolumn.units.state.locked
                         };
                         column.isDataColumn = ovGridConst.detailscolumn.units.isDataColumn;
                     }))
                .concat(
                    gridConfig.generateColumns(ovGridConst.config.column, noOfPeriods, function (column, index) {
                        column.key = createPeriodKey(index);
                        column.label = gridConfig.getPeriodLabel(index);
                        column.month = gridConfig.getPeriodMonth(index);
                        column.period = index + 1;
                        column.year = gridConfig.getPeriodYear(index);
                    }))
                .concat(
                    gridConfig.generateColumns(ovGridConst.config.column, 1, function (column, index) {
                        column.key = ovGridConst.columns.total.key;
                        column.label = ovGridConst.columns.total.text;
                        column.state = {
                            active: ovGridConst.columns.total.state.active,
                            locked: ovGridConst.columns.total.state.locked
                        };
                    }));

            //data row configuration
            totalRow = []
                .concat(
                    gridConfig.generateColumns(ovGridConst.config.customRow, 1, function (column, index) {
                        column.key = ovGridConst.columns.title.key;
                        column.templateUrl = ovGridConst.templateConfig.serviceGroupName;
                    }))
                .concat(
                    gridConfig.generateColumns(ovGridConst.config.customRow, noOfPeriods, function (column, index) {
                        column.key = createPeriodKey(index);
                    }))
                .concat(
                    gridConfig.generateColumns(ovGridConst.config.customRow, 1, function (column, index) {
                        column.key = ovGridConst.columns.total.key;
                    }));


            gridConfig.setColumns(columns)
                        .setHeaders([headers])
                        .setRowConfig("total", totalRow);

            return gridConfig;
        };
    }

    angular
        .module("budgeting")
        .factory("lrDetailsGridConfig", [
                "bmGridConfigModel",
                "lrDetailsConstantModel",
                lrDetailsGridConfig
        ]);

})(angular);