(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
           'bdgt_rental_mr_lable',
           'bdgt_rental_ar_lable',
           'bdgt_rental_lable',
           'bdgt_rental_by_lable',
           'bdgt_rental_mr_changes_header',
           'bdgt_rental_mr_changes_desc',
           'bdgt_rental_mr_changes_ok' ,
           'bdgt_rental_mr_refresh_cancel'  
        ];

        appLangKeys.app('rental-income').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);
