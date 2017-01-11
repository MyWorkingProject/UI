// Tests for Import GL Account Accounting Controller

describe('Import GL Account Accounting Controller', function () {
    var $scope, $controller, stateParams, model, ctrl, $rootScope, getCtrl, errModel, gridModel, timeout, pagination;

    beforeEach(module('budgeting.coaSetup.import'));

    beforeEach(function () {

        var mocks = {
            'rp': ['appLangTranslate']
        };

        RealPage.ngMocks.install(mocks);

        var methods = [
            'getProperties',
            'reset',
            'isPropertyID',
            'hideLoadBtn',
            'showLoadBtn',
            'getGlAccs',
            'getGlAccsError',
            'getFiltOptions',
            'getFiltOptionsError',
            'updateFilters',
            'updateGrid',
            'getDefaultFilter',
            'getStagingData',
            'getStagingDataError',
            'getFilterObj',
            'saveGlAccs',
            'saveGlAccsError',
            'getGlsToDelete',
            'delGlAccs',
            'delGlAccsError',
            'updateToolTipState',
            'isHelpIconInfo',
            'setHelpIconInfo',
            'then'
        ];

        pagination = { data: 1 };

        model = RealPage.spy();
        model._createMethods(methods);

        var errMethods = [
            'reset',
            'getGlAccsError',
            'getFiltOptionsError',
            'getStagingDataError',
            'saveGlAccsError',
            'delGlAccsError',
            'showDelGlsSuccMsg',
        ];


        errModel = RealPage.spy();
        errModel._createMethods(errMethods);

        var gridModelMethods = [
            'setChartID',
            'setGridReady',
            'updateGrid',
            'load',
            'hasGlSelections',
            'deleteGls',
            'reset',
            'then'
        ];

        gridModel = RealPage.spy();
        gridModel._createMethods(gridModelMethods);

        stateParams = {
            chartID: 1
        };

        module(function ($provide) {
            $provide.value('importGlAccModel', model);
            $provide.value('importGlAccMsgModel', errModel);
            $provide.value('importGlGridModel', gridModel);
            $provide.value('$stateParams', stateParams);
        });

        function injector(a, b, c) {
            $rootScope = a;
            $controller = b;
            timeout = c;

            $scope = $rootScope.$new();
        }

        inject(['$rootScope', '$controller', '$timeout', injector]);

        getCtrl = function () {
            return $controller('BdgtImprtGlAcc', { '$scope': $scope });
        };

        ctrl = getCtrl();

    });

    it('on init assign reference of a model and load properties', function () {
        expect(stateParams.chartID).toBe(1);
        expect(gridModel._called.setChartID).toBe(true);
        expect(ctrl.model).toBe(model);
        expect(model._called.getProperties).toBe(true);
        var eName, eCallBack, on = $scope.$on;
        $scope.$on = function (a, b) {
            eName = a;
            eCallBack = b;
            on.apply($scope, arguments);
        };

        ctrl = getCtrl();
        expect(eName).toBe('$destroy');
        expect(eCallBack).toBe(ctrl.reset);
    });

    it('on reset all references need to set to default by calling model reset method', function () {
        ctrl.reset();
        expect(model._called.reset).toBe(true);
        expect(errModel._called.reset).toBe(true);
        expect(gridModel._called.reset).toBe(true);
    });

    it('on no property change hide load button', function () {
        model._returnData.isPropertyID = true;
        ctrl.propChange();
        expect(model._called.isPropertyID).toBe(true);
        expect(model._called.hideLoadBtn).toBe(true);
        expect(model._called.showLoadBtn).toBe(undefined);
    });

    it('on property change show load button', function () {
        model._returnData.isPropertyID = false;
        ctrl.propChange();
        expect(model._called.isPropertyID).toBe(true);
        expect(model._called.showLoadBtn).toBe(true);
        expect(model._called.hideLoadBtn).toBe(undefined);
    });

    it('on loadAccGls get gl accounts if property is selected', function () {
        model._returnData.isPropertyID = false;
        ctrl.loadAccGls();
        expect(model._called.isPropertyID).toBe(true);
        expect(model._called.getFiltOptions).toBe(true);
        expect(model._called.then).toBe(true);
    });

    it('on loadAccGls not to get gl accounts if property is selected', function () {
        model._returnData.isPropertyID = true;
        ctrl.loadAccGls();
        expect(model._called.isPropertyID).toBe(true);
        expect(model._called.getFiltOptions).toBe(undefined);
    });

    it('on loadAccsGrid get filter options and then setup grid', function () {
        ctrl.loadAccsGrid();
        expect(model._called.updateFilters).toBe(true);
        expect(gridModel._called.setGridReady).toBe(true);
        expect(gridModel._called.updateGrid).toBe(true);
        expect(model._called.then).toBe(true);
    });

    it('on setGridReady load grid', function () {
        ctrl.setGridReady();
        expect(gridModel._called.load).toBe(true);
    });

    it('on saveGlAccounts call model saveGlAccs to save data', function () {
        ctrl.saveGlAccounts();
        expect(model._called.saveGlAccs).toBe(true);
        expect(model._called.then).toBe(true);
    });

    it('on delGlAccounts if gl accounts got selected delete gl accounts', function () {
        gridModel._returnData.hasGlSelections = true;
        ctrl.delGlAccounts();
        expect(gridModel._called.hasGlSelections).toBe(true);
        expect(gridModel._called.deleteGls).toBe(true);
        expect(gridModel._called.then).toBe(true);
    });

    it('on delGlAccounts if gl accounts not selected do not delete gl accounts', function () {
        gridModel._returnData.hasGlSelections = false;

        ctrl.delGlAccounts();
        expect(gridModel._called.hasGlSelections).toBe(true);
        expect(gridModel._called.deleteGls).toBe(undefined);
        expect(model._called.updateToolTipState).toBe(true);
        timeout.flush();
    });

    it('on showDelMessage show success message notification of deleted gls operation', function () {
        ctrl.showDelMessage();
        expect(errModel._called.showDelGlsSuccMsg).toBe(true);
        expect(gridModel._called.load).toBe(true);
    });

    it('on bindMenu invoke bind menu click', function () {
        model._returnData.isHelpIconInfo = true;
        ctrl.bindMenu();
        expect(model._called.isHelpIconInfo).toBe(true);
    });

    it('on bindMenu not to invoke bind menu click', function () {
        model._returnData.isHelpIconInfo = false;
        ctrl.bindMenu();
        expect(model._called.isHelpIconInfo).toBe(true);
    });


});
