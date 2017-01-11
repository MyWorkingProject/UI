describe("default adjustment error model", function () {
    var model, appLangTranslate, notification;
    beforeEach(module("budgeting.coaSetup.defaultAdjustment"));

    beforeEach(function () {
        var mocks = {
            'rp.common.notification': ['rpNotificationModel']
        };

        RealPage.ngMocks.install(mocks);
    });



    beforeEach(function () {


        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };


        module(function ($provide) {
            $provide.value("appLangTranslate", spy1);
        });

        function injector(a, b, c) {
            appLangTranslate = a;
            notification = b();
            model = c;
        }
        inject(['appLangTranslate', 'rpNotificationModel', 'defaultAdjustmentErrModel', injector]);

        model.emptyData = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: 'Invalid Error, def error',
                    desc: 'Invalid Error Desc, def error ',
                    info: "Invalid Error info"
                },
                "UNKNOWN_ERROR": {
                    title: 'Unkonw Error',
                    desc: 'Unknown Error Desc',
                    info: "Unknown error info"
                },
                "CHART_NOT_FOUND": {
                    title: "Chart Not fnd",
                    desc: "Chart not fnd desc",
                    info: "Chart not fnd info"
                }
            }
        };



    });

    afterEach(function () {
        notification._reset();
    });

    it("Verifying return of error message when error is found", function () {
        var error = {
            data: {
                message: "INVALID_PARAM|UNKNOWN_ERROR"
            }
        };
        var outPut = model.fetchErrorMessage(error);
        expect(outPut).toEqual("INVALID_PARAM");
    });

    it("Verifying return of error message when error is not found", function () {
        var error = {
            data: {
                message: ""
            }
        };
        var outPut = model.fetchErrorMessage(error);
        expect(outPut).toEqual("");
    });

    it("Verifying return of Error HasKey method", function () {
        var error = "INVALID_PARAM|UNKNOWN_ERROR";
        var outPut = model.errorHasKey(error);
        expect(outPut.index).toEqual(0);
    });

    it("Should return first parameter after split", function () {
        var error = "INVALID_PARAM|UNKNOWN_ERROR";
        var outPut = model.getKeyFromMessage(error);
        expect(outPut).toEqual("INVALID_PARAM");
    });

    it("calling wrap ShowMsg when message is found", function () {
        model.form = model.emptyData;
        var outPut = model.wrapShowMsg("INVALID_PARAM");
        expect(notification._called.show).toBe(true);
    });

    it("calling wrap ShowMsg when message is not found", function () {
        model.form = model.emptyData;
        var outPut = model.wrapShowMsg("NO_DATA");
        expect(notification._called.show).toBe(undefined);
    });

    it("calling Status when paramter status and data status is same", function () {
        var resp = { status: true };
        var outPut = model.isStatus(resp, true);
        expect(outPut).toBe(true);
    });

    it("calling Status when paramter status and data status is not same", function () {
        var resp = { status: true };
        var outPut = model.isStatus(resp, false);
        expect(outPut).toBe(false);
    });

    it("calling on Error method when status is 400", function () {
        var resp = {
            status: 400, data: {
                message: "INVALID_PARAM"
            }
        };
        model.form = model.emptyData;
        var outPut = model.onError(resp, 400);
        expect(notification._called.show).toBe(true);
    });

    it("calling on Error method when status is 200", function () {
        var resp = {
            status: 200, data: {
                message: "INVALID_PARAM"
            }
        };
        model.form = model.emptyData;
        var outPut = model.onError(resp, 400);
        expect(notification._called.show).toBe(undefined);
    });

    it("calling show success message", function () {
        model.showSuccMessage();
        expect(notification._called.show).toBe(true);
    });

    it("calling show error message", function () {
        var msg = { title: "tle", desc: "desc" };
        model.showErrorMsg(msg);
        expect(notification._called.show).toBe(true);
    });

    it("calling show notification", function () {
        var msg = { title: "tle", desc: "desc" };
        model.showNotification(msg);
        expect(notification._called.show).toBe(true);
        expect(notification._called.flushAll).toBe(true);
        expect(notification._called.extend).toBe(true);
        expect(notification._callData.extend[0]).toEqual(msg);
    });

    it("verification of reset method", function () {
        model.emptyData = { id: 1 };
        model.form = {};
        model.reset();
        expect(model.emptyData).toEqual(model.form);
    });

});
