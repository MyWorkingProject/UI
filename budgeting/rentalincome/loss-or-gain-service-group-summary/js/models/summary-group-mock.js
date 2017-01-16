//  Budgeting Overview List Model

(function(angular) {
    "use strict";
    angular
        .module("budgeting")
        .factory('serviceGroupMock', [function() {
                var model = {};
                model.serviceGroupsDataNew = {
                    "messageId": 200,
                    "messageText": "Success",
                    "totalRecords": 1,
                    "records": {
                        "lossToLeaseSettings": [],
                        "lossToLeaseData": [{
                                periodNumber: 1,
                                adjustmentFromMoveIn: 1,
                                adjustmentFromMoveOut: 2,
                                AvgLossPerOccupiedUnit: 3,
                                beginingLossToLease: 4,
                                endingLossToLease: 5,
                                marketRentChange: 12,
                                scheduleRent: 12,
                                marketRent: 13
                            },
                            {
                                periodNumber: 2,
                                adjustmentFromMoveIn: 1,
                                adjustmentFromMoveOut: 2,
                                AvgLossPerOccupiedUnit: 3,
                                beginingLossToLease: 4,
                                endingLossToLease: 5,
                                marketRentChange: 12,
                                scheduleRent: 12,
                                marketRent: 13
                            },
                            {
                                periodNumber: 3,
                                adjustmentFromMoveIn: 1,
                                adjustmentFromMoveOut: 2,
                                AvgLossPerOccupiedUnit: 3,
                                beginingLossToLease: 4,
                                endingLossToLease: 5,
                                marketRentChange: 12,
                                scheduleRent: 12,
                                marketRent: 13
                            }, {
                                periodNumber: 4,
                                adjustmentFromMoveIn: 1,
                                adjustmentFromMoveOut: 2,
                                AvgLossPerOccupiedUnit: 3,
                                beginingLossToLease: 4,
                                endingLossToLease: 5,
                                marketRentChange: 12,
                                scheduleRent: 12,
                                marketRent: 13
                            }, {
                                periodNumber: 5,
                                adjustmentFromMoveIn: 1,
                                adjustmentFromMoveOut: 2,
                                AvgLossPerOccupiedUnit: 3,
                                beginingLossToLease: 4,
                                endingLossToLease: 5,
                                marketRentChange: 12,
                                scheduleRent: 12,
                                marketRent: 13
                            }, {
                                periodNumber: 6,
                                adjustmentFromMoveIn: 1,
                                adjustmentFromMoveOut: 2,
                                AvgLossPerOccupiedUnit: 3,
                                beginingLossToLease: 4,
                                endingLossToLease: 5,
                                marketRentChange: 12,
                                scheduleRent: 12,
                                marketRent: 13
                            },
                            {
                                periodNumber: 7,
                                adjustmentFromMoveIn: 1,
                                adjustmentFromMoveOut: 2,
                                AvgLossPerOccupiedUnit: 3,
                                beginingLossToLease: 4,
                                endingLossToLease: 5,
                                marketRentChange: 12,
                                scheduleRent: 12,
                                marketRent: 13
                            },
                            {
                                periodNumber: 8,
                                adjustmentFromMoveIn: 1,
                                adjustmentFromMoveOut: 2,
                                AvgLossPerOccupiedUnit: 3,
                                beginingLossToLease: 4,
                                endingLossToLease: 5,
                                marketRentChange: 12,
                                scheduleRent: 12,
                                marketRent: 13
                            },
                            {
                                periodNumber: 9,
                                adjustmentFromMoveIn: 1,
                                adjustmentFromMoveOut: 2,
                                AvgLossPerOccupiedUnit: 3,
                                beginingLossToLease: 4,
                                endingLossToLease: 5,
                                marketRentChange: 12,
                                scheduleRent: 12,
                                marketRent: 13
                            }, {
                                periodNumber: 10,
                                adjustmentFromMoveIn: 1,
                                adjustmentFromMoveOut: 2,
                                AvgLossPerOccupiedUnit: 3,
                                beginingLossToLease: 4,
                                endingLossToLease: 5,
                                marketRentChange: 12,
                                scheduleRent: 12,
                                marketRent: 13
                            }, {
                                periodNumber: 11,
                                adjustmentFromMoveIn: 1,
                                adjustmentFromMoveOut: 2,
                                AvgLossPerOccupiedUnit: 3,
                                beginingLossToLease: 4,
                                endingLossToLease: 5,
                                marketRentChange: 12,
                                scheduleRent: 12,
                                marketRent: 13
                            }, {
                                periodNumber: 12,
                                adjustmentFromMoveIn: 1,
                                adjustmentFromMoveOut: 2,
                                AvgLossPerOccupiedUnit: 3,
                                beginingLossToLease: 4,
                                endingLossToLease: 5,
                                marketRentChange: 12,
                                scheduleRent: 12,
                                marketRent: 13
                            }
                        ]
                    },
                    "statusCode": 0
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

                model.serviceGroups = function() {
                    return model.serviceGroupsDataNew.records.lossToLeaseData;
                };
                return model;
            }

        ]);
})(angular);