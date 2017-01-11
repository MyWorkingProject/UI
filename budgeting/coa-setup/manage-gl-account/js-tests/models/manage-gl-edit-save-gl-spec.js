// Roles List Actions Model Tests

describe('manageglaccount edit-save Model', function () {
    var model, createUpdateGlModel, manageGlAccountModel, manageGlErrorHandling, manageGLAccountsSvc, manageGlGridFactory, $q, $rootScope, promise;

    beforeEach(module('budgeting.coaSetup.manageGlAccount'));

    beforeEach(function () {
      

        var spy1 = RealPage.spy();
        spy1._createMethods(['getNewGlRecord', 'isNewGL', 'editFormTitle', 'slideToggleGlForm', 'showSuccessNotification', 'showSaveUpdErrorMessage', 'loadResetForm', 'updateGlForm', 'getAccountType', 'enableAccountNumber', 'resetAccountCatForm', 'updateAccCategory']);



        var spy2 = RealPage.spy();
        spy2._createMethods(['isAddedToSiteFlag', 'isPropertyChart', 'isAddedToSite', 'getEditParams', 'getAccCategory', 'getMasterChartID']);

        var spy3 = RealPage.spy();
        spy3._createMethods(['getglByIDException', 'getAccountcategoryException']);

        var spy4 = RealPage.spy();
        spy4._createMethods(['load']);

        var spy5 = RealPage.spy();
        spy5._createMethods(['saveGlAccount', 'getGlAccountGlById', 'getPropertyGlByID', 'updateGlAccount', 'updatePropertyGlAccount', 'getAccCategory','then']);

        module(function ($provide) {
            $provide.value('createUpdateGlModel', spy1);
            $provide.value('manageGlAccountModel', spy2);
            $provide.value('manageGlErrorHandling', spy3);
            $provide.value('manageGlGridFactory', spy4);
            $provide.value('manageGLAccountsSvc', spy5);
        });

        function injector(a, b, c, d, e, f, g,h) {
            createUpdateGlModel = a;
            manageGlAccountModel = b;
            manageGlErrorHandling = c;
            manageGlGridFactory = d;
            manageGLAccountsSvc = e;
            model = f;
            $q = g;
            $rootScope = h;
        }

        inject(['createUpdateGlModel', 'manageGlAccountModel', 'manageGlErrorHandling', 'manageGlGridFactory', 'manageGLAccountsSvc','manageGlEditSaveGl', '$q', '$rootScope', injector]);
    });


    it('onSaveUpdateGlSuccess called', function () {
        var data = {

        };
        model.onSaveUpdateGlSuccess(data);
        expect(createUpdateGlModel._called.editFormTitle).toBe(true);
        expect(createUpdateGlModel._called.slideToggleGlForm).toBe(true);
        expect(createUpdateGlModel._called.showSuccessNotification).toBe(true);
        expect(manageGlGridFactory._called.load).toBe(true);

    });

    it('saveUpdateGLAccount function saves gl based on conditions', function () {
        createUpdateGlModel._returnData.isNewGL = true;
        var Defered = $q.defer();
        promise = Defered.promise;        
        manageGLAccountsSvc._returnData.saveGlAccount = {
            $promise: promise
        };

        var paramsData = {
            "masterChartID": 1,
            "glAccountID": 1
        };
        var data = { records: { messageText: "Success" }, status: 200 };
        model.saveUpdateGLAccount();
        Defered.resolve(data);
        $rootScope.$apply();
    });

    it('saveUpdateGLAccount function saves gl based on conditions', function () {
        createUpdateGlModel._returnData.isNewGL = false;
        manageGlAccountModel._returnData.isAddedToSiteFlag = true;
        manageGlAccountModel._returnData.isPropertyChart = false;

        var Defered = $q.defer();
        promise = Defered.promise;
        manageGLAccountsSvc._returnData.updateGlAccount = {
            $promise: promise
        };

        var paramsData = {
            "masterChartID": 1,
            "glAccountID": 1
        };
        var data = { records: { messageText: "Success" }, status: 200 };
        model.saveUpdateGLAccount();
        Defered.resolve(data);
        $rootScope.$apply();
    });

    it('saveUpdateGLAccount function saves gl based on conditions', function () {
        createUpdateGlModel._returnData.isNewGL = false;
        manageGlAccountModel._returnData.isAddedToSiteFlag = false;
        manageGlAccountModel._returnData.isPropertyChart = true;

        var Defered = $q.defer();
        promise = Defered.promise;
        manageGLAccountsSvc._returnData.updatePropertyGlAccount = {
            $promise: promise
        };

        var paramsData = {
            "masterChartID": 1,
            "glAccountID": 1
        };
        var data = { records: { messageText: "Success" }, status: 200 };
        model.saveUpdateGLAccount();
        Defered.resolve(data);
        $rootScope.$apply();
    });

    it('showSaveUpdErrorMessage method returns error message on save', function () {
        var data = { records: { messageText: "error" }, status: 401 };
        model.showSaveUpdErrorMessage(data);
        expect(createUpdateGlModel._called.showSaveUpdErrorMessage).toBe(true);
    });

    
    it('editGLAccount functionget single record which is selected for edit', function () {
       
        manageGlAccountModel._returnData.isPropertyChart = false;
        createUpdateGlModel._returnData.getAccountType = 1;
       

        var Defered = $q.defer();
        promise = Defered.promise;
        manageGLAccountsSvc._returnData.getGlAccountGlById = {
            $promise: promise
        };

        var paramsData = {
            "masterChartID": 1,
            "propertyID": 1,
            "glAccountID": 1
        };

        var record = {
            "masterChartID": 1,
            "propertyID": 1,
            "glAccountID": 1
        };
        manageGlAccountModel._returnData.getEditParams = paramsData;

        var data = { records: { messageText: "Success" }, status: 200 };


        var Defered1 = $q.defer();
        var promise1 = Defered1.promise;
        manageGLAccountsSvc._returnData.getAccCategory = {
            $promise: promise1
        };



        model.editGLAccount(record);
        Defered.resolve(data);
        $rootScope.$apply();

        Defered1.resolve(data);
        $rootScope.$apply();

        expect(manageGlAccountModel._called.isAddedToSite).toBe(true);
        expect(createUpdateGlModel._called.loadResetForm).toBe(true);
        expect(createUpdateGlModel._called.editFormTitle).toBe(true);

    });


    it('editGLAccount functionget single record which is selected for edit for property chart', function () {

        manageGlAccountModel._returnData.isPropertyChart = true;
        createUpdateGlModel._returnData.getAccountType = 1;


        var Defered = $q.defer();
        promise = Defered.promise;
        manageGLAccountsSvc._returnData.getPropertyGlByID = {
            $promise: promise
        };

        var paramsData = {
            "masterChartID": 1,
            "propertyID": 1,
            "glAccountID": 1
        };

        var record = {
            "masterChartID": 1,
            "propertyID": 1,
            "glAccountID": 1
        };
        manageGlAccountModel._returnData.getEditParams = paramsData;

        var data = { records: { messageText: "Success" }, status: 200 };


        var Defered1 = $q.defer();
        var promise1 = Defered1.promise;
        manageGLAccountsSvc._returnData.getAccCategory = {
            $promise: promise1
        };



        model.editGLAccount(record);
        Defered.resolve(data);
        $rootScope.$apply();

        Defered1.resolve(data);
        $rootScope.$apply();

        expect(manageGlAccountModel._called.isAddedToSite).toBe(true);
        expect(createUpdateGlModel._called.loadResetForm).toBe(true);
        expect(createUpdateGlModel._called.editFormTitle).toBe(true);

    });

    it('loadAccountCategory function called', function () {    
        model.loadAccountCategory();
        expect(createUpdateGlModel._called.resetAccountCatForm).toBe(true);

    });
});

