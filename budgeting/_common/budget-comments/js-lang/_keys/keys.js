(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [
           'bdgt_comments_title',
           'bdgt_comments_post',
           'bdgt_comments_edit',
           'bdgt_comments_save',
           'bdgt_comments_cancel',
           'bdgt_comments_delete',
           'bdgt_comments_comment_placeholder',
           'bdgt_comments_text_required'
        ];

        appLangKeys.app("budgeting.common.comments").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
