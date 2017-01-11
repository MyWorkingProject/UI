//  Source: _lib\realpage\breadcrumbs\js\_bundle.inc
angular.module("rpBreadcrumbs", []);

//  Source: _lib\realpage\breadcrumbs\js\templates\templates.inc.js
angular.module('rpBreadcrumbs').run(['$templateCache', function($templateCache) {
$templateCache.put("realpage/breadcrumbs/templates/breadcrumbs.html",
"<div class=\"rp-breadcrumbs\" ng-show=\"model.isVisible\"><a class=\"home-icon {{::model.home.icon}}\" href=\"{{::model.home.url}}\"></a><div class=\"pull-left ft-b-r\"><div class=\"product-name\">{{model.product.name}}</div><div class=\"rp-breadcrumbs-links\"><div class=\"rp-breadcrumb home-link\"><a href=\"{{model.home.url}}\" class=\"rp-breadcrumb-text\">{{model.home.text}}</a></div><ul class=\"rp-breadcrumbs-list\"><li ng-repeat=\"link in model.links\" class=\"rp-breadcrumb p-a-0\"><a href=\"{{link.href}}\" class=\"rp-breadcrumb-text\">{{link.text}}</a></li></ul><div class=\"active-page rp-breadcrumb\"><span class=\"active-page-text rp-breadcrumb-text\">{{model.activePage.text}}</span></div></div></div></div>");
}]);

//  Source: _lib\realpage\breadcrumbs\js\providers\breadcrumbs.js
//  Breadcrumbs Model Provider

(function (angular) {
    "use strict";

    function Provider() {
        var prov = this;

        prov.links = {};
        prov.breadcrumbs = [];

        prov.setProduct = function (product) {
            prov.product = product;
            return prov;
        };

        prov.setHome = function (home) {
            prov.home = home;
            return prov;
        };

        prov.setLinks = function (links) {
            prov.links = links;
            return prov;
        };

        prov.setBreadcrumbs = function (breadcrumbs) {
            prov.breadcrumbs = breadcrumbs;
            return prov;
        };

        function provide($rootScope, location, storage) {
            var model = {},
                ev = "$locationChangeSuccess";

            model.init = function () {
                model.home = prov.home;
                model.updateFromStorage();
                model.product = prov.product;
                $rootScope.$on(ev, model.setLinks);
                return model;
            };

            model.updateFromStorage = function () {
                var dataKey = "breadcrumbsLinks";

                if (storage.has(dataKey)) {
                    var links = storage.get(dataKey);
                    Object.keys(links).forEach(function (key) {
                        angular.extend(prov.links[key], links[key]);
                    });
                }
            };

            model.setLinks = function () {
                var url = location.url();

                model.isVisible = false;

                prov.breadcrumbs.forEach(function (item) {
                    if (url.match(item.url)) {
                        model.isVisible = true;
                        model.links = item.links || [];
                        model.activePage = item.activePage;
                    }
                });
            };

            model.setActivePage = function (page) {
                model.activePage = page;
                return model;
            };

            model.updateLink = function (key, data) {
                if (prov.links[key]) {
                    angular.extend(prov.links[key], data);
                    storage.set("breadcrumbsLinks", prov.links);
                }
                else {
                    logc("rpBreadcrumbsModel: Invalid link key!");
                }

                return model;
            };

            return model.init();
        }

        prov.$get = [
            "$rootScope",
            "location",
            "rpSessionStorage",
            provide
        ];
    }

    angular
        .module("rpBreadcrumbs")
        .provider("rpBreadcrumbsModel", [Provider]);
})(angular);

//  Source: _lib\realpage\breadcrumbs\js\directives\breadcrumbs.js
//  Breadcrumbs Directive

(function (angular) {
    "use strict";

    function rpBreadcrumbs(model) {
        function link(scope, elem, attr) {
            scope.model = model;
        }

        return {
            scope: {},
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: "realpage/breadcrumbs/templates/breadcrumbs.html"
        };
    }

    angular
        .module("rpBreadcrumbs")
        .directive('rpBreadcrumbs', ["rpBreadcrumbsModel", rpBreadcrumbs]);
})(angular);

