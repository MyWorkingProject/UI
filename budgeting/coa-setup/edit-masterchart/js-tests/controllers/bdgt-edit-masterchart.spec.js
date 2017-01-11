// Tests for master chart Controller
describe('edit chart controller', function () {
    var $rootScope, $scope, $controller, getCtrl, editModel, $location, ctrl, $stateParams, timeout, watchList, rpWatchList;
    
    beforeEach(module('budgeting.coaSetup.editMasterchart'));

    beforeEach(function () {

        var methods = ['getMasterchartMenuData', 'showGlAccount', 'showCategory', 'showClone', 'showTab', 'resetTab'];

        editModel = RealPage.spy();
        editModel._createMethods(methods);

        $stateParams = { chartID: 1 };

        
       /* watchList = RealPage.spy();
        watchList._createMethods(["add", "destroy"]);
        rpWatchList = function () {
            return watchList;
        };*/

        module(function ($provide) {
            $provide.value('editMasterChartModel', editModel);
            $provide.value('$stateParams', $stateParams);
            //$provide.value("rpWatchList", rpWatchList);
        });

        function injector(a, b, c, d) {
            $rootScope = a;
            $controller = b;
            $scope = $rootScope.$new();
            $stateParams = c;
            editModel = d;
        }

        inject(['$rootScope','$controller', '$stateParams', 'editMasterChartModel', injector]);
        
        getCtrl = function () {
            return $controller('BdgtEditMasterchartCtrl', {
                "$scope": $scope
            });
        };

       
        ctrl = getCtrl();
       
    });

    it('on init calling model menu data mehtod', function () {
        expect(ctrl.model).toBe(editModel);
        expect(editModel._called.getMasterchartMenuData).toBe(true);
        //expect($scope.state).toBe(Object);

    });

    it('verifying model show tab is called', function () {
        ctrl.showTab();
        expect(editModel._called.showTab).toBe(true);
    });

    it('verifying ctrl destroy is called', function () {
        ctrl.destroy();
        expect(editModel._called.resetTab).toBe(true);
    });


});