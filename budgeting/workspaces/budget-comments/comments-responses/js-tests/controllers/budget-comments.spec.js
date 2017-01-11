//Test Cases for Work flow status controller
describe('Budget comments controller, unti test cases', function() {
    var $rootScope, $scope, $controller, getCtrl, ctrl, $q;
    var  comntModel;
    beforeEach(module('budgeting.workspaces.budgetComments'));

    beforeEach(function() {

        
       var spy1 = RealPage.spy();
        spy1._createMethods(['load', 'reset'
        ]);

       

        module(function($provide) {
            $provide.value('budgetCommentsModel', spy1);
            $provide.value('$scope', $scope);
        });

        function injector(a, b, c) {
            $rootScope = a;
            $controller = b;
            $scope = $rootScope.$new();
            comntModel = c;
        }

        inject(['$rootScope', '$controller', 'budgetCommentsModel', injector]);

        getCtrl = function() {
            return $controller('BudgetCommentsCtrl', {
                "$scope": $scope
            });
        };

        ctrl = getCtrl();

    });

    it('On init shoudl intialize the model', function() {
        expect(comntModel._called.load).toBe(true);
        expect(ctrl.model).toBe(comntModel);

    });

    it('calling get data method', function() {
        ctrl.getData();
        expect(comntModel._called.load).toBe(true);
    });

    it('calling destroy method ', function() {
        ctrl.destroy();
        expect(comntModel._called.reset).toBe(true);
    });


    

});