//AccountByAccountView Model


(function (angular) {
    "use strict";

    function accountByAccountView(preferences,viewModel) {     
        var model = {};     
       
        model.form = {};

        model.emptyData = { 
                    preferenceData:[]
                };

        
        angular.copy(model.emptyData, model.form);

        model.getPreferencesData=function(){
            var data=model.prepareRefData();
        };

        model.prepareRowOptions=function(){ 
             var filList=[],hideZeroRows,hasReferenceRows,rowHeightClass,gridViewType;
             hideZeroRows=  model.getHideZeroRowsObject(); 
             filList.push(hideZeroRows);
             hasReferenceRows=   model.getHasReferenceRowsObject(); 
             filList.push(hasReferenceRows);
             rowHeightClass= model.getRowHeightClassObject() ; 
             filList.push(rowHeightClass);
             gridViewType=  model.getGridViewTypeObject() ; 
             filList.push(gridViewType); 
           return filList;

        };

        model.getHideZeroRowsObject=function(){
            return model.buildObjToPost("hideZeroRows", viewModel.getHideZeroRows()); 
        };

         model.getHasReferenceRowsObject=function(){
            return model.buildObjToPost("hasReferenceRows", viewModel.getHasReferenceData()); 
        };

         model.getRowHeightClassObject=function(){
            return model.buildObjToPost("rowHeightClass",viewModel.getRowHeightClass()); 
        };

         model.getGridViewTypeObject=function(){
            return model.buildObjToPost("gridViewType",viewModel.getGridViewType()); 
        };


        model.buildObjToPost=function(field,value){
                return   {
		                    "screen": "accountByAccount",
	                        "fieldType": field,
	                        "fieldValue": value
	                    };
        };

       model.buildColumnPeriodOptions=function(data){
             var filList=[],list;
             if(Object.keys(data).length >0){
                angular.forEach(data,function(value,key){//value,key
                    if(value.key=="forecastUseData"){
                        list=model.buildObjToPost("forecastUseData",value.state.active);
                         filList.push(list);
                    }
                    else if(value.key=="firstReferenceData"){
                        list=model.buildObjToPost("firstReferenceData",value.state.active);
                         filList.push(list);
                    }
                    else if(value.key=="rollingActual"){
                         list=model.buildObjToPost("rollingActual",value.state.active);
                          filList.push(list);
                    }  
                    else if(value.key=="varianceAmount"){
                         list=model.buildObjToPost("varianceAmount",value.state.active);
                          filList.push(list);
                    }  
                     else if(value.key=="variancePercent"){
                         list=model.buildObjToPost("variancePercent",value.state.active);
                          filList.push(list);
                    }    
                      else if(value.key=="perUnit"){
                         list=model.buildObjToPost("perUnit",value.state.active);
                          filList.push(list);
                    }  
                    else if(value.key=="perSqFT"){
                         list=model.buildObjToPost("perSqFT",value.state.active);
                          filList.push(list);
                    }             
                   
                });
            }
           return filList;
       };

        model.saveRowOptions=function(){
           var data=viewModel.getColumnOptions();
           var prefList=[],list,columList; 
           prefList= model.prepareRowOptions(); 
           columList=model.buildColumnPeriodOptions(data);
           var objToSave= prefList.concat(columList);        
           preferences.savePreferences(objToSave);
        };

         model.getRowOptions=function(){
            var params={"screenName":"accountByAccount" };
           return  preferences.getPreferencesPromise(params);
        };

       model.setRowOptions=function(data){
             model.configRowOptions(data);
            model.setPreferenceObject(data);
           
       };

       model.configRowOptions=function(data){
            if(Object.keys(data.records).length >0){
               if(data.records[0]["screen"]=="accountByAccount"){
                    model.setRowColumnOptions(data);
                }                
            }
            else{
                model.setDefaultRowColumnOptions();
             }
       };

        model.getDefaultPreferences=function(){
            
            return {
                records:[
                            {
                              "screen": "accountByAccount",
                              "fieldType": "hideZeroRows",
                              "fieldValue": false
                            },
                            {
                              "screen": "accountByAccount",
                              "fieldType": "hasReferenceRows",
                              "fieldValue": false
                            },
                            {
                              "screen": "accountByAccount",
                              "fieldType": "rowHeightClass",
                              "fieldValue": "small"
                            },
                            {
                              "screen": "accountByAccount",
                              "fieldType": "gridViewType",
                              "fieldValue": "monthly"
                            },
                            {
                              "screen": "accountByAccount",
                              "fieldType": "forecastUseData",
                              "fieldValue": true
                            },
                            {
                              "screen": "accountByAccount",
                              "fieldType": "firstReferenceData",
                              "fieldValue": true
                            },
                            {
                              "screen": "accountByAccount",
                              "fieldType": "rollingActual",
                              "fieldValue": true
                            },
                             {
                              "screen": "accountByAccount",
                              "fieldType": "varianceAmount",
                              "fieldValue": true
                            },
                            {
                              "screen": "accountByAccount",
                              "fieldType": "variancePercent",
                              "fieldValue": true
                            },
                            {
                              "screen": "accountByAccount",
                              "fieldType": "perUnit",
                              "fieldValue": true
                            },
                            {
                              "screen": "accountByAccount",
                              "fieldType": "perSqFT",
                              "fieldValue": true
                            }
                      ]
                   };
            
        };   
        

        //preferenceData
       model.setPreferenceObject=function(data){
              if(Object.keys(data.records).length >0){
                 model.form.preferenceData=data;
              }
             else{
                   model.form.preferenceData=model.getDefaultPreferences(); 
                }
       };

       model.setRowColumnOptions=function(data){
             angular.forEach(data.records,function(item){
                switch(item.fieldType){
                   case "hideZeroRows": 
                        viewModel.setHideZeroRows(item.fieldValue);
                        break;
                   case "hasReferenceRows": 
                        viewModel.setHasReferenceData(item.fieldValue);
                        break; 
                   case "rowHeightClass":  
                        viewModel.setRowHeightClass(item.fieldValue);
                        break;
                   case "gridViewType":
                        viewModel.setGridViewType(item.fieldValue);
                        break;
                   case "forecastUseData": 
                        viewModel.setForecastUseData(item.fieldValue);
                        break; 
                   case "firstReferenceData":  
                        viewModel.setFirstReferenceData(item.fieldValue);
                        break;
                   case "rollingActual":
                        viewModel.setRollingActual(item.fieldValue);
                        break;

                 case "varianceAmount": 
                        viewModel.setVarianceAmount(item.fieldValue);
                        break; 
                   case "variancePercent":  
                        viewModel.setVariancePercent(item.fieldValue);
                        break;
                   case "perUnit":
                        viewModel.setPerUnit(item.fieldValue);
                        break;
                     case "perSqFT":
                        viewModel.setPerSqFT(item.fieldValue);
                        break;
                }
            });
       };

      

       model.setDefaultRowColumnOptions=function(){
               viewModel.setDefaultRowOptions();            
       };

       model.getPreferenceData=function(){
            return model.form.preferenceData;
       };
    
       model.reset=function(){
            angular.copy(model.emptyData, model.form);
       };
        return model;
    }

    angular
        .module("budgeting")
        .factory('managePreferences', [ 'preferences','accountByAccountView',
            accountByAccountView]);
})(angular);
