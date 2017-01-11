
(function (angular) {
    'use strict';

    function budgetYearFilters($resource) {
        var svc = {
            budgetYearUrl: '/api/budgeting/budgetmodel/budgetmodelyear'
          
        };

        
        svc.budgetYears = $resource(svc.budgetYearUrl); 
       

        return svc;
    }

     angular
        .module('budgeting')
        .factory('budgetYearFilters', ['$resource', budgetYearFilters]);
})(angular);
