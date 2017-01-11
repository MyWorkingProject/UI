(function (angular) {
    "use strict";

    function factory(
        $filter,langTranslate, mrModel, preferencesSVC
      ) {
        var model = {},
            rowConfig,
            prefName,
            rowOptions,
            sizeOptions,
            gridColumns;
        var translate;
        translate = langTranslate('market-rent').translate; 

        model.reset = function(){
            //rowConfig = glEditConstant.getRowConfigs();
            prefName = 'marketRent';
            if(!mrModel.isMarketRent()){
                 prefName = "scheduleRent";
            }
            rowOptions = {
                title: translate('bdgt_rental_mr_row_optn_lable'),
                name: 'rowOptions',
                options: [{
                    key: 'showReferenceData',
                    isVisible: true,
                    title: translate('bdgt_rental_mr_row_optn_SR_lable'),
                    value: false
                    }, {
                    key: 'showReferenceCalcData',
                    title: translate('bdgt_rental_mr_row_optn_SC_lable'),
                    isVisible: true,
                    value: false
                    }],
                itemType: 'checkbox',
                hasDivider: true
            };
            sizeOptions = {
                key: 'rowHeightClass',
                title: undefined,
                name: 'sizeOptions',
                selected: '',
                options: [{
                        title: translate('bdgt_rental_mr_row_optn_SRS_lable'),
                        value: '',
                        isVisible: true
                        },
                    {
                        title: translate('bdgt_rental_mr_row_optn_LRS_lable'),
                        value: 'large',
                        isVisible: true
                    }],
                itemType: 'radio',
                hasDivider: true
            };
            gridColumns = {
                title: translate('bdgt_rental_mr_col_optn_lable'),
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
            rowOptions.options[1].value = getPreference(prefs, rowOptions.options[1]) === "true";
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

        model.updateRowOption = function (option, item) {
            if (option == item.options[0] && !option.value) {
                item.options[1].value = false;
            }
            if (option == item.options[1] && option.value) {
                item.options[0].value = true;
            }
        };

        model.getGridRowSize = function () {
            return sizeOptions.selected;
        };

        model.getActiveLevel = function () {
        /*    var level = 0;
            if (rowOptions.options[0].value) {
                level = rowConfig.referenceData.level;
            }
            if (rowOptions.options[1].value) {
                level = rowConfig.referenceDataDetail.level;
            }
            return level; */
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
            gridColumns.options = [];
            columns.forEach(function (column) {
                gridColumns.options.push({
                    key: column.key,
                    title: column.colName ,
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
        .factory("mrGridOptionConfigModel", [
            '$filter', 'appLangTranslate', 'MarketRentModel', 'preferencesSVC',
            factory
            ]);
})(angular);
