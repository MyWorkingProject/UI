//  Home Controller

(function (angular) {
    "use strict";

    function BdgtNewMasterChartCtrl($scope, chartModel, $location, $stateParams, timeout, watchList) {
        var translate, vm, masterChartID = 0,
            body, btnClick;
        vm = this;
        vm.watchList = watchList();

        vm.init = function () {
            vm.chartModel = chartModel;
            $scope.state = chartModel.getState();
            chartModel.setInitials();
            chartModel.updateMasterChartID($stateParams.chartID);
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
            if (chartModel.hasChartID()) {
                vm.getMasterChartData();
            }

            chartModel.updateLableText($stateParams.type);

            vm.watchList.add($scope.$on('$destroy', vm.destroy));
            vm.watchList.add($scope.$watch('page.chartModel.dupError', vm.checkDuplicate));

            //$scope.$on('$destroy', vm.destroy);
            //$scope.$watch('page.chartModel.dupError', vm.checkDuplicate);
        };

        vm.checkDuplicate = function () {
            if (chartModel.isDuplicateError()) {
                vm.showDuplicateMessage();
            }
        };

        vm.showDuplicateMessage = function () {
            $scope.newChart["chartname"].$setTouched();
            $scope.newChart["chartname"].$setValidity("required", true);
            $scope.newChart["chartname"].$invalid = true;
            chartModel.updateDuplicateMsg();
        };

        vm.destroy = function () {
            chartModel.resetModel();
            vm.watchList.destroy();
        };

        vm.getMasterChartData = function () {
            chartModel.getMasterChartData();
        };

        vm.validData = function () {
            if (chartModel.isCustomAccnt() && chartModel.isDefaultField1()) {
                vm.setRequiredField1();
                return false;
            }
            else if (chartModel.isValidData()) {
                return true;
            }
            $scope.newChart["chartname"].$setTouched();
            chartModel.updateShowErr(true);
            return false;
        };

        vm.setRequiredField1 = function () {
            $scope.newChart["field1"].$setTouched();
            $scope.newChart["field1"].$setValidity("required", true);
            $scope.newChart["field1"].$invalid = true;
        };

        vm.resetRequiredField1 = function () {
            $scope.newChart["field1"].$setValidity("required", false);
            $scope.newChart["field1"].$invalid = false;
        };

        vm.submit = function () {
            if (vm.validData()) {
                chartModel.updateFormData($stateParams.type);
                chartModel.submit();
            }
        };

        vm.field1Change = function () {
            chartModel.showField2(true);
            chartModel.updateAccountStructureLabl();
            vm.resetRequiredField1();
        };

        vm.field2Change = function () {
            chartModel.showField3(true);
            chartModel.updateAccountStructureLabl();
        };

        vm.field3Change = function () {
            chartModel.showField4(true);
            chartModel.updateAccountStructureLabl();
        };

        vm.cancel = function () {
            chartModel.edit(false);
            chartModel.undoChanges();
        };

        vm.edit = function () {
            chartModel.edit(true);
        };

        vm.showOverWriteInfo = function () {
            chartModel.showModelHelpInfo();
            timeout(vm.bindMenu);
        };

        vm.bindMenu = function () {
            if (chartModel.isHelpIconInfo()) {
                vm.bindMenuClick();
            }
        };

        vm.bindMenuClick = function () {
            body.on(btnClick, vm.hideMenu);
        };

        vm.unbindMenuClick = function () {
            body.off(btnClick);
        };

        vm.hideMenu = function () {
            $scope.$apply(function () {
                chartModel.setHelpIconInfo(false);
                vm.unbindMenuClick();
            });
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtNewMasterChartCtrl', ['$scope', 'newMasterchartModel', '$location', '$stateParams', '$timeout', 'rpWatchList', BdgtNewMasterChartCtrl]);

})();
