describe("Contracts Grid Factory", function () {
    var model, chartSVC, gridModel, chartConfig, $filter, errorHandling, grid;
    beforeEach(module("budgeting.workspaces.contracts"));


    beforeEach(function () {
        gridModel = RealPage.spy();
        gridModel._createMethods(['subscribe', 'setConfig', 'setEmptyMsg', 'busy', 'flushData', 'getQuery', 'setData', 'addData', 'setFilterState']);


        var spy1 = function () {
            return gridModel;
        };

        var spy2 = RealPage.spy();

      

        var spy4 = RealPage.spy();
        spy4._createMethods(['getContractsException']);

        chartSVC = RealPage.spy();
        chartSVC._createMethods(['getContractData', 'success']);


        module(function ($provide) {
           
            $provide.value('rpGridModel', spy1);           
            $provide.value('contractsConfig', spy2);
            $provide.value('contractsModel', chartSVC);
            $provide.value('contractsErrorHandling', spy4);
          

        });

    });

    beforeEach(function () {
        function injector(a, b, c, d, e,f) {          
            grid = a();
            chartConfig = b;
            chartSVC = c;
            errorHandling = d;
            $filter = e;
            model = f;
        }

        inject([
             'rpGridModel',           
            'contractsConfig',
            'contractsModel',
            'contractsErrorHandling',
             '$filter',
            'contractsGridFactory',
            injector
        ]);


    });

    it("init model, should subscribed to events and config", function () {
        expect(model.grid).not.toBe(undefined);
        expect(grid._called.subscribe).toBe(true);
        expect(grid._called.setConfig).toBe(true);
        expect(grid._callData.setConfig[0]).toBe(chartConfig);
        expect(grid._called.setEmptyMsg).toBe(true);
    });

    it("load model, should fetch the data and bind the data", function () {

        model.load();
        expect(grid._called.flushData).toBe(true);
        expect(grid._called.busy).toBe(true);
        expect(grid._callData.busy[0]).toBe(true);
        expect(chartSVC._called.getContractData).toBe(true);
    });

    it("paginate model, should fetch the dataa", function () {
        model.paginate();
        expect(grid._called.getQuery).toBe(true);
    });

    it("set Grid Data model, bind the data to grid", function () {

        var data = {
            "records": [{
                a: 1
            },
               {
                   b: 2
               }]
        };
        var response = { ID: "1" };
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
        model.addGridData(response);
        model.setSelectColumn(data);
        expect(grid._called.addData).toBe(true);
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
        model.getSelectedRecords();
    });


});
