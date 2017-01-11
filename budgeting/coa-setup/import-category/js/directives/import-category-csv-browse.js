//  CSV Browse Directive

(function (angular) {
    "use strict";

    function csvCategoryBrowse() {
        function link(scope, elem, attr) {
            var dir = {};

            dir.init = function () {
                scope.dir = dir;
                dir.fileUploadElement = elem.find("input[type='file']");
                dir.fileUploadElement.on('change', dir.change);
                //scope.on('$destroy', dir.destroy);
            };

            dir.change = function (evt) {
                scope.$parent.page.model.form.files = evt.target.files;
                //scope.page.model.form.files = evt.target.files;
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
            templateUrl: "templates/budgeting/coaSetup/import/category/csv-browse.html"
        };
    }

    angular
        .module("budgeting")
        .directive('csvCategoryBrowse', [
            csvCategoryBrowse
        ]);
})(angular);
