describe("work flow status service, unti test cases", function() {
    var svc, httpData, httpReturn, $q, $http, deferred, returnData, resourceCallData, $httpBackend;
    httpReturn = {};

    beforeEach(function() {
        module("budgeting.workspaces.budgetWorkflowStatus");
        //module("ngResource");

    });

    beforeEach(function() {
        deferred = RealPage.spy();
        deferred._createMethods(['promise', 'resolve']);

        var spy1 = RealPage.spy();
        spy1._createMethods(['defer']);
        spy1._returnData.defer = deferred;

        var spy2 = function(data) {
            httpData = data;
            return httpReturn;
        };

        //var spy3 = RealPage.Spy();

        returnData = {
            putData: function(data) {},
            get: function(data) {}
        };

        var $resource = function() {
            resourceCallData = arguments;
            return returnData;
        };

        module(function($provide) {
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

        inject(['$q', '$http', '$resource', '$httpBackend', 'budgetWorkflowStatusSvc', injector]);
    });



    it('method work flow status service call, should get the list data ', function() {
        var data = '?datafilter=123',
            params = {
                statusType: "Approve"
            };
        var output = svc.getBudgetWorkFlowStatusList(params, data);

        expect(httpData.url).toBe('/api/budgeting/budgetmodel/sequence/Approve/budgetworkflowstatus' + data);
        expect(httpData.method).toBe('GET');

        //$httpBackend.flush();

    });

    it('method  update Workflow Status, post the data  ', function() {
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

        $httpBackend.expectPOST('/api/budgeting/budgetmodel/workflow/budgetstatus').respond(expectedResponse);

        var output = svc.updateWorkflowStatus(PostData);

    });


    it('method  get budget models service  ', function() {
        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        $httpBackend.expectGET('/api/budgeting/budgetmodel/budgetmodelyear').respond(expectedResponse);

        var output = svc.getBdgtModel();
    });



});