    describe('Manage gl account Controller', function () {
    var $scope, $rootScope, $controller, manageGlAccountModel, ctrl, getCtrl,
        manageGlAccountActionsModel, createUpdateGlModel, manageGlPrintModel, rpWizardNavModel, newMasterchartModel, manageGlGrid,
        manageGlErrorHandling, formManager, manageGlGridFactory, manageGlEditSaveGl, manageGlAccountConfig, $timeout, $q, promise;

    beforeEach(module('budgeting.coaSetup.manageGlAccount'));

    beforeEach(function () {
        var mockData = {
            'rp.common.standalone': ['rpWatchList', 'rpFormManager']
        };

        RealPage.ngMocks.install(mockData);
    });


    beforeEach(function () {
        var spy1 = RealPage.spy();
        spy1._createMethods(['initializeParams', 'getAccTypes', 'then', 'wizBackClick', 'navToWizard', 'updateWizStep', 'completeEnableWiz', 'reset']);

        var spy2 = RealPage.spy();
        spy2._createMethods(['deactivateForm', 'showHideAccountCategoryForm', 'validateActionMenu', 'showHideactionMenuAlertFlag', 'isMenuOn', 'isActionMenu', 'showHideactionMenuAlert', 'showHideMenuList', 'assignAccountCategory', 'submitAssignCategory', 'markBudgetUse', 'unmarkBudgetUse', 'setDebitBalance', 'setCreditBalance', 'restrictPayrollAccess', 'unRestrictPayrollAccess', 'moveToMasterChart', 'delete', 'reset']);

        var spy3 = RealPage.spy();
        spy3._createMethods(['loadResetForm', 'deactivateForm', 'onfocusCall', 'isOnFocus', 'reset']);

        var spy4 = RealPage.spy();
        spy4._createMethods(['deactivateForm', 'showHidePrintParamsForm', 'reset']);


        var spy6 = RealPage.spy();
        spy6._createMethods(['next']);

        var spy7 = RealPage.spy();
        spy7._createMethods(['getState']);

        var spy8 = RealPage.spy();
        spy8._createMethods(['updateFiltTypes', 'loadInitFctns', 'isValidWizardNext', 'reset']);

        var spy9 = RealPage.spy();
        spy9._createMethods(['getAccTypesException', 'updateWizStepError']);

        var spy11 = RealPage.spy();
        spy11._createMethods(['setGridReady', 'updateGrid', 'load','isValidWizardNext']);

        var spy12 = RealPage.spy();
        spy12._createMethods(['editGLAccount', 'saveUpdateGLAccount']);

        var spy13 = RealPage.spy();
        spy13._createMethods(['']);


        module(function ($provide) {
            $provide.value('manageGlAccountModel', spy1);
            $provide.value('manageGlAccountActionsModel', spy2);
            $provide.value('createUpdateGlModel', spy3);
            $provide.value('manageGlPrintModel', spy4);
            $provide.value('rpWizardNavModel', spy6);
            $provide.value('newMasterchartModel', spy7);
            $provide.value('manageGlGrid', spy8);
            $provide.value('manageGlErrorHandling', spy9);
            $provide.value('manageGlGridFactory', spy11);
            $provide.value('manageGlEditSaveGl', spy12);
            $provide.value('manageGlAccountConfig', spy13);
        });

        function injector(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o,p,q) {
            $rootScope = a;
            $controller = b;
            $scope = $rootScope.$new();
            manageGlAccountModel = c;
            manageGlAccountActionsModel = d;
            createUpdateGlModel = e;
            manageGlPrintModel = f;
            $timeout = g;
            rpWizardNavModel = h;
            newMasterchartModel = i;
            manageGlGrid = j;
            manageGlErrorHandling = k;
            formManager = l();
            manageGlGridFactory = m;
            manageGlEditSaveGl = n;
            manageGlAccountConfig = o;
            $q = p;
            $rootScope = q;
            

        }

        inject([
            '$rootScope',
            '$controller',
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
            'manageGlAccountConfig', '$q', '$rootScope',
            injector
        ]);

        //var data = {
        //    "messageId": 200,
        //    "messageText": "Success",
        //    "totalRecords": 0,
        //    "records": [
        //      {
        //          "value": 1,
        //          "name": "Asset"
        //      },
        //      {
        //          "value": 2,
        //          "name": "Liability"
        //      }]
        //};
        //var Defered = $q.defer();
        //promise = Defered.promise;

        //manageGlAccountModel._returnData.getAccTypes = {
        //    $promise: promise
        //};     
       
        //Defered.resolve(data);
        //$rootScope.$apply();

        getCtrl = function () {
            return $controller('BdgtManageGlAccountCtrl', {
                '$scope': $scope
            });
        };
        ctrl = getCtrl();

        
    });

    it('on init should create a key model and assign model to it', function () {
        expect(ctrl.model).toBe(manageGlAccountModel);
        expect(ctrl.actionsModel).toBe(manageGlAccountActionsModel);
        expect(ctrl.printModel).toBe(manageGlPrintModel);
        expect(ctrl.createUpdateGlModel).toBe(createUpdateGlModel);
        expect(ctrl.glCommonModel).toBe(manageGlGrid);
        expect(ctrl.editSaveGlModel).toBe(manageGlEditSaveGl);
    
    });

    it('set form method sets the form control', function () {
      //  formManager.setForm("test");     
        ctrl.setForm("test");
        expect(formManager._called.setForm).toBe(true);
        expect(formManager._called.setKeys).toBe(true);
    });

    it('load grid data method loads on success of account type promise and loads grid data', function () {

        var data = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 0,
            "records": [
              {
                  "value": 1,
                  "name": "Asset"
              },
              {
                  "value": 2,
                  "name": "Liability"
              }]
        };
        ctrl.loadGridData(data);
        expect(manageGlGrid._called.updateFiltTypes).toBe(true);
        expect(manageGlGridFactory._called.setGridReady).toBe(true);
        expect(manageGlGridFactory._called.updateGrid).toBe(true);
        expect(manageGlGridFactory._called.load).toBe(true);
        expect(manageGlGrid._called.loadInitFctns).toBe(true);       
    });

    it('editGLAccount method calls on click of gl account in grid to edit', function () {
        var data = { "glNumber": 1 };
        ctrl.editGLAccount(data);
        expect(manageGlEditSaveGl._called.editGLAccount).toBe(true);
    });

    it('showHideForm hides form', function () {
        ctrl.form = formManager.setForm("Test");
        ctrl.showHideForm();
        ctrl.hideFormErrors();
        expect(formManager._called.setUntouched).toBe(true);
        expect(formManager._called.setPristine).toBe(true);
        expect(createUpdateGlModel._called.loadResetForm).toBe(true);
    });

    it('closePrintAndCategoryForms hides form', function () {
        ctrl.closePrintAndCategoryForms();
        expect(manageGlPrintModel._called.deactivateForm).toBe(true);
        expect(manageGlAccountActionsModel._called.deactivateForm).toBe(true);
    });

    it('closeGlAndCategoryForms hides form', function () {
        ctrl.closeGlAndCategoryForms();
        expect(createUpdateGlModel._called.deactivateForm).toBe(true);
        expect(manageGlAccountActionsModel._called.deactivateForm).toBe(true);
    });

    it('closeGlAndPrintForms hides form', function () {
        ctrl.closeGlAndPrintForms();
        expect(createUpdateGlModel._called.deactivateForm).toBe(true);
        expect(manageGlPrintModel._called.deactivateForm).toBe(true);
    });

    it('togglePrintForm hides form', function () {
        ctrl.togglePrintForm();        
        expect(manageGlPrintModel._called.showHidePrintParamsForm).toBe(true);
    });

    it('hidePrintParamsForm hides form', function () {
        ctrl.form = formManager.setForm("Test");
        ctrl.hidePrintParamsForm();
        expect(manageGlPrintModel._called.showHidePrintParamsForm).toBe(true);
    });

    it('hideAssignCategoryForm  hides form', function () {      
        ctrl.hideAssignCategoryForm();
        expect(manageGlAccountActionsModel._called.showHideAccountCategoryForm).toBe(true);
    });

    it('showActionMenu shows the actions menu list ', function () {
        manageGlAccountActionsModel._returnData.showHideactionMenuAlertFlag = false;
        manageGlAccountActionsModel._returnData.isMenuOn = false;
        ctrl.showActionMenu();
        $timeout.flush();
    });

    it('showActionMenu shows the actions menu list ', function () {
        manageGlAccountActionsModel._returnData.showHideactionMenuAlertFlag = true;
        manageGlAccountActionsModel._returnData.isMenuOn = true;
        ctrl.showActionMenu();
        $timeout.flush();
    });

    it('bindMenu  shows the actions menu list ', function () {
        manageGlAccountActionsModel._returnData.isMenuOn = true;
        ctrl.bindMenu();      
    });

    it('bindMenu  shows the actions menu list ', function () {
        manageGlAccountActionsModel._returnData.isMenuOn = false;
        ctrl.bindMenu();
    });

    it('bindActions  shows the actions menu list ', function () {
        manageGlAccountActionsModel._returnData.isActionMenu = true;
        ctrl.bindActions();
    });


    it('bindActions  shows the actions menu list ', function () {
        manageGlAccountActionsModel._returnData.isActionMenu = false;
        ctrl.bindActions();
    });

    it('showTransactionStatus  actions menu list ', function () {
        ctrl.showTransactionStatus();
        expect(manageGlGridFactory._called.load).toBe(true);
    });

    it('assignAccountCategoriesactions menu list ', function () {
        ctrl.assignAccountCategories();
        expect(manageGlAccountActionsModel._called.assignAccountCategory).toBe(true);
    });

    it('submitAssignCategory actions menu list ', function () {
        ctrl.submitAssignCategory();
        expect(manageGlAccountActionsModel._called.submitAssignCategory).toBe(true);
    });

    it('markForBudgetingUse  actions menu list ', function () {
        ctrl.markForBudgetingUse();
        expect(manageGlAccountActionsModel._called.markBudgetUse).toBe(true);
    });

    it('unmarkForBudgetingUse  actions menu list ', function () {
        ctrl.unmarkForBudgetingUse();
        expect(manageGlAccountActionsModel._called.unmarkBudgetUse).toBe(true);
    });

    it('setCreditBalance  menu list ', function () {
        ctrl.setCreditBalance();
        expect(manageGlAccountActionsModel._called.setCreditBalance).toBe(true);
    });

    it('setDebitBalance  actions menu list ', function () {
        ctrl.setDebitBalance();
        expect(manageGlAccountActionsModel._called.setDebitBalance).toBe(true);
    });


    it('restrictPayrollAccess   actions menu list ', function () {
        ctrl.restrictPayrollAccess();
        expect(manageGlAccountActionsModel._called.restrictPayrollAccess).toBe(true);
    });

    it('unRestrictPayrollAccess  actions menu list ', function () {
        ctrl.unRestrictPayrollAccess();
        expect(manageGlAccountActionsModel._called.unRestrictPayrollAccess).toBe(true);
    });

    it('moveToMasterChart   actions menu list ', function () {
        ctrl.moveToMasterChart();
        expect(manageGlAccountActionsModel._called.moveToMasterChart).toBe(true);
    });

    it('delete   actions menu list ', function () {
        ctrl.delete();
        expect(manageGlAccountActionsModel._called.delete).toBe(true);
    });


    it('focusOnCancel method calls to focus control on gl number on calce click', function () {
        createUpdateGlModel._returnData.isOnFocus = false;
        ctrl.focusOnCancel();
    });

    it('focusOnCancel method calls to focus control on gl number on calce click', function () {
        createUpdateGlModel._returnData.isOnFocus = true;
        ctrl.focusOnCancel();
        expect(createUpdateGlModel._called.onfocusCall).toBe(true);
    });

    it('backClick  method calls when wiz back clicks', function () {      
        ctrl.backClick();
        expect(manageGlAccountModel._called.wizBackClick).toBe(true);
    });

    it('navigateToImport   method calls to navigate to import', function () {
        ctrl.navigateToImport();
        expect(manageGlAccountModel._called.navToWizard).toBe(true);
    });

    it('moveNext    method calls on next button click', function () {
        ctrl.moveNext();
        expect(manageGlAccountModel._called.completeEnableWiz).toBe(true);
        expect(rpWizardNavModel._called.next).toBe(true);
    });

    it('destroy  method destroys rf of all modules', function () {
        ctrl.destroy();
        expect(manageGlGrid._called.reset).toBe(true);
        expect(manageGlAccountModel._called.reset).toBe(true);
        expect(createUpdateGlModel._called.reset).toBe(true);
        expect(manageGlAccountActionsModel._called.reset).toBe(true);
        expect(manageGlPrintModel._called.reset).toBe(true);

    });

    //formManager._returnData.isValid = true;

    it('submit calls for new gl creation', function () {
         ctrl.form = formManager.isValid();      
        formManager._returnData.isValid = true;
        ctrl.submit();
        expect(manageGlEditSaveGl._called.saveUpdateGLAccount).toBe(true);
    });

    it('submit calls for new gl creation when validation fails', function () {
      
        formManager._returnData.isValid = false;
        ctrl.form = formManager.setForm("Test");
        ctrl.submit();
        
        ctrl.showFormErrors();
        expect(formManager._called.setTouched).toBe(true);
    });

    it('nextClick function updates wiz step', function () {
        ctrl.nextClick();
        manageGlGridFactory._returnData.isValidWizardNext = true;
    });

    it('nextClick function else block updates wiz step', function () {
        manageGlGridFactory._returnData.isValidWizardNext = false;
        ctrl.nextClick();
       
    });



});