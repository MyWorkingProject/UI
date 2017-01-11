describe("Default adjustment model", function () {
    beforeEach(module("budgeting.coaSetup.defaultAdjustment"));
    var appLangTranslate, defSVC, defBdgtModel, $filter, defAdjConfig, defErrModel, model;
    var $q, promise, $rootScope, gridModel, grid;

    beforeEach(function () {

        gridModel = RealPage.spy();
        gridModel._createMethods(['subscribe', 'setConfig', 'setEmptyMsg', 'busy', 'flushData', 'getQuery', 'setData', 'addData', 'setFilterState']);

        var spy1 = function () {
            return gridModel;
        };

        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var spy3 = RealPage.spy();
        spy3._createMethods(['getChartName', 'getAccTypes', 'abortGetCategoryData', 'getCategoryData', 'getBdgtModel',
            'saveDefPer', 'then']);

        var spy4 = RealPage.spy();
        spy4._createMethods(['updateDefModelYear', 'updateYearOptions', 'getModelNames', 'setDefaultModelSelection',
        'updateModelOptions', 'toggleBdgtModel', 'getToggleBgtModelState', 'reset', 'then']);

        var spy5 = RealPage.spy();
        spy5._createMethods(['updateGridModel']);

        var spy6 = RealPage.spy();
        spy6._createMethods(['onError']);

        module(function ($provide) {
            $provide.value('appLangTranslate', spy2);
            $provide.value('defaultAdjustmentList', spy3);
            $provide.value('defaultAdjustmentBdgtModel', spy4);
            $provide.value('defaultAdjustmentConfig', spy5);
            $provide.value('rpGridModel', spy1);
            $provide.value('defaultAdjustmentErrModel', spy6);
        });

        function injector(a, b, c, d, e, f, g, h, i, j) {
            appLangTranslate = a;
            defSVC = b;
            defBdgtModel = c;
            $filter = d;
            defAdjConfig = e;
            grid = f();
            defErrModel = g;
            model = h;
            $q = i;
            $rootScope = j;
        }

        inject(['appLangTranslate', 'defaultAdjustmentList', 'defaultAdjustmentBdgtModel', '$filter',
            'defaultAdjustmentConfig', 'rpGridModel', 'defaultAdjustmentErrModel', 'defaultAdjustmentModel', '$q', '$rootScope', injector]);

    });


    it("calling model set Grid Ready", function () {
        var data = {};
        model.setGridReady(data);
        expect(grid._called.setConfig).toBe(true);
        expect(defAdjConfig._called.updateGridModel).toBe(true);
        expect(grid._called.flushData).toBe(true);
        expect(grid._called.busy).toBe(true);
    });

    it("calling model update grid", function () {
        var data = {};
        model.setGridReady(data);
        model.updateGrid();
        expect(model.grid).not.toBe(undefined);
        expect(grid._called.subscribe).toBe(true);
        expect(grid._called.setEmptyMsg).toBe(true);
    });

    it("calling model load grid when service call is success", function () {

        var data = { records: { name: "Test Chart" }, status: 200 };

        model.setGridReady(data);

        /* var Defered = $q.defer();
         promise = Defered.promise;
 
         defSVC._returnData.getCategoryData = {
             $promise: promise
         };*/

        model.load();

        expect(defSVC._called.abortGetCategoryData).toBe(true);
        expect(defSVC._called.getCategoryData).toBe(true);
    });

    it("calling model paginate ", function () {

        var data = { records: { name: "Test Chart" }, status: 200 };

        model.setGridReady(data);
        var Defered = $q.defer();
        promise = Defered.promise;

        defSVC._returnData.getAccTypes = {
            $promise: promise
        };

        model.paginate();
        expect(grid._called.getQuery).toBe(true);
        expect(defSVC._called.getAccTypes).toBe(true);

    });

    it("calling model set GridData ", function () {

        var data = { records: { name: "Test Chart" }, status: 200 };
        model.setGridReady(data);
        var response = { data: { id: 1 } };
        model.setGridData(response);
        expect(grid._called.setData).toBe(true);
    });

    it("verifying selected bit", function () {
        var response = { records: [{ id: 1, selectedBit: true }] };
        model.setSelectColumn(response);
        expect(response.records[0].selectedBit).toBe(false);
    });

    it("verifying addition of data to grid ", function () {
        var data = { records: { name: "Test Chart" }, status: 200 };
        model.setGridReady(data);
        var response = { data: [{ id: 1, selectedBit: true }] };
        model.addGridData(response);
        expect(grid._called.addData).toBe(true);
        expect(grid._callData.addData[0]).toEqual(response.data);
    });

    it("verifying calling of budget model set BdgtModel when service is succes ", function () {
        var data = { records: { name: "Test Chart" }, status: 200 };
        model.setGridReady(data);
        var response = { data: [{ id: 1, selectedBit: true }] };
        var Defered = $q.defer();
        promise = Defered.promise;

        defSVC._returnData.getBdgtModel = {
            $promise: promise
        };
        model.setBdgtModel();
        Defered.resolve(data);
        $rootScope.$apply();
        expect(defSVC._called.getBdgtModel).toBe(true);
    });

    it("verifying calling of budget model set BdgtModel when service is failed ", function () {
        var data = { records: { name: "Test Chart" }, status: 200 };
        model.setGridReady(data);
        var response = { data: [{ id: 1, selectedBit: true }] };
        var Defered = $q.defer();
        promise = Defered.promise;

        defSVC._returnData.getBdgtModel = {
            $promise: promise
        };
        model.setBdgtModel();
        Defered.reject(data);
        $rootScope.$apply();
        expect(defSVC._called.getBdgtModel).toBe(true);
    });

    it("verifying calling of model work flow ", function () {
        var data = { records: { name: "Test Chart" }, status: 200 };
        model.loadModelWorkFlow(data);
        expect(defBdgtModel._called.getModelNames).toBe(true);
        expect(defBdgtModel._called.updateYearOptions).toBe(true);
        expect(defBdgtModel._called.updateDefModelYear).toBe(true);
        expect(defBdgtModel._callData.updateDefModelYear[0]).toEqual(data.records[0]);
    });

    it("verifying calling of model names ", function () {
        var data = { records: { name: "Test Chart" }, status: 200 };
        model.loadModelNames(data);
        expect(defBdgtModel._called.setDefaultModelSelection).toBe(true);
        expect(defBdgtModel._called.updateModelOptions).toBe(true);
        expect(defBdgtModel._callData.updateModelOptions[0]).toEqual(data);
    });

    it("verifying calling of model get data ", function () {
        var data = { records: { name: "Test Chart" }, status: 200 };
        model.setGridReady(data);
        model.updateGrid();
        model.grid.data = {};
        model.grid.data.records = data.records;
        var obj = model.getData();
        expect(obj).toEqual(model.grid.data.records);
    });

    it("verifying calling of model set chart id ", function () {
        model.setChartID(1);
        expect(model.formDefault.chartID).toEqual(1);
    });

    it("verifying calling of model get chart id ", function () {
        model.setChartID(1);
        var id = model.getChartID();
        expect(id).toEqual(1);
    });

    it("verifying calling of model toggle DefAdj Percent when work flow is open", function () {
        model.formDefault.toggleDefAdjState.state.open = true;
        model.toggleDefAdjPercent();
        expect(defBdgtModel._called.toggleBdgtModel).toBe(true);
        expect(defBdgtModel._callData.toggleBdgtModel[0]).toBe(false);
        expect(model.formDefault.toggleDefAdjState.state.open).toBe(false);
        expect(model.formDefault.adjPer).toEqual("");
    });

    it("verifying calling of model toggle DefAdj Percent when work flow is closed", function () {
        model.formDefault.toggleDefAdjState.state.open = false;
        model.toggleDefAdjPercent();
        expect(defBdgtModel._called.toggleBdgtModel).toBe(true);
        expect(defBdgtModel._callData.toggleBdgtModel[0]).toBe(false);
        expect(model.formDefault.toggleDefAdjState.state.open).toBe(true);
    });

    it("verifying calling of model work flow", function () {
        model.formDefault.toggleDefAdjState.state.open = false;
        var obj = model.isWorkFlowOpen();
        expect(obj).toEqual(model.formDefault.toggleDefAdjState.state.open);
    });

    it("verifying calling of model set AdjPer To Empty", function () {
        model.formDefault.adjPer = "Test";
        model.setAdjPerToEmpty();
        expect(model.formDefault.adjPer).toEqual("");
    });

    it("verifying calling of model toggle DefAdj Model", function () {
        model.toggleDefAdjModel();
        expect(model.formDefault.toggleDefAdjState.state.open).toBe(false);
        expect(defBdgtModel._called.toggleBdgtModel).toBe(true);
        expect(defBdgtModel._called.getToggleBgtModelState).toBe(true);
    });

    it("verifying calling of model update Chart Name", function () {
        model.updateChartName("Test");
        expect(model.formDefault.chartName).toEqual("Test");
    });

    it("verifying calling of update AccType Filter Options", function () {
        var opts = [{ id: 1, name: "Test" }];
        model.formDefault = {};
        model.formDefault.accTypeFiltrOptions = [{}];
        model.updateAccTypeFilterOptions(opts);
    });

    it("verifying show grid method", function () {
        model.formDefault = {};
        model.formDefault.showDataGrid = false;
        model.showHideGrid(true);
        expect(model.formDefault.showDataGrid).toBe(true);
    });

    it("verifying init page controls methods", function () {
        var data = { records: { name: "Test Chart" }, status: 200 };

        var Defered = $q.defer();
        promise = Defered.promise;

        defSVC._returnData.getChartName = {
            $promise: promise
        };

        model.initPageControls();
        expect(defSVC._called.getChartName).toBe(true);
    });

    it("verifying get AccTypes service", function () {
        var data = { records: { name: "Test Chart" }, status: 200 };

        var Defered = $q.defer();
        promise = Defered.promise;

        defSVC._returnData.getAccTypes = {
            $promise: promise
        };

        model.getAccTypes();
        expect(defSVC._called.getAccTypes).toBe(true);
    });

    it("verifying get getGrid Data", function () {

        model.getGridData();
        expect(defSVC._called.getCategoryData).toBe(true);
        expect(defSVC._called.abortGetCategoryData).toBe(true);
    });

    it("verifying get BdgtModel promise", function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        defSVC._returnData.getBdgtModel = {
            $promise: promise
        };
        var rtnPrms = model.getBdgtModel();
        expect(defSVC._called.getBdgtModel).toBe(true);
        expect(rtnPrms).toEqual(promise);
    });

    it("verifying get save DefAdjPer promise", function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        defSVC._returnData.saveDefPer = {
            $promise: promise
        };
        var data = {};
        var rtnPrms = model.saveDefAdjPer(data);
        expect(defSVC._called.saveDefPer).toBe(true);
        expect(rtnPrms).toEqual(promise);
    });

    it("verifying show ToolTip", function () {

        model.formDefault = {};
        model.formDefault.tooltipState = false;
        model.showToolTip();
        expect(model.formDefault.tooltipState).toBe(true);
    });

    it("verifying hide ToolTip", function () {

        model.formDefault = {};
        model.formDefault.tooltipState = true;
        model.hideToolTip();
        expect(model.formDefault.tooltipState).toBe(false);
    });

    it("verifying model reset", function () {

        model.reset();
        expect(defBdgtModel._called.reset).toBe(true);
    });

    it("verifying model get Acctype Options", function () {

        var outPut = model.getAcctypeOptions();
        expect(outPut).toEqual(model.formDefault.accTypeFiltrOptions);
    });

    it("verifying model get getAdjPer ", function () {

        var outPut = model.getAdjPer();
        expect(outPut).toEqual(model.formDefault.adjPer);
    });

    it("verifying model  getFilterObj when account type code is number", function () {
        var data = { records: [{ accountTypeCode: 4, value: 4, name: "Test" }], status: 200 };
        var filt = { accountTypeCode: 4, };
        model.formDefault.accTypeFiltrOptions = [{ value: 4 }];
        var outPut = model.getFilterObj(data, filt);
    });

    it("verifying model  getFilterObj when account type code is not a number", function () {
        var data = { records: [{ accountTypeCode: 0, value: 0 }], status: 200 };
        var filt = { accountTypeCode: undefined, };
        model.formDefault.accTypeFiltrOptions = [];
        var outPut = model.getFilterObj(data, filt);
    });


    it("verifying model get isValidSelection when  a record is selected", function () {
        var data = { records: [{ selectedBit: true, value: 0 }], status: 200 };
        var outPut = model.isValidSelection(data.records);
        expect(outPut).toBe(true);
    });

    it("verifying model get isValidSelection when  a record is not selected ", function () {
        var data = { records: [{ selectedBit: false, value: 0 }], status: 200 };
        var outPut = model.isValidSelection(data.records);
        expect(outPut).toBe(false);
    });

    it("verifying model  update PerValForItems ", function () {
        var data = { records: [{ selectedBit: true, value: 0, adjPercent: 0 }], status: 200 };
        model.updatePerValForItems(data.records);
        expect(data.records[0].selectedBit).toBe(true);
    });

    it("verifying model  isToolTip ", function () {
        model.formDefault.tooltipState = false;
        var outPut = model.isToolTip();
        expect(outPut).toBe(false);
    });

    it("verifying model  setToolTip ", function () {
        model.formDefault.tooltipState = false;
        model.setToolTip(true);
        expect(model.formDefault.tooltipState).toBe(true);
    });


});