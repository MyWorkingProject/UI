// Reminder Countdown List


(function (angular) {
    "use strict";

    // Select options for the number of days to trigger a reminder before expiration
    var days = [30, 60, 90, 120, 150, 180];

    var initCountdown = function () {
        var options = [];

        //we need to convert the options into json to work properly with rp-select-options
        days.forEach(function (el) {
            var obj = {
                name: el.toString(),
                value: el
            };
            options.push(obj);
        });

        return options;
    };

    var reminderCountdown = initCountdown();

    angular
        .module("budgeting")
        .value('reminderCountdown', reminderCountdown);
})(angular);