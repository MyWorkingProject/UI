// Tests for Import GL Account Error Message Handling Model

describe('Import GL Account Error Message Handling Model', function () {
    var translator, notificationModel, model;

    beforeEach(module('budgeting.coaSetup.import'));

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

    beforeEach(inject(function (appLangTranslate, rpNotificationModel, importGlAccMsgModel) {
        translator = appLangTranslate;
        notificationModel = rpNotificationModel();
        model = importGlAccMsgModel;
    }));

    it('on getGlAccsError should show error message for get gl accounts error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.getGlAccsError(resp);
        expect(called).toBe(true);
    });

    it('on getChartsError should show error message for get charts error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.getChartsError(resp);
        expect(called).toBe(true);
    });

    it('on getPropertiesError should show error message for get properties error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.getPropertiesError(resp);
        expect(called).toBe(true);
    });

    it('on saveGlAccsError should show error message for saving gl accounts error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.saveGlAccsError(resp);
        expect(called).toBe(true);
    });

    it('on getStatusError should show error message for get status error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.getStatusError(resp);
        expect(called).toBe(true);
    });

    it('on getFiltOptionsError should show error message for get filter options error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.getFiltOptionsError(resp);
        expect(called).toBe(true);
    });

    it('on getStagingDataError should show error message for get staging data error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.getStagingDataError(resp);
        expect(called).toBe(true);
    });

    it('on delGlAccsError should show error message for delete gl accounts error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.delGlAccsError(resp);
        expect(called).toBe(true);
    });

    it('on getCsvTemplateError should show error message for get csv template error', function () {
        var resp = {
            status: 404,
            data: {
                message: "FILE_NOT_FOUND"
            }
        };
        var called = false;
        model.onFileNotFoundErr = function (resp) {
            called = true;
        };
        model.getCsvTemplateError(resp);
        expect(called).toBe(true);
    });

    it('on loadCSVFileError should show error message for load csv file error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.loadCSVFileError(resp);
        expect(called).toBe(true);
    });


    it('on getYardiPropError should show error message for get yardi properties error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.getYardiPropError(resp);
        expect(called).toBe(true);
    });

    it('on getYardiAccsError should show error message for get yardi gl accounts error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.getYardiAccsError(resp);
        expect(called).toBe(true);
    });

    it('on updateAccTypeError should show error message for update account type error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.updateAccTypeError(resp);
        expect(called).toBe(true);
    });

    it('on getChartDataError should show error message for get chart data error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.getChartDataError(resp);
        expect(called).toBe(true);
    });

    it('on delStagingDataError should show error message for delete staging data error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.delStagingDataError(resp);
        expect(called).toBe(true);
    });

    
    it('on updateWizStepError should show error message for update wizard step error', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM|Parameter Invalid"
            }
        };
        var called = false;
        model.onError = function (resp) {
            called = true;
        };
        model.updateWizStepError(resp);
        expect(called).toBe(true);
    });

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
        
        var message= "INVALID_PARAM|Parameter Invalid";

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

    it('on showSaveSuccessMessage should invoke notification model', function () {
        var called = false;
        model.showNotification = function (obj) {
            called = true;
        };

        model.showSaveSuccessMessage();
        expect(called).toBe(true);
    });

    it('on showAccUpdateSuccMessage should invoke notification model', function () {
        var called = false;
        model.showNotification = function (obj) {
            called = true;
        };

        model.showAccUpdateSuccMessage();
        expect(called).toBe(true);
    });

    it('on showDelGlsSuccMsg should invoke notification model', function () {
        var called = false;
        model.showNotification = function (obj) {
            called = true;
        };

        model.showDelGlsSuccMsg();
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

