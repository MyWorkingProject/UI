// Tests for Import GL Account L&R Controller

describe('Import GL Account L&R Controller', function () {
    var $scope, $controller, stateParams, model, ctrl, $rootScope, getCtrl, errModel, gridModel, timeout;

    beforeEach(module('budgeting.coaSetup.import'));

    beforeEach(function () {

        var mocks = {
            'rp': ['appLangTranslate']
        };

        RealPage.ngMocks.install(mocks);

        var methods = [
            'loadCharts',
            'setChartOptions',
            'getSelectedPropertyIDForm',
            'hideLoadBtn',
            'showLoadBtn',
            'updateToolTipState',
            'isHelpIconInfo',
            'setHelpIconInfo',
            'reset',
            'then'
        ];

        model = RealPage.spy();
        model._createMethods(methods);

        var errMethods = [
            'getChartsError',
            'reset'
        ];


        errModel = RealPage.spy();
        errModel._createMethods(errMethods);

        var gridModelMethods = [
            'setChartID',
            'setGridReady',
            'updateGrid',
            'load',
            'hasPropsSelections',
            'saveLrGlAccs',
            'refreshGrid',
            'reset',
            'then'
        ];

        gridModel = RealPage.spy();
        gridModel._createMethods(gridModelMethods);

        stateParams = {
            chartID: 1
        };

        module(function ($provide) {
            $provide.value('importGlLrModel', model);
            $provide.value('importGlAccMsgModel', errModel);
            $provide.value('importGlLRGridModel', gridModel);
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
            return $controller('BdgtImprtGlLr', { '$scope': $scope });
        };

        ctrl = getCtrl();

    });
    
    it('on init set references and get charts of L&R', function () {
        expect(stateParams.chartID).toBe(1);
        expect(gridModel._called.setChartID).toBe(true);
        expect(ctrl.model).toBe(model);
        expect(model._called.loadCharts).toBe(true);
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

    it('on no chart change hide load button', function () {
        model._returnData.getSelectedPropertyIDForm = true;
        ctrl.chartSelect();
        expect(model._called.getSelectedPropertyIDForm).toBe(true);
        expect(model._called.hideLoadBtn).toBe(true);
        expect(model._called.showLoadBtn).toBe(undefined);
    });

    it('on chart change show load button', function () {
        model._returnData.getSelectedPropertyIDForm = false;
        ctrl.chartSelect();
        expect(model._called.getSelectedPropertyIDForm).toBe(true);
        expect(model._called.showLoadBtn).toBe(true);
        expect(model._called.hideLoadBtn).toBe(undefined);
    });

    it('on loadLRProps get properties and then setup grid', function () {
        ctrl.loadLRProps();
        expect(gridModel._called.setGridReady).toBe(true);
        expect(gridModel._called.updateGrid).toBe(true);
        expect(gridModel._called.load).toBe(true);
    });

    it('on saveLRGlAccounts not to save gls as no property selected', function () {
        gridModel._returnData.hasPropsSelections = false;
        ctrl.saveLRGlAccounts();
        expect(gridModel._called.hasPropsSelections).toBe(true);
        expect(model._called.updateToolTipState).toBe(true);
        expect(gridModel._called.saveLrGlAccs).toBe(undefined);
        timeout.flush();
    });

    it('on saveLRGlAccounts to save gls from selected properties', function () {
        gridModel._returnData.hasPropsSelections = true;
        ctrl.saveLRGlAccounts();
        expect(gridModel._called.hasPropsSelections).toBe(true);
        expect(model._called.updateToolTipState).toBe(undefined);
        expect(gridModel._called.saveLrGlAccs).toBe(true);
    });

    it('on refreshLRData to refresh grid for selected properties', function () {
        ctrl.refreshLRData();
        expect(gridModel._called.refreshGrid).toBe(true);
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
