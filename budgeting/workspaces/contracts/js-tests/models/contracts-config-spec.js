// Roles List Actions Model Tests

describe('Contracts Config Model', function () {
    var model, gridConfig, appLangTranslate;

    beforeEach(module('budgeting.workspaces.contracts'));

    beforeEach(function () {
        var gridConfigModel = RealPage.spy();
        gridConfigModel._createMethods(['getMethod']);

        var spy1 = function () {
            return gridConfigModel;
        };

     

        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy3 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        module(function ($provide) {
            $provide.value('rpGridConfig', spy1);        
            $provide.value('appLangTranslate', spy3);
        });
    });

    beforeEach(function () {
        function injector(a, b) {
            model = a;
            gridConfig = b();
        }

        inject(['contractsConfig', 'rpGridConfig', injector]);
    });

    it('should have get method defined', function () {
        var out = model.get();
        expect(model.get).not.toBe(undefined);
        expect(typeof model.get).toBe('function');
        expect(out.length).toBe(8);
    });

    it('should have getHeaders method defined', function () {
        var headers = model.getHeaders();
        expect(model.getHeaders).not.toBe(undefined);
        expect(typeof model.getHeaders).toBe('function');
        expect(headers.length).toBe(1);
        expect(headers[0].length).toBe(8);
    });

    it('should have getFilters method defined', function () {
        var filters = model.getFilters();
        expect(model.getFilters).not.toBe(undefined);
        expect(typeof model.getFilters).toBe('function');
        expect(filters.length).toBe(5);
    });
});

