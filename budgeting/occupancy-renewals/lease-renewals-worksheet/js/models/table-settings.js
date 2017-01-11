
(function (angular) {
    "use strict";

    function tableSettings(serviceGroupModel, detailsModel, $filter, rpGridEvent) {



        var model = {};

        model.basicInfo = {          
            columnOptions: "",
            initialRowOptions: "",
            rowHeightClass: "large",
            refValue: true,
            rowOptions: "",
            serviceGroupGrid: "",
            occupancyGrid:""
        };
        model.form = {};

        model.getServiceGroupDetails = function () {
            return model.serviceGroupDetails;
        };

        model.getColumnOptions = function (sgGrid, occGrid) {
            angular.copy(model.basicInfo, model.form);
            model.copyGrids(sgGrid, occGrid);
            model.form.columnOptions = angular.copy(sgGrid);
            var foundItem = $filter('filter')(model.form.columnOptions.columns.data, { key: 'total' }, true)[0];
            var index = model.form.columnOptions.columns.data.indexOf(foundItem);

            if (foundItem !== undefined) {
                model.form.columnOptions.columns.data.remove(index);
            }
            return model.form.columnOptions;
        };

       

        model.copyGrids = function (sg, og) {
            model.form.serviceGroupGrid = sg;
            model.form.occupancyGrid = og;

        };

        model.getOptionsForSettings = function () {
            var rowOptions = {
                small: true,
                large: true,
                rowHeightClass: model.form.rowHeightClass,
                hasShowRefFiled: true,
                refValue: model.form.refValue
            };
            model.form.initialRowOptions = angular.extend(rowOptions);
            return rowOptions;
        };

        model.handleReferenceRow = function (options) {
            model.form.refValue = options.refValue;
          
        };

        model.revertChangesOnCancel = function () {
            model.form.rowOptions = angular.extend(model.form.initialRowOptions);
            model.form.columnOptions = angular.copy(model.form.serviceGroupGrid);
        };

        model.applyPeriodChanges = function (columnOptions) {
            model.applyTableSetingsToGrid(columnOptions, model.form.serviceGroupGrid);
            model.applyTableSetingsToGrid(columnOptions, model.form.occupancyGrid);

        };

        model.applyTableSetingsToGrid = function (columnOptions, grid) {
            angular.forEach(grid.columns.config, function (confData) {
                var objConfig = $filter('filter')(columnOptions.columns.data, { key: confData.key }, true)[0];
                var objData = $filter('filter')(grid.columns.data, { key: confData.key }, true)[0];

                if (objConfig !== undefined && objData !== undefined) {
                    confData.state.active = objConfig.state.active;
                    objData.state.active = objConfig.state.active;
                }
            });
        };

        model.getRowHeightClass = function (options) {
            model.form.rowHeightClass = options.rowHeightClass;
            model.form.serviceGroupGrid.rowHeightClass = options.rowHeightClass;
            model.form.occupancyGrid.rowHeightClass = options.rowHeightClass;

            //model.form.serviceGroupGrid.publish(rpGridEvent.dataReady);
            //model.form.occupancyGrid.publish(rpGridEvent.dataReady);
        };



        model.reset = function () {
            angular.copy(model.basicInfo, model.form);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('tableSettingsModel', [
            'lrSummaryModel',
            'lrDetailsModel',
             '$filter',
            'rpCgEventName',
            tableSettings]);
})(angular);
