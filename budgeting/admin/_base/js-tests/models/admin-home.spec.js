// Test for administration home model

describe('Administration Home Model', function () {
    var model, translator, text;

    beforeEach(module('budgeting.admin.base'));

    beforeEach(function () {
        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appTranslate.name = name;
            return appTranslate;
        };

        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
        });
    });

    beforeEach(inject(function (appLangTranslate, adminModel) {
        translator = appLangTranslate;
        model = adminModel;
    }));

    it('value of model.text should be having adminNav object', function () {
        var translate = translator('admin');
        expect(translate.name).toBe('admin');
        expect(translate._called.translate).toBe(true);
        expect(translate._callData.translate[0]).toBe('bdgt_admin_links_link_desc_corporate_budget');
    });
});
