//  Sample Grid Model

(function (angular) {
    'use strict';

    function factory(
        baseFormConfig,
        menuConfig,
        inputConfig,
        content) {

        var model = baseFormConfig();

        model.copyCommentsModelName = menuConfig({
            id: "copyCommentsModelName",
            fieldName: "copyCommentsModelName",
            nameKey: "name",
            valueKey: "value",
            required: true,
            errorMsgs: [{
                name: "required",
                text: content.lblRequired
            }]
        });

        model.copyCommentsModelType = menuConfig({
            id: "copyCommentsModelType",
            fieldName: "copyCommentsModelType",
            nameKey: "name",
            valueKey: "value",
            onChange: model.methods.get("getCopyCommentsModelName")
        });

        return model;
    }
    angular
        .module('budgeting')
        .factory('copyCommentsFormConfig', [
            'baseFormConfig',
            'rpFormSelectMenuConfig',
            'rpFormInputTextConfig',
            'copyCommentsContentModel',
            factory]);
})(angular);
