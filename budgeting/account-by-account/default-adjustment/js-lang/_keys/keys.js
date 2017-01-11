(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [

            "def_adj_hd",

        	//Buttons
        	"def_adj_apply",
        	"def_adj_cancel",

        	//Table
        	"def_adj_desc",
        	"def_adj_total",
        	"def_adj_percent",
        	"def_adj_amt",

        	// Months
            "def_adj_jan",
            "def_adj_feb",
            "def_adj_mar",
            "def_adj_apr",
            "def_adj_may",
            "def_adj_jun",
            "def_adj_jul",
            "def_adj_aug",
            "def_adj_sep",
            "def_adj_oct",
            "def_adj_nov",
            "def_adj_dec",

            //Error
            "def_adj_not_available",
            "def_adj_num_only"
        ];

        appLangKeys.app("default-adjustment").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
