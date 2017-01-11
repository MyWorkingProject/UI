describe("master chart service, unti test cases", function () {
    var svc, httpData, httpReturn, $q, $http, deferred, returnData, resourceCallData, $httpBackend;
    httpReturn = {};

    beforeEach(function () {
        module("budgeting.coaSetup.mastercharts");

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

        returnData = {
            putData: function (data) { }
        };

        var $resource = function () {
            resourceCallData = arguments;
            return returnData;
        };

        module(function ($provide) {

            $provide.value('$resource', $resource);
            $provide.value('$q', spy1);
            $provide.value('$http', spy2);
        });

        function injector(a, b, c, d, e) {
            $q = a;
            $http = b;
            $httpBackend = d;
            svc = e;

        }

        inject(['$resource', '$q', '$http', '$httpBackend', 'masterChartsListSvc', injector]);
    });



    it('Verification of master chart list from service', function () {
        var data = '?datafilter=123',
           output = svc.getMasterchartList(data);

        expect(httpData.url).toBe('/api/budgeting/coa/masterchartlist' + data);
        expect(httpData.method).toBe('GET');
    });

    //it('AbortGet method returns svc reference', function () {
    //    expect(svc.abortGet()).toBe(svc);
    //});

    //it('abort method should resolve promise and delete deferred', function () {
    //    var data = '?datafilter=123';
    //    svc.getMasterchartList(data);
    //    expect(svc.getReq).not.toBe(undefined);
    //    expect(svc.getReq).toBe(deferred);

    //    svc.abort();
    //    expect(deferred._called.resolve).toBe(true);
    //    expect(svc.getReq).toBe(undefined);

    //    var out = svc.abortGet();
    //    expect(out).toBe(svc);

    //});


    it('method post calls, url and posts the data ', function () {
        var PostData = [];

        var data = {
            masterChartID: 1,
            isAlternativeCOA: false
        };

        PostData.push(data);

        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        $httpBackend.expectPOST('/api/budgeting/coa/masterchart/:masterChartID/:isAlternativeCOA').respond(expectedResponse);

        var output = svc.copyMasterChart(PostData);


    });


    //it('abortPut method should resolve promise and delete deferred', function () {
    //    var PostData = [];

    //    var data = {
    //        masterChartID: 1,
    //        isAlternativeCOA: false
    //    };

    //    PostData.push(data);

    //    var expectedResponse = {
    //        "messageId": 200,
    //        "messageText": "Success",
    //        "statusCode": 0
    //    }

    //    $httpBackend.expectDELETE('/api/budgeting/coa/masterchart/:masterChartID/:isAlternativeCOA').respond(expectedResponse);

    //    var output = svc.copyMasterChart(PostData);
    //});



});
