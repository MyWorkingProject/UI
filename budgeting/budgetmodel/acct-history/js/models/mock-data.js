
(function (angular) {
    "use strict";

    var mockRecords = {
        messageId: 200,
        messageText: "Success",
        totalRecords: 2,
        records: [
          {
            month: "June",
            year: 2016,
            debitTotal: 1000.00,
            creditTotal: 12000.00,
            balanceTotal: 13000.00,
            history: [{
              posted: "06/01/2014",
              memo: "NOI 2nd Quarter",
              departmentId: 100200,
              locationId: "Fair Haven",
              debit: 0, 
              credit: "400,000",
              balance: "300,000",
              displayStr: ""
            }, {
              posted: "06/01/2014",
              memo: "NOI 2nd Quarter",
              departmentId: 100200,
              locationId: "Fair Haven",
              debit: 0, 
              credit: "400,000",
              balance: "300,000",
              displayStr: "Lorem ipsum"
            }, {
              posted: "06/01/2014",
              memo: "NOI 2nd Quarter",
              departmentId: 100200,
              locationId: "Fair Haven",
              debit: 0, 
              credit: "400,000",
              balance: "300,000",
              displayStr: "Nullam varius bibendum est"
            }]
          }, 
          {
            month: "July",
            year: 2016,
            debitTotal: 1000.00,
            creditTotal: 12000.00,
            balanceTotal: 13000.00,
            history: [{
              posted: "06/01/2014",
              memo: "NOI 2nd Quarter",
              departmentId: 100200,
              locationId: "Fair Haven",
              debit: 0, 
              credit: "400,000",
              balance: "300,000"
            }]
          },
          

        ],
        statusCode: 0
    };

    var noRecords = {
        messageId: 200,
        messageText: "Success",
        totalRecords: 0,
        records: [],
        statusCode: 0
    };

    angular
        .module("budgeting")
        .value("glAcctHistoryMockResponse", mockRecords);

})(angular);
