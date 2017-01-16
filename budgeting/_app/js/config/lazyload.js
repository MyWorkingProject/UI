//  Lazy Load Config

(function(angular) {
    "use strict";

    function config(resolveModule) {
        var modules, appConfig,
            appName = "budgeting";

        modules = {
            "common.aside": ["js"],
            "common.modal": ["js"],
            "common.autocomplete": ["css", "js"],
            "common.assign-gl-acct": ["css", "js", "lang"],
            "common.calculator": ["css", "js", "lang"],
            "common.gl-accnt-search": ["css", "js", "lang"],
            //"common.file-read": ["js"],
            "common.model-details": ["css", "js"],
            "common.budget-comments": ["css", "js", "lang"],
            "common.budget-details": ["js"],
            "common.preferences": ["js"],
            "common.find-gl-account": ["css", "js", "lang"],
            "common.budget-model-grid": ["css", "js", "lang"],
            "common.add-properties": ["css", "js", "lang"],
            "common.select-unit-type": ["css", "js", "lang"],
            "common.grid-settings": ["css", "js", "lang"],

            "home.base": ["js", "lang"],
            "home.model-widget": ["css", "js", "lang"],
            "error": ["css", "js", "lang"],
            "budgetmodel.base": ["css", "js", "lang"],
            "budgetmodel.overview": ["css", "js", "lang"],
            "budgetmodel.workflow": ["css", "js", "lang"],
            "budgetmodel.reports": ["css", "js", "lang"],

            "payroll.base": ["css", "js"],
            "payroll.employee-details": ["js", "lang", "css"],
            "payroll.job-position": ["css", "js", "lang"],
            "payroll.summary": ["js", "lang", "css"],
            "payroll.payroll-by": ["css", "js", "lang"],
            "payroll.payroll-selector": ["css", "js", "lang"],
            "payroll.annualize-taxes": ["js", "css", "lang"],
            "payroll.items.employee-allocation": ["css", "js", "lang"],
            "payroll.items.job-position-allocation": ["css", "js", "lang"],
            "payroll.items.salary": ["css", "js", "lang"],
            "payroll.items.hourly": ["css", "js", "lang"],
            "payroll.items.bonus": ["css", "js", "lang"],
            "payroll.items.renewal-commission": ["css", "js", "lang"],
            "payroll.items.benefits": ["css", "js", "lang"],
            "payroll.items.payroll-custom-worksheets": ["css", "js", "lang"],
            "payroll.items.payroll-taxes-insurance": ["css", "js", "lang"],
            "payroll.items.leasing-commission": ["css", "js", "lang"],
            "payroll.items.housing-allowance": ["css", "js", "lang"],
            "payroll.items.summary": ["css", "js", "lang"],

            "payroll.reports.base": ["css", "js", "lang"],
            "payroll.reports.payroll-item-view": ["css", "js"],
            "payroll.reports.payroll-gl-view": ["css", "js"],

            "workspaces.base": ["js"],
            "workspaces.budget-workflow-status": ["js", "css", "lang"],
            "workspaces.contracts": ["js", "css", "lang"],
            "workspaces.budget-comments": ["js", "css", "lang"],
            "workspaces.budget-comments.comments-responses": ["css"],
            "workspaces.budget-tasks": ["js", "css", "lang"],
            "workspaces.contracts-csv": ["js", "css", "lang"],
            "manage-tasks.base": ["js", "css", "lang"],

            "contract.base": ["css", "js", "lang"],
            "contract.definition": ["css", "js"],
            "contract.properties": ["js", "css"],
            "contract.schedule.base": ["css", "js"],
            "contract.schedule.payment-terms": ["css", "js"],
            "contract.schedule.pricing": ["css", "js"],
            "contract.view": ["js"],
            "contract.vendor-form": ["css", "js", "lang"],

            "modelSettings.base": ["js", "css", "lang"],
            "modelSettings.rentOptions": ["js", "css", "lang"],
            "modelSettings.leaseOptions": ["js", "css", "lang"],
            "modelSettings.occupancyOptions": ["js", "css", "lang"],
            "modelSettings.otherOptions": ["js", "css", "lang"],
            "modelSettings.comments-rule": ["js", "css", "lang"],

            "ui.angularstrap": ["js", "css"],

            "rentalincome.base": ["css", "js", "lang"],
            "rentalincome.marketrent": ["css", "js", "lang"],
            "rentalincome.actual-rent-cap": ["css", "js", "lang"],
            "rentalincome.change-rent": ["css", "js", "lang"],

            "accountByAccount.base": ["js", "css"],
            "accountByAccount.view": ["js", "css", "lang"],
            "accountByAccount.view.advance-actuals": ["js", "css", "lang"],
            "accountByAccount.view.copy-comments": ["js", "css", "lang"],
            "accountByAccount.edit": ["js", "css", "lang"],
            "accountByAccount.comments.base": ["js", "css", "lang"],
            "accountByAccount.comments.general": ["js", "css", "lang"],
            "accountByAccount.comments.reviewer": ["js", "css", "lang"],
            "accountByAccount.default-adjustment": ["js", "css", "lang"],
            "accountByAccount.default-adjustment.assign-defaults": ["css"],
            "accountByAccount.acct-history": ["css", "js", "lang"],
            "accountByAccount.view-table-settings": ["css", "js", "lang"],

            "default-adjustments": ["css", "js", "lang"],
            "default-adjustments.assign-defaults": ["css"],

            "occupancyRenewals.base": ["css", "js", "lang"],
            "occupancyRenewals.occupancyTableSettings": ["css", "js", "lang"],
            "occupancyRenewals.summary": ["css", "js", "lang"],
            "occupancyRenewals.leaseRenewalsUnitTypeSummary": ["css", "js", "lang"],
            "occupancyRenewals.leaseRenewalsDetails": ["css", "js", "lang"],
            "occupancyRenewals.occupancyVacancy": ["css", "js", "lang"],
            "occupancyRenewals.occupancyVacancySummary": ["css", "js", "lang"],
            "occupancyRenewals.occupancyVacancyWorksheet": ["css", "js", "lang"],
            "occupancyRenewals.leaseRenewalsWorksheet": ["css", "js", "lang"],
            "occupancyRenewals.leaseRenewalsUnitType": ["css", "js", "lang"],
            "occupancyRenewals.occupancyVacancyServiceGroup": ["css", "js", "lang"],
            "services.base": ["js"],
            "services.manage": ["css", "js"],
            "services.service": ["css", "js", "lang"],
            "services.service-fee-worksheet": ["css", "js", "lang"],

            //Allocations
            "allocations.base": ["css", "js"],
            "allocations.manage-allocations": ["css", "js", "lang"],
            "allocations.distributed-allocations": ["css", "js", "lang"],
            "allocations.recall-dist-allocations": ["css", "js", "lang"],
            "allocations.allocation": ["css", "js", "lang"],

            //Custom-Worksheet
            //"custom-worksheets": ["css", "js", "lang"],
            //"custom-worksheet": ["js", "lang"]

            "rentalincome.lossOrGainServiceGroupSummary": ["css", "js", "lang"],
            "rentalincome.lossOrGainServiceGroupDetails": ["css", "js", "lang"],
        };

        appConfig = {
            appName: appName,
            modules: modules
        };

        resolveModule
            .setLazyLoad(appName, appConfig);
    }

    angular
        .module("budgeting")
        .config(["rpResolveModuleProvider", config]);
})(angular);