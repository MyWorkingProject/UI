// Tests for Import Category Error Message Handling Model

describe('Import Category Error Message Handling Model', function () {
    var translator, notificationModel, model;

    beforeEach(module('budgeting.coaSetup.importCategory'));

    beforeEach(function () {

        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appTranslate.name = name;
            return appTranslate;
        };

        notificationModel = RealPage.spy();
        notificationModel._createMethods(['hide', 'showNotification', 'flushAll', 'extend', 'show']);


        var spy2 = function () {
            return notificationModel;
        };

        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('rpNotificationModel', spy2);
        });

    });

    beforeEach(inject(function (appLangTranslate, rpNotificationModel, ImportCategoryErrorModel) {
        translator = appLangTranslate;
        notificationModel = rpNotificationModel();
        model = ImportCategoryErrorModel;
    }));

    
    it('on fetchErrorMessage should return error message key', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var val = model.fetchErrorMessage(resp);
        expect(val).toBe("INVALID_PARAM");

        var resp2 = {
            status: 400,
            data: {
                message: "INVALID_PARAM"
            }
        };
        var val2 = model.fetchErrorMessage(resp2);
        expect(val2).toBe("INVALID_PARAM");
    });

    it('on errorHasKey should return boolean if message has PIPE symbol', function () {

        var message = "INVALID_PARAM|Parameter Invalid";

        var val = model.errorHasKey(message);
        expect(val).toBe(true);

        message = "INVALID_PARAM";
        val = model.errorHasKey(message);
        expect(val).toBe(false);
    });

    it('on getKeyFromMessage should return key of error message', function () {

        var message = "INVALID_PARAM|Parameter Invalid";

        var val = model.getKeyFromMessage(message);
        expect(val).toBe("INVALID_PARAM");
    });

    it('on wrapShowMsg  should return key of error message', function () {

        var message = "INVALID_PARAM";
        var called = false;
        model.showErrorMsg = function (obj) {
            called = true;
        };
        model.wrapShowMsg(message);
        expect(called).toBe(true);
        called = false;

        model.wrapShowMsg("");
        expect(called).toBe(false);
    });

    it('on isStatus should return boolean if it matches the status code', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var val = model.isStatus(resp, 400);
        expect(val).toBe(true);

        var val2 = model.isStatus(resp, 404);
        expect(val2).toBe(false);
    });

    it('on onFileNotFoundErr should return file not found error status code', function () {
        var resp = {
            status: 404,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.wrapShowMsg = function (msg) {
            called = true;
        };

        model.onFileNotFoundErr(resp);
        expect(called).toBe(true);

        resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        called = false;
        model.onFileNotFoundErr(resp);
        expect(called).toBe(false);
    });

    it('on onError should invoke wrap show message method with message object', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };

        var called = false;
        model.wrapShowMsg = function (msg) {
            called = true;
        };

        model.onError(resp);
        expect(called).toBe(true);

        resp = {
            status: 404,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        called = false;
        model.onError(resp);
        expect(called).toBe(false);
    });

    it('on showSuccMessage should invoke notification model', function () {
        var called = false;
        model.showNotification = function (obj) {
            called = true;
        };

        model.showSuccMessage();
        expect(called).toBe(true);
    });

    it('on showErrorMsg should invoke notification model', function () {
        var resp = {
            title: "Error Title",
            desc: "Error Description"
        };

        var called = false;
        model.showNotification = function (obj) {
            called = true;
        };

        model.showErrorMsg(resp);
        expect(called).toBe(true);
    });

    it('on showNotification should invoke notification model show method', function () {
        var options = {};
        options = {
            type: 'success',
            autoHideTime: 3000,
            title: "Success", //'Success', //Need to update from lang bundle
            descr: "GL Accounts got deleted successfully"  //Need to update from lang bundle
        };

        options.actions = [{
            text: 'Close',
            method: ""
        }];

        var notification = notificationModel;
        model.showNotification(options);
        expect(notificationModel._called.flushAll).toBe(true);
        expect(notificationModel._called.extend).toBe(true);
        expect(notificationModel._called.show).toBe(true);
    });

    it('on reset copy default data to form data', function () {
        model.emptyData = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: "Error Message Title",
                    desc: "Error Message Description",
                    info: "Error Message Info"
                }
            }
        };

        model.reset();

        expect(model.form.errorMsgs["INVALID_PARAM"].title).toBe("Error Message Title");

    });
});
