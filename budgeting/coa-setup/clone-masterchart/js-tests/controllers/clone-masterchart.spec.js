//Test Cases for clone master chart controller
describe('clone master chart controller', function () {
    var $rootScope, $scope, $controller, $stateParams, getCtrl, cloneModel, $location, wizModel, configModel, cloneValModel, ctrl;
    beforeEach(module('budgeting.coaSetup.cloneMasterchart'));

    beforeEach(function () {

        cloneModel = RealPage.spy();
        cloneModel._createMethods(['setInitials', 'updateState', 'init', 'getIsEditMode', 'getIsWizard', 'updateBreadcrumbs', 'load', 'getData']);

        configModel = RealPage.spy();
        var methods = ['setSrc'];
        configModel._createMethods(methods);

        cloneValModel = RealPage.spy();
        var valMethods = ['isReload', 'setReload', 'updateCloneData', 'updateCloneDataDefParams'];
        cloneValModel._createMethods(valMethods);

        $location = RealPage.spy();
        $location._createMethods(['path']);

        wizModel = RealPage.spy();
        wizModel._createMethods(['prev']);

        $stateParams = { chartID: 1, type: "normal" };


        module(function ($provide) {
            $provide.value('cloneMasterChartModel', cloneModel);
            $provide.value('$scope', $scope);
            $provide.value('$location', $location);
            $provide.value('$stateParams', $stateParams);
            $provide.value('cloneMasterChartConfig', configModel);
            $provide.value('cloneMasterChartValidationModel', cloneValModel);
            $provide.value('rpWizardNavModel', wizModel);
        });

        function injector(a, b) {
            $rootScope = a;
            $controller = b;
            $scope = $rootScope.$new();
        }

        inject(['$rootScope', '$controller', injector]);

        getCtrl = function () {
            return $controller('BdgtCloneMasterchartCtrl', {
                "$scope": $scope
            });
        };

        ctrl = getCtrl();

    });

    it('On clone chart, init method call set src and load methods', function () {
        expect(configModel._called.setSrc).toBe(true);
        expect(ctrl.model).toBe(cloneModel);
        expect(cloneModel._called.setInitials).toBe(true);
        expect(cloneModel._called.updateState).toBe(true);
        expect(cloneModel._called.init).toBe(true);
        expect(cloneModel._called.load).toBe(true);
        expect(cloneValModel._called.updateCloneDataDefParams).toBe(true);
    });

    it("verifying the breadcum updation when it is not in wizard and not in edit model", function () {
        cloneModel._returnData.getIsWizard = false;
        cloneModel._returnData.getIsEditMode = false;
        ctrl.updateBreadcrumbs();
        expect(cloneModel._called.getIsEditMode).toBe(true);
        expect(cloneModel._called.getIsWizard).toBe(true);
        expect(cloneModel._called.updateBreadcrumbs).toBe(true);

    });

    it("verifying the breadcum updation when it is  in wizard and not in edit model", function () {
        cloneModel._returnData.getIsWizard = true;
        cloneModel._returnData.getIsEditMode = false;
        ctrl.updateBreadcrumbs();
        expect(cloneModel._called.getIsEditMode).toBe(true);
        expect(cloneModel._called.getIsWizard).toBe(true);
        expect(cloneModel._called.updateBreadcrumbs).toBe(undefined);
    });

    it("verifying the breadcum updation when it is in not  wizard and in edit model", function () {
        cloneModel._returnData.getIsWizard = false;
        cloneModel._returnData.getIsEditMode = true;
        ctrl.updateBreadcrumbs();
        expect(cloneModel._called.getIsEditMode).toBe(true);
        expect(cloneModel._called.getIsWizard).toBe(undefined);
        expect(cloneModel._called.updateBreadcrumbs).toBe(undefined);
    });

    it("verifying the breadcum updation when it is in  wizard and in edit model", function () {
        cloneModel._returnData.getIsWizard = true;
        cloneModel._returnData.getIsEditMode = true;
        ctrl.updateBreadcrumbs();
        expect(cloneModel._called.getIsEditMode).toBe(true);
        expect(cloneModel._called.getIsWizard).toBe(undefined);
        expect(cloneModel._called.updateBreadcrumbs).toBe(undefined);
    });

    it("verifying setWatch for reload method ", function () {
        ctrl.setWatchForReload();
        expect($scope.cloneValidationModel).toBe(cloneValModel);
    });

    it("verifying wizard back link method ", function () {
        ctrl.backClick();
        expect(wizModel._called.prev).toBe(true);
    });

    it("verifying reloadData method when isRealod is true ", function () {
        cloneValModel._returnData.isReload = true;
        ctrl.reloadData();
        expect(cloneValModel._called.isReload).toBe(true);
        expect(cloneModel._called.load).toBe(true);
        expect(cloneValModel._called.setReload).toBe(true);
    });

    it("verifying reloadData method when isRealod is false ", function () {
        cloneValModel._returnData.isReload = false;
        ctrl.reloadData();
        expect(cloneValModel._called.isReload).toBe(true);
    });

    it("verifying save data method calling", function () {
        ctrl.saveData();
        expect(cloneValModel._called.updateCloneData).toBe(true);
        expect(cloneModel._called.getData).toBe(true);
    });


    it('Calling Ctrl destroy method', function () {
        ctrl.destroy();
    });

});