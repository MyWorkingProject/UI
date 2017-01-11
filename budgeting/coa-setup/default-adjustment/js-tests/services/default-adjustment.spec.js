describe("default adjustment service, unti test cases", function () {
    var svc, httpData, httpReturn, $q, $http, deferred, returnData, resourceCallData, $httpBackend;
    httpReturn = {};

    beforeEach(function () {
        module("budgeting.coaSetup.defaultAdjustment");
        //module("ngResource");

    });

    beforeEach(function () {
        deferred = RealPage.spy();
        deferred._createMethods(['promise', 'resolve']);

        var spy1 = RealPage.spy();
        spy1._createMethods(['defer']);
        spy1._returnData.defer = deferred;

        var spy2 = function (data) {
            httpData = data;
            return httpReturn;
        };

        //var spy3 = RealPage.Spy();

        returnData = {
            get: function (data) { },
            put: function (data) { }
        };

        var $resource = function () {
            resourceCallData = arguments;
            return returnData;
        };

        module(function ($provide) {
            $provide.value('$q', spy1);
            $provide.value('$http', spy2);
            $provide.value('$resource', $resource);
            //$provide.value('$resource', $httpBackend)
        });

        function injector(a, b, c, d, e) {
            $q = a;
            $http = b;
            //$resource = c;
            //$resource = c;
            $httpBackend = d;
            svc = e;

        }

        inject(['$q', '$http', '$resource', '$httpBackend', 'defaultAdjustmentList', injector]);
    });



    it('method get CategoryData calls getUrl method ', function () {
        var data = '?datafilter=123', params = { chartID: 1 };
        var output = svc.getCategoryData(params, data);

        expect(httpData.url).toBe('/api/budgeting/coa/masterchart/1/categorydefaultadjestment' + data);
        expect(httpData.method).toBe('GET');
    });

    it('Abort Get CategoryData method returns svc reference', function () {
        expect(svc.abortGetCategoryData()).toBe(svc);
    });

    it('Abort Get CategoryData should resolve promise and delete deferred', function () {
        var data = '?datafilter=123';
        svc.getCategoryData(data);
        expect(svc.getReq).not.toBe(undefined);
        expect(svc.getReq).toBe(deferred);

        svc.abortGetCategoryData();
        expect(deferred._called.resolve).toBe(true);
        expect(svc.getReq).toBe(undefined);

        var out = svc.abortGetCategoryData();
        expect(out).toBe(svc);

        //expect(svc.deferred).toBe(deferred);
    });

    it('method get ChartName, url and get chart name method should be called ', function () {
       
        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        $httpBackend.expectGET('/api/budgeting/coa/masterchart/chartID').respond(expectedResponse);

        var output = svc.getChartName(1);

    });

    it('method get AccTypes, url and get AccTypes should be called ', function () {
     

        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        $httpBackend.expectGET('/api/budgeting/coa/accounttype/accounttypecombo').respond(expectedResponse);

        var output = svc.getAccTypes();

    });

    it('method get BdgtModel, url and get BdgtModel should be called ', function () {
      
        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        $httpBackend.expectGET('/api/budgeting/budgetmodel/budgetmodelyear').respond(expectedResponse);

        var output = svc.getBdgtModel();

    });

    it('method get getModels, url and get getModels should be called ', function () {

        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        var params = { year: 2016, type: "Budget" };
        $httpBackend.expectGET('/api/budgeting/budgetmodel/budgetyear/2016/budgettype/Budget/budgetmodelcombo').respond(expectedResponse);

        var output = svc.getModels(params);

    });

    it('method saveDefPer, url and save the data ', function () {
        var PostData = [];

        var data = {
            "masterChartID": -1,
            "propertyID": -1,
            "source": "MasterChart"
        };

        PostData.push(data);

        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        $httpBackend.expectPUT('/api/budgeting/coa/categorydefaultadjestment').respond(expectedResponse);

        var output = svc.saveDefPer(PostData);

        //$httpBackend.flush();

    });

    it('method applyBdgtmodel, url and save the data ', function () {
        var PostData = [];

        var data = {
            "masterChartID": -1,
            "propertyID": -1,
            "source": "MasterChart"
        };

        PostData.push(data);

        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        $httpBackend.expectPUT('/api/budgeting/coa/categorydefaultadjestment/apply').respond(expectedResponse);

        var output = svc.applyBdgtmodel(PostData);

        //$httpBackend.flush();

    });

   

});