(function (angular) {
    "use strict";

    function factory(taskBudgetUserGrid, langTranslate, listSVC) {
        var text,
            model, translate;
        translate = langTranslate('taskBudgetUser').translate;
        text = {
            showFilters: translate('bdgt_taskBudgetUser_showfilterText'),
            hideFilters: translate('bdgt_taskBudgetUser_hidefilterText'),
            pageHeading: translate('bdgt_taskBudgetUser_pageHeading'),
            saveBtnText: translate('bdgt_taskBudgetUser_saveBtnText'),
            assignAllChkText: translate('bdgt_taskBudgetUser_assignAllChkText')
        };

        model = {
            text: text,
            grid: taskBudgetUserGrid,
            isAllModels: false
        };

        var data = {
            "records": [
                {
                    "isSelected": false,
                    "name": "Rajeswar Sudini",
                    "role": "Budget Administrator",
                    "emailAddress": "",
                    "phone": ""
                },
                {
                    "isSelected": false,
                    "name": "Prahsnath Manda",
                    "role": "Budget Prep",
                    "emailAddress": "",
                    "phone": ""
                },
                {
                    "isSelected": false,
                    "name": "Rohit Vundyala",
                    "role": "Budget Apprv",
                    "emailAddress": "",
                    "phone": ""
                }
                        ]
        };

        model.getTaskUserData = function () {
            //return listSVC.abort().get(pg, model.form.allcontracts.isActive, prpId);
            return data;
        };

        model.reset = function () {

        };

        return model;
    }
    angular
        .module("budgeting")
        .factory('taskBudgetUser', [
            'taskBudgetUserGrid', 'appLangTranslate', 'taskBudgetUserSvc', factory
        ]);
})(angular);
