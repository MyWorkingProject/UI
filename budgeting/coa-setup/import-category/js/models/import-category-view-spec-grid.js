//  View Specification Model

(function (angular) {
    "use strict";

    function ImportCategoryViewSpecModel(gridModel, gridConfig) {
        var model, grid;

        model = {};
        model.viewSpecData = {};
        model.viewSpecData.records = [{
            "columnName": "CompanyID",
            "desc": "RealPage numeric ID for the company. (Required)"
        }, {
            "columnName": "GLCategory",
            "desc": "GL Category Description. (Required)"
        }, {
            "columnName": "AccountType",
            "desc": "Account type associated with the category and must match with Income, Expense, Asset, Liability, Capital or Retained Earnings. (Required)"
        }];

        grid = gridModel().setConfig(gridConfig);


        model.setGridData = function () {
            model.grid = grid;
            grid.busy(true).flushData().setData(model.viewSpecData).busy(false);
            return model;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('ImportCategoryViewSpecModel', [
            'rpGridModel',
            'viewSpecGridConfig',
            ImportCategoryViewSpecModel
        ]);
})(angular);
