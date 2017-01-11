//  CSV Browse Directive

(function (angular) {
    "use strict";

    function fileRead(csvModel,timeout) {
        function link(scope, elem, attr) {
            var dir = {};

            dir.change = function (evt) {
                //scope.fileread = evt.target.files;
                scope.$apply(function () {
                        scope.fileread = evt.target.files[0];
                    });
            };
            dir.init = function () {
                dir.fileread = scope.fileread;
                scope.dir = dir;
                dir.updateFile = csvModel.subscribe("update",dir.setSrcPage);  
            };

            dir.setSrcPage = function(){
                scope.fileread = "";
                elem.val("");
            };
            
            elem.bind("change", dir.change);
            //dir.destroy = function () {
            //    dir.fileUploadElement = undefined;
            //};

            dir.init();
        }

        return {
            scope: {
                fileread: '='
            },
            link: link,
            //controller: 'BdgtImprtGlCsv as page',
            restrict: 'A'
            
        };
    }

    angular
        .module("budgeting")
        .directive('fileread', ['contractsCSVModel','$timeout',
            fileRead
        ]);
})(angular);
