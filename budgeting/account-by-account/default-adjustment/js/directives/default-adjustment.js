(function (angular, jQuery) {
    "use strict";

    function defaultAdjDirective(budgetDetails, defaultAdjModel, defaultAdjGridModel, defaultAdjFormConfig, i18n, rpWatchList, notifSvc, moment) {

        // var mockData = {
        //     year: 2014,
        //     type: "Forecast",
        //     adjustments: [
        //         { "amount": 1000, "percentage": 100 },
        //         { "amount": 1000, "percentage": 100 },
        //         { "amount": 1000, "percentage": 100 },
        //         { "amount": 1000, "percentage": 100 },
        //         { "amount": 1000, "percentage": 100 },
        //         { "amount": 1000, "percentage": 100 },
        //         { "amount": 1000, "percentage": 100 },
        //         { "amount": 1000, "percentage": 100 },
        //         { "amount": 1000, "percentage": 100 },
        //         { "amount": 1000, "percentage": 100 },
        //         { "amount": 1000, "percentage": 100 },
        //         { "amount": 1000, "percentage": 100 },
        //     ],
        //     applyChanges: angular.noop
        // };

        var DefaultAdjController = function($scope, $stateParams) {
            var vm = this;

            vm.init = function () {
                vm.watchList = rpWatchList();
                vm.watchList.add($scope.$on("$destroy", vm.destroy));

                vm.model = defaultAdjModel;
                vm.defaultAdjGrid = defaultAdjGridModel;
                vm.translate = i18n.translate;

                defaultAdjFormConfig.setMethodsSrc(vm);

                //get budget model details - needed to form grid
                budgetDetails.getPropertyInfo($stateParams.distID); //TODO refactor ideally passed into aside model

                //watch one time only
                vm.formWatch = $scope.$watch("defaultAdjustmentForm", vm.setForm); 
            };

            vm.setForm = function(form) {
                vm.formWatch();

                //set the form to submitted to force the textboxes to auto-check
                $scope.defaultAdjustmentForm.$setSubmitted();           
            };

            vm.initDisplay = function() {
                var bmDetails = budgetDetails.getModelDetails(),
                    data = defaultAdjModel.setGridData(bmDetails, $scope.model);

                var adjRow = defaultAdjModel.getAdjustmentRow();
                adjRow.adjustmentForAll = defaultAdjFormConfig.adjustmentForAll;

                defaultAdjGridModel.initGrid(bmDetails.budgetYear, bmDetails.startMonth, bmDetails.noOfPeriods);
                defaultAdjGridModel.populateGrid(data); 
            };

            vm.adjustAllPercentages = function(val) {
                var isNum = vm.validateNumbers(val);
                if(isNum) {
                    defaultAdjModel.adjustPercentageValues(val);
                }
            };

            vm.validateNumbers = function(val) {
                if(val === undefined || val === null) {
                    return true; //not required, so empty is valid
                }

                var convertedVal = Number(val);
                if(isNaN(convertedVal)) {
                    return false;
                }
                return true; 
            };

            vm.applyChanges = function() {
                $scope.model.applyChanges(defaultAdjModel.getReturnData());
            };
            
            vm.reset = function() {
                //TODO
            };       

            vm.destroy = function () {
                vm.reset();
                vm.watchList.destroy();
            };

            vm.init();
        };

        var DefaultAdjCtrl = ["$scope", "$stateParams", DefaultAdjController];

        var DefaultAdjLink = function(scope, elem, attrs, ctrl) {
            jQuery("#default-adjustment.modal")
                .on("show.bs.modal", function(evt) {
                    ctrl.initDisplay();
                    scope.$apply();
                })
                .on("hidden.bs.modal", function() {
                    ctrl.reset();
                });
        };

        return {
            controller: DefaultAdjCtrl,
            controllerAs: "page",
            link: DefaultAdjLink,
            scope: {
                model: "="
            },
            restrict: "E",
            replace: true,
            templateUrl: "app/templates/default-adjustment.html"
        };
    }

    angular
        .module("budgeting")
        .directive("rpDefaultAdjustment", [
            "budgetDetails",
            "defaultAdjModel",
            "defaultAdjGridModel",
            "defaultAdjFormConfig",
            "defaultAdjTranslatorSvc",
            "rpWatchList",
            "notificationService",
            "moment",
            defaultAdjDirective
        ]);
})(angular, $);