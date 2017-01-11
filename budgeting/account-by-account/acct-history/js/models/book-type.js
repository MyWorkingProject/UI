
(function (angular) {
    "use strict";

    function bookTypeFactory(i18n) {
        var options = {
                ACRUAL: {
                    value: "ACCRUAL",
                    name: i18n.translate("gah_book_type_accrual")
                },
                CASH: {
                    value: "CASH",
                    name: i18n.translate("gah_book_type_cash")
                }
            };

        var bookType = angular.copy(options);

        bookType.init = function () {
            var arr = [];
            angular.forEach(options, function(curr) {
                arr.push(curr);
            });

            bookType.options = arr;
            return bookType;
        };

        return bookType.init();
    }

    angular
        .module("budgeting")
        .factory("glAcctBookType", [
            "glAcctTranslatorSvc",
            bookTypeFactory
        ]);
})(angular);