// Gets Vendor list

(function () {
    'use strict';

    function vendorListFactory(searchTextModel, vendorListSvc, autocomplete) {
        var vendor = new autocomplete();

        vendor.populateResults = function (response) {
            if (!response || !response.data || !response.data.records) {
                return; //TODO maybe throw an error or notify user
            }

            vendor.clearResults();
            vendor.setResults(response.data.records);
        };

        vendor.search = function (searchTerm) {
            //search for new search term
            searchTextModel.assignText(searchTerm);
            searchTextModel.setResultsPerPage(25);
            searchTextModel.setSortBy({"vendorName": "asc"});

            if (!searchTextModel.isEmpty()) {
                var query = searchTextModel.getQuery(["vendorName", "vendorCode", "stateCode"]);
                vendorListSvc.search(query, vendor.populateResults);
            } else {
                vendor.clearResults();
            }

        };

        return vendor;        
    }

    angular
        .module("budgeting")
        .factory('vendorListModel', [
            "searchTextModel",
            "vendorListSvc",
            "autocompleteModel",
            vendorListFactory
        ]);
})();
