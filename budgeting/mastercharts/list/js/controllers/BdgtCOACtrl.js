//  Home Controller

(function (angular) {
    "use strict";

    function BdgtMasterChartsCtrl($scope, tableHeadModel, dataTableModel) {
        $scope.backlink = "Budgeting Administration";
        $scope.backhref = "#/admin";
        $scope.tableModel = dataTableModel();
        $scope.tableModel.body.className = "rp-table-body-2";
        var model = tableHeadModel();
        //tableModel.sortBy.key = "roleName";
        //vm.setTableHeaders();
        var headers = [{
            text: 'Name',
            name: 'Name',
            isSortable: false,
            className: 'action'
                }, {
            text: 'Is Alternative',
            name: 'IsAlternative',
            isSortable: false,
            className: 'name',
            key: 'IsAlternative'
                }, {
            text: 'Mapped To',
            name: 'MappedTo',
            isSortable: false,
            className: 'type'
                }, {
            text: 'Last Edited By',
            name: 'LastEditedBy',
            isSortable: false,
            className: 'type'
                }, {
            text: 'Last Edited Date',
            name: 'LastEditedDate',
            isSortable: false,
            className: 'type'
                }];
        model.setHeaders(headers);
        $scope.tableModel.addHeader(model);
        $scope.setColumns = function (row) {
            logc("Entered setColumns : " + row);
            return [{
                key: 'Name',
                type: 'link',
                text: row.Name,
                className: 'link-cell name',
                href: '#'
	            }, {
                key: 'IsAlternative',
                // text: row.isTemplate ? translate('ad_roletype_template') : translate('ad_roletype_custom'),
                text: row.IsAlternative,
                className: 'type is-template',
	            }, {
                key: 'MappedTo',
                // text: row.isTemplate ? translate('ad_roletype_template') : translate('ad_roletype_custom'),
                text: row.MappedTo,
                className: 'type is-template',
	            }, {
                key: 'LastEditedBy',
                // text: row.isTemplate ? translate('ad_roletype_template') : translate('ad_roletype_custom'),
                text: row.LastEditedBy,
                className: 'type is-template',
	            }, {
                key: 'LastEditedDate',
                // text: row.isTemplate ? translate('ad_roletype_template') : translate('ad_roletype_custom'),
                text: row.LastEditedDate,
                className: 'type is-template',
	            }];
        };
        $scope.tableModel.setMajorKey('records').setColumns = $scope.setColumns;
        var records = {
            "records": [
                {
                    "Name": "Dummy Name 1",
                    "IsAlternative": "Yes",
                    "MappedTo": "HUD",
                    "LastEditedBy": "Aditya",
                    "LastEditedDate": "06/07/2015"
							 	},
                {
                    "Name": "Dummy Name 2",
                    "IsAlternative": "No",
                    "MappedTo": "HUD2",
                    "LastEditedBy": "Rohith",
                    "LastEditedDate": "06/07/2015"
							 	}]
        };
        $scope.tableModel.setTableData(records);
        $scope.tableModel.setEmptyMessage("No data is available");
        $scope.tableModel.build();
    }

    angular
        .module("budgeting")
        .controller('BdgtMasterChartsCtrl', ['$scope', 'rpTableHeadModel', 'rpDataTableModel', BdgtMasterChartsCtrl]);
})(angular);
