(function (angular) {
    "use strict";

    function factory(langTranslate, listSVC, httpSvc, dialogSvc, $filter, manageGlAccountModel, createUpdateGlModel, exHandling) {
        var translate, model;
        translate = langTranslate('manageGlAccount').translate;
        model = {};

        model.slidePrintParamsForm = {
            state: {
                open: false
            },
            isPrintSlideOn:false

        };


        model.printParamLabel = {
            accountType: translate('bdgt_manageglaccount_printParamLabel_accountType'),
            accountCategory: translate('bdgt_manageglaccount_printParamLabel_accountCategory'),
            useForBudget: translate('bdgt_manageglaccount_printParamLabel_useForBudget'),
            payrollAccess: translate('bdgt_manageglaccount_printParamLabel_payrollAccess'),
            masterChartName: translate('bdgt_manageglaccount_printParamLabel_masterChartName'),
            printText: translate('bdgt_manageglaccount_printParamLabel_printText'),
            cancelText: translate('bdgt_manageglaccount_printParamLabel_cancelText')
        };

        model.printParamForm = {
            accountType: "",
            accountCategory: "",
            useForBudget: "All",
            PayrollAccess: "All",
            accountCategoryData: {
                options: [{
                    "value": "",
                    "name": '-- All --'
                }]
            },
            accountTypeData: {
                options: [{
                    "value": "",
                    "name": '-- All --'
                }]
            },
            useBudgetData: {
                options: [{
                    "name": "All",
                    "value": "All",
                }, {
                    "name": "Yes",
                    "value": "1"
                }, {
                    "name": "No",
                    "value": "0"
                }]
            },
            payrollAccessData: {
                options: [{
                    "name": 'All',
                    "value": 'All'
                }, {
                    "name": 'Allowed',
                    "value": 'Allowed'
                }, {
                    "name": 'Not Allowed',
                    "value": 'Not Allowed'
                }]
            }

        };



        model.resetPrintParamForm = {
            accountType: "",
            accountCategory: "",
            useForBudget: "All",
            PayrollAccess: "All"

        };

        model.defParams = angular.copy(model.printParamForm);

        model.text = {
            print: translate('bdgt_manageglaccount_print'),
            printParamsFormTitle: translate('bdgt_masterchart_printParamsFormTitle')
        };

        model.showHidePrintParamsForm = function () {

            manageGlAccountModel.getMasterChartData();
            model.slidePrintParamsForm.isPrintSlideOn = !model.slidePrintParamsForm.isPrintSlideOn;
            model.slidePrintParamsForm.state.open = !model.slidePrintParamsForm.state.open;
            model.resetForm();

        };

        model.deactivateForm = function () {
            model.slidePrintParamsForm.state.open = false;
            model.slidePrintParamsForm.state.open = false;

        };

        model.loadAccountCategory = function (value) {
            if (value !== undefined) {
                manageGlAccountModel.getAccCategory(value).then(model.updateAccCategory, exHandling.getAccountcategoryException);
            }
            else {
                model.restAccountCategory();
            }
        };

        model.restAccountCategory = function () {
            var accountCategoryData = {
                options: [{
                    "value": "",
                    "name": '-- All --'
                }]
            };

            return accountCategoryData;
        };


        model.updateAccCategory = function (resp) {
            createUpdateGlModel.updateAccCategory(resp);
        };

        model.updateAccCategory = function (data) {
            model.printParamForm.accountCategoryData = model.restAccountCategory();
            model.printParamForm.accountCategoryData.options = model.printParamForm.accountCategoryData.options.concat(data.records);
        };

        model.laodAccountTypeData = function (data) {
            model.printParamForm.accountTypeData.options = model.printParamForm.accountTypeData.options.concat(data);
        };

        model.slidePrintParamForm = function () {
            return model.slidePrintParamsForm.state.open;
        };

        model.resetForm = function () {
            if (!model.slidePrintParamsForm.state.open) {
                model.resetPrintParamForm();
                model.restAccountCategory();
            }

        };

        model.reset = function () {
            model.deactivateForm();
            model.restAccountCategory();

        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('manageGlPrintModel', [
         'appLangTranslate', 'manageGLAccountsSvc', 'httpServiceCall', 'rpDialogModel', '$filter','manageGlAccountModel','createUpdateGlModel','manageGlErrorHandling',
            factory
        ]);
})(angular);