//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function mockService(budgetDetails) {
        var model = {};      

    /* model.data=
                {
                "records":
                            {
                    "rentOption": {
                                        "budgetModelID": 0,
                                        "propertyID": 0,
                                        "distributedID" : 0,
                                        "assetType":"Affordable",
                                        "editInputMethod" : true,
                                        "editGLAccounts" : true,
                                        "marketRentTitle" : "Market Rent",
                                        "scheduleRentTitle" :"Actual Rent",
                                        "incomeModel": "Unit",
                                        "scheduleRentMethod": "Unit type",
                                        "lossToLeaseMethod": "",
                                        "lossToLeaseGLAccount": "",
                                        "lossToLeaseGLDescription": "",
                                        "gainToLeaseGLAccount": "",
                                        "gainToLeaseGLDescription": ""

                      },
                      "marketRentGLAccounts": [
                                        {
                                          "budgetModelID": 0,
                                          "glAccountNumber": "",
                                          "glAccountDescription": "",
                                          "incomePercent": "50"

                                        },
                                        {
                                          "budgetModelID": 0,
                                          "glAccountNumber": "",
                                          "glAccountDescription": "",
                                          "incomePercent": "50"
                                        }
                                     ],
                    "scheduleRentGLAccounts": [
                                        {
                                          "budgetModelID": 0,
                                          "glAccountNumber": "",
                                          "glAccountDescription": "",
                                          "incomePercent": "50"
                                        },
                                        {
                                          "budgetModelID": 0,
                                          "glAccountNumber": "",
                                          "glAccountDescription": "",
                                          "incomePercent": "50"
                                        }
                                        ]  ,
                     "rentOptionPropertyServiceGroupGLs":
                                     [ ]
                        }

                    }; */


         model.data={

                          "messageId": 200,
                          "messageText": "Success",
                          "totalRecords": 0,
                          "records": {
                                            "rentOption": {
                                              "budgetModelID": 56,
                                              "propertyID": 2555228,
                                              "distributedID": 143,
                                              "assetType": "Senior Living",
                                              "editInputMethod": true,
                                              "editGLAccounts": true,
                                              "marketRentTitle": "",
                                              "scheduleRentTitle": "",
                                              "incomeModel": "Service group",
                                              "scheduleRentMethod": "Service group",
                                              "lossToLeaseMethod": "Service group",
                                              "lossToLeaseGLAccount": "",
                                              "lossToLeaseGLDescription": "",
                                              "gainToLeaseGLAccount": "",
                                              "gainToLeaseGLDescription": ""
                                            },
                            "marketRentGLAccounts": [],
                            "scheduleRentGLAccounts": [],
                            "propertyServiceGroups": [
                                              {
                                                "distributedID": 143,
                                                "serviceGroupID": 1,
                                                "serviceGroupName": "Assisted Living",
                                                "marketRentGL": "4010.000",
                                                "marketRentGLDescription": "Rent - AL",
                                                "actualRentGL": "4590.000",
                                                "actualRentGLDescription": "Miscellaneous Credit",
                                                "lossToLeaseGL": "4410.000",
                                                "lossToLeaseGLDescription": "Loss to Lease - AL",
                                                "vacancyGL": "4510.000",
                                                "vacancyGLDescription": "Vacancy Loss - AL",
                                                "occupancyInputType": ""
                                              },
                                              {
                                                "distributedID": 143,
                                                "serviceGroupID": 2,
                                                "serviceGroupName": "Memory Care",
                                                "marketRentGL": "4011.000",
                                                "marketRentGLDescription": "Rent - MC",
                                                "actualRentGL": "4020.001",
                                                "actualRentGLDescription": "Parking Space Lease",
                                                "lossToLeaseGL": "4411.000",
                                                "lossToLeaseGLDescription": "Loss to Lease- MC",
                                                "vacancyGL": "4510.001",
                                                "vacancyGLDescription": "Vacancy Loss - MC",
                                                "occupancyInputType": ""
                                              }
                                            ]
                          },
                          "statusCode": 0
                        };



        //Conventional 
      /*  model.data=       
            {
              
                "rentOptionModel":
                            {
                    "rentOption": {
                                        "budgetModelID": 0,
                                        "propertyID": 0,
                                        "distributedID" : 0,
                                        "assetType":"Conventional",
                                        "editInputMethod" : true,
                                        "editGLAccounts" : true,
                                        "marketRentTitle" : "Market Rent",
                                        "scheduleRentTitle" :"Actual Rent",
                                        "incomeModel": "Unit",
                                        "scheduleRentMethod": "",
                                        "lossToLeaseMethod": "",
                                        "lossToLeaseGLAccount": "",
                                        "lossToLeaseGLDescription": "",
                                        "gainToLeaseGLAccount": "",
                                        "gainToLeaseGLDescription": ""

                      },
                      "marketRentGLAccount": [
                                        {
                                          "budgetModelID": 0,
                                          "glAccountNumber": "",
                                          "gLAccountDescription": "",
                                          "incomePercent": "50"

                                        }
                                     ],
                    "scheduleRentGLAccount": [
                                        {
                                          "budgetModelID": 0,
                                          "glAccountNumber": "",
                                          "gLAccountDescription": "",
                                          "incomePercent": "50"
                                        }
                                        ]  ,
                     "rentOptionPropertyServiceGroupGLs":
                                     [
                                      {
                                            "distributedID": 0,
                                            "serviceGroupID": 0,
                                            "serviceGroupName": "",
                                            "marketRentGL": "",
                                            "marketRentGLDescription": "",
                                            "actualRentGL": "",
                                            "actualRentGLDescription": "",
                                            "lossToLeaseGL": "",
                                            "lossToLeaseGLDescription": ""
                                    },
                                    {
                                          "distributedID": 0,
                                          "serviceGroupID": 0,
                                          "serviceGroupName": "",
                                          "marketRentGL": "",
                                          "marketRentGLDescription": "",
                                          "actualRentGL": "",
                                          "actualRentGLDescription": "",
                                          "lossToLeaseGL": "",
                                          "lossToLeaseGLDescription": ""
                                    }

                                 ]
                        }

                    }; */


        return model;
    }

    angular
        .module("budgeting")
        .factory('mockService', [ 'budgetDetails'  ,                     
            mockService]);
})(angular);
