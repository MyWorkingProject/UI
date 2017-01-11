

describe('Manage GL Accounts Grid factory', function () {
    var model, gridModel, grid, $q, manageGlAccountConfig, manageGlGrid, manageGlErrorHandling, $filter, promise, $rootScope;


    beforeEach(module('budgeting.coaSetup.manageGlAccount'));

    beforeEach(function () {

        gridModel = RealPage.spy();
        gridModel._createMethods(['subscribe', 'setConfig', 'setEmptyMsg', 'busy', 'flushData', 'getQuery', 'setData', 'addData', 'setFilterState']);

        var spy1 = function () {
            return gridModel;
        };


        var spy2 = RealPage.spy();
        spy2._createMethods(['updateGridModel']);

        var spy3 = RealPage.spy();
        spy3._createMethods(['getGlAccList', 'success']);

        var spy4 = RealPage.spy();
        spy4._createMethods(['getglListException']);


        module(function ($provide) {
            $provide.value('rpGridModel', spy1);
            $provide.value('manageGlAccountConfig', spy2);
            $provide.value('manageGlGrid', spy3);
            $provide.value('manageGlErrorHandling', spy4);


        });


        function injector(a, b, c, d, e, f, g, h) {
            grid = a();
            manageGlAccountConfig = b;
            manageGlGrid = c;
            manageGlErrorHandling = d;
            $filter = e;
            model = f;
            $q = g;
            $rootScope = h;

        }

        inject(['rpGridModel',
            'manageGlAccountConfig',
            'manageGlGrid',
            'manageGlErrorHandling',
            '$filter',
            'manageGlGridFactory',
            '$q',
            '$rootScope',
            injector]);
    });

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
        expect(grid._called.setConfig).toBe(true);
        expect(manageGlAccountConfig._called.updateGridModel).toBe(true);
        expect(grid._called.flushData).toBe(true);
        expect(grid._called.busy).toBe(true);
        expect(grid._callData.busy[0]).toBe(true);
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
        expect(grid._called.subscribe).toBe(true);
        expect(grid._called.setEmptyMsg).toBe(true);
    });

    it("load model, should fetch the data and bind the data", function () {
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
        model.load();
        expect(grid._called.flushData).toBe(true);
        expect(grid._called.busy).toBe(true);
        expect(grid._callData.busy[0]).toBe(true);
        expect(manageGlGrid._called.getGlAccList).toBe(true);
    });

    it("paginate model, should fetch the dataa", function () {

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

        model.paginate();
        expect(grid._called.getQuery).toBe(true);
    });

    it("set Grid Data model, bind the data to grid", function () {
        var data = {
            records: [{
                a: 1
            },
               {
                   b: 2
               }]
        };
        var response = { ID: "1" };
        model.setGridReady(data);
        model.setGridData(response);
        model.setSelectColumn(data);
        expect(grid._called.setData).toBe(true);
        expect(grid._callData.busy[0]).toBe(false);
    });

    it("add grid data  model, add the data to grid", function () {
     
        var data = {
            "records": [{
                a: 1
            },
               {
                   b: 2
               }]
        };
        var response = { ID: "1" };
        model.setGridReady(data);
        model.addGridData(response);
        model.setSelectColumn(data);
        expect(grid._called.addData).toBe(true);
        expect(grid._callData.busy[0]).toBe(false);
    });

    it('return selected records of grid', function () {
        model.grid = {
            data: {
                records: [{
                    a: 1,
                    isSelected: true
                }, {
                    b: 2,
                    isSelected: false
                }]
            }
        };
        model.getSelectedGls();
    });


});

