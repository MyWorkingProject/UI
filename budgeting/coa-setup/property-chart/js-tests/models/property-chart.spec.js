describe("property chart model, grid data", function () {
    var model, chartSVC, gridModel, chartConfig, appTranslate, notificationModel, grid;
    beforeEach(module("budgeting.coaSetup.propertyChart"));


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
        spy4._createMethods(['getPropertyChartError']);

        chartSVC = RealPage.spy();
        chartSVC._createMethods(['get', 'then', 'abort']);


        module(function ($provide) {
            $provide.value('rpGridModel', spy1);
            $provide.value('propertyChartListConfig', spy2);
            $provide.value('appLangTranslate', spy3);
            $provide.value('propertyChartNotification', spy4);
            $provide.value('propertyChartSvc', chartSVC);
            //$provide.service('propertyChartSvc', spy5);
        });

    });

    beforeEach(function () {
        function injector(a, b, c, d, e, f) {
            chartSVC = a;
            grid = b();
            chartConfig = c;
            appTranslate = d;
            notificationModel = e;
            model = f;
        }

        inject([
             'propertyChartSvc',
            'rpGridModel',
            'propertyChartListConfig',
            'appLangTranslate',
            'propertyChartNotification',
            'propertyChartModel',
            injector
        ]);

        //chartSVC.getPropertyChartList = function () {
        //};
    });

    it("init model, should subscribed to events and config", function () {
        expect(model.grid).not.toBe(undefined);
        expect(grid._called.subscribe).toBe(true);
        expect(grid._called.setConfig).toBe(true);
        expect(grid._callData.setConfig[0]).toBe(chartConfig);
        expect(grid._called.setEmptyMsg).toBe(true);
        //expect(grid._callData.setEmptyMsg[0]).toBe('No results were found.');
    });

    it("load model, should fetch the data and bind the data", function () {
        model.load();
        expect(grid._called.flushData).toBe(true);
        expect(grid._called.busy).toBe(true);
        expect(grid._callData.busy[0]).toBe(true);
        expect(chartSVC._called.abort).toBe(true);
        expect(chartSVC._called.get).toBe(true);
        expect(chartSVC._called.then).toBe(true);
        expect(chartSVC._callData.then[0]).toBe(model.setGridData);
    });

    it("paginate model, should fetch the data", function () {
        model.paginate();
        expect(grid._called.getQuery).toBe(true);
        expect(chartSVC._called.abort).toBe(true);
        expect(chartSVC._called.get).toBe(true);
    });

    it("set Grid Data model, bind the data to grid", function () {
        var response = { data: { ID: "1" } };
        model.setGridData(response);
        expect(grid._called.setData).toBe(true);
        expect(grid._callData.setData[0]).toBe(response.data);
        expect(grid._called.busy).toBe(true);
        //expect(grid._called.busy[0]).toBe(false);

    });

    it("add grid data  model, add the data to grid", function () {
        var response = { data: { ID: "1" } };
        model.addGridData(response);
        expect(grid._called.addData).toBe(true);
        expect(grid._callData.addData[0]).toBe(response.data);
    });


    it("set Grid Filter State model, add the data to grid", function () {
        var state = {  };
        model.setGridFilterState(state);
        expect(grid._called.setFilterState).toBe(true);
        expect(grid._callData.setFilterState[0]).toBe(state);

    });
});
