
 angular.module('budgeting').directive('reportsAccrdUl', function() {
    return {
        restrict: 'A',
        scope: {
            val: '='
        },
        link: function(scope, element, attrs) {
            scope.$watch('val', function(value) {
                if (value){
                 element.addClass('in');
                 element.removeAttr('style');
                }
            }, true);
        }
    };
});