// Roles List Actions Model Tests

describe('manageglaccount  createupdate Model', function () {
    var model, appLangTranslate, manageGlAccountModel, manageGLAccountsSvc, manageglNotifications, $q, $rootScope;

    beforeEach(module('budgeting.coaSetup.manageGlAccount'));

    beforeEach(function () {
        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var spy1 = RealPage.spy();
        spy1._createMethods(['updateSubscribe', 'isPropertyChart', 'getMasterChartID', 'getPropertyId']);



        var spy3 = RealPage.spy();
        spy3._createMethods(['getGlAccountGlById', 'getPropertyGlByID', 'updateGlAccount', 'updatePropertyGlAccount']);

        var spy4 = RealPage.spy();
        spy4._createMethods(['showSuccessNotification', 'showErrorNotification']);

        module(function ($provide) {
            $provide.value('manageGlAccountModel', spy1);
            $provide.value('appLangTranslate', spy2);
            $provide.value('manageGLAccountsSvc', spy3);
            $provide.value('manageglNotifications', spy4);
        });

        function injector(a, b, c, d, e, f, g) {
            manageGlAccountModel = a;
            appLangTranslate = b;
            manageGLAccountsSvc = c;
            manageglNotifications = d;
            model = e;
            $q = f;
            $rootScope = g;
        }

        inject(['manageGlAccountModel', 'appLangTranslate', 'manageGLAccountsSvc', 'manageglNotifications', 'createUpdateGlModel', '$q', '$rootScope', injector]);
    });


    it('slideToggleGlForm method shows and hides form', function () {
        model.slideGLToggle =
            {
                state: {
                    open: true
                },
                isGLSlideOn: true
            };
        model.slideToggleGlForm();
    });


    it('deactivateForm method shows and hides form', function () {
        model.slideGLToggle =
            {
                state: {
                    open: true
                },
                isGLSlideOn: true
            };
        model.deactivateForm();
    });


    //it('updateAccType method called', function () {
    //    model.form.accountTypeData= {
    //        options: [{
    //            "value": "1",
    //            "name": 'abc'
    //        }, {
    //            "value": "123",
    //            "name": 'a'
    //        }]
    //    };
    //    var initialData = {
    //        options: [{
    //            "value": "1",
    //            "name": 'abc'
    //        }]
    //    };

    //    var data = {
    //        options: [{
    //            "value": "123",
    //            "name": 'a'
    //        }]
    //    };
    //   model.updateAccType(data);
    //    expect(model.form.accountTypeData.options[0]).toBe(initialData)
    //    expect(model.form.accountTypeData.options[1]).toBe(data);
    //});

    it('updateAccType method called', function () {
        model.form.accountTypeData = {
            options: [{
                "value": "1",
                "name": 'abc'
            }, {
                "value": "123",
                "name": 'a'
            }]
        };
       var data= {
            options: [{
                "value": "1",
                "name": 'abc'
            }, {
                "value": "123",
                "name": 'a'
            }]
        };

        model.updateAccType(data);
    });

    it('updateFiltTypes method called', function () {
        model.form.filterOptions = {
            options: [{
                "value": "1",
                "name": 'abc'
            }, {
                "value": "123",
                "name": 'a'
            }]
        };
        var data = {
            options: [{
                "value": "1",
                "name": 'abc'
            }, {
                "value": "123",
                "name": 'a'
            }]
        };
        model.updateFiltTypes(data);
    });


    it('updateAccCategory method called', function () {
        model.form.accountCategoryData = {
            options: [{
                "value": "1",
                "name": 'abc'
            }, {
                "value": "123",
                "name": 'a'
            }]
        };
        var data = {
            options: [{
                "value": "1",
                "name": 'abc'
            }, {
                "value": "123",
                "name": 'a'
            }]
        };
        model.updateAccCategory(data);
    });


    it('hideGlImport method called', function () {
        model.form = {
            showGlImport: false
        };
        model.hideGlImport();
    });

    it('resetAccountCatForm method reset category dropdown', function () {
        model.form.accountCategoryData = {
            options: [{
                "value": "",
                "name": '-- Select Category --'
            }]
        };
        model.resetAccountCatForm();
    });

    it('getNewGlRecord method get data for new gl record', function () {
        model.form = {
            glAccountID: 1
        };
        manageGlAccountModel._returnData.getPropertyId = "0";
        var data = {
            "gLAccountID": 1,
            "masterChartID": 1,
            "gLAccountNumber": "123",
            "description": "abc",
            "accountTypeID": 1,
            "accountCategoryID": 1,
            "budgetUseOnly": true,
            "restrictPayroll": "true",
            "normalBalance": "credit",
            "accountLevelCode": "Detail",
            "parentAccount": "",
            "narrative": "test",
            "propertyID": "1",
            "status": "Active",
            "cAMexpense": false,
            "dataSource": ""
        };

        model.getNewGlRecord();
        model.getGLAccountID();
        model.getNewGlData(1);
    });

    it('getNewGlRecord method get data for new gl record by condition', function () {
        model.form = {
            glAccountID: ""
        };
        manageGlAccountModel._returnData.getPropertyId = "2";
        var data = {
            "gLAccountID": 1,
            "masterChartID": 1,
            "gLAccountNumber": "123",
            "description": "abc",
            "accountTypeID": 1,
            "accountCategoryID": 1,
            "budgetUseOnly": true,
            "restrictPayroll": "true",
            "normalBalance": "credit",
            "accountLevelCode": "Detail",
            "parentAccount": "",
            "narrative": "test",
            "propertyID": "0",
            "status": "Active",
            "cAMexpense": false,
            "dataSource": ""
        };

        model.getNewGlRecord();
        model.getGLAccountID();
        model.getNewGlData(1);
    });

    it('updateGlForm method called', function () {
        var data = {
            records: [{
                "glAccountID": 1,
                "masterChartID": 1,
                "glAccountNumber": "123",
                "description": "abc",
                "accountTypeID": 1,
                "accountCategoryID": 1,
                "budgetUseOnly": true,
                "restrictPayroll": "true",
                "normalBalance": "credit",
                "accountLevelCode": "Detail",
                "parentAccount": "",
                "narrative": "test",
                "propertyID": "0",
                "status": "Active",
                "cAMexpense": false,
                "dataSource": ""
            }]
        };
        model.updateGlForm(data);
    });

    it('resetForm method reset the form controls', function () {
        model.resetForm();
        expect(manageGlAccountModel._called.updateSubscribe).toBe(true);
    });

    it('loadResetForm called', function () {
        model.text = {
            formTitle: "new"
        };
        model.loadResetForm();
        model.editFormTitle("new");

    });

    it('loadResetForm called', function () {
        model.text = {
            formTitle: "update"
        };
        model.loadResetForm();
        model.editFormTitle("update");

    });
    it('loadResetForm called', function () {
        model.text = {
            formTitle: ""
        };
        model.loadResetForm();
        model.editFormTitle("");

    });

    it('showSuccessNotification calls the succss notification message', function () {
        model.showSuccessNotification();
        expect(manageglNotifications._called.showSuccessNotification).toBe(true);
    });

    it('getAccountType returns the gl type', function () {
        model.form = { accountType: "1" };
        model.getAccountType();
    });

    it('getAccountCategory returns the gl Category', function () {
        model.form = { getAccountCategory: "1" };
        model.getAccountCategory();
    });

    it('isNewGL verifies for new gl acocunt', function () {
        model.form = { glAccountID: "1" };
        model.isNewGL();
    });

    it('isNewGL verifies for new gl acocunt for condition IF', function () {
        model.form = { glAccountID: "" };
        model.isNewGL();
    });

    it('showSaveUpdErrorMessage shows DUPLICATE message after save or update', function () {
        var resp = { data: { message: "DUPLICATE" } };
        model.showSaveUpdErrorMessage(resp);
        expect(manageglNotifications._called.showErrorNotification).toBe(true);
    });

    it('showSaveUpdErrorMessage shows ADDED_TO_PROPERTYCHART message after save or update', function () {
        var resp = { data: { message: "ADDED_TO_PROPERTYCHART" } };
        model.showSaveUpdErrorMessage(resp);
        expect(manageglNotifications._called.showErrorNotification).toBe(true);
    });

    it('showSaveUpdErrorMessage shows message after save or update', function () {
        var resp = { data: { message: "" } };
        model.showSaveUpdErrorMessage(resp);

    });

    it('onfocusCall method update flag ', function () {
        model.types = { onfocus: true };
        model.onfocusCall(true);
    });

    it('enableAccountNumber method update flag for enabling gl number ', function () {
        model.form = { enbAccNumber: true };
        model.enableAccountNumber();
    });

    it('isOnFocus updates the flag ', function () {
        model.types = { onfocus: true };
        model.isOnFocus();
    });

    it("reset() should reset all data back to default values", function () {
        var state = { glAccountID: "" };

        model.form.glAccountID = state;
        expect(model.form.glAccountID).toBe(state);

        model.reset();
        expect(model.form.glAccountID).toEqual('');
    });


});

