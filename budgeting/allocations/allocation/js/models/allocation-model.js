//  Budgeting allocation distribution MODEL
(function (angular) {
    "use strict";
    function factory(langTranslate, formConfig, allocationAmountSvc, $filter) {
        var model = {}, translate = langTranslate('allocationEdit').translate;
        model.getKeyVal = function (key) {
            return translate(key);
        };
      
        model.copyData = {};
        model.formdata = [{ 'value': 1, text: translate('method_equally') },
                              { 'value': 2, text: translate('method_inputamount') },
                              { 'value': 3, text: translate('method_percentage') },
                              { 'value': 4, text: translate('method_units') },
                              { 'value': 5, text: translate('method_sqftg') }
        ];       
        model.setOptions = function () {
            formConfig
              .setOptions("source", model.formdata);

        };  
       
        model.formData = { isEdit: false, isView: false, isNew: false, methodName: 1, allocation_name: translate('form_allocaton_newName'),isProperty:false };
    
        angular.copy(model.formData, model.copyData);

        model.pageload = function (allocationId, allocationType, amountGridModel, allocationData) {
            var IsEdit = allocationType === 'view' ? false : (allocationType === 'edit' || allocationType === 'copy'  ? true : false);
            allocationId = parseInt(allocationId);
            if (allocationId > 0 && IsEdit) {
                model.formData.isEdit = true;
            }
            else if (allocationId > 0 && !IsEdit) {
                model.formData.isView = true;
            }
            else if (allocationId === 0 && !IsEdit) {
                model.formData.isNew = true;
                amountGridModel.grid.edit(true);
            }
            if (!model.formData.isNew) {
                //var allocationData = allocationAmountSvc.getAllocationDetails(allocationId).records;
                model.formData.allocation_name = allocationType === 'copy' ? 'copy of ' + allocationData.name : allocationData.name;
                model.formData.methodName = model.getMethodID(allocationData.method);
                model.formData.allocation_description = allocationData.description;
                model.formData.method = allocationData.method;
            }
        };

        model.getMethodID = function(methodName){
            var methodID;
            switch(methodName){
                case translate('method_equally') : methodID = 1; break;
                case translate('method_inputamount') : methodID = 2; break;
                case translate('method_percentage') : methodID = 3; break;
                case translate('method_units') : methodID = 4; break;
                case translate('method_sqftg') : methodID = 5; break;
            }
            return methodID;
        };

        model.getMethodName = function(method){
            var methodName;
            switch(method){
                case 1 : methodName = translate('method_equally') ; break;
                case 2 : methodName = translate('method_inputamount') ; break;
                case 3 : methodName = translate('method_percentage') ; break;
                case 4 : methodName = translate('method_units') ; break;
                case 5 : methodName = translate('method_sqftg') ; break;
            }
            return methodName;
        };

        model.reset = function () {
            
            angular.copy(model.copyData, model.formData);
        };

        model.edit = function () {
            model.formData.isEdit = true;
            model.formData.isView = false;
            model.formData.isNew = false;
        };

        model.cancel = function () {
            model.formData.isView = model.formData.isView ? false : true;
            model.formData.isEdit = false;
      
        };
               
        model.handlePropertyData = function (grid, data, totalAmount, methodname) {
            angular.forEach(data.records, function (item) {
                switch (methodname) {
                    case 1:
                        item.amount = (totalAmount / data.records.length).toFixed(2);
                        item.percentage = (100 / data.records.length).toFixed(2);
                        break;
                    case 4:
                        item.amount = (totalAmount * item.units / ($filter("sumByKey")(data.records, 'units'))).toFixed(2);
                        item.percentage = (100 * item.units / ($filter("sumByKey")(data.records, 'units'))).toFixed(2);
                        break;
                    case 5:
                        item.amount = (totalAmount * item.squareFootage / ($filter("sumByKey")(data.records, 'squareFootage'))).toFixed(2);
                        item.percentage = (100 * item.squareFootage / ($filter("sumByKey")(data.records, 'squareFootage'))).toFixed(2);
                        break;
                    case 3:
                        item.amount = (totalAmount * item.percentage / 100).toFixed(2);
                        break;
                    case 2:
                        item.percentage = (100 * item.amount / totalAmount).toFixed(2);
                        break;
                }

                //item.squareFootage = item.squareFootage.toLocaleString('en-IN');
            });
            if (methodname === 2) {
                grid.amountState = true;
                grid.PercentageState = false;
            }
            else if (methodname === 3) {
                grid.PercentageState = true;
                grid.amountState = false;
            }
            else {
                grid.amountState = false;
                grid.PercentageState = false;
            }
            grid.setData(data);
        };

        model.propertyBind = function (grid, methodname, totalAmount, allocationPropertyList) {
            model.handlePropertyData(grid, allocationPropertyList, totalAmount, methodname);
           // model.handlePropertyData(grid, allocationAmountSvc.getProperties(), totalAmount, methodname);
        };

        model.gridDataPush_old = function (grid, data) {
            var dataNew = { records: data };
            angular.forEach(dataNew.records, function (item) {
                item.percentage = 0;
                item.amount=0;
                item.units = 125;
                item.squareFootage = 52145;
            });
            grid.addData(dataNew);
            model.handlePropertyData(grid, grid.getData(), model.formData.totalAmount, model.formData.methodName);
        };
        model.gridDataPush = function (grid, data) {
            logc(JSON.stringify(data));
            var checkedRows = grid.getData().records;
            var propertiesData = [];
            //var dataNew = { records: data };
            data.forEach(function(item){
                var propsToUpdate = $filter('filter')(checkedRows, function (d) {
                        return d.propertyID === item.propertyID;
                    });
                if(propsToUpdate.length === 0){
                    item.percentage = 0;
                    item.amount=0;
                    propertiesData.push(item);
                }                
            });            
            logc(JSON.stringify(propertiesData));
            var dataNew = { records: propertiesData };
            grid.addData(dataNew);
            model.handlePropertyData(grid, grid.getData(), model.formData.totalAmount, model.formData.methodName);
        };

        model.propertyDelete = function (propertyId, row, propertiesGridModel) {
            propertiesGridModel.deleteRow('propertyID', row);
            model.handlePropertyData(propertiesGridModel, propertiesGridModel.getData(), model.formData.totalAmount, model.formData.methodName);
        };

        model.propertyPercentage = function (propertyId, row, propertiesGridModel) {
            logc('p');
            //propertiesGridModel.deleteRow('propertyID', row);
        };

        model.propertyAmount = function (propertyId, row, propertiesGridModel) {
            logc('A');
            //propertiesGridModel.deleteRow('propertyID', row);
        };

        /*model.getData = function() {
            return grid.getda();
        };*/

        model.setGLAccount = function(record, glAcctNum, glAcctDesc) {
           
            record.glAccountNumber = glAcctNum;
            record.glAccountDescription = glAcctDesc;

            return record;
        };

       /* model.assignGlToProps = function (grid, isOverwrite, data) {
            var checkedRows = grid.getData();
             logc(JSON.stringify(checkedRows));
            if (isOverwrite) {
                data.forEach(function (item) {                    
                    var propsToUpdate = $filter('filter')(checkedRows.records, function (d) {
                        return d.masterChartID === item.masterChartID;
                    });
                    propsToUpdate.forEach(function (prop) {
                        model.setGLAccount(prop, item.glAccountNumber, item.glAccountDescription);
                    });
                });
                data.forEach(function (item) { 
                    checkedRows.records.forEach(function (prop) {
                        if(prop.masterChartID === item.masterChartID)
                        {
                            model.setGLAccount(prop, item.glAccountNumber, item.glAccountDescription);
                        }
                    });
                });
            }
            
            //logc(JSON.stringify(checkedRows));
            else {
                data.forEach(function (item) {
                    var propsToUpdate = $filter('filter')(checkedRows.records, function (d) {
                        return d.masterChartID === item.masterChartID;
                    });
                    propsToUpdate.forEach(function (prop) {
                        //assign value for empty GL Accounts only
                        logc(JSON.stringify(prop));
                        if(prop.glAccountNumber === "" && prop.glAccountDescription === "") {
                            logc(1);
                            model.setGLAccount(prop, item.glAccountNumber, item.glAccountDescription);                            
                        }
                    });
                });
            }
            grid.setData(checkedRows);
        };*/
         model.assignGlToProps = function (grid, isOverwrite, data) {
            var checkedRows = grid.getData();
            data.forEach(function (item) {                    
                var propsToUpdate = $filter('filter')(checkedRows.records, function (d) {
                    return d.masterChartID === item.masterChartID;
                });
                propsToUpdate.forEach(function (prop) {
                    model.setGLAccount(prop, item.glAccountNumber, item.glAccountDescription);
                });
            });
            grid.setData(checkedRows);
        };
        return model;
    }
    angular
        .module('budgeting')
        .factory('BdgtModelAllocationMdl', ['appLangTranslate', 'allocation-view-edit-config', 'allocationAmountSvc', '$filter', factory]);

  
})(angular);