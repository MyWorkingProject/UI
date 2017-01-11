//  Hourly Grid Constants Model

(function(angular) {
    "use strict";

    function factory(
        bmGridConstant,
        osConstant) {
        var model = angular.merge({}, bmGridConstant);

        model.rowTypeConfig.referenceData = "referenceData";
        model.rowTypeConfig.refDataHeader = "refDataHeader";
        model.templateConfig.refDataHeader = "occupancy-renewals/lease-renewals/templates/reference-data-header.html";


        model.rowConfig = {
            occupancyNumberOfUnits: {
                itemDescription: osConstant.occupancyNumberOfUnits,
                rowType: model.rowTypeConfig.readonly,
                groupID: 1,
                level: 1
            },
            averageLeaseTerm: {
                itemDescription: osConstant.averageLeaseTerm,
                rowType: model.rowTypeConfig.readonly,
                groupID: 1,
                level: 2
            },
            leaseExpiringhdr: {
                itemDescription: osConstant.leaseExpiringhdr,
                rowType: model.rowTypeConfig.groupHeader,
                groupID: 2,
                level: 1
            },
            actualLeasesExpiring: {
                itemDescription: osConstant.actualLeasesExpiring,
                rowType: model.rowTypeConfig.readonly,
                groupID: 2,
                level: 1,
                total: ''
            },
            renewedLeasesExpiring: {
                itemDescription: osConstant.renewedLeasesExpiring,
                rowType: model.rowTypeConfig.readonly,
                groupID: 2,
                level: 1,
                total: ''
            },
            budgetedMoveinsExpiring: {
                itemDescription: osConstant.budgetedMoveinsExpiring,
                rowType: model.rowTypeConfig.readonly,
                groupID: 2,
                level: 1,
                total: ''
            },
            additionalLeasesExpiring: {
                itemDescription: osConstant.additionalLeasesExpiring,
                rowType: model.rowTypeConfig.readonly,
                groupID: 2,
                level: 1,
                total: ''
            },
            totalLeasesExpiring: {
                itemDescription: osConstant.totalLeasesExpiring,
                rowType: model.rowTypeConfig.readonly,
                groupID: 2,
                level: 1,
                rowClass: "total"
            },
            moveouts: {
                itemDescription: osConstant.moveouts,
                rowType: model.rowTypeConfig.groupHeader,
                groupID: 3,
                level: 1
            },
            leasesExpiredPreviousMonth: {
                itemDescription: osConstant.leasesExpiredPreviousMonth,
                rowType: model.rowTypeConfig.readonly,
                groupID: 3,
                level: 1
            },
            leaseRenewalPer: {
                itemDescription: osConstant.leaseRenewalPer,
                rowType: model.rowTypeConfig.readonly,
                groupID: 3,
                level: 1
            },
            leaseRenewals: {
                itemDescription: osConstant.leaseRenewals,
                rowType: model.rowTypeConfig.readonly,
                groupID: 3,
                level: 1,
                total: ''
            },
            leaseRenewalMTMPer: {
                itemDescription: osConstant.leaseRenewalMTMPer,
                rowType: model.rowTypeConfig.readonly,
                groupID: 3,
                level: 1

            },
            leaseRenewalMTM: {
                itemDescription: osConstant.leaseRenewalMTM,
                rowType: model.rowTypeConfig.readonly,
                groupID: 3,
                level: 1
            },
            moveoutsfromNonRenewals: {
                itemDescription: osConstant.moveoutsfromNonRenewals,
                rowType: model.rowTypeConfig.readonly,
                groupID: 3,
                level: 1,
                rowClass: "total"
            },
            turnoverPer: {
                itemDescription: osConstant.turnoverPer,
                rowType: model.rowTypeConfig.readonly,
                groupID: 4,
                level: 1,
                rowClass: "total"
            },
            retention: {
                itemDescription: osConstant.retention,
                rowType: model.rowTypeConfig.readonly,
                groupID: 5,
                level: 1,
                rowClass: "total"
            },
            //Ref Data
            referenceData: {
                itemDescription: osConstant.hdrReferenceData,
                rowType: model.rowTypeConfig.refDataHeader,
                groupID: 1,
                level: 5
            },

            refavgLeaseTerm: {
                itemDescription: osConstant.refavgLeaseTerm,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5

            },
            refleaseExpiring: {
                itemDescription: osConstant.refleaseExpiring,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5

            },
            refLeaseRenewal: {
                itemDescription: osConstant.refLeaseRenewal,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            },

            refLeaseRenewalper: {
                itemDescription: osConstant.refLeaseRenewalper,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            },
            refLeaseRenewalsMtm: {
                itemDescription: osConstant.refLeaseRenewalsMtm,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            },
            refLeaseRenewalsMtmper: {
                itemDescription: osConstant.refLeaseRenewalsMtmper,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            },
            refNonRenewingMoveouts: {
                itemDescription: osConstant.refNonRenewingMoveouts,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            }
        };

        model.getRowConfigs = function() {
            return model.rowConfig;
        };

        model.getRowTypeConfigs = function() {
            return model.rowTypeConfig;
        };

        model.getMethodConfigs = function() {
            return model.methodConfig;
        };

        model.getTemplateConfigs = function() {
            return model.templateConfig;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("lrSummaryConstantModel", [
            'bmGridConstantModel',
            'lrSummaryContentModel',
            factory
        ]);
})(angular);