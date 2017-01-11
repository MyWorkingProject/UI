// Roles List Notifications Model Tests

describe('mastercharts List Notifications', function () {
    var model, notification;

    beforeEach(module('budgeting.coaSetup.mastercharts'));

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

        inject(['masterchartNotifications', 'rpNotificationModel', injector]);
    });

    afterEach(function () {
        notification._reset();
    });

    it('should have notification key', function () {
        expect(model.notification).toBe(notification);
    });

    it('method showErrorNotification should call extend and show methods', function () {
        model.showErrorNotification('title','desc');
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

