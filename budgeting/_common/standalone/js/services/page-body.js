//  Page Body Service

angular.module("budgeting").service('pageBodySvc', ['watchable',
    function (watchable) {
        var showPage = watchable(true);

        return {
            showPage: showPage
        };
    }
]);
