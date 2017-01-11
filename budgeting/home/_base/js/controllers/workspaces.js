//  Workspaces Controller

(function (angular) {
    "use strict";

    function BdgtWorkspacesCtrl(workspaces, config, session, $scope) {
        var vm = this;

        vm.init = function() {
            vm.config = config;
            vm.destWatch = $scope.$on('$destroy', vm.destroy);
            vm.sessionWatch = session.subscribe("update", vm.updateModel);

            vm.updateModel();
        };

        vm.destroy = function() {
            vm.destWatch();
            vm.sessionWatch();
        };

        vm.updateModel = function(data) {
            
                config.isSessionReady(true);
                workspaces.setConfig(config.load());

        };

/*
        vm.init = function () {
            vm.config=config;

            if (session.isReady()) {
                config.isSessionReady(true);
                workspaces.setConfig(config.load());

                if (vm.sessionWatch) {
                    vm.sessionWatch();
                }
                return vm;
            }
            else {
                vm.sessionWatch = session.subscribe("update", vm.init);
            }
          
            session.subscribe("update",vm.getData);   
            $scope.$on('$destroy', vm.destroy);
        };

        vm.destroy = function () {
            config.isSessionReady(false);
        };
        
        vm.getData =function(){
            config.isSessionReady(true);
            workspaces.setConfig(config.load());
        };
*/
        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtWorkspacesCtrl', [
            'workspacesConfig',
            'bdgtWorkspacesConfig',
            'sessionInfo',
            '$scope',
            BdgtWorkspacesCtrl
        ]);
})(angular);
