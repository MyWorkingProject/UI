// Roles List Actions Model Tests

describe('Masterchart List Model', function () {
    var model, appLangTranslate;

    beforeEach(module('budgeting.coaSetup.mastercharts'));

    beforeEach(function () {
        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
        });
    });

    beforeEach(function () {
        function injector(a) {
            model = a;
        }

        inject(['masterChartsListModel', injector]);
    });

    it('updateMenuFlag method will call to update flag info in model', function () {
        model.updateMenuFlag(true);
        expect(model.form.isMenuOn).toBe(true);
    });

    it('showTab method will call to update flag info for master chart in model', function () {
        model.form = {
            mastercharts: { isActive: true },
            propertychart: { isActive: false },
            accountmapping: { isActive: false }
        };
        model.showTab();
        expect(model.includePage).toBe('');
    });


    it('showTab method will call to update flag info for property chart in model', function () {
        model.form = {
            mastercharts: { isActive: false },
            propertychart: { isActive: true },
            accountmapping: { isActive: false }
        };
        model.showTab();
        expect(model.includePage).toBe('coa-setup/property-chart/index.html');

    });

    it('showTab method will call to update flag info for accountMapping in model', function () {
        model.form = {
            mastercharts: { isActive: false },
            propertychart: { isActive: false },
            accountmapping: { isActive: true }
        };
        model.showTab();
        expect(model.includePage).toBe('coa-setup/accountMapping.html');

    });

    it('showPropertyTab function calls showtab based on isPropertyChart', function () {
        model.form = {
            mastercharts: { isActive: false },
            propertychart: { isActive: true },
            accountmapping: { isActive: false }
        };
        model.showPropertyTab();
        model.showTab();
        expect(model.includePage).toBe('coa-setup/property-chart/index.html');

    });

    it('showPropertyTab function calls showtab based on isPropertyChart for else block', function () {
        model.form = {
            mastercharts: { isActive: false },
            propertychart: { isActive: false },
            accountmapping: { isActive: false }
        };
        model.showPropertyTab();
        model.showTab();
        expect(model.includePage).toBe('');

    });

    it('showMasterChartTab function calls showtab based on isMasterCharts', function () {
        model.form = {
            mastercharts: { isActive: true },
            propertychart: { isActive: false },
            accountmapping: { isActive: false }
        };
        model.showMasterChartTab();
        model.showTab();
        expect(model.includePage).toBe('');

    });

    it('showMasterChartTab function calls showtab based on isMasterCharts for else block', function () {
        model.form = {
            mastercharts: { isActive: false },
            propertychart: { isActive: false },
            accountmapping: { isActive: false }
        };
        model.showMasterChartTab();
        model.showTab();
        expect(model.includePage).toBe('');

    });

    it('showAccountmappingTab function calls showtab based on isAccountMapping ', function () {
        model.form = {
            mastercharts: { isActive: false },
            propertychart: { isActive: false },
            accountmapping: { isActive: true }
        };
        model.showAccountmappingTab();
        model.showTab();
        expect(model.includePage).toBe('coa-setup/accountMapping.html');

    });

    it('showAccountmappingTab function calls showtab based on isAccountMapping for else block', function () {
        model.form = {
            mastercharts: { isActive: false },
            propertychart: { isActive: false },
            accountmapping: { isActive: false }
        };
        model.showAccountmappingTab();
        model.showTab();
        expect(model.includePage).toBe('');
    });

    it('isMenuOn function in model returns menu status', function () {
        model.form = {
            isMenuOn: true
        };
        model.isMenuOn();
        expect(model.form.isMenuOn).toBe(true);
    });

    it("reset() should reset all data back to default values", function () {
        var state = { propertyChartPage: "" };

        model.form.propertyChartPage = state;
        expect(model.form.propertyChartPage).toBe(state);

        model.reset();
        expect(model.form.propertyChartPage).toEqual('');
    });


});

