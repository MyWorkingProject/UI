// Advance actuals form config
(function (angular) {
    'use strict';

    function factory(baseFormConfig,
        menuConfig) {
        var model = baseFormConfig();

        model.advanceActuals = menuConfig({
            id: 'selectMonth',
            fieldName: 'selectMonth',
            nameKey: 'name',
            valueKey: 'value',
        });
        return model;
    }

    angular
        .module('budgeting')
        .factory('advanceActualsFormConfig', [
            'baseFormConfig',
            'rpFormSelectMenuConfig',
            factory
        ]);
})(angular);
