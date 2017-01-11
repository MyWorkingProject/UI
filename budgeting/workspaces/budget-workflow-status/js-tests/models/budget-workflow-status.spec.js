describe("Work flow status model, test cases", function() {
    var model, appTranslate, $filter, wfSVC, errorModel;
    var dialogModel, returnData, $q, promise, spy5, $rootScope;
    beforeEach(module("budgeting.workspaces.budgetWorkflowStatus"));


    beforeEach(function() {

        var mocks = {
            'rp.common.dialog': ['rpDialogModel']
        };

        RealPage.ngMocks.install(mocks);

        var spy2 = RealPage.spy();
        spy2._createMethods(['getBdgtModel', 'getBudgetWorkFlowStatusList']);

        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy3 = function(name) {
            appTranslate.name = name;
            return appTranslate;
        };

        var spy4 = RealPage.spy();
        spy4._createMethods(['getBdgtModel', 'getBudgetWorkFlowStatusList']);

        module(function($provide) {
            $provide.value('budgetWorkflowStatusSvc', spy2);
            $provide.value('appLangTranslate', spy3);
            $provide.value('budgetWorkflowStatusErrorHandling', spy4);
        });

    });

    afterEach(function() {
        dialogModel._reset();
    });

    beforeEach(function() {
        function injector(a, b, c, d, e, f, g, h) {
            appTranslate = a;
            $filter = b;
            wfSVC = c;
            dialogModel = d();
            errorModel = e;
            model = f;
            $q = g;
            $rootScope = h;
        }

        inject([
            'appLangTranslate', '$filter',
            'budgetWorkflowStatusSvc',
            'rpDialogModel',
            'budgetWorkflowStatusErrorHandling', 'budgetWorkflowStatusModel', '$q', '$rootScope', injector
        ]);
    });

    it("Verification of assingn of tool tip alert", function() {
        model.showHideToolTipAlertlert(true);
        expect(model.state.toolTipAlert).toBe(true);
        expect(model.state.toolTipReject).toBe(false);

    });

    it("calling of show HideToolTip", function() {
        model.showHideToolTip();
        expect(model.state.toolTipAlert).toBe(true);
        expect(model.state.toolTipReject).toBe(false);
        expect(model.form.slideCommentsForm.state.open).toBe(false);
    });

    it("calling of update Slide CommentsFlag ", function() {
        model.updateSlideCommentsFlag(true);
        expect(model.form.slideCommentsForm.state.open).toBe(true);
    });

    it("calling of show HideForm ", function() {
        model.showHideForm(true);
        expect(model.form.slideCommentsForm.state.open).toBe(true);
    });

    it("verification of tool tip variable ", function() {
        model.state.toolTipAlert = true;
        var outPut = model.isToolTipisMenuOn();
        expect(model.state.toolTipAlert).toBe(true);
    });

    it("updation of tool tip alert", function() {
        model.updateTipisMenuOn(true);
        expect(model.state.toolTipAlert).toBe(true);
    });

    it("updation of filter types when exitsing filter lenght is 1", function() {
        var data = [{
            budgetYearText: "Budget",
            budgetYearValue: 2015
        }, {
            budgetYearText: "Budget",
            budgetYearValue: 2016
        }];
        model.form.filterOptions = [{
            id: 1
        }];
        model.updateFiltTypes(data);
        expect(model.form.filterOptions.length).toEqual(3);
    });

    it("updation of filter types when exitsing filter lenght is 2", function() {
        var data = [{
            budgetYearText: "Budget",
            budgetYearValue: 2015
        }, {
            budgetYearText: "Budget",
            budgetYearValue: 2016
        }];
        model.form.filterOptions = [{
            id: 1
        }, {
            id: 2
        }];
        model.updateFiltTypes(data);
        expect(model.form.filterOptions.length).toEqual(2);
    });

    it("verification of model array", function() {
        var data = [{
            budgetYearText: "Budget",
            budgetYearValue: 2015
        }, {
            budgetYearText: "Budget",
            budgetYearValue: 2016
        }];
        var outPut = model.getModelsArray(data);
        expect(outPut.length).toEqual(2);
        expect(outPut[0].name).toEqual(data[0].budgetYearText);
        expect(outPut[0].value).toEqual(data[0].budgetYearValue);
        expect(outPut[1].name).toEqual(data[1].budgetYearText);
        expect(outPut[1].value).toEqual(data[1].budgetYearValue);
    });

    it("verification of return of promise from service", function() {
        var Defered = $q.defer();
        promise = Defered.promise;

        wfSVC._returnData.getBdgtModel = {
            $promise: promise
        };

        var masterChartID = 1;
        var data = {
            records: {
                name: "Test Chart"
            },
            status: 200
        };

        var outPut = model.getBdgtModel();

        Defered.resolve(data);
        $rootScope.$apply();

        expect(outPut).toEqual(promise);
    });

    it("verification of status list when in progress is active", function() {
        model.form.inProgress.isActive = true;
        var data = {
            records: {
                name: "Test Chart"
            },
            status: 200
        };

        model.getBudgetWorkFlowStatusList(data);
        expect(wfSVC._called.getBudgetWorkFlowStatusList).toBe(true);
        expect(wfSVC._callData.getBudgetWorkFlowStatusList[0].statusType).toEqual(1);
    });

    it("verification of status list when in progress is inactive", function() {
        model.form.inProgress.isActive = false;
        var data = {
            records: {
                name: "Test Chart"
            },
            status: 200
        };

        model.getBudgetWorkFlowStatusList(data);
        expect(wfSVC._called.getBudgetWorkFlowStatusList).toBe(true);
        expect(wfSVC._callData.getBudgetWorkFlowStatusList[0].statusType).toEqual(2);
    });

    it("returnof is Subscribed", function() {
        model.form.subscribed = true;
        var outPut = model.isSubscribed();
        expect(outPut).toBe(true);
    });

    it("return of is set SubscribeVal", function() {
        model.setSubscribeVal(true);
        expect(model.form.subscribed).toBe(true);
    });

    it("callign reset method", function() {
        model.form = {};
        model.emptyData = {
            id: 1
        };
        model.reset();
        expect(model.form).toEqual(model.emptyData);
    });

    it("return of  inProgress", function() {
        model.form.inProgress = true;
        var outPut = model.getInProgress();
        expect(outPut).toBe(true);
    });

    it("return of  get NeedApproval", function() {
        model.form.needApproval = true;
        var outPut = model.getNeedApproval();
        expect(outPut).toBe(true);
    });

    it("return of  get InProgressActive", function() {
        model.form.inProgress.isActive = true;
        var outPut = model.getInProgressActive();
        expect(outPut).toBe(true);
    });



});