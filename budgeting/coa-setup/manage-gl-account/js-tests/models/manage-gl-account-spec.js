

describe('Manage GL Accounts Module', function () {
    var model, appLangTranslate, manageGLAccountsSvc, rpWizardNavModel, manageGlErrorHandling, stateParams,
       newMasterchartModel, $location, $stateParams, $q, promise, $rootScope;


    beforeEach(module('budgeting.coaSetup.manageGlAccount'));

    beforeEach(function () {

        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var spy2 = RealPage.spy();
        spy2._createMethods(['getAccTypes', 'getAccCategory', 'getMasterChartData', 'updateWizStep']);

        var spy3 = RealPage.spy();
        spy3._createMethods(['edit']);

        var spy4 = RealPage.spy();
        spy4._createMethods(['path', 'absUrl', 'indexOf']);

        stateParams = { 'chartID': 1, 'type': 1 };

        var spy5 = RealPage.spy();
        spy5._createMethods(['masterChartFailure']);

        rpWizardNavModel = RealPage.spy();
        rpWizardNavModel._createMethods(['activate', 'enable', 'complete', 'prev']);

        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('manageGLAccountsSvc', spy2);
            $provide.value('newMasterchartModel', spy3);
            $provide.value('$location', spy4);
            $provide.value('$stateParams', stateParams);
            $provide.value('manageGlErrorHandling', spy5);
            $provide.value('rpWizardNavModel', rpWizardNavModel);

        });


        function injector(a, b, c, d, e, f, g, h, i) {
            appLangTranslate = a;
            manageGLAccountsSvc = b;
            newMasterchartModel = c;
            $location = d;
            $stateParams = e;
            manageGlErrorHandling = f;
            model = g;
            $q = h;
            $rootScope = i;
        }

        inject(['appLangTranslate',
            'manageGLAccountsSvc',
            'newMasterchartModel',
            '$location',
            '$stateParams',
            'manageGlErrorHandling',
            'manageGlAccountModel',
            '$q',
            '$rootScope',
            injector]);
    });


    it('isChartType function type of chart', function () {
        model.globalParams = { chartType: "0" };
        model.isChartType();
    });

    it('isChartType function type of chart', function () {
        model.globalParams = { chartType: "1" };
        model.isChartType();
    });

    it('isAccountCategory returns the account category value', function () {
        model.types = { flagAccountCategory: true };
        model.isAccountCategory();
    });

    it('getMasterChartID  returns the getMasterChartID', function () {
        model.globalParams = { masterChartID: 1 };
        model.getMasterChartID();
    });

    it('getPropertyId   returns the getPropertyId ', function () {
        model.globalParams = { propertyId: 1 };
        model.getPropertyId();
    });

    it('isAddedToSite returns the isAddedToSite value', function () {
        var records = { isAddedToSite: true };
        model.types = { isAddedToSite: true };
        model.isAddedToSite(records);
    });

    it('isAddedToSiteFlag  returns the isAddedToSiteFlag value', function () {
        model.types = { isAddedToSite: true };
        model.isAddedToSiteFlag();
    });

    it('getEditParams returns the account category value', function () {
        var paramsData = {
            "masterChartID": 1,
            "propertyID": 1,
            "glAccountID": 1
        };
        var records = { glAccountID: 1 };
        model.getEditParams(records);
    });

    it('initializeParams method assign data to prams on load of page', function () {
        model.globalParams = { masterChartID: 1 };
        model.globalParams = { chartType: 1 };

        model.types = {
            importGLPath: "/admin/coa/wiz/imprt/1",
            wizard: true,
            masterChartName: "",
            isAlternateChart:""
        };

        var reqdata = {
            "wizardType": "MasterChart",
            "referenceID":1,
            "stepID": 4
        };

        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.getMasterChartData = {
            $promise: promise
        };

        var paramsData = {
            masterChartID: 1
        };

        var data = {

            "records": [
              {
                  "masterChartID": 40,
                  "name": "Commerial COA",
                  "accountPrefix": "",
                  "accountSuffix": "",
                  "field1": "None",
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
        model.initializeParams();
        model.updateChartID(1);
        model.updateChartType("1");
        model.checkMode("budgeting/app/#/admin/coa/wiz");
        model.getMasterChartData(paramsData);
        Defered.resolve(data);
        $rootScope.$apply();
    });


    it('getEditParams returns the account category value', function () {
        var paramsData = {
            "masterChartID": 1,
            "propertyID": 1,
            "glAccountID": 1
        };
        var records = { glAccountID: 1 };
        model.getEditParams(records);
    });

    it('initializeParams method assign data to prams on load of page for else block', function () {
        model.globalParams = { masterChartID: 1 };
        model.globalParams = { chartType: 1 };

        model.types = {
            importGLPath: "/admin/coa/wiz/imprt/1",
            wizard: false,
            masterChartName: "",
            isAlternateChart: ""
        };

        var reqdata = {
            "wizardType": "MasterChart",
            "referenceID": 1,
            "stepID": 4
        };

        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.getMasterChartData = {
            $promise: promise
        };

        var paramsData = {
            masterChartID: 1
        };

        var data = {

            "records": [
              {
                  "masterChartID": 40,
                  "name": "Commerial COA",
                  "accountPrefix": "",
                  "accountSuffix": "",
                  "field1": "None",
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
        model.initializeParams();
        model.updateChartID(1);
        model.updateChartType();
        model.checkMode("budgeting/app/#/admin/coa/wiz");
        model.getMasterChartData(paramsData);
        Defered.resolve(data);
        $rootScope.$apply();
    });

    it('updateChartType method set type of chart', function () {
        model.globalParams = { chartType: "0" };
        model.updateChartType("0");
        model.setChartsFlag();
    });

    it('updateSubscribe method sets subscribe flag', function () {
        model.types = { subscribed: true };
        model.updateSubscribe(true);
    });

    it('isPropertyChart  method returns PropertyChart  flag', function () {
        model.types = { isPropertyChart: true };
        model.isPropertyChart();
    });


    it('navToWizard   method sets wizord', function () {
        model.types = { wizard: true };
        model.navToWizard();
        expect(rpWizardNavModel._called.activate).toBe(true);
    });

    it('navToWizard   method sets wizord', function () {
        model.types = { wizard: false };
        model.navToWizard();       
    });

    it('completeEnableWiz   method sets wizord', function () {
        model.types = { isAlternateChart: false };
        model.completeEnableWiz();
        expect(rpWizardNavModel._called.enable).toBe(true);
    });

    it('completeEnableWiz   method sets wizord', function () {
        model.types = { isAlternateChart: true };
        model.completeEnableWiz();
       // expect(rpWizardNavModel._called.enable).toBe(true);
    });

    it('updateWizNext    method sets wizord', function () {
        model.types = { isAlternateChart: true };
        model.text = { btnNext: "Finish" };
        model.updateWizNext();        
    });


    it('wizBackClick method sets wizord', function () {
        model.types = { isAlternateChart: true };
        model.text = { btnNext: "Finish" };
        model.wizBackClick();
        expect(rpWizardNavModel._called.complete).toBe(true);
        expect(rpWizardNavModel._called.prev).toBe(true);
    });

    
    it("getAccTypes, gets list of account types", function () {

        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.getAccTypes = {
            $promise: promise
        };

        var masterchartId = 1;
        var data = {"messageId": 200,
            "messageText": "Success",
            "totalRecords": 0,
            "records": [
              {
                  "value": 1,
                  "name": "Asset"
              },
              {
                  "value": 2,
                  "name": "Liability"
              }]
        };

        model.getAccTypes();
        Defered.resolve(data);
        $rootScope.$apply();      
    });

    it("getAccTypes, gets list of account types", function () {

        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.getAccCategory = {
            $promise: promise
        };

        var params = {
            masterChartID: 1,
            accountTypeID: 1
        };

        var data = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 0,
            "records": [
              {
                  "value": 1,
                  "name": "Asset"
              },
              {
                  "value": 2,
                  "name": "Liability"
              }]
        };

        model.getAccCategory(params);
        Defered.resolve(data);
        $rootScope.$apply();
    });

    it("updateWizStep , update wiz steps service call", function () {

        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.updateWizStep = {
            $promise: promise
        };

        var reqdata = {
            "wizardType": "MasterChart",
            "referenceID": 1,
            "stepID": 4
        };

        var data = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 0,
            "records": [
              {
                  "value": 1,
                  "name": "Asset"
              },
              {
                  "value": 2,
                  "name": "Liability"
              }]
        };

        model.updateWizStep();
        Defered.resolve(data);
        $rootScope.$apply();
    });

    it('reset model resets the model', function () {
        model.globalParams = { chartType: "1" };


        var state = { isPropertyChart: false };
        model.types.isPropertyChart = state;
        expect(model.types.isPropertyChart).toBe(state);
        model.reset();
        expect(model.types.isPropertyChart).toEqual(false);

        expect(newMasterchartModel._called.edit).toBe(true);
    });

    it('reset model resets the model for else condition', function () {
        model.globalParams = { chartType: "0" };
        var state = { isPropertyChart: false };
        model.types.isPropertyChart = state;
        expect(model.types.isPropertyChart).toBe(state);
        model.reset();
        expect(model.types.isPropertyChart).toEqual(false);
    });

});

