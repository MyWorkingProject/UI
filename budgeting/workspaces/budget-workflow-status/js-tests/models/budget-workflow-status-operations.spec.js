describe("work flow status operation model", function () {
    var model, appTranslate, grid,wfSVC,wfError,wfGrid,wfModel ;
    var resourceCallData, returnData, $q, promise, spy5, $rootScope;
    beforeEach(module("budgeting.workspaces.budgetWorkflowStatus"));


    beforeEach(function () {
       
        var spy2 = RealPage.spy();
        spy2._createMethods(['updateWorkflowStatus']);
        
        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy3 = function (name) {
            appTranslate.name = name;
            return appTranslate;
        };
        
        var spy4 = RealPage.spy();
        spy4._createMethods(['showBgtStatusException']);

        var spy6 = RealPage.spy();
        spy6._createMethods(['load']);

        spy5 = RealPage.spy();
        spy5._createMethods(['showHideToolTipAlertlert', 'showHideForm','updateSlideCommentsFlag','reset']);

        module(function ($provide) {
            $provide.value('budgetWorkflowStatusSvc', spy2);
            $provide.value('appLangTranslate', spy3);
            $provide.value('budgetWorkflowStatusErrorHandling', spy4);
            $provide.value('budgetWorkflowStatusGridFactory', spy6);
            $provide.value('budgetWorkflowStatusModel', spy5);
        });

    });

    beforeEach(function () {
        function injector(a, b, c, d, e, f, g, h) {
            appTranslate = a;
            wfSVC = b;
            wfError = c;
            wfGrid = d;
            wfModel = e;
            model = f;
            $q = g;
            $rootScope = h;
        }

        inject([
             'appLangTranslate', 
            'budgetWorkflowStatusSvc',
            'budgetWorkflowStatusErrorHandling',
            'budgetWorkflowStatusGridFactory',
            'budgetWorkflowStatusModel',
            'budgetWorkflowStatusOperations', '$q', '$rootScope', injector]);
    });

    it("calling update WorkflowFormControls when action is Approve", function () {
        var action="Approve";
        model.updateWorkflowFormControls(action);
        expect(model.form.showChkBoxRow).toBe(true);
    });

    it("calling update WorkflowFormControls when action is Reject", function () {
        var action="Reject";
        model.updateWorkflowFormControls(action);
        expect(model.form.showChkBoxRow).toBe(false);
    });

     it("calling update WorkflowFormControls when action is Reject", function () {
        var action="Submit";
        model.updateWorkflowFormControls(action);
        expect(model.form.showChkBoxRow).toBe(true);
    });

     it("calling update WorkflowFormControls when action is Invalid", function () {
        var action="Invalid";
        model.updateWorkflowFormControls(action);
    });
    
     it("calling approve Workflow Fields", function () {
        var action="Submit";
        model.approveWorkflowFields();
        expect(model.form.showChkBoxRow).toBe(true);
        expect(model.form.showHelpIcon).toBe(false);
    });

     it("calling reject Workflow Fields", function () {
        model.rejectWorkflowFields();
        expect(model.form.showChkBoxRow).toBe(false);
    });

    it("calling Submit Workflow Fields", function () {
        model.updateSubmitWorkflowFields();
        expect(model.form.showChkBoxRow).toBe(true);
        expect(model.form.showHelpIcon).toBe(true);
    });

     it("calling showForm", function () {
        model.showForm("Test");
        expect(wfModel._called.showHideToolTipAlertlert).toBe(true);
        expect(wfModel._callData.showHideToolTipAlertlert[0]).toBe(false);
        expect(wfModel._called.showHideForm).toBe(true);
        expect(wfModel._callData.showHideForm[0]).toBe(true);
    });

    it("calling update Status", function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        wfSVC._returnData.updateWorkflowStatus = {
            $promise: promise
        };

        var data = { records: { name: "Test Chart" }, status: 200 };

        model.updateStatus(data);
      
    });

      it("calling buildData", function () {
         var data={};
        model.buildData(data);
    });

     it("should return promise", function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        wfSVC._returnData.updateWorkflowStatus = {
            $promise: promise
        };

        var data = { records: { name: "Test Chart" }, status: 200 };

        var outPut= model.updateWorkflowStatus(data);
        expect(outPut).toEqual(promise);
      
    });

     it("calling on success method", function () {
         var data={};
        model.onSuccess();
        expect(wfModel._called.updateSlideCommentsFlag).toBe(true);
        expect(wfModel._called.reset).toBe(true);
        expect(wfGrid._called.load).toBe(true);
    });

    it("calling return Status Field when btn is Submit", function () {
        model.fieldLabel.formSubmitBtnText="Submit" ;
        var outPut= model.returnStatusField();
        expect(outPut).toEqual("Submitted");
    });

    it("calling return Status Field when btn is Approve", function () {
        model.fieldLabel.formSubmitBtnText="Approve" ;
        var outPut= model.returnStatusField();
        expect(outPut).toEqual("Approved");
    });

    it("calling return Status Field when btn is Reject", function () {
        model.fieldLabel.formSubmitBtnText="Reject" ;
        var outPut= model.returnStatusField();
        expect(outPut).toEqual("Rejected");
    });

    it("calling return Status Field when btn is Invalid", function () {
        model.fieldLabel.formSubmitBtnText="Invalid" ;
        var outPut= model.returnStatusField();
        expect(outPut).toEqual("");
    });

    it("calling build PostData ", function () {
        var data=[{distributedID:1,budgetWorkFlowID:2,currentSequence:1},{distributedID:1,budgetWorkFlowID:2,currentSequence:1}];
        var outPut= model.buildPostData(data,true);
        expect(outPut.length).toEqual(2);
    });

     it("calling showModelHelpInfo ", function () {
        model.showModelHelpInfo();
    });

    it("calling set HelpInfo ", function () {
        model.form.infoToolTip=false;
        model.setHelpInfo(true);
        expect(model.form.infoToolTip).toBe(true);
    });

     it("calling get HelpInfo ", function () {
        model.form.infoToolTip=false;
        var outPut= model.getHelpInfoToolTip();
        expect(outPut).toBe(false);
    });

     it("calling reset ", function () {
        model.form={};
        model.emptyData={id:1};
        model.reset();
        expect(model.form).toEqual(model.emptyData);
    });

     it("verifying clar data ", function () {
        model.clearControls();
        expect(model.form.chkRoleStatus).toEqual(false);
        expect(model.form.comments).toEqual("");
    });



    

});