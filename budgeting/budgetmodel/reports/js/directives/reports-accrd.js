
 angular.module('budgeting').directive('reportsAccrd', function() {
    return {
        restrict: 'A',
        scope: {
            val: '='
        },
        link: function(scope, element, attrs) {
            scope.$watch('val', function(value) {
                if (value){
                 element.removeClass('collapsed');
                }
            }, true);
        }
    };
});