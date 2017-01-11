//  Configure Advanced-search

(function (angular) {
    "use strict";

    function config(prov) {
        var metaData = [
            {
                name: "Person",
                value: "Person"
         },
            {
                name: "Tenant",
                value: "Tenant"
         },
            {
                name: "SR",
                value: "Service Request"
         },
            {
                name: "PO",
                value: "Asset"
         },
            {
                name: "Payment",
                value: "Payment"
         },
            {
                name: "Document",
                value: "Document"
         },
            {
                name: "Report",
                value: "Report"
         }
        ];

        prov.setData(metaData);
    }

    angular
        .module("budgeting")
        .config(['rpAdvancedSearchModelProvider', config]);
})(angular);
