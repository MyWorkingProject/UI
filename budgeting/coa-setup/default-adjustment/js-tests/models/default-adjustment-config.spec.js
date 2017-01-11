describe("default adjustment config model", function () {
    var model, gridConfigModel, gridConfig, chartActionModel, appLangTranslate;
    beforeEach(module("budgeting.coaSetup.defaultAdjustment"));

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

     
        module(function ($provide) {
            $provide.value("rpGridConfig", spy1);
            $provide.value("appLangTranslate", spy2);
        });

        function injector(a, b, c) {
            gridConfig = a();
            appLangTranslate = b;
            model = c;
        }
        inject(['rpGridConfig', 'appLangTranslate', 'defaultAdjustmentConfig', injector]);

    });

    it("default adjustment config get method should be defined", function () {
        var data = { id: 1 };
        var outPut = model.updateGridModel(data);
        expect(outPut.get()).not.toBe(undefined);
        expect(typeof outPut.get).toBe('function');
        expect(outPut.get().length).toBe(4);
    });

    it("default adjustment config get Header method should be defined", function () {
        var data = { id: 1 };
        var header = model.updateGridModel(data);
        expect(header.getHeaders()).not.toBe(undefined);
        expect(typeof header.getHeaders).toBe('function');
        expect((header.getHeaders())[0].length).toBe(4);
    });

    it("default adjustment config get Filters method should be defined", function () {
        var data = { id: 1 };
        var filter = model.updateGridModel(data);
        expect(filter.getFilters()).not.toBe(undefined);
        expect(typeof filter.getFilters).toBe('function');
        expect(filter.getFilters().length).toBe(4);
    });
});
