// Configure Primary Navigation

(function(angular) {
    'use strict';

    function config(primaryNavModel) {
        var navData = [{
            text: 'Leasing & Occupancy',
            href: '/ui/lrc/',
            icon: 'rp-icon-hotel-2'
        }, {
            text: 'Payments',
            href: '/ui/coming-soon/',
            icon: 'rp-icon-card'
        }, {
            text: 'Affordable',
            href: '/ui/affordable/',
            icon: 'rp-icon-home'
        }, {
            text: 'Care',
            href: '/ui/coming-soon/',
            icon: 'rp-icon-heartbeat'
        }, {
            text: 'Budgeting',
            href: '/ui/budgeting/',
            icon: 'rp-icon-statistics-5'
        }, {
            text: 'Documents',
            href: '/ui/coming-soon/',
            icon: 'rp-icon-folder'
        }];

        primaryNavModel.setNav(navData);
    }

    angular
        .module('budgeting')
        .config(['primaryNavProvider', config]);
})(angular);
