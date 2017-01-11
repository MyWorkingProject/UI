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
                      "modelName": "2015 Budget",
                      "propertyName": "Meadow Bay",
                      "modelYear": "2015",
                      "modelType": "Budget-Conventinal",
                      "status": "Completed"

                  },
                  {
                      "id": "2",
                      "modelName": "2013 Budget",
                      "propertyName": "coconut cove",
                      "modelYear": "2013",
                      "modelType": "Budget-Affordable",
                      "status": "In-Progress"
                  },
                  {
                      "id": "3",
                      "modelName": "2012 Budget",
                      "propertyName": "Meadow Bay",
                      "modelYear": "2012",
                      "modelType": "budget-conventinal",
                      "status": "Finalized"
                  },
                  {
                      "id": "1",
                      "modelName": "2016 Budget",
                      "propertyName": "coconut cove",
                      "modelYear": "2015",
                      "modelType": "budget-Affordable",
                      "status": "In-Progress"
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

