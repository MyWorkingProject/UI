describe("Category service, unit test cases", function () {
    var svc, returnData, resourceCallData, $httpBackend, form;

    beforeEach(function () {
        module("budgeting.coaSetup.categories");
        //module("ngResource");

    });

    beforeEach(function () {

        returnData = {
            post: function (data) { },
            get: function (data) { }
        };

        var $resource = function () {
            resourceCallData = arguments;
            return returnData;
        };

        module(function ($provide) {
            $provide.value('$resource', $resource);
            //$provide.value('$resource', $httpBackend)
        });

       
        function injector(a, b) {
            $httpBackend = a;
            svc = b;

        }

        inject(['$httpBackend', 'categoriesSVC', injector]);
    });



    it('Get COARow Data , get method', function () {

        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 0,
            "records": [
              {
                  "coaReportRowID": 1049,
                  "masterChartID": 36,
                  "rowType": "HEADER",
                  "groupNumber": 1,
                  "accountCategoryID": 0,
                  "accountTypeID": 0,
                  "accountType": "REPORT",
                  "displayText": "CASH FLOW",
                  "displayOnReport": false,
                  "footerDisplayOnReport": false,
                  "excludeFromTotal": false,
                  "reverseSign": false,
                  "operator": "",
                  "glDisplayOnReport": false,
                  "glExcludeFromTotal": false,
                  "glReverseSign": false,
                  "glOperator": null,
                  "sequence": 1,
                  "inUse": false
              },
              {
                  "coaReportRowID": 1050,
                  "masterChartID": 36,
                  "rowType": "HEADER",
                  "groupNumber": 2,
                  "accountCategoryID": 0,
                  "accountTypeID": 0,
                  "accountType": "REPORT",
                  "displayText": "NET INCOME",
                  "displayOnReport": false,
                  "footerDisplayOnReport": false,
                  "excludeFromTotal": false,
                  "reverseSign": false,
                  "operator": "",
                  "glDisplayOnReport": false,
                  "glExcludeFromTotal": false,
                  "glReverseSign": false,
                  "glOperator": null,
                  "sequence": 2,
                  "inUse": false
              }

            ],
            "statusCode": 0
        };

        $httpBackend.expectGET('/api/budgeting/coa/masterchart/:chartID/coareportrow').respond(expectedResponse);

        var output = svc.getCOARowData(1);

        //$httpBackend.flush();

    });

    it('save coa report data, verfying saving of report data', function () {

        var expectedResponse = {
            "messageId": 200,
            "messageText": "Success",
            "statusCode": 0
        };

        var form = {
            "coaReportRows": [{ "coaReportRowID": 1049, "masterChartID": 36, "rowType": "HEADER", "groupNumber": 1, "accountCategoryID": 0, "accountTypeID": 0, "accountType": "REPORT", "displayText": "CASH FLOW", "displayOnReport": false, "footerDisplayOnReport": false, "excludeFromTotal": false, "reverseSign": false, "operator": "", "glDisplayOnReport": false, "glExcludeFromTotal": false, "glReverseSign": false, "glOperator": null, "sequence": 1, "inUse": false, "id": 1, "CatOptn": "HFD", "GLOptn": "-", "groupState": { "open": true }, "level": 1 }
            ]
        };

        $httpBackend.expectPOST('/api/budgeting/coa/masterchart/:chartID/coareportrow').respond(expectedResponse);

        var output = svc.saveCOARows(1,form);

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
            "referenceID": 3,
            "stepID": 3
        };

        $httpBackend.expectPUT('/api/budgeting/common/wizard/wizardstatus').respond(expectedResponse);

        var output = svc.updateWizStep(reqdata);

        //$httpBackend.flush();

     });

     it('gettign of accnt type list', function () {

         var expectedResponse = {
             "messageId": 200,
             "messageText": "Success",
             "totalRecords": 0,
             "records": [
               {
                   "value": 1,
                   "name": "Asset"
               },
               {
                   "value": 2,
                   "name": "Liability"
               },
               {
                   "value": 3,
                   "name": "Capital"
               },
             ]
         };


         $httpBackend.expectPOST('/api/budgeting/coa/accounttype/accounttypecombo').respond(expectedResponse);

         var output = svc.getAccountTypeList();

         //$httpBackend.flush();

     });

     it('gettign of accnt category list', function () {

         var expectedResponse = {
             "messageId": 200,
             "messageText": "Success",
             "totalRecords": 0,
             "records": [
               {
                   "value": 1,
                   "name": "Asset"
               },
               {
                   "value": 2,
                   "name": "Liability"
               },
               {
                   "value": 3,
                   "name": "Capital"
               },
             ]
         };


         $httpBackend.expectPOST('/api/budgeting/coa/masterchart/:chartID/accounttype/:accounttypeID/accountcategorycombo').respond(expectedResponse);

         var output = svc.getAccountCategoryList(1,1);

         //$httpBackend.flush();

     });


});