(function (angular) {
    function controller(
        $scope,
       $location,
        model,
        formConfig,
        allocationAmountSvc,
        $stateParams,
        rpGridModel,
        rpGridConfig,
        propertyConfig,
        asideModalInstance,
        gridTransformSvc,
        amountModel,
        amountGridConfig,
        budgetDetails,
        bmCalculation,
        calcuStateModel,
        rpWatchList,
        allocationErrorHandling,
        $filter
        ) {
        var vm = this, budgetModel, amountGridModel, distributedAllocationAside, recallDestAllocationAside, calculatorAside, assignGLAcctsAside,
        addPropertiesAside,
            propertiesGridModel = rpGridModel(),
            propertiesGridConfig = rpGridConfig(),
            gridTransform = gridTransformSvc();
            vm.formConfig = {};
            vm.model = model;      
            vm.init = function () {
                    model.setOptions();
                    vm.watchList = rpWatchList();
                    vm.watchList.add($scope.$on("$destroy", vm.destroy));
                    //$scope.$on("$destroy", vm.destroy);
                    vm.formConfig = formConfig;
                    formConfig.setMethodsSrc(vm);
                //budget model data
                    budgetModel = budgetDetails.getModelDetails();
                    var siteLevel = ($stateParams.isSiteLevel === 'true' ? true : false);
                    //var ap =  budgetDetails.getAccessPrivileges().allowEdit;
                    //vm.accessRestrictions = budgetDetails.getAccessPrivileges().allowEdit;
                    logc(  budgetDetails.getAccessPrivileges().allowEdit);
                    vm.accessRestrictions = budgetDetails.getAccessPrivileges().allowEdit === true ? siteLevel : false;
                    //vm.accessRestrictions = budgetDetails.getAccessPrivileges().allowEdit === true ? sl : false;
                   logc(vm.accessRestrictions);
                 

                    var gridConfig = amountGridConfig(vm,
                                               budgetModel.budgetYear,
                                               budgetModel.startMonth - 1,
                                               budgetModel.noOfPeriods);    
                        amountGridModel = vm.amountGridModel = amountModel(gridConfig);
                       

                    logc(JSON.stringify(budgetModel));
                    //logc(JSON.stringify(budgetDetails.getAccessPrivileges().allowEdit));
                  //amount grid    
                    var params = {
                        allocationID: $stateParams.allocationID,
                        budgetModelID:  budgetModel.budgetModelID,
                        propertyID: budgetModel.propertyID,
                        isSiteLevel: $stateParams.isSiteLevel
                    };
                    if($stateParams.type !== "new"){
                         vm.getAllocationModelNew(params);
                    }
                    else{
                        amountGridModel.reSetData(allocationAmountSvc.getResetAmounts());                        
                        //model.pageload($stateParams.allocationID, $stateParams.type, amountGridModel);
                        amountGridModel.grid.edit(!model.formData.isView);
                        model.pageload($stateParams.allocationID, $stateParams.type, amountGridModel, allocationAmountSvc.getAllocationDetails().records);
                        vm.edit();
                        /*vm.propertyRefresh(!model.formData.isNew, gridData);
                        amountGridModel.grid.edit(!model.formData.isView);
                        vm.doAllcalucatiuopns();*/
                    }
                   
                        /*amountGridModel.setData(allocationAmountSvc.getAmounts()).updateDescription();
                        model.pageload($stateParams.allocationID, $stateParams.type, amountGridModel);
                        amountGridModel.grid.edit(!model.formData.isView);*/
                //end
                //propertyGrid
                   // vm.propertyRefresh(!model.formData.isNew);
                    
                //end
                //Add Properties Aside
                    addPropertiesAside = asideModalInstance('addPropertiesOptions')
                                         .done(vm.selectedProperties);
                    recallDestAllocationAside = asideModalInstance('recallDestAllocation');
                    distributedAllocationAside = asideModalInstance('distributedAllocation');
                //Calculator
                    calculatorAside = asideModalInstance("calculator")
                        .done(vm.applyCalculatorChanges);
                //GL Accounts
                    assignGLAcctsAside = asideModalInstance("assignGLAccounts")
                        .done(vm.assignGLAccounts);
                   // vm.doAllcalucatiuopns();
            };

            vm.getAllocationModel = function(params){
                allocationAmountSvc.getAllocationModel(params).then(function(response){
                    if(response.data.records){
                        vm.allocationModelData = response.records;
                        logc(JSON.stringify(response));
                        var gridConfig = amountGridConfig(vm,
                                               budgetModel.budgetYear,
                                               budgetModel.startMonth - 1,
                                               budgetModel.noOfPeriods);    
                        amountGridModel = vm.amountGridModel = amountModel(gridConfig);
                        //amountGridModel.setData(response.data.records.allocationPeriod).updateDescription();
                        amountGridModel.setData(allocationAmountSvc.getAmounts()).updateDescription();
                        //model.pageload($stateParams.allocationID, $stateParams.type, amountGridModel, response.data.records.allocation);
                        model.pageload($stateParams.allocationID, $stateParams.type, amountGridModel);
                        amountGridModel.grid.edit(!model.formData.isView);
                        vm.propertyRefresh(!model.formData.isNew, response.data.records.allocationPropertyList);
                        vm.doAllcalucatiuopns();
                    }
                });
            };

            vm.getAllocationModelNew_1 = function(params){
                allocationAmountSvc.getAllocationModel(params).then(function(response){
                    if(response.data.records){
                        if(response.data.records.allocationPeriod !== null){
                            amountGridModel.setData(response.data.records.allocationPeriod);
                        }
                        else{
                            amountGridModel.reSetData(allocationAmountSvc.getResetAmounts());
                        }
                        //model.pageload($stateParams.allocationID, $stateParams.type, amountGridModel);
                        var gridData = {records: response.data.records.allocationPropertyList};
                        model.pageload($stateParams.allocationID, $stateParams.type, amountGridModel, response.data.records.allocation);
                        if(gridData === null){
                            vm.propertyRefresh(false);
                        }
                        else{
                            vm.propertyRefresh(!model.formData.isNew, gridData);
                        }
                        amountGridModel.grid.edit(!model.formData.isView);
                        vm.doAllcalucatiuopns();
                    }
                });
            };

            vm.getAllocationModelNew = function(params){
                allocationAmountSvc.getAllocationModel(params).then(function(response){
                    if(response.data.records){
                        amountGridModel.setData(response.data.records.allocationPeriod);
                        //model.pageload($stateParams.allocationID, $stateParams.type, amountGridModel);
                        var gridData = {records: response.data.records.allocationPropertyList};
                        model.pageload($stateParams.allocationID, $stateParams.type, amountGridModel, response.data.records.allocation);
                        vm.propertyRefresh(!model.formData.isNew, gridData);
                        amountGridModel.grid.edit(!model.formData.isView);
                        vm.doAllcalucatiuopns();
                    }
                });
            };

           
            /*vm.getAmounts = function(response){
                var allocationAmounts = {};
                allocationAmounts.records = response.allocationPeriod;
                retrun allocationAmounts;
            }*/

         /*   vm.addPropertiesAsideModel = function () {
                var resolve = {
                    //displayProperties: function () { return {}; }
                    displayProperties: function () { return {mastarChart:true}; }
                };
                addPropertiesAside
                   .resolve(resolve)
                   .show();
            };
            */

                //--------------------------------------------------------------------------------------------------
        vm.addPropertiesAsideModel = function () {
            var resolveData = {
                displayProperties: function () {
                    return {
                        mastarChart: true,
                        budgetModelID: budgetModel.budgetModelID,
                        dataFilter:''
                    };
                },
                addPropertiesSvc: function () {
                    return allocationAmountSvc;
                }
            };
            addPropertiesAside
                .resolve(resolveData)
                .show();
        };

            vm.selectedProperties = function (data) {
                // Code to handle the data which aside model return
                logc('after added');
                logc(data);
                vm.propertyRefresh(false, data);
                model.formData.isProperty = true;

            };

            vm.logTitle = function (data) {
                logc(data);
            };
            //method dropdown onChange event
            vm.onChangeMethod = function (value) {
                 vm.propertyRefresh(false);
            };

            vm.edit = function () {            
                model.edit();
                amountGridModel.grid.edit(true);
                vm.propertyRefresh(false);
            };

            vm.cancel = function () {
           
                model.cancel();
                amountGridModel.grid.edit(false);
                model.formData.methodName = 1;
                vm.propertyRefresh(false);
                if($stateParams.type === "new"){
                      //$state.go('allocations', { distID: $stateParams.distID });
                      $location.path('/budgetmodel/' + $stateParams.distID + '/allocations');
                }
                //model.handlePropertyData(vm.propertiesGridModel, vm.propertiesGridModel.getData(), vm.amountGridModel.grid.getRows().first().getData().total, model.formData.methodName);
            };

            vm.save = function(){
                var validation = vm.allocationValidation();
                logc(validation);
                if(!validation)
                {
                    logc($stateParams.type);
                    var allocationModel = {};
                    allocationModel.allocation = {
                        "allocationID": $stateParams.type === 'edit' ||  $stateParams.type === 'view' ?  $stateParams.allocationID : 0,
                        "name": model.formData.allocation_name,
                        "amount": model.formData.totalAmount,
                        "description": model.formData.allocation_description,
                        "method": model.getMethodName(model.formData.methodName),
                        "isSiteLevel": true,
                        "budgetModelID": budgetModel.budgetModelID,
                        "propertyID": budgetModel.propertyID

                    };
                    var allocationPropertyList = [];
                    logc(JSON.stringify(vm.propertiesGridModel.getData().records));
                    vm.propertiesGridModel.getData().records.forEach(function(item){
                        allocationPropertyList.push( {
                          "propertyID": item.propertyID,
                          "allocationID": $stateParams.type === 'edit' ||  $stateParams.type === 'view' ?  $stateParams.allocationID : 0,
                          "percentage": item.percentage,
                          "amount": item.amount,
                          "isModified": item.isModified,
                          "masterChartID": item.masterChartID,
                          "glAccountNumber": item.glAccountNumber
                         });
                    });
                    allocationModel.allocationPropertyList = allocationPropertyList;
                    allocationModel.allocationPeriod = amountGridModel.getAllacationPerriods();
                    allocationAmountSvc.putAllocationModel(allocationModel).then(function(response){
                        logc(JSON.stringify(response));
                        allocationErrorHandling.showAllocationSuccess();
                        $location.path('/budgetmodel/' + $stateParams.distID + '/allocations');
                    }, function(error){
                        logc(JSON.stringify(error));
                        if(error.data.messageText === 'DUPLICATE'){
                            allocationErrorHandling.showAllocationError('Allocation name already exist.');
                        }
                        else{
                            allocationErrorHandling.showAllocationError('Error occured while saving allocation..');
                        }
                    });
                }
                else{
                    allocationErrorHandling.showAllocationError(validation);
                }
            };

            vm.allocationValidation = function(){
                var validationMessage = false;
                var propertyGridTotal = $filter("sumByKey")(vm.propertiesGridModel.getData().records, 'amount');
                if(vm.amountGridModel.grid.getRows().first().getData().total <= 0 || vm.amountGridModel.grid.getRows().first().getData().total === '')
                {
                    logc('amount zero');
                    validationMessage = 'allocation amount should not be empty or zero';
                }
                else if(vm.propertiesGridModel.getData().records.length <= 0){
                    logc('property');
                    validationMessage = 'At least one allocation property should be added.';
                }
                /*else if(model.getMethodName(model.formData.methodName) === 'Input Percentage' || model.getMethodName(model.formData.methodName) === 'Input Amount'){
                    logc('percentage');
                   vm.propertiesGridModel.getData().records.forEach(function(item){
                        logc(JSON.stringify(item));
                        if(item.percentage <= 0 || item.percentage === '' || item.percentage === '0.00' ){
                            logc('p');
                            validationMessage = 'percentage should not be empty or zero';
                           // return;
                        }
                        else if(item.amount <= 0 || item.amount === '' || item.amount === '00'){
                            logc('a');
                            validationMessage = 'amount should not be empty or zero';
                           // return;
                        }               
                    });
                }*/
                else if(vm.vallidationZero()){
                    validationMessage = 'percentage or amount should not be empty or zero';
                }
                else if( vm.amountGridModel.grid.getRows().first().getData().total < propertyGridTotal){
                     logc('exceed');
                    validationMessage =  'propeties amount should not be exceed than allocation amount';
                }
                return validationMessage;
            };

            vm.vallidationZero = function(){
                var returnValue = false;
                vm.propertiesGridModel.getData().records.forEach(function(item){
                        logc(JSON.stringify(item));
                        if(item.percentage <= 0 || item.percentage === '' || item.percentage === '0.00' ){
                            logc('p');
                            //validationMessage = 'percentage should not be empty or zero';
                           returnValue = true;
                           return;
                        }
                        else if(item.amount <= 0 || item.amount === '' || item.amount === '00'){
                            logc('a');
                            //validationMessage = 'amount should not be empty or zero';
                            returnValue = true;
                           return;
                        }               
                    });
                return returnValue;
            };

            vm.recall = function(){
                vm.showRecallDestributedAllocation(false);
            };

            vm.showDistribute = function(){
                vm.showDestributedAllocation();
            };

            vm.showDestributedAllocation = function(){
                var resolve = {
                   distributedSettingModel: function () {
                       return {
                           modelType: 'budget', //record.modelType
                           modelYear: '2017' ////record.modelYear
                       };
                   }
               };
               distributedAllocationAside
                   .resolve(resolve)
                   .show();
            };

            vm.showRecallDestributedAllocation = function (isHistory) {
            //logc(record.actionParam);
                var resolve = {
                    recallDistSettingModel: function () {
                        return {
                            allocationID: $stateParams.allocationID,
                            isHistory: isHistory
                        };
                    }
                };
                recallDestAllocationAside
                        .resolve(resolve)
                        .show();
            };

            vm.destroy = function () {
                addPropertiesAside.destroy();
                // recallDestAllocationAside.destroy();
                // distributedAllocationAside.destroy();
                vm.propertiesGridModel = undefined;
                vm.amountGridModel = undefined;
                model.reset();
                allocationAmountSvc = undefined;
                //grid.destroy()
                //factory=undefined
                //core componenets destroy
                assignGLAcctsAside.destroy();
                vm.watchList.destroy();

            };

            vm.propertyRefresh = function (pageLoad, data) {
                model.formData.totalAmount = vm.amountGridModel.grid.getRows().first().getData().total;
                propertiesGridConfig.setSrc(vm);
                propertyConfig(propertiesGridConfig, model.formData.methodName, !model.formData.isView);
                vm.propertiesGridModel = propertiesGridModel;
                gridTransform.watch(propertiesGridModel);
                //propertiesGridModel.filtersModel.state.active = true;
                propertiesGridModel.setConfig(propertiesGridConfig);                
                if (pageLoad) {
                    model.propertyBind(propertiesGridModel, model.formData.methodName, model.formData.totalAmount, data);
                }
                else if (data!==undefined) {
                    model.gridDataPush(propertiesGridModel, data);
                }
                else {
                    model.handlePropertyData(propertiesGridModel, propertiesGridModel.getData(), model.formData.totalAmount, model.formData.methodName);
                }
               
            };
            vm.getRowTotal = function (column, row, rows) {
                return bmCalculation.getRowTotal(column, row, rows);
            };
            vm.onMonthlyChange = function () {
                logc('m');
                vm.amountGridModel.grid.reCalculate()
                .refresh();
                vm.doAllcalucatiuopns();
            };
            vm.doAllcalucatiuopns = function () {
                logc(vm.amountGridModel.grid.getRows().first().getData().total);
                model.formData.totalAmount = vm.amountGridModel.grid.getRows().first().getData().total;
                model.handlePropertyData(vm.propertiesGridModel, vm.propertiesGridModel.getData(), vm.amountGridModel.grid.getRows().first().getData().total, model.formData.methodName);
            };

            //Calculator
            vm.applyCalculatorChanges = function (calculatedData) {
                amountGridModel.applyCalculatorChanges(calculatedData);
                //vm.propertyRefresh(false,vm.propertiesGridModel.getData());
                model.handlePropertyData(vm.propertiesGridModel, vm.propertiesGridModel.getData(), vm.amountGridModel.grid.getRows().first().getData().total, model.formData.methodName);
            };

            vm.showCalculator = function () {
                var calculatorState = {
                    activePeriod: amountGridModel.getSelectedRow(),
                    startMonth: budgetModel.startMonth,
                    startYear: budgetModel.budgetYear,
                    noOfPeriods: budgetModel.noOfPeriods,
                    errMsgRequired: "Please select row in Salary"
                };

                var resolveData = {
                    calculatorParamData: function () {
                        return new calcuStateModel(calculatorState);
                    }
                };

                calculatorAside
                    .resolve(resolveData)
                    .show();
            };

            vm.onMonthlyBlur = function (column, row) {
                amountGridModel.setSelectedRow(column, row);
            };

            vm.onPercentageBlur = function(record){
                model.handlePropertyData(propertiesGridModel, propertiesGridModel.getData(), vm.amountGridModel.grid.getRows().first().getData().total, model.formData.methodName);
            };

            vm.onAmountBlur = function(record){
                model.handlePropertyData(propertiesGridModel, propertiesGridModel.getData(), vm.amountGridModel.grid.getRows().first().getData().total, model.formData.methodName);
            };

            vm.deleteProperty = function(record){
                model.propertyDelete(record.propertyID, record, propertiesGridModel);
            };
            //Assign GL Account
            vm.assignGLAccounts_old = function(response) {
                /*console.debug("Assign GL Accounts: ");
                console.debug(response);
                */
                logc(JSON.stringify(response));

                //TODO assign GL Accounts based on the master charts
            };

            vm.assignGLAccounts = function(response) {
                model.assignGlToProps(vm.propertiesGridModel,
                response.isOverwriteAssignment, response.masterCharts);
                vm.masterChartIDs = [];
            };
            
            vm.showAssignGLModal = function() {
                vm.masterChartIDs = [];
                var gridData = vm.propertiesGridModel.getData();

                  var masterChartData = {};
                  angular.copy(gridData, masterChartData);
                  masterChartData.records = vm.UniqueArraybyId(gridData.records, "masterChartID");

                logc(vm.masterChartIDs);
                var   resolveData = {
                        assignGLParams: function() {
                            return {
                                isSelector: true,
                                hasOverwriteOption: false,
                                masterChartData: masterChartData, 
                                masterChartIDs: vm.masterChartIDs
                            };
                        }
                    };
                assignGLAcctsAside
                    .resolve(resolveData)
                    .show();
            };

            vm.UniqueArraybyId = function (collection, keyname) {
                 var output = [],  keys = [];
                 angular.forEach(collection, function(item) {
                      var key = item[keyname];
                      if(keys.indexOf(key) === -1) {
                          keys.push(key);
                          output.push(item);
                          vm.masterChartIDs.push(item.masterChartID);
                      }
                  });
                return output;
            };



        vm.init();

    }
    angular
        .module('budegting')
        .controller('BdtallocationCtrl', [
            '$scope',
            '$location',
            'BdgtModelAllocationMdl',
            'allocation-view-edit-config',
            'allocationAmountSvc',
            '$stateParams',
            'rpGridModel',
            'rpGridConfig',
            'propertyConfig',
            'rpBdgtAsideModalService',
            'rpGridTransform',
            'amountModel',
            'amountGridConfig',
            'budgetDetails',
            'bmGridCalculationModel',
            'calculatorStateModel',
            'rpWatchList',
            'allocationErrorHandling',
            '$filter',
            controller]);
})(angular);
