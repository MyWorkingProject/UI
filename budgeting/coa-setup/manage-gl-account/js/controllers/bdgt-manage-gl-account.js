(function () {

    var fn = angular.noop;
    function BdgtManageGlAccountCtrl($scope, model, actionsModel, createUpdateGlModel, printModel, timeout, wiznav, newMasterchartModel, glCommonModel, exHandling, formManager, grid, editSaveGlModel, gridConfig) {
        var vm, body, btnClick;
        vm = this;
        vm.init = function () {
            vm.model = model;
            vm.actionsModel = actionsModel;
            $scope.state = newMasterchartModel.getState();
            vm.printModel = printModel;
            vm.createUpdateGlModel = createUpdateGlModel;
            vm.glCommonModel = glCommonModel;
            vm.editSaveGlModel = editSaveGlModel;
            vm.initializeModel();
            vm.watchForm();

        };

        vm.initializeModel = function () {
            model.initializeParams();
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
            vm.accountTypeList();
            $scope.$watch('page.createUpdateGlModel.types.onFocus', vm.focusOnCancel);
            $scope.$on('$destroy', vm.destroy);

        };

        vm.watchForm = function () {
            vm.formWatch = $scope.$watch('newGlAccount', vm.setForm);
        };

        vm.setForm = function (form) {
            vm.formWatch();
            vm.form = formManager().setForm(form);
            vm.form.setKeys(['accountNumber', 'accountDescription', 'accountType', 'accountCategory']);
        };

        vm.accountTypeList = function () {
            var promise = model.getAccTypes();
            promise.then(vm.loadGridData, exHandling.getAccTypesException);
        };

        vm.loadGridData = function (resp) {
            var filters= glCommonModel.updateFiltTypes(resp.records);
            grid.setGridReady(filters);
            //gridConfig.model.setSrc.name = "editGLAccount";
            //gridConfig.model.setSrc('editGLAccount');
            $scope.gridFactory = grid.updateGrid();
            grid.load();
            glCommonModel.loadInitFctns(resp.records);
        };

        vm.editGLAccount = function (record) {
            editSaveGlModel.editGLAccount(record);
        };

        vm.showHideForm = function () {
            vm.hideFormErrors();
            vm.closePrintAndCategoryForms();
            createUpdateGlModel.loadResetForm();
        };

        vm.closePrintAndCategoryForms = function () {
            printModel.deactivateForm();
            actionsModel.deactivateForm();
        };

        vm.closeGlAndCategoryForms = function () {
            createUpdateGlModel.deactivateForm();
            actionsModel.deactivateForm();
        };

        vm.closeGlAndPrintForms = function () {
            printModel.deactivateForm();
            createUpdateGlModel.deactivateForm();
        };


        vm.togglePrintForm = function () {
            vm.closeGlAndCategoryForms();
            printModel.showHidePrintParamsForm();
        };

        vm.hidePrintParamsForm = function () {
            vm.hideFormErrors();
            printModel.showHidePrintParamsForm();
        };

        vm.hideAssignCategoryForm = function () {
            actionsModel.showHideAccountCategoryForm();
        };

        vm.showActionMenu = function () {
            actionsModel.validateActionMenu();
            if (!actionsModel.showHideactionMenuAlertFlag()) {
                timeout(vm.bindMenu);
            }
            else{
                timeout(vm.bindActions);
            }
        };

        vm.bindMenu = function () {
            if (actionsModel.isMenuOn()) {
                vm.bindMenuClick();
            }
        };

        vm.bindActions = function () {
            if (actionsModel.isActionMenu()) {
                vm.bindActionClick();
            }
        };

        vm.submit = function () {
            var data, id;
            if (vm.form.isValid()) {
                editSaveGlModel.saveUpdateGLAccount();
            }
            else {
                vm.showFormErrors();
            }
        };

        vm.showFormErrors = function () {
            vm.form.setTouched();
        };

        vm.hideFormErrors = function () {
            vm.form.setUntouched().setPristine();
        };

        vm.bindActionClick = function () {
            body.on(btnClick, vm.hideActionMenu);
        };

        vm.hideActionMenu = function () {
            $scope.$apply(vm.applyActionMenuAlert);
        };

        vm.applyActionMenuAlert = function () {
            actionsModel.showHideactionMenuAlert(false);
            vm.unbindMenuClick();
        };

        vm.bindMenuClick = function () {
            body.on(btnClick, vm.hideMenu);
        };

        vm.hideMenu = function () {
            $scope.$apply(vm.applyMenuList);
        };

        vm.applyMenuList = function () {
            actionsModel.showHideMenuList(false);
            vm.unbindMenuClick();

        };

        vm.unbindMenuClick = function () {
            body.off(btnClick);
        };

        vm.showTransactionStatus = function (resp) {
            grid.load();
        };

        vm.assignAccountCategories = function () {
            vm.closeGlAndPrintForms();
            actionsModel.assignAccountCategory();
        };

        vm.submitAssignCategory = function () {
            actionsModel.submitAssignCategory();
        };

        vm.markForBudgetingUse = function () {
            actionsModel.markBudgetUse();
        };

        vm.unmarkForBudgetingUse = function () {
            actionsModel.unmarkBudgetUse();
        };

        vm.setDebitBalance = function () {
            actionsModel.setDebitBalance();
        };

        vm.setCreditBalance = function () {
            actionsModel.setCreditBalance();
        };

        vm.restrictPayrollAccess = function () {
            actionsModel.restrictPayrollAccess();
        };

        vm.unRestrictPayrollAccess = function () {
            actionsModel.unRestrictPayrollAccess();
        };

        vm.moveToMasterChart = function () {
            actionsModel.moveToMasterChart();
        };

        vm.delete = function () {
            actionsModel.delete();
        };

        vm.focusOnCancel = function () {
            if (createUpdateGlModel.isOnFocus()) {
                angular.element('#accountNumber').focus();
                createUpdateGlModel.onfocusCall(false);
            }
        };

        vm.backClick = function () {
            model.wizBackClick();
        };

        vm.navigateToImport = function () {
            model.navToWizard();
        };

        vm.nextClick = function () {
            if (grid.isValidWizardNext()) {
                var promise = model.updateWizStep();
                promise.then(vm.moveNext, exHandling.updateWizStepError);
            }
        };


        vm.moveNext = function (resp) {
            model.completeEnableWiz();
            wiznav.next();
        };

        vm.destroy = function () {
            glCommonModel.reset();
            model.reset();
            createUpdateGlModel.reset();
            actionsModel.reset();
            printModel.reset();
        };

        vm.init();
    }
    angular
        .module("budgeting")
        .controller('BdgtManageGlAccountCtrl', [
                       '$scope',
                       'manageGlAccountModel',
                       'manageGlAccountActionsModel',
                       'createUpdateGlModel',
                       'manageGlPrintModel',
                       '$timeout',
                       'rpWizardNavModel',
                       'newMasterchartModel',
                       'manageGlGrid',
                       'manageGlErrorHandling',
                       'rpFormManager',
                       'manageGlGridFactory',
                       'manageGlEditSaveGl',
                       'manageGlAccountConfig',
                       BdgtManageGlAccountCtrl]);
})(angular);