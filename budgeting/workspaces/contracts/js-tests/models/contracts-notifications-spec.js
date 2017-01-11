

describe('Contracts Notifications', function () {
    var model, notification;

    beforeEach(module('budgeting.workspaces.contracts'));

    beforeEach(function () {
        var mocks = {
            'realpage.common.notification': ['rpNotificationModel']
        };

        RealPage.ngMocks.install(mocks);
    });

    beforeEach(function () {
        function injector(a, b) {
            model = a;
            notification = b();
        }

        inject(['contractsNotifications', 'rpNotificationModel', injector]);
    });

    afterEach(function () {
        notification._reset();
    });

    it('should have notification key', function () {
        expect(model.notification).toBe(notification);
    });

    it('method showErrorNotification should call extend and show methods', function () {

        var obj = {
            title: "title",
            desc: "desc",
            type: "error"
        };
        model.showErrorNotification(obj);
        model.showErrorInfo(obj);
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);
        expect(notification._callData.extend[0].type).toBe('error');
    });

    it('method showSuccessNotification should call extend and show methods', function () {
        model.showSuccessNotification('desc');
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);
        expect(notification._callData.extend[0].type).toBe('success');
    });
});

