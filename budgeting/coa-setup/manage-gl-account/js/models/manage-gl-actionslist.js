//  GL Accounts Grid Model

(function (angular) {
    "use strict";

    function factory(langTranslate, listSVC,  dialogSvc, $filter, glAccModel, exHandling, createUpdateGlModel, grid, notification, editSaveGlModel) {
        var translate, model, form, body, btnClick;
        translate = langTranslate('manageGlAccount').translate;

        body = body || angular.element('body');
        btnClick = 'click.toggleMenu';
        model = {};


        model.text = {
            actions: translate('bdgt_manageglaccount_actions'),
            assignCategoryformTitle: translate('bdgt_manageglaccount_assignCategoryformTitle')
        };

        model.fieldLabel = {
            assignAccountCategory: translate('bdgt_manageglaccount_fieldLabel_assignAccountCategory'),
            assignText: translate('bdgt_manageglaccount_fieldLabel_assignText')
        };

        model.actionMenuList = {
            assignAccountCategory: translate('bdgt_manageglaccount_menulist_assignAccountCategory'),
            markForBudgetingUse: translate('bdgt_manageglaccount_menulist_markForBudgetingUse'),
            unmarkForBudgetingUse: translate('bdgt_manageglaccount_menulist_unmarkForBudgetingUse'),
            setDebitBalance: translate('bdgt_manageglaccount_menulist_setDebitBalance'),
            setCreditBalance: translate('bdgt_manageglaccount_menulist_setCreditBalance'),
            restrictPayrollAccess: translate('bdgt_manageglaccount_menulist_restrictPayrollAccess'),
            unRestrictPayrollAccess: translate('bdgt_manageglaccount_menulist_unRestrictPayrollAccess'),
            del: translate('bdgt_manageglaccount_menulist_del'),
            enable: false,
            moveToMasterChart: translate('bdgt_manageglaccount_menulist_moveToMasterChart'),
            selectActnMsg: translate('bdgt_manageglaccount_Validation_actionList')
        };

        model.dilogMessages = {
            deletDilogMessage: translate('bdgt_manageglaccount_dilog_deletDilogMessage'),
            unDelete: translate('bdgt_manageglaccount_dilog_unDelete'),
            msgUsedInProperty: translate('bdgt_manageglaccount_dilog_msgUsedInProperty'),
            uGLMessage: translate('bdgt_manageglaccount_dilog_uGLMessage'),
            duplicateGL: translate('bdgt_manageglaccount_dilog_duplicateGL'),
            selGLAccount: translate('bdgt_manageglaccount_dilog_selGLAccount'),
            selGLInfo: translate('bdgt_manageglaccount_dilog_selGLInfo'),
            selInfo: translate('bdgt_manageglaccount_dilog_selInfo'),
            dilogDeleteMsg: translate('bdgt_manageglaccount_dilog_dilogDeleteMsg'),
            moveMCTittile: translate('bdgt_manageglaccount_dilog_moveMCTittile'),
            moveMCTittileInfo: translate('bdgt_manageglaccount_dilog_moveMCTittileInfo'),
            unMoveMCInfo: translate('bdgt_manageglaccount_dilog_unMoveMCInfo'),
            defaultMsg: translate('bdgt_manageglaccount_dilog_defaultMsg'),
            msgInvalidParam: translate('bdgt_manageglaccount_dilog_msgInvalidParam'),
            msgDupPropertyInfo: translate('bdgt_manageglaccount_dilog_dupPropertyInfo')

        };

        model.state = {
            actionMenuAlert: false,
            menuIsOn: false,
            accountCategoryForm: {
                open: false
            }
        };

        //model.onEdit = {
        //    edit: newMasterchartModel.state.edit,
        //    ready: newMasterchartModel.state.ready
        //};

        model.toggleAccountCategory = {
            state: {
                open: false
            },
            isAcToggleOn: false
        };

        model.types = {

            flagAccountCategory: false,
            accountCategoryAccess: false,
            initList: false,
            isAccountCategory: false
        };


        model.showHideAccountCategoryForm = function () {
            model.toggleAccountCategory.state.open = !model.toggleAccountCategory.state.open;
            model.toggleAccountCategory.isAcToggleOn = model.toggleAccountCategory.isAcToggleOn;
            createUpdateGlModel.resetAccountCatForm();

        };


        model.flagShowHideAccountCategoryForm = function () {
            return model.toggleAccountCategory.state.open;
        };

        model.showHideMenuList = function (status) {
            model.state.menuIsOn = status;
        };

        model.deactivateForm = function () {
            model.toggleAccountCategory.state.open = false;

        };

        model.isMenuOn = function () {
            return model.state.menuIsOn;
        };

        model.isActionMenu = function () {
            return model.state.actionMenuAlert;
        };

        model.showHideactionMenuAlert = function (status) {
            model.state.actionMenuAlert = status;
        };

        model.showHideactionMenuAlertFlag = function () {
            return model.state.actionMenuAlert;
        };

        model.updateFlagCat = function (bln) {
            model.types.flagAccountCategory = bln;
        };

        model.buildActionList = function (fieldName, fieldValue) {
            var chekedRows = grid.getSelectedGls();
            return model.buildActionListToPost(chekedRows, fieldName, fieldValue);
        };


        model.buildActionListToPost = function (chekedRows, fieldName, fieldValue) {
            var PostData = [];
            angular.forEach(chekedRows, function (item) {
                var IsPropertyTable = model.getProprtyTableFlag(item);
                var data = model.buildActionListDataToPost(item.glAccountID, fieldName, fieldValue, IsPropertyTable);
                PostData.push(data);
            });
            return PostData;
        };

        model.buildActionListDataToPost = function (glAccountID, fieldName, fieldValue, IsPropertyTable) {
            var data = {
                "glAccountID": glAccountID,
                "fieldName": fieldName,
                "fieldValue": fieldValue,
                "ActSiteID": glAccModel.getPropertyId(),
                "IsPropertyTable": IsPropertyTable
            };
            return data;
        };

        model.buidMoveToMasterchartList = function (chekedRows) {
            var PostData = [];
            angular.forEach(chekedRows, function (item) {
                var data = model.buidMoveToMasterchartDataList(item);
                PostData.push(data);
            });
            return PostData;
        };

        model.buidMoveToMasterchartDataList = function (item) {
            var data = {
                "masterChartID": item.masterChartID,
                "glAccountID": item.glAccountID
            };
            return data;
        };

        model.getProprtyTableFlag = function (item) {
            var isPropTable = (!item.isSiteAccount && glAccModel.isPropertyChart()) ? 1 : 0;
            return isPropTable;
        };



        model.showErrorDilog = function (title, info) {
            notification.showErrorNotification(title, info, 'error');
        };

        model.loadAssignCatExDialog = function () {
            notification.showErrorNotification(model.dilogMessages.selGLAccount, model.dilogMessages.selGLInfo, 'warning');
        };

        model.delete = function () {
            var PostData = [];
            var chekedRows = grid.getSelectedGls();
            model.showIsConfirmDilog(chekedRows);
        };


        model.showIsConfirmDilog = function (chekedRows) {
            model.selRows = chekedRows;
            var dialog = dialogSvc();
            dialog.update({
                type: 'warn',
                showCancel: true,
                showContinue: true,
                title: model.dilogMessages.dilogDeleteMsg,
                question:'',
                info: model.dilogMessages.deletDilogMessage
            });
            dialog.subscribe(model.subscribeEvent);
            dialog.show();
       };

       model.subscribeEvent = function (data) {
           if (data === 'continue') {
               model.continueOverRide(model.selRows);
           }

       };

       model.deleteGlAcc = function (data) {
           return listSVC.deleteGLAccount(data).$promise;
       };

       model.continueOverRide = function (chekedRows) {
           var PostData = [];
           angular.forEach(chekedRows, function (item) {
               var data = {
                   "glAccountID": item.glAccountID
               };
               PostData.push(data);
           });
           var promise = model.deleteGlAcc(PostData);
           promise.then(model.onSuccess, exHandling.showDeleteGlException);
       };



        model.getAccountCategoryType = function () {
            return model.types.isAccountCategory;
        };

        model.setAccountCategoryType = function (flag) {
            model.types.isAccountCategory = flag;
        };

        model.updateInitList = function () {
            model.types.initList = true;
        };

        model.updateInitListWatch = function () {
            model.types.initList = false;
        };

        model.isInitListAccess = function () {
            return model.types.initList;
        };

        model.assignAccountCategory = function () {
            if (model.ValidateAccCategory()) {
                var categoryId = model.getCategoryId();
                editSaveGlModel.loadAccountCategory(categoryId);
                model.showHideAccountCategoryForm();
            }
        };

        model.ValidateAccCategory = function () {
            if (model.isRowsSelected()) {
                if (model.isValidTypeSelected()) {
                    return true;
                }
            }
            return false;
        };


        model.isRowsSelected = function () {
            var selRows = grid.getSelectedGls();
            if (selRows.length === 0) {
                notification.showErrorNotification(model.dilogMessages.selGLAccount, model.dilogMessages.selInfo, 'warning');
                return false;
            }
            return true;
        };

        model.isValidTypeSelected = function () {
            if (model.ValidateAccountType()) {
                model.loadAssignCatExDialog();
                return false;
            }
            return true;
        };

        model.getCategoryId = function () {
            var chekedRows = grid.getSelectedGls();
            return chekedRows[0].accountTypeID;
        };

        model.ValidateAccountType = function () {
            var chekedRows = grid.getSelectedGls();
            var checkedOtherRows = $filter('filter')(chekedRows, { accountTypeID: "!" + chekedRows[0].accountTypeID });
            var isValidAccountType = false;
            if (checkedOtherRows.length > 0) {
                isValidAccountType = true;
            }
            return isValidAccountType;
        };

        model.actionServiceCall = function (PostData) {
           return model.updateGLAccountActions(PostData);

        };

        model.updateGLAccountActions = function (data) {
            return listSVC.updateGLAccountActions(data).$promise;
        };

        model.submitAssignCategory = function () {
            if (model.ValidateAccCategory()) {
                var PostData = [];
                PostData = model.buildActionList("AccountCategoryID", createUpdateGlModel.getAccountCategory());
                var postData = model.updateGLAccountActions(PostData);
                postData.then(model.showAssignCatMsg, exHandling.actionsException);
            }
        };

        model.unmarkBudgetUse = function () {
            var PostData = [];
            PostData = model.buildActionList("BudgetUseOnly", "0");
            var promise = model.actionServiceCall(PostData);
            promise.then(model.onSuccess, exHandling.actionsException);
        };

        model.markBudgetUse = function () {
            var PostData = [];
            PostData = model.buildActionList("BudgetUseOnly", "1");
            var promise = model.actionServiceCall(PostData);
            promise.then(model.onSuccess, exHandling.actionsException);
        };

        model.setDebitBalance = function () {
            var PostData = [];
            PostData = model.buildActionList("NormalBalance", "Debit");
            var promise = model.actionServiceCall(PostData);
            promise.then(model.onSuccess, exHandling.actionsException);

        };

        model.setCreditBalance = function () {
            var PostData = [];
            PostData = model.buildActionList("NormalBalance", "Credit");
            var promise = model.actionServiceCall(PostData);
            promise.then(model.onSuccess, exHandling.actionsException);

        };

        model.restrictPayrollAccess = function () {
            var PostData = [];
            PostData = model.buildActionList("RestrictPayroll", "1");
            var promise = model.actionServiceCall(PostData);
            promise.then(model.onSuccess, exHandling.actionsException);

        };

        model.unRestrictPayrollAccess = function () {
            var PostData = [];
            PostData = model.buildActionList("RestrictPayroll", "0");
            var promise = model.actionServiceCall(PostData);
            promise.then(model.onSuccess, exHandling.actionsException);

        };

        model.moveToMasterChart = function () {
            var chekedRows = grid.getSelectedGls();
            var masterChartList = $filter('filter')(chekedRows, { isSiteAccount: 'true' });
            if (masterChartList.length > 0) {
                model.moveToMasterChartSVC(chekedRows, masterChartList);
            }
            else {
                model.onSuccess();
            }
        };

        model.moveToMasterChartSVC = function (chekedRows, masterChartList) {
            var postData = [];
            postData = model.getMoveMasterChartData(chekedRows, masterChartList);
            var promise = model.moveToChart(postData);
            promise.then(model.onSuccess, exHandling.actionsException);
        };

        model.moveToChart = function (data) {
            return listSVC.moveGlToMasterChart(data).$promise;
        };

        model.getMoveMasterChartData = function (chekedRows, masterChartList) {
            var postData = [];
            if (masterChartList.length != chekedRows.length) {
                postData = model.buidMoveToMasterchartList(masterChartList);
            }
            else {
                postData = model.buidMoveToMasterchartList(chekedRows);
            }
            return postData;
        };

        model.showAssignCatMsg = function () {
            model.showHideAccountCategoryForm();
            // gridModel.loadGlData();
            grid.load();
        };

        model.onSuccess = function () {
            //  gridModel.loadGlData();
            grid.load();
        };

        model.validateActionMenu = function () {
            if ((grid.getSelectedGls()).length > 0) {
                model.showHideactionMenuAlert(false);
                model.showHideMenuList(!model.isMenuOn());
            }
            else {
                model.showHideactionMenuAlert(true);
            }
        };

        model.reset = function () {
            model.deactivateForm();
        };

        return model;

    }

    angular
        .module("budgeting")
        .factory('manageGlAccountActionsModel', [
          'appLangTranslate',
          'manageGLAccountsSvc',
          'rpDialogModel',
          '$filter',
          'manageGlAccountModel',
          'manageGlErrorHandling',
          'createUpdateGlModel',
          'manageGlGridFactory',
          'manageglNotifications',
          'manageGlEditSaveGl',
          factory
        ]);
})(angular);
