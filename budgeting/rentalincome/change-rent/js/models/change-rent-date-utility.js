// Date Utility functions

(function (angular) {
    "use strict";

    function rentUtility(moment) {
        var util = {};

        util.dateFormat = {
            disp: "MM/DD/YYYY",
            timestamp: "x"
        };

        util.getDate = function (friendlyDate) {
            return moment(friendlyDate, util.dateFormat.disp);
        };

        util.createDate = function (year, month, date) {
            if (date === undefined || date === null) {
                date = 1;
            }
            return moment().year(year).month(month).date(date);
        };

        util.today = function () {
            return moment();
        };

        //test the testDate if it is within the start and end dates based on the unit of time
        util.isWithin = function (testDate, startDate, endDate, unit) {
            //If we have upgraded to Moment v2.10.7+, then we can use isSameOrAfter() and isSameOrBefore() functions
            return (testDate.isSame(startDate, unit) || testDate.isAfter(startDate, unit)) &&
                    (testDate.isSame(endDate, unit) || testDate.isBefore(endDate, unit));
        };

        return util;
    }

    angular
        .module("budgeting")
        .factory("changeRentDateUtility", [
            "moment", //v2.10.6
            rentUtility
        ]);
})(angular);