describe("property chart service, unti test cases", function () {
    var svc, httpData, httpReturn, $q, $http, deferred;
    httpReturn = {};

    beforeEach(function () {
        module("budgeting.coaSetup.propertyChart");
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

        module(function ($provide) {
            $provide.value('$q', spy1);
            $provide.value('$http', spy2);
        });

        function injector(a, b, c) {
            $q = a;
            $http = b;
            svc = c;
        }

        inject(['$q', '$http', 'propertyChartSvc', injector]);
    });


    /* this is For $Resource Parameters ,Start $Resource*/

    //it("Should demonstrate the get method data from the property chart service", inject(function ($httpBackend, propertyChartSvc, $window) {
    //    var result = {}, svc = propertyChartSvc, responseData;
    //    responseData = {
    //        data: {
    //            "records": {
    //                "propertyID": 1193451,
    //                "propertyName": "Autumn Chase",
    //                "clonedMasterChartID": 36,
    //                "clonedMasterChartName": "2013 Fairhaven  Senior",
    //                "lastModifiedByName": "Internal Administrator",
    //                "lastModifiedDate": "02/25/2016",
    //                "totalRecords": 1
    //            }
    //        }
    //    };


    //    var dataFilter = { "sortBy": {}, "filterBy": { "propertyName": "" }, "pages": { "startRow": 0, "resultsPerPage": 100 } };



    //    $httpBackend.whenGET(/.*?api\/budgeting\/coa\/propertychart\/propertymasterchartclonedlist\?datafilter=.*/g).respond(200, responseData);
    //    $httpBackend.expectGET(/.*?api\/budgeting\/coa\/propertychart\/propertymasterchartclonedlist\?datafilter=.*/g);


    //    svc.abort().get(dataFilter, function (response) {
    //        result.success = true;
    //        result.data = response.data;
    //    });

    //    $httpBackend.flush();

    //    expect(result.success).toBe(true);
    //    expect(result.data).toEqual(responseData.data);

    //}));

    /* End $Resource Unit Test Case */
    it('method get calls the service and verification of get property chart service method', function () {
        var data = '?datafilter=123',
           output = svc.get(data);

        expect(httpData.url).toBe('/api/budgeting/coa/propertychart/propertymasterchartclonedlist' + data);
        expect(httpData.method).toBe('GET');
    });

    it('Abort method returns svc reference', function () {
        expect(svc.abort()).toBe(svc);
    });

    it('Abort method should resolve promise and delete deferred', function () {
        var data = '?datafilter=123';
        svc.get(data);
        expect(svc.deferred).not.toBe(undefined);
        expect(svc.deferred).toBe(deferred);

        svc.abort();
        expect(deferred._called.resolve).toBe(true);
        expect(svc.deferred).toBe(undefined);

        var out = svc.abort();
        expect(out).toBe(svc);

        //expect(svc.deferred).toBe(deferred);
    });



});
