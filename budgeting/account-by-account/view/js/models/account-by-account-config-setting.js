
(function (angular) {
    'use strict';

    function factory(preferences, $filter, base, viewModel, configKeys) {
        var model = {};


        model.isForecastModel = function () {
            var isForecast = viewModel.getForecastUseData();
            var budgetType = base.getBudgetType();
            if (budgetType === "Forecast") {
                return true;
            }
            return false;
        };

        model.handleRefRowsForcolumns = function (refTypes) {

            var hasRefData = viewModel.getFirstReferenceData();
            var isForecast = model.isForecastModel();
            model.updateRefColumnFileds(refTypes);
            var refData = model.buildRefDataByCondition(hasRefData, isForecast, configKeys.columns, refTypes, "columns");

            return refData;
        };

        model.isNullOrUndefined = function (data) {
            if (data === null || data === undefined) {
                return " ";
            }
            return data;
        };

        model.updateRefColumnFileds = function (refTypes) {
            var columns = configKeys.columns.refTypes;
            configKeys.columns.forecastType[0].label = model.isNullOrUndefined(refTypes.forecastUseDataTitle);
            configKeys.columns.firRefType[0].label = model.isNullOrUndefined(refTypes.firstReferenceDataTitle);
        };

        model.updateRefHeaderFields = function (refTypes) {
            configKeys.headers.forecastType[0].text = model.isNullOrUndefined(refTypes.forecastUseDataTitle);
            configKeys.headers.firRefType[0].text = model.isNullOrUndefined(refTypes.firstReferenceDataTitle);
        };

        model.handleRefForHeaders = function (refTypes) {
            // var prefData=preferences.getPreferenceData();
            var hasRefData = viewModel.getFirstReferenceData();
            var isForecast = model.isForecastModel();
            model.updateRefHeaderFields(refTypes);
            var refData = model.buildRefDataByCondition(hasRefData, isForecast, configKeys.headers, refTypes, "headers");
            return refData;
        };
        model.handleRefForTotals = function (refTypes) {
            // var prefData=preferences.getPreferenceData();
            var hasRefData = viewModel.getFirstReferenceData();
            var isForecast = model.isForecastModel();
            var refData = model.buildRefDataByCondition(hasRefData, isForecast, configKeys.totals, refTypes, "totals");
            return refData;
        };

        model.manageFirstRefType = function (hasFirstRefData, data, refTypes, colType) {
            var ref = [];
            if (model.isNullOrUndefined(refTypes.firstReferenceDataTitle) !== " ") {
                if (hasFirstRefData) {
                    ref = data.firRefType;
                    if (ref[0].state !== undefined) {
                        ref[0].state.active = true;
                        model.handleVarienceFields();
                    }
                }
                else {
                    model.handleFirstRefDataColumns(data, colType);
                }
            }
            else {
                ref = [];
                model.manageVariancePerAndAmt(colType);
            }
            return ref;
        };

        model.handleFirstRefDataColumns = function (data,colType) {
            model.handleFirstRefColumn(data, colType);
            //model.handleFirstRefHeaders();
            //model.handleFirstRefTotal();

        };

        model.handleFirstRefColumn = function (data, colType) {
            var ref = data.firRefType;
            if (colType === "columns") {
                if (ref[0].state !== undefined) {
                    ref[0].state.active = false;
                    model.handleVarienceFields();
                }
            }
            else if (colType === "headers") {
                //configKeys.headers.otherDefHeaders.remove(model.getIndexElementInArray("variancePercent", configKeys.headers.otherDefHeaders));
                //configKeys.headers.otherDefHeaders.remove(model.getIndexElementInArray("varianceAmount", configKeys.headers.otherDefHeaders));
            }
            else if (colType === "totals") {
                //configKeys.headers.otherDefHeaders.remove(model.getIndexElementInArray("variancePercent", configKeys.headers.otherDefHeaders));
                //configKeys.headers.otherDefHeaders.remove(model.getIndexElementInArray("varianceAmount", configKeys.headers.otherDefHeaders));
            }

            return ref;
        };

        model.manageVariancePerAndAmt = function (colType) {
            if (colType === "columns") {
                configKeys.columns.otherDefColumns.remove(model.getIndexElementInArray("variancePercent", configKeys.columns.otherDefColumns));
                configKeys.columns.otherDefColumns.remove(model.getIndexElementInArray("varianceAmount", configKeys.columns.otherDefColumns));
            }
            else if (colType === "headers") {
                //configKeys.headers.otherDefHeaders.remove(model.getIndexElementInArray("variancePercent", configKeys.headers.otherDefHeaders));
                //configKeys.headers.otherDefHeaders.remove(model.getIndexElementInArray("varianceAmount", configKeys.headers.otherDefHeaders));
            }
            else if (colType === "totals") {
                //configKeys.totals.otherDefTotals.remove(model.getIndexElementInArray("variancePercent", configKeys.totals.otherDefTotals));
                //configKeys.totals.otherDefTotals.remove(model.getIndexElementInArray("varianceAmount", configKeys.totals.otherDefTotals));
            }
        };

        model.getIndexElementInArray = function (keyField, obj) {
            var data = $filter('filter')(obj, { key: keyField }, true)[0];
            var index = obj.indexOf(data);
            return index;
        };

        model.manageForecast = function (isForecast, data, refTypes, colType) {
            var ref = [];
            if (model.isNullOrUndefined(refTypes.forecastUseDataTitle) !== " ") {
                if (isForecast) {
                    ref = data.forecastType;
                }
                else {
                    ref = data.forecastType;
                    ref[0].state.active = false;
                }
            }
            else {
                ref = [];                           
            }
            return ref;
        };

        model.updateVarienceStateObj = function () {


        };

        model.buildRefDataByCondition = function (hasFirstRefData, isForecast, data, refTypes, colType) {
            var refData = [];
            var frData = model.manageFirstRefType(hasFirstRefData, data, refTypes, colType);
            var forCastData = model.manageForecast(isForecast, data, refTypes);


            if (frData.length > 0 && forCastData.length > 0) {
                var ref = frData.concat(forCastData);
                refData = ref;
            }
            else if (frData.length > 0) {
                refData = frData;
            }
            else if (forCastData.length > 0) {
                refData = forCastData;
            }
            return refData;
        };



        model.handleRolingActualsForColumns = function () {
            var data = [];
            if (viewModel.getRollingActual()) {
                configKeys.columns.rollingActuals[0].label = "Rolling " + base.getNoOfPeriods();
                return configKeys.columns.rollingActuals;
            }
            return data;
        };

        model.handleRolingActualsForHeaders = function () {
            var data = [];
            if (viewModel.getRollingActual()) {
                configKeys.headers.rollingActuals[0].text = "Rolling " + base.getNoOfPeriods();
                return configKeys.headers.rollingActuals;
            }
            return data;
        };

        model.handleRolingActualsForTotal = function () {
            var data = [];
            if (viewModel.getRollingActual()) {
                return configKeys.totals.rollingActuals;
            }
            return data;
        };


        model.getTotalLabelForSumamry = function () {
            return base.getBudgetType() + " " + base.getBudgetYear();
        };

        model.handleRowOptions = function (column) {
            switch (column.key) {
                case "firstReferenceData":
                    model.manageFirstRefData();
                    break;
                case "forecastUseData":
                    model.manageForeastData();
                    break;
                case "rollingActual":
                    model.manageRollingActuals();
                    break;
            }
        };

        model.getFilterData = function (keyField, obj) {
            var data = [];
            data = $filter('filter')(obj, { key: keyField }, true)[0];
            return data;
        };

        model.manageFirstRefData = function () {
            if (viewModel.getFirstReferenceData()) {
                model.handleVarienceFields();
                return false;

            }
            else {
                // if privilage is false and current state is true then call service call
                viewModel.setFirstReferenceData(true);
                return true;
            }
        };

        model.handleVarienceFields = function () {
            // if privilage is true and current state is false then deactivate $ and % 
            var varPer = model.getFilterData("variancePercent", configKeys.columns.otherDefColumns);
            var varDol = model.getFilterData("varianceAmount", configKeys.columns.otherDefColumns);
            model.handleVariancePerAndDol(varPer, varDol, configKeys.columns.firRefType[0].state.active);
        };

        model.handleVariancePerAndDol = function (varPer, varDol, state) {
            if (varPer) {
                configKeys.columns.otherDefColumns[1].state.active = state;
            }
            if (varDol) {
                configKeys.columns.otherDefColumns[0].state.active = state;
            }
        };

        model.manageForeastData = function () {
            if (!viewModel.getForecastUseData()) {
                viewModel.setForecastUseData(true);
                return true;
            }
            return false;
        };

        model.manageRollingActuals = function () {
            if (!viewModel.getRollingActual()) {
                viewModel.setRollingActual(true);
                return true;
            }
            return false;
        };

        model.getOtherOptions = function () {
            var prefData = preferences.getPreferenceData();

            angular.forEach(prefData.records, function (item) {
                switch (item.fieldType) {
                    case "varianceAmount":
                        configKeys.columns.otherDefColumns[0].state.active = item.fieldValue;
                        break;
                    case "variancePercent":
                        configKeys.columns.otherDefColumns[1].state.active = item.fieldValue;
                        break;
                    case "perUnit":
                        configKeys.columns.otherDefColumns[2].state.active = item.fieldValue;
                        break;
                    case "perSqFT":
                        configKeys.columns.otherDefColumns[3].state.active = item.fieldValue;
                        break;
                }
            });

            return configKeys.columns.otherDefColumns;
        };


        model.handleTableSettingsforPeriods = function () {
            angular.forEach(viewModel.form.columnOptions.columns.data, function (column) {
                model.handleRowOptions(column);
            });
        };


        return model;
    }

    angular
        .module('budgeting')
        .factory('manageConfig', ['managePreferences', '$filter', 'accountByAccountBase', 'accountByAccountView', 'configKeys', factory]);
})(angular);
