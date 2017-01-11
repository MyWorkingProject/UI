//  Configure Meta Data

(function(angular) {
    "use strict";

    function config(prov) {
        var homeData,
            linksData,
            productData,
            homeLink,
            adminLink,
            manageChartAccts,
            editChartLink;

        prov.setProduct({
            name: "Budgeting"
        });

        prov.setHome({
            icon: "rp-icon-statistics-5",
            text: "Property Management"
        });

        var links = {
            'home': {},

            'budgetmodel.overview': {},

            'budgetmodel.tasks': {},

            'budgetmodel.workflow': {},

            'budgetmodel.comments': {},

            'budgetmodel.reports': {},

            'payroll.summary': {},

            'accountByAccount.view': {},

            'accountByAccount.edit': {},

            'rentalincome.marketrent': {},

            'workspaces.BudgetTasks': {},

            'workspaces.Contracts': {},

            'allocations.manageAllocations': {},

            'occupancyRenewals.occupancyVacancyWorksheet': {},

            'occupancyRenewals.leaseRenewalsUnitTypeSummary': {},
            'occupancyRenewals.occupancyVacancyServiceGroup': {},
            'occupancyRenewals.occupancyVacancy': {}
        };

        var breadcrumbs = [{
            name: 'home',
            url: '/',
            text: "Budgeting"
        }, {
            name: 'error',
            url: "/error/:errorCode",
            text: "Budgeting"
        }, {
            name: 'budgetmodel.overview',
            url: '/budgetmodel/:distID/overview',
            links: ['home'],
            text: ""
        }, {
            name: 'budgetmodel.workflow',
            url: '/budgetmodel/:distID/workflow',
            links: ['home'],
            text: ""
        }, {
            name: 'budgetmodel.tasks',
            url: '/budgetmodel/:distID/tasks',
            links: ['home'],
            text: ""
        }, {
            name: 'budgetmodel.comments',
            url: '/budgetmodel/:distID/comments',
            links: ['home'],
            text: ""
        }, {
            name: 'budgetmodel.reports',
            url: '/budgetmodel/:distID/reports',
            links: ['home'],
            text: ""
        }, {
            name: 'manageTasks',
            url: '/manage-tasks/:type',
            backLink: 'workspaces.BudgetTasks',
            links: ['workspaces.BudgetTasks', 'budgetmodel.tasks'],
            text: "Budgeting"
        }, {
            name: 'contract',
            url: "/contract/:state/:contractId",
            backLink: 'workspaces.Contracts',
            links: ['workspaces.Contracts', 'budgetmodel.Contracts'],
            text: 'Contract'
        }, {
            name: 'workspaces.BudgetWorkflowStatus',
            url: '/workspaces/budgetWorkflowStatus',
            links: ['home'],
            text: 'Workflows'
        }, {
            name: 'workspaces.Contracts',
            url: '/workspaces/contracts',
            links: ['home'],
            text: 'Contracts'
        }, {
            name: 'workspaces.BudgetComments',
            url: '/workspaces/budget-comments',
            links: ['home'],
            text: 'Comments'
        }, {
            name: 'workspaces.BudgetTasks',
            url: '/workspaces/budget-tasks',
            links: ['home'],
            text: 'Tasks'
        }, {
            name: 'modelSettings.rentOptions',
            url: '/model-settings/:distID/rent',
            links: ['home', 'budgetmodel.overview'],
            text: "Budget Settings & Assumptions"
        }, {
            name: 'modelSettings.leaseOptions',
            url: '/model-settings/:distID/lease',
            links: ['home', 'budgetmodel.overview'],
            text: "Budget Settings & Assumptions"
        }, {
            name: 'modelSettings.commentsRule',
            url: '/model-settings/:distID/comments-rule',
            links: ['home', 'budgetmodel.overview'],
            text: "Budget Settings & Assumptions"
        }, {
            name: 'modelSettings.occupancyOptions',
            url: '/model-settings/:distID/occupancy',
            links: ['home', 'budgetmodel.overview'],
            text: "Budget Settings & Assumptions"
        }, {
            name: 'modelSettings.otherOptions',
            url: '/model-settings/:distID/other',
            links: ['home', 'budgetmodel.overview'],
            text: "Budget Settings & Assumptions"
        }, {
            name: 'rentalincome.marketrent',
            url: '/rentalincome/:distID/:rent',
            backLink: 'budgetmodel.overview',
            links: ['budgetmodel.overview', 'accountByAccount.edit'],
            text: "Market Rent"
        }, {
            name: 'accountByAccount.view',
            url: '/account-by-account/:distID/view',
            links: ['home', 'budgetmodel.overview'],
            text: "Account by Account"
        }, {
            name: 'accountByAccount.edit',
            url: '/account-by-account/:distID/edit/:glAccountNumber',
            links: ['home', 'budgetmodel.overview', 'accountByAccount.view'],
            text: "GL Account Details"
        }, {
            name: 'payroll.summary',
            url: '/budgetmodel/:distID/payroll',
            backLink: 'budgetmodel.overview',
            links: ['budgetmodel.overview', 'accountByAccount.edit'],
            text: "Payroll"
        }, {
            name: 'payroll.payrollBy',
            url: '/budgetmodel/:distID/payroll/:payrollID/:payrollBy/:payrollByID',
            backLink: 'payroll.summary',
            text: "Payroll By"
        }, {
            name: 'allocations.manageAllocations',
            url: '/budgetmodel/:distID/allocations',
            links: ['home', 'budgetmodel.overview'],
            text: "Allocations"
        }, {
            name: 'allocations.allocation',
            url: '/budgetmodel/:distID/allocations/:allocationID/:type/:isSiteLevel',
            backLink: 'allocations.manageAllocations',
            links: ['allocations.manageAllocations'],
            text: "Allocations"
        }, {
            name: 'defaultAdjustments',
            url: '/default-adjustments/:distID',
            links: ['home', 'budgetmodel.overview'],
            text: "Default Adjustments"
        }, {
            name: 'occupancyRenewals.summary',
            url: '/occupancy-renewals/:distID/summary',
            backLink: 'budgetmodel.overview',
            links: ['budgetmodel.overview'],
            text: 'Occupancy & Renewals'
        }, {
            name: 'occupancyRenewals.leaseRenewalsWorksheet',
            url: '/occupancy-renewals/:distID/lease-renewals/worksheet',
            backLink: 'budgetmodel.overview',
            links: ['budgetmodel.overview'],
            text: 'Occupancy & Renewals'
        }, {
            name: 'occupancyRenewals.leaseRenewalsUnitTypeSummary',
            url: '/occupancy-renewals/:distID/lease-renewals/summary',
            backLink: 'budgetmodel.overview',
            links: ['budgetmodel.overview'],
            text: 'Occupancy & Renewals'
        }, {
            name: 'occupancyRenewals.leaseRenewalsUnitType',
            url: '/occupancy-renewals/:distID/lease-renewals/unittype',
            backLink: 'occupancyRenewals.leaseRenewalsUnitTypeSummary',
            links: ['occupancyRenewals.leaseRenewalsUnitTypeSummary'],
            text: 'Occupancy & Renewals'
        }, {
            name: 'occupancyRenewals.occupancyVacancy',
            url: '/occupancy-renewals/:distID/occupancy-vacancy/summary',
            backLink: 'budgetmodel.overview',
            links: ['budgetmodel.overview'],
            text: 'Occupancy & Renewals'
        }, {
            name: 'occupancyRenewals.occupancyVacancyWorksheet',
            url: '/occupancy-renewals/:distID/occupancy-vacancy/worksheet',
            backLink: 'budgetmodel.overview',
            links: ['budgetmodel.overview'],
            text: 'Occupancy & Renewals'
        }, {
            name: 'occupancyRenewals.occupancyVacancyServiceGroup',
            url: '/occupancy-renewals/:distID/occupancy-vacancy/service-group/:serviceGroupID/worksheet',
            backLink: 'occupancyRenewals.occupancyVacancy',
            links: ['occupancyRenewals.occupancyVacancy'],
            text: 'Occupancy & Renewals'
        }, {
            name: 'services.manage',
            url: '/budgetmodel/:distID/services',
            links: ['home', 'budgetmodel.overview'],
            text: 'Services'
        }, {
            name: 'services.service',
            url: '/budgetmodel/:distID/services/service/:servID',
            links: ['home', 'budgetmodel.overview'],
            text: 'Service'
        }, {
            name: 'services.serviceFeeWorksheet',
            url: '/budgetmodel/:distID/service-fee-worksheet/:servID',
            links: ['home', 'budgetmodel.overview'],
            text: 'Service Fee Worksheets'
        }, {
            name: 'customWorksheets.summary',
            url: '/budgetmodel/:distID/custom-worksheets',
            backLink: 'budgetmodel.overview',
            links: ['budgetmodel.overview'],
            text: 'Custom Worksheets'
        }, {
            name: 'customWorksheets.customWorksheet',
            url: '/budgetmodel/:distID/service-fee-worksheet/:servID',
            backLink: 'customWorksheets.summary',
            links: ['customWorksheets.summary', 'accountByAccount.edit'],
            text: 'Custom Worksheet'
        }];

        prov.setLinks(links).setBreadcrumbs(breadcrumbs);
    }

    angular
        .module("budgeting")
        .config(['rpBdgtBreadcrumbsModelProvider', config]);
})(angular);