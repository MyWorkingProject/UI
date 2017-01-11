//  Users List Model

(function (angular) {
    "use strict";

    function factory(gridModel, gridConfig, payrollEmployeeModel, svc, errHandling) {
        var grid, model = {};
        var position = {
            options: []
        };   
        var payrolMethod = {
            options: []
        };   
       
        model.init = function () {
            //payrollEmployeeModel.initStates();
            grid = model.grid = gridModel();
            grid.subscribe('sortBy', model.load);
            grid.subscribe('filterBy', model.load);
            grid.setConfig(gridConfig).setEmptyMsg("No data found");
            grid.deleteRowFromGrid = function (idx, name){               
                model.removeRowFromGrid(idx,name);
            };          
            grid.selectPayrolMethods=function(){                      
               return payrolMethod.options;
            };
            return model;
        };
        model.removeRowFromGrid = function (idx, name) {
            payrolMethod.options = [];
            var temp = {};
            var dataOrg = [];
            temp = grid.getData(); 
            dataOrg = temp.records;    
            dataOrg.splice(idx, 1);           
            dataOrg.forEach(function (item) {
               payrolMethod.options.push({
                    name: item.propertyName,                    
                    value: item.propertyID                    
                });
            });   
            payrolMethod.options.unshift({
                name: "Payroll Worksheet",
                value: "0"
            }); 
            grid.setGridData(dataOrg).busy(false);                                       
        };
        model.loadJobPositions = function (data) {
            data.records.forEach(function (item) {
                position.options.push({
                    name: item.title,
                    value: item.title                    
                });
            });             
        };
        
  
        model.setFormFlag = function (flag) {
            model.form.visible = flag;          
        };

        model.initStates = function () {            
            grid.ruleState = payrollEmployeeModel.getState(); //used by grid templates
            grid.position = position;
            grid.payrolMethod = payrolMethod;
        };

  
        model.addSeletedProperties = function (data) {  
            var temp = {};
            var dataOrg = [];
            temp = grid.getData();                     
            dataOrg = temp.records;        
            data.forEach(function (item) {
               dataOrg.push({
                    "propertyName": item.propertyName,
                    "allocationPercent": "100",
                    "payrolInputMethod": "",    
                    "jobPositionName": "",        
                    "startDate": "",
                    "endDate": "",                    
                    "departmentName": "",
                    "costCenter": "",
                    "propertyID": item.propertyID                    
                });
            });  
            data.forEach(function (item) {               
               payrolMethod.options.push({
                    name: item.propertyName,                   
                    value: item.propertyID                    
                });
            });       
            grid.setGridData(dataOrg);
        };

        model.load = function (empId) {
            grid.flushData().busy(true);                
            svc.getEmployeePropertiesDetails({payRollId:empId}, model.setGridData).$promise.then(model.onEmployeePropertiesSuccess, model.onGetEmployeePropertiesError);
        };

        model.selectPayrolMethods = function(){
         grid.payrolMethod = model.payrolMethod;
        return model.payrolMethod;            
        };



        model.setGridData = function (response) {  
             response.records.forEach(function (item) {
               payrolMethod.options.push({
                    name: item.propertyName,                    
                    value: item.propertyID                    
                });
            });   
             payrolMethod.options.unshift({
                name: "Payroll Worksheet",
                value: "0"
            });  
            grid.flushData();        
            grid.setData(response).busy(false);
        };
        model.onEmployeePropertiesSuccess=function(){

        };
        model.onGetEmployeePropertiesError=function(resp){
            errHandling.onGetEmployeePropertiesError(resp);
        };
        model.paginate = function () {
            var data = grid.getQuery();
        };
        model.setGridFilterState = function (state) {
            grid.setFilterState(state);
            return model;
        };
   
        model.reset = function () {
            gridModel.ruleState = null;
        };


        
        return model.init();
    }
    angular
        .module("budgeting")
        .factory('payrollGridFactory', [
            'rpGridModel',
            'payrollGridConfig',
            'payrollEmployeeModel',
            'payrollEmployeeSvc',
            'employeeDetailsErrorHandling',
            factory
        ]);
})(angular);
