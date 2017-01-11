// Tests for Import GL Account Yardi Controller

describe('Import GL Account Yardi Controller', function () {
    var $scope, $controller, stateParams, pagination, model, ctrl, $rootScope, getCtrl, errModel, gridModel, timeout;

    beforeEach(module('budgeting.coaSetup.import'));

    beforeEach(function () {

        var mocks = {
            'rp': ['appLangTranslate']
        };

        RealPage.ngMocks.install(mocks);

        var methods = [
            'loadYardiProp',
            'reset',
            'isSelectedChartID',
            'hideLoadBtn',
            'showLoadBtn',
            'getFiltOptions',
            'updateAssgnTypes',
            'updateUnassignedType',
            'updateFilters',
            'getYardiAccs',
            'saveGlAccs',
            'toggleAssignWorkFlow',
            'getSelGlsToAssgnTypeObj',
            'updateAccType',
            'updateToolTipState',
            'isHelpIconInfo',
            'setHelpIconInfo',
            'then'
        ];

        pagination = { data: 1 };

        model = RealPage.spy();
        model._createMethods(methods);

        var errMethods = [
            'getYardiPropError',
            'reset',
            'getFiltOptionsError',
            'getYardiAccsError',
            'saveGlAccsError',
            'showSaveSuccessMessage',
            'updateAccTypeError',
            'delGlAccsError',
            'showDelGlsMessage',
            'showUpdateAccTypeMessage'
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
            'getGlsSelected',
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
            return $controller('BdgtImprtGlYardi', { '$scope': $scope });
        };

        ctrl = getCtrl();

    });

    it('on init assign reference of a model and load properties', function () {
        expect(stateParams.chartID).toBe(1);
        expect(gridModel._called.setChartID).toBe(true);
        expect(ctrl.model).toBe(model);
        expect(model._called.loadYardiProp).toBe(true);
        expect(model._called.then).toBe(true);
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
        model._returnData.isSelectedChartID = true;
        ctrl.propChange();
        expect(model._called.isSelectedChartID).toBe(true);
        expect(model._called.hideLoadBtn).toBe(true);
        expect(model._called.showLoadBtn).toBe(undefined);
    });

    it('on property change show load button', function () {
        model._returnData.isSelectedChartID = false;
        ctrl.propChange();
        expect(model._called.isSelectedChartID).toBe(true);
        expect(model._called.showLoadBtn).toBe(true);
        expect(model._called.hideLoadBtn).toBe(undefined);
    });

    it('on loadYardiGls get account type filter options of a grid', function () {
        ctrl.loadYardiGls();
        expect(model._called.getFiltOptions).toBe(true);
        expect(model._called.then).toBe(true);
    });

    it('on setGridReady to set the configuaration of grid and account types', function () {
        var resp = { records: [] };
        ctrl.setGridReady(resp);
        expect(model._called.updateAssgnTypes).toBe(true);
        expect(model._called.updateUnassignedType).toBe(true);
        expect(model._called.updateFilters).toBe(true);
        expect(gridModel._called.setGridReady).toBe(true);
        expect(gridModel._called.updateGrid).toBe(true);
        expect(model._called.getYardiAccs).toBe(true);
        expect(model._called.then).toBe(true);
    });

    it('on populateGrid load grid with data', function () {
        ctrl.populateGrid();
        expect(gridModel._called.load).toBe(true);
    });

    it('on saveGlAccounts call model saveGlAccs to save data', function () {
        ctrl.saveGlAccounts();
        expect(model._called.saveGlAccs).toBe(true);
        expect(model._callData.saveGlAccs[1]).toBe('yardi');
        expect(model._called.then).toBe(true);
    });

    it('on toggleAssignType toggle inline workflow to assign type for unassigned yardi gls', function () {
        ctrl.toggleAssignType();
        expect(model._called.toggleAssignWorkFlow).toBe(true);
    });

    it('on assignTypeSave if there are any selections then assign types to unassigned types/categories', function () {
        gridModel._returnData.hasGlSelections = true;
        ctrl.assignTypeSave();
        expect(gridModel._called.hasGlSelections).toBe(true);
        expect(model._called.getSelGlsToAssgnTypeObj).toBe(true);
        expect(gridModel._called.getGlsSelected).toBe(true);
        expect(model._called.updateAccType).toBe(true);
        expect(model._called.then).toBe(true);
    });

    it('on assignTypeSave if there are no selections then do not assign types to unassigned types/categories', function () {
        gridModel._returnData.hasGlSelections = false;
        ctrl.assignTypeSave();
        expect(gridModel._called.hasGlSelections).toBe(true);
        expect(model._called.getSelGlsToAssgnTypeObj).toBe(undefined);
        expect(gridModel._called.getGlsSelected).toBe(undefined);
        expect(model._called.updateAccType).toBe(undefined);
    });

    it('on showUpdateAccTypeMessage show success message of updation and reload data', function () {
        ctrl.showUpdateAccTypeMessage();
        expect(errModel._called.showUpdateAccTypeMessage).toBe(true);
        expect(gridModel._called.load).toBe(true);
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
        expect(errModel._called.showDelGlsMessage).toBe(true);
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
