// Tests for Budget Model Overview Controller

describe('Budget Model Overview Controller', function () {
    var $scope, $controller,  model, workflow, ctrl, $rootScope, getCtrl;

    beforeEach(module('budgeting.budgetmodel.overview'));

    beforeEach(function () {

        var methods = [
            'updateStatus',
            'updateSubStatus',
            'reset'
        ];

        model = RealPage.spy();
        model._createMethods(methods);

        var workflowMethods = [
            'setLevelOperations',
            'toggleSubmitWorkflow',
            'submitWorkflow',
            'hideRejectWorkflow',
            'toggleApproveWorkflow',
            'approveWorkflow',
            'hideApproveWorkflow',
            'toggleRejectWorkflow',
            'rejectWorkflow',
            'reset'
        ];

        workflow = RealPage.spy();
        workflow._createMethods(workflowMethods);

        module(function ($provide) {
            $provide.value('BdgtOverviewWorkflowModel', workflow);
            $provide.value('BdgtOverviewListModel', model);
        });

        function injector(a, b) {
            $rootScope = a;
            $controller = b;
            $scope = $rootScope.$new();
        }

        inject(['$rootScope', '$controller', injector]);

        getCtrl = function () {
            return $controller('BdgtOverviewCtrl', {
                '$scope': $scope
            });
        };

        ctrl = getCtrl();

    });

    it('on init scope references to be assigned', function () {
        expect(ctrl.model).toBe(model);
        expect(ctrl.workflow).toBe(workflow);
        expect(workflow._called.setLevelOperations).toBe(true);

        var eName, eCallBack, on = $scope.$on;
        $scope.$on = function (a, b) {
            eName = a;
            eCallBack = b;
            on.apply($scope, arguments);
        };

        ctrl = getCtrl();
        expect(eName).toBe('$destroy');
        expect(eCallBack).toBe(ctrl.destroy);
    });

    it('on reset it should call model reset methods and model should be undefined', function () {
        ctrl.destroy();

        expect(model._called.reset).toBe(true);
        expect(workflow._called.reset).toBe(true);
    });

    it('on updateStatus it should update status of current list item status', function () {
        ctrl.updateStatus(1);

        expect(model._called.updateStatus).toBe(true);
    });

    it('on updateSubStatus it should update status of current sub list item status', function () {
        ctrl.updateSubStatus(1,1);

        expect(model._called.updateSubStatus).toBe(true);
    });

    it('on toggleSubmitWorkflow it should toggle submit workflow status open/close', function () {
        ctrl.toggleSubmitWorkflow();

        expect(workflow._called.toggleSubmitWorkflow).toBe(true);
    });

    it('on updateSubmitWorkflow it should submit workflow status if level 1', function () {
        ctrl.updateSubmitWorkflow();

        expect(workflow._called.submitWorkflow).toBe(true);
    });

    it('on toggleApproveWorkflow it should toggle approve workflow status open/close', function () {
        ctrl.toggleApproveWorkflow();

        expect(workflow._called.hideRejectWorkflow).toBe(true);
        expect(workflow._called.toggleApproveWorkflow).toBe(true);
    });

    it('on approveWorkflow it should approve workflow status if level 2,3', function () {
        ctrl.approveWorkflow();

        expect(workflow._called.approveWorkflow).toBe(true);
    });

    it('on toggleRejectWorkflow it should toggle reject workflow status open/close', function () {
        ctrl.toggleRejectWorkflow();

        expect(workflow._called.hideApproveWorkflow).toBe(true);
        expect(workflow._called.toggleRejectWorkflow).toBe(true);
    });

    it('on rejectWorkflow it should reject workflow status if level 2,3', function () {
        ctrl.rejectWorkflow();

        expect(workflow._called.rejectWorkflow).toBe(true);
    });
});
