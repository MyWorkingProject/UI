//Test Cases for clone master chart controller
describe('account category controller', function () {
    var $rootScope, $scope, $controller, $stateParams, getCtrl, $location, wizModel, ctrl, $q, $timeout;
    var timeout, accCatModel, svc, accCatComModel, imprtCatModel, accCatDataModel, accCatFormModel, accCatRowModel, rpFormManager;
    var Defered, Defered1, promise, promise1;
    beforeEach(module('budgeting.coaSetup.categories'));

    beforeEach(function () {
        var mockData = {
            'rp.common.standalone': ['rpFormManager']
        };

        RealPage.ngMocks.install(mockData);
    });



    beforeEach(function () {

        accCatModel = RealPage.spy();
        accCatModel._createMethods(['updateShowPageHeader', 'getShowPageHeader', 'getAccntTypeFailure',
            'getCOARowsFailure', 'toggleImpCategory', 'updateEditData', 'updateSlideState', 'getGroupState',
        'toggleMenuIsOn', 'isMenuIsOn', 'setMenuIsOn', 'viewCategoryOptions', 'updateText', 'toggleImportCategory']);

        accCatComModel = RealPage.spy();
        var methods = ['updateState', 'getNewChartModelState', 'getGroupState', 'hideChildRows', 'getRowID',
        'isRefCategory', 'isRowClicked', 'getRowType', 'getInUse', 'setStateOpen', 'toggleStateOpen', 'toggle', 'showDelMsg',
        'getNonFormRow'];
        accCatComModel._createMethods(methods);

        imprtCatModel = RealPage.spy();
        var valMethods = ['updateState', 'getPostCalled', 'setPostCalled'];
        imprtCatModel._createMethods(valMethods);

        accCatDataModel = RealPage.spy();
        var dataMethods = ['resetDelCategoryList', 'getParamData', 'updateUniqGroupData', 'saveCoaRows',
            'updateUniqGroupData', 'deactive', 'moveSectionRows', 'updateSeqLevel', 'getAccountCategoryList',
            'activate', 'move', 'getAccountCategoryRecords', 'updateSeqLevel', 'getLastClickedRow',
        'addSectionRow', 'addSubTotalRow', 'isReferd', 'removeFromList', 'getLastClickedID'];
        accCatDataModel._createMethods(dataMethods);

        svc = RealPage.spy();
        var svcMethods = ['getAccountTypeList', 'getCOARowData'];
        svc._createMethods(svcMethods);

        accCatFormModel = RealPage.spy();
        var formMethods = ['updateAccountTypeData', 'updateEditData', 'bindCategoryData', 'loadAccountCategory',
        'resetFormData', 'isDataValid', 'saveRow', 'updateHeaderRow', 'updateIntialFormData', 'fillFormObjects'];
        accCatFormModel._createMethods(formMethods);

        accCatRowModel = RealPage.spy();
        var rowMethods = ['getReportRowType', 'getReportRowType', 'isEditable', 'isHeader', 'isCategory'];
        accCatRowModel._createMethods(rowMethods);


        $location = RealPage.spy();
        $location._createMethods(['path']);

        wizModel = RealPage.spy();
        wizModel._createMethods(['prev', 'complete']);

        $stateParams = { chartID: 1, type: "normal" };


        module(function ($provide) {
            $provide.value('rpWizardNavModel', wizModel);
            $provide.value('$scope', $scope);
            $provide.value('accountCategoryModel', accCatModel);
            $provide.value('$stateParams', $stateParams);
            $provide.value('categoriesSVC', svc);
            $provide.value('timeout', timeout);
            $provide.value('accountCategoryCommon', accCatComModel);
            $provide.value('importCategoryModel', imprtCatModel);
            $provide.value('accountCategoryData', accCatDataModel);
            $provide.value('accountCategoryForm', accCatFormModel);
            $provide.value('accountCategoryRow', accCatRowModel);
            //$provide.value('rpFormManager', rpFormManager);
        });

        function injector(a, b, c, d, e) {
            $rootScope = a;
            $timeout = b;
            $controller = c;
            $q = d;
            $scope = $rootScope.$new();
            rpFormManager = e();
        }


        inject(['$rootScope',
             '$timeout', '$controller', '$q', 'rpFormManager', injector]);

        var data = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        Defered = $q.defer();
        promise = Defered.promise;

        svc._returnData.getAccountTypeList = {
            $promise: promise
        };

        Defered1 = $q.defer();
        promise1 = Defered1.promise;

        svc._returnData.getCOARowData = {
            $promise: promise1
        };

        Defered.resolve(data);
        Defered1.resolve(data);

        $rootScope.$apply();

        getCtrl = function () {
            return $controller('BdgtGlAccountCategoryCtrl', {
                "$scope": $scope
            });
        };

        ctrl = getCtrl();



    });

    it('On category init method, should call reset of delete cat list and verifying the models', function () {
        expect(accCatDataModel._called.resetDelCategoryList).toBe(true);
        expect(ctrl.dataModel).toBe(accCatDataModel);
        expect(ctrl.formModel).toBe(accCatFormModel);
        expect(accCatModel._called.updateShowPageHeader).toBe(true);
        expect(accCatComModel._called.updateState).toBe(true);
    });


    it('On category init method, When it is in wizard, should call wizard complete methods', function () {
        accCatModel._returnData.getShowPageHeader = true;
        ctrl.updateWiz();
        expect(wizModel._called.complete).toBe(true);
    });

    it('On category init method, When it is not in wizard, should not call wizard complete methods', function () {
        accCatModel._returnData.getShowPageHeader = false;
        ctrl.updateWiz();
        //expect(wizModel._called.complete).toBe(undefined);
    });


    it('calling set form method of controller, verifying form manager methods are called', function () {
        rpFormManager.setForm("test");
        ctrl.setForm("test");
        /*expect(rpFormManager._called.setForm).toBe(true);
        expect(rpFormManager._called.setKeys).toBe(true);*/
    });

    it('Calling import category, when user clicks on import category llink', function () {
        imprtCatModel._returnData.getPostCalled = true;
        ctrl.callImportCategory();
        expect(imprtCatModel._called.setPostCalled).toBe(true);
        expect(imprtCatModel._callData.setPostCalled[0]).toBe(false);
        expect(accCatModel._called.toggleImpCategory).toBe(true);
    });

    it('Calling import category, when user clicks on import category llink', function () {
        imprtCatModel._returnData.getPostCalled = false;
        ctrl.callImportCategory();
        expect(imprtCatModel._called.setPostCalled).toBe(undefined);
    });

    it('should update the complted steps', function () {
        ctrl.setCompletedSteps();
        expect(wizModel._called.complete).toBe(true);
    });

    it('should disable the stp2 when back is clicked', function () {
        ctrl.backClick();
        expect(wizModel._called.complete).toBe(true);
        expect(wizModel._callData.complete[0]).toEqual('step2');
        expect(wizModel._callData.complete[1]).toBe(false);
        expect(wizModel._called.prev).toBe(true);
    });

    it('should call save method on next click', function () {
        ctrl.nextClick(true);
        expect(accCatDataModel._called.saveCoaRows).toBe(true);
        expect(accCatDataModel._callData.saveCoaRows[0]).toBe(true);
    });

    it('should return data when get is called', function () {
        var data = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        Defered1 = $q.defer();
        promise1 = Defered1.promise;

        svc._returnData.getCOARowData = {
            $promise: promise1
        };

        ctrl.getCOAReportRows();

        Defered1.resolve(data);

        /* $rootScope.$apply();
         expect(accCatDataModel._called.getParamData).toBe(true);*/
    });

    it('should call failure method when get is falied', function () {
        var data = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        Defered1 = $q.defer();
        promise1 = Defered1.promise;

        svc._returnData.getCOARowData = {
            $promise: promise1
        };

        ctrl.getCOAReportRows();

        Defered1.reject(data);

        /*  $rootScope.$apply();
          expect(accCatModel._called.getCOARowsFailure).toBe(true);*/
    });

    it('should return promise when get cao rows method is called', function () {

        var data = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        Defered1 = $q.defer();
        promise1 = Defered1.promise;

        svc._returnData.getCOARowData = {
            $promise: promise1
        };

        var retPromise = ctrl.getCoaRowPromise();
        expect(accCatDataModel._called.getParamData).toBe(true);
        expect(retPromise).toBe(promise1);

    });

    it('should call failure method when get is falied', function () {

        var data = {};
        accCatDataModel._returnData.updateUniqGroupData = { uniqID: 1, groupNumber: 2 };
        ctrl.getCOARowSuccess(data);
        expect(accCatDataModel._called.updateUniqGroupData).toBe(true);
        expect(ctrl.dataModel).toBe(accCatDataModel);
    });

    it('should assign uniq and grp number', function () {

        var data = {};
        data = { uniqID: 1, groupNumber: 2 };
        ctrl.assignUniqGroupNumber(data);
    });

    it('calling deactivate method, when group state is undeffined', function () {
        var category = { uniqID: 1, groupNumber: 2 };
        accCatComModel._returnData.getGroupState = "";
        ctrl.deactivate(category);
        expect(accCatDataModel._called.deactive).toBe(true);
        expect(accCatDataModel._callData.deactive[0]).toBe(category);
        expect(accCatDataModel._called.moveSectionRows).toBe(true);
        expect(accCatDataModel._called.updateSeqLevel).toBe(true);
        expect(accCatComModel._called.getGroupState).toBe(true);
    });

    it('calling deactivate method, when group state is definde', function () {
        var category = { uniqID: 1, groupNumber: 2 };
        accCatComModel._returnData.getGroupState = true;
        ctrl.deactivate(category);
        expect(accCatDataModel._called.deactive).toBe(true);
        expect(accCatDataModel._callData.deactive[0]).toBe(category);
        expect(accCatDataModel._called.moveSectionRows).toBe(true);
        expect(accCatDataModel._called.updateSeqLevel).toBe(true);
        expect(accCatComModel._called.getGroupState).toBe(true);
        $timeout.flush(100);
        expect(accCatComModel._called.hideChildRows).toBe(true);
        expect(accCatDataModel._called.getAccountCategoryList).toBe(true);
    });

    it('calling hide child rows method, when group is collapsed', function () {
        var category = { uniqID: 1, groupNumber: 2 };
        ctrl.hideChildRows(category);
        expect(accCatComModel._called.hideChildRows).toBe(true);
        expect(accCatDataModel._called.getAccountCategoryList).toBe(true);
    });


    it('calling activate method', function () {
        var category = { uniqID: 1, groupNumber: 2 };
        ctrl.activate(category);
        expect(accCatDataModel._called.activate).toBe(true);
    });

    it('calling move method', function () {
        var category = { uniqID: 1, groupNumber: 2 };
        ctrl.move(category);
        expect(accCatDataModel._called.move).toBe(true);
    });

    it('calling edit method, when category row is editable row', function () {
        var category = { uniqID: 1, groupNumber: 2 };
        accCatRowModel._returnData.isEditable = true;
        ctrl.edit(category);
        expect(accCatComModel._called.getRowID).toBe(true);
        expect(accCatRowModel._called.getReportRowType).toBe(true);
        expect(accCatRowModel._called.isEditable).toBe(true);
        expect(accCatFormModel._called.updateEditData).toBe(true);
        expect(accCatModel._called.updateEditData).toBe(true);
        expect(accCatModel._called.updateEditData).toBe(true);
    });

    it('calling edit method, when category row is not editable row', function () {
        var category = { uniqID: 1, groupNumber: 2 };
        accCatRowModel._returnData.isEditable = false;
        ctrl.edit(category);
        expect(accCatComModel._called.getRowID).toBe(true);
        expect(accCatRowModel._called.getReportRowType).toBe(true);
        expect(accCatRowModel._called.isEditable).toBe(true);
    });

    it('calling show form errors', function () {
        ctrl.form = rpFormManager.setForm("Test");
        ctrl.showFormErrors();
    });

    it('calling hide form errors', function () {
        ctrl.form = rpFormManager.setForm("Test");
        ctrl.hideFormErrors();
    });

    it('calling bind cat method when it is refeence category', function () {
        accCatComModel._returnData.isRefCategory = true;
        var category = { uniqID: 1, groupNumber: 2 };
        ctrl.bindCategoryData(category);
        expect(accCatComModel._called.isRefCategory).toBe(true);
        expect(accCatFormModel._called.bindCategoryData).toBe(true);
        expect(accCatFormModel._called.loadAccountCategory).toBe(true);
    });

    it('calling bind cat method when it is not refeence category', function () {
        accCatComModel._returnData.isRefCategory = false;
        var category = { uniqID: 1, groupNumber: 2 };
        ctrl.bindCategoryData(category);
        expect(accCatComModel._called.isRefCategory).toBe(true);
        expect(accCatFormModel._called.bindCategoryData).toBe(true);
        expect(accCatFormModel._called.loadAccountCategory).toBe(undefined);
    });

    it('calling resetFormData method when param is true', function () {
        ctrl.resetFormData(true);
        expect(accCatModel._called.updateSlideState).toBe(true);
        expect(accCatModel._callData.updateSlideState[0]).toBe(false);
        expect(accCatFormModel._called.resetFormData).toBe(true);
        expect(accCatDataModel._called.getAccountCategoryList).toBe(true);
    });

    it('calling resetFormData method when param is false', function () {
        ctrl.resetFormData(false);
        expect(accCatModel._called.updateSlideState).toBe(undefined);
        expect(accCatFormModel._called.resetFormData).toBe(true);
        expect(accCatDataModel._called.getAccountCategoryList).toBe(true);
    });

    it('calling save row when data is valid', function () {
        accCatFormModel._returnData.isDataValid = true;
        ctrl.form = rpFormManager.setForm("Test");
        ctrl.saveRow();
        expect(accCatModel._called.getGroupState).toBe(true);
        expect(accCatDataModel._called.getAccountCategoryRecords).toBe(true);
        expect(accCatFormModel._called.saveRow).toBe(true);
    });

    it('calling save row when data is invalid', function () {
        accCatFormModel._returnData.isDataValid = false;
        ctrl.form = rpFormManager.setForm("Test");
        ctrl.saveRow();
        expect(accCatModel._called.getGroupState).toBe(undefined);
        expect(accCatDataModel._called.getAccountCategoryRecords).toBe(undefined);
        expect(accCatFormModel._called.saveRow).toBe(undefined);
    });

    it('calling save new row when data is new row', function () {
        ctrl.form = rpFormManager.setForm("Test");
        var newData = { id: 1 };
        ctrl.saveNewRow(true, newData);
        expect(accCatComModel._called.isRowClicked).toBe(true);
        expect(accCatDataModel._called.updateSeqLevel).toBe(true);
    });

    it('calling save new row when data is not a new row', function () {
        ctrl.form = rpFormManager.setForm("Test");
        var newData = { id: 1 };
        ctrl.saveNewRow(false, newData);
        expect(accCatComModel._called.isRowClicked).toBe(undefined);
        expect(accCatDataModel._called.updateSeqLevel).toBe(true);
    });

    it('calling add row when row is clicked ', function () {
        accCatComModel._returnData.isRowClicked = true;
        ctrl.addRow(1);
        expect(accCatComModel._called.isRowClicked).toBe(true);
        expect(accCatDataModel._called.getLastClickedRow).toBe(true);
        expect(accCatDataModel._called.addSectionRow).toBe(true);
        expect(accCatRowModel._called.isHeader).toBe(true);
    });

    it('calling add row when row is not clicked ', function () {
        accCatComModel._returnData.isRowClicked = false;
        ctrl.addRow(1);
        expect(accCatComModel._called.isRowClicked).toBe(true);
        expect(accCatDataModel._called.getLastClickedRow).toBe(undefined);
        expect(accCatDataModel._called.addSectionRow).toBe(undefined);
    });

    it('calling chek hear row when row is not hearde ', function () {
        accCatRowModel._returnData.isHeader = true;
        ctrl.checkHeaderRow(1);
        expect(accCatFormModel._called.updateHeaderRow).toBe(true);
        expect(accCatRowModel._called.isHeader).toBe(true);
    });

    it('calling chek hear row when row is not hearde ', function () {
        accCatRowModel._returnData.isHeader = false;
        ctrl.checkHeaderRow(1);
        expect(accCatRowModel._called.isHeader).toBe(true);
        expect(accCatFormModel._called.updateHeaderRow).toBe(undefined);
    });

    it('calling add sub totla row method ', function () {
        var data = { id: 1 };
        ctrl.addSubTotalRow(1);
        expect(accCatDataModel._called.addSubTotalRow).toBe(true);
        expect(accCatFormModel._called.updateHeaderRow).toBe(true);
        expect(accCatFormModel._callData.updateHeaderRow[0]).toBe(1);
    });

    it('calling row click method ', function () {
        var data = { id: 1 };
        ctrl.onRowClick(data);
    });

    it('Del category, when it is in use , showing del message ', function () {
        accCatRowModel._returnData.isCategory = true;
        accCatComModel._returnData.getInUse = true;
        var data = { id: 1 };
        ctrl.delcat(data);
        expect(accCatComModel._called.showDelMsg).toBe(true);
    });

    it('Del category, when it is in not use', function () {
        accCatRowModel._returnData.isCategory = true;
        accCatComModel._returnData.getInUse = false;
        var data = { id: 1 };
        ctrl.delcat(data);
        expect(accCatDataModel._called.isReferd).toBe(true);
    });

    it('Deleting other rows', function () {
        accCatRowModel._returnData.isCategory = false;
        accCatComModel._returnData.getInUse = false;
        var data = { id: 1 };
        ctrl.delcat(data);
        expect(accCatComModel._called.getRowType).toBe(true);
    });

    it('Calling Deleting other rows, when it is header row', function () {
        accCatRowModel._returnData.isHeader = true;
        var data = { id: 1 };
        ctrl.deleteOtherRows(data);
        expect(accCatComModel._called.getRowType).toBe(true);
        expect(accCatComModel._called.setStateOpen).toBe(true);
        expect(accCatDataModel._called.removeFromList).toBe(true);
    });

    it('Calling Deleting other rows, when it is not header row', function () {
        accCatRowModel._returnData.isHeader = false;
        var data = { id: 1 };
        ctrl.deleteOtherRows(data);
        expect(accCatComModel._called.getRowType).toBe(true);
        expect(accCatComModel._called.setStateOpen).toBe(undefined);
        expect(accCatDataModel._called.removeFromList).toBe(true);
    });

    it('Not Deleting cat row when it is refered', function () {
        accCatDataModel._returnData.isReferd = true;
        var data = { id: 1 };
        ctrl.deleteCatRow(data);
        expect(accCatDataModel._called.removeFromList).toBe(undefined);
    });

    it('Deleting cat row when it is not refered', function () {
        accCatDataModel._returnData.isReferd = false;
        var data = { id: 1 };
        ctrl.deleteCatRow(data);
        expect(accCatDataModel._called.removeFromList).toBe(true);
    });

    it('calling model remove method', function () {
        var data = { id: 1 };
        ctrl.removeFromList(data);
        expect(accCatDataModel._called.removeFromList).toBe(true);
    });

    it('calling addNonFormRow', function () {
        var data = { id: 1 };
        ctrl.addNonFormRow(data);
        expect(accCatModel._called.updateSlideState).toBe(true);
        expect(accCatComModel._called.getNonFormRow).toBe(true);
        expect(accCatDataModel._called.updateSeqLevel).toBe(true);

    });

    it('calling toggel method', function () {
        var data = { id: 1 };
        ctrl.toggle(data);
        expect(accCatComModel._called.toggleStateOpen).toBe(true);
        expect(accCatComModel._callData.toggleStateOpen[0]).toBe(data);
        expect(accCatComModel._called.toggle).toBe(true);
        expect(accCatComModel._callData.toggle[0]).toBe(data);
        expect(accCatDataModel._called.getAccountCategoryList).toBe(true);
    });

    it('calling show menu optiosn method', function () {
        var data = { id: 1 };
        ctrl.showRowMenuOptions();
        expect(accCatModel._called.toggleMenuIsOn).toBe(true);
        //expect(accCatModel._called.isMenuIsOn).toBe(true);
    });

    it('calling callTimeout when menu is on', function () {
        var data = { id: 1 };
        accCatModel._returnData.isMenuIsOn = true;
        ctrl.callTimeout();
        //expect(accCatModel._called.isMenuIsOn).toBe(true);
    });

    it('calling callTimeout when menu is not on', function () {
        var data = { id: 1 };
        accCatModel._returnData.isMenuIsOn = false;
        ctrl.callTimeout();
        //expect(accCatModel._called.isMenuIsOn).toBe(true);
    });

    it('calling un bind menu method', function () {
        ctrl.unbindMenuClick();
        //expect(accCatModel._called.isMenuIsOn).toBe(true);
    });

    it('calling  bind menu method', function () {
        ctrl.bindMenuClick();
        //expect(accCatModel._called.isMenuIsOn).toBe(true);
    });

    it('calling hide menu method', function () {
        ctrl.hideMenu();
        expect(accCatModel._called.setMenuIsOn).toBe(true);
        expect(accCatModel._callData.setMenuIsOn[0]).toBe(false);
    });

    it('veryfying when accnt type listservice returns success ', function () {
        var Defered2 = $q.defer();
        var promise2 = Defered2.promise;

        svc._returnData.getAccountTypeList = {
            $promise: promise2
        };
        ctrl.accountTypeList();
        Defered2.resolve({ id: 1 });
        $rootScope.$apply();

        expect(accCatFormModel._called.updateAccountTypeData).toBe(true);
    });

    it('should call failure method of accnt type list when there is error ', function () {
        var Defered2 = $q.defer();
        var promise2 = Defered2.promise;

        svc._returnData.getAccountTypeList = {
            $promise: promise2
        };

        ctrl.accountTypeList();
        Defered2.reject({ id: 1 });
        $rootScope.$apply();
        ctrl.accountTypeList();
        expect(accCatModel._called.getAccntTypeFailure).toBe(true);
    });

    it('veryfying promise of accnt type list', function () {
        var Defered2 = $q.defer();
        var promise2 = Defered2.promise;

        svc._returnData.getAccountTypeList = {
            $promise: promise2
        };
        var outPut = ctrl.getAccntTypePromise();
       
        expect(outPut).toBe(promise2);
    });

    it('veryfying promise of accnt type list', function () {
        var data = { id: 1 };
        ctrl.bindAccountTypeData(data);

        expect(accCatFormModel._called.updateAccountTypeData).toBe(true);
    });

    it('calling hide cat form method', function () {
        ctrl.form = rpFormManager.setForm("Test");
        ctrl.hideCategoryForm();

        expect(accCatModel._called.updateSlideState).toBe(true);
    });

    it('calling View cat options mehtod, when row is clicked', function () {
        accCatComModel._returnData.isRowClicked = true;

        ctrl.viewCategoryOptions(true);

        expect(accCatDataModel._called.getLastClickedID).toBe(true);
        expect(accCatComModel._called.isRowClicked).toBe(true);
        expect(accCatModel._called.viewCategoryOptions).toBe(true);
        expect(accCatModel._callData.viewCategoryOptions[0]).toBe(true);
    });

    it('calling View cat options mehtod, when row is not clicked', function () {
        accCatComModel._returnData.isRowClicked = false;

        ctrl.viewCategoryOptions(true);

        expect(accCatDataModel._called.getLastClickedID).toBe(true);
        expect(accCatComModel._called.isRowClicked).toBe(true);
        expect(accCatModel._called.viewCategoryOptions).toBe(undefined);
    });

    it('calling View Row option page', function () {
       
        ctrl.viewRowOptions(true);

        expect(accCatModel._called.viewCategoryOptions).toBe(true);
        expect(accCatFormModel._called.updateIntialFormData).toBe(true);
        expect(accCatModel._called.updateText).toBe(true);
        expect(accCatFormModel._called.fillFormObjects).toBe(true);
    });

    it('calling toggle import category', function () {

        ctrl.toggleImportCategory();

        expect(accCatModel._called.toggleImportCategory).toBe(true);
    });

});