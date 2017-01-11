

describe('Manage GL Accounts Actions Module', function () {
    var model, appLangTranslate, manageGlErrorHandling, manageglNotifications;
    

    beforeEach(module('budgeting.coaSetup.manageGlAccount'));

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
            $provide.value('manageglNotifications', spy2);
        });


        function injector(a, b, c) {
            appLangTranslate = a;
            manageglNotifications = b;
            model = c;

        }

        inject(['appLangTranslate',
            'manageglNotifications',
            'manageGlErrorHandling',
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
            "UNKNOWN_ERROR": {
                title: 'title',
                desc: 'desc',
                info: 'info',
                type: 'error'
            }
        };
        model.wrapShowMessage("INVALID_PARAM", obj);
        expect(manageglNotifications._called.showErrorInfo).toBe(true);

    });

    it('wrapShowMessage method calls notifications based on response from service if input not matches', function () {
        var obj = {
            "INVALID": {
                title: 'title',
                desc: 'desc',
                info: 'info',
                type: 'error'
            },
            "UNKNOWN_ERROR": {
                title: 'title',
                desc: 'desc',
                info: 'info',
                type: 'error'
            }
        };
        model.wrapShowMessage("INVALID_PARAM", obj);

    });

    it('getglListException method', function () {
        var resp = { data: { message: "INVALID_PARAM" } };

        model.errorMsgs = {
            "getglListException": {
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
        model.getglListException(resp);
    });

    it('masterChartFailure method', function () {
        var resp = { data: { message: "INVALID_PARAM" } };

        model.errorMsgs = {
            "masterChartFailure": {
                "INVALID_PARAM": {
                    title: 'title',
                    desc: 'desc',
                    info: 'info',
                    type: 'error'
                },
                "CHART_NOT_FOUND": {
                    title: 'title',
                    desc: 'desc',
                    info: 'info',
                    type: 'error'
                }
            }
        };
        model.masterChartFailure(resp);
    });

    it('getglByIDException method', function () {
        var resp = { data: { message: "INVALID_PARAM" } };

        model.errorMsgs = {
            "getglByIDException": {
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
        model.getglByIDException(resp);
    });

    it('actionsException method', function () {
        var resp = { data: { message: "INVALID_PARAM" } };

        model.errorMsgs = {
            "actionsException": {
                "INVALID_PARAM": {
                    title: 'title',
                    desc: 'desc',
                    info: 'info',
                    type: 'error'
                }
            }
        };
        model.actionsException(resp);
    });


    it('getAccTypesException method', function () {
        var resp = { data: { message: "INVALID_PARAM" } };

        model.errorMsgs = {
            "getAccTypesException": {
                "NOT_FOUND": {
                    title: 'title',
                    desc: 'desc',
                    info: 'info',
                    type: 'error'
                }
            }
        };
        model.getAccTypesException(resp);
    });

    it('getAccountcategoryException method', function () {
        var resp = { data: { message: "INVALID_PARAM" } };

        model.errorMsgs = {
            "getAccountcategoryException": {
                "INVALID_PARAM": {
                    title: 'title',
                    desc: 'desc',
                    info: 'info',
                    type: 'error'
                },
                "UNKNOWN_ERROR": {
                    title: 'title',
                    desc: 'desc',
                    info: 'info',
                    type: 'error'
                }
            }
        };
        model.getAccountcategoryException(resp);
    });

    it('showDeleteGlException method', function () {
        var resp = { data: { message: "INVALID_PARAM" } };

        model.errorMsgs = {
            "showDeleteGlException": {
                "INVALID_PARAM": {
                    title: 'title',
                    desc: 'desc',
                    info: 'info',
                    type: 'error'
                },
                "GLACCOUNT_USED_IN_PROPERTY": {
                    title: 'title',
                    desc: 'desc',
                    info: 'info',
                    type: 'error'
                }
            }
        };
        model.showDeleteGlException(resp);
    });

    it('updateWizStepError method', function () {
        var resp = { data: { message: "INVALID_PARAM" } };

        model.errorMsgs = {
            "updateWizStepError": {
                "INVALID_PARAM": {
                    title: 'title',
                    desc: 'desc',
                    info: 'info',
                    type: 'error'
                }
            }
        };
        model.updateWizStepError(resp);
    });

    it('wizAlertException method', function () {
        var resp = { data: { message: "INVALID" } };

        model.errorMsgs = {
            "wizNextAlert": {
                "INVALID": {
                    title: 'title',
                    desc: 'desc',
                    info: 'info',
                    type: 'error'
                }
            }
        };
        model.wizAlertException(resp);
    });
});

