//  Source: _lib\realpage\global-header\js\_bundle.inc
angular.module("rpGlobalHeader", []);

//  Source: _lib\realpage\global-header\js\plugins\combo-menu-toggle.js
// Combo Menu Toggle

(function (win, $) {
    "use strict";

    function ComboMenuToggle(elem) {
        var s = this;
        s.init(elem);
    }

    var p = ComboMenuToggle.prototype;

    p.init = function (elem) {
        var s = this;
        s.elem = elem;
        s.$win = $(win);
        s.isOpen = false;
        s.clickEvt = "click.comboMenuToggle";
        s.resizeEvt = "resize.comboMenuToggle";
        s.header = elem.parents(".rp-global-header:first");

        s.bindEvents();
    };

    p.bindEvents = function () {
        var s = this;
        s.elem.on(s.clickEvt, s.toggleHeader.bind(s));
    };

    p.collapseHeader = function () {
        var s = this;
        s.header.height("");
    };

    p.onWinResize = function () {
        var s = this;
        s.isOpen = false;
        s.collapseHeader();
        s.$win.off(s.resizeEvt);
    };

    p.toggleHeader = function () {
        var s = this;

        if (s.isOpen) {
            s.collapseHeader();
            s.$win.off(s.resizeEvt);
        }
        else {
            var scrollHeight = s.header.prop("scrollHeight");
            s.header.height(scrollHeight);
            s.$win.off(s.resizeEvt).on(s.resizeEvt, s.onWinResize.bind(s));
        }

        s.isOpen = !s.isOpen;
    };

    $.fn.globalHeaderComboMenuToggle = function () {
        this.each(function () {
            var $el = $(this),
                inst = $el.data("comboMenuToggle");

            if (!inst) {
                $el.data("comboMenuToggle", new ComboMenuToggle($el));
            }
        });

        return this;
    };
})(window, jQuery);

//  Source: _lib\realpage\global-header\js\plugins\user-links-toggle.js
// User Links Toggle

(function (win, $) {
    "use strict";

    function UserLinksToggle(elem) {
        var s = this;
        s.init(elem);
    }

    var p = UserLinksToggle.prototype;

    p.init = function (elem) {
        var s = this;
        s.elem = elem;
        s.$win = $(win);
        s.isOpen = false;
        s.body = $("body");
        s.clickEvt = "click.userLinksToggle";
        s.resizeEvt = "resize.userLinksToggle";
        s.menu = s.elem.siblings(".rp-global-header-user-links");
        s.bindEvents();
    };

    p.bindEvents = function () {
        var s = this;
        s.elem.on(s.clickEvt, s.toggleMenu.bind(s));
    };

    p.onWinResize = function () {
        var s = this;
        s.collapseMenu();
        s.isOpen = false;
        s.$win.off(s.resizeEvt);
    };

    p.onBodyClick = function () {
        var s = this;
        s.collapseMenu();
        s.isOpen = false;
        s.body.off(s.clickEvt);
    };

    p.collapseMenu = function () {
        var s = this;
        s.menu.removeClass("open");
    };

    p.showMenu = function () {
        var s = this;
        s.menu.show();
        setTimeout(function () {
            s.menu.addClass("open");
        }, 10);
    };

    p.toggleMenu = function (event) {
        var s = this;

        event.stopPropagation();

        if (s.isOpen) {
            s.collapseMenu();
            s.$win.off(s.resizeEvt);
        }
        else {
            s.showMenu();
            s.$win
                .off(s.resizeEvt)
                .on(s.resizeEvt, s.onWinResize.bind(s));

            s.body
                .off(s.clickEvt)
                .on(s.clickEvt, s.onBodyClick.bind(s));
        }

        s.isOpen = !s.isOpen;
    };

    $.fn.globalHeaderUserLinksToggle = function () {
        this.each(function () {
            var $el = $(this),
                inst = $el.data("UserLinksToggle");

            if (!inst) {
                $el.data("UserLinksToggle", new UserLinksToggle($el));
            }
        });

        return this;
    };
})(window, jQuery);


//  Source: _lib\realpage\global-header\js\directives\global-header.js
// Global Header Directive

(function(angular) {
    "use strict";

    function globalHeader($, $window, model) {
        function link(scope, el, attrs) {
            var dir = {},
                headerData = model.getData();

            dir.init = function () {
                scope.header = dir;
                scope.headerData = headerData;

                dir.watch = scope.$on("$destroy", dir.destroy);
                $(".rp-global-header-user-name").globalHeaderUserLinksToggle();
                $(".rp-global-header-combo-menu-toggle").globalHeaderComboMenuToggle();
            };

            dir.signout = function () {
                model.signout();
                $window.location.href = headerData.signinUrl;
            };

            dir.destroy = function () {
                dir.watch();
                dir = undefined;
            };

            dir.init();
        }

        return {
            scope: {},
            link: link,
            restrict: "E",
            replace: true,
        	templateUrl: "realpage/global-header/templates/header.html"
        };
    }

    angular
        .module("rpGlobalHeader")
        .directive("rpGlobalHeader", [
            "jQuery",
            "$window",
            "rpGlobalHeaderModel",
            globalHeader
        ]);
})(angular);

//  Source: _lib\realpage\global-header\js\models\global-header.js
//  Header Model

(function (angular) {
    "use strict";

    function factory(cookie, cdnVer) {
        var data,
            model = {};

        data = {
            signinUrl: "/ui/signin/#/",
            logoSrc: "../" + cdnVer + "/lib/realpage/global-header/images/rp-logo-white.png",
            userAvatar: "../" + cdnVer + "/lib/realpage/global-header/images/user-avatar.jpg"
        };

        model.getData = function () {
            return data;
        };

        model.setData = function (newData) {
            angular.extend(data, newData);
        };

        model.signout = function () {
            cookie.erase("langingUrl");
            cookie.erase("authorization");
        };

        return model;
    }

    angular
        .module("rpGlobalHeader")
        .factory("rpGlobalHeaderModel", ["rpCookie", "cdnVer", factory]);
})(angular);

//  Source: _lib\realpage\global-header\js\templates\templates.inc.js
angular.module('app').run(['$templateCache', function($templateCache) {
$templateCache.put("realpage/global-header/templates/header.html",
"<div class=\"rp-global-header\"><a href=\"\" class=\"rp-global-header-logo\"><img class=\"rp-global-header-logo-img\" ng-src=\"{{headerData.logoSrc}}\" alt=\"logo\"></a> <a href=\"\" class=\"rp-global-header-combo-menu-toggle\"></a><div class=\"rp-global-header-combo-menu\"><div class=\"rp-global-header-user-area\"><div class=\"rp-global-header-user-name\">{{headerData.username}}</div><div class=\"rp-global-header-user-avatar\"><img class=\"rp-global-header-user-avatar-img\" ng-src=\"{{headerData.userAvatar}}\" alt=\"\"></div><div class=\"rp-global-header-user-links\"><ul class=\"rp-global-header-user-links-group\"><li class=\"rp-global-header-user-link\"><span class=\"rp-global-header-user-link-text\">Inbox</span> <span class=\"rp-global-header-user-link-count warn\">3</span></li><li class=\"rp-global-header-user-link\"><span class=\"rp-global-header-user-link-text\">Profile</span></li><li class=\"rp-global-header-user-link\"><span class=\"rp-global-header-user-link-text\">Settings</span> <span class=\"rp-global-header-user-link-count primary\">3/9</span></li></ul><span class=\"rp-global-header-user-link-sep\"></span><ul class=\"rp-global-header-user-links-group\"><li class=\"rp-global-header-user-link\"><span class=\"rp-global-header-user-link-text\">Need help?</span></li><li ng-click=\"header.signout()\" class=\"rp-global-header-user-link\"><span class=\"rp-global-header-user-link-text\">Sign out</span></li></ul></div></div><ul class=\"rp-global-header-product-links\"><li class=\"rp-global-header-product-link link-1\"></li><li class=\"rp-global-header-product-link link-2\"></li><li class=\"rp-global-header-product-link link-3\"></li><li class=\"rp-global-header-product-link link-4\"><span class=\"rp-global-header-product-link-count\">1</span></li></ul></div><form class=\"rp-global-header-search\"><input class=\"rp-global-header-search-text\" type=\"text\" placeholder=\"Search anything\"> <span class=\"rp-global-header-search-button\"></span></form></div>");
}]);
