(function(angular) {
    "use strict";
    angular
        .module("budgeting")
        .controller("detailsCtrl", [
            '$scope',
            'detailsContentModel',
            function(
                $scope,
                detailsContentModel) {
                var vm = this;
                vm.init = function() {
                    vm.fieldLabels = detailsContentModel;
                    vm.destWatch = $scope.$on("$destroy", vm.destroy);
                };
                vm.destroy = function() {
                    vm.destWatch();
                };

                vm.init();
            }
        ]);


})(angular);