

describe('contracts ex handling Module', function () {
    var model, appLangTranslate, contractsErrorHandling, contractsNotifications;


    beforeEach(module('budgeting.workspaces.contracts'));

    beforeEach(function () {

        var mocks = {
            'realpage.common.dialog': ['rpDialogModel']
        };

        RealPage.ngMocks.install(mocks);

        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var spy2 = RealPage.spy();
        spy2._createMethods(['showErrorInfo']);


        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('contractsNotifications', spy2);
        });


        function injector(a, b, c) {
            appLangTranslate = a;
            contractsNotifications = b;
            model = c;

        }

        inject(['appLangTranslate',
            'contractsNotifications',
            'contractsErrorHandling',
            injector]);
    });

    it('isStatus method called', function () {
        var resp = { status: 1 };

        model.isStatus(resp, 1);
    });

    it('isStatus method called', function () {
        var resp = { status: 2 };

        model.isStatus(resp, 1);
    });

    it('wrapShowMessage method calls notifications based on response from service', function () {
        var obj = {
            "INVALID_PARAM": {
                title: 'title',
                desc: 'desc',
                info: 'info',
                type: 'error'
            },
            "NOT_FOUND": {
                title: 'title',
                desc: 'desc',
                info: 'info',
                type: 'error'
            }
        };
        model.wrapShowMessage("INVALID_PARAM", obj);
        expect(contractsNotifications._called.showErrorInfo).toBe(true);

    });

    it('wrapShowMessage method calls notifications based on response from service if input not matches', function () {
        var obj = {
            "INVALID": {
                title: 'title',
                desc: 'desc',
                info: 'info',
                type: 'error'
            },
            "NOT_FOUND": {
                title: 'title',
                desc: 'desc',
                info: 'info',
                type: 'error'
            }
        };
        model.wrapShowMessage("INVALID_PARAM", obj);

    });

   

    it('getContractsException method', function () {
        var resp = { data: { message: "INVALID_PARAM" } };

        model.errorMsgs = {
            "getContractsException": {
                "INVALID_PARAM": {
                    title: 'title',
                    desc: 'desc',
                    info: 'info',
                    type: 'error'
                },
                "NOT_FOUND": {
                    title: 'title',
                    desc: 'desc',
                    info: 'info',
                    type: 'error'
                }
            }
        };
        model.getContractsException(resp);
    });

   
});

