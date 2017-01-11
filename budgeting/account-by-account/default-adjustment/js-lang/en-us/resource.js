(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("default-adjustment");

        bundle.set({

        	def_adj_hd: "Default Adjustment",

        	//Buttons
        	def_adj_apply: "Apply",
        	def_adj_cancel: "Cancel",

        	//Table
        	def_adj_desc: "Description",
        	def_adj_total: "Total",
        	def_adj_percent: "Adjustment %",
        	def_adj_amt: "Adjustment Amount",

        	// Months
            def_adj_jan: "Jan",
            def_adj_feb: "Feb",
            def_adj_mar: "Mar",
            def_adj_apr: "Apr",
            def_adj_may: "May",
            def_adj_jun: "Jun",
            def_adj_jul: "Jul",
            def_adj_aug: "Aug",
            def_adj_sep: "Sep",
            def_adj_oct: "Oct",
            def_adj_nov: "Nov",
            def_adj_dec: "Dec",

            //Error
            def_adj_not_available: "Not available.",
            def_adj_num_only: "Numerical inputs only"
        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();