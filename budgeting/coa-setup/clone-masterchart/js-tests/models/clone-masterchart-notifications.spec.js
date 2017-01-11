describe("clone chart notiifcation model", function () {
    var model, appLangTranslate, notification;
    beforeEach(module("budgeting.coaSetup.cloneMasterchart"));

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
        inject(['appLangTranslate', 'rpNotificationModel', 'cloneChartNotification', injector]);

        model.cloneChartErrorObj = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: 'Invalid Error,clone',
                    desc: 'Invalid Error Desc,clone'
                },
                "UNKNOWN_ERROR": {
                    title: 'Unkonw Error',
                    desc: 'Unknown Error Desc'
                }
            }
        };

        model.wizErrorObj = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: 'Invalid Error,Wizard',
                    desc: 'Unknown Error Desc,Wizard'
                }
            }
        };

    });

    afterEach(function () {
        notification._reset();
    });

    it("clone chart notification, showNotification", function () {
        var data = {
            type: "error"
        };
        model.showNotification(data);
        expect(notification._called.flushAll).toBe(true);
        expect(notification._callData.extend[0].type).toBe('error');
        expect(notification._called.show).toBe(true);

    });

    it("clone chart notification, show Error Notification", function () {
        var options = {
            type: "error",
            autoHideTime: -1,
            title: 'error',
            descr: 'error test'
        };

        options.actions = [{
            text: 'Close',
            method: notification.hide
        }];

        model.showErrorNotification(options);

    });

    it("clone chart wrapShowMsg calling when INVALID_PARAM using clone chart error object", function () {
        var msg = "INVALID_PARAM";
        model.wrapShowMsg(msg, model.cloneChartErrorObj);
        //expect(model._called.showErrorNotification).toBe(true);
    });

    it("clone chart wrapShowMsg calling when UNKNOWN_ERROR using clone chart error object", function () {
        var msg = "UNKNOWN_ERROR";
        model.wrapShowMsg(msg, model.cloneChartErrorObj);
        // expect(model._called.showErrorNotification).toBe(true);
    });

    it("clone chart wrapShowMsg calling when Undefined Error using clone chart error object", function () {
        var msg = "Undefine_Errr";
        model.wrapShowMsg(msg, model.cloneChartErrorObj);
        //expect(model._called.showErrorNotification).toBe(undefined);
    });

    it("clone chart wrapShowMsg calling when INVALID_PARAM using wiz Error  object", function () {
        var msg = "INVALID_PARAM";
        model.wrapShowMsg(msg, model.wizErrorObj);
        //expect(model._called.showErrorNotification).toBe(true);
    });

    it("clone chart wrapShowMsg calling when Undefined Error using wiz error object", function () {
        var msg = "Undefine_Errr";
        model.wrapShowMsg(msg, model.wizErrorObj);
        //expect(model._called.showErrorNotification).toBe(undefined);
    });

    it("clone chart getCloneChartError calling when response is 400", function () {
        var response = { status: 400, data: { message: "INVALID_PARAM" } };
        model.getCloneChartError(response);
    });

    it("clone chart getCloneChartError calling when response is other than 400", function () {
        var response = { status: 200 };
        model.getCloneChartError(response);
    });

    it("clone chart wizardFailure calling when response is 400", function () {
        var response = { status: 400, data: { message: "INVALID_PARAM" } };
        model.wizardFailure(response);
    });

    it("clone chart wizardFailure calling when response is other than 400", function () {
        var response = { status: 200 };
        model.wizardFailure(response);
    });


});
