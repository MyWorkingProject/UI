(function () {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "budget-comments/templates/index.html";

    templateHtml = "" +
        '<div id="comment" class="aside">' +
'    <div class="aside-dialog">' +
'        <div class="aside-content">' +
'            <div class="aside-header">' +
'                <div>' +
'                    <button type="button" class="close" ng-click="page.close()">×</button>' +
'                </div>' +
'                <div class="p-t-sm">' +
'                    <h5 class="m-b-xs">{{page.fieldLabels.pageTitle}}</h5>' +
                     '<div class="text-neutral-02 m-b-xs">{{page.model.subTitle}}</div>' +
'                </div>' +
'            </div>' +
'            <div class="aside-body">' +
'                <div ng-if="page.model.accessPrivilages">' +
'                    <ng-form class="ft-form" role="form" name="postComments" novalidate>' +
'                        <div class="form-group row">' +
'                            <div class="col-sm-12 m-t-1">' +
'                                <rp-form-textarea config="page.formConfig.commentText" rp-model="page.model.newCommentText">' +
'                                </rp-form-textarea>' +
'                            </div>' +
'                        </div>' +
'                        <div class="form-group row p-r-sm">' +
'                            <div class="col-xs-4 p-r-0 pull-right">' +
'                                <button type="submit" ng-click="page.postComment(postComments)" class="btn rounded primary w-full m-b-md">{{page.fieldLabels.btnPost}}</button>' +
'                            </div>' +
'                        </div>' +
'                    </ng-form>' +
'                </div>' +
'                <div class="row" style="height: 100%; overflow: scroll;" ng-if="page.model.comments.length">' +
'                    <div class="tab-content p-l-1 p-r-1">' +
'                        <div class="tab-pane p-v-sm active">' +
'                            <div class="streamline b-l m-b m-l">' +
'                                <div class="sl-item" ng-repeat="comment in page.model.comments">' +
'                                    <div class="sl-left">' +
'                                        <img src="/ui/budgeting/common/standalone/images/user-image-small.png" class="img-circle">' +
'                                    </div>' +
'                                    <div class="sl-content">' +
'                                        <div class="pull-left sl-date">{{comment.lastModifiedDate}}</div>' +
'                                        <div class="pull-right">' +
'                                            <a class="rp-icon-trash pull-right text-primary" ng-if="comment.isEditable" ng-click="page.deleteComment(comment)"> </a>' +
'                                            <a class="rp-icon-edit-text pull-right  m-r-sm text-primary" ng-if="comment.isEditable" ng-click="page.editCommentDetails(comment)"> </a>' +
'                                        </div>' +
'                                        <div class="col-xs-12 p-l-0">' +
'                                            <div ng-if="comment.createdBy" class="text-primary">{{comment.createdBy}}</div>' +
'                                        </div>' +
'                                        <div class="col-xs-12 p-l-0 rp-comment" ng-if="!comment.isEdit">' +
'                                            <p>{{::comment.comment }}</p>' +
'                                        </div>' +
'                                        <div ng-if="comment.isEdit" class="pull-left edit-comment">' +
'                                            <ng-form class="ft-form" role="form" name="editComment" novalidate>' +
'                                                <div class="rp-comment-textarea m-t-sm">' +
'                                                    <rp-form-textarea config="page.formConfig.editResponse" rp-model="page.model.editCommentText">' +
'                                                    </rp-form-textarea>' +
'                                                </div>' +
'                                                <div class="pull-right m-t-sm m-b-sm">' +
'                                                    <button class="btn rounded info w-xs" ng-click="page.updateComment(editComment)">' +
'                                                        {{page.fieldLabels.btnSave}}' +
'                                                    </button>' +
'                                                    <button class="btn rounded btn-outline b-primary text-primary w-xs" ng-click="page.hideComment(comment)">{{page.fieldLabels.btnCancel}}</button>' +
'                                                </div>' +
'                                            </ng-form>' +
'                                        </div>' +
'                                    </div>' +
'                                </div>' +
'                            </div>' +
'                        </div>' +
'                    </div>' +
'                </div>' +
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



