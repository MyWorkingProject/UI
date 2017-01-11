(function (angular) {
    "use strict";

    var fn = angular.noop;

    function CommentsRuleCtrl($scope, model,gridModel,$stateParams,formConfig) {
        var vm = this;
        vm.init = function () {
            vm.model = model;
            //model.setDistributedID($stateParams.distID);
            //vm.sessionWatch = session.subscribe("update",vm.getData);
            $scope.$on('$destroy', vm.destroy);
            $scope.gridFactory = gridModel;
            gridModel.setSrc(vm);
            gridModel.initStates();
            gridModel.load($stateParams.distID);
            model.setOptions();          
            vm.formConfig = formConfig;
             formConfig.setMethodsSrc(vm);

        };

        vm.getData = function () {
            gridModel.load();

        };

        vm.getKeyValue = function(val){
            return model.getKeyValue(val);
        };

        vm.onEdit = function(){
            model.onEdit();
        };

        vm.onCancel = function(){
            model.onCancel();
             gridModel.load($stateParams.distID);
            model.setOptions();  
        };

        vm.saveCommentRules = function(){
            model.saveCommentRules(gridModel.getSelectedRecords());
        };

        vm.destroy = function () {
            gridModel.reset();
            model.reset();
        };

          //Year Validation
        vm.checkAmount = function (modelValue, viewValue) {
           return  model.isValidateAmount(modelValue);
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('CommentsRuleCtrl', [
            '$scope',
            'budgetCommentsRules',
            'budgetCommentsRulesFactory',
            '$stateParams',
            'comments-rule-config',
            //'sessionInfo',
            //'budgetComment',
            CommentsRuleCtrl
        ]);
})(angular);
