(function(angular) {
    "use strict";

    function factory(
        $filter,
        sgworksheetConstant, //glEditConstant,
        sgworksheetContent, // sgworksheetContent,
        preferencesSVC) {
        var model = {},
            rowConfig,
            prefName,
            rowOptions,
            sizeOptions,
            gridColumns;

        model.reset = function() {
            rowConfig = sgworksheetConstant.getRowConfigs();
            prefName = 'occupancyVacanyServiceGroup';
            rowOptions = {
                title: sgworksheetContent.gridRowOptionText,
                name: 'rowOptions',
                options: [{
                    key: 'show_reference_row',
                    isVisible: false,
                    title: sgworksheetContent.gridShowReferenceRowText,
                    value: false
                }, {
                    key: 'show_calculation_row',
                    title: sgworksheetContent.gridShowCalculatedRowText,
                    isVisible: false,
                    value: false
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
                        title: sgworksheetContent.gridShowSmallSizeText,
                        value: '',
                        isVisible: true
                    },
                    {
                        title: sgworksheetContent.gridShowLargeSizeTextText,
                        value: 'large',
                        isVisible: true
                    }
                ],
                itemType: 'radio',
                hasDivider: true
            };
            gridColumns = {
                title: sgworksheetContent.gridShowColumnOptionTextText,
                name: 'gridColumns',
                options: [],
                itemType: 'checkbox',
                hasDivider: false
            };

            return model;
        };

        model.loadPreference = function() {
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

        model.restorePreference = function(prefs) {
            rowOptions.options[0].value = getPreference(prefs, rowOptions.options[0]) === "true";
            rowOptions.options[1].value = getPreference(prefs, rowOptions.options[1]) === "true";
            sizeOptions.selectedValue = getPreference(prefs, sizeOptions);
        };

        model.updatePreference = function() {
            var prefs = [];
            prefs.push({
                "screen": prefName,
                "fieldType": rowOptions.options[0].key,
                "fieldValue": rowOptions.options[0].value
            });
            prefs.push({
                "screen": prefName,
                "fieldType": rowOptions.options[1].key,
                "fieldValue": rowOptions.options[1].value
            });
            prefs.push({
                "screen": prefName,
                "fieldType": sizeOptions.key,
                "fieldValue": sizeOptions.selectedValue
            });
            return preferencesSVC.updatePreferences(prefs);
        };

        model.updateRowOption = function(option, item) {
            if (option == item.options[0] && !option.value) {
                item.options[1].value = false;
            }
            if (option == item.options[1] && option.value) {
                item.options[0].value = true;
            }
        };

        model.getGridRowSize = function() {
            return sizeOptions.selected;
        };

        model.getActiveLevel = function() {
            var level = 0;
            if (rowOptions.options[0].value) {
                level = rowConfig.referenceData.level;
            }
            if (rowOptions.options[1].value) {
                level = rowConfig.referenceDataDetail.level;
            }
            return level;
        };

        model.getColumnOptions = function() {
            return gridColumns.options;
        };

        // Getter
        /**
         * Gets List options used in grid settings
         * @return {object} list of options
         */
        model.getData = function() {
            return {
                rowOptions: rowOptions,
                sizeOptions: sizeOptions,
                gridColumns: gridColumns
            };
        };

        model.changed = function(option, item, items) {
            if (item.name === "sizeOptions") {
                model.updateRowOption(option, item);
            }
        };

        // Setter
        model.setData = function(columns) {
            columns.forEach(function(column) {
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
        .factory("serviceGridOptionConfigModel", [
            '$filter',
            'sgworksheetConstantModel',
            'sgworksheetContentModel',
            'preferencesSVC',
            factory
        ]);
})(angular);