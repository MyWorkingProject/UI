//  CSV Browse Template

(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateUrl = "templates/budgeting/coaSetup/import/category/csv-browse.html";

    templateHtml = '<div class="import-section-csv col-xs-6 source" >' +
    '<div>Select CSV File </div>' +
    '<input type="text" class="rp-form-input file-input" ng-model="fileData[0].filename"  ng-disabled="true" placeholder="Upload CSV File" />' +
'<span class="button white select-files">' +
'Browse' +
    '<input type="file" class="file-upload input-file" ng-model="fileData" id="fileUpload" name="files" accept="*" minsize="1" minnum="1" maxnum="1" base-sixty-four-input multiple />' +
'</span>' +
'</div>';

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module("budgeting")
        .run(['$templateCache', installTemplate]);
})(angular);
