// Import Gl Account L&R Grid Configuaration

describe("Import Gl Account L&R grid config model", function () {
    var model, gridConfigModel, gridConfig, appLangTranslate;
    beforeEach(module("budgeting.coaSetup.import"));

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
        inject(['rpGridConfig', 'appLangTranslate', 'importGlLrGrid', injector]);

    });

    it('on updateLRGridModel to set columns,filters and headers of a grid', function () {

        var obj = model.updateLRGridModel();
        expect(typeof obj.get).toBe('function');
        expect(typeof obj.getHeaders).toBe('function');
        expect(typeof obj.getFilters).toBe('function');

        var getRtrn = obj.get();
        expect(getRtrn.length).toBe(4);

        var getHeadersRtrn = obj.getHeaders();
        expect(getHeadersRtrn[0].length).toBe(4);

        var getFiltersRtrn = obj.getFilters();
        expect(getFiltersRtrn.length).toBe(3);
    });
});
