describe("work flow status notiifcation model", function () {
    var model, appLangTranslate, notification;
    beforeEach(module("budgeting.workspaces.budgetWorkflowStatus"));

    beforeEach(function () {
        var mocks = {
            'rp.common.notification': ['rpNotificationModel']
        };

        RealPage.ngMocks.install(mocks);
    });



    beforeEach(function () {

       
        function injector(a, b) {
            notification = a();
            model = b;
        }
        inject(['rpNotificationModel', 'budgetWorkflowStatusNotifications', injector]);

        //model.notification = notification();
    });

    afterEach(function () {
        notification._reset();
    });

    it("work flow status, show ErrorNotification", function () {
        var data = {
            type: "error"
        };
        model.showErrorNotification("Title","Desc","error");
        expect(notification._called.extend).toBe(true);
        expect(notification._callData.extend[0].type).toBe('error');
        expect(notification._called.show).toBe(true);

    });

    it("work flow status, show Error info", function () {
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

        model.showErrorInfo(options);
        expect(notification._called.extend).toBe(true);
        expect(notification._callData.extend[0].type).toBe('error');
        expect(notification._called.show).toBe(true);

    });

     it("work flow status, show success notification", function () {
        model.showSuccessNotification("Title");
        expect(notification._called.extend).toBe(true);
        expect(notification._callData.extend[0].type).toBe('success');
        expect(notification._called.show).toBe(true);

    });


});
