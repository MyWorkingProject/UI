// Tests for Import Category Grid Model

describe('Import Category Grid Model', function () {
    var translator, gridModel, gridConfig, catModel, errModel, model, filterObj;

    beforeEach(module('budgeting.coaSetup.importCategory'));

    beforeEach(function () {

        gridModel = RealPage.spy();
        gridModel._createMethods(['subscribe', 'setConfig', 'setEmptyMsg', 'busy', 'flushData', 'getQuery', 'setData', 'addData', 'setFilterState', 'getSelectionChanges', 'hasSelectionChanges']);

        var spy2 = function () {
            return gridModel;
        };

        var svcMethods = [
            'filterSvc',
            'getCategoriesAcc',
            'loadFile',
            'getUploadedFile',
            'saveCategories',
            'setPostCalled',
            'then'
        ];

        catModel = RealPage.spy();
        catModel._createMethods(svcMethods);


        errModel = RealPage.spy();
        errModel._createMethods(['onError', 'showSuccMessage']);

        module(function ($provide) {
            $provide.value('rpGridModel', spy2);
            $provide.value('importCategoryGrid', gridConfig);
            $provide.value('importCategoryModel', catModel);
            $provide.value('ImportCategoryErrorModel', errModel);
        });

    });

    beforeEach(inject(function (rpGridModel, importCategoryGrid, importCategoryModel, ImportCategoryErrorModel, $filter, importCategoryGridModel) {
        gridModel = rpGridModel();
        gridConfig = importCategoryGrid;
        catModel = importCategoryModel;
        errModel = ImportCategoryErrorModel;
        filterObj = $filter;
        model = importCategoryGridModel;
    }));

    it("on setGridReady should subscribe events of filter/paging", function () {
        model.setGridReady();

        expect(model.grid).not.toBe(undefined);
        expect(gridModel._called.subscribe).toBe(true);
        expect(gridModel._called.setFilterState).toBe(true);
        expect(gridModel._called.setEmptyMsg).toBe(true);
    });

    it("on filterload should get data from service", function () {
        var called = false;
        model.setGridData = function () {
            called = true;
        };
        model.filterload();

        expect(gridModel._called.busy).toBe(true);
        expect(gridModel._called.flushData).toBe(true);
        expect(gridModel._called.getQuery).toBe(true);
        expect(catModel._called.filterSvc).toBe(true);
        expect(called).toBe(true);
    });

    it('on loadAccountingCategories  get categories using service', function () {
        model.loadAccountingCategories();

        expect(catModel._called.getCategoriesAcc).toBe(true);
        expect(catModel._called.then).toBe(true);
    });

    it('on loadCSVFile  get categories using service from uploaded file', function () {
        model.loadCSVFile();

        expect(catModel._called.loadFile).toBe(true);
        expect(catModel._called.getUploadedFile).toBe(true);
        expect(catModel._called.then).toBe(true);
    });

    it('on loadAccsGrid to add selectedBit key and call setGridData', function () {
        var resp = {
            "messageId": 0,
            "messageText": "",
            "totalRecords": 3,
            "records": [
              {
                  "accountCategoryID": 1,
                  "accountCategory": "Rent Revenue",
                  "glAccountType": "Asset",
                  "accountTypeID": 1,
                  "masterChartID": 1,
                  "sequence": 1
              },
              {
                  "accountCategoryID": 2,
                  "accountCategory": "Other Revenue",
                  "glAccountType": "Income",
                  "accountTypeID": 5,
                  "masterChartID": 1,
                  "sequence": 2
              },
              {
                  "accountCategoryID": 3,
                  "accountCategory": "Administrative Expenses",
                  "glAccountType": "Expense",
                  "accountTypeID": 6,
                  "masterChartID": 1,
                  "sequence": 3
              }
            ],
            "statusCode": 0
        };

        var called = false;
        model.setGridData = function () {
            called = true;
        };

        model.loadAccsGrid(resp);

        expect(model.gridData.records.length).toBe(3);
        expect(model.gridOrgData.records.length).toBe(3);
        expect(model.gridData.records[0].selectedBit).toBe(false);
        expect(called).toBe(true);
    });

    it('on useResult to add selectedBit key and assign the records to model.gridData', function () {
        var resp = {
            "messageId": 0,
            "messageText": "",
            "totalRecords": 3,
            "records": [
              {
                  "accountCategoryID": 1,
                  "accountCategory": "Rent Revenue",
                  "glAccountType": "Asset",
                  "accountTypeID": 1,
                  "masterChartID": 1,
                  "sequence": 1
              },
              {
                  "accountCategoryID": 2,
                  "accountCategory": "Other Revenue",
                  "glAccountType": "Income",
                  "accountTypeID": 5,
                  "masterChartID": 1,
                  "sequence": 2
              },
              {
                  "accountCategoryID": 3,
                  "accountCategory": "Administrative Expenses",
                  "glAccountType": "Expense",
                  "accountTypeID": 6,
                  "masterChartID": 1,
                  "sequence": 3
              }
            ],
            "statusCode": 0
        };

        model.useResult(resp.records);

        expect(model.gridData.records.length).toBe(3);
        expect(model.gridOrgData.records.length).toBe(3);
        expect(model.gridData.records[0].selectedBit).toBe(false);
    });

    it("on setGridData should attach data to the grid", function () {
        var resp = {
            "messageId": 0,
            "messageText": "",
            "totalRecords": 3,
            "records": [
              {
                  "accountCategoryID": 1,
                  "accountCategory": "Rent Revenue",
                  "glAccountType": "Asset",
                  "accountTypeID": 1,
                  "masterChartID": 1,
                  "sequence": 1
              },
              {
                  "accountCategoryID": 2,
                  "accountCategory": "Other Revenue",
                  "glAccountType": "Income",
                  "accountTypeID": 5,
                  "masterChartID": 1,
                  "sequence": 2
              },
              {
                  "accountCategoryID": 3,
                  "accountCategory": "Administrative Expenses",
                  "glAccountType": "Expense",
                  "accountTypeID": 6,
                  "masterChartID": 1,
                  "sequence": 3
              }
            ],
            "statusCode": 0
        };

        model.setGridData(resp);

        expect(gridModel._called.setData).toBe(true);
        expect(gridModel._called.busy).toBe(true);
    });

    it("on flushGridData should flush all data in the grid", function () {
        model.flushGridData();
        expect(gridModel._called.flushData).toBe(true);
    });

    it('on saveGlCategories should save categories using service accounting', function () {
        model.saveGlCategories();

        expect(catModel._called.saveCategories).toBe(true);
        expect(catModel._called.then).toBe(true);
    });

    it('on saveGlAccountsCsv should save categories using service csv', function () {
        model.saveGlAccountsCsv();

        expect(catModel._called.saveCategories).toBe(true);
        expect(catModel._called.then).toBe(true);
    });

    it('on showSuccMessage should show success message', function () {
        model.showSuccMessage({});

        expect(catModel._called.setPostCalled).toBe(true);
        expect(errModel._called.showSuccMessage).toBe(true);
    });

    it('on deleteGls should filter gls that got selected and bind grid with unselected categories', function () {
        model.gridData = {
            "records": [
              {
                  "accountCategoryID": 1,
                  "accountCategory": "Rent Revenue",
                  "glAccountType": "Asset",
                  "accountTypeID": 1,
                  "masterChartID": 1,
                  "sequence": 1,
                  "selectedBit": false
              },
              {
                  "accountCategoryID": 2,
                  "accountCategory": "Other Revenue",
                  "glAccountType": "Income",
                  "accountTypeID": 5,
                  "masterChartID": 1,
                  "sequence": 2,
                  "selectedBit": false
              },
              {
                  "accountCategoryID": 3,
                  "accountCategory": "Administrative Expenses",
                  "glAccountType": "Expense",
                  "accountTypeID": 6,
                  "masterChartID": 1,
                  "sequence": 3,
                  "selectedBit": true
              }
            ]
        };

        var called = false;
        model.setGridData = function () {
            called = true;
        };
        model.deleteGls();

        expect(model.gridData.records.length).toBe(2);
        expect(model.gridOrgData.records.length).toBe(2);
        expect(called).toBe(true);
    });

    it("on reset should to set default values", function () {
        model.reset();

        expect(model.gridData.records).toBe(undefined);
        expect(model.gridOrgData.records).toBe(undefined);
    });

});

