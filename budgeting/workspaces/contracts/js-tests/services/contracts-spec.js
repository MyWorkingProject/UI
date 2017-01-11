describe("Contracts service, unti test cases", function () {
    var svc, httpData, httpReturn, $q, $http, deferred, returnData, resourceCallData, $httpBackend;
    httpReturn = {};

    beforeEach(function () {
        module("budgeting.workspaces.contracts");

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

        function injector(a, b, d, e) {
            $q = a;
            $http = b;
            $httpBackend = d;
            svc = e;

        }

        inject([ '$q', '$http', '$httpBackend', 'contractsSvc', injector]);
    });



    it('method get calls get contracts method with data filters', function () {
        var params = {
            propertyID: 1
        };
        var data = '?datafilter=123',
           output = svc.getContractsList(params,data);

        expect(httpData.url).toBe('/api/budgeting/common/contracts/property/1/contractlist' + data);
        expect(httpData.method).toBe('GET');
    });


    it('getExpiredContractsList  ', function () {
        var params = {
            propertyID: 1
        };
        var data = '?datafilter=123',
           output = svc.getExpiredContractsList(params, data);

        expect(httpData.url).toBe('/api/budgeting/common/contracts/property/1/expired/contractlist' + data);
        expect(httpData.method).toBe('GET');
    });



});
