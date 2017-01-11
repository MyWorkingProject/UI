describe("new master chart service, unit test cases", function () {
    var svc, returnData, resourceCallData, $httpBackend,form;
   
    beforeEach(function () {
        module("budgeting.coaSetup.newMasterchart");
        //module("ngResource");

    });

    beforeEach(function () {

        returnData = {
            post: function (data) { },
            get: function (data) { },
            put: function (data) { }
        };

        var $resource = function () {
            resourceCallData = arguments;
            return returnData;
        };

        module(function ($provide) {
            $provide.value('$resource', $resource);
            //$provide.value('$resource', $httpBackend)
        });

        form = {
            masterChartID: 0,
            name: "",
            isAlternativeCOA: false,
            isCustomAccount: false,
            accountPrefix: "",
            accountSuffix: "",
            field1: "None",
            delimiter1: "None",
            field2: "None",
            delimiter2: "None",
            field3: "None",
            delimiter3: "None",
            field4: "None",
            responseID: 0,
            showField2: false,
            showField3: false,
            showField4: false,
            infoToolTip: false

        };

        function injector(a, b) {
            $httpBackend = a;
            svc = b;

        }

        inject(['$httpBackend', 'newMasterchartSVC', injector]);
    });



    it('Get master chart data, get method', function () {
      
        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 1,
            "records": [
              {
                  "masterChartID": 69,
                  "name": "Testing Saving 123",
                  "accountPrefix": "1",
                  "accountSuffix": "",
                  "field1": "Prefix",
                  "delimiter1": " ",
                  "field2": "None",
                  "delimiter2": " ",
                  "field3": "None",
                  "delimiter3": " ",
                  "field4": "None",
                  "isAlternativeCOA": false
              }
            ],
            "statusCode": 0
        };

        $httpBackend.expectGET('/api/budgeting/coa/masterchart/:chartID').respond(expectedResponse);

        var output = svc.getMasterChartData(69);

        //$httpBackend.flush();

    });

    it('save master chart data, verfying saving of new master chart', function () {

        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        $httpBackend.expectPOST('/api/budgeting/coa/masterchart').respond(expectedResponse);

        var output = svc.saveNewMasterChart(form);

        //$httpBackend.flush();

    });

    it('save master chart data, verfying saving of existing master chart', function () {

        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        $httpBackend.expectPUT('/api/budgeting/coa/masterchart').respond(expectedResponse);

        form.masterChartID = 1;
        var output = svc.saveMasterChart(form);

        //$httpBackend.flush();

    });

    it('update wizard step, verifying update wizard step service', function () {

        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        var reqdata = {
            "wizardType": "MasterChart",
            "referenceID": 1,
            "stepID": 1
        };

        $httpBackend.expectPUT('/api/budgeting/common/wizard/wizardstatus').respond(expectedResponse);

        var output = svc.updateWizStep(reqdata);

        //$httpBackend.flush();

    });


});