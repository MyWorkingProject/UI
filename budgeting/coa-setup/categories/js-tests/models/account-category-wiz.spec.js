describe("account category wizard model", function () {

    var appLangTranslate, model, wizNavModel, svc, notification, dialogModel, coaRowErrorObject;
    var headerFooterList, addSubtractList, glVisbilityList, $q, $rootScope;

    beforeEach(module("budgeting.coaSetup.categories"));

    beforeEach(function () {
        var mocks = {
            'rp.common.dialog': ['rpDialogModel']
        };

        var mocksNot = {
            'rp.common.notification': ['rpNotificationModel']
        };

        RealPage.ngMocks.install(mocksNot);

        RealPage.ngMocks.install(mocks);

    });

    beforeEach(function () {
        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);


        var spy1 = RealPage.spy();


        var wizMethods = [
           'prev',
           'complete',
           'enable',
           'next', 'updateNavHref'
        ];

        wizNavModel = RealPage.spy();
        wizNavModel._createMethods(wizMethods);

        var svcMethod = ['post', 'then', 'updateWizStep'];
        svc = RealPage.spy();
        svc._createMethods(svcMethod);

        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        module(function ($provide) {
            $provide.value('appLangTranslate', spy2);
            $provide.value('rpWizardNavModel', wizNavModel);
            $provide.value('categoriesSVC', svc);
            // $provide.value('rpDialogModel', dialogModel);
        });

        function injector(a, b, c, d, e, f, g) {
            notification = a();
            appLangTranslate = b;
            dialogModel = c();
            svc = d;
            model = e;
            $q = f;
            $rootScope = g;
        }

        inject(['rpNotificationModel', 'appLangTranslate', 'rpDialogModel', 'categoriesSVC', 'accountCategoryWiz', '$q', '$rootScope', injector]);

        coaRowErrorObject = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: "Test",
                    desc: "Test"
                },
                "UNKNOWN_ERROR": {
                    title: "Test",
                    desc: "Test"
                }
            }
        };

        addSubtractList = {
            options: [{
                "name": "Add",
                "value": "Add"
            }, {
                "name": "Subtract",
                "value": "Subtract"
            }
            ]
        };

        headerFooterList = {
            options: [
                {
                    "name": "Do not show header and footer",
                    "value": "None"
                },
                {
                    "name": "Show only header",
                    "value": "Header"
                }, {
                    "name": "Show only footer",
                    "value": "Footer"
                }, {
                    "name": "Show header and footer",
                    "value": "HeaderFooter"
                }
            ]
        };

        glVisbilityList = {
            options: [{
                "name": "Show GL Account",
                "value": "1"
            }, {
                "name": "Do not show GL Account",
                "value": "0"
            }
            ]
        };
    });

    afterEach(function () {
        dialogModel._reset();
        notification._reset();
    });

    it("should return model accnt type error object", function () {
        var outPut = model.getAcctTypeErrorObj();
        expect(outPut.errorMsgs).not.toBe(undefined);
    });

    it("should return coa row eror object", function () {
        var outPut = model.getCoaErrorObj();
        expect(outPut.errorMsgs).not.toBe(undefined);
    });

    it("should return coa cat row eror object", function () {
        var outPut = model.getCatErrorObj();
        expect(outPut.errorMsgs).not.toBe(undefined);
    });

    it("verifying the wrap message when valid param is passed", function () {
        model.wrapShowMsg("INVALID_PARAM", coaRowErrorObject);
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);
    });

    it("verifying the wrap message when In valid param  msg is passed", function () {
        model.wrapShowMsg("NO_Data", coaRowErrorObject);
    });

    it("should return header footer list", function () {
        var outPut = model.getHeaderFooterList();
        expect(outPut).toEqual(headerFooterList);
    });

    it("should return add subtract list", function () {
        var outPut = model.getAddSubtractList();
        expect(outPut).toEqual(addSubtractList);
    });

    it("should return gl Visibility list", function () {
        var outPut = model.getGlVisbilityList();
        expect(outPut).toEqual(glVisbilityList);
    });

    it("should set the master chart id", function () {
        model.chartID = 2;
        model.setChartID(1);
        expect(model.chartID).toBe(1);
    });

    it("should set the isNext ", function () {
        model.isNext = false;
        model.setisNext(true);
        expect(model.isNext).toBe(true);
    });

    it("should call wiz model complte methods ", function () {
        model.updateWizardSuccess();
        expect(wizNavModel._called.complete).toBe(true);
        expect(wizNavModel._called.enable).toBe(true);
        expect(wizNavModel._called.next).toBe(true);
    });

    it("should update the wizard steps when service exceuted with no error", function () {
        model.isNext = true;
        var Defered = $q.defer();
        var promise = Defered.promise;

        svc._returnData.updateWizStep = {
            $promise: promise
        };

        var masterChartID = 1;
        var data = { records: { name: "Test Chart" }, status: 200 };

        model.updateWizard();
        Defered.resolve(data);
        $rootScope.$apply();

        expect(wizNavModel._called.complete).toBe(true);
        expect(wizNavModel._called.enable).toBe(true);
        expect(wizNavModel._called.next).toBe(true);
    
    });

    it("should not update the wizard steps when service exceuted with error", function () {
        model.isNext = true;
        var Defered = $q.defer();
        var promise = Defered.promise;

        svc._returnData.updateWizStep = {
            $promise: promise
        };

        var masterChartID = 1;
        var data = { data: { message: "Error" }, status: 400 };

        model.updateWizard();
        Defered.reject(data);
        $rootScope.$apply();

        expect(wizNavModel._called.complete).toBe(undefined);
   
    });

    it("should not update the wizard steps when isNext is fals and should show success message", function () {
        model.isNext = false;
        model.updateWizard();
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);

    });

    it("should return the param data and verifying the data", function () {
        model.chartID = 1;
        var reqdata = {
            "wizardType": "MasterChart",
            "referenceID": model.chartID,
            "stepID": 3
        };
        var outPut = model.getParamData();
        expect(outPut).toEqual(reqdata);
    });

    it("verifying the wizard failure method, when response is 400", function () {
        var response = { status: 400, data: { message: "INVALID_PARAM" } };
        model.wizardErrorObject = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: "Test",
                    desc: "Test desc"
                }
            }
        };
        model.wizardFailure(response);
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);
    });

    it("verifying the wizard failure method, when response is other than 400", function () {
        var response = { status: 500, data: { message: "success" } };
        model.wizardFailure(response);
    });

    it("verifying show success notification", function () {
        model.showSuccessNotification();
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);
    });

    it("verifying show notification method", function () {
        var data = { options: "Test" };
        model.showNotification(data);
        expect(notification._called.extend).toBe(true);
        expect(notification._callData.extend[0]).toBe(data);
        expect(notification._called.show).toBe(true);
    });

    it("verifying coa row save failure method, when error is 400", function () {
        model.saveErrorObject = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: "test",
                    desc: "Test"
                }
            }
        };
        var response = { status: 400, data: { message: "INVALID_PARAM" } };
        model.saveCOARowsFailure(response);
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);
    });

    it("verifying coa row save failure method, when error is other than  400", function () {
        model.saveErrorObject = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: "test",
                    desc: "Test"
                }
            }
        };
        var response = { status: 500, data: { message: "success" } };
        model.saveCOARowsFailure(response);
        expect(notification._called.extend).toBe(undefined);
        expect(notification._called.show).toBe(undefined);
    });

    it("verifying show Error Notification", function () {
        var msg = { title: "Test Title", desc: "Test desc" };
        model.showErrorNotification(msg);
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);
    });

    it("verifying show of no data message", function () {
        model.showNoDataMessage();
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);
    });


});