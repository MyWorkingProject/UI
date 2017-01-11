//Import GL Account Service unit test cases

describe("import gl accout service, unit test cases", function () {
    var svc, httpData, httpReturn, $q, $http, $resource, deferred, resourceCallData, returnData, $httpBackend;
    httpReturn = {};

    beforeEach(function () {
        module("budgeting.coaSetup.importCategory");
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

        module(function ($provide) {
            $provide.value('$resource', resourceMock);
        });

        function injector(a, b, c) {
            $resource = a();
            $httpBackend = b;
            svc = c;
        }

        inject(['$resource', '$httpBackend', 'importCategoryService', injector]);
    });

    it('on getProps should get call to fetch props ', function () {
        //var getData = [];

        //var data = {
        //    chartID: 1
        //};

        //getData.push(data);

        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        $httpBackend.expectGET('/api/budgeting/common/osapropertycombo').respond(expectedResponse);

        var output = svc.getProps();
    });
});