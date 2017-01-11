describe("New master chart model", function () {
    beforeEach(module("budgeting.coaSetup.newMasterchart"));
    var wizNavModel, $location, appLangTranslate, chartSVC, dialogModel, brcmModel, errorModel, formModel, model, form, state;
    var $q, promise, $rootScope;

    beforeEach(function () {
        var mockRpDialog = {
            'rp.common.dialog': ['rpDialogModel']
        };
        RealPage.ngMocks.install(mockRpDialog);
    });

    beforeEach(function () {

        var spy1 = RealPage.spy();
        spy1._createMethods(['absUrl', 'path']);

        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var spy3 = RealPage.spy();
        spy3._createMethods(['saveNewMasterChart', 'saveMasterChart', 'updateWizStep', 'getMasterChartData']);

        var spy4 = RealPage.spy();
        spy4._createMethods(['assignChartName', 'masterChartFailure', 'masterChartFailureresponse']);

        var spy5 = RealPage.spy();
        spy5._createMethods(['getFieldOptions', 'getSeperatorOptions', 'updateAccountStructureLabl', 'updateMasterChartID',
            'hasCustomStructure', 'updateFormCustomDetails', 'setFields', 'setDelimiters', 'updateFormDetail',
            'showField2', 'resetFormCustomDetails', 'unSetCompletedSteps', 'showField3', 'showField4', 'isDefaultField1', 'updateData',
            'isEditChart', 'isNewChart', 'getWizPostData', 'updateWizardSuccess', 'getMasterPostData']);

        var spy6 = RealPage.spy();
        spy6._createMethods(['updateCurrent']);

        module(function ($provide) {
            $provide.value("$location", spy1);
            $provide.value('appLangTranslate', spy2);
            $provide.value('newMasterchartSVC', spy3);
            $provide.value('newMasterchartErrorModel', spy4);
            $provide.value('newMasterchartFormModel', spy5);
            $provide.value('rpBreadcrumbsModel', spy6);
        });

        function injector(a, b, c, d, e, f, g, h, i, j) {
            appLangTranslate = a;
            chartSVC = b;
            dialogModel = c();
            $location = d;
            brcmModel = e;
            errorModel = f;
            formModel = g;
            model = h;
            $q = i;
            $rootScope = j;
        }

        inject(['appLangTranslate', 'newMasterchartSVC', 'rpDialogModel', '$location',
            'rpBreadcrumbsModel', 'newMasterchartErrorModel', 'newMasterchartFormModel', 'newMasterchartModel', '$q', '$rootScope', injector]);

        form = {
            masterChartID: 0,
            name: "",
            isAlternativeCOA: false,
            isCustomAccount: false,
            accountPrefix: "",
            accountSuffix: "",
            field1: "None",
            delimiter1: "None",
            field2: "None",
            delimiter2: "None",
            field3: "None",
            delimiter3: "None",
            field4: "None",
            responseID: 0,
            showField2: false,
            showField3: false,
            showField4: false,
            infoToolTip: false

        };

        state = {
            edit: false,
            ready: false,
            inEditChart: false
            //dupName: false
        };

    });

    afterEach(function () {
        dialogModel._reset();
    });

    it("calling model edit state and verifying the return data", function () {
        model.state.edit = true;
        var outPut = model.getEditState();
        expect(outPut).toBe(true);
    });

    it("calling model reset method and verifying the return data", function () {
        model.resetModel();
        expect(model.form).toEqual(form);
        expect(model.state).toEqual(state);
    });

    it("model edit, when parameter is undefined", function () {
        model.state.edit = true;
        var outPut = model.edit(undefined);
        expect(outPut).toBe(true);
    });

    it("model edit, when parameter is boolean, verifying that passed parameter is set to edit", function () {
        model.state.edit = false;
        var outPut = model.edit(true);
        expect(model.state.edit).toBe(true);
    });

    it("verifying update of ineditchart object", function () {
        model.state.inEditChart = false;
        var outPut = model.updateInEditChart(true);
        expect(model.state.inEditChart).toBe(true);
    });

    it("Getting the state object", function () {
        var outPut = model.getState();
        expect(outPut).toEqual(state);
    });

    it("Getting the duplicate err value", function () {
        model.showDupErr = true;
        var outPut = model.isDuplicateError();
        expect(outPut).toBe(true);
    });

    it("calling undo changes and verifying the data isretored to original state", function () {
        model.form.masterChartID = 1;
        model.dataCopy = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 1,
            "records": [
              {
                  "masterChartID": 36,
                  "name": "2013 Fairhaven  Senior",
                  "accountPrefix": "",
                  "accountSuffix": "",
                  "field1": "Prefix",
                  "delimiter1": "-",
                  "field2": "Suffix",
                  "delimiter2": ",",
                  "field3": "Property number",
                  "delimiter3": ".",
                  "field4": "G/L account code",
                  "isAlternativeCOA": false
              }
            ],
            "statusCode": 0
        };
        model.undoChanges();
        expect(model.form).toEqual(form);
        expect(formModel._called.updateMasterChartID).toBe(true);
        expect(formModel._called.updateFormDetail).toBe(true);
    });

    it("Verifying that wizard status is updated correctly, when true is passed", function () {
        var status = true;
        model.updateWizardStatus(status);
        expect(model.wizard).toBe(status);
    });

    it("Verifying that wizard status is updated correctly, when false is passed", function () {
        var status = false;
        model.updateWizardStatus(status);
        expect(model.wizard).toBe(status);
    });

    it("get the wizard status when it is false", function () {
        var status = false;
        model.updateWizardStatus(status);
        status = model.getWizardStatus(status);
        expect(status).toBe(false);
    });

    it("get the wizard status when it is true", function () {
        var status = true;
        model.updateWizardStatus(status);
        status = model.getWizardStatus(status);
        expect(status).toBe(true);
    });

    it("Should update the lables when chart is normal chart", function () {
        var type = "normal";
        model.lableText.chartText = "Normal text";
        model.placeHolder.chartName = "Normal text";
        model.updateLableText(type);
        expect(model.lableText.chartText).not.toBe("Normal text");
        expect(model.placeHolder.chartName).not.toBe("Normal text");
    });

    it("Should update the lables when chart is alt chart", function () {
        var type = "alt";
        model.lableText.chartText = "Alt text";
        model.placeHolder.chartName = "Alt text";
        model.updateLableText(type);
        expect(model.lableText.chartText).not.toBe("Alt text");
        expect(model.placeHolder.chartName).not.toBe("Alt text");
    });

    it("Should not update the lables when chart is invalid chart", function () {
        var type = "invalid";
        model.lableText.chartText = "Alt text";
        model.placeHolder.chartName = "Alt name";
        model.updateLableText(type);
        expect(model.lableText.chartText).toBe("Alt text");
        expect(model.placeHolder.chartName).toBe("Alt name");
    });

    it("Verifying that edit mode is updated correctly, when true is passed", function () {
        var status = true;
        model.setEditMode(status);
        expect(model.isEditMode).toBe(status);
    });

    it("Verifying that edit mode is updated correctly, when false is passed", function () {
        var status = false;
        model.setEditMode(status);
        expect(model.isEditMode).toBe(status);
    });

    it("get the edit mode when it is false", function () {
        var status = false;
        model.setEditMode(status);
        status = model.getEditMode(status);
        expect(status).toBe(false);
    });

    it("get the edit mode when it is true", function () {
        var status = true;
        model.setEditMode(status);
        status = model.getEditMode(status);
        expect(status).toBe(true);
    });

    it("updating master chart id, when it is in wizard step", function () {
        var masterChartID = 1;
        model.wizard = true;
        model.form = form;
        model.updateMasterChartID(masterChartID);
        expect(formModel._called.unSetCompletedSteps).toBe(true);
        expect(formModel._called.updateMasterChartID).toBe(true);
    });

    it("updating master chart id, when it is not in wizard step", function () {
        var masterChartID = 1;
        model.wizard = false;
        model.form = form;
        model.updateMasterChartID(masterChartID);
        expect(formModel._called.unSetCompletedSteps).toBe(undefined);
        expect(formModel._called.updateMasterChartID).toBe(true);
    });

    it("calling show field2  method, verifying it is called", function () {
        model.form = form;
        model.showField2(form, true);
        expect(formModel._called.showField2).toBe(true);
    });

    it("calling show field3  method, verifying it is called", function () {
        model.form = form;
        model.showField3(form, true);
        expect(formModel._called.showField3).toBe(true);
    });

    it("calling show field4  method, verifying it is called", function () {
        model.form = form;
        model.showField4(form, true);
        expect(formModel._called.showField4).toBe(true);
    });

    it("verifying the custom account of chart ,when it is true", function () {
        model.form.isCustomAccount = true;
        var outPut = model.isCustomAccnt();
        expect(outPut).toBe(true);
    });

    it("verifying the custom account of chart ,when it is false", function () {
        model.form.isCustomAccount = false;
        var outPut = model.isCustomAccnt();
        expect(outPut).toBe(false);
    });

    it("verifying the isDefaultField1 of model", function () {
        model.form = form;
        model.isDefaultField1();
        expect(formModel._called.isDefaultField1).toBe(true);
        expect(formModel._callData.isDefaultField1[0]).toBe(form);
    });

    it("verifying the updateModelData of model, when data has custom account structure and it is normal chart", function () {
        var chartdata = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 1,
            "records": [
              {
                  "masterChartID": 36,
                  "name": "2013 Fairhaven  Senior",
                  "accountPrefix": "",
                  "accountSuffix": "",
                  "field1": "Prefix",
                  "delimiter1": "-",
                  "field2": "Suffix",
                  "delimiter2": ",",
                  "field3": "Property number",
                  "delimiter3": ".",
                  "field4": "G/L account code",
                  "isAlternativeCOA": false
              }
            ],
            "statusCode": 0
        };
        model.form = form;
        formModel._returnData.hasCustomStructure = true;
        model.updateModelData(chartdata);
        expect(formModel._called.updateFormDetail).toBe(true);
        expect(errorModel._called.assignChartName).toBe(true);
        expect(formModel._called.hasCustomStructure).toBe(true);
        expect(formModel._called.showField2).toBe(true);
        expect(formModel._called.updateFormCustomDetails).toBe(true);
        expect(formModel._called.setFields).toBe(true);
        expect(formModel._called.setDelimiters).toBe(true);
    });

    it("verifying the updateModelData of model, when data does not has custom account structure and it is normal chart", function () {
        var chartdata = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 1,
            "records": [
              {
                  "masterChartID": 36,
                  "name": "2013 Fairhaven  Senior",
                  "accountPrefix": "",
                  "accountSuffix": "",
                  "field1": "Prefix",
                  "delimiter1": "-",
                  "field2": "",
                  "delimiter2": ",",
                  "field3": "",
                  "delimiter3": ".",
                  "field4": "",
                  "isAlternativeCOA": false
              }
            ],
            "statusCode": 0
        };
        model.form = form;
        formModel._returnData.hasCustomStructure = false;
        model.updateModelData(chartdata);
        expect(formModel._called.updateFormDetail).toBe(true);
        expect(errorModel._called.assignChartName).toBe(true);
        expect(formModel._called.hasCustomStructure).toBe(true);
        expect(formModel._called.resetFormCustomDetails).toBe(true);
        expect(model.accountStructure).toBe("");
        expect(formModel._called.showField2).toBe(true);
    });

    it("verifying the updateModelData of model, when data has custom account structure and it is alternate chart", function () {
        var chartdata = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 1,
            "records": [
              {
                  "masterChartID": 36,
                  "name": "2013 Fairhaven  Senior",
                  "accountPrefix": "",
                  "accountSuffix": "",
                  "field1": "Prefix",
                  "delimiter1": "-",
                  "field2": "Suffix",
                  "delimiter2": ",",
                  "field3": "Property number",
                  "delimiter3": ".",
                  "field4": "G/L account code",
                  "isAlternativeCOA": true
              }
            ],
            "statusCode": 0
        };
        model.form = form;
        formModel._returnData.hasCustomStructure = true;
        model.updateModelData(chartdata);
        expect(formModel._called.updateFormDetail).toBe(true);
        expect(errorModel._called.assignChartName).toBe(true);
        expect(formModel._called.hasCustomStructure).toBe(true);
        expect(formModel._called.showField2).toBe(true);
        expect(formModel._called.updateFormCustomDetails).toBe(true);
        expect(formModel._called.setFields).toBe(true);
        expect(formModel._called.setDelimiters).toBe(true);
    });

    it("verifying the reset custom structure of model", function () {
        model.form = form;
        model.resetStructure();
        expect(formModel._called.resetFormCustomDetails).toBe(true);
        expect(formModel._callData.resetFormCustomDetails[0]).toBe(form);
        expect(model.accountStructure).toBe("");
    });

    it("verifying the update show error name when parameter is true", function () {
        var shwErro = true;
        model.updateShowErr(shwErro);
        expect(model.showNameErr).toBe(shwErro);
    });

    it("verifying the update show error name when parameter is false", function () {
        var shwErro = false;
        model.updateShowErr(shwErro);
        expect(model.showNameErr).toBe(shwErro);
    });

    it("verifying isvalid data method when chart name is defined", function () {
        model.form = form;
        model.form.name = "Test chart";
        var outPut = model.isValidData();
        expect(model.showNameErr).toBe(false);
        expect(outPut).toBe(true);
    });

    it("verifying isvalid data method when chart name is not defined", function () {
        model.form = form;
        var outPut = model.isValidData();
        expect(outPut).toBe(false);
    });

    it("verifying update custom account structure lable is called", function () {
        model.form = form;
        model.updateAccountStructureLabl();
        expect(formModel._called.updateAccountStructureLabl).toBe(true);
        expect(formModel._callData.updateAccountStructureLabl[0]).toBe(form);
    });

    it("verifyingmodel update form data method", function () {
        model.form = form;
        model.updateFormData("normal");
        expect(formModel._called.updateData).toBe(true);
        expect(formModel._callData.updateData[0]).toBe(form);
    });

    it("verifying model get form data method, should return form data when it does not have custm structure", function () {
        model.form = form;
        model.form.isCustomAccount = false;
        var newForm = model.getFormData();
        expect(formModel._called.resetFormCustomDetails).toBe(true);
        expect(formModel._callData.resetFormCustomDetails[0]).toBe(form);
        expect(newForm).toBe(form);
    });

    it("verifying model get form data method, should return form data when it does have custm structure", function () {
        model.form = form;
        model.form.isCustomAccount = true;
        var newForm = model.getFormData();
        expect(newForm).toBe(form);
    });

    it("calling set intials method, verifying initial data is set when it is int edit chart mode", function () {
        formModel._returnData.isEditChart = true;
        model.setInitials();
        expect(model.isEditMode).toBe(true);
        expect(model.wizard).toBe(false);
        expect(brcmModel._called.updateCurrent).toBe(true);
    });

    it("calling set intials method, verifying initial data is set when it is not in edit chart mode", function () {
        formModel._returnData.isEditChart = false;
        model.setInitials();
        expect(model.state.edit).toBe(true);
        expect(model.wizard).toBe(true);
        expect(brcmModel._called.updateCurrent).toBe(true);
    });

    it("calling new chart method, verifying the chart is new", function () {
        model.form = form;
        model.isNewChart();
        expect(formModel._called.isNewChart).toBe(true);
        expect(formModel._callData.isNewChart[0]).toBe(form);
    });

    it("calling has chart id method when it is in edit mode", function () {
        model.form = form;
        model.isEditMode = true;
        var outPut = model.hasChartID();
        expect(outPut).toBe(true);
    });

    it("calling has chart id method when chart id is greater than 0", function () {
        model.form = form;
        model.form.masterChartID = 2;
        var outPut = model.hasChartID();
        expect(outPut).toBe(true);
    });

    it("calling has chart id method when chart id is 0 and not in edit model", function () {
        model.form = form;
        model.form.masterChartID = 0;
        model.isEditMode = false;
        var outPut = model.hasChartID();
        expect(outPut).toBe(false);
    });

    it("calling model submit when new chart is created, verifying that the data is posted correctly", function () {
        model.form = form;
        model.form.name = "Test chart";
        model.form.masterChartID = 0;
        model.isEditMode = false;

        var Defered = $q.defer();
        promise = Defered.promise;

        chartSVC._returnData.saveNewMasterChart = {
            $promise: promise
        };

        var testData = {
            "messageId": 69,
            "messageText": "Success",
            "statusCode": 0
        };

        var Defered1 = $q.defer();
        var promise1 = Defered1.promise;

        chartSVC._returnData.updateWizStep = {
            $promise: promise1
        };

        var path = '/admin/coa/wiz/new/normal';
        $location._returnData.absUrl = path;

        model.submit();
        Defered.resolve(testData);
        var data1 = testData;
        Defered1.resolve(data1);
        $rootScope.$apply();
        expect(chartSVC._called.saveNewMasterChart).toBe(true);
        expect(errorModel._called.assignChartName).toBe(true);
    });

    it("calling model submit when new chart is created, verifying when error is returned while saving data", function () {
        model.form = form;
        model.form.name = "Test chart";
        model.form.masterChartID = 0;
        model.isEditMode = false;

        var Defered = $q.defer();
        promise = Defered.promise;

        chartSVC._returnData.saveNewMasterChart = {
            $promise: promise
        };

        var data = {
            "messageId": 69,
            "messageText": "Success",
            "statusCode": 0
        };

        model.submit();
        Defered.reject(data);
        $rootScope.$apply();
        expect(chartSVC._called.saveNewMasterChart).toBe(true);
        expect(errorModel._called.assignChartName).toBe(true);
        expect(errorModel._called.masterChartFailure).toBe(true);
    });

    it("calling model submit when existing chart is saved, verifying that the data is posted correctly", function () {
        model.form = form;
        model.form.name = "Test chart";
        model.form.masterChartID = 1;
        model.isEditMode = true;

        var Defered = $q.defer();
        promise = Defered.promise;

        chartSVC._returnData.saveMasterChart = {
            $promise: promise
        };

        var testData = {
            "messageId": 69,
            "messageText": "Success",
            "statusCode": 0
        };


        var path = '/admin/coa/wiz/new/normal';
        $location._returnData.absUrl = path;

        var Defered1 = $q.defer();
        var promise1 = Defered1.promise;

        chartSVC._returnData.getMasterChartData = {
            $promise: promise1
        };

        model.submit();
        Defered.resolve(testData);
        var data1 =
            {
                "messageId": 200,
                "messageText": "Success",
                "totalRecords": 1,
                "records": [
                  {
                      "masterChartID": 69,
                      "name": "Testing Saving 123",
                      "accountPrefix": "1",
                      "accountSuffix": "",
                      "field1": "Prefix",
                      "delimiter1": " ",
                      "field2": "None",
                      "delimiter2": " ",
                      "field3": "None",
                      "delimiter3": " ",
                      "field4": "None",
                      "isAlternativeCOA": false
                  }
                ],
                "statusCode": 0
            };
        Defered1.resolve(data1);
        $rootScope.$apply();
        expect(chartSVC._called.saveMasterChart).toBe(true);
        expect(errorModel._called.assignChartName).toBe(true);
    });

    it("calling model submit when existing chart is saved, verifying when error is returned while saving data", function () {
        model.form = form;
        model.form.name = "Test chart";
        model.form.masterChartID = 2;
        model.isEditMode = true;

        var Defered = $q.defer();
        promise = Defered.promise;

        chartSVC._returnData.saveMasterChart = {
            $promise: promise
        };

        var data = {
            "messageId": 69,
            "messageText": "Success",
            "statusCode": 0
        };

        model.submit();
        Defered.reject(data);
        $rootScope.$apply();
        expect(chartSVC._called.saveMasterChart).toBe(true);
        expect(errorModel._called.assignChartName).toBe(true);
        expect(errorModel._called.masterChartFailure).toBe(true);
    });

    it("calling model chart failure method, when response text is duplicate", function () {
        
        var response = {
            "status": 400,
            data: { "messageText": "DUPLICATE" }
        };

        model.masterChartFailure(response);
    });

    it("calling model chart failure method, when response text is other than duplicate", function () {

        var response = {
            "status": 400,
            data: { "messageText": "PARAM" }
        };

        model.masterChartFailure(response);
        expect(errorModel._called.masterChartFailureresponse).toBe(true);
    });

    it("calling check duplicate method, verifying passed data is returned", function () {

        model.showDupErr = true;

        var outPut= model.checkDuplicate();
        expect(outPut).toBe(model.showDupErr);
    });

    it("calling add validatorws when duplcate error", function () {
        model.showDupErr = true;
        var outPut = model.addDupValidators();
    });

    it("calling add validatorws when no duplcate error", function () {
        model.showDupErr = false;
        var outPut = model.addDupValidators();
    });

    it("calling edit chart success, when it is wizard", function () {
        var data = {};
        model.wizard = true;
        model.form = form;
        model.editMasterChartSuccess(data);
    });

    it("calling edit chart success, when it is not wizard", function () {
        var data = {};
        model.wizard = false;
        model.form = form;
        var Defered1 = $q.defer();
        var promise1 = Defered1.promise;

        chartSVC._returnData.getMasterChartData = {
            $promise: promise1
        };

        model.editMasterChartSuccess(data);

        var data1 =
            {
                "messageId": 200,
                "messageText": "Success",
                "totalRecords": 1,
                "records": [
                  {
                      "masterChartID": 69,
                      "name": "Testing Saving 123",
                      "accountPrefix": "1",
                      "accountSuffix": "",
                      "field1": "Prefix",
                      "delimiter1": " ",
                      "field2": "None",
                      "delimiter2": " ",
                      "field3": "None",
                      "delimiter3": " ",
                      "field4": "None",
                      "isAlternativeCOA": false
                  }
                ],
                "statusCode": 0
            };
        Defered1.resolve(data1);
        $rootScope.$apply();
    });

    it("calling new chart chart success, when returned messgae id is 0", function () {
        var data = { messageId :0};
        model.newMasterChartSuccess(data);
    });

    it("calling new chart chart success, when returned messgae id is greater then 0 and it is in wizard, and also verifying wizard is updated", function () {
        var data = { messageId: 20 };
        var path = '/admin/coa/wiz/new/normal';
        $location._returnData.absUrl = path;
        var testData = {
            "messageId": 69,
            "messageText": "Success",
            "statusCode": 0
        };
        var Defered1 = $q.defer();
        var promise1 = Defered1.promise;

        chartSVC._returnData.updateWizStep = {
            $promise: promise1
        };
        model.newMasterChartSuccess(data);
      
        Defered1.resolve(testData);
        $rootScope.$apply();

        expect(chartSVC._called.updateWizStep).toBe(true);
    });

    it("calling new chart chart success, when returned messgae id is greater then 0 and it is not in wizard, then it should redirect to import gl page", function () {
        var data = { messageId: 20 };
        var path = '/admin/coa/normal';
      
        $location._returnData.absUrl = path;
        model.newMasterChartSuccess(data);
        expect($location._callData.path[0]).toBe('/admin/coa/import/' + data.messageId);
      
    });

    it("shoudl return the promise of get update wizard step", function () {
        var testData = {
            "messageId": 69,
            "messageText": "Success",
            "statusCode": 0
        };
        var Defered1 = $q.defer();
        var promise1 = Defered1.promise;

        chartSVC._returnData.updateWizStep = {
            $promise: promise1
        };

        var data = { messageId: 20 };
        var outPrms = model.getUpdateWizPostPromise(data);
        expect(outPrms).toBe(promise1);
        expect(formModel._called.getWizPostData).toBe(true);

    });

    it("shoudl call form model wizard success method", function () {
        var data = { messageId: 20 };
        model.updateWizardSuccess(data);
        expect(formModel._called.updateWizardSuccess).toBe(true);
        expect(model.form.responseID).toBe(0);

    });

    it("calling update duplicate message method", function () {
        model.updateDuplicateMsg();
    });

    it("verifying get master chart data method", function () {
        var Defered1 = $q.defer();
        var promise1 = Defered1.promise;

        chartSVC._returnData.getMasterChartData = {
            $promise: promise1
        };
        model.form = form;
        model.getMasterChartData();
        expect(formModel._called.getMasterPostData).toBe(true);
        expect(chartSVC._called.getMasterChartData).toBe(true);
    });

    it("verifying get master chart promise", function () {
        var Defered1 = $q.defer();
        var promise1 = Defered1.promise;

        chartSVC._returnData.getMasterChartData = {
            $promise: promise1
        };
        model.form = form;
        var promise= model.geetGetMasterchartPromise();
        expect(formModel._called.getMasterPostData).toBe(true);
        expect(chartSVC._called.getMasterChartData).toBe(true);
        expect(promise).toBe(promise1);
    });

    it("shoudl update the breadcum", function () {
        var txt = "New chart";
        model.updateBreadCum(txt);
        expect(brcmModel._called.updateCurrent).toBe(true);
        expect(brcmModel._callData.updateCurrent[0]).toEqual({ text: txt });
    });

    it("should copy the data to data copy and update the bread cum when it is int edit mode", function () {
        var data1 =
           {
               "messageId": 200,
               "messageText": "Success",
               "totalRecords": 1,
               "records": [
                 {
                     "masterChartID": 69,
                     "name": "Testing Saving 123",
                     "accountPrefix": "1",
                     "accountSuffix": "",
                     "field1": "Prefix",
                     "delimiter1": " ",
                     "field2": "None",
                     "delimiter2": " ",
                     "field3": "None",
                     "delimiter3": " ",
                     "field4": "None",
                     "isAlternativeCOA": false
                 }
               ],
               "statusCode": 0
           };
        model.isEditMode = true;
        model.wizard = false;
        model.getMasterChartSuccess(data1);
        expect(brcmModel._called.updateCurrent).toBe(true);
        expect(brcmModel._callData.updateCurrent[0]).toEqual({ text: data1.records[0].name });
        expect(model.dataCopy).toEqual(data1);
    });

    it("should copy the data to data copy and update the bread cum when it has chart ID ", function () {
        var data1 =
           {
               "messageId": 200,
               "messageText": "Success",
               "totalRecords": 1,
               "records": [
                 {
                     "masterChartID": 69,
                     "name": "Testing Saving 123",
                     "accountPrefix": "1",
                     "accountSuffix": "",
                     "field1": "Prefix",
                     "delimiter1": " ",
                     "field2": "None",
                     "delimiter2": " ",
                     "field3": "None",
                     "delimiter3": " ",
                     "field4": "None",
                     "isAlternativeCOA": false
                 }
               ],
               "statusCode": 0
           };
        model.isEditMode = true;
        model.wizard = true;
        model.formf = form;
        model.form.masterChartID = 1;
        model.getMasterChartSuccess(data1);
        expect(brcmModel._called.updateCurrent).toBe(true);
        expect(brcmModel._callData.updateCurrent[0]).toEqual({ text: data1.records[0].name });
        expect(model.dataCopy).toEqual(data1);
    });

    it("should update the form tool tip property to false when it is true", function () {
        model.form.infoToolTip = true;
        model.showModelHelpInfo();
        var outPut = model.isHelpIconInfo();
        expect(outPut).toBe(false);
    });

    it("should update the form tool tip property to true when it is false", function () {
        model.form.infoToolTip = false;
        model.showModelHelpInfo();
        var outPut = model.isHelpIconInfo();
        expect(outPut).toBe(true);
    });

    it("should get the infotolltip property ", function () {
        model.form.infoToolTip = false;
        var outPut = model.isHelpIconInfo();
        expect(outPut).toBe(false);
    });

    it("should get the infotolltip property ", function () {
        model.form.infoToolTip = true;
        var outPut = model.isHelpIconInfo();
        expect(outPut).toBe(true);
    });

    it("should set the infotolltip property when it is set to true", function () {
        var property = true;
        model.setHelpIconInfo(property);
        var outPut = model.isHelpIconInfo();
        expect(outPut).toBe(property);
    });

    it("should set the infotolltip property when it is set to false", function () {
        var property = false;
        model.setHelpIconInfo(property);
        var outPut = model.isHelpIconInfo();
        expect(outPut).toBe(property);
    });

});