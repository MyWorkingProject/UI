// Occupancy Goal %

(function (angular) {
    "use strict";

    function occGoalPercentFactory($filter, occupancyGoalType, moment) {
        var modelOccupancyGoal = {
            budgetModelID: null,
            propertyID: null,
            startDate: null,
            goalPercentage: null,
            month: null,
            year: null,
            label: null
        };

        return function(occOpt, budgetModelDetails) {
            var gp = this;

            gp.propertyID = budgetModelDetails.propertyID;
            gp.budgetModelID = occOpt.getBudgetModelID();
            gp.startMonth = parseInt(budgetModelDetails.startMonth) - 1; //moment's month is index 0
            gp.budgetYear = budgetModelDetails.budgetYear;
            gp.startDate = moment().year(gp.budgetYear).month(gp.startMonth).date(1).format("M/D/YYYY") + " 12:00:00 AM";

            //model
            gp.type = "Monthly"; //occOpt.occupancyOption.occupancyGoalType;
            gp.display = null;
            gp.value = null; //annual value
            gp.percentages = null;

            gp.init = function() {
                //set occupancy goal percentages
                if(!occOpt.isSeniorLiving()) {
                    var modelOccupancyGoalList = occOpt.getOccupancyGoals(),
                        percentages = [];

                    if(budgetModelDetails !== null) {
                        for(var i=0, max=budgetModelDetails.noOfPeriods; i<max; i++) {
                            var curr = gp.getGoalPercentage(i);
                            percentages.push(curr);
                        }
                    }

                    if(modelOccupancyGoalList !== null && modelOccupancyGoalList.length > 0) {
                        if(occupancyGoalType.isAnnual(gp.type)) {
                            gp.value = modelOccupancyGoalList[0].goalPercentage;                        
                        } else if(occupancyGoalType.isMonthly(gp.type)) {                            
                            angular.forEach(modelOccupancyGoalList, function(curr) {
                                var match = $filter('filter')(percentages, { "month": curr.month }, true);
                                if(match && match.length > 0) {
                                    match[0].goalPercentage = curr.goalPercentage;
                                }                                
                            });              
                        }
                    } //else no value is assigned to occupancy goal;

                    gp.percentages = percentages;
                    
                }

                gp.changedGoalType();

                return gp;
            };

            gp.getGoalPercentage = function(month) {
                var currMonth = moment(gp.startDate, "MM/DD/YYYY HH:mm:ss A").add(month, "months");
                var goal = angular.copy(modelOccupancyGoal);
                    goal.budgetModelID = gp.budgetModelID;
                    goal.propertyID = gp.propertyID;
                    goal.startDate = gp.startDate;
                    goal.year = gp.budgetYear;
                    goal.month = currMonth.format("MMMM");
                    goal.label = currMonth.format("MMM YY");

                return goal;
            };       
        

            gp.changedGoalType = function() {
                var display = null;
                if(occupancyGoalType.isAnnual(gp.type)) {
                    if(gp.value === null) {
                        gp.value = 0;
                    }
                    display = gp.value + "% " + occupancyGoalType.ANNUALLY.name;                
                } else if(occupancyGoalType.isMonthly(gp.type)) {
                    display = occupancyGoalType.MONTHLY.name;
                } else {
                    display = occupancyGoalType.USE_REF_DATA.name;
                }

                gp.display = display;
            };

            gp.getGoalsParamData = function() {
                if(occupancyGoalType.isAnnual(gp.type)) {
                    var goal = gp.getGoalPercentage(0);
                        goal.goalPercentage = gp.value;
                    return [goal];
                } else if(occupancyGoalType.isMonthly(gp.type)) {
                    angular.forEach(gp.percentages, function(currGP) {
                        if(currGP.goalPercentage === null) {
                            currGP.goalPercentage = 0;
                        } else {
                            currGP.goalPercentage = parseFloat(currGP.goalPercentage);
                        }
                    });

                    return gp.percentages || [];
                }

                return [];
            };

            return gp.init();
        };

    }

    angular
        .module("budgeting")
        .factory("occupancyGoalPercent", [
            "$filter",
            "occupancyGoalType",
            "moment",
            occGoalPercentFactory
        ]);
})(angular);

