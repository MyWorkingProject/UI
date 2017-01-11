//  Hourly Grid Constants Model

(function (angular) {
    "use strict";

    function factory(
        bmGridConstant,
        osConstant
        ) {
        var model = angular.merge({}, bmGridConstant);

        model.methodConfig.navigateToOccupancyWorksheet = "navigateToOccupancyWorksheet";
        model.methodConfig.onValueChange = "onValueChange";
        model.methodConfig.onBlur = "selectRow";

        model.rowTypeConfig.bdgtdMvinNavigation = "bdgtdMvinNavigation";
        model.rowTypeConfig.refDataHeader = "refDataHeader";

        model.templateConfig.budgetedMvExpiringNavigation = "occupancy-renewals/lease-renewals-unit-type/templates/bdgtd-moveins-exp-navigation.html";
        model.templateConfig.refDataHeader = "occupancy-renewals/base/templates/reference-data-headers.html";
        model.templateConfig.occupancyEditable = "occupancy-renewals/base/templates/occupancy-renewals-editable.html";

        model.rowTypeConfig.leaseRPType = "leaseRPType";
        model.rowTypeConfig.leaseRP = "leaseRP";
        model.rowTypeConfig.leaseExpPreMonth = "leaseExpPreMonth";

        model.rowConfig = {
            totalNumberOfUnits: {
                itemDescription: osConstant.totalNumberOfUnits,
                rowType: model.rowTypeConfig.readonly,
                groupID: 1,
                level: 1
            },
            averageLeaseTerm: {
                itemDescription: osConstant.averageLeaseTerm,
                rowType: model.rowTypeConfig.editable,
                groupID: 2,
                level: 1,
                total: ''
            },
            leaseExpiring: {
                itemDescription: osConstant.leaseExpiring,
                rowType: model.rowTypeConfig.groupHeader,
                groupID: 1,
                level: 1
            },
            actualLeasesExpiring: {
                itemDescription: osConstant.actualLeasesExpiring,
                rowType: model.rowTypeConfig.readonly,
                groupID: 2,
                level: 1
            },
            renewedLeasesExpiring: {
                itemDescription: osConstant.renewedLeasesExpiring,
                rowType: model.rowTypeConfig.readonly,
                groupID: 3,
                level: 1
            },
            budgetedMoveInsExpiring: {
                itemDescription: osConstant.budgetedMoveInsExpiring,
                rowType: model.rowTypeConfig.bdgtdMvinNavigation,
                groupID: 4,
                level: 1
            },
            moveins: {
                itemDescription: osConstant.moveins,
                rowType: model.rowTypeConfig.readonly,
                groupID: 5,
                level: 1,
                rowClass: "occ-move-ins"
            },
            additionalLeasesExpiring: {
                itemDescription: osConstant.additionalLeasesExpiring,
                rowType: model.rowTypeConfig.editable,
                groupID: 6,
                level: 1,
                total: ''
            },
            totalLeaseExpiring: {
                itemDescription: osConstant.totalLeaseExpiring,
                rowType: model.rowTypeConfig.readonly,
                groupID: 7,
                level: 1,
                rowClass: "total"
            },
            moveouts: {
                itemDescription: osConstant.moveouts,
                rowType: model.rowTypeConfig.groupHeader,
                groupID: 1,
                level: 2
            },
            previousLeaseExpiring: {
                itemDescription: osConstant.previousLeaseExpiring,
                rowType: model.rowTypeConfig.leaseExpPreMonth,
                groupID: 2,
                level: 2
            },
            leaseRenewalsPercentage: {
                itemDescription: osConstant.leaseRenewalsPercentage,
                rowType: model.rowTypeConfig.leaseRPType,
                groupID: 3,
                level: 2

            },
            leaseRenewals: {
                itemDescription: osConstant.leaseRenewals,
                rowType: model.rowTypeConfig.leaseRP,
                groupID: 4,
                level: 2
            },
            leaseRenewalsMTMPercentage: {
                itemDescription: osConstant.leaseRenewalsMTMPercentage,
                rowType: model.rowTypeConfig.leaseRPType,
                groupID: 5,
                level: 2
            },
            leaseRenewalsMTM: {
                itemDescription: osConstant.leaseRenewalsMTM,
                rowType: model.rowTypeConfig.leaseRP,
                groupID: 6,
                level: 2
            },
            moveoutsNonRenewal: {
                itemDescription: osConstant.moveoutsNonRenewal,
                rowType: model.rowTypeConfig.readonly,
                groupID: 7,
                level: 2,
                rowClass: "total"
            },

            turnOverPercent: {
                itemDescription: osConstant.turnOverPercent,
                rowType: model.rowTypeConfig.readonly,
                groupID: 8,
                level: 2,
                rowClass: "total"
            },
            retentionPercent: {
                itemDescription: osConstant.retentionPercent,
                rowType: model.rowTypeConfig.readonly,
                groupID: 9,
                level: 2,
                rowClass: "total"
            },
            //Ref Data
            referenceData: {
                itemDescription: osConstant.hdrReferenceData,
                rowType: model.rowTypeConfig.refDataHeader,
                groupID: 1,
                level: 5,
                yearType: "",
                helpDesc: "",
                rowClass: "ref-header-row"
            },
            refAverageLeaseTerm: {
                itemDescription: osConstant.refAverageLeaseTerm,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            },
            refActualLeasesExpiring: {
                itemDescription: osConstant.refActualLeasesExpiring,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            },
            refLeaseRenewals: {
                itemDescription: osConstant.refLeaseRenewals,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            },
            refLeaseRenewalsPercentage: {
                itemDescription: osConstant.refLeaseRenewalsPercentage,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            },
            refLeaseRenewalsMTM: {
                itemDescription: osConstant.refLeaseRenewalsMTM,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            },
            refLeaseRenewalsMTMPercentage: {
                itemDescription: osConstant.refLeaseRenewalsMTMPercentage,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            },
            refMoveoutsNonRenewal: {
                itemDescription: osConstant.refMoveoutsNonRenewal,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            },

            //revForecastOccupancy

            revForecast: {
                itemDescription: osConstant.hdrRevForecast,
                rowType: model.rowTypeConfig.groupHeader,
                groupID: 101,
                level: 6
            },
            revForecastOccupancy: {
                itemDescription: osConstant.revForecastOccupancy,
                rowType: model.rowTypeConfig.readonly,
                groupID: 101,
                level: 6

            },
        };

        model.getRowConfigs = function () {
            return model.rowConfig;
        };

        model.getRowTypeConfigs = function () {
            return model.rowTypeConfig;
        };

        model.getMethodConfigs = function () {
            return model.methodConfig;
        };

        model.getTemplateConfigs = function () {
            return model.templateConfig;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("renewalsUnitTypeConstantModel", [
            'bmGridConstantModel',
            'renewalsUnitTypeContentModel',
             factory]);
})(angular);
