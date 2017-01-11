//  Workspace Table Model

(function (angular) {
    "use strict";

    function factory(session, workspaceView, tableModel, groupedTableModel) {
        return function () {
            var model, grouped, build;

            grouped = session.get().siteName == 'All My Properties';
            model = grouped ? groupedTableModel() : tableModel();
            model.grouped = grouped;
            build = model.build;

            if (!grouped) {
                model.pagination.style = workspaceView;
            }

            model.build = function () {
                build();

                if (grouped) {
                    model.groups.forEach(function (group) {
                        group.busyModel.style = workspaceView;
                        group.pagination.style = workspaceView;
                    });
                }

                return model;
            };

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory('workspaceTableModel', [
            'session',
            'workspaceView',
            'rpDataTableModel',
            'rpGroupedTableModel',
            factory
        ]);
})(angular);
