//Test Cases for property chart controller
describe('property chart controller', function () {
    var $rootScope, $scope, $controller, getCtrl, chartModel, $location, configModel, actionModel, ctrl;
    beforeEach(module('budgeting.coaSetup.propertyChart'));

    beforeEach(function () {

        chartModel = RealPage.spy();
        chartModel._createMethods(['load']);

        configModel = RealPage.spy();
        var methods = ['setSrc'];
        configModel._createMethods(methods);

        actionModel = RealPage.spy();
        actionModel._createMethods(methods);

        $location = RealPage.spy();
        $location._createMethods(['path']);

        module(function ($provide) {
            $provide.value('propertyChartModel', chartModel);
            $provide.value('$scope', $scope);
            $provide.value('propertyChartListConfig', configModel);
            $provide.value('propertyChartListActions', actionModel);
            $provide.value('$location', $location);
        });

        function injector(a, b) {
            $rootScope = a;
            $controller = b;
            $scope = $rootScope.$new();
        }

        inject(['$rootScope', '$controller', injector]);

        getCtrl = function () {
            return $controller('BdgtPropertychartCtrl', {
                "$scope": $scope
            });
        };

        ctrl = getCtrl();

    });

    it('On property chart init method call set src and load methods', function () {
        expect(configModel._called.setSrc).toBe(true);
        expect(actionModel._called.setSrc).toBe(true);
        expect($scope.model).toBe(chartModel);
        expect(chartModel._called.load).toBe(true);
    });

    it('Calling Ctrl destroy method', function () {
        ctrl.destroy();
    });

    it('verifying the manage gl method calling when ', function () {
        var record = { clonedMasterChartID: '1', propertyID: '2' };
        var locationPath = '/admin/coa/manageglaccount/' + record.clonedMasterChartID + '/' + record.propertyID;
        ctrl.manageGL(record);
        expect(record).toBe(record);
        expect($location._called.path).toBe(true);
        expect($location._callData.path[0]).toBe(locationPath);

    });


    it('Calling Ctrl print method', function () {
        ctrl.print();
    });

});
