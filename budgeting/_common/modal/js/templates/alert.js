(function () {
    'use strict';

    var templateHtml, templateUrl;
    templateUrl = "app/common/templates/alert.html";
    templateHtml = '' +
        '<div class="modal">' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content">' +
        '            <div class="modal-header">' +
        '                <h5 class="modal-title">{{::modal.content.title}}</h5>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <div class="dialog-padding-left p-t-sm">' +
        '                    <span class="m-b-sm">{{::modal.content.message}}</span>' +
        '                </div>' +
        '            </div>' +
        '            <div class="modal-footer text-center">' +
        '                <button type="button" class="btn rounded primary p-x-md m-l-1" ng-click="modal.ok()">{{::modal.content.btnOkText}}</button>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
})();