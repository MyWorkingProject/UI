
(function (angular) {
    "use strict";

    var NO_OF_PERIODS = 12;

    var genericData = { 
            itemDescription: null, 
            total: null, 
            legend: null,
            rowType: "summaryRow", 
            level: 2,
        };

    var moveIns = {},
        moveOuts = {},
        renewals = {},
        occupancyPercent = {};

    var totalMoveIns = 0,
        totalMoveouts = 0,
        totalRenewals = 0,
        totalOccPercent = 0;

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max-min+1) + min);
    };

    for (var i=0; i<NO_OF_PERIODS; i++) {
        var keyStr = "period" + (i+1);

        moveIns[keyStr] = getRandomInt(1, 300);
        moveOuts[keyStr] = getRandomInt(1, 300);
        renewals[keyStr] = getRandomInt(1, 300);
        occupancyPercent[keyStr] = getRandomInt(1, 100);

        totalMoveIns += moveIns[keyStr];
        totalMoveouts += moveOuts[keyStr];
        totalRenewals += renewals[keyStr];
        totalOccPercent += occupancyPercent[keyStr];
    }
    moveIns.total = totalMoveIns;
    moveOuts.total = totalMoveouts;
    renewals.total = totalRenewals;
    occupancyPercent.total = totalOccPercent;    

    // var data = {
    //     moveIns: moveIns,
    //     moveOuts: moveOuts,
    //     leaseRenewals: renewals,
    //     occupancyPercent: occupancyPercent,

    //     avgMoveIns: 10,
    //     avgMoveOuts: 30,
    //     leaseRenewalsPercent: 60,
    //     turnoverPercent: 40,
    //     occupancyRenewalsPercent: 80,
    //     vacancyPercent: 20,
    // };

    var data = {
      "messageId": 200,
      "messageText": "Success",
      "totalRecords": 13,
      "records": [
        {
          "totalMoveOuts": 2,
          "distributedID": 0,
          "periodNumber": 1,
          "moveins": 5,
          "endingOccupiedUnits": 48,
          "occupancy": 96,
          "occupancyNumberOfUnits": 50,
          "leaseRenewals": 1
        },
        {
          "totalMoveOuts": 2,
          "distributedID": 0,
          "periodNumber": 2,
          "moveins": 2,
          "endingOccupiedUnits": 48,
          "occupancy": 96,
          "occupancyNumberOfUnits": 50,
          "leaseRenewals": 1
        },
        {
          "totalMoveOuts": 3,
          "distributedID": 0,
          "periodNumber": 3,
          "moveins": 3,
          "endingOccupiedUnits": 48,
          "occupancy": 96,
          "occupancyNumberOfUnits": 50,
          "leaseRenewals": 2
        },
        {
          "totalMoveOuts": 2,
          "distributedID": 0,
          "periodNumber": 4,
          "moveins": 2,
          "endingOccupiedUnits": 48,
          "occupancy": 96,
          "occupancyNumberOfUnits": 50,
          "leaseRenewals": 2
        },
        {
          "totalMoveOuts": 1,
          "distributedID": 0,
          "periodNumber": 5,
          "moveins": 1,
          "endingOccupiedUnits": 48,
          "occupancy": 96,
          "occupancyNumberOfUnits": 50,
          "leaseRenewals": 1
        },
        {
          "totalMoveOuts": 3,
          "distributedID": 0,
          "periodNumber": 6,
          "moveins": 3,
          "endingOccupiedUnits": 48,
          "occupancy": 96,
          "occupancyNumberOfUnits": 50,
          "leaseRenewals": 3
        },
        {
          "totalMoveOuts": 3,
          "distributedID": 0,
          "periodNumber": 7,
          "moveins": 3,
          "endingOccupiedUnits": 48,
          "occupancy": 96,
          "occupancyNumberOfUnits": 50,
          "leaseRenewals": 3
        },
        {
          "totalMoveOuts": 3,
          "distributedID": 0,
          "periodNumber": 8,
          "moveins": 3,
          "endingOccupiedUnits": 48,
          "occupancy": 96,
          "occupancyNumberOfUnits": 50,
          "leaseRenewals": 3
        },
        {
          "totalMoveOuts": 3,
          "distributedID": 0,
          "periodNumber": 9,
          "moveins": 3,
          "endingOccupiedUnits": 48,
          "occupancy": 96,
          "occupancyNumberOfUnits": 50,
          "leaseRenewals": 3
        },
        {
          "totalMoveOuts": 3,
          "distributedID": 0,
          "periodNumber": 10,
          "moveins": 3,
          "endingOccupiedUnits": 48,
          "occupancy": 96,
          "occupancyNumberOfUnits": 50,
          "leaseRenewals": 3
        },
        {
          "totalMoveOuts": 3,
          "distributedID": 0,
          "periodNumber": 11,
          "moveins": 3,
          "endingOccupiedUnits": 48,
          "occupancy": 96,
          "occupancyNumberOfUnits": 50,
          "leaseRenewals": 3
        },
        {
          "totalMoveOuts": 3,
          "distributedID": 0,
          "periodNumber": 12,
          "moveins": 3,
          "endingOccupiedUnits": 48,
          "occupancy": 96,
          "occupancyNumberOfUnits": 50,
          "leaseRenewals": 3
        },
        {
          "totalMoveOuts": 2,
          "distributedID": 0,
          "periodNumber": 0,
          "moveins": 2,
          "endingOccupiedUnits": 48,
          "occupancy": 1,
          "occupancyNumberOfUnits": 50,
          "leaseRenewals": 2
        }
      ],
      "statusCode": 0
    };


    angular
        .module("budgeting")
        .value("oarSummaryGridMockData", data);

})(angular);
