
(function () {
    "use strict";

    function assetTypeFactory() {
        var at = {
            AFFORDABLE: "Affordable",
            CONVENTIONAL: "Conventional",
            SENIOR: "Senior Living",
            STUDENT: "Student Living"
        };

        at.getAssetType = function(str) {
            str = str.trim();
            switch(str) {
                case "Conventional":
                    return at.CONVENTIONAL;
                case "Affordable":
                    return at.AFFORDABLE;
                case "Student Living":
                    return at.STUDENT;
                case "Senior Living":
                    return at.SENIOR;
            }
        };

        at.isSeniorLiving = function(type) {
            if(type == at.SENIOR) {
                return true;
            }
            return false;
        };

        return at;
    }

    angular
        .module("budgeting")
        .factory("assetType", [
            assetTypeFactory
        ]);
})();