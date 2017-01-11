(function (angular) {
    "use strict";

    function factory(
        $filter,
        constant,
        content,
        preferencesSVC) {
        var model = {},
            rowConfig,
            prefName,
            rowOptions,
            sizeOptions,
            gridColumns;

        model.reset = function () {
            rowConfig = constant.getRowConfigs();
            prefName = 'leaseRenewalsUnitType';
            rowOptions = {
                title: content.gridRowOptionText,
                name: 'rowOptions',
                options: [{
                    key: 'show_reference_row',
                    isVisible: true,
                    title: content.gridShowReferenceRowText,
                    value: true
                }],
                itemType: 'checkbox',
                hasDivider: true
            };
            sizeOptions = {
                key: 'size_option',
                title: undefined,
                name: 'sizeOptions',
                selected: '',
                options: [{
                    title: content.gridShowSmallSizeText,
                    value: '',
                    isVisible: true
                },
                    {
                        title: content.gridShowLargeSizeTextText,
                        value: 'large',
                        isVisible: true
                    }
                ],
                itemType: 'radio',
                hasDivider: true
            };
            gridColumns = {
                title: content.gridShowColumnOptionTextText,
                name: 'gridColumns',
                options: [],
                itemType: 'checkbox',
                hasDivider: false
            };

            return model;
        };

        model.loadPreference = function () {
            return preferencesSVC.getPreferences({
                screenName: prefName
            }).$promise;
        };

        function getPreference(prefs, field) {
            var fields = $filter('filter')(prefs, {
                "fieldType": field.key
            }, true);
            if (fields.length > 0) {
                return fields[0].fieldValue;
            }
            return field.value;
        }

        model.restorePreference = function (prefs) {
            rowOptions.options[0].value = getPreference(prefs, rowOptions.options[0]) === "true";
            sizeOptions.selectedValue = getPreference(prefs, sizeOptions);
        };

        model.updatePreference = function () {
            var prefs = [];
            prefs.push({
                "screen": prefName,
                "fieldType": rowOptions.options[0].key,
                "fieldValue": rowOptions.options[0].value
            });
            prefs.push({
                "screen": prefName,
                "fieldType": sizeOptions.key,
                "fieldValue": sizeOptions.selectedValue
            });
            return preferencesSVC.updatePreferences(prefs);
        };

        model.getActiveLevel = function () {
            var level = 0;
            if (rowOptions.options[0].value) {
                level = rowConfig.referenceData.level;
            }
            return level;
        };

        model.updateRowOption = function (option, item) {
            if (option == item.options[0]) {
                item.options[0].value = option.value;
            }
        };

        model.getGridRowSize = function () {
            return sizeOptions.selected;
        };

        model.getColumnOptions = function () {
            return gridColumns.options;
        };

        // Getter
        /**
         * Gets List options used in grid settings
         * @return {object} list of options
         */
        model.getData = function () {
            return {
                rowOptions: rowOptions,
                sizeOptions: sizeOptions,
                gridColumns: gridColumns
            };
        };

        model.changed = function (option, item, items) {
            if (item.name === "rowOptions") {
                model.updateRowOption(option, item);
            }
        };

        // Setter
        model.setData = function (columns) {
            columns.forEach(function (column) {
                gridColumns.options.push({
                    key: column.key,
                    title: column.label + ' ' + column.year,
                    value: true,
                    isVisible: column.isDataColumn
                });
            });

            return model;
        };

        return model.reset();
    }

    angular
        .module("budgeting")
        .factory("renewalsGridOptionConfigModel", [
            '$filter',
            'renewalsUnitTypeConstantModel',
            'renewalsUnitTypeContentModel',
            'preferencesSVC',
            factory
        ]);
})(angular);