//Test Cases for Work flow status controller
describe('Budget work flow status controller', function() {
    var $rootScope, $scope, $controller, getCtrl, ctrl, $q;
    var $timeout, menuModel, $filter, rpTabMenuModel, statusOperations, statusModel, statusSVC, gridFactory, statusError;
    beforeEach(module('budgeting.workspaces.budgetWorkflowStatus'));

    beforeEach(function() {

        rpTabMenuModel = RealPage.spy();
        rpTabMenuModel._createMethods(['setOptions']);
        var spy1 = function() {
            return rpTabMenuModel;
        };

        statusModel = RealPage.spy();
        statusModel._createMethods(['getInProgress', 'getNeedApproval', 'getBdgtModel', 'reset', 'updateFiltTypes', 'updateSlideCommentsFlag', 'getInProgressActive', 'showHideToolTip',
            'updateSlideCommentsFlag', 'isToolTipisMenuOn', 'updateTipisMenuOn', 'then'
        ]);

        statusSVC = RealPage.spy();
        var methods = ['setSrc'];
        statusSVC._createMethods(methods);

        gridFactory = RealPage.spy();
        var valMethods = ['setGridReady', 'updateGrid', 'load', 'getSelectedRecords'];
        gridFactory._createMethods(valMethods);

        statusOperations = RealPage.spy();
        statusOperations._createMethods(['showForm', 'updateStatus', 'clearControls', 'showModelHelpInfo', 'getHelpInfoToolTip', 'setHelpInfo', 'reset']);

        statusError = RealPage.spy();
        statusError._createMethods(['showBdgtModelException']);


        module(function($provide) {
            $provide.value('budgetWorkflowStatusModel', statusModel);
            $provide.value('rpTabsMenuModel', spy1);
            $provide.value('$scope', $scope);
            $provide.value('$filter', $filter);
            $provide.value('budgetWorkflowStatusSvc', statusSVC);
            $provide.value('budgetWorkflowStatusGridFactory', gridFactory);
            $provide.value('budgetWorkflowStatusOperations', statusOperations);
            $provide.value('budgetWorkflowStatusErrorHandling', statusError);
        });

        function injector(a, b, c, d, e, f) {
            $rootScope = a;
            $controller = b;
            $scope = $rootScope.$new();
            $timeout = c;
            menuModel = d();
            $q = e;
        }

        inject(['$rootScope', '$controller', '$timeout', 'rpTabsMenuModel', '$q', injector]);

        getCtrl = function() {
            return $controller('BudgetWorkflowStatusCtrl', {
                "$scope": $scope
            });
        };

        ctrl = getCtrl();

    });

    it('On init method call model methods', function() {
        expect(menuModel._called.setOptions).toBe(true);
        expect(ctrl.model).toBe(statusModel);
        expect(ctrl.tabsMenu).toBe(menuModel);
        expect(ctrl.bgtStatusOperations).toBe(statusOperations);
        expect(statusModel._called.getInProgress).toBe(true);
        expect(statusModel._called.getNeedApproval).toBe(true);

    });

    it('calling get data method', function() {
        /*  var Defered = $q.defer();
          promise = Defered.promise;

          statusModel._returnData.getBdgtModel = {
              promise: promise
          };*/
        ctrl.getData();
        /*var data={};
        Defered.resolve(data);
        $rootScope.$apply();*/
        expect(statusModel._called.getBdgtModel).toBe(true);
    });

    it('calling load grid data method', function() {
        var resp = {
            records: {
                id: 1
            }
        };
        ctrl.loadGridData(resp);
        expect(statusModel._called.reset).toBe(true);
        expect(statusModel._called.updateFiltTypes).toBe(true);
        expect(statusModel._called.updateSlideCommentsFlag).toBe(true);
        expect(statusModel._called.getInProgressActive).toBe(true);
        expect(gridFactory._called.setGridReady).toBe(true);
        expect(gridFactory._called.load).toBe(true);
        expect(gridFactory._called.updateGrid).toBe(true);
    });

    it('calling comments form when selected recorrds lenght is more than 0', function() {
        gridFactory._returnData.getSelectedRecords = [{
            id: 1
        }];
        ctrl.showCommentsForm("Test");
        expect(gridFactory._called.getSelectedRecords).toBe(true);
        expect(statusOperations._called.showForm).toBe(true);
        expect(statusOperations._callData.showForm[0]).toEqual("Test");

    });

    it('calling comments form when selected recorrds lenght is  0', function() {
        gridFactory._returnData.getSelectedRecords = undefined;
        ctrl.showCommentsForm("Test");
        expect(statusModel._called.showHideToolTip).toBe(true);
    });

    it('calling update Workflow Status', function() {
        gridFactory._returnData.getSelectedRecords = {
            id: 1
        };
        ctrl.updateWorkflowStatus();
        expect(gridFactory._called.getSelectedRecords).toBe(true);
        expect(statusOperations._called.updateStatus).toBe(true);
    });

    it('calling hide comments form', function() {
        gridFactory._returnData.getSelectedRecords = {
            id: 1
        };
        ctrl.hideCommentsForm();
        expect(statusModel._called.updateSlideCommentsFlag).toBe(true);
        expect(statusModel._callData.updateSlideCommentsFlag[0]).toBe(false);
        expect(statusOperations._called.clearControls).toBe(true);
    });

    it('calling bidn menu when tool tip is on', function() {
        statusModel._returnData.isToolTipisMenuOn = true;
        ctrl.bindMenu();
        expect(statusModel._called.isToolTipisMenuOn).toBe(true);
    });

    it('calling bidn menu when tool tip is not on', function() {
        statusModel._returnData.isToolTipisMenuOn = false;
        ctrl.bindMenu();
        expect(statusModel._called.isToolTipisMenuOn).toBe(true);
    });

    it('calling bidn menu click', function() {
        ctrl.bindMenuClick();
    });

    it('calling un bind menu click', function() {
        ctrl.unbindMenuClick();
    });

    it('calling hideMenu', function() {
        ctrl.hideMenu();
    });

    it('calling show OverWrite Info', function() {
        ctrl.showOverWriteInfo();
        expect(statusOperations._called.showModelHelpInfo).toBe(true);
    });

    it('calling bind HelpInfo Text Info when model help icon is clicked', function() {
        statusOperations._returnData.getHelpInfoToolTip = true;
        ctrl.bindHelpInfoText();
        expect(statusOperations._called.getHelpInfoToolTip).toBe(true);
    });

    it('calling bind HelpInfo Text Info when model help icon is clicked', function() {
        statusOperations._returnData.getHelpInfoToolTip = false;
        ctrl.bindHelpInfoText();
        expect(statusOperations._called.getHelpInfoToolTip).toBe(true);
    });

    it('calling bindHelpInfo', function() {
        ctrl.bindHelpInfo();
    });

    it('calling hideHelpInfo', function() {
        ctrl.hideHelpInfo();
    });

    it('calling destor and verifying reset is called', function() {
        ctrl.destroy();
        expect(statusOperations._called.reset).toBe(true);
        expect(statusModel._called.reset).toBe(true);
    });


});