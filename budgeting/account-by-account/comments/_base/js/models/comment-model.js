//  GL Account Comment Model

(function (angular) {
    'use strict';
    function factory(
        langTranslate,
        commentsContent
        ){

        var model = {},
            tabs = [],
            commentModelInfo;

        function tabText(title, count) {
            return title + ' (' + count + ')';
        }

        model.init = function (_commentModelInfo) {
            commentModelInfo = _commentModelInfo;
            tabs = [{
                id: 1,
                isActive: true,
                text: tabText(commentsContent.generalText, commentModelInfo.glGeneralCommentsCount),
                tabViewUrl: 'account-by-account/comments/general/index.html'
            }, {
                id: 2,
                isActive: false,
                text: tabText(commentsContent.reviewerText, commentModelInfo.glReviewerCommentsCount),
                tabViewUrl: 'account-by-account/comments/reviewer/index.html'
            }];
            return model;
        };

        model.getTabs = function () {
            tabs[0].text = tabText(commentsContent.generalText, commentModelInfo.glGeneralCommentsCount);
            tabs[1].text = tabText(commentsContent.reviewerText, commentModelInfo.glReviewerCommentsCount);
            return tabs;
        };

        model.getGLAccountNumber = function () {
            return commentModelInfo.glAccountNumber;
        };

        model.updateGeneralCommentCount = function (count) {
            commentModelInfo.glGeneralCommentsCount = count;
            model.getTabs();
        };

        model.updateReviewerCommentCount = function (count) {
            commentModelInfo.glReviewerCommentsCount = count;
            model.getTabs();
        };

        model.generalCommentAdded = function () {
            commentModelInfo.hasGeneralCommentsAdded = true;
        };

        model.reviewerCommentAdded = function () {
            commentModelInfo.hasReviewerCommentsAdded = true;
        };

        return model;
    }

    angular
        .module('budgeting')
        .factory('commentModel', [
            'appLangTranslate',
            'commentsContentModel',
            factory]);
})(angular);
