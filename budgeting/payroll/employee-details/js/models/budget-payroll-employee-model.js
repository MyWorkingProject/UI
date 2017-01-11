//  Users List Model

(function (angular) {
    'use strict';

    function factory(base,
            budgetDetails,
            eventStream,
            $stateParams,
            errorHandling,
            payrollEmployeeConfig,
            svc,
            contentLabels,
            modalInstance,
            moment,
            $filter) {

        var model,
            event = eventStream(), translate, alertMsg;
        model = {};        
        model.loadedConfig = false;        
        model.distID = $stateParams.distID;        
        model.defaultFormValues = {            
            rights: {
                userRights: false
            },
            state: {
                isEdit: false,
                isView: true
            },
            taxcap: {
                taxCapMonth: '',              
                status:true
            },
            records: {
                "employeeID": '',
                "firstName": '',
                "lastName": '',
                "corporateStaff": false,
                "payrateType": "Salary"
            },
            copyRecords:{},
            properties: [],
            copyProperties: [],
            payrolMethod:{
                options: []
            },
            budgetDates:{},
            position:{
                options: []
            },
            deletedProperties: [],
            empStatus:false,
            visible: false,                       
            alertMsg: '',            
            showState: false,
            startDateValidation:false
        };
        
       
        model.form = {};
        angular.copy(model.defaultFormValues, model.form);
     
        model.loadEmployeePayRollData = function (empId) {
            model.init();
            svc.getEmployeePayRollData({ payRollId: empId }, model.setEmployeePayRollData).$promise.then(model.onEmployeePayRollDataSuccess, model.onGetEmployeePayRollDataError);            
        };
        model.checkDatesValidation = function (comment) {
            if (comment.startDate === '' || comment.startDate === 'undefined') {
                model.form.startDateValidation = true;
                return false;
            }
            else{
                model.form.startDateValidation = false;
                return true;
            }
        };
        model.onChangeStartDate = function () {
            model.form.startDateValidation = false;            
        };
        model.setEmployeePayRollData = function (response) {          
            model.form.records = response.records[0];
            model.form.records.salary = '';
            model.form.records.hourly = '';
            angular.copy(model.form.records, model.form.copyRecords);
        };
        model.checkDateValue = function (value) {
            var dateCheck = moment(value).isValid();
            if (dateCheck){
                return " - "+value.format('MM/DD/YYYY');
            }
        };
        
        model.onEmployeePayRollDataSuccess = function () {
            //model.loadPayrollEmployeeJobPositions();
            //model.getEmpRights();
        };     
        model.loadJobPositionsRightsInfo = function () {
            model.loadPayrollEmployeeJobPositions();
            model.getEmpRights();
        };
        model.onEmployeePayRollDataError = function (resp) {
            errorHandling.onGetEmployeePayRollDataError(resp);
        };
          
        //emp  properties data
        model.loadEmployeePropertiesData = function (empId) {
            svc.getEmployeePropertiesDetails({ payRollId: empId }, model.setGridData).$promise.then(model.onEmployeePropertiesSuccess, model.onGetEmployeePropertiesError);
        };
        model.setGridData = function (response) {
            response.records.forEach(function (item) {
                item.payrolInputMethod = "Payroll Worksheet";
                item.formName = 'formName_'+item.propertyID;
            });
            model.form.properties = response.records;           
            model.form.properties.forEach(function (item) {               
                item.startDate = moment(item.startDate, 'mm/dd/yyyy');
                item.endDate = moment(item.endDate, 'mm/dd/yyyy');
            });
            angular.copy(model.form.properties, model.form.copyProperties);
        };
  
        model.onGetEmployeePropertiesError = function (resp) {
            errorHandling.onGetEmployeePropertiesError(resp);
        };
        model.alreadySelectedProperties = function () {
            return model.form.properties;
        };

        //Emp Righrs SVC
        model.getEmpRights = function () {
            svc.getEmpPayRollRights({ rights: '56managecorporatemodels' }, model.setEmpPayRollRightsData).$promise.then(model.onGetEmpPayRollRightsSuccess, model.onGetEmpPayRollRightsError);
        };

        model.setEmpPayRollRightsData = function (response) {
            model.form.rights.userRights = response.isAccess;
        };
        model.onGetEmpPayRollRightssSuccess = function () {
          
        };
        model.onGetEmpPayRollRightsError = function (resp) {
            errorHandling.onGetEmpPayRollRightsError(resp);
        };
       
        model.getState = function () {
            return model.form.state;
        };

        model.showForm = function (flag) {
            model.setFormFlag(flag);
        };
        
        model.cancel = function (flag) {
            model.form.visible = flag;
            model.form.state.isEdit = flag;
            model.form.properties.forEach(function (item) {
                item.isEdit = false;
            });
            //angular.copy(source, [destination]);
            angular.copy(model.form.copyProperties, model.form.properties);
            angular.copy(model.form.copyRecords, model.form.records);
        };
        model.setFormFlag = function (flag) {
            model.form.visible = flag;
            model.form.state.isEdit = flag;
        };
        model.addSeletedProperties = function (data) {

            if (model.form.properties.length > 0) {
                model.form.properties.forEach(function (val) {
                    data.forEach(function (item, index) {
                        if (val.propertyName === item.propertyName) {
                            data.splice(index, 1);
                        }
                    });
                });               
            }

            data.forEach(function (item) {
                model.form.properties.push({
                    "employeePropertyID":0,
                    "propertyName": item.propertyName,
                    "allocationPercent": "100",
                    "payrolInputMethod": "Payroll Worksheet",
                    "jobPositionID": "",
                    "startDate": "",
                    "endDate": "",
                    "startEndDate":"",
                    "departmentName": "",
                    "costCenter": "",
                    "isEdit":false ,//model.form.state.isEdit,
                    "propertyID": item.propertyID,
                    "formName":'formName_'+item.propertyID,
                    "corporateStaff": '',
                });                
            });
            logc(model.form.properties);
        };
        model.init = function () {
            alertMsg = modalInstance.alert().ok(model.onOkClick);
            model.event = event;
            return model;
        };
        model.onOkClick = function () {
        };
        model.loadPayrollEmployeeJobPositions = function () {
            svc.loadPayrollEmployeeJobPositions({}, model.loadJobPositions).$promise.then(model.onEmployeePropertiesSuccess, model.onGetEmployeePropertiesError);
        };

        model.loadJobPositions = function (data) {
            data.records.forEach(function (item) {
                model.form.position.options.push({
                    name: item.title,
                    value: item.jobPositionID
                });
            });
        };

        model.setOptions = function (currentProperty) {
            model.form.payrolMethod.options = [];
            model.form.properties.forEach(function (item) {
                model.form.payrolMethod.options.push({
                    name: item.propertyName,
                    value: item.propertyName
                });
            });
            model.form.payrolMethod.options.unshift({
                name: "Payroll Worksheet",
                value: "Payroll Worksheet"
            });
            
            angular.forEach(model.form.payrolMethod.options, function (i, el) {
                if (i.name === currentProperty.propertyName) {
                    model.form.payrolMethod.options.splice(el, 1);
                }
            });

            payrollEmployeeConfig
                .setOptions("jobPositionName", model.form.position.options)
                .setOptions("payrolMethod", model.form.payrolMethod.options);
        };
      
        model.stateHoverIn = function () {
            model.form.showState = true;
        };

        model.stateHoverOut = function () {
            model.form.showState = false;
        };

        model.saveWidgetDetails = function (item) {
            console.log(item);
        };
        model.toggleWidget = function (comment, index) {          
            model.form.properties[index] = model.form.copyProperties[index];
        };

        model.deleteWidget = function (values) {  
            if (!model.form.empStatus) {
                model.form.properties.splice(model.form.properties.indexOf(values.item), 1);
                model.form.deletedProperties.push(values.item.employeePropertyID);
            }
            if (model.form.empStatus) {
                model.form.properties.splice(model.form.properties.indexOf(values.item), 1);
            }                    
         };
        

        model.savePayrollEmployeeDetails = function (records) {           
                var returnObj = {
                    "employee": {
                        "employeeID": records.employeeID,
                        "firstName": model.form.records.firstName,
                        "lastName": model.form.records.lastName,
                        "corporateStaff": model.form.records.corporateStaff,
                        "payrateType": model.form.records.payrateType
                    },
                    "employeeProperty": model.getPropertiesList(),
                    "employeeProprtyDelete": model.form.deletedProperties
                };
                model.saveEmployeePayrollData(returnObj);            
        };
        model.getPropertiesList = function () {
           var arr = [];
            model.form.properties.forEach(function (property) {
                arr.push({
                    "employeePropertyID": property.employeePropertyID,
                    "employeeID": property.employeeID,
                    "propertyID": property.propertyID,
                    "jobPositionID": property.jobPositionID,
                    "allocationPercent": property.allocationPercent,
                    "startDate": $filter('date')(new Date(property.startDate), 'MM/dd/yyyy'),
                    "endDate": $filter('date')(new Date(property.endDate), 'MM/dd/yyyy'),
                    "costCenter": property.costCenter,
                    "departmentName": property.departmentName,
                    "syncSiteID": model.getSyncSiteId(property.payrolInputMethod),
                    "annualSalary": model.form.records.salary,
                    "hourlyRate": model.form.records.hourly,
                    "corporateStaff": model.form.records.corporateStaff
                });
            });
            return arr;
        };

        model.getSyncSiteId = function (syncSiteID) {
            var returnValue = 0;
            if (syncSiteID === "Payroll Worksheet") {
                return returnValue;
            }
            else{
                return syncSiteID;
            }
        };    

        model.saveNewEmployeeDetails = function (records) {           
                var returnObj = {
                    "employee": {
                        "employeeID": 0,
                        "firstName": model.form.records.firstName,
                        "lastName": model.form.records.lastName,
                        "corporateStaff": model.corporateStaff(model.form.records.corporateStaff),
                        "payrateType": model.form.records.payrateType
                    },
                    "employeeProperty": model.getPropertiesListNewEmp(),
                    "employeeProprtyDelete": []
                };
                model.saveEmployeePayrollData(returnObj);         
        
        };
        model.corporateStaff = function (corpStaff) {
            if (corpStaff === 'undefined' || corpStaff === null || corpStaff === '') {
                var corpStaffValue = false;
                return corpStaffValue;
            }
            else {
                return corpStaff;
            }
        };
        model.getPropertiesListNewEmp = function () {
            var arr = [];
            model.form.properties.forEach(function (property) {
                arr.push({
                    "employeePropertyID": 0,
                    "employeeID": 0,
                    "propertyID": property.propertyID,
                    "jobPositionID": property.jobPositionID,
                    "allocationPercent": property.allocationPercent,
                    "startDate": $filter('date')(new Date(property.startDate), 'MM/dd/yyyy'),
                    "endDate": $filter('date')(new Date(property.endDate), 'MM/dd/yyyy'),
                    "costCenter": property.costCenter,
                    "departmentName": property.departmentName,
                    "syncSiteID": model.getSyncSiteIdNewEmp(property.payrolInputMethod),
                    "annualSalary": model.form.records.salary,
                    "hourlyRate": model.form.records.hourly,
                    "corporateStaff": model.form.records.corporateStaff
                });
            });
            return arr;
        };

        model.getSyncSiteIdNewEmp = function (syncSiteID) {
            var returnValue = 0;
            if (syncSiteID === "Payroll Worksheet") {
                return returnValue;
            }
            else {
                return syncSiteID;
            }
        };

        model.saveEmployeePayrollData = function (data) {
            svc.saveEmployeePayrollData(data).$promise.then(model.onEmployeeSaveSuccess, model.onEmployeeSaveError);
        }; 
           
        model.onEmployeeSaveSuccess = function () {
           errorHandling.onEmployeeSaveSuccess();
        };

        model.onEmployeeSaveError = function (resp) {
            if (resp.data.messageText === 'DUPLICATE') {
                alertMsg.setContent({
                    title: contentLabels.duplicate_title,
                    message: contentLabels.duplicate_message,
                    btnOkText: contentLabels.cancelBtn
                }).show();
            }
            else{
                errorHandling.onEmployeeSaveError(resp);
            }
        };
  
        model.reset = function () {        
            angular.copy(model.defaultFormValues, model.form);      
        };
        return model;
    }
    angular
        .module('budgeting')
        .factory('payrollEmployeeModel', [
                "payrollBaseModel",
                "budgetDetails",
                "eventStream",
                "$stateParams",         
                "employeeDetailsErrorHandling",                
                "payrollEmployeeConfig",
                "payrollEmployeeSvc",
                "employeePayrollContent",
                "rpBdgtModalService",
                "moment",
                "$filter",
                factory
        ]);
})(angular);


