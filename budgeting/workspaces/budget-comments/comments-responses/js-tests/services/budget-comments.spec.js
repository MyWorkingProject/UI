describe("budget comments service, unti test cases", function () {
    var svc, httpData, httpReturn, $q, $http, deferred, returnData, resourceCallData, $httpBackend;
    httpReturn = {};

    beforeEach(function () {
        module("budgeting.workspaces.budgetComments");
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

       
       /* returnData = {
            post: function (data) { }
        };*/

        var $resource;
        /* = function () {
            resourceCallData = arguments;
            return returnData;
        };*/

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

        inject(['$q', '$http', '$resource', '$httpBackend', 'commentsSvc', injector]);
    });



    it('should call getComments method of budget comments service', function () {
        var data = '?datafilter=123',
           output = svc.getComments(data);

        expect(httpData.url).toBe('/api/budgeting/coa/masterchart/clone/masterchartpropertyclonelist' + data);
        expect(httpData.method).toBe('GET');
    });

    it('AbortGet method returns svc reference of budget comments service', function () {
        expect(svc.abortGet()).toBe(svc);
    });

    it('AbortGet method should resolve promise and delete deferred of budget comments', function () {
        var data = '?datafilter=123';
        svc.getComments(data);
        expect(svc.getReq).not.toBe(undefined);
        expect(svc.getReq).toBe(deferred);

        svc.abortGet();
        expect(deferred._called.resolve).toBe(true);
        expect(svc.getReq).toBe(undefined);

        var out = svc.abortGet();
        expect(out).toBe(svc);
        
    });

});