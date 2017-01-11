describe('Contracts Controller', function () {
    var $scope, $rootScope, $controller, contractsModel, tabsMenuModel, ctrl, getCtrl,
        contractsConfig,  contractsGridFactory;

    beforeEach(module('budgeting.workspaces.contracts'));

    beforeEach(function () {

        var spy1 = RealPage.spy();
        spy1._createMethods(['getExpContractsFlag', 'getAllContractsFlag', 'reset']);

        var MenuModel = RealPage.spy();
        MenuModel._createMethods(['setOptions']);

         var spy2= function () {
             return MenuModel;
        };


        var spy3 = RealPage.spy();
        spy3._createMethods(['setSrc']);

     

        var spy5 = RealPage.spy();
        spy5._createMethods(['load']);


        module(function ($provide) {
            $provide.value('contractsModel', spy1);
            $provide.value('rpTabsMenuModel', spy2);
            $provide.value('contractsConfig', spy3);
         
            $provide.value('contractsGridFactory', spy5);
         
        });

        function injector(a, b, c, d, e,  g) {
            $rootScope = a;
            $controller = b;
            $scope = $rootScope.$new();
            contractsModel = c;
            tabsMenuModel = d();
            contractsConfig = e;
          
            contractsGridFactory = g;          
        }

        inject([
            '$rootScope',
            '$controller',
            'contractsModel',
            'rpTabsMenuModel',
            'contractsConfig',           
            'contractsGridFactory',           
            injector
        ]);

        getCtrl = function () {
            return $controller('ContractsCtrl', {
                '$scope': $scope
            });
        };
        ctrl = getCtrl();
    });
    it('on init should create a key model and assign model to it', function () {
        expect(ctrl.model).toBe(contractsModel);
    });


    it('on init setup option of tab menu to be called', function () {
        expect(tabsMenuModel._called.setOptions).toBe(true);
    });

    it('get data method is called', function () {
        ctrl.getData();
        expect(contractsConfig._called.setSrc).toBe(true);       
        expect(contractsGridFactory._called.load).toBe(true);

    });

    it('reset method is called', function () {
        ctrl.reset();
        expect(contractsModel._called.reset).toBe(true);
    });

    
});
