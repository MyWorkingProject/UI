//  Payroll summary model

(function (angular) {
    'use strict';

    function factory(
        $filter,
        base,
        budgetDetails,
        payrollSvc,
        gridModel,
        summaryContent) {
        var model = {}, grid, isGridLoaded = false;
        model.initConfig = function (gridConfig) {
            model.isGridLoaded = isGridLoaded;
            grid = gridModel()
                .setConfig(gridConfig);
            model.grid = grid;
            grid.subscribe('filterBy', model.customEmployeeFilter);
            grid.setEmptyMsg(summaryContent.noResults);
            model.gridData = '';
            model.isGridLoaded = true;
            return model;
        };
        model.customEmployeeFilter = function () {
            var dataRows = $filter('filter')(model.gridData.records, {
                employJobName: model.grid.filtersModel.filterData.employJobName,
                jobPosition: model.grid.filtersModel.filterData.jobPosition
            });
            model.addTotalRow(dataRows);           
        };
        model.getPayrollData = function () {//pgdata
            var params = {
                distributedID: budgetDetails.getModelDetails().distributedID
            };
            return payrollSvc.getPayrollData(params);//pgdata
        };
        model.load = function () {
            model.grid.flushData().busy(true);
            model.getPayrollData().success(model.setGridData);
        };
        model.setGridData = function (response) {
            model.gridData = angular.copy(response);
            model.addTotalRow(response.records);
        };

        model.addTotalRow = function (dataRows) {
            if (dataRows.length > 0) {
                dataRows.push(model.createTotalRow(dataRows));
            }
            model.formatNumberData(dataRows);
            model.grid.setData({ records: dataRows }).busy(false);
            return model;
        };

        model.formatNumberData = function (dataRows) {
            dataRows.forEach(function (dataRow) {
                base.getPayrollItems().forEach(function (item) {
                    dataRow[item.itemColumnName] = dataRow[item.itemColumnName].toLocaleString();
                });
                dataRow.total = dataRow.total.toLocaleString();
                dataRow.allocationPercent = dataRow.allocationPercent.toLocaleString();                
            });
        };

        model.createTotalRow = function (dataRows) {
            var row = {
                action: '',
                employJobName: summaryContent.payrollTotal,
                jobPosition: '',
                total: model.calculateTotal('total', dataRows),
                allocationPercent: model.calculateTotal('allocationPercent', dataRows),
                isLastRecord: true
            };

            base.getPayrollItems().forEach(function (item) {
                row[item.itemColumnName] = model.calculateTotal(item.itemColumnName, dataRows);
            });

            return row;
        };

        model.calculateTotal = function (key, dataRows) {
            var total = 0;
            dataRows.forEach(function (dataRow) {
                total += parseFloat(dataRow[key]) || 0;
            });
            return total;
        };

        return model;
    }
    angular
        .module('budgeting')
        .factory('payrollModel', [
                '$filter',
                'payrollBaseModel',
                'budgetDetails',
                'payrollSvc',
                'rpGridModel',
                'payrollSummaryContent',
                factory
        ]);
})(angular);
