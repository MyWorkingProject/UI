//  Config Resolve Module

(function(angular) {
    "use strict";

    function config(resolveModule) {
        var resolve = {};
        resolve.currentBudgetDetails = ["$state", "$stateParams", "budgetDetails",
            function($state, $stateParams, budgetDetails) {
                return budgetDetails
                    .load($stateParams.distID)
                    .catch(function() {
                        return $state.go('error', { errorCode: 404 });
                    });
            }
        ];

        resolve.authUserDriverAccess = ["$q", "$state", "$stateParams", "budgetDriverAccessModel",
            function($q, $state, $stateParams, budgetDriverAccess) {
                var driverCode = $stateParams.driverCode;
                return budgetDriverAccess
                    .canUserAccess($stateParams.distID, driverCode)
                    .catch(function() {
                        return $state.go('error', {
                            errorCode: 401
                        });
                    });
            }
        ];
        resolveModule.setResolve(resolve);
    }

    angular
        .module("budgeting")
        .config(["rpResolveModuleProvider", config]);
})(angular);

// Commented for reference purposes
// Can be deleted when revision is
// complete

// //  Configure Resource Paths

// (function (angular) {
//     "use strict";

//     function config(resolveModule) {
//         var cfg = {
//             budgeting: {
//                 admin: {
//                     base: []
//                 },

//                 coaSetup: {
//                     base: [],
//                     categories: [],
//                     cloneMasterchart: [],
//                     defaultAdjustment: [],
//                     editMasterchart: ['js', 'css'],
//                     importCategory: [],
//                     import: [],
//                     manageGlAccount: [],
//                     mastercharts: [],
//                     newMasterchart: [],
//                     propertyChart: []
//                 },

//                 common: {
//                     adminhome: ['js'],
//                     standalone: ['js']
//                 },

//                 home: {
//                     base: ['css', 'js'],
//                     modelWidget:[]
//                 },

//                 workspaces: {
//                     base: ['css', 'js'],
//                     budgetWorkflowStatus: [],
//                     contracts: [],
//                     newContract: [],
//                     budgetTasks: [],
//                     taskBudgetModel: [],
//                     taskBudgetUser: [],
//                     budgetComments:[]
//                 },

//                 budgetmodel: {
//                     base: ['css', 'js'],
//                     overview: ['css', 'js'],
//                     workflow: ['css', 'js'],
//                     reports:[]
//                 }
//             }
//         };

//         resolveModule.setConfig(cfg);
//     }

//     angular
//         .module("budgeting")
//         .config(['resolveModuleProvider', config]);
// })(angular);
