// Tests for Budget Model Controller

describe('Budget Model Controller', function () {
    var $scope, $controller, windowObj, stateParams, model, nav, ctrl, $rootScope, getCtrl;

    beforeEach(module('budgeting.budgetmodel.base'));

    beforeEach(function () {

        var methods = [
            'setModelID',
            'getModelDetails',
            'setBreadCrumbs',
            'reset'
        ];

        model = RealPage.spy();
        model._createMethods(methods);

        var navMethods = [
            'setModelID',
            'setNavUrls',
            'data',
            'setState',
            'reset'
        ];

        nav = RealPage.spy();
        nav._createMethods(navMethods);

        stateParams = {
            modelID: 1
        };

        module(function ($provide) {
            $provide.value('BdgtModelNav', nav);
            $provide.value('BdgtModelDetails', model);
            $provide.value('$stateParams', stateParams);
        });

        function injector(a, b, c) {
            $rootScope = a;
            $controller = b;
            windowObj = c;
            $scope = $rootScope.$new();
        }

        inject(['$rootScope', '$controller', '$window', injector]);

        getCtrl = function () {
            return $controller('BdgtModelCtrl', {
                '$scope': $scope
            });
        };

        ctrl = getCtrl();

    });

    it('on init scope references to be assigned', function () {
        expect(stateParams.modelID).toBe(1);
        expect(ctrl.model).toBe(model);
        expect(model._called.setModelID).toBe(true);
        expect(model._called.getModelDetails).toBe(true);
        expect(nav._called.setModelID).toBe(true);
        expect(nav._called.setNavUrls).toBe(true);
        expect(nav._called.data).toBe(true);
        expect(nav._called.setState).toBe(true);
        expect(model._called.setBreadCrumbs).toBe(true);

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
        expect(nav._called.reset).toBe(true);
    });
});
