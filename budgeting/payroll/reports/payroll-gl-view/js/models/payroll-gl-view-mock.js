//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function PayrollglViewMock() {
        var model = {};
		model.mockData={
			  "messageId": 200,
			  "messageText": "Success",
			  "totalRecords": 35,
			  "records": [
				{
				  "jobTitle": "GL 6010.000",
				  "glAccountNumber": "6010.000",
				 "benefits": null,
                  "payrollItem_1": null,
                  "payrollItem_10": null,
                  "payrollItem_2": null,
                  "payrollItem_3": null,
                  "payrollItem_4": null,
                  "payrollItem_5": null,
                  "payrollItem_6": null,
                  "payrollItem_7": null,
                  "payrollItem_9": null,
                  "payrollTaxes": null,
                  "total": null,
				  "rowTypes":  "Header",
                  "rowClass": "payroll-grid-columns"
				},
				{
				  "jobTitle": "Leasing Consultant",
				  "glAccountNumber": "6010.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 1075.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 1075.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Office Manager",
				  "glAccountNumber": "6010.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 700.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 700.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Receptionist",
				  "glAccountNumber": "6010.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 0.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Total 6010.000",
				  "glAccountNumber": "6010.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 1775.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 1775.0000,
				  "rowTypes":  "Total",
				    "rowClass": "payroll-grid-totals"
				},
				{
				  "jobTitle": "GL 6020.000",
				  "glAccountNumber": "6020.000",
				  "benefits": null,
                  "payrollItem_1": null,
                  "payrollItem_10": null,
                  "payrollItem_2": null,
                  "payrollItem_3": null,
                  "payrollItem_4": null,
                  "payrollItem_5": null,
                  "payrollItem_6": null,
                  "payrollItem_7": null,
                  "payrollItem_9": null,
                  "payrollTaxes": null,
                  "total": null,
				  "rowTypes":  "Header",
                "rowClass": "payroll-grid-columns"
				},
				{
				  "jobTitle": "Leasing Consultant",
				  "glAccountNumber": "6020.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 9147.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 163.0000,
				  "payrollItem_7": 2066.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 11376.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Office Manager",
				  "glAccountNumber": "6020.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 17207.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 13516.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 260.0000,
				  "payrollItem_7": 1601.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 32584.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Receptionist",
				  "glAccountNumber": "6020.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 25.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 25.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Total 6020.000",
				  "glAccountNumber": "6020.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 17207.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 22663.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 423.0000,
				  "payrollItem_7": 3692.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 43985.0000,
				  "rowTypes":  "Total",
				    "rowClass": "payroll-grid-totals"
				},
				{
				  "jobTitle": "GL 6040.000",
				  "glAccountNumber": "6040.000",
				   "benefits": null,
                  "payrollItem_1": null,
                  "payrollItem_10": null,
                  "payrollItem_2": null,
                  "payrollItem_3": null,
                  "payrollItem_4": null,
                  "payrollItem_5": null,
                  "payrollItem_6": null,
                  "payrollItem_7": null,
                  "payrollItem_9": null,
                  "payrollTaxes": null,
                  "total": null,
				  "rowTypes":  "Header",
                   "rowClass": "payroll-grid-columns"
				},
				{
				  "jobTitle": "Maintenance Manager",
				  "glAccountNumber": "6040.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 10293.0000,
				  "payrollItem_3": 660.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 4013.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 14966.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Total 6040.000",
				  "glAccountNumber": "6040.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 10293.0000,
				  "payrollItem_3": 660.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 4013.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 14966.0000,
				  "rowTypes":  "Total",
				  "rowClass": "payroll-grid-totals"
				},
				{
				  "jobTitle": "GL 6220.000",
				  "glAccountNumber": "6220.000",
				   "benefits": null,
                  "payrollItem_1": null,
                  "payrollItem_10": null,
                  "payrollItem_2": null,
                  "payrollItem_3": null,
                  "payrollItem_4": null,
                  "payrollItem_5": null,
                  "payrollItem_6": null,
                  "payrollItem_7": null,
                  "payrollItem_9": null,
                  "payrollTaxes": null,
                  "total": null,
				  "rowTypes":  "Header",
                  "rowClass": "payroll-grid-columns"
				},
				{
				  "jobTitle": "Maintenance Manager",
				  "glAccountNumber": "6220.000",
				  "benefits": 357.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 357.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Total 6220.000",
				  "glAccountNumber": "6220.000",
				  "benefits": 357.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 357.0000,
				  "rowTypes":  "Total",
				   "rowClass": "payroll-grid-totals"
				},
				{
				  "jobTitle": "GL 6230.000",
				  "glAccountNumber": "6230.000",
				   "benefits": null,
                  "payrollItem_1": null,
                  "payrollItem_10": null,
                  "payrollItem_2": null,
                  "payrollItem_3": null,
                  "payrollItem_4": null,
                  "payrollItem_5": null,
                  "payrollItem_6": null,
                  "payrollItem_7": null,
                  "payrollItem_9": null,
                  "payrollTaxes": null,
                  "total": null,
				  "rowTypes":  "Header",
                  "rowClass": "payroll-grid-columns"
				},
				{
				  "jobTitle": "Leasing Consultant",
				  "glAccountNumber": "6230.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 0.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Maintenance Manager",
				  "glAccountNumber": "6230.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 0.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Office Manager",
				  "glAccountNumber": "6230.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 0.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Receptionist",
				  "glAccountNumber": "6230.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 0.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Total 6230.000",
				  "glAccountNumber": "6230.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 0.0000,
				  "rowTypes":  "Total",
				    "rowClass": "payroll-grid-totals"
				},
				{
				  "jobTitle": "GL 9040.000",
				  "glAccountNumber": "9040.000",
				 "benefits": null,
                  "payrollItem_1": null,
                  "payrollItem_10": null,
                  "payrollItem_2": null,
                  "payrollItem_3": null,
                  "payrollItem_4": null,
                  "payrollItem_5": null,
                  "payrollItem_6": null,
                  "payrollItem_7": null,
                  "payrollItem_9": null,
                  "payrollTaxes": null,
                  "total": null,
				  "rowTypes":  "Header",
                   "rowClass": "payroll-grid-columns"
				},
				{
				  "jobTitle": "Leasing Consultant",
				  "glAccountNumber": "9040.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 1127.0000,
				  "total": 1127.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Maintenance Manager",
				  "glAccountNumber": "9040.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 1254.0000,
				  "total": 1254.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Office Manager",
				  "glAccountNumber": "9040.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 2959.0000,
				  "total": 2959.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Receptionist",
				  "glAccountNumber": "9040.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 2.0000,
				  "total": 2.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Total 9040.000",
				  "glAccountNumber": "9040.000",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 5342.0000,
				  "total": 5342.0000,
				  "rowTypes":  "Total",
				    "rowClass": "payroll-grid-totals"
				},
				{
				  "jobTitle": "GL No GL Accounts",
				  "glAccountNumber": "No GL Accounts",
				  "benefits": null,
                  "payrollItem_1": null,
                  "payrollItem_10": null,
                  "payrollItem_2": null,
                  "payrollItem_3": null,
                  "payrollItem_4": null,
                  "payrollItem_5": null,
                  "payrollItem_6": null,
                  "payrollItem_7": null,
                  "payrollItem_9": null,
                  "payrollTaxes": null,
                  "total": null,
				  "rowTypes":  "Header",
                   "rowClass": "payroll-grid-columns"
				},
				{
				  "jobTitle": "Leasing Consultant",
				  "glAccountNumber": "No GL Accounts",
				  "benefits": 1288.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 625.0000,
				  "payrollItem_4": 3000.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 4913.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Maintenance Manager",
				  "glAccountNumber": "No GL Accounts",
				  "benefits": 583.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 0.0000,
				  "payrollItem_5": 270.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 853.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Office Manager",
				  "glAccountNumber": "No GL Accounts",
				  "benefits": 2158.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 2500.0000,
				  "payrollItem_4": 3000.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 7658.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Receptionist",
				  "glAccountNumber": "No GL Accounts",
				  "benefits": 0.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 0.0000,
				  "payrollItem_4": 155.0000,
				  "payrollItem_5": 0.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 155.0000,
				  "rowTypes":  "Detail"
				},
				{
				  "jobTitle": "Total No GL Accounts",
				  "glAccountNumber": "No GL Accounts",
				  "benefits": 4029.0000,
				  "payrollItem_1": 0.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 0.0000,
				  "payrollItem_3": 3125.0000,
				  "payrollItem_4": 6155.0000,
				  "payrollItem_5": 270.0000,
				  "payrollItem_6": 0.0000,
				  "payrollItem_7": 0.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 0.0000,
				  "total": 13579.0000,
				  "rowTypes":  "Total",
				    "rowClass": "payroll-grid-totals"
				},
				{
				  "jobTitle": "Grand Total",
				  "glAccountNumber": null,
				  "benefits": 4386.0000,
				  "payrollItem_1": 17207.0000,
				  "payrollItem_10": 0.0000,
				  "payrollItem_2": 32956.0000,
				  "payrollItem_3": 3785.0000,
				  "payrollItem_4": 6155.0000,
				  "payrollItem_5": 2045.0000,
				  "payrollItem_6": 423.0000,
				  "payrollItem_7": 7705.0000,
				  "payrollItem_9": 0.0000,
				  "payrollTaxes": 5342.0000,
				  "total": 80004.0000,
				  "rowTypes":  "Total",
				   "rowClass": "payroll-grid-totals"
				}
			  ],
			  "statusCode": 0
			};

        return model;
    }
    angular
        .module("budgeting")
        .factory('PayrollglViewMock', [ 
            PayrollglViewMock]);
})(angular);