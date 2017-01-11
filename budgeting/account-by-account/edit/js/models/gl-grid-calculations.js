//  GL Grid Filters Model

(function(angular) {
    "use strict";

    function factory(
        $filter,
        bmGridCalculation,
        glEditConstant) {
        var model  = angular.extend({}, bmGridCalculation),
            referenceCalculationRowConfig = glEditConstant.getReferenceCalculationRowConfigs(),
            rowConfig = glEditConstant.getRowConfigs();
   
        model.getReferenceDiffPerType = function(column, row, rows, noOfUnits) {
            var glAccountRow = $filter('filter')(rows, {
                    groupID: rowConfig.glAccount.groupID
                }, true).first(),
                referenceTypeRow = $filter('filter')(rows, {
                    groupID: rowConfig.referenceData.groupID,
                    level: rowConfig.referenceData.level,
                    rowID: row.data.referenceTypeId
                }, true).first(),
                glAccountVal = 0,
                referenceTypeVal = 0,
                total = 0;

            if (referenceTypeRow && glAccountRow) {
                glAccountVal = glAccountRow[column.key];
                referenceTypeVal = referenceTypeRow[column.key];
                switch (row.data.calculationType) {
                    case referenceCalculationRowConfig.dollor.calculationType:
                        total = glAccountVal - referenceTypeVal;
                        break;
                    case referenceCalculationRowConfig.percentage.calculationType:
                        if (referenceTypeVal !== 0) {
                            total = (glAccountVal - referenceTypeVal) / Math.abs(referenceTypeVal) * 100;
                        }
                        break;
                    case referenceCalculationRowConfig.unit.calculationType:
                        if (noOfUnits !== 0) {
                            total = (glAccountVal - referenceTypeVal) / Math.abs(noOfUnits);
                        }
                        break;
                }
            }
            return total;
        };

        model.getCalculatedTotalByType = function(column, row, rows, ruleType) {
            var calculatedRows = $filter('filter')(rows, {
                groupID: rowConfig.referenceData.groupID,
                level: row.data.level,
                referenceTypeId: row.data.referenceTypeId,
                calculationType: ruleType.toLowerCase()
            }, true);
            return calculatedRows.length > 0 ? calculatedRows[0][column.key] : null;
        };

        model.getGLTotal = function(column, row, rows) {
            var total = 0;
            if (!column.isEditable) {
                return row.data[column.key];
            }
            rows.forEach(function(row, index) {
                if (row.groupID === rowConfig.itemization.groupID ||
                    row.groupID === rowConfig.customWorksheetItemized.groupID ||
                    row.groupID === rowConfig.defaultAdjustment.groupID ||
                    row.groupID === rowConfig.workSheet.groupID) {
                    total += parseFloat(row[column.key], 10) || 0;
                }
            });
            // Todo: row.getGroupID() == rowConfig.glAccount.groupID -> use this to update using base on glAccount 
            if (row.getGroupID() == rowConfig.glAccountGroup.groupID ||
                row.getGroupID() == rowConfig.glAccountType.groupID) {
                if (!row.data.hasOwnProperty("base" + column.key)) {
                    row.data["base" + column.key] = row.data[column.key] - total;
                }
                total += row.data["base" + column.key];
            }

            return total;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('glGridCalculations', [
            '$filter',
            "bmGridCalculationModel",
            'glEditConstantModel',
            factory
        ]);
})(angular);
