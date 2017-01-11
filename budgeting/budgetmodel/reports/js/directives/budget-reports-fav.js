//  Level Sections Directive

(function (angular) {
    'use strict';

    function reportsFav(timeout, reportsSVC,reportsGridModel,exception) {
        function link(scope, elem, attr) {
            var dir = {};
            dir.record = {};
            //var btnClick, body;
            //dir.popover = 'close';

            dir.init = function () {
               // btnClick = 'click.toggleMenu';
               // body = body || angular.element('body');
                scope.dir = dir;
            };

            dir.favClick = function (record) {
                dir.record = record;
                dir.record.isFavorite = !dir.record.isFavorite;
                if(parseInt(dir.record.reportFavoriteID) <= 0){
                    var promise = dir.getFavPostPromise();
                    promise.then(dir.setFav,dir.handleError);
                }
                else{
                     var promise1 = dir.getFavDeletePromise();
                     promise1.then(dir.setDelFav,dir.handleError);
                }
                //scope.updateData({record:dir.record});
               //logc(ctrl);
               //scope.$parent.$parent.$parent.$parent.page.updateList(dir.record);
            };

           dir.setFav = function(response){
                //dir.record.isFavorite = true;
                dir.record.reportFavoriteID = response.messageId;
           }; 

           dir.setDelFav = function(response){
                dir.record.isFavorite = false;
                dir.record.reportFavoriteID = 0;
                reportsGridModel.updateList(dir.record);
           };

           dir.handleError = function(response){
                exception.getPostException(response);
           };
 
           dir.getFavDeletePromise = function(){
                var params =  {
                      reportfavoriteID : dir.record.reportFavoriteID,
                    };
                return reportsSVC.deleteFavorite(params).$promise;
            };           

            dir.getFavPostPromise = function(){
                var reportType="";
                if(dir.record.type!==undefined && dir.record.type!==""){
                    reportType = dir.record.type;
                }
                else if(dir.record.reportType!==undefined && dir.record.reportType!==""){
                    reportType="Default";
                }
                else{
                    reportType="Custom";    
                }
                var params =  {
                      "reportFavoriteID": dir.record.reportFavoriteID,
                      "reportID": dir.record.reportID,
                      "reportType": reportType
                    };
                return reportsSVC.updateFavorite(params).$promise;
            };

            dir.init();
        }

        return {
            scope: {
                details: '=',
                updateData: '&updateList'
            },
            link: link,
            //controller:'BdgtReportsCtrl as Page',
            restrict: 'E',
            replace: true,
            templateUrl: "app/templates/reports-fav.html"
        };
    }

    angular
        .module('budgeting')
        .directive('reportsFav', [
            '$timeout',
            'budgetReportsSvc',
            'budgetReportsGridFactory',
            'budgetReportsErrorHandling',
            reportsFav
        ]);
})(angular);
