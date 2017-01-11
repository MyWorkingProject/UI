(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateUrl = "templates/manage-gl-account/manage-gl-restrict-payroll.html";

    templateHtml = "" +
      "<span class='text'> " +
           "{{record.restrictPayroll?'Restricted':'Not Restricted'}}" +
       "</span>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }


    angular
        .module("budgeting")
        .run(['$templateCache', installTemplate]);


})();