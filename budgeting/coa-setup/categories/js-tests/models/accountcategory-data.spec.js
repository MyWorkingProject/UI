describe("account category data model", function () {

    var appLangTranslate, model, catWizModel, catRowModel, dragSVC, dropSVC, catSVC, catComModel, $filter, $q, $rootScope;

    beforeEach(module("budgeting.coaSetup.categories"));


    beforeEach(function () {
        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy1 = RealPage.spy();
        spy1._createMethods(['setChartID', 'setisNext', 'updateWizard', 'saveCOARowsFailure', 'showNoDataMessage']);

        var spy3 = RealPage.spy();
        spy3._createMethods(['updateGLCatOption', 'getMaxSequence']);

        var svcMethod = ['saveCOARows'];
        var spy4 = RealPage.spy();
        spy4._createMethods(svcMethod);

        var spy5 = RealPage.spy();
        spy5._createMethods(['getaccountCategoryID', 'getRowType', 'showDelMsg', 'setDirtyBit']);

        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var draggableMock = RealPage.spy();
        draggableMock._createMethods(['dragPoint']);

        var spy6 = function () {
            return draggableMock;
        };

        var droppableMock = RealPage.spy();
        droppableMock._createMethods(['contains']);

        var spy7 = function () {
            return droppableMock;
        };

        module(function ($provide) {
            $provide.value('appLangTranslate', spy2);
            $provide.value('accountCategoryWiz', spy1);
            $provide.value('accountCategoryRow', spy3);
            $provide.value('rpDraggableSvc', spy6);

            $provide.value('rpDroppableSvc', spy7);
            $provide.value('categoriesSVC', spy4);
            $provide.value('accountCategoryCommon', spy5);
        });

        function injector(a, b, c, d, e, f, g, h, i, j, k) {
            appLangTranslate = a;
            $filter = b;
            catWizModel = c;
            catRowModel = d;
            dragSVC = e;
            dropSVC = f;
            catSVC = g;
            catComModel = h;
            $q = i;
            $rootScope = j;
            model = k;
        }

        inject(['appLangTranslate', '$filter', 'accountCategoryWiz', 'accountCategoryRow', 'rpDraggableSvc', 'rpDroppableSvc',
            'categoriesSVC', 'accountCategoryCommon', '$q', '$rootScope', 'accountCategoryData', injector]);
    });

    it("should set model accnt category list", function () {
        var data = { id: 1 };
        model.setAccountCategoryList(data);
        expect(model.accountCategoryList).toEqual(data);
    });

    it("should return model accnt category list", function () {
        var data = { id: 1 };
        model.setAccountCategoryList(data);
        var outPut = model.getAccountCategoryList();
        expect(outPut).toEqual(data);
    });

    it("should get model accnt category records list", function () {
        var data = { records: [{ id: 1 }] };
        model.setAccountCategoryList(data);
        var outPut = model.getAccountCategoryRecords();
        expect(outPut).toEqual(data.records);
    });

    it("should set model deleted accnt category list", function () {
        var data = { id: 1 };
        model.setDelAccountCategoryList(data);
        expect(model.delCategoryList).toEqual(data);
    });

    it("should return model deleted accnt category list", function () {
        var data = { id: 1 };
        model.setDelAccountCategoryList(data);
        var outPut = model.getDelAccountCategoryList();
        expect(outPut).toEqual(data);
    });

    it("verifying accnt category records list count", function () {
        var data = { records: [{ id: 1 }] };
        model.setAccountCategoryList(data);
        var outPut = model.getAccountCategoryListCount();
        expect(outPut).toEqual(1);
    });

    it("verifying reset of deleted accnt cat list", function () {
        var data = { records: [{ id: 1 }] };
        model.setDelAccountCategoryList(data);
        model.resetDelCategoryList();
        expect(model.delCategoryList.records.length).toEqual(0);
    });

    it("should return passed index data from category list", function () {
        var data = { records: [{ id: 1 }, { id: 2 }] };
        model.setAccountCategoryList(data);
        var outPut = model.getCategory(1);
        expect(outPut).toEqual(data.records[1]);
    });

    it("should not return data as  passed index is invalid", function () {
        var data = { records: [{ id: 1 }, { id: 2 }] };
        model.setAccountCategoryList(data);
        var outPut = model.getCategory(2);
        expect(outPut).toBe(undefined);
    });

    it("verifying the item is added to the deleted accnt cat list", function () {
        var data = { records: [{ id: 1 }] };
        model.setDelAccountCategoryList(data);
        var newRecord = { id: 2 };
        model.addDelAccountCategory(newRecord);
        expect(model.delCategoryList.records.length).toBe(2);
        expect(model.delCategoryList.records[1]).toEqual(newRecord);
    });

    it("shoudl update the sequence", function () {
        var data = { records: [{ id: 1 }, { id: 2 }] };
        model.setAccountCategoryList(data);
        model.updateSequence();
        expect(model.accountCategoryList.records[0].sequence).toBe(1);
        expect(model.accountCategoryList.records[1].sequence).toBe(2);
    });

    it("should get the params data", function () {
        var chartID = 1;
        var params = {
            chartID: chartID
        };
        var outPut = model.getParamData(chartID);
        expect(outPut).toEqual(params);
    });

    it("should get the category params data", function () {
        var chartID = 1, typeID = 2;
        var params = {
            chartID: chartID,
            accounttypeID: typeID
        };
        var outPut = model.getCategoryParam(chartID, typeID);
        expect(outPut).toEqual(params);
    });

    it("Verifying the saving of coaRows when records are present and saved without errors", function () {
        var Defered = $q.defer();
        var promise = Defered.promise;

        catSVC._returnData.saveCOARows = {
            $promise: promise
        };

        var data = { records: [{ id: 1 }, { id: 2 }] };
        model.setAccountCategoryList(data);


        var data1 = { data: { message: "Success" }, status: 200 };

        model.saveCoaRows(true, 1);
        Defered.resolve(data1);
        $rootScope.$apply();

        expect(catWizModel._called.setChartID).toBe(true);
        expect(catWizModel._called.setisNext).toBe(true);
        expect(catSVC._called.saveCOARows).toBe(true);
        expect(catWizModel._called.updateWizard).toBe(true);
        expect(model.delCategoryList.records.length).toEqual(0);
    });

    it("Verifying the saving of coaRows when records are present and error occurd while saving", function () {
        var Defered = $q.defer();
        var promise = Defered.promise;

        catSVC._returnData.saveCOARows = {
            $promise: promise
        };

        var data = { records: [{ id: 1 }, { id: 2 }] };
        model.setAccountCategoryList(data);


        var data1 = { data: { message: "Success" }, status: 400 };

        model.saveCoaRows(true, 1);
        Defered.reject(data1);
        $rootScope.$apply();

        expect(catWizModel._called.setChartID).toBe(true);
        expect(catWizModel._called.setisNext).toBe(true);
        expect(catSVC._called.saveCOARows).toBe(true);
        expect(catWizModel._called.saveCOARowsFailure).toBe(true);
        expect(model.delCategoryList.records.length).toEqual(0);
    });

    it("shoudl show no records messgae as no records to save", function () {

        var data = { records: [] };
        model.setAccountCategoryList(data);

        model.saveCoaRows(true, 1);
        expect(catWizModel._called.showNoDataMessage).toBe(true);
        expect(model.delCategoryList.records.length).toEqual(0);
    });

    it("Verifying the save coa row promise", function () {
        var Defered = $q.defer();
        var promise = Defered.promise;

        catSVC._returnData.saveCOARows = {
            $promise: promise
        };

        var data = { records: [{ id: 1 }, { id: 2 }] };
        var outPut = model.getSaveRowsPromise(1, data);

        expect(outPut).toEqual(promise);
    });

    it("verifying the sequence update for post data", function () {

        var data = { records: [{ id: 1 }, { id: 2 }] };
        model.setAccountCategoryList(data);
        var postData = {
            "coaReportRows": [],
            "deletedReportRows": []
        };
        model.updatePostSequence(postData);

        expect(postData.coaReportRows[0]).toEqual(data.records[0]);
        expect(postData.coaReportRows[0].sequence).toEqual(1);
        expect(postData.coaReportRows[1].sequence).toEqual(2);
        expect(postData.coaReportRows[1]).toEqual(data.records[1]);
    });

    it("verifying the deleted records of post data", function () {

        var data = { records: [{ coaReportRowID: 1 }, { coaReportRowID: 2 }] };
        model.setDelAccountCategoryList(data);
        var postData = {
            "coaReportRows": [],
            "deletedReportRows": []
        };
        model.updateDelCatList(postData);

        expect(postData.deletedReportRows[0]).toEqual(data.records[0].coaReportRowID);
        expect(postData.deletedReportRows[1]).toEqual(data.records[1].coaReportRowID);
    });

    it("verifying the level updation of coaRows", function () {

        var data = { records: [{ id: 1, groupNumber: 1 }, { id: 2, groupNumber: "" }, { id: 3, groupNumber: 2 }, { id: 4, groupNumber: 1 }] };
        model.setAccountCategoryList(data);

        model.updateCOARowLevels();
        var outPut = model.getAccountCategoryList();
        expect(outPut.records[0].level).toEqual(1);
        expect(outPut.records[1].level).toEqual(1);
        expect(outPut.records[2].level).toEqual(2);
        expect(outPut.records[3].level).toEqual(2);
    });

    it("verifying the update level of coa row when group state is undefined", function () {
        var addedGroupList = {
            "records": []
        };
        var groupState = {
            "open": true
        };
        var item = { groupState: undefined, groupNumber: 1 };
        model.updateLevel(item, addedGroupList, 1);

        expect(item.groupState).toEqual(groupState);
    });

    it("verifying the update level of coa row when group state is defined", function () {
        var addedGroupList = {
            "records": []
        };
        var groupState = {
            "open": true
        };
        var item = { groupState: { open: false }, groupNumber: 1 };
        model.updateLevel(item, addedGroupList, 1);

        expect(item.groupState.open).toBe(false);
    });

    it("verifying the updateRowLevel method when added list is empty", function () {
        var addedGroupList = {
            "records": []
        };
        var groupState = {
            "open": true
        };
        var item = { groupState: { open: false }, groupNumber: 1 };
        var outPut = model.updateRowLevel(item, addedGroupList, 1);

        expect(addedGroupList.records[0].groupNumber).toEqual(item.groupNumber);
        expect(outPut.overWrite).toBe(true);
        expect(outPut.level).toEqual(2);
    });

    it("verifying the updateRowLevel method when added list is not empty", function () {
        var addedGroupList = {
            "records": [{ groupNumber: 1 }]
        };
        var groupState = {
            "open": true
        };
        var item = { groupState: { open: false }, groupNumber: 1 };
        var outPut = model.updateRowLevel(item, addedGroupList, 1);

        expect(addedGroupList.records[0].groupNumber).toEqual(item.groupNumber);
        expect(outPut.overWrite).toBe(false);
        expect(outPut.level).toEqual(0);
    });

    it("verifying the updation of uniqu id and group number", function () {
        var data = { records: [{ id: 1, groupNumber: 1 }, { id: 1, groupNumber: "" }, { id: 1, groupNumber: 2 }, { id: 1, groupNumber: 1 }] };
        var outPut = model.updateUniqGroupData(data, 0, 1);

        expect(outPut.uniqID).toEqual(4);
        expect(outPut.groupNumber).toEqual(2);
    });

    it("should return the postion of category row item", function () {
        var data = { records: [{ id: 1, groupNumber: 1 }, { id: 2, groupNumber: "" }, { id: 3, groupNumber: 2 }, { id: 4, groupNumber: 1 }] };
        model.setAccountCategoryList(data);
        var outPut = model.getPosition(data.records[2]);

        expect(outPut.itemIndex).toEqual(2);
    });

    it("should return the postion as undefined as row is not found", function () {
        var data = { records: [{ id: 1, groupNumber: 1 }, { id: 1, groupNumber: "" }, { id: 1, groupNumber: 2 }, { id: 1, groupNumber: 1 }] };
        model.setAccountCategoryList(data);
        var item = { id: 20 };
        var outPut = model.getPosition(item);

        expect(outPut.itemIndex).toBe(undefined);
    });

    it("should remove the category item when index is passed", function () {
        var data = { records: [{ id: 1, groupNumber: 1 }, { id: 1, groupNumber: "" }, { id: 1, groupNumber: 2 }, { id: 1, groupNumber: 1 }] };
        model.setAccountCategoryList(data);
        var item = { itemIndex: 1 };
        model.removeCategory(item);

        expect(model.accountCategoryList.records.length).toBe(3);
    });

    it("should add the category item when index is passed", function () {
        var data = { records: [{ id: 1, groupNumber: 1 }, { id: 1, groupNumber: "" }, { id: 1, groupNumber: 2 }, { id: 1, groupNumber: 1 }] };
        model.setAccountCategoryList(data);
        var posn = { itemIndex: 1 };
        var newItem = { id: 6 };
        model.insertCategory(posn, newItem);

        expect(model.accountCategoryList.records.length).toBe(5);
        expect(model.accountCategoryList.records[1]).toEqual(newItem);
    });

    it("should move down the row to header row when it is header", function () {
        var data = { records: [{ id: 1, groupNumber: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false } }, { id: 3, groupNumber: 2 }, { id: 4, groupNumber: 1 }] };
        model.setAccountCategoryList(data);
        var startPosn = { itemIndex: 3 };
        var plhdrPosn = { itemIndex: 2 };
        var category = { id: 9 };
        model.moveDownCategory(plhdrPosn, startPosn, category);

    });

    it("should insert row to below header row when it is header", function () {
        var data = { records: [{ id: 1, groupNumber: 1 }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false } }, { id: 3, groupNumber: 2 }, { id: 4, groupNumber: 1 }] };
        model.setAccountCategoryList(data);
        var startPosn = { itemIndex: 3 };
        var plhdrPosn = { itemIndex: 2 };
        var category = { id: 9 };
        model.moveDownCategory(plhdrPosn, startPosn, category);

        expect(model.accountCategoryList.records[1].id).toBe(9);
    });

    it("should move the total row to below", function () {
        var data = { records: [{ id: 1, groupNumber: 1 }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false } }, { id: 3, groupNumber: 2, rowType: "SUB-TOTAL" }, { id: 4, groupNumber: 1 }] };
        model.setAccountCategoryList(data);
        var prevRow = { itemIndex: 3, groupNumber: 2 };
        var plhdrPosn = { itemIndex: 2 };
        var category = { id: 9 };
        model.moevDownTotalRow(prevRow, category, plhdrPosn);

        expect(model.accountCategoryList.records[3].id).toBe(9);
    });

    it("should add the row if total row was not found", function () {
        var data = { records: [{ id: 1, groupNumber: 1 }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false } }, { id: 3, groupNumber: 2, rowType: "Header" }, { id: 4, groupNumber: 1 }] };
        model.setAccountCategoryList(data);
        var prevRow = { itemIndex: 3, groupNumber: 2 };
        var plhdrPosn = { itemIndex: 2 };
        var category = { id: 9 };
        model.moevDownTotalRow(prevRow, category, plhdrPosn);

        expect(model.accountCategoryList.records[2].id).toBe(9);
    });

    it("verifying section rows move when movecalled is set", function () {
        var data = { records: [{ id: 1, groupNumber: 1 }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false } }, { id: 3, groupNumber: 2, rowType: "Header" }, { id: 4, groupNumber: 1 }] };
        model.setAccountCategoryList(data);
        var prevRow = { itemIndex: 3, groupNumber: 2 };
        var plhdrPosn = { itemIndex: 2 };
        var category = { id: 9, groupState: { open: false }, groupNumber: 2, rowType: "HEADER" };
        model.moveSectionRows(category, true, 1);

        expect(catRowModel._called.getMaxSequence).toBe(true);
    });

    it("verifying section rows move when movecalled is not set", function () {
        var data = { records: [{ id: 1, groupNumber: 1 }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false } }, { id: 3, groupNumber: 2, rowType: "Header" }, { id: 4, groupNumber: 1 }] };
        model.setAccountCategoryList(data);
        var prevRow = { itemIndex: 3, groupNumber: 2 };
        var plhdrPosn = { itemIndex: 2 };
        var category = { id: 9, groupState: { open: false }, groupNumber: 2 };
        model.moveSectionRows(category, false, 1);

        expect(catRowModel._called.getMaxSequence).toBe(undefined);
    });

    it("verifying moveRows when seq row is found", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1 }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4 }] };
        model.setAccountCategoryList(data);
        var prevRow = { itemIndex: 3, groupNumber: 2 };
        var plhdrPosn = { itemIndex: 2 };
        var category = { id: 3, groupState: { open: false }, groupNumber: 2 };
        var outPut = model.moveRows(category, 1, 4, 1);

        expect(outPut).toBe(4);
    });

    it("verifying moveRows when seq row is not found", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1 }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4 }] };
        model.setAccountCategoryList(data);
        var prevRow = { itemIndex: 3, groupNumber: 2 };
        var plhdrPosn = { itemIndex: 2 };
        var category = { id: 3, groupState: { open: false }, groupNumber: 2 };
        var outPut = model.moveRows(category, 1, 6, 5);

        expect(outPut).toBe(1);
    });

    it("verifying moveUpdate method", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1 }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4 }] };
        model.setAccountCategoryList(data);
        var seqRow = [{ itemIndex: 3, groupNumber: 2, id: 4 }];
        var curIndex = { itemIndex: 2, id: 44 };
        var copyExist = { id: 3, groupState: { open: false }, groupNumber: 2 };
        var outPut = model.moveUpdate(curIndex, copyExist, seqRow);

        expect(curIndex.itemIndex).toBe(2);
    });

    it("verifying DropIndex method when drag point is found", function () {
        var data = { records: [{ id: 'plhdr' }, { id: 1, groupNumber: 1, sequence: 1 }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4 }] };
        model.setAccountCategoryList(data);
        // dropSVC._returnData.contains = true;
        var category = { itemIndex: 3, groupNumber: 2, id: 4 };
        var plhdrPosn = { itemIndex: 2, id: 2 };
        var outPut = model.getDropIndex(category, plhdrPosn);
    });

    it("verifying DropIndex method when drag point is not found", function () {
        var data = { records: [{ id: 'plhdr' }, { id: 1, groupNumber: 1, sequence: 1 }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4 }] };
        model.setAccountCategoryList(data);
        //dropSVC._returnData.contains = false;
        var category = { itemIndex: 3, groupNumber: 2, id: 4 };
        var plhdrPosn = { itemIndex: 2, id: 2 };
        var outPut = model.getDropIndex(category, plhdrPosn);
    });

    it("verifying item is removed from list when row type is HEADER", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER" }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL" }] };
        model.setAccountCategoryList(data);
        var category = { id: 1, rowType: "HEADER", groupNumber: 1 };
        model.removeFromList(category);
        expect(model.accountCategoryList.records.length).toBe(2);
    });

    it("verifying item is removed from list when row type is SUB-TOTAL", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER" }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL" }] };
        model.setAccountCategoryList(data);
        var category = { id: 4, rowType: "SUB-TOTAL", groupNumber: 1 };
        model.removeFromList(category);
        expect(model.accountCategoryList.records.length).toBe(2);
    });

    it("verifying item is removed from list when row type is Category", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "Category" }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL" }] };
        model.setAccountCategoryList(data);
        var category = { id: 1, rowType: "Category" };
        model.removeFromList(category);
        expect(model.accountCategoryList.records.length).toBe(3);
    });

    it("verifying item is removed from list when removeCoaRow is called", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "Category" }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL" }] };
        model.setAccountCategoryList(data);
        var category = { id: 1, rowType: "Category" };
        model.removeCoaRow(category);
        expect(model.accountCategoryList.records.length).toBe(3);
    });

    it("verifying dependent row is removed from list when main row is deleted and row type is Header", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER" }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL" }] };
        model.setAccountCategoryList(data);
        var category = { id: 1, rowType: "Category", groupNumber: 1 };
        model.deleteDependentRow(category, "HEADER");
        expect(model.accountCategoryList.records.length).toBe(3);
    });

    it("verifying dependent row is removed from list when main row is deleted and row type is Header", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER" }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL" }] };
        model.setAccountCategoryList(data);
        var category = { id: 1, rowType: "Category", groupNumber: 1 };
        model.deleteDependentRow(category, "HEADER");
        expect(model.accountCategoryList.records.length).toBe(3);
    });

    it("verifying dependent row is removed from list when main row is deleted and row type is Category", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER" }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL" }] };
        model.setAccountCategoryList(data);
        var category = { id: 1, rowType: "Category", groupNumber: 1 };
        model.deleteDependentRow(category, "Category");
        expect(model.accountCategoryList.records.length).toBe(4);
    });

    it("verifying when row is deleted, it is added to deleted list", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER" }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL" }] };
        model.setAccountCategoryList(data);
        var category = { coaReportRowID: 1, rowType: "Category", groupNumber: 1 };
        model.delCategoryList = { records: [{}] };
        model.addToDeletedCOARows(category);
        expect(model.delCategoryList.records[1]).toEqual(category);
    });

    it("verifying when row is deleted, it is added to deleted list", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER" }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL" }] };
        model.setAccountCategoryList(data);
        var category = { coaReportRowID: 0, rowType: "Category", groupNumber: 1 };
        model.delCategoryList = { records: [{}] };
        model.addToDeletedCOARows(category);
    });

    it("calling update sequence", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER" }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL" }] };
        model.setAccountCategoryList(data);
        model.updateSeqLevel();
    });

    it("calling deactive when placholder index is less then start pos", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER" }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3 }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL" }] };
        model.setAccountCategoryList(data);
        model.plhdrPosn = { itemIndex: 1 };
        model.startPosn = { itemIndex: 2 };
        var category = { coaReportRowID: 1, rowType: "Category", groupNumber: 1 };
        model.deactive(category);
    });

    it("calling deactive when placholder index is grtr then start pos", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);
        model.plhdrPosn = { itemIndex: 2 };
        model.startPosn = { itemIndex: 1 };
        var category = { coaReportRowID: 1, rowType: "Category", groupNumber: 1 };
        model.deactive(category);
    });

    it("calling getLastClickedRow when lst clicked row is -1", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);

        var outPut = model.getLastClickedRow(-1);
        expect(outPut[0]).toEqual({});
    });

    it("calling getLastClickedRow when lst clicked row is valid id", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);

        var outPut = model.getLastClickedRow(2);
        expect(outPut[0]).toEqual(data.records[1]);
    });

    it("calling getPositionRow when New  row is Header", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);
        var category = [{ id: 1, rowType: "HEADER", groupNumber: 1 }];
        var outPut = model.getPositionRow(category, "section");
        expect(outPut).toEqual(data.records[3]);
    });

    it("calling getPositionRow when New  row is Header", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);
        var category = [{ id: 1, rowType: "Sub-Total", groupNumber: 1 }];
        var outPut = model.getPositionRow(category, "section");
        expect(outPut).toEqual(category[0]);
    });

    it("calling getSectionFooterRow when New  row is Header", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);
        var category = [{ id: 1, rowType: "HEADER", groupNumber: 1 }];
        var outPut = model.getSectionFooterRow(category);
        expect(outPut).toEqual(data.records[3]);
    });

    it("calling addCoaRow when laset clicked row index is undefined", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);
        var category = { id: 11, rowType: "HEADER", groupNumber: 1 };
        var NewRow = { id: 5, rowType: "HEADER", groupNumber: 1 };
        model.addCoaRow(category, NewRow);
        expect(model.accountCategoryList.records.length).toEqual(5);
        expect(model.accountCategoryList.records[0]).toEqual(NewRow);
    });

    it("calling addCoaRow when laset clicked row index is defined", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);
        var category = { id: 1, rowType: "HEADER", groupNumber: 1 };
        var NewRow = { id: 5, rowType: "HEADER", groupNumber: 1 };
        model.addCoaRow(category, NewRow);
        expect(model.accountCategoryList.records.length).toEqual(5);
        expect(model.accountCategoryList.records[1]).toEqual(NewRow);
    });

    it("calling addSubTotalRow when laset clicked row index is defined", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);
        var category = { id: 1, rowType: "HEADER", groupNumber: 1 };
        var NewRow = { id: 5, rowType: "HEADER", groupNumber: 1 };
        model.addSubTotalRow(category, NewRow);
        expect(model.accountCategoryList.records.length).toEqual(5);
        expect(model.accountCategoryList.records[1]).toEqual(NewRow);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
        expect(catRowModel._callData.updateGLCatOption[0]).toEqual(NewRow);
    });

    it("verifying the row to be deleted is refered by other row, showing message", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);
        catComModel._returnData.getaccountCategoryID = 1;
        catComModel._returnData.getRowType = "REF-CATEGORY";

        var category = { id: 1, rowType: "HEADER", groupNumber: 1 };
        var outPut = model.isReferd(category);
        expect(outPut).toBe(true);
        expect(catComModel._called.showDelMsg).toBe(true);
        expect(catComModel._callData.showDelMsg[0]).toBe(true);
    });

    it("verifying the row to be deleted is not refered by other row, not showing message", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);
        catComModel._returnData.getaccountCategoryID = 1;
        catComModel._returnData.getRowType = "CATEGORY";

        var category = [{ id: 1, rowType: "HEADER", groupNumber: 1 }];
        var outPut = model.isReferd(category);
        expect(outPut).toBe(false);
        expect(catComModel._called.showDelMsg).toBe(undefined);
    });

    it("verifying adding of section row", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);

        var category = [{ id: 1, rowType: "HEADER", groupNumber: 1 }];
        var NewRow = { id: 5, rowType: "HEADER", groupNumber: 1 };
        model.addSectionRow(NewRow, category, "SubSection");
        expect(model.accountCategoryList.records.length).toEqual(5);
        expect(model.accountCategoryList.records[1]).toEqual(NewRow);
    });

    it("shoudl return last clicked id as -1 when category list is undefined", function () {
        model.accountCategoryList = { records: {} };
        var outPut = model.getLastClickedID(1);
        expect(outPut).toEqual(-1);
    });

    it("shoudl return last clicked id as passed paramter when category list is defined", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);
        var outPut = model.getLastClickedID(1);
        expect(outPut).toEqual(1);
    });

    it("calling move method when place hodler position is defined", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);
        model.plhdrPosn = { itemIndex: 2 };
        model.startPosn = { itemIndex: 1 };
        var category = { id: 1, rowType: "HEADER", groupNumber: 1 };
        model.move(category);
        expect(catComModel._called.setDirtyBit).toBe(true);
        expect(catComModel._callData.setDirtyBit[0]).toEqual(category);
    });

    it("calling move method when place hodler position is not  defined", function () {
        //var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        //model.setAccountCategoryList(data);
        model.accountCategoryList = { records: [{ id: 'plhdr' }] };
        model.plhdrPosn = { itemIndex: 20 };
        model.startPosn = { itemIndex: 10 };
        var category = { id: 21, rowType: "HEADER", groupNumber: 1 };
        model.move(category);
        expect(catComModel._called.setDirtyBit).toBe(undefined);
    });

    it("calling activate method ", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        model.setAccountCategoryList(data);
        model.plhdrPosn = { itemIndex: 20 };
        model.startPosn = { itemIndex: 10 };
        var category = { id: 2, rowType: "HEADER", groupNumber: 1 };
        model.activate(category);
        expect(model.startPosn.itemIndex).toEqual(1);
    });



});