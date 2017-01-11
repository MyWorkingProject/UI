//  Overlay Directive

angular.module("budgeting").directive('overlay', [
    function () {
        var template = '<div class="overlay" style="display:none" ' +
            'rp-fade="model" />';

        function link(scope, element, attributes) {}

        return {
            link: link,

            restrict: 'E',

            scope: {
                model: '='
            },

            replace: true,

            template: template
        };
    }
]);
