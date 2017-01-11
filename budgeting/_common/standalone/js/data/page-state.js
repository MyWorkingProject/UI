
(function (angular) {
    "use strict";

	var status = {
		NEW: "new",
        VIEW: "view",
        EDIT: "edit"
	};

    angular
        .module("budgeting")
        .value("pageState", status);
})(angular);