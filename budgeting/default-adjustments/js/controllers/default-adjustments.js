(function (angular) {
    "use strict";

    var fn = angular.noop;

    function DefaultAdjustmentsCtrl($scope, model, session, defaultAdjustments, formConfig, timeout, $window, budgetDetails) {
        var vm = this,
            selectedComment, btnClick, body;
       
        vm.init = function () {      
            vm.model = model;                                              
            vm.defaultAdjustments = defaultAdjustments;
            vm.formConfig = formConfig;
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';            
            vm.getData();
            vm.sessionWatch = session.subscribe("update", vm.getData);            
            $scope.$on('$destroy', vm.destroy);
            vm.selectWatch = $scope.$watch('page.model.state.isSelectAll', vm.toggleSelect); 
        };
     
        vm.clearAdjustDefaults = function (form) {
            model.adjPercent = "";
            form.$setPristine();
        };

        vm.toggleSelect = function () {
            model.selectAll(model.state.isSelectAll);
        };

        vm.selectAllStatus = function (flag) {           
            model.state.isSelectAll = flag;
        };
     
        vm.assignAdjustDefaults = function (form) {
            if (form.$invalid) {
                form.$setSubmitted();
            }
            else {
                model.assignAdjustDefaults();
                form.$setPristine();
            }
        };

        vm.saveDefaultAdjustments = function (form)
        {            
            var params = {
                    staus:model.overWrite,
                    budgetYear:0
                };                    
            model.saveDefaultAdjustments(params);         
        };
  
   
        vm.showSelectionChanges = function () {
            if ((model.getSelectedRecords()).length > 0) {
                    model.showSelectionChanges();
                }
                else {
                 model.showHideToolTip(true);
                     timeout(vm.bindMenu);
                 }
           
        };
        vm.bindMenu = function () {
            if(model.isToolTipisMenuOn()) {
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
                model.updateTipisMenuOn(false);
                vm.unbindMenuClick();
                });
        };
        //--------------------------------------------------------
        vm.showHelpToolTip = function () {
            model.showHideToolTipHelp(true);
            timeout(vm.bindMenuToolTip);
        };

        vm.bindMenuToolTip = function () {            
            if(model.isToolTipisMenuOnHelp()) {
                vm.bindHelpMenuClick();
                }
                };

        vm.bindHelpMenuClick = function () {
            body.on(btnClick, vm.hideHelpMenu);
                };

        vm.unbindHelpMenuClick = function () {
            body.off(btnClick);
        };

        vm.hideHelpMenu = function () {
            $scope.$apply(function () {
                model.updateHelpTipisMenuOn(false);
                vm.unbindHelpMenuClick();
                });
        };
        //---------------------------------------------------------------
        vm.getData = function () {          
            model.load();
        };
        vm.resetComment = function () {
            vm.dashboardComment.commentsResponse = "";
            vm.commentID = 0;
            vm.responseID = 0;

        };

        vm.cancel = function () {
            $window.history.back();
        };

 

        vm.destroy = function () {
            vm.sessionWatch();
            model.reset();
            defaultAdjustments.reset();
        };
            vm.init();
          
    }

    angular
        .module("budgeting")
        .controller('DefaultAdjustmentsCtrl', [
            '$scope',
            'budgetCommentsGridFactory',
            'sessionInfo',
            'defaultAdjustments',         
            'defaultAdjustmentsConfig',
            '$timeout',
            '$window',
            'budgetDetails',
            DefaultAdjustmentsCtrl
        ]);
})(angular);
