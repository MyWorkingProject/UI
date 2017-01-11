// Import Gl Account View Specification Grid Configuaration

describe("Import Gl Account View Specification grid config model", function () {
    var model, gridConfigModel, gridConfig;
    beforeEach(module("budgeting.coaSetup.import"));

    beforeEach(function () {
        gridConfigModel = RealPage.spy();
        gridConfigModel._createMethods(['getMethod']);
        var spy1 = function () {
            return gridConfigModel;
        };

        module(function ($provide) {
            $provide.value("rpGridConfig", spy1);
        });

        function injector(a, b) {
            gridConfig = a();
            model = b;
        }
        inject(['rpGridConfig', 'viewImportSpecGridConfig', injector]);

    });

    it("CSV View Specification grid config get method should be defined", function () {
        var outPut = model.get();
        expect(model.get).not.toBe(undefined);
        expect(typeof model.get).toBe('function');
        expect(outPut.length).toBe(2);
    });

    it("CSV View Specification grid config getHeader method should be defined", function () {
        var header = model.getHeaders();
        expect(model.getHeaders).not.toBe(undefined);
        expect(typeof model.getHeaders).toBe('function');
        expect(header[0].length).toBe(2);
    });

});
