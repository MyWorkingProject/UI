(function () {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = 'app/common/templates/recall-finalize-confirm.html';

    templateHtml = '<div id="finalizeRecall" class="modal" data-backdrop="true">' +
    '    <div class="modal-dialog">' +
    '        <div class="modal-content">' +
    '            <div class="modal-header">' +
    '                <h5 class="modal-title">' +
    '                   {{::modal.content.title}}' +
    '                </h5>' +
    '            </div>' +
    '            <div class="modal-body">' +
    '                <div class="row">' +
    '                    <div class="col-sm-10 col-xs-9 m-l-md">' +
    '                        <p>' +
    '                            {{::modal.content.message}}' +
    '                        </p>' +
    '                        <p class="_500">{{::modal.content.confirmMessage}}</p>' +
    '                    </div>' +
    '                </div>' +
    '            </div>' +
    '            <div class="modal-footer text-center m-b-1">' + 
    '                <button type="button" class="btn rounded primary m-r-1" ng-click="modal.accept(modal.result.accept)">{{::modal.content.btnAcceptText}}</button>' +
    '                <button type="button" class="btn rounded btn-outline text-primary b-primary" ng-click="modal.reject(modal.result.reject)">{{::modal.content.btnRejectText}}</button>' +
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
