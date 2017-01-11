﻿//  Budgeting Overview List Model

(function(angular) {
    "use strict";

    function lrSummaryMock() {



        var model = {};
        model.serviceGroupDetails = {

            "messageId": 200,
            "messageText": "Success",
            "totalRecords": 1,
            "records": {
                "monthlyOccupancyVacancy": [{
                        "distributedID": 1,
                        "periodNumber": 1,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "actualLeasesExpiring": 40.000,
                        "renewedLeasesExpiring": 160.000,
                        "budgetedMoveinsExpiring": 1648.0000,
                        "additionalLeasesExpiring": 3.000,
                        "totalLeasesExpiring": 12.000,
                        "leasesExpiredPreviousMonth": 185.0000,
                        "leaseRenewalPer": 120.000,
                        "leaseRenewals": 120.000,
                        "leaseRenewalMTMPer": 120.000,
                        "leaseRenewalMTM": 120.000,
                        "averageLeaseTerm": 1,
                        "moveoutsfromNonRenewals": 5,
                        "turnoverPer": 50,
                        "retention": 50
                    },
                    {
                        "distributedID": 2,
                        "periodNumber": 2,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "actualLeasesExpiring": 40.000,
                        "renewedLeasesExpiring": 160.000,
                        "budgetedMoveinsExpiring": 1648.0000,
                        "additionalLeasesExpiring": 3.000,
                        "totalLeasesExpiring": 12.000,
                        "leasesExpiredPreviousMonth": 185.0000,
                        "leaseRenewalPer": 120.000,
                        "leaseRenewals": 120.000,
                        "leaseRenewalMTMPer": 120.000,
                        "leaseRenewalMTM": 120.000,
                        "averageLeaseTerm": 1,
                        "moveoutsfromNonRenewals": 22,
                        "turnoverPer": 50,
                        "retention": 50
                    },
                    {
                        "distributedID": 3,
                        "periodNumber": 3,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "actualLeasesExpiring": 40.000,
                        "renewedLeasesExpiring": 160.000,
                        "budgetedMoveinsExpiring": 1648.0000,
                        "additionalLeasesExpiring": 3.000,
                        "totalLeasesExpiring": 12.000,
                        "leasesExpiredPreviousMonth": 185.0000,
                        "leaseRenewalPer": 120.000,
                        "leaseRenewals": 120.000,
                        "leaseRenewalMTMPer": 120.000,
                        "leaseRenewalMTM": 120.000,
                        "averageLeaseTerm": 1,
                        "moveoutsfromNonRenewals": 1,
                        "turnoverPer": 50,
                        "retention": 50
                    },
                    {
                        "distributedID": 4,
                        "periodNumber": 4,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "actualLeasesExpiring": 40.000,
                        "renewedLeasesExpiring": 160.000,
                        "budgetedMoveinsExpiring": 1648.0000,
                        "additionalLeasesExpiring": 3.000,
                        "totalLeasesExpiring": 12.000,
                        "leasesExpiredPreviousMonth": 185.0000,
                        "leaseRenewalPer": 120.000,
                        "leaseRenewals": 120.000,
                        "leaseRenewalMTMPer": 120.000,
                        "leaseRenewalMTM": 120.000,
                        "averageLeaseTerm": 1,
                        "moveoutsfromNonRenewals": 1,
                        "turnoverPer": 50,
                        "retention": 50
                    },
                    {
                        "distributedID": 5,
                        "periodNumber": 5,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "actualLeasesExpiring": 40.000,
                        "renewedLeasesExpiring": 160.000,
                        "budgetedMoveinsExpiring": 1648.0000,
                        "additionalLeasesExpiring": 3.000,
                        "totalLeasesExpiring": 12.000,
                        "leasesExpiredPreviousMonth": 185.0000,
                        "leaseRenewalPer": 120.000,
                        "leaseRenewals": 120.000,
                        "leaseRenewalMTMPer": 120.000,
                        "leaseRenewalMTM": 120.000,
                        "averageLeaseTerm": 1,
                        "moveoutsfromNonRenewals": 1,
                        "turnoverPer": 50,
                        "retention": 50
                    },
                    {
                        "distributedID": 6,
                        "periodNumber": 6,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "actualLeasesExpiring": 40.000,
                        "renewedLeasesExpiring": 160.000,
                        "budgetedMoveinsExpiring": 1648.0000,
                        "additionalLeasesExpiring": 3.000,
                        "totalLeasesExpiring": 12.000,
                        "leasesExpiredPreviousMonth": 185.0000,
                        "leaseRenewalPer": 120.000,
                        "leaseRenewals": 120.000,
                        "leaseRenewalMTMPer": 120.000,
                        "leaseRenewalMTM": 120.000,
                        "averageLeaseTerm": 1,
                        "moveoutsfromNonRenewals": 1,
                        "turnoverPer": 50,
                        "retention": 50
                    },
                    {
                        "distributedID": 7,
                        "periodNumber": 7,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "actualLeasesExpiring": 40.000,
                        "renewedLeasesExpiring": 160.000,
                        "budgetedMoveinsExpiring": 1648.0000,
                        "additionalLeasesExpiring": 3.000,
                        "totalLeasesExpiring": 12.000,
                        "leasesExpiredPreviousMonth": 185.0000,
                        "leaseRenewalPer": 120.000,
                        "leaseRenewals": 120.000,
                        "leaseRenewalMTMPer": 120.000,
                        "leaseRenewalMTM": 120.000,
                        "averageLeaseTerm": 1,
                        "moveoutsfromNonRenewals": 1,
                        "turnoverPer": 50,
                        "retention": 50
                    },
                    {
                        "distributedID": 8,
                        "periodNumber": 8,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "actualLeasesExpiring": 40.000,
                        "renewedLeasesExpiring": 160.000,
                        "budgetedMoveinsExpiring": 1648.0000,
                        "additionalLeasesExpiring": 3.000,
                        "totalLeasesExpiring": 12.000,
                        "leasesExpiredPreviousMonth": 185.0000,
                        "leaseRenewalPer": 120.000,
                        "leaseRenewals": 120.000,
                        "leaseRenewalMTMPer": 120.000,
                        "leaseRenewalMTM": 120.000,
                        "averageLeaseTerm": 1,
                        "moveoutsfromNonRenewals": 1,
                        "turnoverPer": 50,
                        "retention": 50
                    },
                    {
                        "distributedID": 9,
                        "periodNumber": 9,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "actualLeasesExpiring": 40.000,
                        "renewedLeasesExpiring": 160.000,
                        "budgetedMoveinsExpiring": 1648.0000,
                        "additionalLeasesExpiring": 3.000,
                        "totalLeasesExpiring": 12.000,
                        "leasesExpiredPreviousMonth": 185.0000,
                        "leaseRenewalPer": 120.000,
                        "leaseRenewals": 120.000,
                        "leaseRenewalMTMPer": 120.000,
                        "leaseRenewalMTM": 120.000,
                        "averageLeaseTerm": 1,
                        "moveoutsfromNonRenewals": 1,
                        "turnoverPer": 50,
                        "retention": 50
                    },
                    {
                        "distributedID": 10,
                        "periodNumber": 10,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "actualLeasesExpiring": 40.000,
                        "renewedLeasesExpiring": 160.000,
                        "budgetedMoveinsExpiring": 1648.0000,
                        "additionalLeasesExpiring": 3.000,
                        "totalLeasesExpiring": 12.000,
                        "leasesExpiredPreviousMonth": 185.0000,
                        "leaseRenewalPer": 120.000,
                        "leaseRenewals": 120.000,
                        "leaseRenewalMTMPer": 120.000,
                        "leaseRenewalMTM": 120.000,
                        "averageLeaseTerm": 1,
                        "moveoutsfromNonRenewals": 1,
                        "turnoverPer": 50,
                        "retention": 50
                    },
                    {
                        "distributedID": 11,
                        "periodNumber": 11,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "actualLeasesExpiring": 40.000,
                        "renewedLeasesExpiring": 160.000,
                        "budgetedMoveinsExpiring": 1648.0000,
                        "additionalLeasesExpiring": 3.000,
                        "totalLeasesExpiring": 12.000,
                        "leasesExpiredPreviousMonth": 185.0000,
                        "leaseRenewalPer": 120.000,
                        "leaseRenewals": 120.000,
                        "leaseRenewalMTMPer": 120.000,
                        "leaseRenewalMTM": 120.000,
                        "averageLeaseTerm": 1,
                        "moveoutsfromNonRenewals": 1,
                        "turnoverPer": 50,
                        "retention": 50
                    },
                    {
                        "distributedID": 12,
                        "periodNumber": 12,
                        "occupancyNumberOfUnits": 2,
                        "beginingOccupiedUnits": 10.3000,
                        "actualLeasesExpiring": 40.000,
                        "renewedLeasesExpiring": 160.000,
                        "budgetedMoveinsExpiring": 1648.0000,
                        "additionalLeasesExpiring": 3.000,
                        "totalLeasesExpiring": 12.000,
                        "leasesExpiredPreviousMonth": 185.0000,
                        "leaseRenewalPer": 120.000,
                        "leaseRenewals": 120.000,
                        "leaseRenewalMTMPer": 120.000,
                        "leaseRenewalMTM": 120.000,
                        "averageLeaseTerm": 1,
                        "moveoutsfromNonRenewals": 1,
                        "turnoverPer": 50,
                        "retention": 50
                    }
                ],

                "monthlyOccupancyVacancyReference": [{
                        "occupancyVacancyID": 0,
                        "totalMoveOuts": 2,
                        "serviceGroupID": 0,
                        "distributedID": 0,
                        "budgetModelID": 0,
                        "propertyID": 0,
                        "startDate": null,
                        "periodNumber": 1,
                        "beginingOccupiedUnits": 0,
                        "occupancyGoal": 0.0,
                        "moveins": 3,
                        "moveoutsSkipEviction": 0,
                        "endingOccupiedUnits": 0,
                        "occupancy": 88.0000,
                        "vacantUnits": 0,
                        "vacancy": 12.0000,
                        "occupancyTurnOverPercent": 4.0000,
                        "occupancyNumberOfUnits": 50,
                        "modelUnits": 0,
                        "adminUnits": 0,
                        "employeeUnits": 0,
                        "downUnits": 0,
                        "moveoutsNonRenewal": 0,
                        "netOccupancyChange": 0,
                        "previousTurnOverPercent": 0.0,
                        "previousNumberOfUnits": 0,
                        "previousMoveoutsNonRenewal": 0,
                        "previousMoveoutsSkipEviction": 0,
                        "previousEndingOccupiedUnits": 0,
                        'avgleaseterm': 0,
                        'leaseExpiring': 0,
                        'leaseRenewals': 0,
                        'leaseRenewalper': 0,
                        'leaseRenewalsMtm': 0,
                        'leaseRenewalMTMPer': 0,
                        'nonRenewingMoveouts': 0
                    },
                    {
                        "occupancyVacancyID": 0,
                        "totalMoveOuts": 3,
                        "serviceGroupID": 0,
                        "distributedID": 0,
                        "budgetModelID": 0,
                        "propertyID": 0,
                        "startDate": null,
                        "periodNumber": 2,
                        "beginingOccupiedUnits": 0,
                        "occupancyGoal": 0.0,
                        "moveins": 7,
                        "moveoutsSkipEviction": 0,
                        "endingOccupiedUnits": 0,
                        "occupancy": 96.0000,
                        "vacantUnits": 0,
                        "vacancy": 4.0000,
                        "occupancyTurnOverPercent": 6.0000,
                        "occupancyNumberOfUnits": 50,
                        "modelUnits": 0,
                        "adminUnits": 0,
                        "employeeUnits": 0,
                        "downUnits": 0,
                        "moveoutsNonRenewal": 0,
                        "netOccupancyChange": 0,
                        "previousTurnOverPercent": 0.0,
                        "previousNumberOfUnits": 0,
                        "previousMoveoutsNonRenewal": 0,
                        "previousMoveoutsSkipEviction": 0,
                        "previousEndingOccupiedUnits": 0,
                        'avgleaseterm': 0,
                        'leaseExpiring': 0,
                        'leaseRenewals': 0,
                        'leaseRenewalper': 0,
                        'leaseRenewalsMtm': 0,
                        'leaseRenewalMTMPer': 0,
                        'nonRenewingMoveouts': 0
                    },
                    {
                        "occupancyVacancyID": 0,
                        "totalMoveOuts": 1,
                        "serviceGroupID": 0,
                        "distributedID": 0,
                        "budgetModelID": 0,
                        "propertyID": 0,
                        "startDate": null,
                        "periodNumber": 3,
                        "beginingOccupiedUnits": 0,
                        "occupancyGoal": 0.0,
                        "moveins": 3,
                        "moveoutsSkipEviction": 0,
                        "endingOccupiedUnits": 0,
                        "occupancy": 82.0000,
                        "vacantUnits": 0,
                        "vacancy": 18.0000,
                        "occupancyTurnOverPercent": 2.0000,
                        "occupancyNumberOfUnits": 50,
                        "modelUnits": 0,
                        "adminUnits": 0,
                        "employeeUnits": 0,
                        "downUnits": 0,
                        "moveoutsNonRenewal": 0,
                        "netOccupancyChange": 0,
                        "previousTurnOverPercent": 0.0,
                        "previousNumberOfUnits": 0,
                        "previousMoveoutsNonRenewal": 0,
                        "previousMoveoutsSkipEviction": 0,
                        "previousEndingOccupiedUnits": 0,
                        'avgleaseterm': 0,
                        'leaseExpiring': 0,
                        'leaseRenewals': 0,
                        'leaseRenewalper': 0,
                        'leaseRenewalsMtm': 0,
                        'leaseRenewalMTMPer': 0,
                        'nonRenewingMoveouts': 0
                    },
                    {
                        "occupancyVacancyID": 0,
                        "totalMoveOuts": 0,
                        "serviceGroupID": 0,
                        "distributedID": 0,
                        "budgetModelID": 0,
                        "propertyID": 0,
                        "startDate": null,
                        "periodNumber": 4,
                        "beginingOccupiedUnits": 0,
                        "occupancyGoal": 0.0,
                        "moveins": 0,
                        "moveoutsSkipEviction": 0,
                        "endingOccupiedUnits": 0,
                        "occupancy": 82.0000,
                        "vacantUnits": 0,
                        "vacancy": 18.0000,
                        "occupancyTurnOverPercent": 0.0000,
                        "occupancyNumberOfUnits": 50,
                        "modelUnits": 0,
                        "adminUnits": 0,
                        "employeeUnits": 0,
                        "downUnits": 0,
                        "moveoutsNonRenewal": 0,
                        "netOccupancyChange": 0,
                        "previousTurnOverPercent": 0.0,
                        "previousNumberOfUnits": 0,
                        "previousMoveoutsNonRenewal": 0,
                        "previousMoveoutsSkipEviction": 0,
                        "previousEndingOccupiedUnits": 0,
                        'avgleaseterm': 0,
                        'leaseExpiring': 0,
                        'leaseRenewals': 0,
                        'leaseRenewalper': 0,
                        'leaseRenewalsMtm': 0,
                        'leaseRenewalMTMPer': 0,
                        'nonRenewingMoveouts': 0
                    },
                    {
                        "occupancyVacancyID": 0,
                        "totalMoveOuts": 0,
                        "serviceGroupID": 0,
                        "distributedID": 0,
                        "budgetModelID": 0,
                        "propertyID": 0,
                        "startDate": null,
                        "periodNumber": 5,
                        "beginingOccupiedUnits": 0,
                        "occupancyGoal": 0.0,
                        "moveins": 0,
                        "moveoutsSkipEviction": 0,
                        "endingOccupiedUnits": 0,
                        "occupancy": 82.0000,
                        "vacantUnits": 0,
                        "vacancy": 18.0000,
                        "occupancyTurnOverPercent": 0.0000,
                        "occupancyNumberOfUnits": 50,
                        "modelUnits": 0,
                        "adminUnits": 0,
                        "employeeUnits": 0,
                        "downUnits": 0,
                        "moveoutsNonRenewal": 0,
                        "netOccupancyChange": 0,
                        "previousTurnOverPercent": 0.0,
                        "previousNumberOfUnits": 0,
                        "previousMoveoutsNonRenewal": 0,
                        "previousMoveoutsSkipEviction": 0,
                        "previousEndingOccupiedUnits": 0,
                        'avgleaseterm': 0,
                        'leaseExpiring': 0,
                        'leaseRenewals': 0,
                        'leaseRenewalper': 0,
                        'leaseRenewalsMtm': 0,
                        'leaseRenewalMTMPer': 0,
                        'nonRenewingMoveouts': 0
                    },
                    {
                        "occupancyVacancyID": 0,
                        "totalMoveOuts": 0,
                        "serviceGroupID": 0,
                        "distributedID": 0,
                        "budgetModelID": 0,
                        "propertyID": 0,
                        "startDate": null,
                        "periodNumber": 6,
                        "beginingOccupiedUnits": 0,
                        "occupancyGoal": 0.0,
                        "moveins": 0,
                        "moveoutsSkipEviction": 0,
                        "endingOccupiedUnits": 0,
                        "occupancy": 82.0000,
                        "vacantUnits": 0,
                        "vacancy": 18.0000,
                        "occupancyTurnOverPercent": 0.0000,
                        "occupancyNumberOfUnits": 50,
                        "modelUnits": 0,
                        "adminUnits": 0,
                        "employeeUnits": 0,
                        "downUnits": 0,
                        "moveoutsNonRenewal": 0,
                        "netOccupancyChange": 0,
                        "previousTurnOverPercent": 0.0,
                        "previousNumberOfUnits": 0,
                        "previousMoveoutsNonRenewal": 0,
                        "previousMoveoutsSkipEviction": 0,
                        "previousEndingOccupiedUnits": 0,
                        'avgleaseterm': 0,
                        'leaseExpiring': 0,
                        'leaseRenewals': 0,
                        'leaseRenewalper': 0,
                        'leaseRenewalsMtm': 0,
                        'leaseRenewalMTMPer': 0,
                        'nonRenewingMoveouts': 0
                    },
                    {
                        "occupancyVacancyID": 0,
                        "totalMoveOuts": 0,
                        "serviceGroupID": 0,
                        "distributedID": 0,
                        "budgetModelID": 0,
                        "propertyID": 0,
                        "startDate": null,
                        "periodNumber": 7,
                        "beginingOccupiedUnits": 0,
                        "occupancyGoal": 0.0,
                        "moveins": 0,
                        "moveoutsSkipEviction": 0,
                        "endingOccupiedUnits": 0,
                        "occupancy": 82.0000,
                        "vacantUnits": 0,
                        "vacancy": 18.0000,
                        "occupancyTurnOverPercent": 0.0000,
                        "occupancyNumberOfUnits": 50,
                        "modelUnits": 0,
                        "adminUnits": 0,
                        "employeeUnits": 0,
                        "downUnits": 0,
                        "moveoutsNonRenewal": 0,
                        "netOccupancyChange": 0,
                        "previousTurnOverPercent": 0.0,
                        "previousNumberOfUnits": 0,
                        "previousMoveoutsNonRenewal": 0,
                        "previousMoveoutsSkipEviction": 0,
                        "previousEndingOccupiedUnits": 0,
                        'avgleaseterm': 0,
                        'leaseExpiring': 0,
                        'leaseRenewals': 0,
                        'leaseRenewalper': 0,
                        'leaseRenewalsMtm': 0,
                        'leaseRenewalMTMPer': 0,
                        'nonRenewingMoveouts': 0
                    },
                    {
                        "occupancyVacancyID": 0,
                        "totalMoveOuts": 0,
                        "serviceGroupID": 0,
                        "distributedID": 0,
                        "budgetModelID": 0,
                        "propertyID": 0,
                        "startDate": null,
                        "periodNumber": 8,
                        "beginingOccupiedUnits": 0,
                        "occupancyGoal": 0.0,
                        "moveins": 0,
                        "moveoutsSkipEviction": 0,
                        "endingOccupiedUnits": 0,
                        "occupancy": 82.0000,
                        "vacantUnits": 0,
                        "vacancy": 18.0000,
                        "occupancyTurnOverPercent": 0.0000,
                        "occupancyNumberOfUnits": 50,
                        "modelUnits": 0,
                        "adminUnits": 0,
                        "employeeUnits": 0,
                        "downUnits": 0,
                        "moveoutsNonRenewal": 0,
                        "netOccupancyChange": 0,
                        "previousTurnOverPercent": 0.0,
                        "previousNumberOfUnits": 0,
                        "previousMoveoutsNonRenewal": 0,
                        "previousMoveoutsSkipEviction": 0,
                        "previousEndingOccupiedUnits": 0,
                        'avgleaseterm': 0,
                        'leaseExpiring': 0,
                        'leaseRenewals': 0,
                        'leaseRenewalper': 0,
                        'leaseRenewalsMtm': 0,
                        'leaseRenewalMTMPer': 0,
                        'nonRenewingMoveouts': 0
                    },
                    {
                        "occupancyVacancyID": 0,
                        "totalMoveOuts": 0,
                        "serviceGroupID": 0,
                        "distributedID": 0,
                        "budgetModelID": 0,
                        "propertyID": 0,
                        "startDate": null,
                        "periodNumber": 9,
                        "beginingOccupiedUnits": 0,
                        "occupancyGoal": 0.0,
                        "moveins": 0,
                        "moveoutsSkipEviction": 0,
                        "endingOccupiedUnits": 0,
                        "occupancy": 82.0000,
                        "vacantUnits": 0,
                        "vacancy": 18.0000,
                        "occupancyTurnOverPercent": 0.0000,
                        "occupancyNumberOfUnits": 50,
                        "modelUnits": 0,
                        "adminUnits": 0,
                        "employeeUnits": 0,
                        "downUnits": 0,
                        "moveoutsNonRenewal": 0,
                        "netOccupancyChange": 0,
                        "previousTurnOverPercent": 0.0,
                        "previousNumberOfUnits": 0,
                        "previousMoveoutsNonRenewal": 0,
                        "previousMoveoutsSkipEviction": 0,
                        "previousEndingOccupiedUnits": 0,
                        'avgleaseterm': 0,
                        'leaseExpiring': 0,
                        'leaseRenewals': 0,
                        'leaseRenewalper': 0,
                        'leaseRenewalsMtm': 0,
                        'leaseRenewalMTMPer': 0,
                        'nonRenewingMoveouts': 0
                    },
                    {
                        "occupancyVacancyID": 0,
                        "totalMoveOuts": 0,
                        "serviceGroupID": 0,
                        "distributedID": 0,
                        "budgetModelID": 0,
                        "propertyID": 0,
                        "startDate": null,
                        "periodNumber": 10,
                        "beginingOccupiedUnits": 0,
                        "occupancyGoal": 0.0,
                        "moveins": 0,
                        "moveoutsSkipEviction": 0,
                        "endingOccupiedUnits": 0,
                        "occupancy": 82.0000,
                        "vacantUnits": 0,
                        "vacancy": 18.0000,
                        "occupancyTurnOverPercent": 0.0000,
                        "occupancyNumberOfUnits": 50,
                        "modelUnits": 0,
                        "adminUnits": 0,
                        "employeeUnits": 0,
                        "downUnits": 0,
                        "moveoutsNonRenewal": 0,
                        "netOccupancyChange": 0,
                        "previousTurnOverPercent": 0.0,
                        "previousNumberOfUnits": 0,
                        "previousMoveoutsNonRenewal": 0,
                        "previousMoveoutsSkipEviction": 0,
                        "previousEndingOccupiedUnits": 0,
                        'avgleaseterm': 0,
                        'leaseExpiring': 0,
                        'leaseRenewals': 0,
                        'leaseRenewalper': 0,
                        'leaseRenewalsMtm': 0,
                        'leaseRenewalMTMPer': 0,
                        'nonRenewingMoveouts': 0
                    },
                    {
                        "occupancyVacancyID": 0,
                        "totalMoveOuts": 0,
                        "serviceGroupID": 0,
                        "distributedID": 0,
                        "budgetModelID": 0,
                        "propertyID": 0,
                        "startDate": null,
                        "periodNumber": 11,
                        "beginingOccupiedUnits": 0,
                        "occupancyGoal": 0.0,
                        "moveins": 0,
                        "moveoutsSkipEviction": 0,
                        "endingOccupiedUnits": 0,
                        "occupancy": 82.0000,
                        "vacantUnits": 0,
                        "vacancy": 18.0000,
                        "occupancyTurnOverPercent": 0.0000,
                        "occupancyNumberOfUnits": 50,
                        "modelUnits": 0,
                        "adminUnits": 0,
                        "employeeUnits": 0,
                        "downUnits": 0,
                        "moveoutsNonRenewal": 0,
                        "netOccupancyChange": 0,
                        "previousTurnOverPercent": 0.0,
                        "previousNumberOfUnits": 0,
                        "previousMoveoutsNonRenewal": 0,
                        "previousMoveoutsSkipEviction": 0,
                        "previousEndingOccupiedUnits": 0,
                        'avgleaseterm': 0,
                        'leaseExpiring': 0,
                        'leaseRenewals': 0,
                        'leaseRenewalper': 0,
                        'leaseRenewalsMtm': 0,
                        'leaseRenewalMTMPer': 0,
                        'nonRenewingMoveouts': 0
                    },
                    {
                        "occupancyVacancyID": 0,
                        "totalMoveOuts": 0,
                        "serviceGroupID": 0,
                        "distributedID": 0,
                        "budgetModelID": 0,
                        "propertyID": 0,
                        "startDate": null,
                        "periodNumber": 12,
                        "beginingOccupiedUnits": 0,
                        "occupancyGoal": 0.0,
                        "moveins": 0,
                        "moveoutsSkipEviction": 0,
                        "endingOccupiedUnits": 0,
                        "occupancy": 82.0000,
                        "vacantUnits": 0,
                        "vacancy": 18.0000,
                        "occupancyTurnOverPercent": 0.0000,
                        "occupancyNumberOfUnits": 50,
                        "modelUnits": 0,
                        "adminUnits": 0,
                        "employeeUnits": 0,
                        "downUnits": 0,
                        "moveoutsNonRenewal": 0,
                        "netOccupancyChange": 0,
                        "previousTurnOverPercent": 0.0,
                        "previousNumberOfUnits": 0,
                        "previousMoveoutsNonRenewal": 0,
                        "previousMoveoutsSkipEviction": 0,
                        "previousEndingOccupiedUnits": 0,
                        'avgleaseterm': 0,
                        'leaseExpiring': 0,
                        'leaseRenewals': 0,
                        'leaseRenewalper': 0,
                        'leaseRenewalsMtm': 0,
                        'leaseRenewalMTMPer': 0,
                        'nonRenewingMoveouts': 0
                    }
                ]
            },
            "statusCode": 0

        };

        model.getServiceGroupDetails = function() {
            return model.serviceGroupDetails;
        };

        model.getRefDetails = function() {
            return model.monthlyOccupancyVacancyReference;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('lrSummaryMock', [
            lrSummaryMock
        ]);
})(angular);