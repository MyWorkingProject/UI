//  View Specification Model

(function (angular) {
    "use strict";

    function ImportViewSpecModel(langTranslate, gridModel, gridConfig) {
        var model, translate, grid;

        translate = langTranslate('import').translate;

        model = {};
        model.viewSpecData = {};
        model.viewSpecData.records = [{
            columnName: "CompanyID",
            desc: "RealPage numeric ID for the company.(Required)"
            }, {
            columnName: "GLAccountNumber",
            desc: "GL Account number.(Required)"
        }, {
            columnName: "Description",
            desc: "A description for the GL Account.(Required)"
        }, {
            columnName: "GLAccountType",
            desc: "Asset,Liability,Income Or Expense. These values must match exactly.(Required)"
        }, {
            columnName: "Category",
            desc: "The category of the GL Account belongs to.(Optional)"
        }, {
            columnName: "AccountLevel",
            desc: "Header,Detail,SubAccount or Total. These values must match exactly.(Optional)"
        }, {
            columnName: "Narrative",
            desc: "A narrative for the Gl Account.(Optional)"
            }, {
            columnName: "Normal Balance",
            desc: "Debit or Credit. These values must match exactly.(Required)"
            }];
        //};

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
        .factory('ImportViewSpecModel', [
            'appLangTranslate',
            'rpGridModel',
            'viewImportSpecGridConfig',
            ImportViewSpecModel
        ]);
})(angular);
