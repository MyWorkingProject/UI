// Roles List Dialog Model Tests

describe('Masterchart List Actions', function () {
    var model, appLangTranslate, masterChartsListSvc, masterchartNotifications, masterchartGridFactory, newMasterchartModel, $location, $q, promise, $rootScope;

    beforeEach(module('budgeting.coaSetup.mastercharts'));

    beforeEach(function () {
        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var spy2 = RealPage.spy();
        spy2._createMethods(['copyMasterChart', 'deleteMasterChart', 'then']);

        var spy3 = RealPage.spy();
        spy3._createMethods(['showSuccessNotification', 'showErrorNotification']);

        var spy4 = RealPage.spy();
        spy4._createMethods(['load']);

        var spy5 = RealPage.spy();
        spy5._createMethods(['edit']);

        var spy6 = RealPage.spy();
        spy6._createMethods(['path']);

        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('masterChartsListSvc', spy2);
            $provide.value('masterchartNotifications', spy3);
            $provide.value('masterchartGridFactory', spy4);
            $provide.value('newMasterchartModel', spy5);
            $provide.value('$location', spy6);
        });

        function injector(a, b, c, d, e, f, g, h, i) {
            appLangTranslate = a;
            masterChartsListSvc = b;
            masterchartNotifications = c;
            masterchartGridFactory = d;
            newMasterchartModel = e;
            $location = f;
            model = g;
            $q = h;
            $rootScope = i;

        }

        inject(['appLangTranslate',
            'masterChartsListSvc',
            'masterchartNotifications',
            'masterchartGridFactory',
            'newMasterchartModel',
            '$location',
            'masterchartListActions', '$q', '$rootScope',
            injector
        ]);
    });

    it('copyOnSuccess method calls on sucessess of service call', function () {
        var data = {
            "success": true,
        };
        model.copyOnSuccess(data);
        expect(masterchartGridFactory._called.load).toBe(true);
        expect(masterchartNotifications._called.showSuccessNotification).toBe(true);
    });

    it('copyMasterChartException method calls when exception in service call', function () {
        var resp = {
            "status": 400
        };
        model.copyMasterChartException(resp);
        expect(masterchartNotifications._called.showErrorNotification).toBe(true);
    });

    it('copyMasterChartException method calls when exception in service call', function () {
        var resp = {
            "status": 200
        };
        model.copyMasterChartException(resp);
        expect(masterchartNotifications._called.showErrorNotification).toBe(undefined);
    });

    it('viewMasterChart method sets the edit and view mode of the page in model', function () {
        var record = {
            "status": "Completed",
            "masterchartId": 1
        };
        model.viewMasterChart(record);
        expect(newMasterchartModel._called.edit).toBe(true);
        model.isRecordsCompleted(record);
        model.moveToViewMode(record);
    });

    it('viewMasterChart method sets the edit and view mode of the page in model', function () {
        var record = {
            "status": "",
            "masterchartId": 1,
            "isAlternativeCOA": true
        };
        model.viewMasterChart(record);
        expect(newMasterchartModel._called.edit).toBe(true);
        model.isRecordsCompleted(record);
        model.moveToWizard(record);
        model.isRecordAlternative(record);
    });

    it('viewMasterChart method sets the edit and view mode of the page in model', function () {
        var record = {
            "status": "",
            "masterchartId": 1,
            "isAlternativeCOA": false
        };
        model.viewMasterChart(record);
        expect(newMasterchartModel._called.edit).toBe(true);
        model.isRecordsCompleted(record);
        model.moveToWizard(record);
        model.isRecordAlternative(record);
    });

    it('editMasterChart method calls when action link edid clicked', function () {
        var record = {
            "status": "Completed",
            "masterchartId": 1,
            "isAlternativeCOA": true
        };
        model.editMasterChart(record);
        expect(newMasterchartModel._called.edit).toBe(true);
        model.isRecordsCompleted(record);
        model.moveToWizard(record);
        model.isRecordAlternative(record);
    });

    it('setEditViewMode mothod in model is called', function () {
        model.setEditViewMode();
        expect(newMasterchartModel._called.edit).toBe(true);
    });

    it('getDelDialogTitle method returns dialog message', function () {
        model.dilogMessages = {
            deletDilogMessage: "abc"
        };
        model.getDelDialogTitle();
    });

    it('getDelDialogQues method returns dialog message', function () {
        model.dilogMessages = {
            deletDilogQuestion: "abc"
        };
        model.getDelDialogQues();
    });

    it('getDelDialogInfo method returns dialog message', function () {
        model.dilogMessages = {
            deletDilogMessageInfo: "abc"
        };
        model.getDelDialogInfo();
    });

    it('getDeleteButtonText method returns dialog message', function () {
        model.dilogMessages = {
            deleteButton: "abc"
        };
        model.getDeleteButtonText();
    });

    it('loadGridDataOnSuccess message calls on master chart delete success', function () {
        var data = {
            "success": true,
        };
        model.loadGridDataOnSuccess(data);
        expect(masterchartGridFactory._called.load).toBe(true);
    });

    it('showErrorMessag shows the delete message and validation occurs on deletion', function () {
        var resp = {
            status: 400,
            data: {
                message: "CHART_CLONED"
            }
        };
        model.dilogMessages = {
            unDeleteReason: "abc"
        };
        model.showErrorMessage(resp);
        expect(masterchartNotifications._called.showErrorNotification).toBe(true);
    });

    it('showErrorMessag shows the delete message and validation occurs on deletion for different message status', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID_PARAM"
            }
        };
        model.dilogMessages = {
            msgInvalidParam: "abc"
        };
        model.showErrorMessage(resp);
        expect(masterchartNotifications._called.showErrorNotification).toBe(true);
    });

    it('showErrorMessag shows the delete message and validation occurs on deletion for different message status', function () {
        var resp = {
            status: 400,
            data: {
                message: "INVALID"
            }
        };
        model.dilogMessages = {
            msgInvalidParam: "abc"
        };
        model.showErrorMessage(resp);
        expect(masterchartNotifications._called.showErrorNotification).toBe(true);
    });

    it('showErrorMessag shows the delete message and validation occurs on deletion for different message status', function () {
        var resp = {
            status: 200,
            data: {
                message: ""
            }
        };
        model.dilogMessages = {
            msgInvalidParam: ""
        };
        model.showErrorMessage(resp);
        expect(masterchartNotifications._called.showErrorNotification).toBe(true);
    });

    it("copyChart, when copy master chart of action link calls success method", function () {

        var Defered = $q.defer();
        promise = Defered.promise;

        masterChartsListSvc._returnData.copyMasterChart = {
            $promise: promise
        };

        var paramsData = {
            masterChartID: 1,
            isAlternativeCOA: false
        };
        var data = {
            records: {
                messageText: "Success"
            },
            status: 200
        };

        model.copyChart(paramsData);
        Defered.resolve(data);
        $rootScope.$apply();
        expect(masterchartGridFactory._called.load).toBe(true);
        expect(masterchartNotifications._called.showSuccessNotification).toBe(true);
    });

    it("deleteMasterChart, when delete  of action link calls success method", function () {

        var Defered = $q.defer();
        promise = Defered.promise;

        masterChartsListSvc._returnData.deleteMasterChart = {
            $promise: promise
        };

        var masterchartId = 1;
        var data = {
            records: {
                messageText: "Success"
            },
            status: 200
        };

        model.deleteMasterChart(masterchartId);
        Defered.resolve(data);
        $rootScope.$apply();
        expect(masterchartGridFactory._called.load).toBe(true);
    });

});

