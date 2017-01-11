(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("budgeting.common.comments");
        bundle.set({
            bdgt_comments_title: "Comments",
            bdgt_comments_post: "Post",
            bdgt_comments_edit: "Edit",
            bdgt_comments_save: "Save",
            bdgt_comments_cancel: "Cancel",
            bdgt_comments_delete: "Delete",
            bdgt_comments_comment_placeholder: "Leave a Comment",
            bdgt_comments_text_required: "Reqruired field"
        });
    }
    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();