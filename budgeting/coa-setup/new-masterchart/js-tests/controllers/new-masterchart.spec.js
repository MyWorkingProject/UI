// Tests for master chart Controller
describe('new master chart controller', function () {
    var $rootScope, $scope, $controller, getCtrl, model, $location, ctrl, rpSelect, $stateParams, timeout, watchList, rpWatchList, form, $compile;
    var $timeout;
    beforeEach(module('budgeting.coaSetup.newMasterchart'));

    beforeEach(function () {

        var methods = ['getState', 'updateMasterChartID', 'setInitials', 'hasChartID',
            'getMasterChartData', 'updateLableText', 'isDuplicateError', 'updateDuplicateMsg',
            'resetModel', 'isCustomAccnt', 'isDefaultField1', 'isValidData', 'updateShowErr', 'updateFormData', 'submit',
            'showField2', 'updateAccountStructureLabl', 'showField3', 'showField4', 'edit', 'undoChanges', 'showModelHelpInfo', 'isHelpIconInfo', 'setHelpIconInfo'];

        model = RealPage.spy();
        model._createMethods(methods);

        $stateParams = { chartID: 1 };

        timeout = RealPage.spy();

        watchList = RealPage.spy();
        watchList._createMethods(["add", "destroy"]);
        rpWatchList = function () {
            return watchList;
        };

        module(function ($provide) {
            $provide.value('newMasterchartModel', model);
            $provide.value('$location', $location);
            $provide.value('$stateParams', $stateParams);
            $provide.value('timeout', timeout);
            $provide.value("rpWatchList", rpWatchList);
        });

        function injector(a, b, c, d) {
            $rootScope = a;
            $controller = b;
            $scope = $rootScope.$new();
            $compile = c;
            $timeout = d;
        }

        inject(['$rootScope', '$controller', '$compile', '$timeout', injector]);

        getCtrl = function () {
            return $controller('BdgtNewMasterChartCtrl', {
                "$scope": $scope
            });
        };

        var element = angular.element(
                      '<form name="newChart">' +
                      '<input ng-model="model.name" name="chartname" />' +
                      '<select ng-model="model.field1" name="field1" />' +
                      '</form>');
        $scope.model = { name: "abc", field1: "None" };
        $compile(element)($scope);

        ctrl = getCtrl();
        form = $scope.newChart;
        model._returnData.hasChartID = true;
    });

    it('on init assinging the chart model', function () {
        expect(ctrl.chartModel).toBe(model);
        expect(model._called.getState).toBe(true);
        //expect($scope.state).toBe(Object);
        expect(model._called.updateMasterChartID).toBe(true);
        expect(model._called.setInitials).toBe(true);

        // expect(ctrl._called.getMasterChartData).toBe(true);
        expect(model._called.hasChartID).toBe(true);
        expect(model._called.updateLableText).toBe(true);

        expect(watchList._called.add).toBe(true); //Un Comment when $scipe is working

    });

    it('on init, for new chart, should not call getMasterChartData method ', function () {
        model._returnData.hasChartID = false;
        ctrl.init();
        //expect(model._called.getMasterChartData).toBe(false);
    });

    it("verify the show duplicate message, when Name is duplicate", function () {
        model._returnData.isDuplicateError = true;
        ctrl.checkDuplicate();
        expect(model._called.isDuplicateError).toBe(true);
    });

    it("verify the duplicate message, when Name is not duplicate", function () {
        model._returnData.isDuplicateError = false;
        ctrl.checkDuplicate();
        expect(model._called.isDuplicateError).toBe(true);
    });

    it("verify the duplcate message is displayed", function () {
        ctrl.showDuplicateMessage();
        /*expect(form.chartname._called.$setTouched).toBe(true);
        expect(form.chartname._called.$setValidity).toBe(true);*/
        //expect(form.chartname._called.$invalid).toBe(true);
        expect(model._called.updateDuplicateMsg).toBe(true);
    });

    it("verify destroy method is called", function () {
        ctrl.destroy();
        expect(model._called.resetModel).toBe(true);
        expect(watchList._called.destroy).toBe(true);
    });


    it("verify get master chart data method is called", function () {
        ctrl.getMasterChartData();
        expect(model._called.getMasterChartData).toBe(true);
    });

    it("Validate data method calling When Custom Accnt is checked and When Field1 is None", function () {
        model._returnData.isCustomAccnt = true;
        model._returnData.isDefaultField1 = true;
        ctrl.validData();
        expect(model._called.isCustomAccnt).toBe(true);
        expect(model._called.isDefaultField1).toBe(true);
        //expect(ctrl._called.setRequiredField1).toBe(true);
        //expect(form.chartname._called.$setTouched).toBe(true);
        expect(model._called.isValidData).toBe(undefined);
        expect(model._called.updateShowErr).toBe(undefined);
    });

    it("Validate data method calling When Custom Accnt is checked and When Field1 is other than None", function () {
        model._returnData.isCustomAccnt = true;
        model._returnData.isDefaultField1 = false;
        model._returnData.isValidData = true;
        ctrl.validData();
        expect(model._called.isCustomAccnt).toBe(true);
        expect(model._called.isDefaultField1).toBe(true);
        expect(model._called.isValidData).toBe(true);
        expect(model._called.updateShowErr).toBe(undefined);
    });

    it("Validate data method calling When Chart name is empty", function () {
        model._returnData.isCustomAccnt = false;
        model._returnData.isDefaultField1 = false;
        model._returnData.isValidData = false;
        ctrl.validData();
        expect(model._called.isCustomAccnt).toBe(true);
        expect(model._called.isDefaultField1).toBe(undefined);
        expect(model._called.isValidData).toBe(true);
        expect(model._called.updateShowErr).toBe(true);
    });

    it("Save method calling When Data is valid", function () {
        ctrl.validData = function () {
            return true;
        };
        ctrl.submit();
        expect(model._called.updateFormData).toBe(true);
        expect(model._called.submit).toBe(true);
    });

    it("Save method calling When Data is Invalid", function () {
        ctrl.validData = function () {
            return false;
        };
        ctrl.submit();
        expect(model._called.updateFormData).toBe(undefined);
        expect(model._called.submit).toBe(undefined);
    });

    it("Should call when Field1 is changed", function () {
        ctrl.field1Change();
        expect(model._called.showField2).toBe(true);
        expect(model._called.updateAccountStructureLabl).toBe(true);
    });

    it("Should call when Field2 is changed", function () {
        ctrl.field2Change();
        expect(model._called.showField3).toBe(true);
        expect(model._called.updateAccountStructureLabl).toBe(true);
    });

    it("Should call when Field3 is changed", function () {
        ctrl.field3Change();
        expect(model._called.showField4).toBe(true);
        expect(model._called.updateAccountStructureLabl).toBe(true);
    });

    it("Should call when cancel is clicked", function () {
        ctrl.cancel();
        expect(model._called.edit).toBe(true);
        expect(model._called.undoChanges).toBe(true);
    });

    it("Should call when edit link is clicked", function () {
        ctrl.edit();
        expect(model._called.edit).toBe(true);
    });

    it("Should call when help icon is clicked", function () {
          ctrl.showOverWriteInfo();
          expect(model._called.showModelHelpInfo).toBe(true);
          $timeout.flush();
    });

    it("Should call bindMenu when help icon is clicked", function () {
        model._returnData.isHelpIconInfo = true;
        ctrl.bindMenu();
        expect(model._called.isHelpIconInfo).toBe(true);
    });

    it("Should not call bindMenu when help icon is not clicked", function () {
        model._returnData.isHelpIconInfo = false;
        ctrl.bindMenu();
        expect(model._called.isHelpIconInfo).toBe(true);
    });

    it("on body click, should hide the help message", function () {
        ctrl.bindMenuClick();
    });

    it("on body click, should hide the help message", function () {
        ctrl.unbindMenuClick();
    });

    it("should hide the message", function () {
        ctrl.hideMenu();
        expect(model._called.setHelpIconInfo).toBe(true);
    });

});