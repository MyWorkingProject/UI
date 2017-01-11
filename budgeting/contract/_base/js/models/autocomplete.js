(function () {
    "use strict";

    function autocompleteFactory() {
        return function () {
            var ac = this;

            ac.results = []; //dropdown results

            ac.setResults = function (list) {
                ac.results = list;
            };

            ac.clearResults = function () {
                //ac.results.flush();
                ac.results = [];
            };

            ac.search = function () {
                logw("Should override search function");
            };

            return ac;
        };
    }

    angular
        .module("budgeting")
        .factory("autocompleteModel", [
            autocompleteFactory
        ]);
})();