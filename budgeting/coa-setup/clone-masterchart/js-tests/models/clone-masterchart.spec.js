describe("clone chart model, grid data", function () {
    var model, cloneSVC, gridModel, chartConfig, appTranslate, notificationModel, grid, brdCum, newChartSVC, newChartModel, $filter, $location, chartNotification;
    var resourceCallData, returnData, $q, promise, spy5, $rootScope;
    beforeEach(module("budgeting.coaSetup.cloneMasterchart"));


    beforeEach(function () {
        gridModel = RealPage.spy();
        gridModel._createMethods(['subscribe', 'setConfig', 'setEmptyMsg', 'busy', 'flushData', 'getQuery', 'setData', 'addData', 'setFilterState']);


        /*   returnData = {
               get: {
                   a: 100
               },
               save: {
                   b: 300
               }
           };
   
           var $resource = function () {
               resourceCallData = arguments;
               return returnData;
           };*/


        var spy1 = function () {
            return gridModel;
        };

        var spy2 = RealPage.spy();

        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy3 = function (name) {
            appTranslate.name = name;
            return appTranslate;
        };

        var spy4 = RealPage.spy();
        spy4._createMethods(['wrapShowMsg', 'getCloneChartError', 'wizardFailure']);

        cloneSVC = RealPage.spy();
        cloneSVC._createMethods(['get', 'then', 'abortGet', 'updateWizStep', 'abortPut', 'post', 'cloneMasterChart']);

        spy5 = RealPage.spy();
        spy5._createMethods(['getMasterChartData', 'then']);

        /*  promise = $q.defer().promise;
  
          spy5._returnData.getMasterChartData = {
              $promise: promise
          };*/

        var spy6 = RealPage.spy();
        spy6._createMethods(['edit', 'getEditState']);

        var spy7 = RealPage.spy();
        spy7._createMethods(['updateCurrent']);

        var spy8 = RealPage.spy();
        spy8._createMethods(['path', 'absUrl']);

        module(function ($provide) {
            $provide.value('rpGridModel', spy1);
            $provide.value('cloneMasterChartConfig', spy2);
            $provide.value('appLangTranslate', spy3);
            $provide.value('cloneChartNotification', spy4);
            $provide.value('cloneMasterChartSvc', cloneSVC);
            $provide.value('newMasterchartSVC', spy5);
            $provide.value('newMasterchartModel', spy6);
            $provide.value('rpBreadcrumbsModel', spy7);
            $provide.value('$location', spy8);
            // $provide.value('$resource', $resource);
            //$provide.service('propertyChartSvc', spy5);
        });

    });

    beforeEach(function () {
        function injector(a, b, c, d, e, f, g, h, i, j, k, l, m) {
            appTranslate = a;
            $filter = b;
            $location = c;
            cloneSVC = d;
            brdCum = e;
            newChartSVC = f;
            newChartModel = g;
            grid = h();
            chartNotification = i;
            chartConfig = j;
            model = k;
            $q = l;
            $rootScope = m;
        }

        inject([
             'appLangTranslate', '$filter', '$location',
            'cloneMasterChartSvc',
            'rpBreadcrumbsModel',
            'newMasterchartSVC',
            'newMasterchartModel',
            'rpGridModel', 'cloneChartNotification', 'cloneMasterChartConfig', 'cloneMasterChartModel', '$q', '$rootScope', injector]);
        //chartSVC.getPropertyChartList = function () {
        //};
    });

    it("init model, should subscribed to events and config", function () {
        expect(model.grid).not.toBe(undefined);
        expect(grid._called.subscribe).toBe(true);
        expect(grid._called.setConfig).toBe(true);
        expect(grid._callData.setConfig[0]).toBe(chartConfig);
        expect(grid._called.setEmptyMsg).toBe(true);
        //expect(grid._callData.setEmptyMsg[0]).toBe('No results were found.');
    });

    it("load model, should fetch the data and bind the data", function () {
        model.load();
        expect(grid._called.flushData).toBe(true);
        expect(grid._called.busy).toBe(true);
        expect(grid._callData.busy[0]).toBe(true);
        expect(cloneSVC._called.abortGet).toBe(true);
        expect(cloneSVC._called.get).toBe(true);
        expect(cloneSVC._called.then).toBe(true);
        expect(cloneSVC._callData.then[0]).toBe(model.setGridData);
    });

    it("paginate model, should fetch the data and bind the data", function () {
        model.paginate();
        expect(grid._called.getQuery).toBe(true);
        expect(cloneSVC._called.abortGet).toBe(true);
        expect(cloneSVC._called.get).toBe(true);
        expect(cloneSVC._called.then).toBe(true);
        expect(cloneSVC._callData.then[0]).toBe(model.addGridData);
    });

    it("get grid data, should return model grid data", function () {
        var gridData = model.getData();
    });

    it("set Grid Data model, bind the data to grid", function () {
        var response = { data: { ID: "1" } };
        model.setGridData(response);
        expect(grid._called.setData).toBe(true);
        expect(grid._callData.setData[0]).toBe(response.data);
        expect(grid._called.busy).toBe(true);
        //expect(grid._called.busy[0]).toBe(false);

    });

    it("add grid data  model, add the data to grid", function () {
        var response = { data: { ID: "1" } };
        model.addGridData(response);
        expect(grid._called.addData).toBe(true);
        expect(grid._callData.addData[0]).toBe(response.data);
    });


    it("set Grid Filter State model, add the data to grid", function () {
        var state = {};
        model.setGridFilterState(state);
        expect(grid._called.setFilterState).toBe(true);
        expect(grid._callData.setFilterState[0]).toBe(state);

    });

    it("reset grid data, for intial select", function () {
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": false,
                "totalRecords": 1
            }]
        };

        model.resetCloneData(data);
    });

    it("update wizard step, when it is in wizard and success is called", function () {

        var Defered = $q.defer();
        promise = Defered.promise;

        cloneSVC._returnData.updateWizStep = {
            $promise: promise
        };

        var masterChartID = 1;
        var data = { records: { name: "Test Chart" }, status: 200 };

        model.updateWizardStep(masterChartID);
        Defered.resolve(data);
        $rootScope.$apply();
        expect(cloneSVC._called.updateWizStep).toBe(true);

        
       /* var reqdata = {
            "wizardType": "MasterChart",
            "referenceID": masterChartID,
            "stepID": 5
        };
        model.updateWizardStep(masterChartID);
        expect(cloneSVC._called.updateWizStep).toBe(true);
        expect(cloneSVC._callData.updateWizStep[0].referenceID).toBe(masterChartID);
        expect(cloneSVC._called.then).toBe(true); */
    });

    it("update wizard step, when it is in wizard and failure in update wizard", function () {

        var Defered = $q.defer();
        promise = Defered.promise;

        cloneSVC._returnData.updateWizStep = {
            $promise: promise
        };

        var masterChartID = 1;
        var data = { records: { name: "Test Chart" }, status: 200 };

        model.updateWizardStep(masterChartID);
        Defered.reject(data);
        $rootScope.$apply();
        expect(chartNotification._called.wizardFailure).toBe(true);


        /* var reqdata = {
             "wizardType": "MasterChart",
             "referenceID": masterChartID,
             "stepID": 5
         };
         model.updateWizardStep(masterChartID);
         expect(cloneSVC._called.updateWizStep).toBe(true);
         expect(cloneSVC._callData.updateWizStep[0].referenceID).toBe(masterChartID);
         expect(cloneSVC._called.then).toBe(true); */
    });

    it("update wizard succeess, navigate to master chart list", function () {
        model.updateWizardSuccess();
        expect($location._called.path).toBe(true);
        expect($location._callData.path[0]).toBe('/admin/coa');
    });

    it("update chart edit state , when it is wizard mode ", function () {
        var path = '/admin/coa/wiz/new/normal';
        $location._returnData.absUrl = path;
        model.updateState();
        expect(newChartModel._called.edit).toBe(true);
        expect(newChartModel._callData.edit[0]).toBe(true);
    });

    it("update chart edit state , when it is not in wizard mode and new chart model is not already edited", function () {
        var path = '/admin/coa/normal';
        $location._returnData.absUrl = path;
        newChartModel._returnData.getEditState = false;
        model.updateState();
        expect(newChartModel._called.getEditState).toBe(true);
        expect(newChartModel._called.edit).toBe(true);
        expect(newChartModel._callData.edit[0]).toBe(false);
    });

    it("update chart edit state , when it is not in wizard mode and new chart model is already edited", function () {
        var path = '/admin/coa/normal';
        $location._returnData.absUrl = path;
        newChartModel._returnData.getEditState = true;
        model.updateState();
        expect(newChartModel._called.getEditState).toBe(true);
    });

    it("verifying isWizard method", function () {
        var path = '/admin/coa/wiz/new/normal';
        $location._returnData.absUrl = path;
        model.isWizard();
    });

    it("verifying isWizard method", function () {
        var path = '/admin/coa/normal';
        $location._returnData.absUrl = path;
        model.isWizard();
    });

    it("calling save data method, when data is selected and success", function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        cloneSVC._returnData.cloneMasterChart = {
            $promise: promise
        };

        var path = '/admin/coa/wiz/new/normal';
        $location._returnData.absUrl = path;


        var Defered1 = $q.defer();
        var promise1 = Defered1.promise;

        cloneSVC._returnData.updateWizStep = {
            $promise: promise1
        };

        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": 2,
                "totalRecords": 1
            }]
        };
        var postData = model.getPostData(data);
        model.saveData(data);
       /* expect(cloneSVC._called.abortPut).toBe(true);
        expect(cloneSVC._called.post).toBe(true);
        //expect(cloneSVC._called.post[0]).toBe(postData);
        expect(cloneSVC._called.then).toBe(true);
        expect(cloneSVC._callData.then[0]).toBe(model.saveSuccessCallBack);*/

       

        var masterChartID = 1;
        var Testdata = { records: { name: "Test Chart" }, status: 200 };

        model.saveData(data);
        Defered.resolve(Testdata);
        $rootScope.$apply();
        expect(cloneSVC._called.cloneMasterChart).toBe(true);

    });


    it("calling save data method, when data is selected and failure in data updation", function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        cloneSVC._returnData.cloneMasterChart = {
            $promise: promise
        };

        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": 2,
                "totalRecords": 1
            }]
        };
        var postData = model.getPostData(data);
        model.saveData(data);
       

        

        var masterChartID = 1;
        var Testdata = { records: { name: "Test Chart" }, status: 200 };

        model.saveData(data);
        Defered.reject(Testdata);
        $rootScope.$apply();
        expect(chartNotification._called.getCloneChartError).toBe(true);

    });

    it("calling save data method, when data is not selected", function () {
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": false,
                "masterChartID": 2,
                "totalRecords": 1
            }]
        };
        var postData = model.getPostData(data);
        model.saveData(data);
    });

    it("calling save call back method, when it is wizard mode", function () {
        var path = '/admin/coa/wiz/new/normal';
        $location._returnData.absUrl = path;
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": 2,
                "totalRecords": 1
            }]
        };
        var postData = model.getPostData(data);
        var Defered = $q.defer();
        promise = Defered.promise;

        cloneSVC._returnData.updateWizStep = {
            $promise: promise
        };
        model.saveSuccessCallBack();
    });

    it("calling save call back method, when it is not wizard mode", function () {
        var path = '/admin/coa/normal';
        $location._returnData.absUrl = path;
        model.saveSuccessCallBack();
    });

    it("calling update Breadcrumbs method, and resolving the promise method", function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        spy5._returnData.getMasterChartData = {
            $promise: promise
        };

        var data = { records: { name: "Test Chart" }, status: 200 };

        model.updateBreadcrumbs(1);
        Defered.resolve(data);
        $rootScope.$apply();
        expect(newChartSVC._called.getMasterChartData).toBe(true);
        //expect(newChartSVC._called.then).toBe(true);
        //expect(newChartSVC._called.then[0]).toBe(model.getMasterChartSuccess);
        //expect(cloneSVC._called.abortPut).toBe(true);
        //expect(cloneSVC._called.post).toBe(true);
    });

    it("calling update Breadcrumbs method, and rejecting the promise", function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        spy5._returnData.getMasterChartData = {
            $promise: promise
        };

        var data = { records: { name: "Test Chart" }, status: 200 };

        model.updateBreadcrumbs(1);
        Defered.reject(data);
        $rootScope.$apply();
        expect(chartNotification._called.getCloneChartError).toBe(true);
    });

    it("calling service get master chart method", function () {
        var params = {
            chartID: 1
        };
        model.getChartPromise(params);
    });


    it("calling get master chart success,", function () {
        var data = {
            "records":
            {
                "name": "Test Chart",
                "totalRecords": 1
            }
        };

        model.getMasterChartSuccess(data);
        expect(brdCum._called.updateCurrent).toBe(true);
    });

    it("calling set initial method, when edit chart", function () {
        var currentPath = '/admin/coa/editmasterchart';
        var type = "normal";
        model.setInitials(currentPath, type);
    });

    it("calling set initial method, not edit chart", function () {
        var currentPath = '/admin/coa/wiz';
        var type = "normal";
        model.setInitials(currentPath, type);

    });

    it("calling getIsEditMode method", function () {
        model.getIsEditMode();
    });

    it("calling getIsWizard  method", function () {
        model.getIsWizard();
    });

    it("calling wizard failure  method, when status is 400", function () {
        var response = { status: 400, data: { message: "Invalid_param" } };
        model.wizardFailure(response);
        expect(chartNotification._called.wrapShowMsg).toBe(true);
    });

    it("calling wizard failure  method, when status is 200", function () {
        var response = { status: 2000, data: { message: "success" } };
        model.wizardFailure(response);
        expect(chartNotification._called.wrapShowMsg).toBe(undefined);
    });


});