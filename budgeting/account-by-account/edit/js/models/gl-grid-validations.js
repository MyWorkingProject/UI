//  gl Validation Model

(function (angular) {
    "use strict";

    function factory() {
        var model = {};

        model.ruleBasedValidation = function (column, row, rows, ruleType, ruleOperator, ruleAmount) {
            var isValid = true;
            if (row.data.calculationType == ruleType.toLowerCase()) {
                isValid = model.ruleOperatorBasedValidation(ruleOperator, row.data[column.key], ruleAmount);
            }
            return isValid;
        };

        model.ruleOperatorBasedValidation = function (actual, ruleOperator, expected) {
            var ruleViolate = false;
            switch (ruleOperator.toLowerCase()) {
            case "above":
                ruleViolate = model.isAbove(actual, expected);
                break;
            case "below":
                ruleViolate = model.isBelow(actual, expected);
                break;
            case "aboveorbelow":
                if (actual < 0) {
                    ruleViolate = model.isBelow(actual, -expected);
                }
                else {
                    ruleViolate = model.isAbove(actual, expected);
                }
                break;
            }
            return !ruleViolate;
        };

        model.ruleOperatorBasedValidationComment = function (actual,
            commentRule,
            commentRuleVolationMessageFormat,
            dollorOperatorText,
            percentageOperatorText,
            greaterThanText,
            lessThanText) {

            var type = "",
                condition = "",
                commentRuleVolationMessage = "";
            if (!commentRule.note || commentRule.note === "") {
                type = angular.lowercase(commentRule.type) === "dollor" ? dollorOperatorText : percentageOperatorText;

                switch (commentRule.operator.toLowerCase()) {
                case "above":
                    condition = greaterThanText;
                    break;
                case "below":
                    condition = lessThanText;
                    break;
                case "aboveorbelow":
                    if (actual < 0) {
                        condition = lessThanText;
                    }
                    else {
                        condition = greaterThanText;
                    }
                    break;
                }
                commentRuleVolationMessage = commentRuleVolationMessageFormat
                    .tokenReplace({
                        type: type,
                        actual: actual,
                        expected: commentRule.amount,
                        condition: condition
                    });
            }
            else {
                commentRuleVolationMessage = commentRule.note;
            }

            return commentRuleVolationMessage;
        };

        model.isAbove = function (actual, expected) {
            return expected < actual;
        };

        model.isBelow = function (actual, expected) {
            return expected > actual;
        };

        model.inBetween = function (actual, lowExpected, highExpected) {
            return lowExpected <= actual && highExpected >= actual;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("glGridValidations", [factory]);
})(angular);
