//  payrollItemView grid config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, bmConstant) {
        return function (src, startYear, startMonth, noOfPeriods) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = bmConstant.getConfigs(),
                groupColumns =  bmConstant.getGroupColumns(),
                columns = bmConstant.getColumns();

            model.init = function () {
                var gridHeaders = model.buildHeaders(configs.header, columns),
                    gridHeaderGroups = model.buildGroupHeaders(configs.groupHeader, groupColumns),
                    gridColumns = model.buildColumns(configs.column, columns);

                model
                    .setColumns(gridColumns)
                    .setHeaders([gridHeaders])
                    .setColHeaderGroups([gridHeaderGroups]);

                return model;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("payrollItemViewGridConfigModel", [
            "bmGridConfigModel",
            "bmGridConstantModel",
            factory]);
})(angular);
