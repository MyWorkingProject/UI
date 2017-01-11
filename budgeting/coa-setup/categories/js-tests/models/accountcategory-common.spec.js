describe("account category common model", function () {

    var appLangTranslate, model, $filter, $location, rowModel, dialogModel, newChartModel;
    var categoryRows = {
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
              "inUse": false,
              groupState: { open: false }
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
              "inUse": false,
              groupState: { open: false }
          },
           {
               "coaReportRowID": 1055,
               "masterChartID": 36,
               "rowType": "SUB-TOTAL",
               "groupNumber": 1,
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
               "sequence": 3,
               "inUse": false,
               groupState: { open: true }
           }
        ]
    };

    beforeEach(module("budgeting.coaSetup.categories"));

    beforeEach(function () {
        var mocks = {
            'rp.common.dialog': ['rpDialogModel']
        };

        RealPage.ngMocks.install(mocks);

    });

    beforeEach(function () {
        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);


        var spyRowModel = RealPage.spy();
        spyRowModel._createMethods(['updateGLCatOption', 'getPageBreak', 'getBlankRow']);

        var spyNewChart = RealPage.spy();
        spyNewChart._createMethods(['edit', 'getEditState', 'updateInEditChart', 'getState']);

        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var spy3 = RealPage.spy();
        spy3._createMethods(['absUrl']);

        module(function ($provide) {
            $provide.value('appLangTranslate', spy2);
            $provide.value('accountCategoryRow', spyRowModel);
            $provide.value('newMasterchartModel', spyNewChart);
            //$provide.value('$filter', $filter);
            $provide.value('$location', spy3);
        });

        function injector(a, b, c, d, e, f, g) {
            appLangTranslate = a;
            dialogModel = b();
            $filter = c;
            rowModel = d;
            newChartModel = e;
            $location = f;
            model = g;
        }

        inject(['appLangTranslate', 'rpDialogModel', '$filter', 'accountCategoryRow', 'newMasterchartModel', '$location', 'accountCategoryCommon', injector]);

    });

    afterEach(function () {
        dialogModel._reset();
    });

    it("should call row model update gl cat option method", function () {
        var item = {};
        model.updateGLCatOption(item);
        expect(rowModel._called.updateGLCatOption).toBe(true);
    });

    it("should return true if row type is REF-CATEGORY", function () {
        var item = { rowType: "REF-CATEGORY" };
        var outPut = model.isRefCategory(item);
        expect(outPut).toBe(true);
    });

    it("should return false if row type is not REF-CATEGORY", function () {
        var item = { rowType: "CATEGORY" };
        var outPut = model.isRefCategory(item);
        expect(outPut).toBe(false);
    });

    it("calling update data and should return maximum group number", function () {
        var outPut = model.updateData(categoryRows, 1, 0);
        expect(outPut.uniqID).toEqual(4);
        expect(outPut.groupNumber).toEqual(2);
        expect(rowModel._called.updateGLCatOption).toBe(true);
    });

    it("calling update data when group number is empty", function () {
        var catData = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 0,
            "records": [
              {
                  "coaReportRowID": 1049,
                  "masterChartID": 36,
                  "rowType": "HEADER",
                  "groupNumber": "",
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
                  "rowType": "SUB-TOTAL",
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
            ]
        };

        var outPut = model.updateData(catData, 1, 0);
        expect(outPut.uniqID).toEqual(3);
        expect(outPut.groupNumber).toEqual(2);
        expect(rowModel._called.updateGLCatOption).toBe(true);
    });

    it("calling hideRows, shoudl hide the child rows", function () {
        var categoryData = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 0,
            "records": [
              {
                  "coaReportRowID": 1049,
                  "masterChartID": 36,
                  "rowType": "HEADER",
                  "groupNumber": 2,
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
                   "coaReportRowID": 1051,
                   "masterChartID": 36,
                   "rowType": "CATEGORY",
                   "groupNumber": 0,
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
                   "sequence": 2,
                   "inUse": false
               },
              {
                  "coaReportRowID": 1050,
                  "masterChartID": 36,
                  "rowType": "SUB-TOTAL",
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
                  "sequence": 3,
                  "inUse": false
              }
            ]
        };
        var category = { groupNumber: 2 };
        var outPut = model.hideRows(1, categoryData, category);

    });

    it("calling hideRows, shoudl not hide the child rows when it is invalid data", function () {
        var categoryData = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 0,
            "records": [
              {
                  "coaReportRowID": 1049,
                  "masterChartID": 36,
                  "rowType": "HEADER",
                  "groupNumber": 2,
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
                   "coaReportRowID": 1051,
                   "masterChartID": 36,
                   "rowType": "CATEGORY",
                   "groupNumber": 0,
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
                   "sequence": 2,
                   "inUse": false
               },
               {
                   "coaReportRowID": 1052,
                   "masterChartID": 36,
                   "rowType": "CATEGORY",
                   "groupNumber": 0,
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
                   "sequence": 6,
                   "inUse": false
               },
              {
                  "coaReportRowID": 1050,
                  "masterChartID": 36,
                  "rowType": "SUB-TOTAL",
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
                  "sequence": 3,
                  "inUse": false
              }
            ]
        };
        var category = { groupNumber: 2 };
        var outPut = model.hideRows(1, categoryData, category);

    });

    it("calling hideRows, shoudl not hide the child rows when invalid parameter is passed", function () {
        var categoryData = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 0,
            "records": [
              {
                  "coaReportRowID": 1049,
                  "masterChartID": 36,
                  "rowType": "HEADER",
                  "groupNumber": 2,
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
                   "coaReportRowID": 1051,
                   "masterChartID": 36,
                   "rowType": "CATEGORY",
                   "groupNumber": 0,
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
                   "sequence": 2,
                   "inUse": false
               },
               {
                   "coaReportRowID": 1052,
                   "masterChartID": 36,
                   "rowType": "CATEGORY",
                   "groupNumber": 0,
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
                   "sequence": 6,
                   "inUse": false
               },
              {
                  "coaReportRowID": 1050,
                  "masterChartID": 36,
                  "rowType": "SUB-TOTAL",
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
                  "sequence": 3,
                  "inUse": false
              }
            ]
        };
        var category = { groupNumber: 20 };
        var outPut = model.hideRows(1, categoryData, category);

    });

    it("calling hideRows, shoudl not hide the child rows when sequqnec row is not found", function () {
        var categoryData = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 0,
            "records": [
              {
                  "coaReportRowID": 1049,
                  "masterChartID": 36,
                  "rowType": "HEADER",
                  "groupNumber": 2,
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
                   "coaReportRowID": 1051,
                   "masterChartID": 36,
                   "rowType": "CATEGORY",
                   "groupNumber": 0,
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
                   "sequence": 20,
                   "inUse": false
               },
               {
                   "coaReportRowID": 1052,
                   "masterChartID": 36,
                   "rowType": "CATEGORY",
                   "groupNumber": 0,
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
                   "sequence": 6,
                   "inUse": false
               },
              {
                  "coaReportRowID": 1050,
                  "masterChartID": 36,
                  "rowType": "SUB-TOTAL",
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
                  "sequence": 30,
                  "inUse": false
              }
            ]
        };
        var category = { groupNumber: 2 };
        var outPut = model.hideRows(1, categoryData, category);

    });

    it("calling hideElements ", function () {
        var category = [{ id: 1 }];
        model.hideElements(category);

    });

    it("calling showElements method ", function () {
        var category = [{ id: 1 }];
        model.showElements(category);
    });

    it("calling hideChildRows method when it is header row and state is not open", function () {
        var category = { groupState: { open: true }, rowType: "HEADER", sequence: 1 };
        model.hideChildRows(category);
    });

    it("calling hideChildRows method when state is opnd", function () {
        var categoryData = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 0,
            "records": [
              {
                  "coaReportRowID": 1049,
                  "masterChartID": 36,
                  "rowType": "HEADER",
                  "groupNumber": 2,
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
                   "coaReportRowID": 1051,
                   "masterChartID": 36,
                   "rowType": "CATEGORY",
                   "groupNumber": 0,
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
                   "sequence": 2,
                   "inUse": false
               },
              {
                  "coaReportRowID": 1050,
                  "masterChartID": 36,
                  "rowType": "SUB-TOTAL",
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
                  "sequence": 3,
                  "inUse": false
              }
            ]
        };
        var category = { groupState: { open: false }, rowType: "HEADER", sequence: 1 };
        model.hideChildRows(category, categoryData);
    });

    it("showing row click message", function () {
        model.showRowClickMsg();
        expect(dialogModel._called.show).toBe(true);
    });

    it("showing row delete message when it is refered", function () {
        model.showDelMsg(true);
        expect(dialogModel._called.show).toBe(true);
    });

    it("showing row delete message when it is not refered", function () {
        model.showDelMsg(false);
        expect(dialogModel._called.show).toBe(true);
    });

    it("calling toggle method", function () {
        var category = { groupState: { open: false }, rowType: "HEADER", sequence: 1, groupNumber: 1 };
        model.toggle(category, categoryRows);
    });

    it("should return sequence of passed parameter", function () {
        var category = [{ groupState: { open: false }, rowType: "HEADER", sequence: 1, groupNumber: 1 }];
        var outPut = model.getMaxSeq(category, categoryRows);
        expect(outPut).toEqual(category[0].sequence);
    });

    it("should return lenght of coaRows when parameter seq is null", function () {
        var category;
        var outPut = model.getMaxSeq(category, categoryRows);
        expect(outPut).toEqual(categoryRows.records.length);
    });

    it("calling updateToggle when passed sequence is not found", function () {
        var category = { sequence: 1 };
        model.updateToggle(categoryRows, category, 100);
    });

    it("calling updateToggle when passed sequence is found and it is Header Row", function () {
        var category = { sequence: 1, groupState: { open: true } };
        model.updateToggle(categoryRows, category, 1);
        expect(categoryRows.records[0].groupState.open).toBe(true);
    });

    it("calling updateToggle when passed sequence is found and it is not Header Row", function () {
        var category = { sequence: 1, groupState: { open: false } };
        model.updateToggle(categoryRows, category, 3);
    });

    it("calling getAccountCategoryRows method, should return category rows from the list", function () {
        var RowsData = {
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
                  "inUse": false,
                  groupState: { open: false }
              },
              {
                  "coaReportRowID": 1050,
                  "masterChartID": 36,
                  "rowType": "CATEGORY",
                  "groupNumber": 2,
                  "accountCategoryID": 1,
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
                  "inUse": false,
                  groupState: { open: false }
              },
               {
                   "coaReportRowID": 1055,
                   "masterChartID": 36,
                   "rowType": "CATEGORY",
                   "groupNumber": 1,
                   "accountCategoryID": 2,
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
                   "sequence": 3,
                   "inUse": false,
                   groupState: { open: true }
               }
            ]
        };
        var outPut = model.getAccountCategoryRows(RowsData);
        expect(outPut.options.length).toBe(3);
        expect(outPut.options[0].name).toEqual("-- Select category --");
        expect(outPut.options[1].name).toEqual(RowsData.records[1].displayText);
        expect(outPut.options[2].name).toEqual(RowsData.records[2].displayText);
    });


    it("shoudl return intial category list", function () {
        var outPut = model.getInitalAccountCategoryData();
        expect(outPut.options[0].name).toEqual("-- Select category --");
        expect(outPut.options[0].value).toEqual("");
    });

    it("verifying the adding of item to list", function () {
        var category = { accountCategoryID: 1, displayText: "Test Category" };
        var accountCategoryData = {
            options: [{
                "value": "",
                "name": '-- Select category --'
            }]
        };
        model.addCatItem(category, accountCategoryData);
        expect(accountCategoryData.options.length).toBe(2);
        expect(accountCategoryData.options[1].value).toEqual(category.accountCategoryID);
        expect(accountCategoryData.options[1].name).toEqual(category.displayText);
    });

    it("shoudl return intial Accnt type list", function () {
        var outPut = model.getInitalAccountTypeData();
        expect(outPut.options[0].name).toEqual("-- Select type --");
        expect(outPut.options[0].value).toEqual("");
    });

    it("shoudl return true as ID is greatre than 0 ", function () {
        var category = { coaReportRowID: 1 };
        var outPut = model.isExistinDB(category);
        expect(outPut).toBe(true);
    });

    it("shoudl return false as ID is equal to 0 ", function () {
        var category = { coaReportRowID: 0 };
        var outPut = model.isExistinDB(category);
        expect(outPut).toBe(false);
    });

    it("shoudl return row type", function () {
        var category = { rowType: "Header" };
        var outPut = model.getRowType(category);
        expect(outPut).toEqual(category.rowType);
    });

    it("should return groupNumber", function () {
        var category = { groupNumber: 6 };
        var outPut = model.getGroupNumber(category);
        expect(outPut).toEqual(category.groupNumber);
    });

    it("should return State Open", function () {
        var category = { groupState: { open: true } };
        var outPut = model.isStateOpen(category);
        expect(outPut).toEqual(category.groupState.open);
    });

    it("should set the open state", function () {
        var category = { groupState: { open: true } };
        model.setStateOpen(category, false);
        expect(category.groupState.open).toEqual(false);
    });

    it("should toggle State Open when it is true", function () {
        var category = { groupState: { open: true } };
        model.toggleStateOpen(category);
        expect(category.groupState.open).toEqual(false);
    });

    it("should toggle State Open when it is false", function () {
        var category = { groupState: { open: false } };
        model.toggleStateOpen(category);
        expect(category.groupState.open).toEqual(true);
    });

    it("should return group state", function () {
        var category = { groupState: { open: false } };
        var outPut = model.getGroupState(category);
        expect(outPut).toEqual(category.groupState);
    });

    it("should return sequence", function () {
        var category = { sequence: 5 };
        var outPut = model.getSequence(category);
        expect(outPut).toEqual(category.sequence);
    });

    it("should return row ID", function () {
        var category = { id: 5 };
        var outPut = model.getRowID(category);
        expect(outPut).toEqual(category.id);
    });

    it("should set the dirty bit", function () {
        var category = { dirtyBit: false };
        model.setDirtyBit(category, true);
        expect(category.dirtyBit).toBe(true);
    });

    it("should return accnt type id", function () {
        var category = { accountTypeID: 1 };
        var outPut = model.getaccountTypeID(category);
        expect(outPut).toEqual(category.accountTypeID);
    });

    it("should return accnt category id", function () {
        var category = { accountCategoryID: 1 };
        var outPut = model.getaccountCategoryID(category);
        expect(outPut).toEqual(category.accountCategoryID);
    });

    it("should return getInUse", function () {
        var category = { inUse: true };
        var outPut = model.getInUse(category);
        expect(outPut).toEqual(category.inUse);
    });

    it("should return true when paramter is greatre than 0 ", function () {
        var outPut = model.isRowClicked(1);
        expect(outPut).toBe(true);
    });

    it("should return true when paramter is equal to -1 ", function () {
        var outPut = model.isRowClicked(-1);
        expect(outPut).toBe(true);
    });

    it("should return false when paramter is equal to 0 ", function () {
        var outPut = model.isRowClicked(0);
        expect(outPut).toBe(false);
        expect(dialogModel._called.show).toBe(true);
    });

    it("verifying non form data when row type is break", function () {
        var outPut = model.getNonFormRow("Break", 1, 2);
        expect(rowModel._called.getPageBreak).toBe(true);
        expect(rowModel._callData.getPageBreak[0]).toEqual(1);
        expect(rowModel._callData.getPageBreak[1]).toEqual(2);
    });

    it("verifying non form data when row type is blank", function () {
        var outPut = model.getNonFormRow("blank", 1, 2);
        expect(rowModel._called.getBlankRow).toBe(true);
        expect(rowModel._callData.getBlankRow[0]).toEqual(1);
        expect(rowModel._callData.getBlankRow[1]).toEqual(2);
    });

    it("verifying group state of row is defined", function () {
        var category = { groupState: { open: false } };
        var outPut = model.isGroupStateDefnd(category);
        expect(outPut).toBe(true);
    });

    it("verifying group state of row is not defined", function () {
        var category = {};
        var outPut = model.isGroupStateDefnd(category);
        expect(outPut).toBe(false);
    });

    it("verifying updateState of new master chart when it is in wizard", function () {
        $location._returnData.absUrl = "budgeting/admin/coa/wiz/new";
        model.updateState();
        expect(newChartModel._called.edit).toBe(true);
        expect(newChartModel._callData.edit[0]).toBe(true);
    });

    it("verifying updateState of new master chart when it is edit chart", function () {
        $location._returnData.absUrl = "budgeting/editmasterchart/1";
        newChartModel._returnData.getEditState = false;
        model.updateState();
        expect(newChartModel._called.edit).toBe(true);
        expect(newChartModel._callData.edit[0]).toBe(false);
        expect(newChartModel._called.getEditState).toBe(true);
        expect(newChartModel._called.updateInEditChart).toBe(true);
    });

    it("verifying updateState whene url is invalid", function () {
        $location._returnData.absUrl = "invaliddata/1";
        newChartModel._returnData.getEditState = true;
        model.updateState();
        expect(newChartModel._called.edit).toBe(undefined);
        expect(newChartModel._called.updateInEditChart).toBe(true);
    });

    it("verifying updateInEditChart of master chart model when it is in edit chart", function () {
        $location._returnData.absUrl = "budgeting/editmasterchart/1";
        model.updateInEditChart();
        expect(newChartModel._called.updateInEditChart).toBe(true);
        expect(newChartModel._callData.updateInEditChart[0]).toBe(true);
    });

    it("verifying updateInEditChart of master chart model when it is not in edit chart", function () {
        $location._returnData.absUrl = "admin/coa/wiz/new";
        model.updateInEditChart();
        expect(newChartModel._called.updateInEditChart).toBe(true);
        expect(newChartModel._callData.updateInEditChart[0]).toBe(false);
    });

    it("verifying getState of master chart model", function () {
        model.getNewChartModelState();
        expect(newChartModel._called.getState).toBe(true);
    });

});