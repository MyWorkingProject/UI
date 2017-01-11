
(function (angular) {
    "use strict";

    var data = {
      "messageId": 200,
      "messageText": "Success",
      "totalRecords": 1,
      "records": [
        {
          "jobPositionID": 1,
          "distributedID": 0,
          "title": "Office Manager",
          "department": "",
          "workerClassName": "Administration",
          "propertyID": 0,
          "positionCount": 2,
          "isLockCount": true
        }
      ],
      "statusCode": 0
    };

    angular
        .module("budgeting")
        .value("jobPositionDetailsMockData", data);

})(angular);
