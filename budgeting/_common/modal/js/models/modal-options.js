(function() {
    'use strict';

    function factory() {
        var optionConfig = {};

        optionConfig.confirm = {
            resolve: {
                rpBdgtContentModel: angular.noop,
                rpBdgtResultModel: angular.noop
            },
            backdrop: true,
            animation: 'am-fade-and-slide-top',
            placement: 'top',
            controller: 'ConfirmCtrl',
            controllerAs: 'modal',
            templateUrl: 'app/common/templates/confirm.html'
        };

        optionConfig.alert = {
            resolve: {
                rpBdgtContentModel: angular.noop
            },
            backdrop:true,
            animation: 'am-fade-and-slide-top',
            placement: 'top',
            controller: 'AlertCtrl',
            controllerAs: 'modal',
            templateUrl: 'app/common/templates/alert.html'
        };

        return function(name){
            if(!angular.isDefined(name) || !optionConfig.hasOwnProperty(name)){
                logc('Modal Option: ' + name + ' not found');
                return {};
            }
            return angular.copy(optionConfig[name]);
        };
    }

    angular
        .module("budgeting")
        .factory("rpBdgtModalOptions", [
            factory
        ]);
})();