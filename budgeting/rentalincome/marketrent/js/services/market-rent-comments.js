//  Mastercharts Service

(function (angular) {
    "use strict";

    function budgetTasksSvc( $q, $http,$resource, baseModel) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

         function saveMarketRentComment() {

            url = '/api/budgeting/common/glaccountcomment';
 
            actions = {
                save: {
                    method: 'POST'

                }
            };
            return $resource(url, defaults, actions);

        }

         function updateMarketRentComment() {

           url = '/api/budgeting/common/glaccountcomment';
            actions = {
                update: {
                    method: 'PUT'

                }
            };
            return $resource(url, defaults, actions);

        }

         function getCommentsByMarketRent() {
            var url, actions, defaults;
            url = '/api/budgeting/common/distribute/:distributedID/commentsource/:commentSource/commentsourceid/:commentSourceID/budgetcomments';    
            defaults = {};   
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        distributedID: 1,
                        commentSource: "unit",
                        commentSourceID: 1
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

      
        function deleteMarketRentComment() {
            var defaults, actions,
            url = '/api/budgeting/common/comment/:commentID';
            defaults = {};
            actions = {
                delete: {
                    method: 'DELETE',
                    params: {
                        commentID: 1
                    }
                }
            };

            return $resource(url, defaults, actions);
        }


       /* function setCommentSource(record){
            if(baseModel.isServiceGroup()){
                record.comment = "MarketRentServiceGroup";
                record.commentID = record.serviceGroupID;
            }
            else if(baseModel.isProgram()){
                record.comment = "MarketRentProgram";
                record.commentID = record.programID;
            }
            else if(baseModel.isStudentUnit()){
                record.comment = "MarketRentUnitStudent";
                record.commentID = record.apartmentID;
            }
            else if(baseModel.isStudentUnitType()){
                record.comment = "MarketRentUnitTypeStudent";
                record.commentID = record.unitTypeID;
            }
            else if(baseModel.isUnit()){
                record.comment = "MarketRentUnit";
                record.commentID = record.unitID;
            }
            else if(baseModel.isUnitType()){
                record.comment = "MarketRentUnitType";
                record.commentID = record.unitTypeID;
            }
            else if(baseModel.isProforma() && record.isProformaUnitType > 0){
                record.comment = "MarketRentProforma";
                record.commentID = record.proformaUnitTypeID;
            }
            else if(baseModel.isProforma()){
                record.comment = "MarketRentUnitType";
                record.commentID = record.unitTypeID;
            }
           // return source;
        } */

        function getCommentSource(param){
            if(baseModel.isServiceGroup()){
                param.commentSource = "MarketRentServiceGroup";
                param.commentSourceID = param.serviceGroupID;
            }
            else if(baseModel.isProgram()){
                param.commentSource = "MarketRentProgram";
                param.commentSourceID = param.programID;
            }
            else if(baseModel.isStudentUnit()){
                param.commentSource = "MarketRentUnitStudent";
                param.commentSourceID = param.rowTitle;//param.apartmentID;
            }
            else if(baseModel.isStudentUnitType()){
                param.commentSource = "MarketRentUnitTypeStudent";
                param.commentSourceID = param.unitTypeID;
            }
            else if(baseModel.isUnit()){
                param.commentSource = "MarketRentUnit";
                param.commentSourceID = param.unitID;
            }
            else if(baseModel.isUnitType()){
                param.commentSource = "MarketRentUnitType";
                param.commentSourceID = param.unitTypeID;
            }
            else if(baseModel.isProforma() && param.proformaUnitTypeID > 0){
                param.commentSource = "MarketRentProformaUnitType";
                param.commentSourceID = param.proformaUnitTypeID;
            }
           else if(baseModel.isProforma()){
                param.commentSource = "MarketRentUnitType";
                param.commentSourceID = param.unitTypeID;
            } 
            //return source;
        }

         function setSaveData(data){
           var returnData=  {
                              "commentID": data.commentID ? data.commentID : 0,
                              "distributedID": baseModel.getDistID(),
                              "comment": data.commentText,
                              "commentSource": "MarketRent",
                              "visibleToAll": true,
                              "isEditable": true  
                            };
            //var record = model.form.rowData;
            if(baseModel.isServiceGroup()){
                returnData.commentSource = "MarketRentServiceGroup";
                returnData.serviceGroupID = data.serviceGroupID;
            }
            else if(baseModel.isProgram()){
                returnData.commentSource = "MarketRentProgram";
                returnData.programID = data.programID;
            }
            else if(baseModel.isStudentUnit()){
                returnData.commentSource = "MarketRentUnitStudent";
                returnData.aptNumber = data.rowTitle;
            }
            else if(baseModel.isStudentUnitType()){
                returnData.commentSource = "MarketRentUnitTypeStudent";
                returnData.unitTypeID = data.unitTypeID;
            }
            else if(baseModel.isUnit()){
                returnData.commentSource = "MarketRentUnit";
                returnData.unitID = data.unitID;
            }
            else if(baseModel.isUnitType()){
                returnData.commentSource = "MarketRentUnitType";
                returnData.unitTypeID = data.unitTypeID;
            }
            else if(baseModel.isProforma() && data.proformaUnitTypeID > 0){
                returnData.commentSource = "MarketRentProformaUnitType";
                returnData.proformaUnitTypeID = data.proformaUnitTypeID;
            }
           else if(baseModel.isProforma()){
                returnData.commentSource = "MarketRentUnitType";
                returnData.unitTypeID = data.unitTypeID;
            } 
           return returnData;
        }


         function getComments(response) {
          /*  response.records.forEach(function (data) {
               setCommentSource(data);
            }); */
             return response;
        }
        function getCommentList(params) {
            getCommentSource(params);
            var _params = {
                distributedID: baseModel.getDistID(),
                commentSource: params.commentSource,
                commentSourceID: params.commentSourceID,
            };
            return getCommentsByMarketRent().getData(_params).$promise.then(getComments);
        }

        function postComment(params) {
            var data = setSaveData(params);
            return saveMarketRentComment().save(data).$promise;
            //return payrollItemCommentResource().post(comment).$promise;
        }

        function updateComment(params) {
            var data = setSaveData(params);
            return updateMarketRentComment().update(data).$promise;
        }

        function deleteComment(commnetID) {
            return deleteMarketRentComment().delete({ commentID: commnetID }).$promise;
        }

      
      /*  svc.saveMarketRentComment = saveMarketRentComment().save;
        svc.updateMarketRentComment = updateMarketRentComment().update;
        svc.getCommentsByMarketRent = getCommentsByMarketRent().getData;
        svc.deleteMarketRentComment = deleteMarketRentComment().delete;*/

        svc.getCommentList = getCommentList;
        svc.postComment = postComment;
        svc.updateComment = updateComment;
        svc.deleteComment = deleteComment; 


        return svc;

    }

    angular
        .module("budgeting")
        .factory('marketRentCommentSvc', [
             '$q',
            '$http','$resource','BdgtRentalIncomeModelNav',
            budgetTasksSvc]);
})(angular);
