(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [

            "gl_acct_history_hd",
            "gl_acct_history_period_hd",
            "gl_acct_comments",

            // Book Types
            "gah_book_type_accrual",
            "gah_book_type_cash",

            // Data Types
            "gah_data_type_actual",
            "gah_data_type_model",

            // Grid Headers
            "gl_grid_posted",
            "gl_grid_memo",
            "gl_grid_description",
            "gl_grid_dept_id",
            "gl_grid_loc_id",
            "gl_grid_debit",
            "gl_grid_credit",
            "gl_grid_balance",
            "gl_grid_total",

            "gah_err_no_data_available",
            "gah_err_no_comments",
            "gah_err_cant_get_history",
            "gah_err_cant_get_booktype",
            "gah_err_cant_get_comments"

        ];

        appLangKeys.app("gl-acct-history").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
