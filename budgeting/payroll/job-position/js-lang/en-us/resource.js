(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("jobPostionDetails");

        bundle.set({
            job_pos_view_header: "Position Detail",
            job_pos_edit_header: "Edit Position Detail",
            job_pos_new_header: "New Position Detail",

            job_pos_btn_save: "Save",
            job_pos_btn_cancel: "Cancel",
            job_pos_btn_edit: "Edit",

            job_pos_title: "Title",
            job_pos_dept: "Department",
            job_pos_comp_class: "Worker's Comp Class",
            job_pos_employees_count: "Number of Employees",

            job_pos_dept_placeholder: "Which department does it belong?",
            job_pos_comp_class_placeholder: "What is the worker's compensation class?",
            job_pos_employees_count_placeholder: "How many employees are in this position?",

            job_pos_title_required: "Enter job position title",
            job_pos_employees_count_required: "Enter number of employees for this position"

        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();