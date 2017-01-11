(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateUrl = "templates/manage-gl-account/manage-gl-budgetuse.html";

    templateHtml = "" +
       "<span class='text'> " +
            "{{record.budgetUseOnly?'Yes':'No'}}" +
        "</span>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }


    angular
        .module("budgeting")
        .run(['$templateCache', installTemplate]);


})();