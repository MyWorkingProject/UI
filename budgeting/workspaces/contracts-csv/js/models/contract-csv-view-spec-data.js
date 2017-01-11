//  View Specification Model

(function (angular) {
    "use strict";

    function contractViewSpecModel(langTranslate) {
        var model, translate, grid;

        translate = langTranslate('contracts-csv').translate;

        model = {};
        model.viewSpecData = {};
        model.setViewSpecData = function(){
            model.viewSpecData.records = [{
                columnName: "VendorName",
                desc: "Vendor name should be as similar to the vendor name in the master. Its required."
                }, {
                columnName: "Description",
                desc: "Its contract description and it should be unique, duplicates should not be allowed. Its required."
            }, {
                columnName: "Notes",
                desc: "Detailed notes related to the contract."
            }, {
                columnName: "StartDate",
                desc: "Activity start date.  Format should be MM/DD/YYYY."
            }, {
                columnName: "EndDate",
                desc: "Activity end date.  Format should be MM/DD/YYYY."
            }, {
                columnName: "Frequency",
                desc: "Frequency of the contract activity and it should be exactly matching with Bi-weekly, Weekly, Monthly, Quarterly, Annually, Annualized and Other. Blank should be considered as 'Monthly' if the activity amount is entered."
            }, {
                columnName: "Amount",
                desc: "Contract amount with reference to the frequency"
                }, {
                columnName: "PropertyID",
                desc: "Realpage property ID.  Multiple property ids can be entered separated by ';' with in the column.  Its a required column."
                }, {
                columnName: "GL account",
                desc: "Contract specific GL account should be entered here.  Its a required column.  If you have different GLs for different properties, then you have to change them manually in contracts after importing."
                }];
        };
        //};

        //grid = gridModel().setConfig(gridConfig);


        model.getGridData = function () {
            model.setViewSpecData();
            return model.viewSpecData;
        };

            return model;
    }

    angular
        .module("budgeting")
        .factory('contractViewSpecModel', [
            'appLangTranslate',
            contractViewSpecModel
        ]);
})(angular);
