//  SampleCg Service

(function (angular) {
    'use strict';
  
    function sampleMonthlySvc($resource) {
        return $resource('/api/budgeting/account-by-account-monthly');
    }

    angular
        .module('budgeting')
        .factory('sampleMonthlySvc', ['$resource', sampleMonthlySvc]);
})(angular);



//  SampleCg Service

(function (angular) {
    'use strict';
  
    function sampleSummarySvc($resource) {
        return $resource('/api/budgeting/account-by-account-summary');
    }

    angular
        .module('budgeting')
        .factory('sampleSummarySvc', ['$resource', sampleSummarySvc]);
})(angular);


//  SampleCg Service

(function (angular) {
    'use strict';
  
    function sampleQuaterlySvc($resource) {
        return $resource('/api/budgeting/account-by-account-quaterly');
    }

    angular
        .module('budgeting')
        .factory('sampleQuaterlySvc', ['$resource', sampleQuaterlySvc]);
})(angular);
