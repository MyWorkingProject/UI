//  Properties Grid
//  Responsible for combining the configuration and behavior of properties grid

(function (angular) {
    "use strict";

    function gridFactory(contractModel, gridConfig, cpConst, rpGridModel, glAcctListModel, i18n, propSvc, orderBy, $filter) {
        var grid = {},
            gridModel = null,
            noResultsMsg = i18n.translate("bdgt_new_contract_grid_empty");


        grid.init = function () {
            grid.model = gridModel = rpGridModel();
            gridModel.setConfig(gridConfig).setEmptyMsg(noResultsMsg);
            gridModel.subscribe('filterBy', grid.filterProperties);
            gridModel.subscribe('sortBy', grid.sortProperties);

            return grid;
        };

        grid.initStates = function(id) {
            grid.deletedProperties = [];
            grid.contractID = id || 0;            
            gridModel.contractState = contractModel.state; //used by grid templates
        };

        grid.editGLAccount = function(record) {
            record[cpConst.glSearch.isEdit] = true;
        };

        grid.setActiveProperty = function(record) {
            grid.activeProperty = record;
        };

        grid.deleteProperty = function() {
            var byeProperty = angular.copy(grid.activeProperty);
            gridModel.deleteRow("propertyID", byeProperty);

            //delete property from server if already existing in the server
            if(!byeProperty[cpConst.serverDataKey.vendorContractID]) { 
                byeProperty[cpConst.serverDataKey.isSelected] = false;
                grid.deletedProperties.push(byeProperty);
            }

            //delete property from list
            var selectedProps = grid.getSelectedProperties();
            for(var i=0, max=selectedProps.length; i<max; i++) {
                var curr = selectedProps[i];
                if(curr[cpConst.serverDataKey.propertyID] == byeProperty[cpConst.serverDataKey.propertyID]) {
                    selectedProps.splice(i, 1);
                    break;
                }
            }
            
            grid.activeProperty = null;
        };

        grid.setSrc = function (controller) {
            gridConfig.setSrc(controller);
        };

        grid.load = function () {
            var data = gridModel.busy(true).flushData().getQuery();
            propSvc.abort().getProperties(grid.contractID, data).then(grid.populateGrid);

            return angular.noop;
        };

        //populate grid with rows
        grid.populateGrid = function (response) {
            grid.propertiesList = grid.prepareList(response);
            gridModel.setData(grid.propertiesList).busy(false);
        };

        //add rows to an existing grid
        grid.appendToGrid = function (response) {
            var existingRecords = grid.getSelectedProperties(),
                appendRecords = [];

            //make sure that all properties are unique
            angular.forEach(response.data.records, function(currRecord) {
                var twinRecord = $filter('filter')(existingRecords, { 'propertyID': currRecord[cpConst.serverDataKey.propertyID] }, true); 
                if(twinRecord.length === 0) {
                    appendRecords.push(currRecord);
                }
            });

            if(appendRecords.length > 0) {
                appendRecords = grid.prepareList({
                    data: {
                        records: appendRecords
                    }
                });

                grid.propertiesList.records.concat(appendRecords.records);
                gridModel.addData(appendRecords).busy(false);
            } else {
                gridModel.busy(false);
            }
            
        };


        grid.setGLAccount = function(record, glAcctNum, glAcctDesc) {
            console.debug("Set: %s - %s", glAcctNum, glAcctDesc);
            console.debug(record);
            if(!record[cpConst.colKey.glAccount]) {
                record[cpConst.colKey.glAccount] = {};
            }
            record[cpConst.colKey.glAccount][cpConst.glSearch.acctNum] = record[cpConst.serverDataKey.glAcctNum] = glAcctNum;
            record[cpConst.colKey.glAccount][cpConst.glSearch.acctDesc] = record[cpConst.serverDataKey.glAcctDesc] = glAcctDesc;

            return record;
        };

        grid.prepareList = function(response) {
            var properties = response.data;

            angular.forEach(response.data.records, function (property) {
                //add typeahead for every row
                property[cpConst.colKey.glAccount] = {
                    masterchartID: property.masterChartID || 0,
                    siteID: property.propertyID || 0,
                    glAccountNumber: "",
                    glAccountDescription: ""
                };

                //assign selected GL Account if applicable
                if (property[cpConst.serverDataKey.glAcctNum] !== "") {
                    property[cpConst.colKey.glAccount][cpConst.glSearch.acctNum] = property[cpConst.serverDataKey.glAcctNum];
                    property[cpConst.colKey.glAccount][cpConst.glSearch.acctDesc] = property[cpConst.serverDataKey.glAcctDesc];
                }

                //set gl selector display for state new
                property[cpConst.glSearch.isEdit] = false;
                if(contractModel.isNew()) {
                    property[cpConst.glSearch.isEdit] = true;
                }

                property[cpConst.colKey.allocation] = property[cpConst.colKey.allocation] || 0;
                property[cpConst.colKey.deleteRow] = true;
            });
            
            return properties;
        };



        //set the state to hide/display filter
        grid.setGridFilterState = function (state) {
            gridModel.setFilterState(state);
            return grid;
        };

        //to get mastercharts selected
        grid.getChartsSelected = function () {
            var selected = grid.getSelectedProperties();
            return grid.getStrChartIDs(selected);
        };

        grid.getStrChartIDs = function (arr) {
            var charts = [];
            arr.forEach(function (item) {
                charts.push(item.masterChartID);
                // charts = charts + "" + item.masterChartID + ",";
            });

            // charts = charts.slice(0, -1);
            return charts.join(",");
        };

        grid.assignGlToProps = function (isOverwrite, data) {
            var checkedRows = grid.getSelectedProperties();

            if (isOverwrite) {
                data.forEach(function (item) {                    
                    var propsToUpdate = $filter('filter')(checkedRows, function (d) {
                        return d.masterChartID === item.masterChartID;
                    });
                    propsToUpdate.forEach(function (prop) {
                        grid.setGLAccount(prop, item.glAccountNumber, item.glAccountDescription);
                    });
                });
            }
            else {
                data.forEach(function (item) {
                    var propsToUpdate = $filter('filter')(checkedRows, function (d) {
                        return d.masterChartID === item.masterChartID;
                    });
                    propsToUpdate.forEach(function (prop) {
                        //assign value for empty GL Accounts only
                        if(!prop[cpConst.glAccount] || !prop[cpConst.glAccount].glAccountNumber || prop[cpConst.glAccount].glAccountNumber.length === 0) {
                            grid.setGLAccount(prop, item.glAccountNumber, item.glAccountDescription);                            
                        }
                    });
                });
            }
        };

        grid.isPropertiesDataValid = function () {
            if(!grid.propertiesList) {
                return {
                    isValid: false,
                    errMsg: "bdgt_properties_no_data"
                };
            }

            //Need to select atleast one property
            if (!grid.isPropsSelected()) {
                return {
                    isValid: false,
                    errMsg: "bdgt_properties_selection_error"
                };
            }
            //Need to validate allocation%
            if (!grid.isValidPercentage()) {
                return {
                    isValid: false,
                    errMsg: "bdgt_properties_percentage_error"
                };
            }
            //Need to validate glAccountsAssigned
            if (!grid.isValidGlSelection()) {
                return {
                    isValid: false,
                    errMsg: "bdgt_properties_gl_error"
                };
            }
            return {
                isValid: true
            };
        };

        grid.isPropsSelected = function () {          
            var checkedRows = grid.getSelectedProperties();
            if (checkedRows.length === 0) {
                return false;
            }
            return true;
        };

        grid.isValidPercentage = function () {
            var finalPercent = 0;
            var checkedRows = grid.getSelectedProperties();

            checkedRows.forEach(function (item) {
                finalPercent = finalPercent + parseFloat(item.percentage);
            });
            if (finalPercent !== 100) {
                return false;
            }
            return true;
        };

        grid.isValidGlSelection = function () {
            var checkedRows = grid.getSelectedProperties();

            for (var j = 0; j < checkedRows.length; j++) {
                if(!checkedRows[j].glAccount) {
                    return false;
                } else if (checkedRows[j].glAccount.glAccountNumber === "" || checkedRows[j].glAccount.glAccountNumber == "0") {
                    return false;
                }
            }

            return true;
        };

        grid.getPropertiesData = function () {
            //Return selected properties data with glAccountNumber as string and not object
            var selectedProps = grid.getSelectedProperties();
            selectedProps.forEach(function (item) {
                item[cpConst.serverDataKey.glAcctNum] = item.glAccount.glAccountNumber;
                item[cpConst.serverDataKey.glAcctDesc] = item.glAccount.glAccountDescription;
                item[cpConst.serverDataKey.isSelected] = true;
            });
            return selectedProps;
        };

        grid.getContractPropertyDelete = function () {            
            return gridModel.deletedProperties || []; //return deleted properties data;
        };

        grid.hasProperties = function() {
            if(!grid.propertiesList || !grid.propertiesList.records || grid.propertiesList.records.length === 0) {
                return false;
            }
            return true;
        };

        grid.reset = function() {
            gridModel.flushData();
            gridModel.contractState = null; 

            grid.contractID = 0;
            grid.propertiesList = null;
            grid.deletedProperties = null;
            grid.selectedProps = null;
        };

        grid.getSelectedProperties = function() {
            return grid.propertiesList.records;
        };

        //sorting is done in the client side due to probable unsaved data. 
        grid.sortProperties = function(sortOptions) {
            var gridContent = gridModel.busy(true).getData();
            if(gridContent && gridContent.records && gridContent.records.length > 1) {
                var sortCol = Object.keys(sortOptions)[0],
                    sortOrder = false;

                if(sortOptions[sortCol].toLowerCase() === "desc") {
                    sortOrder = true;
                }

                var getItemByType = function(obj) {
                    if(obj !== null) {
                        var val = obj[sortCol];
                        switch(sortCol) {
                            case cpConst.colKey.glAccount:
                                return val.glAccountNumber + " " + val.glAccountDescription;
                            case cpConst.colKey.allocation:
                                return parseFloat(val);
                            default:
                                return val;
                        }
                    }
                };

                gridContent.records = orderBy(gridContent.records, getItemByType, sortOrder);
                gridModel.setData(gridContent);
            }

            gridModel.busy(false);
        };

        //filtering is done in the client side due to probable unsaved data.
        grid.filterProperties = function(filterOptions) {
            gridModel.busy(true);

            var selectedProperties = grid.getSelectedProperties();
            if(selectedProperties && selectedProperties.length > 1) {
                var filteredRecords = $filter('filter')(selectedProperties, filterOptions);
                gridModel.setData({
                    records: filteredRecords
                });
            }

            gridModel.busy(false);            
        };

        return grid.init();
    }

    angular
        .module("budgeting")
        .factory("propertiesGridModel", [
                "contractModel",
                "propertiesGridConfigModel",
                "contractPropsConstantModel",
                "rpGridModel",
                "glAcctListModel",
                "contractTranslatorSvc",
                "contractPropertiesSvc",
                "orderByFilter",
                "$filter",
                gridFactory
        ]);

})(angular);