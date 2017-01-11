//  Users List Model

(function (angular) {
    "use strict";

    function factory(langTranslate, mrCommentsSvc, baseModel) {
        var text, state, model;
        var translate;
        translate = langTranslate('market-rent').translate;
        model = {};

        model.text = {
            commentHeader:translate('bdgt_rental_mr_cmnt_header'),
            submit: translate('bdgt_rental_mr_cmnt_post_btn_text') 
        };


        model.form = {};

      

         model.emptyData = {
            comments:"",
            showForm:false,
            isNewComment:false,
            distributedID:0,
            showComment:false,
            title:"",
            rowData:[],
            currentRow:{}
        };

       model.data= {
                  records:[],
                  id:0,
                  title:""
                };

       angular.copy(model.emptyData, model.form);

      model.showHideForm=function(flag){
            model.form.showForm=flag;
            
       };

       model.showComment=function(flag){
          model.form.showComment=flag;
            
       };

       model.closeComments=function(data){
             model.showComment(false);
        };

       model.getCurrentRecord = function(){
            return model.form.rowData;
        };


       model.saveUpdateComments = function (data) {         
            model.setNewEditComment(data);
            if (model.isNewComment()) {               
                return mrCommentsSvc.saveMarketRentComment(data).$promise;
              
            }
            else {
               return mrCommentsSvc.updateMarketRentComment(data).$promise;

            }
        };

        model.saveCommentPromise = function (data) {
            return mrCommentsSvc.saveMarketRentComment(data).$promise;
        };

         model.updateCommentPromise = function (data) {
            return mrCommentsSvc.updateMarketRentComment(data).$promise;
        };

        model.getBudgetCommentID=function(){
            return model.form.budgetCommentID;
        };

        model.setNewEditComment=function(data){
            if(data.commentID <= 0){
                model.setNewComment(true);
            }
            else{
                 model.setNewComment(false);
            }
        };

        model.setNewComment=function(flag){
            model.form.isNewComment=flag;
        };

        model.isNewComment=function(){
            return model.form.isNewComment;
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        /* Get Comments  */
        model.getMRComments=function(record){
            model.updateFields(record);
            var promise= model.getCommentsPromise(record);
            promise.then(model.setComments,model.handleError);
        };

        model.handleError = function(resp){
            model.showHideForm(!model.form.showForm);
            model.showComment(true);
        };
        
        model.updateFields=function(data){
            model.form.rowData=data;
            //model.form.taskID=data.taskID;
           // model.form.title=data.title;
            
        };

        model.setComments = function(data){
           var conData=model.ConvertJsonData(data);
           model.setObjectInfo(conData);            
            model.showHideForm(!model.form.showForm);
            model.showComment(true); 
        };

        model.ConvertJsonData=function(data){
            var postData=[];
            if(data.records){
                angular.forEach(data.records, function (item) {
                    var newItem = { 
                            "commentID": item.commentID, 
                            "sourceID": item.commentID ,
                            "lastModifiedDate": item.lastModifiedDate, 
                            "lastModifiedBy": item.lastModifiedBy ,
                            "comment": item.comment
                            
                        };
                    postData.push(newItem);
                });
            }
              return postData;
        };

        model.setObjectInfo=function(data){
           model.data.records=data;
           //model.data.sourceID= model.form.taskID;
           model.data.title=model.form.title;          
        };
       

        model.getCommentsPromise=function(record){
                var cmntSource = model.getCommentSource(record); 
                var params = {
                distributedID: baseModel.getDistID(),
                commentSource: cmntSource.commentSource,
                commentSourceID: cmntSource.commentSourceID                 
            };
                return mrCommentsSvc.getCommentsByMarketRent(params).$promise;
        };

        model.getCommentSource = function(record){
            var source = {};
            if(baseModel.isServiceGroup()){
                source.commentSource = "MarketRentServiceGroup";
                source.commentSourceID = record.serviceGroupID;
            }
            else if(baseModel.isProgram()){
                source.commentSource = "MarketRentProgram";
                source.commentSourceID = record.programID;
            }
            else if(baseModel.isStudentUnit()){
                source.commentSource = "MarketRentUnitStudent";
                source.commentSourceID = record.apartmentID;
            }
            else if(baseModel.isStudentUnitType()){
                source.commentSource = "MarketRentUnitTypeStudent";
                source.commentSourceID = record.unitTypeID;
            }
            else if(baseModel.isUnit()){
                source.commentSource = "MarketRentUnit";
                source.commentSourceID = record.unitID;
            }
            else if(baseModel.isUnitType()){
                source.commentSource = "MarketRentUnitType";
                source.commentSourceID = record.unitTypeID;
            }
            else if(baseModel.isProforma() && record.isProformaUnitType > 0){
                source.commentSource = "MarketRentProforma";
                source.commentSourceID = record.proformaUnitTypeID;
            }
            else if(baseModel.isProforma()){
                source.commentSource = "MarketRentUnitType";
                source.commentSourceID = record.unitTypeID;
            }
            return source;
        };

        
        /* Save Comments */
        model.saveComment=function(data){   
           var postData=model.setSaveData(data);         
            model.saveUpdateComments(postData).then(model.onSaveSuccess);
            //  dir.getComments(selRecord.taskID);
            //  dir.reset();
                
        };

        model.onSaveSuccess=function(data){
            model.getMRComments(model.form.rowData);           
        };

        model.setSaveData=function(data){
           var returnData=  {
                              "commentID": data.commentID ? data.commentID : 0,
                              "distributedID": baseModel.getDistID(),
                              "comment": data.comment,
                              "commentSource": "MarketRent",
                              "visibleToAll": true,
                              "isEditable": true  
                            };
            var record = model.form.rowData;
            if(baseModel.isServiceGroup()){
                returnData.commentSource = "MarketRentServiceGroup";
                returnData.serviceGroupID = record.serviceGroupID;
            }
            else if(baseModel.isProgram()){
                returnData.commentSource = "MarketRentProgram";
                returnData.programID = record.programID;
            }
            else if(baseModel.isStudentUnit()){
                returnData.commentSource = "MarketRentUnitStudent";
                returnData.aptNumber = record.apartmentID;
            }
            else if(baseModel.isStudentUnitType()){
                returnData.commentSource = "MarketRentUnitTypeStudent";
                returnData.unitTypeID = record.unitTypeID;
            }
            else if(baseModel.isUnit()){
                returnData.commentSource = "MarketRentUnit";
                returnData.unitID = record.unitID;
            }
            else if(baseModel.isUnitType()){
                returnData.commentSource = "MarketRentUnitType";
                returnData.unitTypeID = record.unitTypeID;
            }
            else if(baseModel.isProforma() && record.isProformaUnitType > 0){
                returnData.commentSource = "MarketRentProformaUnitType";
                returnData.proformaUnitTypeID = record.proformaUnitTypeID;
            }
            else if(baseModel.isProforma()){
                returnData.commentSource = "MarketRentUnitType";
                returnData.unitTypeID = record.unitTypeID;
            }
           return returnData;
        };

       /* Delete Comment */

        model.deleteComment=function(commentID){
                 var promise= model.deleteCommentPromise(commentID);
                promise.then(model.onDelSuccess,model.handleError);
            };

        model.deleteCommentPromise=function(commentID){
            var params = {
                 commentID: commentID                    
            };
            return mrCommentsSvc.deleteMarketRentComment(params).$promise;
        };

        model.onDelSuccess=function(data){
             model.getMRComments(model.form.rowData); 
        };

        model.getCommentData = function(column){
           // model.form.currentRow = column.row.data;
            model.getMRComments(column.row.data);
        };

       model.setCurrentData = function(column){
             model.updateFields(column.row.data);
       }; 
        
      
        return model;
    }

    angular
        .module("budgeting")
        .factory('marketRentComments', [
                'appLangTranslate',               
                 'marketRentCommentSvc',
                 'BdgtRentalIncomeModelNav',
                factory
        ]);
})(angular);
