(function() {
    "use strict";

    function oarScrollTabsConfigFactory(oarBudgetDetails, appLangTranslate) {
        var translate = appLangTranslate("occupancyAndRenewals").translate,
            baseURL = "#/occupancy-renewals/:distID/",
            scrollingTabsConfig = {
                SUMMARY: {
                    href: baseURL + "summary",
                    classname: "",
                    isActive: true,
                    text: translate("oar_tab_summary")
                },
                LEASE_RENTS_WORKSHEET: {
                    href: baseURL + "lease-renewals/worksheet",
                    classname: "",
                    isActive: false,
                    text: translate("oar_tab_lease")
                },
                LEASE_RENTS_UNITTYPE: {
                    href: baseURL + "lease-renewals/summary",
                    classname: "",
                    isActive: false,
                    text: translate("oar_tab_lease")
                },
                OCCUPANCY_VACANCY_SUMMARY: {
                    href: baseURL + "occupancy-vacancy/summary",
                    classname: "",
                    isActive: false,
                    text: translate("oar_tab_vacancy")
                },
                OCCUPANCY_VACANCY_WORKSHEET: {
                    href: baseURL + "occupancy-vacancy/worksheet",
                    classname: "",
                    isActive: false,
                    text: translate("oar_tab_vacancy")
                }
            };

        var config = {},
            emptyData = {
                distID: -1,
                scrollTabs: []
            };

        config.model = angular.copy(emptyData);

        config.init = function(distID, currentLocation) {
            config.model.distID = distID;

            //summary
            config.model.scrollTabs.push(
                angular.copy(scrollingTabsConfig.SUMMARY));

            //lease renewals
            if (oarBudgetDetails.isDisplayLeaseRenewals()) {
                if (oarBudgetDetails.isLeaseRenewalsWorksheet()) {
                    config.model.scrollTabs.push(
                        angular.copy(scrollingTabsConfig.LEASE_RENTS_WORKSHEET));
                } else if (oarBudgetDetails.isLeaseRenewalsUnitType()) {
                    config.model.scrollTabs.push(
                        angular.copy(scrollingTabsConfig.LEASE_RENTS_UNITTYPE));
                }
            }

            //occupancy/vacancy
            if (oarBudgetDetails.isDisplayOccupancyVacancy()) {
                if (oarBudgetDetails.isWorksheet()) {
                    config.model.scrollTabs.push(
                        angular.copy(scrollingTabsConfig.OCCUPANCY_VACANCY_WORKSHEET));
                } else if (oarBudgetDetails.isServiceGroup()) {
                    config.model.scrollTabs.push(
                        angular.copy(scrollingTabsConfig.OCCUPANCY_VACANCY_SUMMARY));
                }

            }

            config.model.scrollTabs.forEach(function(tab) {
                tab.href = tab.href.replace(":distID", config.model.distID);
                tab.isActive = (tab.href == currentLocation);
            });
        };

        config.getTabs = function() {
            return config.model.scrollTabs;
        };

        config.updateNavState = function(evt, nextUrl) {
            var url = "#" + nextUrl.split('#')[1];
            config.setState(url);
        };

        config.setState = function(url) {
            config.model.scrollTabs.forEach(function(tab) {
                tab.isActive = (tab.href == url);
            });
        };

        config.reset = function() {
            config.model = angular.copy(emptyData);
        };

        return config;
    }

    angular
        .module("budgeting")
        .factory("oarScrollTabsConfig", [
            "oarBudgetDetails",
            "appLangTranslate",
            oarScrollTabsConfigFactory
        ]);
})();