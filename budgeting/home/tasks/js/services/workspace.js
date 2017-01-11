//  Workspace Location Service

angular.module("budgeting").service('workspaceSvc', [
    function () {
        var workspaces = {
            "Budget Workflow Status": "budgetWorkflowStatus",
            "Contracts": "contracts",
            "Budgeting Tasks": "budget-tasks",
            "Budgeting Comments": "budgeting-comments"

        };

        return {
            goTo: function (name) {
                var url = '#/workspaces/';

                if (!workspaces[name]) {
                    logc('hash for ', name, ' was not found');
                    return '#/';
                }

                window.location.hash = url + workspaces[name];
            }
        };
    }
]);
