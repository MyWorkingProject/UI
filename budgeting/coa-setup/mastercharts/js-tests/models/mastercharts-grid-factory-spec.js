describe("Master chart model, grid data", function () {
    var model, chartSVC, gridModel, chartConfig, appTranslate, notificationModel, grid;
    beforeEach(module("budgeting.coaSetup.mastercharts"));


    beforeEach(function () {
        gridModel = RealPage.spy();
        gridModel._createMethods(['subscribe', 'setConfig', 'setEmptyMsg', 'busy', 'flushData', 'getQuery', 'setData', 'addData', 'setFilterState']);


        var spy1 = function () {
            return gridModel;
        };

        var spy2 = RealPage.spy();

        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy3 = function (name) {
            appTranslate.name = name;
            return appTranslate;
        };

        var spy4 = RealPage.spy();
        spy4._createMethods(['showSuccessNotification', 'showErrorNotification']);

        chartSVC = RealPage.spy();
        chartSVC._createMethods(['getMasterchartList', 'success']);


        module(function ($provide) {
            $provide.value('masterChartsListSvc', chartSVC);
            $provide.value('rpGridModel', spy1);
            $provide.value('masterchartListConfig', spy2);
            $provide.value('masterchartNotifications', spy4);
            $provide.value('appLangTranslate', spy3);

        });

    });

    beforeEach(function () {
        function injector(a, b, c, d, e, f) {
            chartSVC = a;
            grid = b();
            chartConfig = c;
            notificationModel = d;
            appTranslate = e;
            model = f;
        }

        inject([
             'masterChartsListSvc',
            'rpGridModel',
            'masterchartListConfig',
            'masterchartNotifications',
            'appLangTranslate',
            'masterchartGridFactory',
            injector
        ]);


    });

    it("init model, should subscribed to events and config", function () {
        expect(model.grid).not.toBe(undefined);
        expect(grid._called.subscribe).toBe(true);
        expect(grid._called.setConfig).toBe(true);
        expect(grid._callData.setConfig[0]).toBe(chartConfig);
        expect(grid._called.setEmptyMsg).toBe(true);
    });

    it("load model, should fetch the data and bind the data", function () {

        model.load();
        expect(grid._called.flushData).toBe(true);
        expect(grid._called.busy).toBe(true);
        expect(grid._callData.busy[0]).toBe(true);
        expect(chartSVC._called.getMasterchartList).toBe(true);
    });

    it("paginate model, should fetch the dataa", function () {
        model.paginate();
        expect(grid._called.getQuery).toBe(true);
    });

    it("set Grid Data model, bind the data to grid", function () {
        var response = { ID: "1" };
        model.setGridData(response);
        expect(grid._called.setData).toBe(true);
        expect(grid._callData.busy[0]).toBe(false);
    });

    it("add grid data  model, add the data to grid", function () {
        var response = { ID: "1" };
        model.addGridData(response);
        expect(grid._called.addData).toBe(true);
    });


    it("set Grid Filter State model, add the data to grid", function () {
        var state = { ID: "1" };
        model.setGridFilterState(state);
        expect(grid._called.setFilterState).toBe(true);
    });

    it('onLoadListError method calls when service throws error', function () {
        var resp = { status: 404 };
        model.onLoadListError(resp);
        expect(notificationModel._called.showErrorNotification).toBe(true);
    });


    it('onLoadListError method calls when service throws error', function () {
        var resp = { status: 504 };
        model.onLoadListError(resp);
    });
});
