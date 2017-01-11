describe("work flow status, grid factory", function() {
    var model,  gridModel, grid, $filter,wfConfig,wfModel,wfErr;
    var resourceCallData, returnData, $q, promise,  $rootScope;
    beforeEach(module("budgeting.workspaces.budgetWorkflowStatus"));


    beforeEach(function() {
        gridModel = RealPage.spy();
        gridModel._createMethods(['subscribe', 'setConfig', 'setEmptyMsg', 'busy', 'flushData', 'getQuery', 'setData', 'addData', 'setFilterState']);


        var spy1 = function() {
            return gridModel;
        };

        var spy2 = RealPage.spy();
        spy2._createMethods(['updateGridModel']);


        var spy3 = RealPage.spy();
        spy3._createMethods(['getBudgetWorkFlowStatusList', 'success']);


        var spy4 = RealPage.spy();
        spy4._createMethods(['getBdgtWorkflowStatusException']);


        module(function($provide) {
            $provide.value('rpGridModel', spy1);
            $provide.value('budgetWorkflowStatusConfig', spy2);
            $provide.value('budgetWorkflowStatusModel', spy3);
            $provide.value('budgetWorkflowStatusErrorHandling', spy4);
        });

    });

    beforeEach(function() {
        function injector(a, b, c, d, e, f) {
            $filter = a;
            grid = b();
            wfConfig = c;
            wfModel = d;
            wfErr = e;
            model = f;
        }

        inject([
            '$filter',
            'rpGridModel', 'budgetWorkflowStatusConfig', 'budgetWorkflowStatusModel', 'budgetWorkflowStatusErrorHandling', 'budgetWorkflowStatusGridFactory', injector
        ]);
    });


    it("should set the grid configuration", function() {
        var data = {};
        var status = true;
        model.setGridReady(data, status);
        expect(grid._called.setConfig).toBe(true);
        expect(grid._called.flushData).toBe(true);
        expect(grid._callData.busy[0]).toBe(true);
        expect(grid._called.busy).toBe(true);
        expect(wfConfig._called.updateGridModel).toBe(true);
        expect(wfConfig._callData.updateGridModel[0]).toEqual(data);
    });

    it("update Grid, should subscribed to events and config", function() {
        var data = {};
        var status = true;
        model.setGridReady(data, status);
        model.updateGrid();
        expect(model.grid).not.toBe(undefined);
        expect(grid._called.subscribe).toBe(true);
        expect(grid._called.setEmptyMsg).toBe(true);
    });

    it("model load, should get the data from service", function() {
        var data = {};
        var status = true;
        model.setGridReady(data, status);
        model.load();
        expect(grid._called.flushData).toBe(true);
        expect(grid._callData.busy[0]).toBe(true);
        expect(wfModel._called.getBudgetWorkFlowStatusList).toBe(true);
        expect(wfModel._called.success).toBe(true);
    });


    it("paginate model, should fetch the data and bind the data", function() {
        var data = {};
        var status = true;
        model.setGridReady(data, status);
        model.paginate();
        expect(grid._called.getQuery).toBe(true);
        expect(wfModel._called.getBudgetWorkFlowStatusList).toBe(true);
        expect(wfModel._called.success).toBe(true);
    });

    it("set grid data, should set model grid data", function() {
        var response = {
            records: [{
                id: 1,
                isSelected: false
            }]
        };
        var data = {};
        var status = true;
        model.setGridReady(data, status);
        model.setGridData(response);
        expect(grid._called.setData).toBe(true);
        expect(grid._callData.setData[0]).toEqual(response);
        expect(grid._callData.busy[0]).toBe(false);
    });

    it("set SelectColumn Data model, initilize of select field", function() {
        var response = {
            records: [{
                isSelected: true
            }]
        };
        model.setSelectColumn(response);
        expect(response.records[0].isSelected).toBe(false);

    });


    it("add grid data  model, add the data to grid", function() {
        var response = {
            data: {
                ID: "1"
            }
        };
        var data = {};
        var status = true;
        model.setGridReady(data, status);
        model.addGridData(response);
        expect(grid._called.addData).toBe(true);
        expect(grid._callData.addData[0]).toEqual(response);
        expect(grid._callData.busy[0]).toBe(false);
    });

    it("should return selected records", function() {
        var response = {
            records: [{
                isSelected: true
            }, {
                isSelected: false
            }, {
                isSelected: false
            }]
        };
        model.grid = {
            data: {
                id: 1
            }
        };
        model.grid.data = response;
        var outPut = model.getSelectedRecords();
        expect(outPut.length).toEqual(1);
    });

});