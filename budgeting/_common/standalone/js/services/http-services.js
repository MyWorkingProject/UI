//  import gl accounts List Data Service

(function (angular) {
    "use strict";

    function httpServiceCall($q, $http, dialogSvc) {

        return function () {
            var svc, deferred;

            svc = {
                abort: function () {
                    if (deferred && deferred.resolve) {
                        deferred.resolve();
                    }

                    return svc;
                },

                delitem: function (url, data) {
                    deferred = $q.defer();

                    return $http({
                        url: url,
                        data: data,
                        method: 'Delete',
                        cache: false,
                        timeout: deferred.promise
                    });
                },

                getData: function (url) {
                    deferred = $q.defer();

                    return $http({
                        url: url,
                        method: 'GET',
                        timeout: deferred.promise
                    });
                },
                putData: function (url, data) {
                    deferred = $q.defer();

                    return $http({
                        url: url,
                        method: 'PUT',
                        data: data,
                        timeout: deferred.promise
                    });
                },
                postData: function (url, data) {
                    deferred = $q.defer();

                    return $http({
                        url: url,
                        method: 'POST',
                        data: data,
                        timeout: deferred.promise
                    });
                },
                postFileData: function (url, fdData) {
                    deferred = $q.defer();
                    var fd = new FormData();
                    fd.append(fdData.name, fdData);
                    return $http({
                        url: url,
                        method: 'POST',
                        transformRequest: angular.identity,
                        headers: {
                            'content-type': undefined
                        },
                        data: fd,
                        timeout: deferred.promise
                    });
                },
                updateWizStep: function (data) {
                    return svc.putData('/api/budgeting/common/wizardstatus/Update', data);
                },
                getWizStep: function (typeId, chartId) {
                    return svc.getData('/api/budgeting/common/wizardstatus/' + typeId + '/' + chartId);
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
                },
                validateResponse: function (resp) {
                    if (resp.data.exception && resp.data.exception.confirmAction === true) {
                        //RPX_ERROR
                        //OSA_SETUP_NOT_FOUND
                        //ACCOUNTTYPE_NOT_SET
                        var dialog = dialogSvc();
                        if (resp.data.exception.reasonFailed === "OSA_SETUP_NOT_FOUND") {
                            dialog.update({
                                type: 'error',
                                showCancel: true,
                                showContinue: false,
                                title: "Cannot import G/L accounts",
                                question: '',
                                cancelButtonText: 'Close',
                                info: "Accounting Entity and Location Ids are not mapped for the selected property.Please map Entity and Location Ids before attempting to import."
                            });
                            dialog.show();
                            return false;
                        }
                        if (resp.data.exception.reasonFailed === "RPX_ERROR") {
                            dialog.update({
                                type: 'error',
                                showCancel: true,
                                showContinue: false,
                                title: "Cannot import G/L accounts",
                                question: '',
                                cancelButtonText: 'Close',
                                info: "Yardi Entity is not mapped to the selected property.Please map the Entity Ids before attemting to the import."
                            });
                            dialog.show();
                            return false;
                        }
                        if (resp.data.exception.reasonFailed === "ACCOUNTTYPE_NOT_SET") {
                            dialog.update({
                                type: 'error',
                                showCancel: true,
                                showContinue: false,
                                title: "Cannot import G/L accounts",
                                question: '',
                                cancelButtonText: 'Close',
                                info: "Assign the account type to save the GLs to Chart of Accounts."
                            });
                            dialog.show();
                            return false;
                        }
                        dialog.update({
                            type: 'error',
                            showCancel: true,
                            showContinue: false,
                            title: "Error",
                            question: '',
                            cancelButtonText: 'Close',
                            info: resp.data.exception.reasonFailed
                        });
                        dialog.show();
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                postCalled: false
            };

            return svc;
        };
    }

    angular
        .module("budgeting")
        .factory('httpServiceCall', ['$q', '$http', 'rpDialogModel', httpServiceCall]);
})(angular);
