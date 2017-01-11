describe("New master chart error model", function () {
    beforeEach(module("budgeting.coaSetup.newMasterchart"));
    var notification, model, appLangTranslate, dialogModel;

    beforeEach(function () {

        var mockRpDialog = {
            'rp.common.dialog': ['rpDialogModel']
        };

        var mocksNotf = {
            'rp.common.notification': ['rpNotificationModel']
        };

        RealPage.ngMocks.install(mockRpDialog);
        RealPage.ngMocks.install(mocksNotf);
    });

    beforeEach(function () {

        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        module(function ($provide) {
            $provide.value("appLangTranslate", spy2);
        });

        function injector(a, b, c, d) {
            appLangTranslate = a;
            dialogModel = b();
            notification = c();
            model = d;
        }

        inject(['appLangTranslate', 'rpDialogModel', 'rpNotificationModel', 'newMasterchartErrorModel', injector]);

        model.chartFailureErrorObject = {
            errorMsgs: {
                "CHART_NOT_FOUND": {
                    title: "Test Not found",
                    desc: "Desc Test Not found"
                },
                "INVALID_PARAM": {
                    title:"Invalid Param Title",
                    desc: "Invalid Param Desc"
                }
            }
        };

        model.wizardFailureErrorObject = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: "wizard error ",
                    desc: "wzard error "
                }
            }
        };

    });

    afterEach(function () {
        notification._reset();
        dialogModel._reset();
    });

    it("assigning chart name to model", function () {
        model.assignChartName("Chart");
        expect(model.chartName).toEqual("Chart");
    });

    it("model wrap message, should show the passed error object message", function () {
        model.wrapShowMsg("CHART_NOT_FOUND", model.chartFailureErrorObject);
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);
    });

    it("model wrap message, should log the message when invalid messgae is passed", function () {
        model.wrapShowMsg("NOT_found", model.chartFailureErrorObject);
    });

    it("showing duplicate message, when chart  is duplicate", function () {
        var response = { status: 400, data: { messageText: "DUPLICATE" } };
        model.masterChartFailure(response);
        expect(dialogModel._called.show).toBe(true);
    });

    it("showing Error message, when error in saving the chart data", function () {
        var response = { status: 400, data: { messageText: "INVALID_PARAM", message: "INVALID_PARAM" } };
        model.masterChartFailure(response);
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);
    });

    it("not showing the error messgae when error is other than 400", function () {
        var response = { status: 500, data: { messageText: "INVALID" } };
        model.masterChartFailure(response);
    });

    it("showing the error message, when wizard updation is failed", function () {
        var response = { status: 400, data: { messageText: "INVALID_PARAM", message: "INVALID_PARAM" } };
        model.wizardFailure(response);
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);
    });
  
    it("not showing the error message, when wizard updation is failed and status is other than 400", function () {
        var response = { status: 500, data: { messageText: "INVALID_PARAM" } };
        model.wizardFailure(response);
    });

    it("showing duplicate message ", function () {
        model.chartName = "Test chart";
        model.showDuplcateMessage("");
        expect(dialogModel._called.show).toBe(true);
    });

    it("showing show Notification message ", function () {
        var options = {
            type: "error",
            autoHideTime: -1,
            title: 'title',
            descr: 'desc'
        };

        options.actions = [{
            text: 'Close',
            method: notification.hide
        }];
        model.showNotification(options);
        expect(notification._called.extend).toBe(true);
        expect(notification._callData.extend[0]).toBe(options);
        expect(notification._called.show).toBe(true);
    });

    it("calling show error notification", function () {
        var msg = { title: "title", descr :"desc"};
        model.showErrorNotification(msg);
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);
    });

});