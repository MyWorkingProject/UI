//  Level Sections Directive

(function (angular) {
    'use strict';

    function statusPercentage(timeout,workFlowSvc,workflowCommonSVC) {
        function link(scope, elem, attr) {
            var dir = {};
            var btnClick, body;
            dir.popover = 'close';

            dir.init = function () {
                btnClick = 'click.toggleMenu';
                body = body || angular.element('body');
                scope.dir = dir;
            };

            dir.statusClick = function (colDetails) {
                var promise= dir.getSequenceStatusPromise(colDetails);
                promise.then(dir.setData,dir.handleError);
                if (dir.popover === 'close') {
                    dir.popover = 'open';
                    timeout(dir.bindMenuClick);
                }
                else {
                    dir.popover = 'close';
                }
            };

            dir.setData = function(data){
                dir.statusData = data;
            };

             dir.handleError = function(resp){
               
            };

             dir.getSequenceStatusPromise = function (colDetails) {
                var params = {
                    distributedID: colDetails.distributedID,
                    sequence:colDetails.currentSequence <= 1 ? colDetails.currentSequence : 2
                };
                return workFlowSvc.getWorkflowSequenceStatus(params).$promise;
            };

            dir.bindMenuClick = function () {
                body.on(btnClick, dir.hideMenu);
            };

            dir.hideMenu = function () {
                scope.$apply(function () {
                    dir.popover = 'close';
                    dir.unbindMenuClick();
                });
            };

            dir.unbindMenuClick = function () {
                body.off(btnClick);
            };

            dir.showPopUp = function(record){
                workflowCommonSVC.setCalledFromGrid(true);
                workflowCommonSVC.setDistributedID(record.distributedID);
            };

            dir.init();
        }

        return {
            scope: {
                details: '='
            },
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: "app/templates/workflow-status-percentage.html"
        };
    }

    angular
        .module('budgeting')
        .directive('statusPercentage', [
            '$timeout','budgetWorkflowStatusSvc','workflowCommonSVC',
            statusPercentage
        ]);
})(angular);
