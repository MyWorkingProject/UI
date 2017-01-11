// Date Utility functions

(function (angular) {
    "use strict";

    function dateUtility(moment) {
        var util = {};

        util.dateFormat = {
            dateTime: "MM/DD/YYYY HH:mm:ss A",
            disp: "MM/DD/YYYY",
            timestamp: "x"
        };

        //RP Date Picker uses timestamp format
        util.startDayPicker = function () {
            return moment().format(util.dateFormat.disp);
        };

        //RP Date Picker uses timestamp format
        util.endDayPicker = function () {
            return moment().add(1, "month").format(util.dateFormat.disp);
        };

        util.getDate = function (friendlyDate, expectedFormat) {
            if(moment.isMoment(friendlyDate)) {
                return friendlyDate;
            }

            var format = expectedFormat;
            if(!format) {
                format = util.dateFormat.disp;
            }

            return moment(friendlyDate, format);
        };

        util.getDateStr = function(dateTimeStr) {
            return moment(dateTimeStr, util.dateFormat.dateTime).format(util.dateFormat.disp);
        };

        util.getFriendlyDate = function(date) {
            if(moment.isMoment(date)) {
                return date.format(util.dateFormat.disp);
            }
            return util.getDateStr(date);
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
        .factory("dateUtility", [
            "moment", //v2.10.6
            dateUtility
        ]);
})(angular);