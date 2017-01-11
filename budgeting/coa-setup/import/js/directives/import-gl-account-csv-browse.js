//  CSV Browse Directive

(function (angular) {
    "use strict";

    function csvBrowse() {
        function link(scope, elem, attr) {
            var dir = {};

            dir.init = function () {
                scope.dir = dir;
                dir.fileUploadElement = elem.find("input[type='file']");
                dir.fileUploadElement.on('change', dir.change);
                //scope.on('$destroy', dir.destroy);
            };

            dir.change = function (evt) {
                scope.page.model.form.files = evt.target.files;
            };

            //dir.destroy = function () {
            //    dir.fileUploadElement = undefined;
            //};

            dir.init();
        }

        return {
            scope: {
                fileData: '='
            },
            link: link,
            restrict: 'E',
            replace: true,
            controller: 'BdgtImprtGlCsv as page',
            templateUrl: "templates/budgeting/coaSetup/imprt/csv-browse.html"
        };
    }

    angular
        .module("budgeting")
        .directive('csvBrowse', [
            csvBrowse
        ]);
})(angular);
