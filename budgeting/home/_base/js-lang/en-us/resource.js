//  English Resource Bundle for Admin Home Page

(function (angular) {
    'use strict';

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('workspaces');

        bundle.set({
            
            'Workspaces-title' : 'Workspaces',
            'e1ccb3dd71314e269402b4b04fe40be0-title':  'Contracts',
            'e12ec93a488b4fb8ae8e8b2867b3baaf-desc' :  'Expired',
            '24c1f45cc29b429db004692c51803b97-desc' :  'Expiring Soon',

            'c14201bf16e04d2aafdaac0f536b7a82-title':  'Budget Workflow Status',
            '22f7cc1ffd544b299b193551faca6925-desc' :  'In Progress',
            'd6f6042eb2f04374b7f53a4f78ae9f79-desc' :  'Need Approval',

            '68888a78123340e1965cedc4bf092456-title':  'Budget Comments',
            '6cd8f761f05441a6887864da2f9263dd-desc' :  'Unread',          

            'bcdb6eb8180f41d0b7f320dfb308ec7b-title':  'Budget Tasks',
            'e17cce3a0f714bd4b59ac3accd445754-desc' :  'Pending',
            '8ae45243f5d84e8f87eaf381bc107f34-desc' :  'Overdue'

           

        });
    }

    angular
        .module('budgeting')
        .config(['appLangBundleProvider', config]);
})(angular);
