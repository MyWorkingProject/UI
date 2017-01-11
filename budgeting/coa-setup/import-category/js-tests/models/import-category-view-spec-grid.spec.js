// Tests for view spec grid model

describe('Import Category view spec gird model', function () {
    var translator, gridModel, gridConfig, model;

    beforeEach(module('budgeting.coaSetup.importCategory'));

    beforeEach(function () {
        gridModel = RealPage.spy();
        gridModel._createMethods(['subscribe', 'setConfig', 'setEmptyMsg', 'busy', 'flushData', 'getQuery', 'setData', 'addData', 'setFilterState', 'getSelectionChanges', 'hasSelectionChanges']);


        var spy2 = function () {
            return gridModel;
        };

        module(function ($provide) {
            $provide.value('rpGridModel', spy2);
            $provide.value('viewSpecGridConfig', gridConfig);
        });

    });

    beforeEach(inject(function (rpGridModel, viewSpecGridConfig, ImportCategoryViewSpecModel) {
        gridModel = rpGridModel();
        gridConfig = viewSpecGridConfig;
        model = ImportCategoryViewSpecModel;
    }));

    it('on setGridData to set data to the grid', function () {
        model.setGridData();

        expect(model.grid).not.toBe(undefined);
        expect(gridModel._called.busy).toBe(true);
        expect(gridModel._called.flushData).toBe(true);
        expect(gridModel._called.setData).toBe(true);
    });

});

