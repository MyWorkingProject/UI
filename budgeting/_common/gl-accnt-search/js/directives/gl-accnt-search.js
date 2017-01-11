//  GL Accnt Srch Directive

(function(angular) {
    "use strict";

    function glAccntSearch($timeout, $document, glSearchSvc, langTranslate, $q, $http, eventStream) {
        function link(scope, elem, attr) {
            var dir = {},
                data = scope.data;

            var translate = langTranslate('glSearch').translate;
            //dir.translate = langTranslate('glSearch').translate;
            dir.selectGLText = translate('bdgt_glSrch_text');
            if (data.glAccountNumber !== "") {
                dir.intialGLAccnt = {
                    glAccountNumber: data.glAccountNumber,
                    accountCategoryID: 0,
                    glAccountDescription: data.glAccountDescription
                };
            }
            if (!data) {
                elem.remove();
                logc('glAccntSearch: model is undefined!');
            }

            dir.abortGetGLs =
                function() {
                    if (dir.getGLs) {
                        dir.getGLs.resolve();
                        dir.getGLs = undefined;
                    }
                    return dir;

                };

            dir.getQuery = function(json) {
                var query = [];
                angular.forEach(json, function(value, key) {
                    query.push("request." + key + "=" + value);
                });

                return "?" + query.join("&");
            };


            dir.getGLList = function(params) {
                var url = '/api/budgeting/coa/glaccountsearch' + dir.getQuery(params);
                dir.getGLs = $q.defer();

                return $http({
                    data: {},
                    method: 'GET',
                    url: url,
                    timeout: dir.getGLs.promise
                });
            };

            dir.getAccntGLList = function(params) {
                var url = '/api/budgeting/coa/accountbyaccount/glaccountsearch' + dir.getQuery(params);
                dir.getGLs = $q.defer();

                return $http({
                    data: {},
                    method: 'GET',
                    url: url,
                    timeout: dir.getGLs.promise
                });
            };


            dir.init = function() {
                dir.glList = [];
                //dir.glSrchSvc = angular.extend(glSearchSvc);
                scope.dir = dir;
                //dir.getGlAccount("");

            };

            dir.getGlAccount = function(srchText) {
                //if(srchText!==""){
                dir.glList = [];
                var params = {
                    masterchartID: data.masterchartID,
                    propertyID: data.siteID,
                    filterText: srchText,
                    resultsPerPage: 0
                };
                if(angular.isDefined(data.source) && data.source.toLowerCase() === "accountbyaccount"){
                    params = {
                            budgetModelID: data.budgetModelID,
                            propertyID: data.siteID,
                            filterText: srchText,
                            resultsPerPage: 100
                    };
                    dir.abortGetGLs().getAccntGLList(params).then(dir.assignGL, dir.handleError);
                }
                else{
                    dir.abortGetGLs().getGLList(params).then(dir.assignGL, dir.handleError);
                }
                //}
            };

            dir.assignGL = function(response) {
                dir.glList = response.data.records;
            };

            dir.onSelected = function(item) {
                data.glAccountNumber = item.glAccountNumber;
                data.accountCategoryID = item.accountCategoryID;
                data.glAccountDescription = item.glAccountDescription;
                data.accountCategoryName = item.accountCategoryName;
                //glSearchSvc.update(data);
                scope.onSelect({
                    selectedGLAccount: item
                });
            };

            dir.clearGL = function() {
                dir.intialGLAccnt = {};
                data.glAccountNumber = "";
                data.accountCategoryID = "";
                data.glAccountDescription = "";
                data.accountCategoryName = "";
            };

            dir.handleError = function(response) {
                //Need to handle errors
            };



            $timeout(function() {
                if (angular.isDefined(scope.isFocusedOnShow) && scope.isFocusedOnShow === "true") {
                    var $select = elem.find('.ui-select-container').controller('uiSelect');
                    $select.toggle();
                }

                if (angular.isDefined(scope.onBlurOut)) {
                    var onDocumentClick = function() {
                        $timeout(function() {
                            elem.find('.ui-select-container .ui-select-search').off('blur', onDocumentClick);
                            scope.onBlurOut();
                        }, 300);
                    };
                    elem.find('.ui-select-container .ui-select-search').on('blur', onDocumentClick);
                }
            });


            dir.init();

        }

        return {
            scope: {
                data: '=',
                onSelect: '&',
                onBlurOut: '&',
                isFocusedOnShow: '@'
            },
            link: link,
            restrict: 'E',
            //replace: true,
            templateUrl: "app/templates/gl-accnt-search.html"
        };
    }

    angular
        .module("budgeting")
        .directive('glAccntSearch', ['$timeout', '$document', 'glSearchSvc', 'appLangTranslate', '$q', '$http', 'eventStream', glAccntSearch]);
})(angular);