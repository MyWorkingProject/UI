(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("gl-acct-history");

        bundle.set({

            gl_acct_history_hd: "GL Account History",
            gl_acct_history_period_hd: "GL Account History for ",
            gl_acct_comments: "Comments",

            // Book Types
            gah_book_type_accrual: "Accrual",
            gah_book_type_cash: "Cash",

            // Data Types
            gah_data_type_actual: "Actual",
            gah_data_type_model: "Budget Model",

            // Grid Headers
            gl_grid_posted: "Posted",
            gl_grid_memo: "Memo/Description",
            gl_grid_description: "Description",
            gl_grid_dept_id: "Dept ID",
            gl_grid_loc_id: "Location ID",
            gl_grid_debit: "Debit",
            gl_grid_credit: "Credit", 
            gl_grid_balance: "Balance",
            gl_grid_total: "Total",

            gah_err_no_data_available: "No history available.",
            gah_err_no_comments: "No related comments.",
            gah_err_cant_get_history: "Cannot retrieve GL Account History.",
            gah_err_cant_get_booktype: "Unable to determine book type. Close the history window and try again.",
            gah_err_cant_get_comments: "Cannot retrieve budget comments."

        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();