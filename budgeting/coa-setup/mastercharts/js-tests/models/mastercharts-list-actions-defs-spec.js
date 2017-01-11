// Roles List Actions Model Tests

describe('mastercharts List Actions Model', function () {
    var model, gridActions, appLangTranslate;

    beforeEach(module('budgeting.coaSetup.mastercharts'));

    beforeEach(function () {
        var gridActionsModel = RealPage.spy();
        gridActionsModel._createMethods(['getMethod']);

        var spy1 = function () {
            return gridActionsModel;
        };

        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };


        module(function ($provide) {
            $provide.value('rpGridActions', spy1);
            $provide.value('appLangTranslate', spy2);
        });
    });

    beforeEach(function () {
        function injector(a, b,c) {
            gridActions = a();
            model = b;
            appLangTranslate = c;
        }

        inject(['rpGridActions', 'masterchartListActionsDef', 'appLangTranslate', injector]);
    });

    it('should have get method defined', function () {
        expect(model.get).not.toBe(undefined);
        expect(typeof model.get).toBe('function');
    });

    it('get method should return actionsModel', function () {
        var record = { masterChartID: 1 },
       actionsModel = model.get(record);

        expect(actionsModel.className).toBe('rp-actions-menu-1');
        expect(actionsModel.actions.length).toBe(7);


    });
});

