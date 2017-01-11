// Gets GL Accounts list

(function (angular) {
    'use strict';

    function glAcctListModel(searchTextModel, propSvc, autocomplete) {
        return function (masterChartID, propertyID, record) {
            var glList = new autocomplete();

            glList.populateResults = function (response) {
                if (!response || !response.data || !response.data.records) {
                    return; //TODO maybe throw an error or notify user
                }

                glList.clearResults();
                glList.setResults(response.data.records);
            };

            /*
            glList.selectGLAccnt = function (selected) {
                var addedInfo = selected.glAccountNumber ? selected.glAccountNumber : "";

                addedInfo += " - ";
                addedInfo += selected.glAccountDescription ? selected.glAccountDescription : "";

                //vm.contract.setVendor(selected.vendorID, selected.vendorName + " (" + addedInfo + ")");
                glList.id = selected.glAccountNumber;
                glList.text = selected.glAccountDescription;
                record.glAccountNumber = selected.glAccountNumber;
                record.glAccountNumberAuto.id = selected.glAccountNumber;
                record.glAccountNumberAuto.text = addedInfo;

                logc(addedInfo);
                glList.hideResults();

                //vm.contractForm.form.vendor.$setValidity("selection", true);
            };
            */

            glList.search = function (searchTerm) {
                // console.debug("searching (%s)...", searchTerm);
                record.glAccountNumber = searchTerm;

                searchTextModel.assignText(searchTerm);                
                if (!searchTextModel.isEmpty()) {
                    var query = searchTextModel.getQuery(["glAccountNumber", "glAccountDescription"]);
                    propSvc.abort().getGlList(masterChartID, propertyID, searchTerm, query).then(glList.populateResults);
                } else {
                    glList.clearResults();
                }

            };

            return glList;
        };
    }

    angular
        .module("budgeting")
        .factory('glAcctListModel', [
            "searchTextModel",
            "contractPropertiesSvc",
            "autocompleteModel",
            glAcctListModel
        ]);
})(angular);
