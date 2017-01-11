// Tests for Import GL Account Accounting/Yardi/CSV/MRI Grid Model

describe('Import GL Account Accounting/Yardi/CSV/MRI Grid Model', function () {
    var translator, gridModel, gridConfig, accModel, errModel, model;

    beforeEach(module('budgeting.coaSetup.import'));

    beforeEach(function () {

        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appTranslate.name = name;
            return appTranslate;
        };

        gridModel = RealPage.spy();
        gridModel._createMethods(['subscribe', 'setConfig', 'setEmptyMsg', 'busy', 'flushData', 'getQuery', 'setData', 'addData', 'setFilterState', 'getSelectionChanges', 'hasSelectionChanges']);


        var spy2 = function () {
            return gridModel;
        };

        gridConfig = RealPage.spy();
        gridConfig._createMethods(['updateGridModel']);


        var svcMethods = [
            'getStagingData',
            'delGlAccs',
            'then'
        ];

        accModel = RealPage.spy();
        accModel._createMethods(svcMethods);


        errModel = RealPage.spy();
        errModel._createMethods(['getStagingDataError']);

        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('rpGridModel', spy2);
            $provide.value('importGlAccGrid', gridConfig);
            $provide.value('importGlAccModel', accModel);
            $provide.value('importGlAccMsgModel', errModel);
        });

    });

    beforeEach(inject(function (appLangTranslate, rpGridModel, importGlAccGrid, importGlAccModel, importGlAccMsgModel, importGlGridModel) {
        translator = appLangTranslate;
        gridModel = rpGridModel();
        gridConfig = importGlAccGrid;
        accModel = importGlAccModel;
        errModel = importGlAccMsgModel;
        model = importGlGridModel;
    }));

    it("on setGridReady should subscribed config", function () {
        var data = [
            {
                "name": "All",
                "value": "All"
            },
            {
                "name": "Asset",
                "value": "Asset"
            }
        ];

        model.setGridReady(data);
        expect(gridModel._called.setConfig).toBe(true);
        expect(gridConfig._called.updateGridModel).toBe(true);
        expect(gridModel._called.flushData).toBe(true);
        expect(gridModel._called.busy).toBe(true);
        expect(gridModel._callData.busy[0]).toBe(true);
    });

    it("on updateGrid should subscribe events of filter/paging", function () {

        var data = [
    {
        "name": "All",
        "value": "All"
    },
    {
        "name": "Asset",
        "value": "Asset"
    }
        ];

        model.setGridReady(data);

        var obj = model.updateGrid();
        expect(model.grid).not.toBe(undefined);
        expect(gridModel._called.subscribe).toBe(true);
        expect(gridModel._called.setFilterState).toBe(true);
        expect(gridModel._called.setEmptyMsg).toBe(true);
    });

    it("on load should get data from service", function () {
        model.chartID = 1;
        var data = [
    {
        "name": "All",
        "value": "All"
    },
    {
        "name": "Asset",
        "value": "Asset"
    }
        ];

        model.setGridReady(data);

        var obj = model.load();

        expect(gridModel._called.busy).toBe(true);
        expect(gridModel._called.flushData).toBe(true);
        expect(gridModel._called.getQuery).toBe(true);
        expect(accModel._called.getStagingData).toBe(true);
        expect(accModel._called.then).toBe(true);
    });

    it("on paginate should get next records data from service", function () {
        model.chartID = 1;
        var data = [
    {
        "name": "All",
        "value": "All"
    },
    {
        "name": "Asset",
        "value": "Asset"
    }
        ];

        model.setGridReady(data);

        var obj = model.paginate();

        expect(gridModel._called.getQuery).toBe(true);
        expect(accModel._called.getStagingData).toBe(true);
        expect(accModel._called.then).toBe(true);
    });

    it("on setGridData should attach data to the grid", function () {
        var data = {
            records: [
        {
            "name": "All",
            "value": "All"
        },
        {
            "name": "Asset",
            "value": "Asset"
        }
            ]
        };

        var resp = {
            data: {
                records: [{
                    "glAccountID": 12,
                    "glAccountNumber": "1720.000",
                    "description": "A/D: Bldgs. & Lease Improvements",
                    "glAccountType": "Asset",
                    "category": "Asset",
                    "accountLevel": "",
                    "narrative": "Asset",
                    "normalBalance": "Debit",
                    "masterChartID": 1,
                    "dataSource": "",
                    "selectedBit": false,
                    "totalRecords": 2
                }, {
                    "glAccountID": 14,
                    "glAccountNumber": "1720.000",
                    "description": "A/D: Bldgs. & Lease Improvements",
                    "glAccountType": "Asset",
                    "category": "Asset",
                    "accountLevel": "",
                    "narrative": "Asset",
                    "normalBalance": "Debit",
                    "masterChartID": 1,
                    "dataSource": "",
                    "selectedBit": false,
                    "totalRecords": 2
                }]
            }
        };

        model.setGridReady(data.records);

        model.setGridData(resp);

        expect(gridModel._called.setData).toBe(true);
        expect(gridModel._called.busy).toBe(true);
    });

    it("on addGridData should attach next records to the grid", function () {
        var data = {
            records: [
        {
            "name": "All",
            "value": "All"
        },
        {
            "name": "Asset",
            "value": "Asset"
        }
            ]
        };

        model.setGridReady(data.records);

        model.addGridData(data);

        expect(gridModel._called.addData).toBe(true);
        expect(gridModel._called.busy).toBe(true);
    });

    it("on flushGridData should flush all data in the grid", function () {
        var data = {
            records: [
        {
            "name": "All",
            "value": "All"
        },
        {
            "name": "Asset",
            "value": "Asset"
        }
            ]
        };

        model.setGridReady(data.records);

        var obj = model.flushGridData();

        expect(gridModel._called.flushData).toBe(true);
    });

    it("on deleteGls should call service to delete gls", function () {

        model.getGlsSelected = function () {
            return [{
                "glAccountID": 1
            }, {
                "glAccountID": 2
            }];
        };
        model.deleteGls();
        expect(accModel._called.delGlAccs).toBe(true);
    });

    it("on hasGlSelections should to return any changes in selections", function () {
        var data = {
            records: [
        {
            "name": "All",
            "value": "All"
        },
        {
            "name": "Asset",
            "value": "Asset"
        }
            ]
        };

        model.setGridReady(data.records);

        var obj = model.hasGlSelections();

        expect(gridModel._called.hasSelectionChanges).toBe(true);
    });

    it("on setChartID should to set chart id", function () {
        model.setChartID(2);
        expect(model.chartID).toBe(2);
    });

    it("on getChartID should to get chart id", function () {
        model.setChartID(2);

        model.getChartID();
        expect(model.chartID).toBe(2);
    });

    it("on reset should to set default values", function () {
        model.reset();

        expect(model.chartID).toBe(0);
    });
});

