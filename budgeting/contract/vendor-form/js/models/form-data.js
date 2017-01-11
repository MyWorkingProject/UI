//  Sample Fit Form Data

(function (angular) {
    "use strict";
    function factory(addVendorSVC,formConfig,errorHandling) {
    var model={};
    model.form = {};
    model.emptyData = {
        vendorID:"0",
        vendorCode:"",
        vendorName:"",
        stateCode:"",
        status:"Active",
        stateOptions:[{ 
                "name": "All", 
                "value": ""
        }],
        statusOptions : [
            {
                "name": "Active",
                "value": "Active"
            }, {
                "name": "Inactive",
                "value": "Inactive"
            }, {
                "name": "Pending",
                "value": "Pending"
        }]
    };

    angular.copy(model.emptyData, model.form);

	model.getStatesPromise = function(){
         return addVendorSVC.getStatesData().$promise;
    };

 	model.getStates = function(){
        model.getStatesPromise().then(model.assignState, errorHandling.onGetError);        
    };

	model.getStatusOptions = function(){
	    return model.form.statusOptions;
	};
	model.getStateOptions = function(){
	    return model.form.stateOptions;
	};
    
    model.assignStatus = function()
    {
    	formConfig
                .setOptions("status", model.getStatusOptions());
    };
	model.assignState = function(response){
        response.records.forEach(function(item)
		{
			model.form.stateOptions.push({name:item.stateName, value:item.stateCode});
		});
           	
        formConfig
            .setOptions("stateCode", model.getStateOptions());

    };
    model.saveData = function(formData){
        var postData={};
        postData = formData;
        model.saveVendorData(postData).then(model.onSaveSuccess, errorHandling.showVendorSaveException);
    };

    model.onSaveSuccess=function(data){
        errorHandling.showVendorSaveSuccess();
        angular.element('#addVendorModel').modal('hide');
        model.reset();
    };
    model.reset = function(){
      	angular.copy(model.emptyData, model.form);
        
    };
    model.getFormDetails = function(){
        var returnObj = {
            vendorID:model.form.vendorID,
            vendorCode:model.form.vendorCode,
            vendorName: model.form.vendorName,
            stateCode: model.form.stateCode,
            status:model.form.status
        };
        return returnObj;
    };
    model.saveVendorData = function (data) {
        return addVendorSVC.addVendorDetails(data).$promise;
    };
        return model;
    }
    angular
        .module("budgeting")
        .factory("vendorFormData", ["addVendorSVC","vendorFormConfig",
            "addVendorErrorHandling", factory]);
})(angular);
