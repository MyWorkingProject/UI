//  Budgeting Overview List Model

(function (angular) {
    "use strict";

    function lrDetailsMock() {
     
    

        var model = {};      
        model.occupancyDetails = {
            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 1,
            "records": {
                "details": [
                  {                    
                      "serviceGroup": "Memory Care",
                      "period1": "5 / 5",
                      "period2": "5 / 5",
                      "period3": "5 / 5",
                      "period4": "5 / 5",
                      "period5": "5 / 5",
                      "period6": "5 / 5",
                      "period7": "5 / 5",
                      "period8": "5 / 5",
                      "period9": "5 / 5",
                      "period10": "5 / 5",
                      "period11": "5 / 5",
                      "period12": "5 / 5",
                      "units": 120,
					  "commentCount":4
                  },
                  {
                      "serviceGroup": "Assisted Living",
                      "period1": "6 / 5",
                      "period2": "7 / 5",
                      "period3": "5 / 5",
                      "period4": "5 / 5",
                      "period5": "5 / 5",
                      "period6": "5 / 5",
                      "period7": "5 / 5",
                      "period8": "5 / 5",
                      "period9": "5 / 5",
                      "period10": "7 / 5",
                      "period11": "5 / 5",
                      "period12": "5 / 5",
                      "units": 120,
					  "commentCount":4
                  },
                  {
                       "serviceGroup": "Independent Living",
                       "period1": "5 / 5",
                       "period2": "5 / 5",
                       "period3": "5 / 5",
                       "period4": "5 / 5",
                       "period5": "5 / 5",
                       "period6": "5 / 5",
                       "period7": "5 / 5",
                       "period8": "5 / 5",
                       "period9": "5 / 5",
                       "period10": "5 / 5",
                       "period11": "5 / 5",
                       "period12": "5 / 5",
                      "units": 120,
					  "commentCount":4
                  },
                  {
                      "serviceGroup": "ABC Care",
                      "period1": "6 / 5",
                      "period2": "7 / 5",
                      "period3": "5 / 5",
                      "period4": "5 / 5",
                      "period5": "5 / 5",
                      "period6": "5 / 5",
                      "period7": "5 / 5",
                      "period8": "5 / 5",
                      "period9": "5 / 5",
                      "period10": "7 / 5",
                      "period11": "5 / 5",
                      "period12": "5 / 5",
                      "units": 120,
					  "commentCount":4
                  }
                ]
            },
            "statusCode": 0
        };

        model.getOccupancyDetails = function () {
            return model.occupancyDetails;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('lrDetailsMock', [
            lrDetailsMock]);
})(angular);
