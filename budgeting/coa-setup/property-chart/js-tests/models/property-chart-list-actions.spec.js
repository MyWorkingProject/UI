describe("property chart list actions model", function () {
    beforeEach(module("budgeting.coaSetup.propertyChart"));
    var ctrl, getCtrl, gridActnModel, model, appLangTranslate;

    beforeEach(function () {

        gridActnModel = RealPage.spy();
        gridActnModel._createMethods(['getMethod']);

        var spy1 = function () {
            return gridActnModel;
        };

        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        module(function ($provide) {
            $provide.value('rpGridActions', spy1);
            $provide.value("appLangTranslate", spy2);
        });

        function injector(a,b,c) {
            gridActnModel = a();
            model = b;
            appLangTranslate = c;
        }

        inject(['rpGridActions', 'propertyChartListActions', 'appLangTranslate', injector]);

    });

    it("model should have get method defined", function () {
        expect(model.get).not.toBe(undefined);
        expect(typeof model.get).toBe('function');
    });

    it("verifying model get method should return action model", function () {
        var record = { id: '1' };
        var actionModel = model.get(record);
        expect(actionModel.className).toBe('rp-actions-menu-1');
        expect(actionModel.actions.length).toBe(2);
    });

});
