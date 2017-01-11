describe("Edit master chart model", function () {
    beforeEach(module("budgeting.coaSetup.editMasterchart"));
    var chartSVC, model;
    var $q, promise, $rootScope;


    beforeEach(function () {

        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var spy3 = RealPage.spy();
        spy3._createMethods(['getMasterChartData']);



        module(function ($provide) {
            $provide.value('appLangTranslate', spy2);
            $provide.value('newMasterchartSVC', spy3);
        });

        function injector(a, b, c, d, e) {
            chartSVC = a;
            model = b;
            $q = c;
            $rootScope = d;
            appLangTranslate = e;
        }

        inject(['newMasterchartSVC', 'editMasterChartModel', '$q', '$rootScope', 'appLangTranslate', injector]);


    });


    it("calling model get Src Page and verifying the return data", function () {
        model.srcPage = "Test.html";
        var outPut = model.getSrcPage();
        expect(outPut).toEqual(model.srcPage);
    });

    it("calling model reset Tab and verifying the set data", function () {
         model.resetTab();
         expect(model.glAccounts.isActive).toBe(true);
         expect(model.category.isActive).toBe(false);
         expect(model.cloneChart.isActive).toBe(false);
         expect(model.includePage).toEqual("");
    });

    it("calling model get GlAccount Page and verifying the returnd data", function () {
        model.glAccountPage = "Test.html";
        var outPut = model.getGlAccountPage();
        expect(outPut).toEqual(model.glAccountPage);
    });

    it("calling model get DefaultTabMenu  and verifying the returnd data", function () {
        model.tabsMenu = [{ id: "1" }, { id: "2" }];
        var outPut = model.getDefaultTabMenu();
        expect(outPut).toEqual(model.tabsMenu);
    });

    it("calling model get MasterchartMenuData when service is success", function () {
        var Defered = $q.defer();
        var promise = Defered.promise;

        chartSVC._returnData.getMasterChartData = {
            $promise: promise
        };

        var data = { records: [{ isAlternativeCOA: true }] };
        model.getMasterchartMenuData(1);
        Defered.resolve(data);
        $rootScope.$apply();
    });

    it("calling model set TabsMenu  when alternative is true", function () {
        var data = { records: [{ isAlternativeCOA: true }] };
        model.setTabsMenu(data);
        expect(model.glAccounts.isActive).toBe(true);
        expect(model.category.isActive).toBe(false);
        expect(model.cloneChart.isActive).toBe(false);
        expect(model.tabsMenu.length).toEqual(2);
    });

    it("calling model set TabsMenu  when alternative is false", function () {
        var data = { records: [{ isAlternativeCOA: false }] };
        model.setTabsMenu(data);
        expect(model.glAccounts.isActive).toBe(true);
        expect(model.category.isActive).toBe(false);
        expect(model.cloneChart.isActive).toBe(false);
        expect(model.tabsMenu.length).toEqual(3);
    });
    
    it("calling model show Tab  when glaccount is active", function () {
        model.glAccounts.isActive = true;
        model.category.isActive = false;
        model.cloneChart.isActive = false;
        model.showTab();
        expect(model.includePage).toEqual("coa-setup/manage-gl-account/index.html");
    });

    it("calling model show Tab  when category is active", function () {
        model.category.isActive = true;
        model.glAccounts.isActive = false;
        model.cloneChart.isActive = false;
        model.showTab();
        expect(model.includePage).toEqual("coa-setup/categories/index.html");
    });

    it("calling model show Tab  when category is active", function () {
        model.cloneChart.isActive = true;
        model.category.isActive = false;
        model.glAccounts.isActive = false;
        model.showTab();
        expect(model.includePage).toEqual("coa-setup/clone-masterchart/index.html");
    });

    it("calling model get GLTab Active", function () {
        model.cloneChart.isActive = true;
        model.category.isActive = false;
        model.glAccounts.isActive = false;
        var outPut= model.getGLTabActive();
        expect(outPut).toEqual(model.glAccounts.isActive);
    });

    it("calling model get Category Tab Active ", function () {
        model.cloneChart.isActive = true;
        model.category.isActive = false;
        model.glAccounts.isActive = false;
        var outPut = model.getCategoryTabActive();
        expect(outPut).toEqual(model.category.isActive);
    });

    it("calling model get Category Tab Active ", function () {
        model.cloneChart.isActive = true;
        model.category.isActive = false;
        model.glAccounts.isActive = false;
        var outPut = model.getCloneChartTabActive();
        expect(outPut).toEqual(model.cloneChart.isActive);
    });

    it("calling model show Gl Account when gl accoutn is active", function () {
        model.cloneChart.isActive = true;
        model.category.isActive = false;
        model.glAccounts.isActive = true;
        var outPut = model.showGlAccount();
    });

    it("calling model show Gl Account when gl accoutn is not active", function () {
        model.cloneChart.isActive = true;
        model.category.isActive = false;
        model.glAccounts.isActive = false;
        var outPut = model.showGlAccount();
    });

    it("calling model show category when category is active", function () {
        model.cloneChart.isActive = true;
        model.category.isActive = true;
        model.glAccounts.isActive = true;
        var outPut = model.showCategory();
    });

    it("calling model show category when category is not active", function () {
        model.cloneChart.isActive = true;
        model.category.isActive = false;
        model.glAccounts.isActive = false;
        var outPut = model.showCategory();
    });

    it("calling model show clone when clone is active", function () {
        model.cloneChart.isActive = true;
        model.category.isActive = false;
        model.glAccounts.isActive = false;
        var outPut = model.showClone();
    });

    it("calling model show clone when clone is not active", function () {
        model.cloneChart.isActive = false;
        model.category.isActive = false;
        model.glAccounts.isActive = false;
        var outPut = model.showClone();
    });

});