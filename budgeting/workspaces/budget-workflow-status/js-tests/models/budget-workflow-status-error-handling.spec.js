describe("work flow status error handling model", function () {
    var model, appLangTranslate, notification;
    beforeEach(module("budgeting.workspaces.budgetWorkflowStatus"));
  

    beforeEach(function () {


        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var spy2 = RealPage.spy();
        spy2._createMethods(['showErrorInfo']);

        module(function ($provide) {
            $provide.value("appLangTranslate", spy1);
            $provide.value("budgetWorkflowStatusNotifications", spy2);
        });

        function injector(a, b, c) {
            appLangTranslate = a;
            notification = b;
            model = c;
        }
        inject(['appLangTranslate', 'budgetWorkflowStatusNotifications', 'budgetWorkflowStatusErrorHandling', injector]);

        model.emptyData = {
          "getBdgtWorkflowStatusException": {
                 "INVALID_PARAM": {
                    title: 'Invalid Error, def error',
                    desc: 'Invalid Error Desc, def error ',
                    info: "Invalid Error info"
                },
                "UNKNOWN_ERROR": {
                    title: 'Unkonw Error',
                    desc: 'Unknown Error Desc',
                    info: "Unknown error info"
                }
            },
            "showBgtStatusException": {
                "INVALID_PARAM": {
                    title: 'Invalid Error, def error',
                    desc: 'Invalid Error Desc, def error ',
                    info: "Invalid Error info"
                },
                
            },
            "showBdgtModelException": {
                "NOT_FOUND": {
                    title: "Not fnd",
                    desc: "not fnd desc",
                    info: "not fnd info"
                }
            }
    };




    });

    it("Verifying status when parameter is matched with response", function () {
        var error = {
            status:1
        };
        var exId=1;
        var outPut = model.isStatus(error,exId);
        expect(outPut).toEqual(true);
    });

     it("Verifying status when parameter is not matched with response", function () {
        var error = {
            status:2
        };
        var exId=1;
        var outPut = model.isStatus(error,exId);
        expect(outPut).toEqual(false);
    });

     it("Verifying wrap msg method when error is found", function () {
        var obj={"INVALID_PARAM":"Erorr"};
        var exId=1;
        model.wrapShowMessage("INVALID_PARAM",obj);
        expect(notification._called.showErrorInfo).toBe(true);
    });

    it("Verifying wrap msg method when error is not found", function () {
        var obj={"INVALID_PARAM":"Erorr"};
        var exId=1;
        model.wrapShowMessage("PARAM",obj);
        expect(notification._called.showErrorInfo).toBe(undefined);
    });

    it("Verifying get Bdgt Workflow Status Exception", function () {
        var response={data:{message:"INVALID_PARAM"}};
        model.getBdgtWorkflowStatusException(response);
        expect(notification._called.showErrorInfo).toBe(true);
    });

    it("Verifying get Bdgt Workflow Status Exception", function () {
        var response={data:{message:"INVALID_PARAM"}};
        model.showBgtStatusException(response);
        expect(notification._called.showErrorInfo).toBe(true);
    });

     it("Verifying Bdgt BdgtModelE xception", function () {
        var response={data:{message:"NOT_FOUND"}};
        model.showBdgtModelException(response);
        expect(notification._called.showErrorInfo).toBe(true);
    });


});
