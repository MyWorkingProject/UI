// Tests for Import GL Account Controller

describe('Import GL Account Controller', function () {
    var $scope, $controller, locationObj, state, stateParams, model, wizNavModel, ctrl, $rootScope, getCtrl, errModel;

    beforeEach(module('budgeting.coaSetup.import'));

    beforeEach(function () {

        var methods = [
            'getChartID',
            'setChartID',
            'isWizardUpdate',
            'delStagingData',
            'reset',
            'loadNextView',
            'updateWizStep',
            'getReqData',
            'getBreadcrumbs',
            'isWizard',
            'getActiveImportOptions',
            'then'
        ];

        model = RealPage.spy();
        model._createMethods(methods);

        var errMethods = [
            'getChartDataError',
            'delStagingDataError',
            'reset',
            'updateWizStepError'
        ];

        errModel = RealPage.spy();
        errModel._createMethods(errMethods);

        var wizMethods = [
            'prev',
            'complete',
            'enable',
            'next'
        ];

        wizNavModel = RealPage.spy();
        wizNavModel._createMethods(wizMethods);

        stateParams = {
            chartID: 1
        };

        module(function ($provide) {
            $provide.value('importGLModel', model);
            $provide.value('importGlAccMsgModel', errModel);
            $provide.value('rpWizardNavModel', wizNavModel);
            $provide.value('$stateParams', stateParams);
            $provide.value('$state', state);
        });

        function injector(a, b) {
            $rootScope = a;
            $controller = b;

            $scope = $rootScope.$new();
        }

        inject(['$rootScope', '$controller', injector]);

        getCtrl = function () {
            return $controller('BdgtImprtCtrl', {
                '$scope': $scope
            });
        };

        ctrl = getCtrl();

    });

    it('on init scope references to be assigned', function () {
        model._returnData.isWizard = false;
        expect(stateParams.chartID).toBe(1);
        expect(ctrl.model).toBe(model);
        expect(model._called.setChartID).toBe(true);
        expect(model._called.isWizardUpdate).toBe(true);
        expect(model._called.getChartID).toBe(true);
        expect(model._called.getBreadcrumbs).toBe(true);
        expect(model._called.getActiveImportOptions).toBe(true);
        expect(model._called.then).toBe(true);
        expect(model._called.then).toBe(true);
        var eName, eCallBack, on = $scope.$on;
        $scope.$on = function (a, b) {
            eName = a;
            eCallBack = b;
            on.apply($scope, arguments);
        };

        ctrl = getCtrl();
        expect(eName).toBe('$destroy');
        expect(eCallBack).toBe(ctrl.delStagingData);
        expect(model._called.isWizard).toBe(true);
    });

    //it('Bind destroy method to destroy event', function () {
    //    var eName, eCallBack, on = $scope.$on;
    //    $scope.$on = function (a, b) {
    //        eName = a;
    //        eCallBack = b;
    //        on.apply($scope, arguments);
    //    };

    //    ctrl = getCtrl();
    //    expect(eName).toBe('$destroy');
    //    expect(eCallBack).toBe(ctrl.delStagingData);
    //});

    it('on destroy of controller delStagingData function call deletes staging data', function () {
        ctrl.delStagingData();
        expect(model._called.delStagingData).toBe(true);
        expect(model._called.then).toBe(true);
    });

    it('on destroy model reset method call', function () {
        ctrl.reset();
        expect(model._called.reset).toBe(true);
        expect(errModel._called.reset).toBe(true);
    });

    it('on loadnext view model load next view method need to be called', function () {
        ctrl.loadNextView();
        expect(model._called.loadNextView).toBe(true);
    });

    it('on back click prev wizard step needs to be invoked', function () {
        ctrl.backClick();
        expect(wizNavModel._called.prev).toBe(true);
    });

    it('on next click update wizard steps', function () {
        ctrl.nextClick();
        expect(model._called.updateWizStep).toBe(true);
        expect(model._called.getReqData).toBe(true);
        expect(model._called.then).toBe(true);
    });

    it('on move next update next step methods', function () {
        ctrl.moveNext();
        expect(wizNavModel._called.complete).toBe(true);
        expect(wizNavModel._called.enable).toBe(true);
        expect(wizNavModel._called.next).toBe(true);
    });
});
