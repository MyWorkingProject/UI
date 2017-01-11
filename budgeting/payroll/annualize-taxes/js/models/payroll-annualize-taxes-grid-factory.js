
(function (angular) {
    "use strict";

    function factory(gridModel, $filter) {
        var model = {},
            grid;
        
        //model.init = function () {
        //    grid = model.grid = gridModel();
        //    //grid.subscribe('sortBy', model.load);
        //   // grid.subscribe('filterBy', model.load);
        //   // grid.subscribe('paginate', model.paginate);
        //    //grid.setConfig(gridConfig).setEmptyMsg('No results were found');
        //    return model;
        //};

        //model.loadGridConfig = function () {
        //    model.grid.setConfig(gridConfig);
        //};

        //model.load = function () {                    
        //    var data = grid.busy(true).flushData().getQuery();
        //    return model.getAnnualizeTaxes().then(model.setGridData);//TODO: Add exception handling
        //};

        //model.getAnnualizeTaxes = function () {
        //    var params = {
        //        distributedID: $stateParams.distID
        //    };
        //    return svc.getAnnualizeTaxesData(params);

        //};

        //model.paginate = function () {
        //    contractModel.setSelectState(false);

        //    var data = grid.getQuery();
        //    return contractModel.getContractData(data).success(model.addGridData, exception.getContractsException);
        //};

        //model.setGridData = function (response) {
        //    model.setSelectColumn(response.data);
        //    grid.setData(response.data).busy(false);
        //};

        //model.setSelectColumn = function (data) {
        //    angular.forEach(data.records, function (item) {
        //        item.isSelected = false;
        //    });
        //};

        //model.getSelectedRecords = function () {
        //    return $filter('filter')(model.grid.data.records, { isSelected: 'true' });
        //};

        //model.selectAll = function (flag) {
        //    grid.selectAll(flag);
        //};

        //model.getDataFilter = function () {
        //    return grid.getQuery();
        //};

        //model.addGridData = function (response) {
        //    model.setSelectColumn(response);
        //    grid.addData(response).busy(false);
        //};

        

        return model;
    }
    angular
        .module("budgeting")
        .factory('annualizeTaxesGridFactory', [
            'rpGridModel',        
            '$filter',            
            factory
        ]);
})(angular);