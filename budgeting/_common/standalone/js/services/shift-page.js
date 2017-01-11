//  Shift Page Service

angular.module("budgeting").service('shiftPageSvc', [
    function () {
        var marginLeft = 0;

        return {
            shiftLeft: function (shiftLeftBy) {
                marginLeft = shiftLeftBy;
            },

            getLeftMargin: function () {
                return marginLeft;
            }
        };
    }
]);
