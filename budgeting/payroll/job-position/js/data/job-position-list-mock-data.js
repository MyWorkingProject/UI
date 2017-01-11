
(function (angular) {
    "use strict";

    var data = {
      "messageId": 200,
      "messageText": "Success",
      "totalRecords": 12,
      "records": [
        {
          "jobPositionID": 2,
          "distributedID": 0,
          "title": "Maintenance Manager",
          "department": "",
          "workerClassName": "Maintenance",
          "propertyID": 0,
          "positionCount": 0,
          "isLockCount": false
        },
        {
          "jobPositionID": 3,
          "distributedID": 0,
          "title": "Leasing Consultant",
          "department": "",
          "workerClassName": "Leasing",
          "propertyID": 0,
          "positionCount": 0,
          "isLockCount": false
        },
        {
          "jobPositionID": 4,
          "distributedID": 0,
          "title": "Maintenance Technician",
          "department": "",
          "workerClassName": "Maintenance",
          "propertyID": 0,
          "positionCount": 0,
          "isLockCount": false
        },
        {
          "jobPositionID": 5,
          "distributedID": 0,
          "title": "Accountant",
          "department": "",
          "workerClassName": "Administration",
          "propertyID": 0,
          "positionCount": 0,
          "isLockCount": false
        },
        {
          "jobPositionID": 6,
          "distributedID": 0,
          "title": "Receptionist",
          "department": "",
          "workerClassName": "Administration",
          "propertyID": 0,
          "positionCount": 0,
          "isLockCount": false
        },
        {
          "jobPositionID": 7,
          "distributedID": 0,
          "title": "Support Technician",
          "department": "",
          "workerClassName": "Administration",
          "propertyID": 0,
          "positionCount": 0,
          "isLockCount": false
        },
        {
          "jobPositionID": 8,
          "distributedID": 0,
          "title": "Director",
          "department": "",
          "workerClassName": "Administration",
          "propertyID": 0,
          "positionCount": 0,
          "isLockCount": false
        },
        {
          "jobPositionID": 10,
          "distributedID": 0,
          "title": "General Manager",
          "department": "Test department",
          "workerClassName": "Administration",
          "propertyID": 0,
          "positionCount": 0,
          "isLockCount": false
        },
        {
          "jobPositionID": 11,
          "distributedID": 0,
          "title": "Driver",
          "department": "",
          "workerClassName": "Administration",
          "propertyID": 0,
          "positionCount": 0,
          "isLockCount": false
        },
        {
          "jobPositionID": 12,
          "distributedID": 0,
          "title": "Nurse",
          "department": "",
          "workerClassName": "Medical",
          "propertyID": 0,
          "positionCount": 0,
          "isLockCount": false
        },
        {
          "jobPositionID": 13,
          "distributedID": 0,
          "title": "Medical Tech",
          "department": "",
          "workerClassName": "Medical",
          "propertyID": 0,
          "positionCount": 0,
          "isLockCount": false
        },
        {
          "jobPositionID": 14,
          "distributedID": 0,
          "title": "Kitchen",
          "department": "",
          "workerClassName": "Medical",
          "propertyID": 0,
          "positionCount": 0,
          "isLockCount": false
        }
      ],
      "statusCode": 0
    };


    angular
        .module("budgeting")
        .value("jobPositionListMockData", data);

})(angular);
