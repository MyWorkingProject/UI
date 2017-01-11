// Tests for Import GL Account CSV Controller

describe('Import GL Account CSV Controller', function () {
    var $scope, $controller, stateParams, model, ctrl, $rootScope, getCtrl, errModel, gridModel, viewSpecGrid, timeout;

    beforeEach(module('budgeting.coaSetup.import'));

    beforeEach(function () {

        var methods = [
            'loadProperties',
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
            'getCsvTemplate',
            'getUploadedFile',
            'loadCSVFile',
            'updateToolTipState',
            'isHelpIconInfo',
            'setHelpIconInfo',
            'then'
        ];

        model = RealPage.spy();
        model._createMethods(methods);

        stateParams = {
            chartID: 1
        };


        var errModelMethods = [
            'reset',
            'getCsvTemplateError',
            'loadCSVFileError',
            'getFiltOptionsError',
            'delGlAccsError',
            'showDelGlsSuccMsg',
            'showSaveSuccessMessage',
            'saveGlAccsError'
        ];

        errModel = RealPage.spy();
        errModel._createMethods(errModelMethods);

        var gridModelMethods = [
            'setChartID',
            'reset',
            'setGridReady',
            'updateGrid',
            'load',
            'hasGlSelections',
            'deleteGls',
            'then'
        ];

        gridModel = RealPage.spy();
        gridModel._createMethods(gridModelMethods);

        viewSpecGrid = RealPage.spy();
        viewSpecGrid._createMethods(['setGridData']);

        module(function ($provide) {
            $provide.value('importGlAccModel', model);
            $provide.value('importGlAccMsgModel', errModel);
            $provide.value('importGlGridModel', gridModel);
            $provide.value('ImportViewSpecModel', viewSpecGrid);
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
            return $controller('BdgtImprtGlCsv', {
                '$scope': $scope
            });
        };

        ctrl = getCtrl();

    });

    it('on init intialize the references', function () {
        expect(stateParams.chartID).toBe(1);
        expect(gridModel._called.setChartID).toBe(true);
        expect(ctrl.model).toBe(model);
        expect(viewSpecGrid._called.setGridData).toBe(true);
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

    it('on dwnloadCsvTemplate call service to get csv template document', function () {
        ctrl.dwnloadCsvTemplate();
        expect(model._called.getCsvTemplate).toBe(true);
        expect(model._called.then).toBe(true);
    });

    it('on loadCSVData call service to send file uploaded to verify data', function () {
        ctrl.loadCSVData();
        expect(model._called.loadCSVFile).toBe(true);
        expect(model._called.getUploadedFile).toBe(true);
        expect(model._called.then).toBe(true);
    });

    it('on loadAccsGrid call service to get filter options for account types', function () {
        ctrl.loadAccsGrid();
        expect(model._called.getFiltOptions).toBe(true);
        expect(model._called.then).toBe(true);
    });

    it('on setGridReady to set grid ready and load csv uploaded data', function () {
        ctrl.setGridReady();
        expect(model._called.updateFilters).toBe(true);
        expect(gridModel._called.setGridReady).toBe(true);
        expect(gridModel._called.updateGrid).toBe(true);
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

    it('on showDelMessage show success notification for deletion of gls', function () {
        ctrl.showDelMessage();
        expect(errModel._called.showDelGlsSuccMsg).toBe(true);
        expect(gridModel._called.load).toBe(true);
    });

    it('on saveGlAccounts save gl accounts uploaded through csv', function () {
        ctrl.saveGlAccounts();
        expect(model._called.saveGlAccs).toBe(true);
        expect(model._called.then).toBe(true);
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

    //it('on downloadDoc create an element in dom and attach click event to it', function () {
    //    var hiddenElement = "<a></a>";
    //    ctrl.downloadDoc();
    //});
});
