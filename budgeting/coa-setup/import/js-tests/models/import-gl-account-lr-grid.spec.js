// Tests for Import GL Account L&R Grid Model

describe('Import GL Account L&R Grid Model', function () {
    var translator, gridModel, gridConfig, lrModel, errModel, model;

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
        gridConfig._createMethods(['updateLRGridModel']);


        var svcMethods = [
            'getProperties',
            'updateRecordsMessage',
            'updateRefreshRecordsMessage',
            'saveGlAccs',
            'getStatus',
            'then'
        ];

        lrModel = RealPage.spy();
        lrModel._createMethods(svcMethods);


        errModel = RealPage.spy();
        errModel._createMethods(['getStagingDataError']);

        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('rpGridModel', spy2);
            $provide.value('importGlLrGrid', gridConfig);
            $provide.value('importGlLrModel', lrModel);
            $provide.value('importGlAccMsgModel', errModel);
        });

    });

    beforeEach(inject(function (appLangTranslate, rpGridModel, importGlLrGrid, importGlLrModel, importGlAccMsgModel, importGlLRGridModel) {
        translator = appLangTranslate;
        gridModel = rpGridModel();
        gridConfig = importGlLrGrid;
        lrModel = importGlLrModel;
        errModel = importGlAccMsgModel;
        model = importGlLRGridModel;
    }));

    it("on setGridReady should subscribed config", function () {
        model.setGridReady();
        expect(gridModel._called.setConfig).toBe(true);
        expect(gridConfig._called.updateLRGridModel).toBe(true);
        expect(gridModel._called.flushData).toBe(true);
        expect(gridModel._called.busy).toBe(true);
        expect(gridModel._callData.busy[0]).toBe(true);
    });

    it("on updateGrid should subscribe events of filter/paging", function () {
        model.setGridReady();

        var obj = model.updateGrid();
        expect(model.grid).not.toBe(undefined);
        expect(gridModel._called.subscribe).toBe(true);
        expect(gridModel._called.setFilterState).toBe(true);
        expect(gridModel._called.setEmptyMsg).toBe(true);
    });

    it("on load should get data from service", function () {
        model.setGridReady();

        var obj = model.load();

        expect(gridModel._called.busy).toBe(true);
        expect(gridModel._called.flushData).toBe(true);
        expect(gridModel._called.getQuery).toBe(true);
        expect(lrModel._called.getProperties).toBe(true);
        expect(lrModel._called.then).toBe(true);
    });

    it("on updateResults should to update messgae and date values after load", function () {
        model.setGridReady();
        var data = {
            records: [{
                "propertyID": 1,
                "parentSiteID": 1,
                "propertyName": "Meadow Bay",
                "importDate": null,
                "message": "Import successful"
            }, {
                "propertyID": 2,
                "parentSiteID": 1,
                "propertyName": "Meadow Bay 2",
                "importDate": "03/21/2016",
                "message": ""
            }]
        };
        model.updateResults(data);

        expect(lrModel._called.updateRecordsMessage).toBe(true);
    });

    it("on updateRefreshResults should update message and date values after refresh click", function () {
        model.setGridReady();
        model.gridData = {
            records: [{
                "propertyID": 1,
                "parentSiteID": 1,
                "propertyName": "Meadow Bay",
                "importDate": null,
                "message": "Import successful"
            }, {
                "propertyID": 2,
                "parentSiteID": 1,
                "propertyName": "Meadow Bay 2",
                "importDate": "03/21/2016",
                "message": ""
            }]
        };

        var data = {
            records: [{
                "propertyID": 1,
                "parentSiteID": 1,
                "propertyName": "Meadow Bay",
                "importDate": "03/21/2016",
                "message": "Import successful"
            }, {
                "propertyID": 2,
                "parentSiteID": 1,
                "propertyName": "Meadow Bay 2",
                "importDate": "03/21/2016",
                "message": "Import Queued"
            }]
        };
        model.updateRefreshResults(data);

        expect(lrModel._called.updateRefreshRecordsMessage).toBe(true);
    });

    it("on paginate should get next records data from service", function () {
        model.setGridReady();
        var obj = model.paginate();

        expect(gridModel._called.getQuery).toBe(true);
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

        model.setGridReady();

        model.setGridData(data);

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

        model.setGridReady();

        model.addGridData(data);

        expect(gridModel._called.addData).toBe(true);
        expect(gridModel._called.busy).toBe(true);
    });

    it("on flushGridData should flush all data in the grid", function () {
        model.setGridReady();

        var obj = model.flushGridData();
        expect(gridModel._called.flushData).toBe(true);
    });

    it("on hasGlSelections should to return any changes in selections", function () {
        model.setGridReady();

        var obj = model.hasPropsSelections();

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

    it("on saveLrGlAccs should save gls of l&r properties selected", function () {
        model.chartID = 1;
        model.getPropsSelected = function () {
            return [1, 2];
        };

        model.saveLrGlAccs();

        expect(lrModel._called.saveGlAccs).toBe(true);
        expect(lrModel._called.then).toBe(true);
    });

    it("on reset should to set default values", function () {
        model.reset();

        expect(model.chartID).toBe(0);
    });
});

