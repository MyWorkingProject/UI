describe("clone chart validation model", function () {
    var model, appTranslate, dialogModel, $filter, $location, cloneModel;

    beforeEach(module("budgeting.coaSetup.cloneMasterchart"));


    beforeEach(function () {

        var spy1 = RealPage.spy();

        var mocks = {
            'rp.common.dialog': ['rpDialogModel']
        };

        RealPage.ngMocks.install(mocks);

        var spy2 = RealPage.spy();
        spy2._createMethods(['saveData']);

        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy3 = function (name) {
            appTranslate.name = name;
            return appTranslate;
        };


        var spy4 = RealPage.spy();
        spy4._createMethods(['path', 'absUrl']);

        module(function ($provide) {
            //$provide.value('rpDialogModel', spy1);
            $provide.value('cloneMasterChartModel', spy2);
            $provide.value('appLangTranslate', spy3);
            $provide.value('$location', spy4);
            // $provide.value('$resource', $resource);
            //$provide.service('propertyChartSvc', spy5);
        });

    });

    afterEach(function () {
        dialogModel._reset();
    });

    beforeEach(function () {
        function injector(a, b, c, d, e, f) {
            appTranslate = a;
            dialogModel = b();
            $filter = c;
            $location = d;
            cloneModel = e;
            model = f;
        }

        inject([
             'appLangTranslate', 'rpDialogModel', '$filter',
            '$location',
            'cloneMasterChartModel',
            'cloneMasterChartValidationModel', injector]);
        //chartSVC.getPropertyChartList = function () {

    });

    it("save method, should call model save", function () {
        model.saveSelectedData();
        expect(cloneModel._called.saveData).toBe(true);
        //expect(grid._callData.setEmptyMsg[0]).toBe('No results were found.');
    });

    it("update Clone Data, should set the data to model", function () {
        var masterChartID = 2;
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        model.updateCloneData(data, masterChartID);
    });

    it("calling update dialog operations, when master chart id is valid", function () {
        var masterChartID = 2;
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        var chekedRows = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        model.updateDilogOperation(chekedRows, masterChartID, data);
    });

    it("calling update dialog operations, when master chart id is in valid", function () {
        var masterChartID = "";
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        var chekedRows =
            [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }];

        model.updateDilogOperation(chekedRows, masterChartID, data);
    });

    it("calling Save selected data", function () {
        model.SaveSelForUpdateDilogOp();
        //expect(grid._callData.setEmptyMsg[0]).toBe('No results were found.');
    });

    it("calling update dialog operations methods, when cloned chart id is equal to current chart id", function () {
        var masterChartID = 1;
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        var chekedRows =
            [{
                "clonedMasterChartID": masterChartID,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }];

        model.updateDilogOperations(chekedRows, masterChartID, data);
    });

    it("calling update dialog operations methods, when cloned chart id is not equal to current chart id", function () {
        var masterChartID = 1;
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        var chekedRows =
            [
            {
                "clonedMasterChartID": 2,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }];

        model.updateDilogOperations(chekedRows, masterChartID, data);
    });

    it("calling update dialog operations methods, when cloned chart id is equal to -2 (no chart for property)", function () {
        var masterChartID = 1;
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        var chekedRows = [
            {
                "clonedMasterChartID": -2,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }];

        model.updateDilogOperations(chekedRows, masterChartID, data);
    });

    it("calling update Clone Data Default Params", function () {
        model.updateCloneDataDefParams();
        expect(model.bOverWrite).toBe(false);
        expect(model.bClone).toBe(false);
        expect(model.shownOverWriteMsg).toBe(false);
        expect(model.shownCloneMsg).toBe(false);
        expect(model.showPopup).toBe(false);

    });

    it("calling set dialog object, verifying the data is copied correctly", function () {
        var obj = {
            masterChartID: 0,
            info: 'Test',
            title: 'Test',
            cntBtnType: 'Cncl',
            cnclBtnType: 'Cnt',
            type: 't'
        };
        model.setDialogObj(obj);
        expect(model.dialogObj).toEqual(obj);
    });

    it("Showing the dialog for confirm cloning", function () {
        var masterChartID = 1;
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };

        model.shownCloneMsg = false;
        model.shownOverWriteMsg = false;
        model.updateCloneDataDilogContinue(data, masterChartID);
        expect(model.shownCloneMsg).toBe(true);
        expect(model.showPopup).toBe(true);
    });

    it("Not showing the dialog for confirm cloning,when it is already shown", function () {
        var masterChartID = 1;
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };

        model.shownCloneMsg = true;
        model.shownOverWriteMsg = false;
        model.updateCloneDataDilogContinue(data, masterChartID);
    });

    it("Showing the over write dialog for confirm cloning", function () {
        var masterChartID = 1;
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };

        model.shownOverWriteMsg = false;
        model.shownCloneMsg = false;
        //model.showPopup = false;
        model.updateCloneDataDilogInfo(data, masterChartID);
        expect(model.shownOverWriteMsg).toBe(true);
        expect(model.showPopup).toBe(true);
    });

    it("Not showing the over write dialog for confirm cloning,when it is already shown", function () {
        var masterChartID = 1;
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };

        model.shownOverWriteMsg = true;
        model.shownCloneMsg = false;
        model.updateCloneDataDilogInfo(data, masterChartID);
    });

    it("Calling get filter method", function () {
        var masterChartID = 1;
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };

        var chekedRows = [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }];

        var filterRecords = model.getFilteredRecords(data);
        expect(filterRecords).toEqual(chekedRows);
    });

    it("continue the loop, after shwoing the message and shwoing the over write msg", function () {
        var masterChartID = 2;
        var calledFrom = "main", msg = "";

        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        model.data = data;
        model.continueOverRide(msg, calledFrom, masterChartID);
        expect(model.shownCloneMsg).toBe(true);
        expect(model.showPopup).toBe(false);
    });

    it("continue the loop, after shwoing the message, not showing over write msg", function () {
        var masterChartID = 1;
        var calledFrom = "Sub", msg = "";

        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        model.data = data;
        model.continueOverRide(msg, calledFrom, masterChartID);
    });

    it("iterating continue over write, when clone chart id is equal to master chart id", function () {
        var masterChartID = 1;
        var calledFrom = "Sub", msg = "";

        var chekedRows = [
           {
               "clonedMasterChartID": masterChartID,
               "propertyID": 2190606,
               "propertyName": "Villa Verano",
               "currentChart": "Conventional COA",
               "lastClonedDate": "05/03/2010",
               "clonedBy": "",
               "isSelected": true,
               "masterChartID": masterChartID,
               "totalRecords": 1
           }];

        model.ittrateContinueOverRide(chekedRows, masterChartID, calledFrom);
        expect(model.showPopup).toBe(false);
    });

    it("iterating continue over write, when clone chart id is equal to -2", function () {
        var masterChartID = 1;
        var calledFrom = "Sub", msg = "";

        var chekedRows = [
           {
               "clonedMasterChartID": -2,
               "propertyID": 2190606,
               "propertyName": "Villa Verano",
               "currentChart": "Conventional COA",
               "lastClonedDate": "05/03/2010",
               "clonedBy": "",
               "isSelected": true,
               "masterChartID": masterChartID,
               "totalRecords": 1
           }];

        model.ittrateContinueOverRide(chekedRows, masterChartID, calledFrom);
        expect(model.showPopup).toBe(false);
    });

    it("iterating continue over write, when clone chart id is equal to -2", function () {
        var masterChartID = 1;
        var calledFrom = "Sub", msg = "";

        var chekedRows = [
           {
               "clonedMasterChartID": -2,
               "propertyID": 2190606,
               "propertyName": "Villa Verano",
               "currentChart": "Conventional COA",
               "lastClonedDate": "05/03/2010",
               "clonedBy": "",
               "isSelected": true,
               "masterChartID": masterChartID,
               "totalRecords": 1
           }];

        model.ittrateContinueOverRide(chekedRows, masterChartID, calledFrom);
        expect(model.showPopup).toBe(false);
    });


    it("calling cancel over write when user clicks on cancel of over write and caling save data method", function () {
        var masterChartID = 1;
        var calledFrom = "sub", msg = "";

        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        model.data = data;

        model.cancelOverRide(msg, calledFrom, masterChartID);
    });

    it("calling cancel over write when user clicks on cancel of over write and not save method", function () {
        var masterChartID = 1;
        var calledFrom = "main", msg = "";

        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        model.data = data;
        model.cancelOverRide(msg, calledFrom, masterChartID);
    });

    it("iterating cancel over write, when cancel is clicked", function () {
        var masterChartID = 1;
        var calledFrom = "main", msg = "";

        var chekedRows = [
           {
               "clonedMasterChartID": 1,
               "propertyID": 2190606,
               "propertyName": "Villa Verano",
               "currentChart": "Conventional COA",
               "lastClonedDate": "05/03/2010",
               "clonedBy": "",
               "isSelected": true,
               "masterChartID": masterChartID,
               "totalRecords": 1
           }];

        model.ittrateCancelOverRide(chekedRows, masterChartID, calledFrom);
    });

    it("iterating cancel over write, when cancel is clicked", function () {
        var masterChartID = 1;
        var calledFrom = "main", msg = "";

        var chekedRows = [
           {
               "clonedMasterChartID": -2,
               "propertyID": 2190606,
               "propertyName": "Villa Verano",
               "currentChart": "Conventional COA",
               "lastClonedDate": "05/03/2010",
               "clonedBy": "",
               "isSelected": true,
               "masterChartID": masterChartID,
               "totalRecords": 1
           }];

        model.ittrateCancelOverRide(chekedRows, masterChartID, calledFrom);
    });



    it("showing clone sure messgae, after showing over write message ", function () {
        var masterChartID = 1;
        var calledFrom = "main", clonedMasterChartID = 2;

        model.cancelContinueOverwriteDilog(clonedMasterChartID, masterChartID, calledFrom);
        expect(model.showPopup).toBe(true);
        expect(model.shownCloneMsg).toBe(true);
    });

    it("not showing clone sure messgae, after showing over write message when called from message dialog ", function () {
        var masterChartID = 1;
        var calledFrom = "sub", clonedMasterChartID = 2;
        model.cancelContinueOverwriteDilog(clonedMasterChartID, masterChartID, calledFrom);
    });

    it("calling continue clone,and calling save method when over write clone is already shown", function () {
        var masterChartID = 1;
        var calledFrom = "sub", clonedMasterChartID = 2, msg = "";
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        model.data = data;
        model.continueClone(msg, calledFrom, masterChartID);
    });

    it("calling continue clone,and calling save method when over write clone is already shown", function () {
        var masterChartID = 1;
        var calledFrom = "main", clonedMasterChartID = 2, msg = "";
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        model.data = data;
        model.continueClone(msg, calledFrom, masterChartID);
    });

    it("calling iterate continue clone method, when cloned and current chart are different", function () {
        var masterChartID = 1;
        var calledFrom = "main", clonedMasterChartID = 2, msg = "";
        var chekedRows = [
           {
               "clonedMasterChartID": 2,
               "propertyID": 2190606,
               "propertyName": "Villa Verano",
               "currentChart": "Conventional COA",
               "lastClonedDate": "05/03/2010",
               "clonedBy": "",
               "isSelected": true,
               "masterChartID": masterChartID,
               "totalRecords": 1
           }];
        model.ittrateContinueClone(chekedRows, masterChartID, calledFrom);
    });

    it("calling iterate continue clone method, when cloned chart is empty", function () {
        var masterChartID = 1;
        var calledFrom = "main", clonedMasterChartID = 2, msg = "";
        var chekedRows = [
           {
               "clonedMasterChartID": -2,
               "propertyID": 2190606,
               "propertyName": "Villa Verano",
               "currentChart": "Conventional COA",
               "lastClonedDate": "05/03/2010",
               "clonedBy": "",
               "isSelected": true,
               "masterChartID": masterChartID,
               "totalRecords": 1
           }];
        model.ittrateContinueClone(chekedRows, masterChartID, calledFrom);
    });

    it("calling continue cancel mehtod dialog, when msg is not shown", function () {
        var masterChartID = 1;
        var calledFrom = "main", clonedMasterChartID = 1, msg = "";
        model.shownOverWriteMsg = false;
        
        model.continueCancelCloneDilog(clonedMasterChartID, masterChartID, calledFrom);
        expect(model.shownOverWriteMsg).toBe(true);
        expect(model.showPopup).toBe(true);
    });

    it("calling continue cancel mehtod dialog, when msg is already shown", function () {
        var masterChartID = 1;
        var calledFrom = "sub", clonedMasterChartID = 1, msg = "";
        model.shownOverWriteMsg = false;

        model.continueCancelCloneDilog(clonedMasterChartID, masterChartID, calledFrom);
        expect(model.shownOverWriteMsg).toBe(false);
    });

    it("calling cancle clone, when cancle is clicked and callign save method if continue is clicked for over write message", function () {
        var masterChartID = 1;
        var calledFrom = "sub", clonedMasterChartID = 1, msg = "";
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        model.data = data;
        model.cancelClone(msg, calledFrom, masterChartID);
        expect(model.shownOverWriteMsg).toBe(false);
    });

    it("calling cancle clone, when cancle is clicked and not callign save method if already called the save", function () {
        var masterChartID = 1;
        var calledFrom = "main", clonedMasterChartID = 1, msg = "";
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": masterChartID,
                "totalRecords": 1
            }]
        };
        model.data = data;
        model.cancelClone(msg, calledFrom, masterChartID);
        //expect(model.shownOverWriteMsg).toBe(false);
    });

    it("iterating cancel clone methoid to reselct the selected rows", function () {
        var masterChartID = 1;
        var calledFrom = "main", clonedMasterChartID = 1, msg = "";
        var chekedRows = [
          {
              "clonedMasterChartID": -2,
              "propertyID": 2190606,
              "propertyName": "Villa Verano",
              "currentChart": "Conventional COA",
              "lastClonedDate": "05/03/2010",
              "clonedBy": "",
              "isSelected": true,
              "masterChartID": masterChartID,
              "totalRecords": 1
          }];
       
        model.ittratecancelClone(chekedRows, masterChartID, calledFrom);
        
    });

    it("iterating cancel clone methoid to reselct the selected rows, when cuurent and clone chart are same", function () {
        var masterChartID = 1;
        var calledFrom = "main", clonedMasterChartID = 1, msg = "";
        var chekedRows = [
          {
              "clonedMasterChartID": 1,
              "propertyID": 2190606,
              "propertyName": "Villa Verano",
              "currentChart": "Conventional COA",
              "lastClonedDate": "05/03/2010",
              "clonedBy": "",
              "isSelected": true,
              "masterChartID": masterChartID,
              "totalRecords": 1
          }];
        
        model.ittratecancelClone(chekedRows, masterChartID, calledFrom);
       
    });

    it("calling is isReload method", function () {
        var reload = model.isReload();
    });

    it("calling  setReload method", function () {
        model.setReload(true);
        expect(model.reLoad).toBe(true);
    });

    it("calling show dialog for clone message, verifying the show dialog is called", function () {
        model.showDialog();
        expect(dialogModel._called.show).toBe(true);
    });

    it("verifying dialog subscribe method when cancel is clicked", function () {
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": 1,
                "totalRecords": 1
            }]
        };
        model.data = data;
        model.dialogObj.cntBtnType = "cancel";
        model.dialogObj.type = "warn";
        model.dialogObj.masterChartID = 1;
        model.showConfirmMethod("cancel");
    });

    it("verifying dialog subscribe method when continue is clicked", function () {
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": 1,
                "totalRecords": 1
            }]
        };
        model.data = data;
        model.dialogObj.cntBtnType = "cancel";
        model.dialogObj.type = "warn";
        model.dialogObj.masterChartID = 1;
        model.showConfirmMethod("continue");
    });

    it("verifying dialog subscribe method when data is invalid", function () {
        model.dialogObj.cntBtnType = "cancel";
        model.dialogObj.type = "warn";
        model.dialogObj.masterChartID = 1;
        model.showConfirmMethod("invalid");
    });

    it("calling show dialog for over write message message, verifying the show dialog is called", function () {
        model.showDialogOverRide();
        expect(dialogModel._called.show).toBe(true);
    });

    it("verifying dialog subscribe method when cancel is clicked", function () {
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": 1,
                "totalRecords": 1
            }]
        };
        model.data = data;
        model.dialogObj.cntBtnType = "cancel";
        model.dialogObj.type = "warn";
        model.dialogObj.masterChartID = 1;
        model.showOverRideMethod("cancel");
    });

    it("verifying dialog subscribe method when continue is clicked", function () {
        var data = {
            "records": [
            {
                "clonedMasterChartID": 1,
                "propertyID": 2190606,
                "propertyName": "Villa Verano",
                "currentChart": "Conventional COA",
                "lastClonedDate": "05/03/2010",
                "clonedBy": "",
                "isSelected": true,
                "masterChartID": 1,
                "totalRecords": 1
            }]
        };
        model.data = data;
        model.dialogObj.cntBtnType = "cancel";
        model.dialogObj.type = "warn";
        model.dialogObj.masterChartID = 1;
        model.showOverRideMethod("continue");
    });

    it("verifying dialog subscribe method when data is invalid", function () {
        model.dialogObj.cntBtnType = "cancel";
        model.dialogObj.type = "warn";
        model.dialogObj.masterChartID = 1;
        model.showOverRideMethod("invalid");
    });


});