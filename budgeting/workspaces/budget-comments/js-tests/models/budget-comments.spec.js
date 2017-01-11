describe("Budget comments model, unti test cases", function() {
    var model,  gridModel, grid, $filter,cmntSVC,cmntErr,cmntConfig;
    var resourceCallData,appTranslate, returnData, $q, promise,  $rootScope;
    beforeEach(module("budgeting.workspaces.budgetComments"));


    beforeEach(function() {
        gridModel = RealPage.spy();
        gridModel._createMethods(['subscribe', 'setConfig', 'setEmptyMsg', 'busy', 'flushData', 'getQuery', 'setData', 'addData', 'setFilterState']);


        var spy1 = function() {
            return gridModel;
        };

        var spy2 = RealPage.spy();
        spy2._createMethods(['abortGet','getComments','then']);


        var spy3 = RealPage.spy();
        spy3._createMethods(['getCommentsError']);


        var spy4 = RealPage.spy();
        spy4._createMethods(['getBdgtWorkflowStatusException']);

        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy5 = function(name) {
            appTranslate.name = name;
            return appTranslate;
        };

        module(function($provide) {
            $provide.value('rpGridModel', spy1);
            $provide.value('commentsSvc', spy2);
            $provide.value('commentsError', spy3);
            $provide.value('commentsConfig', spy4);
            $provide.value('appLangTranslate', spy5);
        });

    });

beforeEach(function() {
    function injector(a, b, c, d, e, f,g) {
        appTranslate = a;
        $filter = b;
        grid = c();
        cmntSVC = d;
        cmntErr = e;
        cmntConfig = f;
        model = g;
    }

    inject([
        'appLangTranslate','$filter',
        'rpGridModel', 'commentsSvc', 'commentsError', 'commentsConfig', 'budgetCommentsModel', injector
        ]);
});


it("Budget commnets init model, should subscribed to events and config", function() {
    expect(model.grid).not.toBe(undefined);
    expect(grid._called.subscribe).toBe(true);
    expect(grid._called.setConfig).toBe(true);
    expect(grid._callData.setConfig[0]).toBe(cmntConfig);
    expect(grid._called.setEmptyMsg).toBe(true);
});

it("budget load model, should fetch the data and bind the data", function () {
    model.load();
    expect(grid._called.flushData).toBe(true);
    expect(grid._called.busy).toBe(true);
    expect(grid._callData.busy[0]).toBe(true);
    expect(cmntSVC._called.abortGet).toBe(true);
    expect(cmntSVC._called.getComments).toBe(true);
    expect(cmntSVC._called.then).toBe(true);
    expect(cmntSVC._callData.then[0]).toBe(model.setGridData);
});

it("budget comment paginate model, should fetch the data and bind the data", function () {
    model.paginate();
    expect(grid._called.getQuery).toBe(true);
    expect(cmntSVC._called.abortGet).toBe(true);
    expect(cmntSVC._called.getComments).toBe(true);
    expect(cmntSVC._called.then).toBe(true);
    expect(cmntSVC._callData.then[0]).toBe(model.addGridData);
});

it("should return model grid data of budget comments", function () {
    model.grid={data:{id:1}};
    var gridData = model.getData();
    expect(gridData.id).toEqual(1);
});

it("set Grid Data model, bind the commnets data to grid", function () {
    var response = { data: { records: [{id:1},{id:2}] } };
    model.setGridData(response);
    expect(grid._called.setData).toBe(true);
    expect(grid._callData.setData[0]).toBe(response.data);
    expect(grid._called.busy).toBe(true);
        //expect(grid._called.busy[0]).toBe(false);
    });

it("add grid data  model, add the comments data to grid", function () {
    var response = { data: { records: [{id:1},{id:2}] } };
    model.addGridData(response);
    expect(grid._called.addData).toBe(true);
    expect(grid._callData.addData[0]).toBe(response.data);
});

it("calling add column data, shoud add column data", function () {
    var response = { data: { records: [{id:1},{id:2}] } };
    model.addColumnData(response);
    expect(response.data.records[0].comment).toEqual("Test Commnet1");
    expect(response.data.records[1].comment).toEqual("Test Commnet2");
});

it("set Grid Filter State model, comment grid filter state shoudl be set", function () {
    var state = {};
    model.setGridFilterState(state);
    expect(grid._called.setFilterState).toBe(true);
    expect(grid._callData.setFilterState[0]).toBe(state);

});

it("calling reset method of comments grid", function () {
    model.reset();
});


});