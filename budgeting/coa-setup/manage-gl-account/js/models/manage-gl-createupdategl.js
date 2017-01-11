(function (angular) {
    "use strict";

    function factory(manageGlAccountModel, langTranslate, listSVC, notification) {
        var model, translate;
        model = {};
        translate = langTranslate('manageGlAccount').translate;

        model.fieldLabel = {
            accountNumber: translate('bdgt_manageglaccount_fieldLabel_accountNumber'),
            accountDescription: translate('bdgt_manageglaccount_fieldLabel_accountDescription'),
            useForBudgeting: translate('bdgt_manageglaccount_fieldLabel_useForBudgeting'),
            accountType: translate('bdgt_manageglaccount_fieldLabel_accountType'),
            normalBalance: translate('bdgt_manageglaccount_fieldLabel_normalBalance'),
            accountCategory: translate('bdgt_manageglaccount_fieldLabel_accountCategory'),
            accountNarrative: translate('bdgt_manageglaccount_fieldLabel_accountNarrative'),
            restrictPayrollAccess: translate('bdgt_manageglaccount_fieldLabel_restrictPayrollAccess')
        };

        model.dilogMessages = {
            duplicateGL: translate('bdgt_manageglaccount_dilog_duplicateGL'),
            msgDupPropertyInfo: translate('bdgt_manageglaccount_dilog_dupPropertyInfo'),
            uGLMessage: translate('bdgt_manageglaccount_dilog_uGLMessage')
        };

        model.text = {
            newAccount: translate('bdgt_manageglaccount_newAccount'),
            formTitle: translate('bdgt_manageglaccount_formTitle')
        };

        model.slideGLToggle = {
            state: {
                open: false
            },
            isGLSlideOn: false,
            name: "newGLToggle"
        };

        model.types = {
            onFocus: false,
            showAccNoLabel:false
        };

        model.form = {
            glAccountID: "",
            accountNumber: "",
            userForBudgeting: true,
            accountDescription: "",
            accountType: "",
            accountCategory: "",
            normalBalance: "Credit",
            restrictPayrollAccess: false,
            accountNarrative: " ",
            actionTooltipState: false,
            showGlImport: true,
            enbAccNumber:false,
            accountCategoryData: {
                options: [{
                    "value": "",
                    "name": '-- Select category --'
                }]
            },
            accountTypeData: {
                options: [{
                    "value": "",
                    "name": '-- Select type --'
                }]
            },
            filterOptions: [{
                "name": "All",
                "value": ""
            }],
            normalBalanceData: {
                options: [{
                    "value": 'Credit',
                    "name": 'Credit'
                }, {
                    "value": 'Debit',
                    "name": 'Debit'
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

        model.defParams = angular.copy(model.form);

        model.reset = function () {
            model.form = angular.copy(model.defParams);
            model.deactivateForm();
        };


        model.placeholder = {
            accountNumber: translate('bdgt_manageglaccount_new_Placeholder_accountNumber'),
            accountDescription: translate('bdgt_manageglaccount_new_Placeholder_accountDescription'),
            accountNarrative: translate('bdgt_manageglaccount_new_Placeholder_accountNarrative')
        };

        model.errorMsgs = {
            accountNumber: {
                required: translate('bdgt_manageglaccount_Validation_accountNumber')
            },
            accountDescription: {
                required: translate('bdgt_manageglaccount_Validation_accountDescription')
            },
            accountType:
            {
                required: translate('bdgt_manageglaccount_Validation_accountType')
            },
            accountCategory:
           {
               required: translate('bdgt_manageglaccount_Validation_accountCategory')
           }
        };

        model.slideToggleGlForm = function () {
            model.slideGLToggle.isGLSlideOn = !model.slideGLToggle.isGLSlideOn;
            model.slideGLToggle.state.open = !model.slideGLToggle.state.open;
        };

        model.deactivateForm = function () {
            model.slideGLToggle.isGLSlideOn = false;
            model.slideGLToggle.state.open = false;

        };

        model.updateAccType = function (data) {
            model.form.accountTypeData.options = model.form.accountTypeData.options.concat(data);
        };

        model.updateFiltTypes = function (data) {
            model.form.filterOptions.options = model.form.filterOptions.options.concat(data);
        };

        model.hideGlImport = function () {
            model.form.showGlImport = false;
        };

        model.enableAccountNumber = function () {
            model.form.enbAccNumber = true;
        };

        //model.updateGrid = function () {
        //    model.grid = manageGlAccountGrid.updateGridModel(model.form.filterOptions);
        //    return model;
        //};
        model.resetAccountCatForm = function () {
            model.form.accountCategoryData = model.restAccountCategory();
        };


        model.getNewGlRecord = function () {
            var data, id, isProperty;
            id= model.getGLAccountID();
            data = model.getNewGlData(id);
            return data;
        };

        model.getNewGlData=function(id){
           return {
                "gLAccountID": id,
                "masterChartID": manageGlAccountModel.getMasterChartID(),
                "gLAccountNumber": model.form.accountNumber,
                "description": model.form.accountDescription,
                "accountTypeID": model.form.accountType,
                "accountCategoryID": model.form.accountCategory,
                "budgetUseOnly": model.form.userForBudgeting,
                "restrictPayroll": model.form.restrictPayrollAccess,
                "normalBalance": model.form.normalBalance,
                "accountLevelCode": "Detail",
                "parentAccount": "",
                "narrative": model.form.accountNarrative,
                "propertyID": (manageGlAccountModel.getPropertyId() === "0" ? -1 : manageGlAccountModel.getPropertyId()),
                "status": "Active",
                "cAMexpense": false,
                "dataSource": ""
            };
        };


        model.getGLAccountID = function () {
            var id;
            if (model.form.glAccountID === "") {
                id = -1;
            }
            else {
                id = model.form.glAccountID;
            }

            return id;
        };

        model.updateGlForm = function (data) {
            model.form.glAccountID = data.records.glAccountID;
            model.form.accountNumber = data.records.glAccountNumber;
            model.form.accountDescription = data.records.description;
            model.form.accountType = data.records.accountTypeID;
            //loadAccountCategory(vm.model.form.accountType);
            model.form.accountCategory = data.records.accountCategoryID;
            model.form.normalBalance = data.records.normalBalance;
            model.form.accountNarrative = data.records.narrative;
            model.form.restrictPayrollAccess = data.records.restrictPayroll;
            model.form.userForBudgeting = data.records.budgetUseOnly;

        };

        model.resetForm = function () {
            manageGlAccountModel.updateSubscribe(false);
            model.form.accountNumber = "";
            model.form.accountDescription = "";
            model.form.userForBudgeting = true;
            model.form.restrictPayrollAccess = false;
            model.form.accountNarrative = "";
            model.form.accountCategory = "";
            model.form.accountType = "";
            model.form.enbAccNumber = false;
            model.form.accountCategoryData = model.restAccountCategory();


        };

        model.loadResetForm = function () {
            model.resetForm();
            model.slideToggleGlForm();
            model.editFormTitle("new");
        };

        model.restAccountCategory =function() {
            var accountCategoryData= {
                options: [{
                    "value": "",
                    "name": '-- Select Category --'
                }]
            };

            return accountCategoryData;
        };

        model.updateAccCategory = function (data) {
            model.form.accountCategoryData = model.restAccountCategory();
            model.form.accountCategoryData.options = model.form.accountCategoryData.options.concat(data.records);
        };



        model.showSuccessNotification = function () {
            notification.showSuccessNotification(translate('bdgt_glAccounts_save_msg'));

        };


        model.editFormTitle = function (type) {
            if (type === "update") {
                model.text.formTitle = translate('bdgt_manageglaccount_updateFormTitle');
            }
           else if (type === "new") {
               model.text.formTitle = translate('bdgt_manageglaccount_formTitle');
            }
        };

        //model.getFilterObject = function (filt) {
        //    if (filt.AccountTypeCode && filt.AccountTypeCode !== "" && angular.isNumber(filt.AccountTypeCode)) {
        //        filt.AccountTypeCode = $filter('filter')(model.form.filterOptions, { value: filt.AccountTypeCode }, false)[0].name;
        //    }
        //    else if (filt.AccountTypeCode === "") {
        //        filt.AccountTypeCode = "";
        //    }

        //    return filt;
        //};

        model.getAccountType = function () {
            return model.form.accountType;
        };

        model.getAccountCategory = function () {
            return model.form.accountCategory;
        };

        model.isNewGL = function () {
            if (model.form.glAccountID === "") {
                return true;
            }
            else {
                return false;
            }
        };

        model.showSaveUpdErrorMessage = function (resp) {
            if (resp.data.message === "DUPLICATE") {
                notification.showErrorNotification(model.dilogMessages.uGLMessage, model.dilogMessages.duplicateGL, 'warn');
                //TODO onFocus to gl account text box
            }
            else if (resp.data.message === "ADDED_TO_PROPERTYCHART") {
                notification.showErrorNotification(model.dilogMessages.uGLMessage, model.dilogMessages.msgDupPropertyInfo, 'warn');
            }
        };

        model.onfocusCall = function (flag) {
            model.types.onfocus = flag;
        };

        model.isOnFocus = function () {
            return model.types.onFocus;
        };


        return model;
    }

    angular
        .module("budgeting")
        .factory('createUpdateGlModel', [
            'manageGlAccountModel',
            'appLangTranslate',
            'manageGLAccountsSvc',
            'manageglNotifications',
            factory
        ]);
})(angular);