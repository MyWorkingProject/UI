//  import gl accounts List Data Service

(function (angular) {
    "use strict";

    function taskBudgetModelSvc($q, $http, dialogSvc) {

        return function () {
            var svc, url, deferred, postURL;

            url = '/api/budgeting/coa/masterchart/clone/propertylist';
            postURL = '/api/budgeting/coa/masterchart/clone/propertylist/save';
            svc = {
                abort: function () {
                    if (deferred && deferred.resolve) {
                        deferred.resolve();
                    }

                    return svc;
                },

                post: function (data) {
                    deferred = $q.defer();

                    return $http({
                        url: postURL,
                        data: data,
                        method: 'POST',
                        timeout: deferred.promise
                    });
                },

                get: function (data) {
                    deferred = $q.defer();

                    return $http({
                        url: url,
                        data: data,
                        method: 'POST',
                        timeout: deferred.promise
                    });
                },

                onError: function (resp) {
                    var dialog = dialogSvc();
                    dialog.update({
                        type: 'error',
                        showCancel: true,
                        showContinue: false,
                        title: "Something went wrong.",
                        question: '',
                        info: "Something went wrong. Please try after sometime..."
                    });

                    dialog.show();
                }

            };

            return svc;
        };
    }

    angular
        .module("budgeting")
        .factory('taskBudgetModelSvc', ['$q', '$http', 'rpDialogModel', taskBudgetModelSvc]);
})(angular);
