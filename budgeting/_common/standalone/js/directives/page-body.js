//  Page Body Directive

angular.module("budgeting").directive('pageBody', ['dataShare',
    function (dataShare) {
        function link(scope, element, attributes) {
            dataShare('showPageBody').watch(function (show) {
                if (show) {
                    element.show();
                }
                else {
                    element.hide();
                }
            });
        }

        return {
            link: link,
            restrict: 'C'
        };
    }
]);
