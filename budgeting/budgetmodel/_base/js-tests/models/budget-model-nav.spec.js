// Tests for Budget Model Nav Model

describe('Budget Model Nav Model', function () {
    var model, rootScope;

    beforeEach(module('budgeting.budgetmodel.base'));

    beforeEach(inject(function ($rootScope, BdgtModelNav) {
        rootScope = $rootScope;
        model = BdgtModelNav;
    }));

    it('on data get nav data for scrolling tabs', function () {
        var val = model.data();
        expect(val[0].text).toBe("Overview");
        expect(val.length).toBe(7);
    });

    it('on setState to set active tab of the scrolling tabs', function () {
        model.setState('#/budgetmodel/:modelID/overview');

        expect(model._data[0].isActive).toBe(true);
    });

    it('on setModelID should set the modelID value', function () {
        model.setModelID(1);

        expect(model.form.modelID).toBe(1);
    });

    it('on setNavUrls should update model data href links', function () {
        model.setModelID(1);

        expect(model.form.modelID).toBe(1);

        model.setNavUrls();

        expect(model._data[0].href).not.toBe('#/budgetmodel/:modelID/overview');
        expect(model._data[0].href).toBe('#/budgetmodel/1/overview');
    });

    it('on reset copy default data to form data', function () {
        model.emptyData = {
            modelID: 0
        };

        model.reset();

        expect(model.form.modelID).toBe(0);

    });
});

