describe("property chart notification model", function () {
    var model, appLangTranslate, notification;
    beforeEach(module("budgeting.coaSetup.propertyChart"));

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

        //var spy2 = RealPage.spy();
        //spy2._createMethods(['flushAll', 'extend', 'show']);

        module(function ($provide) {
            $provide.value("appLangTranslate", spy1);
            // $provide.value("rpNotificationModel", spy2);
        });

        function injector(a, b, c) {
            appLangTranslate = a;
            notification = b();
            model = c;
        }
        inject(['appLangTranslate', 'rpNotificationModel', 'propertyChartNotification', injector]);

    });

    afterEach(function () {
        notification._reset();
    });

    it("property chart notification , when error is 400, this method shoudl be called", function () {
        var response = { status: 400 };
        model.getPropertyChartError(response);
        //expect(model._called.showErrorNotification).toBe(true);
    });

    it("property chart notification, when error is other than 400, this method shoudl not be called", function () {
        var response = { status: 200 };
        model.getPropertyChartError(response);
        //expect(model._called.showErrorNotification).toBe(false);
    });

    it("property chart notification, showNotification", function () {
        model.showNotification();
        expect(notification._called.flushAll).toBe(true);
        //expect(notification._callData.extend[0].type).toBe('error');
        expect(notification._called.show).toBe(true);

    });

    it("property chart notification, show Error Notification", function () {
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




});
