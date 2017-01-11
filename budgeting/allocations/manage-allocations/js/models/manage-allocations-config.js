// Hap voucher all Config Model

(function (angular) {
    "use strict";

    function factory(actions, gridConfig, appTranslate) {

        var model = gridConfig(),
            translate = appTranslate('allocations.manage-allocations').translate;

        model.get = function () {
            var cols = [];
            cols = [
                {
                    key: 'action',
                    type: 'actionsMenu',
                    getActions: actions.get
                },
                {
                    key: 'name',
                    type: 'custom',
                    templateUrl: 'app/templates/allocations-modifiedby.html',
                    method: model.getMethod('navigateto')
                },
                {
                    key: 'description'
                },
                {
                    key: 'lastModifiedBy',
                    type: 'custom',
                    templateUrl: 'app/templates/allocations-modifiedby.html'
                }
            ];
            return cols;
        };

        model.getHeaders = function () { //
            var headers = [];
            headers = [
                {
                    key: 'action',
                    text: 'Action'
                    //text: translate('select')
                },
                {
                    key: 'name',
                    text: 'Name',
                    isSortable: true
                    //text: translate('Name')
                },
                {
                    key: 'description',
                    text: 'Description',
                    isSortable: true
                    //text: translate('lastDistributedBy')
                },
                {
                    key: 'lastModifiedBy',
                    text: 'Last Modified',
                    isSortable: true
                    //text: translate('lastDistributedBy')
                }];
            return [headers];
        };

        model.getFilters = function () {
            return [
                   {
                       key: 'action'
                   },
                   {
                       key: 'name',
                       type: 'text',
                       placeholder: translate('plName')
                   },
                   {
                       key: 'description',
                       type: 'text',
                       placeholder: translate('plDescription')
                   },
                   {
                       key: 'lastModifiedBy',
                       type: 'text',
                       placeholder: translate('pllastDistributedBy')
                   }];

        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('allocationsConfig', ['manageAllocationActions', 'rpGridConfig', 'appLangTranslate', factory]);
})(angular);
