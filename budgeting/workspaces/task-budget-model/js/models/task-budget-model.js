(function (angular) {
    "use strict";

    function factory(taskBudgetModelGrid, langTranslate, listSVC) {
        var text,
            model, translate;
        translate = langTranslate('taskBudgetModel').translate;
        text = {
            showFilters: translate('bdgt_taskBudgetModel_showfilterText'),
            hideFilters: translate('bdgt_taskBudgetModel_hidefilterText'),
            pageHeading: translate('bdgt_taskBudgetModel_pageHeading'),
            saveBtnText: translate('bdgt_taskBudgetModel_saveBtnText'),
            assignAllChkText: translate('bdgt_taskBudgetModel_assignAllChkText')
        };

        model = {
            text: text,
            grid: taskBudgetModelGrid,
            isAllModels: false
        };

        var data = {
            "records": [
                {
                    "isSelected": false,
                    "budgetYear": "2014",
                    "modelType": "Budget",
                    "assetType": "Affordable",
                    "name": "Budget 2014"
                },
                {
                    "isSelected": true,
                    "budgetYear": "2015",
                    "modelType": "Budget",
                    "assetType": "Affordable",
                    "name": "Budget 2015"
                },
                {
                    "isSelected": true,
                    "budgetYear": "2015",
                    "modelType": "Budget",
                    "assetType": "Affordable",
                    "name": "Budget 2015"
                }
                        ]
        };

        model.getTaskModelData = function () {
            //return listSVC.abort().get(pg, model.form.allcontracts.isActive, prpId);
            return data;
        };

        model.reset = function () {

        };

        return model;
    }
    angular
        .module("budgeting")
        .factory('taskBudgetModel', [
            'taskBudgetModelGrid', 'appLangTranslate', 'taskBudgetModelSvc', factory
        ]);
})(angular);
