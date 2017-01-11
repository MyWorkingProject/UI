(function (angular) {
    "use strict";

    function categoriesSVC($resource) {
        var svc, url, deferred, postUrl, getUrl;
        var defaults = {};
        /*  url = '/api/budgeting/coa/masterchart/new';
          postUrl = '/api/budgeting/coa/masterchart/accountcategory/save/';
          getUrl = '/api/budgeting/coa/masterchart/accountcategory/';

          svc = {
              abort: function () {
                  if (deferred && deferred.resolve) {
                      deferred.resolve();
                  }
                  return svc;

              },

              put: function (data) {
                  deferred = $q.defer;
                  return $http({
                      data: data,
                      method: 'PUT',
                      url: url,
                      timeout: deferred.promise
                  });
              },

              get: function (id) {
                  deferred = $q.defer();

                  return $http({
                      url: getUrl + id,
                      method: 'GET',
                      timeout: deferred.promise
                  });
              },
              post: function (data, chartID) {
                  deferred = $q.defer();
                  //postUrl=postUrl+chartID;
                  return $http({
                      url: postUrl + chartID,
                      data: data,
                      method: 'POST',
                      timeout: deferred.promise
                  });
              }

          };

          return svc;*/
        function updateWizStep() {
            var url, actions;
            url = '/api/budgeting/common/wizard/wizardstatus';
            actions = {
                post: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }

        function getCOARowData() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/:chartID/coareportrow';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        chartID: 123456
                    }
                }
            };

            return $resource(url, defaults, actions);
        }

        function saveCOARows() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/:chartID/coareportrow';
            actions = {
                post: {
                    method: 'PUT',
                    params: {
                        chartID: 123456
                    }
                }
            };

            return $resource(url, defaults, actions);
        }

        function getAccountTypeList() {
            var url, actions;
            url = '/api/budgeting/coa/accounttype/accounttypecombo';
            actions = {
                get: {
                    method: 'GET'
                }
            };

            return $resource(url, defaults, actions);
        }

        function getAccountCategoryList() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/:chartID/accounttype/:accounttypeID/accountcategorycombo';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        chartID: 123456,
                        accounttypeID: 456789
                    }
                }
            };

            return $resource(url, defaults, actions);
        }

        return {
            getCOARowData: getCOARowData().get,
            saveCOARows: saveCOARows().post,
            updateWizStep: updateWizStep().post,
            getAccountTypeList: getAccountTypeList().get,
            getAccountCategoryList: getAccountCategoryList().get
        };
    }

    angular
        .module("budgeting")
        .factory('categoriesSVC', ['$resource', categoriesSVC]);

})();
