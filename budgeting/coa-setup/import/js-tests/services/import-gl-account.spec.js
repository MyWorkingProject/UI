//Import GL Account Service unit test cases

describe("import gl accout service, unit test cases", function () {
    var svc, httpData, httpReturn, $q, $http, deferred, resourceCallData, returnData, $httpBackend;
    httpReturn = {};

    beforeEach(function () {
        module("budgeting.coaSetup.import");
    });

    beforeEach(function () {

        var spy3 = RealPage.spy();
        spy3._createMethods([
            'get',
            'delete',
            'put',
            'post'
        ]);
        function resourceMock() {
            return spy3;
        }

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
            $provide.value('$resource', resourceMock);
            $provide.value('$q', spy1);
            $provide.value('$http', spy2);
        });

        function injector(a, b, c, d, e) {
            $resource = b();
            $http = b;
            $q = c;
            $httpBackend = d;
            svc = e;
        }

        inject(['$resource', '$http', '$q', '$httpBackend', 'importGlService', injector]);
    });

    it('on getChartData get the service get call to fetch charts ', function () {
        var getData= [];

        var data = {
            chartID: 1
        };

        getData.push(data);

        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        $httpBackend.expectGET('/api/budgeting/coa/masterchart/:chartID').respond(expectedResponse);

        var output = svc.getChartData(getData);
    });

    it('method getStagingData calls getUrl method with get gl accounts', function () {
        var data = '?datafilter=123',
           output = svc.getStagingData();
        output.abort().get(1, '?datafilter=123');

        expect(httpData.url).toBe('/api/budgeting/coa/masterchart/1/glaccountstaging' + data);
        expect(httpData.method).toBe('GET');
        output.abort();
    });

    it('method getLrProps calls getUrl method with get properties of L&R', function () {
        var data = '?datafilter=123',
           output = svc.getLrProps();
        output.abort().get(1);

        expect(httpData.url).toBe('/api/budgeting/coa/lrmasterchart/1/lrmasterchartproperty');
        expect(httpData.method).toBe('GET');
        output.abort();
    });
});