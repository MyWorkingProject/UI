describe("budget comments error model", function () {
    var model, appLangTranslate, notification;
    beforeEach(module("budgeting.workspaces.budgetComments"));

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
        inject(['appLangTranslate', 'rpNotificationModel', 'commentsError', injector]);

        model.getCommentsErrorObj = {
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

    });

    afterEach(function () {
        notification._reset();
    });

    it("budget comments notification, should call showNotification", function () {
        var data = {
            type: "error"
        };
        model.showNotification(data);
        expect(notification._called.flushAll).toBe(true);
        expect(notification._callData.extend[0].type).toBe('error');
        expect(notification._called.show).toBe(true);

    });

    it("budget comments notification, show Error Notification", function () {
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
        expect(notification._called.flushAll).toBe(true);
        expect(notification._callData.extend[0].type).toBe('error');
        expect(notification._called.show).toBe(true);    
    });

    it("budget comments wrap msg method, when error is defined", function () {
        model.wrapShowMsg("INVALID_PARAM",model.getCommentsErrorObj);
        expect(notification._called.flushAll).toBe(true);
        expect(notification._callData.extend[0].type).toBe('error');
        expect(notification._called.show).toBe(true);
    });

    it("budget comments wrap msg method, when error is not defined", function () {
        model.wrapShowMsg("INVALID",model.getCommentsErrorObj);
        expect(notification._called.flushAll).toBe(undefined);
        expect(notification._called.show).toBe(undefined);
    });
    
    it("budget comments calling error method when response status is 400", function () {
        var response={status:400,data:{message:"INVALID_PARAM"}};
        model.getCommentsError(response);
        expect(notification._called.flushAll).toBe(true);
        expect(notification._callData.extend[0].type).toBe('error');
        expect(notification._called.show).toBe(true);
    });

     it("budget comments calling error method when response status is other than 400", function () {
        var response={status:500,data:{message:"INVALID_PARAM"}};
        model.getCommentsError(response);
        expect(notification._called.flushAll).toBe(undefined);
        expect(notification._called.show).toBe(undefined);
    });


});
