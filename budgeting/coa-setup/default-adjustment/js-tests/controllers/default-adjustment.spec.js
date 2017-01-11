// Tests for Default Adjustment Screen Controller

describe('Default Adjustment Controller', function () {
    var $rootScope, $scope, $controller, getCtrl, ctrl, model, errModel, locationObj, stateParams, dialogSvc, bdgtModel, $q, qDeferred, mockChartData;
    var timeout, $timeout, $location;

    beforeEach(module('rp.common.standalone'));
    beforeEach(module('budgeting.coaSetup.defaultAdjustment'));

    beforeEach(function () {
        var mocks = {
            'rp': ['appLangTranslate']
        };

        RealPage.ngMocks.install(mocks);

        var methods = [
            'setChartID',
            'updateGrid',
            'toggleDefAdjPercent',
            'toggleDefAdjModel',
            'updateChartName',
            'updateAccTypeFilterOptions',
            'showHideGrid',
            'initPageControls',
            'getAccTypes',
            'getGridData',
            'getBdgtModel',
            'saveDefAdjPer',
            'showToolTip',
            'hideToolTip',
            'reset',
            'getAcctypeOptions',
            'getAdjPer',
            'getChartError',
            'getAccTypesError',
            'getCategoryError',
            'getBdgtModelError',
            'saveDefAdjPerError',
            'showErrorMsg',
            'then', 'setGridReady', 'load', 'setBdgtModel', 'isValidSelection', 'getData','getChartID','setToolTip',
            'updatePerValForItems', 'isToolTip'
        ];

        model = RealPage.spy();
        model._createMethods(methods);

        timeout = RealPage.spy();

        var bdgtModelMethods = [
            'toggleBdgtModel',
            'getToggleBgtModelState',
            'updateDefModelYear',
            'getModelNames',
            'applyBdgtModel',
            'updateYearOptions',
            'setDefaultModelSelection',
            'updateModelOptions',
            'updateChkOverWrite',
            'showModelHelpInfo',
            'reset',
            'getModelNamesError',
            'applyBdgtModelError',
            'showErrorMsg', 'then', 'isHelpIconInfo', 'setHelpIconInfo'
        ];

        bdgtModel = RealPage.spy();
        bdgtModel._createMethods(bdgtModelMethods);

        var errModelMethods = [
            'onError',
            'showSuccMessage',
            'reset'
        ];

        errModel = RealPage.spy();
        errModel._createMethods(errModelMethods);

        stateParams = {
            'chartID': 1
        };

        locationObj = RealPage.spy();
        locationObj._createMethods(['path']);

        module(function ($provide) {
            $provide.value('defaultAdjustmentModel', model);
            $provide.value('$location', locationObj);
            $provide.value('$stateParams', stateParams);
            $provide.value('rpDialogModel', dialogSvc);
            $provide.value('defaultAdjustmentBdgtModel', bdgtModel);
            $provide.value('defaultAdjustmentErrModel', errModel);
            $provide.value('timeout', timeout);
        });

        function injector(a, b, c, d) {
            $rootScope = a;
            $timeout = b;
            $controller = c;
            $scope = $rootScope.$new();
            $location = d;
        }

        inject(['$rootScope', '$timeout', '$controller', '$location', injector]);

        getCtrl = function () {
            return $controller('BdgtDefAdjCtrl', {
                '$scope': $scope
            });
        };

        ctrl = getCtrl();
    });

    it('on init should assign references on scope', function () {
        expect(ctrl.model).toBe(model);
        expect(model._called.setChartID).toBe(true);
        expect(ctrl.budgetModel).toBe(bdgtModel);
        expect(model._called.initPageControls).toBe(true);
        expect(model._called.then).toBe(true);
    });

    it('on reset method model reset method need to be invoked', function () {
        ctrl.reset();
        expect(model._called.reset).toBe(true);
        expect(errModel._called.reset).toBe(true);
    });

    it('on load method model load method need to be invoked', function () {
        var resp = { records: [{ name: "Test" }] };
        ctrl.load(resp);
        expect(model._called.updateChartName).toBe(true);
        expect(model._called.setBdgtModel).toBe(true);
    });

    it('on setGrid method model data shoudl be loaded', function () {
        var resp = { records: [{ name: "Test" }] };
        ctrl.setGrid(resp);
        expect(model._called.updateAccTypeFilterOptions).toBe(true);
        expect(model._called.showHideGrid).toBe(true);
        expect(model._called.setGridReady).toBe(true);
        expect(model._called.getAcctypeOptions).toBe(true);
        expect(model._called.updateGrid).toBe(true);
        expect(model._called.load).toBe(true);
    });

    it('load Model Names verifying the calling of budget model methods', function () {
        var resp = { records: [{ name: "Test" }] };
        ctrl.loadModelNames(resp);
        expect(bdgtModel._called.setDefaultModelSelection).toBe(true);
        expect(bdgtModel._called.updateModelOptions).toBe(true);
    });

    it('load Model data verifying the calling of budget model methods', function () {
        var resp = { records: [{ name: "Test" }] };
        ctrl.loadModelData(resp);
        expect(bdgtModel._called.updateChkOverWrite).toBe(true);
        expect(bdgtModel._called.getModelNames).toBe(true);
    });

    it('assing of def per when valid data is selected', function () {
        var resp = { records: [{ name: "Test" }] };
        model._returnData.isValidSelection = true;
        ctrl.assignDefPer();
        expect(model._called.isValidSelection).toBe(true);
        expect(model._called.getData).toBe(true);
        expect(model._called.updatePerValForItems).toBe(true);
        expect(model._called.toggleDefAdjPercent).toBe(true);
    });

    it('assing of def per when valid data is not selected', function () {
        var resp = { records: [{ name: "Test" }] };
        model._returnData.isValidSelection = false;
        ctrl.assignDefPer();
        expect(model._called.isValidSelection).toBe(true);
        expect(model._called.showToolTip).toBe(true);
        expect(model._called.updatePerValForItems).toBe(undefined);
    });

    it('calling save adjsu method', function () {
        var resp = { records: [{ name: "Test" }] };
        ctrl.saveDefAdjPer();
        expect(model._called.saveDefAdjPer).toBe(true);
        expect(model._called.getData).toBe(true);
        //expect(errModel._called.onError).toBe(true);
    });

    it('calling redirect page method', function () {
        var resp = { records: [{ name: "Test" }] };
        ctrl.redirectPage(resp);
        expect($location._called.path).toBe(true);
        expect($location._callData.path[0]).toEqual('/admin/coa');
        //expect(errModel._called.onError).toBe(true);
    });

    it('calling redirect page method', function () {
        var resp = { records: [{ name: "Test" }] };
        ctrl.applyDefPerBdgtModel();
        expect(bdgtModel._called.applyBdgtModel).toBe(true);
        expect(model._called.getChartID).toBe(true);
        //expect(errModel._called.onError).toBe(true);
    });

    it('toggle DefAdj Per when valid data is selected', function () {
        var resp = { records: [{ name: "Test" }] };
        model._returnData.isValidSelection = true;
        ctrl.toggleDefAdjPer();
        expect(model._called.isValidSelection).toBe(true);
        expect(model._called.getData).toBe(true);
        expect(model._called.toggleDefAdjPercent).toBe(true);
    });

    it('toggle DefAdj when valid data is not selected', function () {
        var resp = { records: [{ name: "Test" }] };
        model._returnData.isValidSelection = false;
        ctrl.toggleDefAdjPer();
        expect(model._called.isValidSelection).toBe(true);
        expect(model._called.showToolTip).toBe(true);
    });

    it('calling show Over Write Info ', function () {
        ctrl.showOverWriteInfo();
        expect(bdgtModel._called.showModelHelpInfo).toBe(true);
    });

    it('calling bindMenu when icon is clicked', function () {
        bdgtModel._returnData.isHelpIconInfo = true;
        model._returnData.isToolTip = true;
        ctrl.bindMenu();
        expect(bdgtModel._called.isHelpIconInfo).toBe(true);
        expect(model._called.isToolTip).toBe(true);
    });

    it('calling bindMenu when icon is not clicked', function () {
        bdgtModel._returnData.isHelpIconInfo = false;
        model._returnData.isToolTip = false;
        ctrl.bindMenu();
        expect(bdgtModel._called.isHelpIconInfo).toBe(true);
        expect(model._called.isToolTip).toBe(true);
    });

    it('calling bindMenu click mehtod', function () {
        ctrl.bindMenuClick();
    });

    it('calling bind Tool Tip click mehtod', function () {
        ctrl.bindToolTipClick();
    });

    it('calling un bind Menu Click click mehtod', function () {
        ctrl.unbindMenuClick();
    });

    it('calling hide Menu Click click mehtod', function () {
        ctrl.hideMenu();
    });

    it('calling hide tool tip mehtod', function () {
        ctrl.hideToolTip();
    });

});
