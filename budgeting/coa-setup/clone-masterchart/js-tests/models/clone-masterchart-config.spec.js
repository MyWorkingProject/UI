describe("clone chart config model", function () {
    var model, gridConfigModel, gridConfig, chartActionModel, appLangTranslate;
    beforeEach(module("budgeting.coaSetup.cloneMasterchart"));

    beforeEach(function () {
        gridConfigModel = RealPage.spy();
        gridConfigModel._createMethods(['getMethod']);
        var spy1 = function () {
            return gridConfigModel;
        };

        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var spy3 = RealPage.spy();
        spy3._createMethods(['get']);

        module(function ($provide) {
            $provide.value("rpGridConfig", spy1);
            $provide.value("appLangTranslate", spy2);
        });

        function injector(a, b, c) {
            gridConfig = a();
            appLangTranslate = b;
            model = c;
        }
        inject(['rpGridConfig', 'appLangTranslate', 'cloneMasterChartConfig', injector]);

    });

    it("clone chart config get method should be defined", function () {
        var outPut = model.get();
        expect(model.get).not.toBe(undefined);
        expect(typeof model.get).toBe('function');
        expect(outPut.length).toBe(5);
    });

    it("clone chart config get Header method should be defined", function () {
        var header = model.getHeaders();
        expect(model.getHeaders).not.toBe(undefined);
        expect(typeof model.getHeaders).toBe('function');
        expect(header[0].length).toBe(5);
    });

    it("clone chart config get Filters method should be defined", function () {
        var filter = model.getFilters();
        expect(model.getFilters).not.toBe(undefined);
        expect(typeof model.getFilters).toBe('function');
        expect(filter.length).toBe(3);
    });

});
