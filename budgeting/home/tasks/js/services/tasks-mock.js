//  Tasks Service Mock

(function (angular) {
    "use strict";

    var url, tasks;

    url = /\/api\/leasing-and-rents\/tasks\/\d+\/\d+/;

    tasks = {
        "tasklist": [{
            "isActive": true,
            "className": "task",
            "title": "Budget Workflow Status",
            "details": [{
                "metric": "5",
                "status": "",
                "description": "In Progress"
            }, {
                "metric": "2",
                "status": "notify-warning",
                "description": "Need approval"
            }, {
                "metric": "6",
                "status": "notify-warning",
                "description": "overdue"
            }]
        }, {
            "isActive": true,
            "className": "task",
            "title": "Contracts",
            "details": [{
                "metric": "5",
                "status": "",
                "description": "Expiring within 30 days"
            }, {
                "metric": "2",
                "status": "",
                "description": "Expired"
            }]
        }, {
            "isActive": true,
            "className": "task",
            "title": "Budgeting Tasks",
            "details": [{
                "metric": "0",
                "status": "",
                "description": "Pending tasks"
            }, {
                "metric": "0",
                "status": "",
                "description": "overdue"
            }]
        }, {
            "isActive": true,
            "className": "task",
            "title": "Budgeting Comments",
            "details": [{
                "metric": "7",
                "status": "",
                "description": "Unread"
            }]
        }, {
            "isActive": true,
            "className": "task",
            "title": "Renewals",
            "details": [{
                "metric": "13",
                "status": "notify-warning",
                "description": "Expiring not renewed"
            }, {
                "metric": "5",
                "status": "notify-alert",
                "description": "Needing offers"
            }]
        }, {
            "isActive": true,
            "className": "task",
            "title": "Prospect Follow-up",
            "details": [{
                "metric": "0",
                "status": "",
                "description": "Follow ups needed"
            }, {
                "metric": "0",
                "status": "",
                "description": "Follow ups overdue"
            }]
        }, {
            "isActive": true,
            "className": "task",
            "title": "Delinquent & Prepaid",
            "details": [{
                "metric": "19",
                "status": "notify-warning",
                "description": "Delinquent - 18,500.00"
            }, {
                "metric": "104",
                "status": "",
                "description": "Prepaid - 44,265.07"
            }]
        }, {
            "isActive": true,
            "className": "task",
            "title": "Availability",
            "details": [{
                "metric": "72%",
                "status": "notify-alert",
                "description": "Occupied"
            }, {
                "metric": "2",
                "status": "notify-alert",
                "description": "Ready not leased"
            }]
        }]
    };

    function TasksMock($httpBackend) {
        $httpBackend
            .whenGET(url)
            .respond(tasks);
    }

    angular
        .module("budgeting")
        .run(['$httpBackend', TasksMock]);
})(angular);
