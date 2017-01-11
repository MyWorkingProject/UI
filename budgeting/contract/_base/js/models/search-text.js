// Autocomplete Model

(function (angular) {
    "use strict";

    function searchTextFactory(rpPaginationModel) {
        var model = {};

        model.text = "";
        model.pagination = rpPaginationModel();
        model.resultsPerPage = 100;

        model.assignText = function (searchTerm) {
            model.text = searchTerm;
        };

        model.setResultsPerPage = function(rpp) {
            model.resultsPerPage = rpp;
        };

        model.setSortBy = function(sortBy) {
            model.pagination.setSortBy(sortBy);
        };

        model.isEmpty = function () {
            return !model.text;
        };

        model.getSearchList = function (keysToSearchAt) {
            var searchList = {};

            keysToSearchAt.forEach(function(key) {
                searchList[key] = model.text;
            });        

            return searchList;
        };

        model.getQuery = function (keysToSearchAt) {
            var filter = model.getSearchList(keysToSearchAt);

            model.pagination.setFilterBy(filter);
            model.pagination.setPages({
                resultsPerPage: model.resultsPerPage
            });

            return model.pagination.getQuery();
        };

        model.reset = function () {
            model.text = "";
            model.pagination = rpPaginationModel();
        };


        return model;
    }

    angular
        .module("budgeting")
        .service("searchTextModel", [
            "rpPaginationModel",
            searchTextFactory
        ]);
})(angular);