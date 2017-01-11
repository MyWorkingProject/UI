//  Scrolling Tabs Menu Template

(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateHtml = "" +
     "<div class='row'>"+
        "<div class='col-sm-12'>"+
            "<div class='p-y-md p-t-sm  clearfix'>" +
                "<div class='tabbable-panel '>" +               
                    "<div class='tabbable-line'>" +
                        "<ul class='nav nav-tabs m-t-md p-t-xs'>" +
                            "<li ng-repeat='tab in model' " +
                                "model='tab' " +
                                "class='nav-item' > " +                               
                                "<a ng-if='tab.href' " +
                                    "class='nav-link' " +
                                    "href='{{tab.href}}' " +
                                    "ng-class='{active: tab.isActive}'"+
                                    "ng-click='vm.activateTab(tab)' >" +
                                    "{{tab.text}}" +
                                "</a>" +                              
                            "</li>" +
                        "</ul>" +
                    "</div>" +
                "</div>" +
            "</div>"+
         "</div>" +
     "</div>";



    

    templateUrl = "templates/realpage/scrolling-tabs-menu/scrolling-tabs-menu.html";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module("app")
        .run(['$templateCache', installTemplate]);
})(angular);
