// Tests for Budget Model Nav Model

describe('Budget Model Nav Model', function () {
    var breadcrumbs, model;

    beforeEach(module('budgeting.budgetmodel.base'));

    beforeEach(function () {

        breadcrumbs = RealPage.spy();
        breadcrumbs._createMethods(['updateCurrent']);

        module(function ($provide) {
            $provide.value('rpBreadcrumbsModel', breadcrumbs);
        });

    });

    beforeEach(inject(function (rpBreadcrumbsModel, BdgtModelDetails) {
        breadcrumbs = rpBreadcrumbsModel;
        model = BdgtModelDetails;
    }));

    it('on setModelID should set the modelID value', function () {
        model.setModelID(1);

        expect(model.form.modelID).toBe(1);
    });

    it('on getModelDetails should get model details data from service ', function () {
        model.getModelDetails(1);

        expect(model.form.modelDetails.title).toBe('Budget 2015');
    });

    it('on setModelDetails should set model details data ', function () {
        var resp = {
            title: "Budget 2015",
            propertyName: "Meadow Bay",
            year: "2015",
            type: "Budget - Conventional",
            workflow: {
                units: 9999,
                sqft: '200,000',
                level: 2
            }
        };
        model.setModelDetails(resp);

        expect(model.form.modelDetails.title).toBe('Budget 2015');
    });

    it('on setBreadCrumbs should set current step value in breadcrumb', function () {
        model.getModelDetails(1);
        model.setBreadCrumbs();

        expect(breadcrumbs._called.updateCurrent).toBe(true);
        expect(model.form.modelDetails.title).toBe('Budget 2015');
    });

    it('on setWorkflowLevel should set the level of workflow in model details', function () {
        model.getModelDetails(1);

        expect(model.form.modelDetails.workflow.level).toBe(2);

        model.setWorkflowLevel(1);
        expect(model.form.modelDetails.workflow.level).toBe(1);
    });

    it('on reset copy default data to form data', function () {
        model.emptyData = {
            modelID: 0
        };

        model.reset();

        expect(model.form.modelID).toBe(0);

    });
});

