// Tests for Import Category Controller

describe('Import Category Controller', function () {
    var $scope, $controller, locationObj, stateParams, model, gridModel, viewSpecGrid, errModel, ctrl, $rootScope, getCtrl;

    beforeEach(module('budgeting.coaSetup.importCategory'));

    beforeEach(function () {

        var methods = [
            'setChartID',
            'setWizardVals',
            'reset',
            'srcChangeUpdate',
            'isValidSelectedProperty',
            'getCsvTemplate',
            'then'
        ];

        model = RealPage.spy();
        model._createMethods(methods);

        var errMethods = [
            'reset',
            'onFileNotFoundErr'
        ];

        errModel = RealPage.spy();
        errModel._createMethods(errMethods);

        var gridMethods = [
            'reset',
            'setGridReady',
            'loadAccountingCategories',
            'loadCSVFile',
            'deleteGls',
            'saveGlCategories',
            'saveGlAccountsCsv'
        ];

        gridModel = RealPage.spy();
        gridModel._createMethods(gridMethods);

        viewSpecGrid = RealPage.spy();
        viewSpecGrid._createMethods(['setGridData']);


        locationObj = RealPage.spy();
        locationObj._createMethods(['absUrl']);

        stateParams = {
            chartID: 1
        };

        module(function ($provide) {
            $provide.value('importCategoryModel', model);
            $provide.value('importCategoryGridModel', gridModel);
            $provide.value('ImportCategoryViewSpecModel', viewSpecGrid);
            $provide.value('ImportCategoryErrorModel', errModel);
            $provide.value('$stateParams', stateParams);
            $provide.value('$location', locationObj);
        });

        function injector(a, b) {
            $rootScope = a;
            $controller = b;

            $scope = $rootScope.$new();
        }

        inject(['$rootScope', '$controller', injector]);

        getCtrl = function () {
            return $controller('BdgtImportCategoryCtrl', {
                '$scope': $scope
            });
        };

        ctrl = getCtrl();

    });

    it('on init scope references to be assigned', function () {
        expect(stateParams.chartID).toBe(1);
        expect(ctrl.model).toBe(model);
        expect(model._called.setChartID).toBe(true);
        expect(model._called.setWizardVals).toBe(true);
        expect(locationObj._called.absUrl).toBe(true);
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

    it('on reset should reset the default data', function () {
        ctrl.reset();
        expect(model._called.reset).toBe(true);
        expect(errModel._called.reset).toBe(true);
        expect(gridModel._called.reset).toBe(true);
    });

    it('on loadNextDd should load next view either accounting dropdown/csv file upload', function () {
        ctrl.loadNextDd();
        expect(model._called.srcChangeUpdate).toBe(true);
    });

    it('on loadGlCategories should call service to get data for importing accouting categories', function () {
        model._returnData.isValidSelectedProperty = true;
        ctrl.loadGlCategories();
        expect(model._called.isValidSelectedProperty).toBe(true);
        expect(gridModel._called.setGridReady).toBe(undefined);
        expect(gridModel._called.loadAccountingCategories).toBe(undefined);

        model._returnData.isValidSelectedProperty = false;
        ctrl.loadGlCategories();
        expect(model._called.isValidSelectedProperty).toBe(true);
        expect(gridModel._called.setGridReady).toBe(true);
        expect(gridModel._called.loadAccountingCategories).toBe(true);
    });
    
    it('on loadCSVData should upload file and get data from service to grid', function () {
        ctrl.loadCSVData();
        expect(gridModel._called.setGridReady).toBe(true);
        expect(gridModel._called.loadCSVFile).toBe(true);
    });

    it('on dwnloadCsvTemplate should download data to csv template', function () {
        ctrl.dwnloadCsvTemplate();
        expect(model._called.getCsvTemplate).toBe(true);
        expect(model._called.then).toBe(true);
    });

    it('on delGlCat should delete gl categories', function () {
        ctrl.delGlCat();
        expect(gridModel._called.deleteGls).toBe(true);
    });

    it('on saveGlAccounts should save gl categories accounting', function () {
        ctrl.saveGlAccounts();
        expect(gridModel._called.saveGlCategories).toBe(true);
    });

    it('on saveGlAccountsCsv should save gl categories csv', function () {
        ctrl.saveGlAccountsCsv();
        expect(gridModel._called.saveGlAccountsCsv).toBe(true);
    });
});
