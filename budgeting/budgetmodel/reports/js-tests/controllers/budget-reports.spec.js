// Tests for Budget Model Overview Controller

describe('Budget Reports Controller', function () {
    var $scope, $controller,  model, workflow, ctrl, $rootScope, getCtrl,watchList,rpWatchList;

    beforeEach(module('budgeting.budgetmodel.reports'));

    beforeEach(function () {

        var methods = [
            'getReports',
            'showAll',
            'reset','search','navigateReport'
        ];

        model = RealPage.spy();
        model._createMethods(methods);

        watchList = RealPage.spy();
        watchList._createMethods(["add", "destroy"]);
        rpWatchList = function () {
            return watchList;
        };

        module(function ($provide) {
            $provide.value('BdgtReportsListModel', model);
            $provide.value("rpWatchList", rpWatchList);
        });

        function injector(a, b) {
            $rootScope = a;
            $controller = b;
            $scope = $rootScope.$new();
        }

        inject(['$rootScope', '$controller', injector]);

        getCtrl = function () {
            return $controller('BdgtReportsCtrl', {
                '$scope': $scope
            });
        };

        ctrl = getCtrl();

    });

    it('on init ctrl should have model and model get reports method should be called', function () {
        expect(ctrl.model).toBe(model);
        expect(model._called.getReports).toBe(true);
        expect(watchList._called.add).toBe(true);
    });

    it('verification of cntorller destroy method calling', function () {
        ctrl.destroy();
        expect(model._called.reset).toBe(true);
        expect(watchList._called.destroy).toBe(true);
        expect(ctrl.model).toBe(undefined);
    });

    it('shoudl call model search method', function () {
        ctrl.search();
        expect(model._called.search).toBe(true);
    });

    it('shoudl call model search method', function () {
        ctrl.navigateReport("Test");
        expect(model._called.navigateReport).toBe(true);
        expect(model._callData.navigateReport[0]).toEqual("Test");
    });


    
});
