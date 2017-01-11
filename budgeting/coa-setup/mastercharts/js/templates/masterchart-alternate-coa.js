(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateUrl = "templates/mastercharts/masterchart-alternate-coa.html";

    templateHtml = "" +
        "<span class='text'> " +
              "{{record.isAlternativeCOA?'Yes':'No'}}" +
          "</span>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }


    angular
        .module("budgeting")
        .run(['$templateCache', installTemplate]);


})();