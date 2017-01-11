//  Shift Page Directive

angular.module("budgeting").directive('shiftPage', ['shiftPageSvc',
    function (shiftPageSvc) {
        return {
            restrict: 'A',

            link: function (scope, element, attrs) {
                function getLeftMargin() {
                    return shiftPageSvc.getLeftMargin();
                }

                scope.$watch(getLeftMargin, function (nv, ov) {
                    element.animate({
                        marginLeft: nv
                    }, 350);
                });
            }
        };
    }
]);
