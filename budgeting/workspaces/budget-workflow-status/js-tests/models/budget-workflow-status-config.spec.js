describe("workflow status config model", function () {
    var model, gridConfigModel, gridConfig, appLangTranslate;
    beforeEach(module("budgeting.workspaces.budgetWorkflowStatus"));

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
        inject(['rpGridConfig', 'appLangTranslate', 'budgetWorkflowStatusConfig', injector]);

    });

    it("workflow status config get method should be defined", function () {
        var data = { id: 1 };
        var statusOption=true;
        var outPut = model.updateGridModel(data,statusOption);
        expect(outPut.get()).not.toBe(undefined);
        expect(typeof outPut.get).toBe('function');
        expect(outPut.get().length).toBe(6);
    });

    it("workflow status config get Header method should be defined", function () {
        var data = { id: 1 };
        var statusOption=true;
        var header = model.updateGridModel(data,statusOption);
        expect(header.getHeaders()).not.toBe(undefined);
        expect(typeof header.getHeaders).toBe('function');
        expect((header.getHeaders())[0].length).toBe(6);
    });

    it("workflow status config get Filters method should be defined when status is true", function () {
        var data = { id: 1 };
        var statusOption=true;
        var filter = model.updateGridModel(data,statusOption);
        expect(filter.getFilters()).not.toBe(undefined);
        expect(typeof filter.getFilters).toBe('function');
        expect(filter.getFilters().length).toBe(6);
    });

     it("workflow status config get Filters method should be defined when status is false", function () {
        var data = { id: 1 };
        var statusOption=false;
        var filter = model.updateGridModel(data,statusOption);
        expect(filter.getFilters()).not.toBe(undefined);
        expect(typeof filter.getFilters).toBe('function');
        expect(filter.getFilters().length).toBe(6);
    });    

});
