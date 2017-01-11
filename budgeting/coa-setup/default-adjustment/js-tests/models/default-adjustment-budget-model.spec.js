describe("Default adjustment Budget", function () {
    beforeEach(module("budgeting.coaSetup.defaultAdjustment"));
    var appLangTranslate, defSVC, model;
    var $q, promise, $rootScope;

    beforeEach(function () {


        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var spy3 = RealPage.spy();
        spy3._createMethods(['getModels', 'applyBdgtmodel', 'abortGetCategoryData', 'getCategoryData', 'getBdgtModel',
            'saveDefPer', 'then', '$promise']);


        module(function ($provide) {
            $provide.value('appLangTranslate', spy2);
            $provide.value('defaultAdjustmentList', spy3);
        });

        function injector(a, b, c, d, e) {
            appLangTranslate = a;
            defSVC = b;
            model = c;
            $q = d;
            $rootScope = e;
        }

        inject(['appLangTranslate', 'defaultAdjustmentList', 'defaultAdjustmentBdgtModel', '$q', '$rootScope', injector]);

    });


    it("calling model toggle budget model", function () {
        model.form.toggleDefAdjModelState.state.open = false;
        model.toggleBdgtModel(true);
        expect(model.form.toggleDefAdjModelState.state.open).toBe(true);
    });

    it("verifying return of toggle budget model state", function () {
        model.form.toggleDefAdjModelState.state.open = false;
        var outPut= model.getToggleBgtModelState();
        expect(outPut).toBe(false);
    });

    it("verifying update of Def Model Year", function () {
        var year = { budgetYearValue: 2016 };
        model.updateDefModelYear(year);
        expect(model.form.defBdgtYear).toEqual(year.budgetYearValue);
    });

    it("verifying get Model Names", function () {
        model.form.defBdgtYear = 2015;
        model.form.defModelType = "Budget";
        var params = {
            year: model.form.defBdgtYear,
            type: model.form.defModelType
        };
        model.getModelNames();
        expect(defSVC._called.getModels).toBe(true);
        expect(defSVC._callData.getModels[0]).toEqual(params);
    });

    it("verifying apply Bdgt Model", function () {
        var year = { budgetYearValue: 2016 };
        model.applyBdgtModel(1);
        expect(defSVC._called.applyBdgtmodel).toBe(true);
    });

    it("verifying return of Bdgt Model Data", function () {
        var id=1;
        model.form.defBdgtYear = 2016;
        model.form.defModelType = "Budget";
        model.form.adjPerModel = "10";
        model.form.defChkOverWrite = true;
        var returnData = {
            "masterChartID": id,
            "budgetYear": model.form.defBdgtYear,
            "budgetType": model.form.defModelType,
            "budgetModelID": model.form.adjPerModel,
            "isOverWrite": model.form.defChkOverWrite
        };
        var outPut = model.getBdgtModelData(id);
        expect(outPut).toEqual(returnData);
    });

    it("verifying update Year Options", function () {
        var data = { id: 1 };
        model.updateYearOptions(data);
        expect(model.form.adjPerYearSrc.options).toEqual(data);
    });

    it("should set default model selection to 0", function () {
        model.setDefaultModelSelection();
        expect(model.form.adjPerModel).toEqual(0);
    });

    it("should update Model Options", function () {
        var data = { records: [{ budgetModelID: 1, budgetModelName: "Test" }] };
        var optnData = {
            "budgetModelID": 0,
            "budgetModelName": "All"
        };
        model.updateModelOptions(data);
        expect(model.form.adjPerModelSrc.options[1]).toEqual(optnData);
        expect(model.form.adjPerModelSrc.options[0]).toEqual(data.records[0]);
    });

    it("should set Chk OverWrite", function () {
        model.form.defChkOverWrite = false;
        model.updateChkOverWrite(true);
        expect(model.form.defChkOverWrite).toBe(true);
    });

    it("should toggle the value for tooltip", function () {
        model.form.infoToolTip = false;
        model.showModelHelpInfo();
        expect(model.form.infoToolTip).toBe(true);
    });

    it("should return the value of tooltip", function () {
        model.form.infoToolTip = false;
        var outPut = model.isHelpIconInfo();
        expect(outPut).toEqual(model.form.infoToolTip);
    });

    it("should set the value of tooltip", function () {
        model.form.infoToolTip = false;
        model.setHelpIconInfo(true);
        expect(model.form.infoToolTip).toEqual(true);
    });

    it("verification of reset method", function () {
        model.emptyData = { id: 1 };
        model.form = {};
        model.reset();
        expect(model.emptyData).toEqual(model.form);
    });
});