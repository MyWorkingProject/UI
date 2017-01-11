(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [

            "job_pos_view_header",
            "job_pos_edit_header",

            "job_pos_btn_save",
            "job_pos_btn_cancel",
            "job_pos_btn_edit",

            "job_pos_title",
            "job_pos_dept",
            "job_pos_comp_class",
            "job_pos_employees_count",

            "job_pos_dept_placeholder",
            "job_pos_comp_class_placeholder",
            "job_pos_employees_count_placeholder",

            "job_pos_title_required",
            "job_pos_employees_count_required"


        ];

        appLangKeys.app("jobPostionDetails").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
