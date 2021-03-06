﻿//  Budgeting Overview List Model

(function(angular) {
    "use strict";

    function worksheetMock() {



        var model = {};
        model.worksheetDetails = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 1,
            "records": {
                "occupancyWorksheet": [{
                        "distributedID": 0,
                        "startDate": 34,
                        "periodNo": 1,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "occupancyGoal": 40.000,
                        "moveins": 10.000,
                        "moveoutsNonRenewal": 1,
                        "moveoutsSkipEviction": 2,
                        // //"totalMoveouts": 1648.0000,
                        "netOccupancyChange": 3.000,
                        "endingOccupiedUnits": 12.000,
                        "occupancy": 185.0000,
                        "occupancyTurnOverPercent": 120.000,
                        "previousTurnOverPercent": 120.000,
                        "modelUnits": 1,
                        "adminUnits": 2,
                        "employeeUnits": 3,
                        "downUnits": 4,
                        // "totalNonRevenueUnits":0,
                        "vacantUnits": 120.000,
                        "vacancy": 120.000
                    },
                    {
                        "distributedID": 0,
                        "startDate": 34,
                        "periodNo": 2,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "occupancyGoal": 40.000,
                        "moveins": 10.000,
                        "moveoutsNonRenewal": 1,
                        "moveoutsSkipEviction": 2,
                        // //"totalMoveouts": 1648.0000,
                        "netOccupancyChange": 3.000,
                        "endingOccupiedUnits": 12.000,
                        "occupancy": 185.0000,
                        "occupancyTurnOverPercent": 120.000,
                        "previousTurnOverPercent": 120.000,
                        "modelUnits": 1,
                        "adminUnits": 2,
                        "employeeUnits": 3,
                        "downUnits": 4,
                        // "totalNonRevenueUnits": 0,
                        "vacantUnits": 120.000,
                        "vacancy": 120.000
                    },
                    {
                        "distributedID": 0,
                        "startDate": 34,
                        "periodNo": 3,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "occupancyGoal": 40.000,
                        "moveins": 10.000,
                        "moveoutsNonRenewal": 1,
                        "moveoutsSkipEviction": 2,
                        //  //"totalMoveouts": 1648.0000,
                        "netOccupancyChange": 3.000,
                        "endingOccupiedUnits": 12.000,
                        "occupancy": 185.0000,
                        "occupancyTurnOverPercent": 120.000,
                        "previousTurnOverPercent": 120.000,
                        "modelUnits": 1,
                        "adminUnits": 2,
                        "employeeUnits": 3,
                        "downUnits": 4,
                        // "totalNonRevenueUnits": 0,
                        "vacantUnits": 120.000,
                        "vacancy": 120.000
                    },
                    {
                        "distributedID": 0,
                        "startDate": 34,
                        "periodNo": 4,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "occupancyGoal": 40.000,
                        "moveins": 10.000,
                        "moveoutsNonRenewal": 1,
                        "moveoutsSkipEviction": 2,
                        // //"totalMoveouts": 1648.0000,
                        "netOccupancyChange": 3.000,
                        "endingOccupiedUnits": 12.000,
                        "occupancy": 185.0000,
                        "occupancyTurnOverPercent": 120.000,
                        "previousTurnOverPercent": 120.000,
                        "modelUnits": 1,
                        "adminUnits": 2,
                        "employeeUnits": 3,
                        "downUnits": 4,
                        // "totalNonRevenueUnits": 0,
                        "vacantUnits": 120.000,
                        "vacancy": 120.000
                    },
                    {
                        "distributedID": 0,
                        "startDate": 34,
                        "periodNo": 5,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "occupancyGoal": 40.000,
                        "moveins": 10.000,
                        "moveoutsNonRenewal": 1,
                        "moveoutsSkipEviction": 2,
                        //"totalMoveouts": 1648.0000,
                        "netOccupancyChange": 3.000,
                        "endingOccupiedUnits": 12.000,
                        "occupancy": 185.0000,
                        "occupancyTurnOverPercent": 120.000,
                        "previousTurnOverPercent": 120.000,
                        "modelUnits": 1,
                        "adminUnits": 2,
                        "employeeUnits": 3,
                        "downUnits": 4,
                        // "totalNonRevenueUnits": 0,
                        "vacantUnits": 120.000,
                        "vacancy": 120.000
                    },
                    {
                        "distributedID": 0,
                        "startDate": 34,
                        "periodNo": 6,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "occupancyGoal": 40.000,
                        "moveins": 10.000,
                        "moveoutsNonRenewal": 1,
                        "moveoutsSkipEviction": 2,
                        //"totalMoveouts": 1648.0000,
                        "netOccupancyChange": 3.000,
                        "endingOccupiedUnits": 12.000,
                        "occupancy": 185.0000,
                        "occupancyTurnOverPercent": 120.000,
                        "previousTurnOverPercent": 120.000,
                        "modelUnits": 1,
                        "adminUnits": 2,
                        "employeeUnits": 3,
                        "downUnits": 4,
                        // "totalNonRevenueUnits": 0,
                        "vacantUnits": 120.000,
                        "vacancy": 120.000
                    },
                    {
                        "distributedID": 0,
                        "startDate": 34,
                        "periodNo": 7,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "occupancyGoal": 40.000,
                        "moveins": 10.000,
                        "moveoutsNonRenewal": 1,
                        "moveoutsSkipEviction": 2,
                        //"totalMoveouts": 1648.0000,
                        "netOccupancyChange": 3.000,
                        "endingOccupiedUnits": 12.000,
                        "occupancy": 185.0000,
                        "occupancyTurnOverPercent": 120.000,
                        "previousTurnOverPercent": 120.000,
                        "modelUnits": 1,
                        "adminUnits": 2,
                        "employeeUnits": 3,
                        "downUnits": 4,
                        // "totalNonRevenueUnits": 0,
                        "vacantUnits": 120.000,
                        "vacancy": 120.000
                    },
                    {
                        "distributedID": 0,
                        "startDate": 34,
                        "periodNo": 8,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "occupancyGoal": 40.000,
                        "moveins": 10.000,
                        "moveoutsNonRenewal": 1,
                        "moveoutsSkipEviction": 2,
                        //"totalMoveouts": 1648.0000,
                        "netOccupancyChange": 3.000,
                        "endingOccupiedUnits": 12.000,
                        "occupancy": 185.0000,
                        "occupancyTurnOverPercent": 120.000,
                        "previousTurnOverPercent": 120.000,
                        "modelUnits": 1,
                        "adminUnits": 2,
                        "employeeUnits": 3,
                        "downUnits": 4,
                        // "totalNonRevenueUnits": 0,
                        "vacantUnits": 120.000,
                        "vacancy": 120.000
                    },
                    {
                        "distributedID": 0,
                        "startDate": 34,
                        "periodNo": 9,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "occupancyGoal": 40.000,
                        "moveins": 10.000,
                        "moveoutsNonRenewal": 1,
                        "moveoutsSkipEviction": 2,
                        //"totalMoveouts": 1648.0000,
                        "netOccupancyChange": 3.000,
                        "endingOccupiedUnits": 12.000,
                        "occupancy": 185.0000,
                        "occupancyTurnOverPercent": 120.000,
                        "previousTurnOverPercent": 120.000,
                        "modelUnits": 1,
                        "adminUnits": 2,
                        "employeeUnits": 3,
                        "downUnits": 4,
                        // "totalNonRevenueUnits": 0,
                        "vacantUnits": 120.000,
                        "vacancy": 120.000
                    },
                    {
                        "distributedID": 0,
                        "startDate": 34,
                        "periodNo": 10,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "occupancyGoal": 40.000,
                        "moveins": 10.000,
                        "moveoutsNonRenewal": 1,
                        "moveoutsSkipEviction": 2,
                        //"totalMoveouts": 1648.0000,
                        "netOccupancyChange": 3.000,
                        "endingOccupiedUnits": 12.000,
                        "occupancy": 185.0000,
                        "occupancyTurnOverPercent": 120.000,
                        "previousTurnOverPercent": 120.000,
                        "modelUnits": 1,
                        "adminUnits": 2,
                        "employeeUnits": 3,
                        "downUnits": 4,
                        // "totalNonRevenueUnits": 0,
                        "vacantUnits": 120.000,
                        "vacancy": 120.000
                    },
                    {
                        "distributedID": 0,
                        "startDate": 34,
                        "periodNo": 11,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "occupancyGoal": 40.000,
                        "moveins": 10.000,
                        "moveoutsNonRenewal": 1,
                        "moveoutsSkipEviction": 2,
                        //"totalMoveouts": 1648.0000,
                        "netOccupancyChange": 3.000,
                        "endingOccupiedUnits": 12.000,
                        "occupancy": 185.0000,
                        "occupancyTurnOverPercent": 120.000,
                        "previousTurnOverPercent": 120.000,
                        "modelUnits": 1,
                        "adminUnits": 2,
                        "employeeUnits": 3,
                        "downUnits": 4,
                        // "totalNonRevenueUnits": 0,
                        "vacantUnits": 120.000,
                        "vacancy": 120.000
                    },
                    {
                        "distributedID": 0,
                        "startDate": 34,
                        "periodNo": 12,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "occupancyGoal": 40.000,
                        "moveins": 10.000,
                        "moveoutsNonRenewal": 1,
                        "moveoutsSkipEviction": 2,
                        //"totalMoveouts": 1648.0000,
                        "netOccupancyChange": 3.000,
                        "endingOccupiedUnits": 12.000,
                        "occupancy": 185.0000,
                        "occupancyTurnOverPercent": 120.000,
                        "previousTurnOverPercent": 120.000,
                        "modelUnits": 1,
                        "adminUnits": 2,
                        "employeeUnits": 3,
                        "downUnits": 4,
                        // "totalNonRevenueUnits": 0,
                        "vacantUnits": 120.000,
                        "vacancy": 120.000
                    }
                ]
            },
            "statusCode": 0
        };

        model.settings = {
            "totalRecords": 1,
            "records": {
                "propertyID": 1192563,
                "budgetYear": 2017,
                "startMonth": 4,
                "noOfPeriods": 24,
                "leaseRenewalMethod": "None",
                "occupancyModel": "Worksheet",
                "occupancyInputType": "InputOccupancy",
                "occupancyGoalType": "Annual",
                "editOccupancyGoal": true,
                "budgetModelID": 63,
                "useLeaseReferenceData": true,
                "leaseShowReferenceData": true,
                "leaseOpenPeriodRefDataType": "Actual",
                "leaseOpenPeriodRefDataYear": 2016,
                "occupancyShowReferenceData": true,
                "occupancyOpenPeriodRefDataType": "Actual",
                "occupancyOpenPeriodRefDataYear": 2016
            }
        };
        model.serviceGroupsData = {
            records: [{
                serviceGroupName: 'Assisted Living',
                serviceGroupNumber: 1

            }, {
                serviceGroupName: 'Independent Living',
                serviceGroupNumber: 2

            }, {
                serviceGroupName: 'Memory care New',
                serviceGroupNumber: 3

            }]
        };
        model.getWorksheetDetails = function() {
            return model.worksheetDetails;
        };

        model.getOccupancySettings = function() {
            return model.settings.records;
        };
        model.serviceGroups = function() {
            return model.serviceGroupsData.records;
        };
        return model;
    }

    angular
        .module("budgeting")
        .factory('worksheetMock', [
            worksheetMock
        ]);
})(angular);