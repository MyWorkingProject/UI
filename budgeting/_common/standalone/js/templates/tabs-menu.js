//  Tabs Menu Template

(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateUrl = "templates/budgeting/tabs-menu/tabs-menu.html";

    templateHtml = "" +
            "<button ng-repeat='menuItem in model.list' type='button' class='btn btn-outline b-primary text-primary'>{{menuItem.text}}</button>";
      /*  "<div class='rp-tabs-menu'>" +
            "<ul class='menu'>" +
                "<li ng-repeat='menuItem in model.list' class='menu-item'>" +
                    "<a ng-if='menuItem.href' " +
                        "class='menu-link' " +
                        "href='{{menuItem.href}}' " +
                        "ng-click='model.activate(menuItem)' " +
                        "ng-class='{active: menuItem.isActive}' >" +
                        "{{menuItem.text}}" +
                    "</a>" +
                    "<span ng-if='!menuItem.href' " +
                        "class='menu-link' " +
                        "ng-click='model.activate(menuItem)' " +
                        "ng-class='{active: menuItem.isActive}' >" +
                        "{{menuItem.text}}" +
                    "</span>" +
                "</li>" +
            "</ul>" +
        "</div>";*/

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module("budgeting")
        .run(['$templateCache', installTemplate]);
})(angular);
