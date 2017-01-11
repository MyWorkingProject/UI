//  English Resource Bundle for MoveinsNotReady

(function() {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('miscaccounts');

        bundle.set({
            page_Headings: "Allocations",
          
            //action          : 'Action',
            //Name            : 'Name',
            //LastModified    : 'Last Modified',
          
        });

        bundle.test();
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
