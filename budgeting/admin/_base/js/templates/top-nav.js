//  Admin Nav Template

(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateHtml = "" +
            "<div><h2 class='topnavTitle'>{{topnavmodel.topnavlinks.topTitle}}</h2>" +
            "<div class='rp-breadcrumbs'>" +
                "<div class='breadcrumb' ng-repeat='link in topnavmodel.topnavlinks.topLinks'>" +
                    "<a href='{{link.href}}' class='link'>" +
                        "{{link.linkName}}" +
                    "</a>" +
                    "<span class='separator'></span>" +
                "</div>" +
                "<div class='breadcrumb'>" +
                    "<span class='current'>" +
                        "{{topnavmodel.topnavlinks.topHighlight.linkName}}" +
                    "</span>" +
                "</div>" +
            "</div></div>";

    templateUrl = 'templates/topnav.html';

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module("budgeting")
        .run(['$templateCache', installTemplate]);
})(angular);
