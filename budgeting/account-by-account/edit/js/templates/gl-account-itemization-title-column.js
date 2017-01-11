﻿(function () {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "app/templates/gl-account-itemization-title-column.html";

    templateHtml = "" +
        '<div class="rp-cg-editable rp-input-text" ng-if="model.state.edit">' +
                '<input class="rp-cg-input-text rp-form-input" ' +
                    'ng-model="column.row.data[column.config.key]" />' +
                '<span class="rp-cg-text pointer delete-icon p-x-sm" ' +
                    'ng-if="!model.isFirstRowInGroup(column, row)" ' +
                    'ng-click="column.config.action.delete(column, row)"><i class="rp-icon-trash"></i></span>' +
                '<span class="rp-cg-text pointer add-icon p-x-sm" ' +
                    'ng-if="model.isFirstRowInGroup(column, row)" '+
                    'ng-click="column.config.action.add(column, row)"><i class="rp-icon-add"></i></span>' +
        '</div>' +
        '<div class="rp-cg-text rp-cg-body-text" ng-if="!model.state.edit">' +
            '{{column.row.data[column.config.key] }}' +
        '</div>';

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
})();