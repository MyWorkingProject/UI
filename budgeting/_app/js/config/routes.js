//  Configure Routes

(function(angular) {
    "use strict";

    function config(RoutesProvider) {
        var routes = {};

        routes["home"] = {
            url: "/",
            resolve: ["session", "layout"],
            lazyLoad: [{
                serie: true,

                rerun: true,

                files: [
                    "lib.realpage.daterangepicker",
                    "lib.realpage.workspaces",
                    "budgeting.home.base",
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    //"budgeting.home.tasks",
                    "budgeting.common.preferences",
                    "budgeting.home.model-widget",
                    "lib.jquery.fullcalendar",
                    "lib.angular.ui-calendar"
                ]
            }]
        };

        routes["error"] = {
            resolve: ["session"],
            url: "/error/:errorCode",
            controller: "ErrorCtrl as page",
            params: {
                errorCode: '404',
                templateUrl: undefined,
                model: undefined
            },
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "budgeting.error"
                ]
            }]
        };

        routes['budgetmodel'] = {
            abstract: true,
            url: '/budgetmodel/:distID',
            controller: "BdgtModelCtrl as page",
            resolve: ["session", "layout", "currentBudgetDetails"],
            lazyLoad: [{
                serie: true,

                files: [
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "budgeting.common.model-details",
                    //"budgeting.common.budget-details",
                    "budgeting.budgetmodel.base",
                    "lib.realpage.scrolling-tabs-menu"
                ]
            }]
        };

        routes['budgetmodel.overview'] = {
            url: '/overview',
            controller: 'BdgtOverviewCtrl as page',
            lazyLoad: [{
                files: [
                    "budgeting.budgetmodel.overview"
                ]
            }]
        };

        routes['budgetmodel.workflow'] = {
            url: '/workflow',
            //controller: 'BdgtWorkflowCtrl as page',
            lazyLoad: [{
                serie: true,

                files: [
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "lib.jquery.select2",
                    "budgeting.budgetmodel.base",
                    "budgeting.budgetmodel.workflow"
                ]
            }]
        };

        routes['budgetmodel.tasks'] = {
            url: '/tasks',
            controller: 'BudgetTasksCtrl as page',
            lazyLoad: [{
                serie: true,

                files: [
                    "lib.angular.motion",
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "lib.bootstrap.additions",
                    "lib.angular.strap",
                    "budgeting.common.aside",
                    "budgeting.common.budget-comments",
                    "budgeting.workspaces.budget-tasks",
                    "budgeting.budgetmodel.base"
                ]
            }]
        };

        routes['budgetmodel.comments'] = {
            url: '/comments',
            controller: 'BudgetCommentsCtrl as page',
            lazyLoad: [{
                serie: true,

                files: [
                    "lib.angular.motion",
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "lib.bootstrap.additions",
                    "lib.angular.strap",
                    "lib.angular.ui-select",
                    "budgeting.workspaces.budget-comments",
                    "budgeting.budgetmodel.base",
                    "budgeting.workspaces.budget-comments.comments-responses"
                ]
            }]
        };

        routes['budgetmodel.reports'] = {
            url: '/reports',
            controller: 'BdgtReportsCtrl as page',
            lazyLoad: [{
                serie: true,

                files: [
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "budgeting.budgetmodel.base",
                    "budgeting.budgetmodel.reports"
                ]
            }]
        };

        routes['manageTasks'] = {
            url: '/manage-tasks/:type',
            resolve: ["session", "layout"],
            controller: "ManageTasksCtrl as page",
            lazyLoad: [{
                rerun: true,
                serie: true,
                files: [
                    "lib.angular.motion",
                    "lib.bootstrap.additions",
                    "lib.angular.strap",
                    "lib.angular.bootstrap",
                    "lib.angular.ui-select",
                    "lib.angular.eonasdan-datetimepicker",
                    "lib.realpage.datetimepicker-v1",
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "budgeting.manage-tasks.base",
                    "lib.bootstrap.datetimepicker"
                ]
            }]
        };

        routes["contract"] = {
            url: "/contract/:state/:contractId",
            controller: "ContractDefineCtrl as page",
            resolve: ["session", "layout"],
            lazyLoad: [{
                serie: true,
                files: [
                    //for aside modals
                    "lib.angular.motion",
                    "lib.bootstrap.additions",
                    "lib.angular.strap",

                    //for typeahead
                    "lib.angular.ui-select",

                    //for notifications
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",

                    "lib.realpage.scrolling-tabs-menu",

                    "budgeting.common.aside",

                    "budgeting.contract.base",
                    "budgeting.contract.schedule.base",
                    "budgeting.contract.schedule.payment-terms",
                    "budgeting.contract.schedule.pricing",
                    "budgeting.contract.vendor-form"
                ]
            }, { //schedule
                rerun: true,
                serie: true,
                files: [
                    //for datepicker
                    "lib.angular.eonasdan-datetimepicker",
                    "lib.realpage.datetimepicker-v1",

                    "budgeting.common.calculator",
                ]
            }, { //properties
                rerun: true,
                serie: true,
                files: [
                    "budgeting.common.assign-gl-acct",
                    "budgeting.common.add-properties",
                    "budgeting.common.gl-accnt-search",

                    "budgeting.contract.properties"
                ]
            }]
        };

        routes['workspaces'] = {
            url: '/workspaces',
            abstract: true,
            rerun: true,
            resolve: ["session", "layout"],
            controller: "WorkspaceDetailsCtrl as page",
            lazyLoad: [{
                serie: true,

                rerun: true,

                files: [
                    //"lib.angular.ui-select",
                    "lib.realpage.daterangepicker",
                    "budgeting.workspaces.base",
                    "lib.realpage.scrolling-tabs-menu"
                ]
            }]
        };

        routes['workspaces.BudgetWorkflowStatus'] = {
            url: '/budgetWorkflowStatus',
            controller: "BudgetWorkflowStatusCtrl as page",
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "lib.jquery.select2",
                    /* "lib.angular.strap",
                     "lib.angular.ui-select",
                     "budgeting.common.gl-accnt-search",*/
                    "budgeting.budgetmodel.base",
                    "budgeting.budgetmodel.workflow",
                    "budgeting.workspaces.budget-workflow-status"
                ]
            }]
        };

        routes['workspaces.Contracts'] = {
            url: '/contracts',
            controller: "ContractsCtrl as page",
            lazyLoad: [{
                files: [
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "lib.angular.bootstrap",
                    //"budgeting.common.file-read",
                    "budgeting.workspaces.contracts",
                    "budgeting.workspaces.contracts-csv"
                ]
            }]
        };

        routes['workspaces.BudgetComments'] = {
            url: '/budget-comments',
            controller: "BudgetCommentsCtrl as page",
            lazyLoad: [{
                rerun: true,
                files: [
                    "lib.angular.motion",
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "lib.bootstrap.additions",
                    "lib.angular.strap",
                    "lib.angular.bootstrap",
                    "lib.angular.ui-select",
                    "budgeting.workspaces.budget-comments",
                    "budgeting.workspaces.budget-comments.comments-responses"
                ]
            }]
        };

        routes['workspaces.BudgetTasks'] = {
            url: '/budget-tasks',
            controller: "BudgetTasksCtrl as page",
            lazyLoad: [{
                rerun: true,
                serie: true,

                files: [
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "lib.angular.motion",
                    "lib.bootstrap.additions",
                    "lib.angular.strap",
                    "budgeting.common.aside",
                    "budgeting.common.budget-comments",
                    "budgeting.workspaces.budget-tasks"
                ]
            }]
        };

        routes["modelSettings"] = {
            abstract: true,
            url: "/model-settings/:distID",
            controller: "ModelSettingsCtrl as page",
            resolve: ["session", "layout", "currentBudgetDetails"],
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "lib.angular.bootstrap",
                    "lib.angular.ui-select",
                    "lib.angular.xeditable",
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "budgeting.common.model-details",
                    "budgeting.modelSettings.base",
                    //"budgeting.common.budget-details",
                    "budgeting.budgetmodel.base",
                    "lib.realpage.scrolling-tabs-menu"
                ]
            }]
        };

        routes["modelSettings.rentOptions"] = {
            url: "/rent",
            //resolve:["lib.angular.ui-select"],
            controller: "RentOptionsCtrl as page",
            lazyLoad: [{
                rerun: true,
                serie: true,
                files: [
                    //  "lib.angular.bootstrap",
                    //   "lib.angular.ui-select",
                    "budgeting.common.gl-accnt-search",
                    "budgeting.modelSettings.base",
                    "budgeting.modelSettings.rentOptions"
                ]
            }]
        };

        routes["modelSettings.leaseOptions"] = {
            url: "/lease",
            controller: "LeaseOptionsCtrl as page",
            lazyLoad: [{
                files: [
                    "budgeting.modelSettings.leaseOptions"
                ]
            }]
        };

        routes["modelSettings.commentsRule"] = {
            url: "/comments-rule",
            controller: "CommentsRuleCtrl as page",
            lazyLoad: [{
                files: [
                    "budgeting.modelSettings.comments-rule"
                ]
            }]
        };

        routes["modelSettings.occupancyOptions"] = {
            url: "/occupancy",
            controller: "OccupancyOptionsCtrl as page",
            lazyLoad: [{
                rerun: true,
                serie: true,
                files: [
                    "lib.angular.ui-select",
                    "lib.realpage.form-common"
                ]
            }, {
                files: [
                    "lib.angular.bootstrap", //for tooltip popover

                    "budgeting.common.gl-accnt-search",
                    "budgeting.modelSettings.occupancyOptions"
                ]
            }]
        };

        routes["modelSettings.otherOptions"] = {
            url: "/other",
            controller: "OtherOptionsCtrl as page",
            lazyLoad: [{
                rerun: true,

                serie: true,
                files: [
                    "lib.angular.eonasdan-datetimepicker",
                    "lib.realpage.datetimepicker-v1",
                    "budgeting.modelSettings.otherOptions"
                ]
            }]
        };

        routes['rentalincome'] = {
            abstract: true,
            url: '/rentalincome/:distID',
            controller: "BdgtRentalIncomeCtrl as page",
            resolve: ["session", "currentBudgetDetails", "authUserDriverAccess"],
            params: {
                driverCode: "MR"
            },
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "lib.angular.motion",
                    "lib.bootstrap.additions",
                    "lib.angular.strap",
                    "budgeting.common.preferences",
                    "budgeting.common.aside",
                    //"lib.angular.bootstrap",  
                    "budgeting.rentalincome.base",
                    //"budgeting.common.budget-details",
                    "budgeting.common.model-details",
                    "budgeting.common.grid-settings",
                    "lib.realpage.scrolling-tabs-menu",
                    "budgeting.rentalincome.marketrent",
                    "lib.realpage.complex-grid",
                    "budgeting.common.budget-model-grid",
                    "budgeting.common.budget-comments",
                ]
            }]
        };

        routes['rentalincome.marketrent'] = {
            url: '/:rent',
            controller: 'MarketRentCtrl as page',
            lazyLoad: [{
                rerun: true,
                serie: true,

                files: [
                    "lib.realpage.float-scroll",
                    "lib.realpage.form-common",
                    "budgeting.common.modal",
                    "budgeting.common.preferences",
                    "lib.realpage.form-select-menu-v1",
                    "lib.realpage.form-input-text-v1",
                    "lib.realpage.complex-grid",
                    "budgeting.common.budget-comments",
                    "budgeting.rentalincome.marketrent",
                    "budgeting.rentalincome.actual-rent-cap",
                    "budgeting.rentalincome.change-rent",
                    //"budgeting.common.model-details",
                    //"budgeting.common.budget-comments"
                ]
            }]
        };
        routes['rentalincome.lossOrGainServiceGroupSummary'] = {
            url: '/LossOrGain/ServiceSummary',
            controller: 'summaryCtrl as page',
            lazyLoad: [{
                files: [
                    "budgeting.rentalincome.lossOrGainServiceGroupSummary",
                    "budgeting.rentalincome.lossOrGainServiceGroupDetails"
                ]
            }]
        };
        routes["accountByAccount"] = {
            abstract: true,
            resolve: ["session", "currentBudgetDetails", "authUserDriverAccess"],
            params: {
                driverCode: "OTHER"
            },
            url: "/account-by-account/:distID",
            controller: "AccountByAccountBaseCtrl as page",
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "lib.angular.ui-select",
                    "lib.realpage.complex-grid",
                    "lib.angular.motion",
                    "lib.bootstrap.additions",
                    "lib.angular.strap",
                    "lib.angular.ui-select",
                    "budgeting.common.aside",
                    "budgeting.common.modal",
                    "budgeting.common.model-details",
                    //"budgeting.common.budget-details",
                    "budgeting.common.preferences",
                    "budgeting.accountByAccount.comments.base",
                    "budgeting.accountByAccount.comments.general",
                    "budgeting.accountByAccount.comments.reviewer",
                    "budgeting.common.grid-settings",
                    "budgeting.accountByAccount.base"
                ]
            }]
        };

        routes["accountByAccount.view"] = {
            url: "/view",
            controller: "AccountByAccountCtrl as page",
            lazyLoad: [{
                rerun: true,
                files: [
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "lib.angular.motion",
                    "lib.bootstrap.additions",
                    "lib.angular.strap",
                    "lib.angular.ui-select",
                    "budgeting.common.gl-accnt-search",
                    "budgeting.accountByAccount.base",
                    "budgeting.accountByAccount.view",
                    "budgeting.accountByAccount.view.advance-actuals",
                    "budgeting.accountByAccount.view.copy-comments",
                    "budgeting.accountByAccount.view-table-settings"
                ]
            }]
        };

        routes["accountByAccount.edit"] = {
            url: "/edit/:glAccountNumber",
            controller: "EditAccountByAccountCtrl as page",
            lazyLoad: [{
                rerun: true,
                serie: true,
                files: [
                    "lib.realpage.form-common",
                    "budgeting.accountByAccount.acct-history",
                    "budgeting.accountByAccount.default-adjustment",
                    "budgeting.common.calculator",
                    "budgeting.common.modal",
                    "budgeting.common.budget-model-grid",
                    "budgeting.common.gl-accnt-search",
                    "budgeting.common.find-gl-account",
                    "budgeting.accountByAccount.edit"
                ]
            }]
        };

        routes['payroll'] = {
            abstract: true,
            url: '/budgetmodel/:distID/payroll',
            params: {
                driverCode: "HR"
            },
            controller: 'PayrollCtrl',
            resolve: ["session", "currentBudgetDetails", "authUserDriverAccess"],
            lazyLoad: [{
                serie: false,
                rerun: false,
                files: [
                    "budgeting.payroll.base"
                ]
            }, {
                serie: true,
                rerun: true,
                files: [
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "lib.angular.motion",
                    "lib.bootstrap.additions",
                    "lib.angular.strap",
                    "lib.angular.ui-select",
                    "lib.angular.strap",
                    "budgeting.common.aside",
                    "budgeting.common.modal",
                    "budgeting.common.model-details",
                    "budgeting.common.add-properties",
                    "budgeting.common.budget-model-grid",
                    "budgeting.common.budget-comments",
                    "budgeting.payroll.employee-details",
                    "budgeting.payroll.job-position"
                ]
            }]
        };

        routes['payroll.summary'] = {
            controller: 'PayrollSummaryCtrl as page',
            url: '',
            lazyLoad: [{
                serie: false,
                files: [
                    "budgeting.payroll.summary"
                ]
            }, {
                serie: false,
                files: [
                    "budgeting.payroll.annualize-taxes",
                    "budgeting.payroll.reports.base",
                    "budgeting.payroll.reports.payroll-item-view",
                    "budgeting.payroll.reports.payroll-gl-view"
                ]
            }]
        };

        routes['payroll.payrollBy'] = {
            url: '/:payrollID/:payrollBy/:payrollByID',
            controller: 'PayrollByCtrl as page',
            params: {
                isEdit: false
            },
            lazyLoad: [{
                serie: false,
                rerun: false,
                files: [
                    "budgeting.payroll.items.hourly",
                    "budgeting.payroll.items.housing-allowance",
                    "budgeting.payroll.items.leasing-commission",
                    "budgeting.payroll.items.renewal-commission",
                    "budgeting.payroll.items.salary",
                    "budgeting.payroll.items.summary",
                    "budgeting.payroll.items.employee-allocation",
                    "budgeting.payroll.items.job-position-allocation"
                ]
            }, {
                serie: true,
                rerun: true,
                files: [
                    "budgeting.payroll.items.bonus",
                    "budgeting.payroll.items.benefits",
                    "budgeting.payroll.items.payroll-custom-worksheets",
                    "budgeting.payroll.items.payroll-taxes-insurance",
                    "budgeting.payroll.payroll-by"
                ]
            }, {
                serie: false,
                rerun: false,
                files: [
                    "budgeting.common.calculator",
                    "budgeting.payroll.payroll-selector"
                ]
            }]
        };

        routes['allocations'] = {
            url: '/budgetmodel/:distID/allocations',
            controller: 'BdgtAllocationsCtrl',
            abstract: true,
            resolve: ["session", "currentBudgetDetails"],
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "lib.angular.motion",
                    "lib.bootstrap.additions",
                    "lib.angular.strap",
                    "lib.angular.ui-select",
                    "lib.angular.strap",
                    "lib.realpage.grid",
                    "lib.realpage.complex-grid",
                    "lib.bootstrap.datetimepicker",
                    "lib.realpage.datetimepicker-v1",
                    "lib.realpage.form-input-text-v1",
                    "lib.realpage.form-select-menu-v1",
                    "lib.realpage.scrolling-tabs-menu",
                    "budgeting.common.aside",
                    "budgeting.common.modal",
                    "budgeting.common.model-details",
                    "budgeting.common.add-properties",
                    "budgeting.common.budget-model-grid",
                    "budgeting.common.budget-comments",
                    "budgeting.allocations.base"
                ]
            }]
        };

        routes['allocations.manageAllocations'] = {
            controller: 'BdgtManageAllocationsCtrl as page',
            url: '',
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "budgeting.allocations.manage-allocations",
                    "budgeting.allocations.recall-dist-allocations",
                    "budgeting.allocations.distributed-allocations"
                ]
            }]
        };

        routes['allocations.allocation'] = {
            url: '/:allocationID/:type/:isSiteLevel',
            controller: 'BdtallocationCtrl as page',
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "lib.angular.bootstrap",
                    "lib.realpage.grid",
                    "budgeting.common.aside",
                    "budgeting.allocations.allocation",
                    "budgeting.common.calculator",
                    "budgeting.allocations.recall-dist-allocations",
                    "budgeting.allocations.distributed-allocations",
                    "budgeting.allocations.manage-allocations",
                    "budgeting.common.find-gl-account",
                    "budgeting.common.gl-accnt-search",
                    "budgeting.common.assign-gl-acct",
                    "budgeting.common.add-properties",
                ]
            }]

        };

        routes['defaultAdjustments'] = {
            url: '/default-adjustments/:distID',
            controller: "DefaultAdjustmentsCtrl as page",
            resolve: ["session", "currentBudgetDetails"],
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "lib.realpage.form-input-text-v1",
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "budgeting.common.preferences",
                    "budgeting.common.model-details",
                    "budgeting.default-adjustments",
                    "budgeting.default-adjustments.assign-defaults"

                ]
            }]
        };

        routes["occupancyRenewals"] = {
            url: '/occupancy-renewals/:distID',
            controller: 'OccupancyAndRenewalsCtrl as page',
            abstract: true,
            resolve: ["session", "currentBudgetDetails", "authUserDriverAccess"],
            params: {
                driverCode: "OCCVAC"
            },
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [

                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",

                    "lib.angular.bootstrap",
                    "lib.angular.strap",
                    "lib.angular.motion",

                    "lib.bootstrap.additions",
                    "lib.angular.motion",
                    "budgeting.common.modal",
                    "budgeting.common.aside",

                    "lib.realpage.float-scroll",
                    "lib.realpage.complex-grid",
                    "lib.realpage.scrolling-tabs-menu",

                    "budgeting.common.model-details",
                    "budgeting.common.budget-model-grid",
                    "budgeting.common.budget-comments",
                    "budgeting.common.calculator",
                    "budgeting.common.preferences",
                    "budgeting.common.grid-settings",

                    "budgeting.occupancyRenewals.base"
                ]
            }]
        };

        routes['occupancyRenewals.summary'] = {
            url: "/summary",
            controller: 'OARSummaryCtrl as page',
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    //chart requirements
                    "lib.jquery.flot",
                    "lib.jquery.sparkline",
                    "lib.jquery.highcharts",
                    "lib.jquery.easy-pie-chart",
                    "lib.realpage.chart",
                    "budgeting.occupancyRenewals.summary"
                ]
            }]
        };

        routes['occupancyRenewals.leaseRenewalsWorksheet'] = {
            url: "/lease-renewals/worksheet",
            controller: 'RenewalsWorksheetCtrl as page',
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "budgeting.common.calculator",
                    "budgeting.common.budget-comments",
                    "budgeting.occupancyRenewals.occupancyTableSettings",
                    "budgeting.occupancyRenewals.leaseRenewalsWorksheet"
                ]
            }]
        };

        routes['occupancyRenewals.leaseRenewalsUnitTypeSummary'] = {
            url: "/lease-renewals/summary",
            controller: 'LrSummaryCtrl as page',
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "budgeting.occupancyRenewals.leaseRenewalsDetails",
                    "budgeting.occupancyRenewals.occupancyTableSettings",
                    "budgeting.occupancyRenewals.leaseRenewalsUnitTypeSummary"
                ]
            }]
        };

        routes['occupancyRenewals.leaseRenewalsUnitType'] = {
            url: "/lease-renewals/unittype",
            controller: 'RenewalsUnitTypeCtrl as page',
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "budgeting.common.calculator",
                    "budgeting.common.budget-comments",
                    "budgeting.occupancyRenewals.occupancyTableSettings",
                    "budgeting.occupancyRenewals.leaseRenewalsUnitType"
                ]
            }]
        };

        routes['occupancyRenewals.occupancyVacancy'] = {
            url: "/occupancy-vacancy/summary",
            controller: 'ServiceGroupCtrl as page',
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "budgeting.occupancyRenewals.occupancyVacancy",
                    "budgeting.occupancyRenewals.occupancyTableSettings",
                    "budgeting.occupancyRenewals.occupancyVacancySummary"

                ]
            }]
        };

        routes['occupancyRenewals.occupancyVacancyWorksheet'] = {
            url: "/occupancy-vacancy/worksheet",
            controller: 'WorksheetCtrl as page',
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "budgeting.occupancyRenewals.occupancyVacancyWorksheet",
                    "budgeting.occupancyRenewals.occupancyTableSettings",


                ]
            }]
        };

        routes['occupancyRenewals.occupancyVacancyServiceGroup'] = {
            url: "/occupancy-vacancy/service-group/:serviceGroupID/worksheet",
            controller: 'SgWorksheetCtrl as page',
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "budgeting.occupancyRenewals.occupancyVacancyServiceGroup",
                    "budgeting.occupancyRenewals.occupancyTableSettings",


                ]
            }]
        };

        routes['services'] = {
            abstract: true,
            url: '/budgetmodel/:distID/services',
            controller: 'ServicesCtrl as page',
            resolve: ["session", "currentBudgetDetails", "authUserDriverAccess"],
            params: {
                driverCode: "SERV"
            },
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "budgeting.services.base"
                ]
            }]
        };

        routes['services.manage'] = {
            controller: 'ManageServicesCtrl as page',
            url: '',
            lazyLoad: [{
                serie: true,
                files: [
                    "budgeting.services.manage"
                ]
            }]
        };

        routes['services.service'] = {
            controller: 'ServiceCtrl as page',
            url: '/service/:servID',
            params: {
                isEdit: false
            },
            lazyLoad: [{
                serie: true,
                files: [
                    "lib.angular.motion",
                    "lib.bootstrap.additions",
                    "lib.angular.strap",
                    "budgeting.common.aside",
                    "budgeting.common.find-gl-account",
                    "budgeting.services.service"
                ]
            }]
        };

        routes['services.serviceFeeWorksheet'] = {
            controller: 'ServiceFeeWorksheetCtrl as page',
            url: '/service-fee-worksheet/:servID',
            params: {
                isEdit: false
            },
            lazyLoad: [{
                serie: true,
                rerun: true,
                files: [
                    "lib.jquery.pnotify",
                    "lib.angular.pnotify",
                    "lib.angular.strap",
                    "lib.angular.motion",
                    "lib.bootstrap.additions",
                    "budgeting.common.aside",
                    "budgeting.common.calculator",
                    "budgeting.common.budget-comments",
                    "budgeting.common.model-details",
                    "budgeting.common.find-gl-account",
                    "budgeting.common.select-unit-type",
                    "budgeting.common.budget-model-grid",
                    "budgeting.services.service-fee-worksheet"
                ]
            }]
        };

        routes['customWorksheets'] = {
            abstract: true,
            url: '/budgetmodel/:distID/custom-worksheets',
            params: {
                driverCode: "OTHER"
            },
            resolve: ["session", "currentBudgetDetails", "authUserDriverAccess"],
            lazyLoad: [{
                rerun: true,
                files: [
                    "budgeting.common.model-details",
                    "budgeting.common.budget-model-grid"
                ]
            }]
        };


        routes['customWorksheets.summary'] = {
            url: '',
            controller: 'CustomWorksheetsCtrl as page',
            lazyLoad: [{
                rerun: true,
                files: [
                    "budgeting.custom-worksheets.summary"
                ]
            }]
        };

        // routes['customWorksheets.customWorksheet'] = {
        //     url: '/:customWorksheetID',
        //     controller: 'customWorksheetCtrl as page',
        //     lazyLoad: [{
        //         files: [
        //             "budgeting.custom-worksheet"
        //         ]
        //     }]
        // };

        RoutesProvider.setRoutes(routes).setDefault("/");
    }

    angular
        .module("budgeting")
        .config(["rpRoutesProvider", config]);
})(angular);