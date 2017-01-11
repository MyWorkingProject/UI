//  Budgeting Overview List Model

(function (angular) {
    "use strict";

    function serviceGroupMock() {
     
    

        var model = {};      
        model.serviceGroupDetails = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 1,
            "records": {
                "occupancyServiceGroup": [
                  {
                      "distributedID": 0,
                      "startDate": 34,
                      "periodNo": 1,
                      "occupancyNumberOfUnits": 2,
                      "beginingOccupiedUnits": 10.3000,
                      "occupancyGoal": 40.000,
                      "moveins": 160.000,
                      "totalMoveouts": 1648.0000,
                      "netOccupancyChange": 3.000,
                      "endingOccupiedUnits": 12.000,
                      "occupancy": 185.0000,
                      "occupancyTurnOverPercent": 120.000,
                      "previousTurnOverPercent": 120.000,
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
                      "moveins": 160.000,
                      "totalMoveouts": 1648.0000,
                      "netOccupancyChange": 3.000,
                      "endingOccupiedUnits": 12.000,
                      "occupancy": 185.0000,
                      "occupancyTurnOverPercent": 120.000,
                      "previousTurnOverPercent": 120.000,
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
                      "moveins": 160.000,
                      "totalMoveouts": 1648.0000,
                      "netOccupancyChange": 3.000,
                      "endingOccupiedUnits": 12.000,
                      "occupancy": 185.0000,
                      "occupancyTurnOverPercent": 120.000,
                      "previousTurnOverPercent": 120.000,
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
                      "moveins": 160.000,
                      "totalMoveouts": 1648.0000,
                      "netOccupancyChange": 3.000,
                      "endingOccupiedUnits": 12.000,
                      "occupancy": 185.0000,
                      "occupancyTurnOverPercent": 120.000,
                      "previousTurnOverPercent": 120.000,
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
                      "moveins": 160.000,
                      "totalMoveouts": 1648.0000,
                      "netOccupancyChange": 3.000,
                      "endingOccupiedUnits": 12.000,
                      "occupancy": 185.0000,
                      "occupancyTurnOverPercent": 120.000,
                      "previousTurnOverPercent": 120.000,
                      "vacantUnits": 120.000,
                      "vacancy": 120.000
                  },
                  {
                      "distributedID": 0,
                      "startDate": 34,
                      "periodNo":6 ,
                      "occupancyNumberOfUnits": 2,
                      "beginingOccupiedUnits": 10.3000,
                      "occupancyGoal": 40.000,
                      "moveins": 160.000,
                      "totalMoveouts": 1648.0000,
                      "netOccupancyChange": 3.000,
                      "endingOccupiedUnits": 12.000,
                      "occupancy": 185.0000,
                      "occupancyTurnOverPercent": 120.000,
                      "previousTurnOverPercent": 120.000,
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
                      "moveins": 160.000,
                      "totalMoveouts": 1648.0000,
                      "netOccupancyChange": 3.000,
                      "endingOccupiedUnits": 12.000,
                      "occupancy": 185.0000,
                      "occupancyTurnOverPercent": 120.000,
                      "previousTurnOverPercent": 120.000,
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
                      "moveins": 160.000,
                      "totalMoveouts": 1648.0000,
                      "netOccupancyChange": 3.000,
                      "endingOccupiedUnits": 12.000,
                      "occupancy": 185.0000,
                      "occupancyTurnOverPercent": 120.000,
                      "previousTurnOverPercent": 120.000,
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
                      "moveins": 160.000,
                      "totalMoveouts": 1648.0000,
                      "netOccupancyChange": 3.000,
                      "endingOccupiedUnits": 12.000,
                      "occupancy": 185.0000,
                      "occupancyTurnOverPercent": 120.000,
                      "previousTurnOverPercent": 120.000,
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
                      "moveins": 160.000,
                      "totalMoveouts": 1648.0000,
                      "netOccupancyChange": 3.000,
                      "endingOccupiedUnits": 12.000,
                      "occupancy": 185.0000,
                      "occupancyTurnOverPercent": 120.000,
                      "previousTurnOverPercent": 120.000,
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
                      "moveins": 160.000,
                      "totalMoveouts": 1648.0000,
                      "netOccupancyChange": 3.000,
                      "endingOccupiedUnits": 12.000,
                      "occupancy": 185.0000,
                      "occupancyTurnOverPercent": 120.000,
                      "previousTurnOverPercent": 120.000,
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
                      "moveins": 160.000,
                      "totalMoveouts": 1648.0000,
                      "netOccupancyChange": 3.000,
                      "endingOccupiedUnits": 12.000,
                      "occupancy": 185.0000,
                      "occupancyTurnOverPercent": 120.000,
                      "previousTurnOverPercent": 120.000,
                      "vacantUnits": 120.000,
                      "vacancy": 120.000
                  },
                   {
                       "distributedID": 0,
                       "startDate": 34,
                       "periodNo": "total",
                       "occupancyNumberOfUnits": 2,
                       "beginingOccupiedUnits": 10.3000,
                       "occupancyGoal": 40.000,
                       "moveins": 160.000,
                       "totalMoveouts": 1648.0000,
                       "netOccupancyChange": 3.000,
                       "endingOccupiedUnits": 12.000,
                       "occupancy": 185.0000,
                       "occupancyTurnOverPercent": 120.000,
                       "previousTurnOverPercent": 120.000,
                       "vacantUnits": 120.000,
                       "vacancy": 120.000
                   }
                ]
            },
            "statusCode": 0
        };

        model.getServiceGroupDetails = function () {
            return model.serviceGroupDetails;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('serviceGroupMock', [
            serviceGroupMock]);
})(angular);
