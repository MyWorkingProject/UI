//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function LeaseOptionsModel(langTranslate,leaseSVC,formConfig) {
        var model = {};
        var convert;
        convert = langTranslate('LeaseOptions').translate;
        model.form = {};

        model.emptyData = {
            isEdit:false,
            isFinalize:false,
            formData: {
                renewMethods: [{
                    value: "None",
                    text: "None"
                }, {
                    value: "Unit Type",
                    text: "Unit Type"
                }, {
                    value: "Summary",
                    text: "Summary"
                }]
            },
            modelData: {
                budgetModelID:0,
                distributedID:0,
                propertyID:0,
                siteID:0,
                editInputMethod:true,
                leaseRenewalMethod: "None",
                useLeaseReferenceData: false,
                moveInPercent: 100,
                defaultAvgLeaseTerm: 0,
                leaseRenewalPercent: 100,
                defaultLeaseRenewalPercent: 100,
                defaultLeaseRenewalMTMPercent: 100.00,
                monthtoMonthLease: false,
                showReferenceData: true,
                openPeriodRefDataType:"",
                openPeriodRefDataYear:"",
                openPeriodData :"",
                modelYear:0
                //openPeriodDataDisplay :"-Select-"
            },
            openPeriodData:[],
            toolTip:{
                    mrINtoolTip: false,
                    lrToolTip: false,
                    opnPrdToolTip: false
            }
           
        };

        
        model.init = function () {
            angular.copy(model.emptyData, model.form);
            return model;
        };

        model.getLangValue = function (key) {
            return convert(key);
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
            model.isEdit = false;
            //angular.extend(model.form,model.emptyData);
        };

        model.setOptionsForSelect=function(){
              formConfig
                .setOptions("leaseRenewalMethod", model.form.formData.renewMethods)
                .setOptions("openPeriodData", model.form.openPeriodData);
        };

        model.updateReferenceOptions = function(data){
            var priorYear = parseInt(data.budgetYear) - 1;
            model.form.modelData.modelYear  = data.budgetYear;
            model.form.modelData.siteID = data.propertyID;
            //model.form.openPeriodData.push({value:"-Select-",text:"-Select-"});
            model.form.openPeriodData.push({value:"Actual-"+ priorYear,text:"Actual-"+ priorYear});
            model.form.openPeriodData.push({value:"Budget-"+ priorYear,text:"Budget-"+ priorYear});
            model.form.openPeriodData.push({value:"Actual-"+ (priorYear-1),text:"Actual-"+ (priorYear-1)});
            model.form.openPeriodData.push({value:"Forecast-"+ priorYear,text:"Forecast-"+ priorYear});
            model.form.openPeriodData.push({value:"Proforma-"+ priorYear,text:"Proforma-"+ priorYear});
        };

        model.showRFToooltip = function(){
            model.form.toolTip.opnPrdToolTip = !model.form.toolTip.opnPrdToolTip;
        };

        model.getRFToooltip = function(){
            return model.form.toolTip.opnPrdToolTip ;
        };

        model.setRFToooltip = function(val){
            model.form.toolTip.opnPrdToolTip = val;
        };

        model.showMarktLRToooltip = function(){
            model.form.toolTip.lrToolTip = !model.form.toolTip.lrToolTip;
        };

        model.getMarktLRToooltip = function(){
            return model.form.toolTip.lrToolTip;
        };

        model.setMarktLRToooltip = function(val){
            model.form.toolTip.lrToolTip = val;
        };

        model.showMarktMIToooltip = function(){
            model.form.toolTip.mrINtoolTip = !model.form.toolTip.mrINtoolTip;
        };

        model.getMarktMIToooltip = function(){
           return model.form.toolTip.mrINtoolTip ;
        };

        model.setMarktMIToooltip = function(val){
            model.form.toolTip.mrINtoolTip = val;
        };

        model.setDistributedID = function(distID){
            model.form.modelData.distributedID = distID;
       };

       model.getDistributedID = function(distID){
           return model.form.modelData.distributedID;
       };
        
       model.setLeaseDetails = function(resp) {
            angular.extend(model.form.modelData,resp.records);
            if(resp.records.openPeriodRefDataType!==undefined && resp.records.openPeriodRefDataType!==null && resp.records.openPeriodRefDataYear!==undefined && resp.records.openPeriodRefDataYear!==0 && resp.records.openPeriodRefDataYear!==null){
                model.form.modelData.openPeriodData = resp.records.openPeriodRefDataType + "-" + resp.records.openPeriodRefDataYear;
            }
            else{
                //model.form.modelData.openPeriodData = "-Select-";
                model.form.modelData.openPeriodData = "Actual-"+ (model.form.modelData.modelYear-1);
                //model.from.modelData.openPeriodDataDisplay ="-Select-";
            }
            model.setDefaultValues();
            model.formatNumbers();
       };

       model.formatNumbers = function(){
            model.form.modelData.moveInPercent = model.ConvertDecimalPlaces(model.form.modelData.moveInPercent,2); 
            model.form.modelData.leaseRenewalPercent = model.ConvertDecimalPlaces(model.form.modelData.leaseRenewalPercent,2); 
            model.form.modelData.defaultLeaseRenewalPercent = model.ConvertDecimalPlaces(model.form.modelData.defaultLeaseRenewalPercent,2); 
            model.form.modelData.defaultLeaseRenewalMTMPercent = model.ConvertDecimalPlaces(model.form.modelData.defaultLeaseRenewalMTMPercent,2);
            model.form.modelData.defaultAvgLeaseTerm = model.ConvertDecimalPlaces(model.form.modelData.defaultAvgLeaseTerm,0);  
       }; 

      model.setDefaultValues = function(){
        if(model.form.modelData.moveInPercent === undefined || model.form.modelData.moveInPercent === null){
            model.form.modelData.moveInPercent=100;
        }
        if(model.form.modelData.defaultAvgLeaseTerm === undefined || model.form.modelData.defaultAvgLeaseTerm === null){
            model.form.modelData.defaultAvgLeaseTerm=12;
        }
        if(model.form.modelData.leaseRenewalPercent === undefined || model.form.modelData.leaseRenewalPercent === null){
            model.form.modelData.leaseRenewalPercent=100;
        }
        if(model.form.modelData.defaultLeaseRenewalPercent === undefined || model.form.modelData.defaultLeaseRenewalPercent === null){
            model.form.modelData.defaultLeaseRenewalPercent=100;
        }
        if(model.form.modelData.defaultLeaseRenewalMTMPercent === undefined || model.form.modelData.defaultLeaseRenewalMTMPercent === null){
            model.form.modelData.defaultLeaseRenewalMTMPercent=100;
        }      
      }; 

       model.getLeaseOptionsDetails  = function(){
            var params = {
                            distID:model.getDistributedID()
                         };
            return leaseSVC.getModelLeaseOptionsDetails(params).$promise;
       };

       model.resetDefaultValues = function(){
        if(model.form.modelData.leaseRenewalMethod === "None"){
            model.form.modelData.useLeaseReferenceData = false;
            model.form.modelData.moveInPercent = null;
            model.form.modelData.defaultAvgLeaseTerm = null;
            model.form.modelData.leaseRenewalPercent = null;
            model.form.modelData.defaultLeaseRenewalPercent = null;
            model.form.modelData.defaultLeaseRenewalMTMPercent = null;
            model.form.modelData.monthtoMonthLease = false;
            model.form.modelData.showReferenceData = false;
            model.form.modelData.openPeriodRefDataType = null;
            model.form.modelData.openPeriodRefDataYear = null;
        }
        if(model.form.modelData.propertyID === 0){
            model.form.modelData.propertyID =  model.form.modelData.siteID;
        }
    
       }; 
       
       model.saveLeaseOptionsDetails  = function(){
          var postData = {}; 
          model.resetDefaultValues(); //If Method is None Reset values   
          angular.extend(postData,model.form.modelData);  
          if(postData.openPeriodData === "-Select-" || !model.form.modelData.showReferenceData){
            postData.openPeriodRefDataType=null;
            postData.openPeriodRefDataYear=null;
          }
          else{
                var typeYear = postData.openPeriodData.split("-");
                postData.openPeriodRefDataType = typeYear[0];
                postData.openPeriodRefDataYear = typeYear[1];
          } 
            model.updateNullVal(postData);
            model.setDefaultValues();
            return leaseSVC.updateModelLeaseOptionsDetails(postData).$promise;
         
       };

       model.updateNullVal = function(data){
            if(data.defaultAvgLeaseTerm ===""){
                data.defaultAvgLeaseTerm = null;
            }
            if(data.defaultLeaseRenewalMTMPercent ===""){
                data.defaultLeaseRenewalMTMPercent = null;
            }
            if(data.defaultLeaseRenewalPercent ===""){
                data.defaultLeaseRenewalPercent = null;
            }
       }; 

        
        model.checkForFinalize=function(data){
            model.form.isFinalize=data.isFinal;
        };

        model.isModelFinalized=function(){
            return  model.form.isFinalize;
        };


       model.setEditMode = function(val)  {
            model.isEdit = val;
       };

       model.onEdit = function(){
           model.isEdit = true; 
       }; 

       model.onCancel = function(){
           model.isEdit = false; 
       }; 

       model.ConvertDecimalPlaces = function(input,places){
            if (isNaN(input)){
             return input;
            }
            else{
                var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
                return Math.round(input * factor) / factor;
            }
       };  

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('LeaseOptionsModel', [
            'appLangTranslate',
            'LeaseOptionsSVC',
            'lease-option-config',
            LeaseOptionsModel]);
})(angular);
