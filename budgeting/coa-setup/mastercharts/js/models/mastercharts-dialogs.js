//  Users List Dialogs Model

(function (angular) {
    "use strict";

    function factory(dialogModel,actionsModel) {
        var model = {};

        model.dialog = dialogModel();

        model.subscribe = function () {
            var obj = model.dialog,
                fn = model.dialog.subscribe;
            fn.apply(obj, arguments);
        };

        model.confirmDeleteMasterchart = function () {
            var options = {
                type: 'warn',
                showCancel: true,
                showContinue: true,
                continueButtonText: actionsModel.getDeleteButtonText(),
                title: actionsModel.getDelDialogTitle(),
                question: actionsModel.getDelDialogQues(),
                info: actionsModel.getDelDialogInfo()
            };

            model.dialog.update(options).show();
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('masterchartDialogs', ['rpDialogModel','masterchartListActions', factory]);
})(angular);
