//  Users List Model

(function (angular) {
    "use strict";

    function factory() {
        var model = {};

        model.returnMockData = function () {
            return {
                "messageId": 200,
                "messageText": "Success",
                "totalRecords": 4,
                "records": [
                  {
                      "id": "1",
                      "title": "Insurance",
                      "assignedTo": "Rohith",
                      "priority": "Normal",
                      "dueDate": "07/10/2015",
                      "status": "Overdue"

                  },
                  {
                      "id": "2",
                      "title": "Insurance",
                      "assignedTo": "James",
                      "priority": "High",
                      "dueDate": "17/10/2016",
                      "status": "Pending"
                  },
                  {
                      "id": "3",
                      "title": "Insurance",
                      "assignedTo": "Kevin",
                      "priority": "Low",
                      "dueDate": "07/10/2015",
                      "status": "Overdue"
                  },
                  {
                      "id": "4",
                      "title": "Insurance",
                      "assignedTo": "Rohith",
                      "priority": "Normal",
                      "dueDate": "07/10/2015",
                      "status": "Overdue"
                  }
                ],
                "statusCode": 0
            };
        };


        return model;
    }

    angular
        .module("budgeting")
        .factory('mockData', [
                factory
        ]);
})(angular);

