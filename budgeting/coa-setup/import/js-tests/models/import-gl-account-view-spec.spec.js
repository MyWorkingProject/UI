// Tests for view spec grid model

describe('Import GL Account csv view spec gird model', function () {
    var translator, gridModel, gridConfig, model;

    beforeEach(module('budgeting.coaSetup.import'));

    beforeEach(function () {

        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appTranslate.name = name;
            return appTranslate;
        };

        gridModel = RealPage.spy();
        gridModel._createMethods(['subscribe', 'setConfig', 'setEmptyMsg', 'busy', 'flushData', 'getQuery', 'setData', 'addData', 'setFilterState', 'getSelectionChanges', 'hasSelectionChanges']);


        var spy2 = function () {
            return gridModel;
        };

        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('rpGridModel', spy2);
            $provide.value('viewImportSpecGridConfig', gridConfig);
        });

    });

    beforeEach(inject(function (appLangTranslate, rpGridModel, viewImportSpecGridConfig, ImportViewSpecModel) {
        translator = appLangTranslate;
        gridModel = rpGridModel();
        gridConfig = viewImportSpecGridConfig;
        model = ImportViewSpecModel;
    }));

    it('on setGridData to set data to the grid', function () {
        model.setGridData();

        expect(model.grid).not.toBe(undefined);
        expect(gridModel._called.busy).toBe(true);
        expect(gridModel._called.flushData).toBe(true);
        expect(gridModel._called.setData).toBe(true);
    });

});

