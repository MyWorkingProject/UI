describe("clone master chart service, unti test cases", function () {
    var svc, httpData, httpReturn, $q, $http, deferred, returnData, resourceCallData, $httpBackend;
    httpReturn = {};

    beforeEach(function () {
        module("budgeting.coaSetup.cloneMasterchart");
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
            post: function (data) { }
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

        inject(['$q', '$http', '$resource', '$httpBackend', 'cloneMasterChartSvc', injector]);
    });



    it('should call get method of clone chart service', function () {
        var data = '?datafilter=123',
           output = svc.get(data);

        expect(httpData.url).toBe('/api/budgeting/coa/masterchart/clone/masterchartpropertyclonelist' + data);
        expect(httpData.method).toBe('GET');
    });

    it('AbortGet method returns svc reference', function () {
        expect(svc.abortGet()).toBe(svc);
    });

    it('AbortGet method should resolve promise and delete deferred', function () {
        var data = '?datafilter=123';
        svc.get(data);
        expect(svc.getReq).not.toBe(undefined);
        expect(svc.getReq).toBe(deferred);

        svc.abortGet();
        expect(deferred._called.resolve).toBe(true);
        expect(svc.getReq).toBe(undefined);

        var out = svc.abortGet();
        expect(out).toBe(svc);

        //expect(svc.deferred).toBe(deferred);
    });


    it('method post calls, url and posts the data ', function () {
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

        $httpBackend.expectPUT('/api/budgeting/coa/masterchart/clone/propertymasterchart').respond(expectedResponse);

        var output = svc.cloneMasterChart(PostData);

        //$httpBackend.flush();

    });


    it('abortPut method returns svc reference', function () {
        //expect(svc.abortPut()).toBe(svc);
    });

    it('abortPut method should resolve promise and delete deferred', function () {
        /*  var data = '?datafilter=123';
          svc.post(data);
          expect(svc.putReq).not.toBe(undefined);
          expect(svc.putReq).toBe(deferred);
  
          svc.abortPut();
          expect(deferred._called.resolve).toBe(true);
          expect(svc.putReq).toBe(undefined);
  
          var out = svc.abortPut();
          expect(out).toBe(svc);
  
          //expect(svc.deferred).toBe(deferred);*/
    });

    it('method update wiz step, url and posts the data ', function () {
        var data = {
            "wizardType": "MasterChart",
            "referenceID": -1,
            "stepID": 5
        };

        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        $httpBackend.expectPUT('/api/budgeting/coa/masterchart/clone/propertymasterchart').respond(expectedResponse);

        var output = svc.updateWizStep(data);

        //$httpBackend.flush();

        // expect(httpData.url).toBe('/api/budgeting/common/wizard/wizardstatus');
        //expect(httpData.method).toBe('PUT');
    });

});