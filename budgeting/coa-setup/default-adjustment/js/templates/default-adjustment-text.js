(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateUrl = "templates/default-adjustment/default-adjustmentText.html";

    templateHtml =
    "<input type='text' maxlength='20' " +
            "class='rp-form-input ' " +
    //"rp-wrapper-class='block'" +
            "ng-model='record.adjPercent' " +
            "value='{{record.adjPercent}}' " +
    //"rp-instance-name='{{column.model.accountCategoryID}}' " +
            "name='{{record.accountCategoryID}}' id='{{record.accountCategoryID}}' " +
            "placeholder='' " +
            "></input>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }


    angular
        .module("budgeting")
        .run(['$templateCache', installTemplate]);


})();