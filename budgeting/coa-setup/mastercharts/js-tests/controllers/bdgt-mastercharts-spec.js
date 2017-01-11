describe('Master Chart Controller', function () {
    var $scope, $rootScope, $controller, masterChartsListModel, $location, ctrl, getCtrl,
        masterchartListConfig, masterchartListActionsDef, masterchartGridFactory, masterchartListActions, masterchartDialogs, $timeout;

    beforeEach(module('budgeting.coaSetup.mastercharts'));

    beforeEach(function () {
        var spy1 = RealPage.spy();
        spy1._createMethods(['updateMenuFlag', 'isMenuOn', 'reset', 'showPropertyTab', 'showMasterChartTab', 'showAccountmappingTab']);

        var spy2 = RealPage.spy();
        spy2._createMethods(['path']);

        var spy3 = RealPage.spy();
        spy3._createMethods(['setSrc']);

        var spy4 = RealPage.spy();
        spy4._createMethods(['setSrc']);

        var spy5 = RealPage.spy();
        spy5._createMethods(['load']);

        var spy6 = RealPage.spy();
        spy6._createMethods(['setEditViewMode', 'copyChart', 'viewMasterChart', 'editMasterChart', 'deleteMasterChart']);

        var spy7 = RealPage.spy();
        spy7._createMethods(['subscribe', 'confirmDeleteMasterchart']);


        module(function ($provide) {
            $provide.value('masterChartsListModel', spy1);
            $provide.value('$location', spy2);
            $provide.value('masterchartListConfig', spy3);
            $provide.value('masterchartListActionsDef', spy4);
            $provide.value('masterchartGridFactory', spy5);
            $provide.value('masterchartListActions', spy6);
            $provide.value('masterchartDialogs', spy7);
        });

        function injector(a, b, c, d, e, f, g, h, i,j) {
            $rootScope = a;
            $controller = b;
            $scope = $rootScope.$new();
            masterChartsListModel = c;
            $location = d;
            masterchartListConfig = e;
            masterchartListActionsDef = f;
            masterchartGridFactory = g;
            masterchartListActions = h;
            masterchartDialogs = i;
            $timeout = j;
        }

        inject([
            '$rootScope',
            '$controller',
            'masterChartsListModel',
            '$location',
            'masterchartListConfig',
            'masterchartListActionsDef',
            'masterchartGridFactory',
            'masterchartListActions',
            'masterchartDialogs',
            '$timeout',
            injector
        ]);

        getCtrl = function () {
            return $controller('BdgtMasterChartsCtrl', {
                '$scope': $scope
            });
        };
        ctrl = getCtrl();
    });

    it('on init should create a key model and assign model to it', function () {
        expect(ctrl.model).toBe(masterChartsListModel);
    });

    it('on init should call setSrc method on grid config', function () {
        expect(masterchartListConfig._called.setSrc).toBe(true);
    });

    it('on init should call setSrc method on grid Actions', function () {
        expect(masterchartListActionsDef._called.setSrc).toBe(true);
    });

    it('on init should call subscribe method on dialog', function () {
        expect(masterchartDialogs._called.subscribe).toBe(true);
        expect(masterchartDialogs._callData.subscribe[0]).toBe(ctrl.continueMasterchartDelete);
    });

    it('on init should call load method on grid model', function () {
        expect(masterchartGridFactory._called.load).toBe(true);
    });

    it('on init should call setEditViewMode of actions method', function () {
        expect(masterchartListActions._called.setEditViewMode).toBe(true);
    });

    it('Should call showActionMenu of masterchart model be called', function () {
        ctrl.showActionMenu();
        expect(masterChartsListModel._called.updateMenuFlag).toBe(true);
        expect(masterChartsListModel._called.isMenuOn).toBe(true);
        $timeout.flush();
    });

    it('bindMenu method should call bindMenuClick of masterChartListModel', function () {
        masterChartsListModel._returnData.isMenuOn = true;
        ctrl.bindMenu();
        expect(masterChartsListModel._called.isMenuOn).toBe(true);
    });

    it('bindMenu method should call bindMenuClick for false of masterChartListModel', function () {
        masterChartsListModel._returnData.isMenuOn = false;
        ctrl.bindMenu();
        expect(masterChartsListModel._called.isMenuOn).toBe(true);
    });

    it('copyMasterchart method should call copychart method of actionModel', function () {
        var data = {
            "masterChartID":1,
            "copyMasterChartflag": false
        };
        ctrl.copyMasterChart(data);
        expect(masterchartListActions._called.copyChart).toBe(true);
    });

    it('viewMasterChart method should call viewMasterChart method of actionModel', function () {
        var data = {
            "masterChartID": 1,
            "isAlternativeCOA": false,
            "status":"Completed"
        };
        ctrl.viewMasterChart(data);
        expect(masterchartListActions._called.viewMasterChart).toBe(true);
    });

    it('editMasterChart method should call editMasterChart method of actionModel', function () {
        var data = {
            "masterChartID": 1,
            "isAlternativeCOA": false,
            "status": "Completed"
        };
        ctrl.editMasterChart(data);
        expect(masterchartListActions._called.editMasterChart).toBe(true);
    });

    it('deleteMasterChart method calls conformation on dialogs', function () {
        var data = {
            "masterChartID": 1
        };
        ctrl.deleteMasterChart(data);
        expect(ctrl.masterchartId).toBe(data);
        expect(masterchartDialogs._called.confirmDeleteMasterchart).toBe(true);
    });

    it('continueMasterchartDelet method should call delete method of actions model', function () {
        ctrl.continueMasterchartDelete('continue');
        expect(masterchartListActions._called.deleteMasterChart).toBe(true);
    });

    it('deleteMasterChart method does not call deleteMasterChart method on model when action is not continue', function () {
        ctrl.continueMasterchartDelete('cancel');
        expect(masterchartListActions._called.deleteMasterChart).toBe(undefined);
    });

    it('navToNormalMasterchart method calls the location service', function () {
        ctrl.navToNormalMasterchart();
    });

    it('navToAltMasterchart method calls the location service', function () {
        ctrl.navToAltMasterchart();
    });

    it('destroy method calls reset method of model', function () {
        ctrl.destroy();
        expect(masterChartsListModel._called.reset).toBe(true);
    });
});
