//  Users List Model
(function (angular) {
    "use strict";
    function factory(langTranslate, formModel, budgetCommentsResponses, svc, commentsError, $filter, $location, $stateParams, moment) {      
        var model = {},arr = [], translate;
        model.source = "";
        model.sourceItems = ["AccountByAccount", "AccountByAccountReviewer", "OccupancyVacancy", "LeaseRenewalProperty", "LeaseRenewalUnitType", "MarketRentUnitType", "MarketRentUnit",
            "MarketRentUnitTypeStudent", "MarketRentUnitStudent", "MarketRentProgram", "CustomWorksheet", "LossToLease", "CapExROIInput", "CapExROIUnit", "CapExROIUnitType", "TenantRent"];

        model.defaultData = {
            years: [{}],
            property: [{}],
            modelNames: [{}],
            selectedYears: [],
            selectedProperties: [],
            selectedModels: [],
            deletedYears: [],
            deletedProperties: [],
            deletedModels: []
        };
        
        translate = langTranslate('budgetComments').translate;
        model.text = {
            showVisibilityOptions: translate('bdgt_comments_responses_showVisibilityOptions'),
            modalHeader: translate('bdgt_comments_responses_modalHeader'),
            postBtnText: translate('bdgt_comments_responses_postBtnText'),
            txtAreaPlaceHoder: translate('bdgt_comments_responses_txtAreaPlaceHoder'),
            comment_new: translate('bdgt_comments_dashboard_comment_new'),
            comment_edit: translate('bdgt_comments_dashboard_comment_edit'),
            comment_property: translate('bdgt_comments_dashboard_comment_property'),
            comment_pintostart: translate('bdgt_comments_dashboard_comment_pintostart'),
            pintostart: translate('bdgt_comments_dashboard_comment_pintostart'),
            choose_property: translate('bdgt_comments_dashboard_comment_choose_property'),
            choose_model: translate('bdgt_comments_dashboard_comment_choose_model'),
            choose_year: translate('bdgt_comments_dashboard_comment_choose_year'),
            choose_property_lbl: translate('bdgt_comments_dashboard_comment_choose_property_lbl'),
            choose_model_lbl: translate('bdgt_comments_dashboard_comment_choose_model_lbl'),
            choose_year_lbl: translate('bdgt_comments_dashboard_comment_choose_year_lbl'),
            responses: translate('bdgt_comments_dashboard_comment_responses')

        };
        //Setting Default Model Values for creating New comment
        model.modelNames = {            
            "records": [{ "commentModelTypeID": "-2", "modelName": "All Models" },
                        { "commentModelTypeID": 0, "modelName": "Budget" },
                        { "commentModelTypeID": 0, "modelName": "Proforma" },
                        { "commentModelTypeID": 0, "modelName": "Forecast" }]
          
        };
        model.data = angular.extend({}, model.defaultData);   
        model.commentsResponse = "";
        var form = formModel();
        model.commentId = 0;
        model.commentdata = {
            commentID: 0,
            responseID: 0,
            response: ""
        };
        model.emptyData =
            {
                "glAccountComment": { "commentID": 0, "comment": "", "commentSource": "", "pinUntilDate": "" },
                "commentRecipients": [],
                "deleteCommentRecipients": [],
                "commentModelTypes": [],
                "deleteCommentModelTypes": [],
                "commentYears": [],
                "deleteCommentYears": [],
               
            };               
        angular.copy(model.emptyData, model.form);    
        // Getting Comment Responses for selected comment for dashboard
        model.taskCommentResp = function () {
            model.commentsResponses = '';
            angular.element('#user').modal('show');
            angular.element('#userComment').modal('hide');
            var path = $location.absUrl();
            if (path.indexOf("/workspaces/") > 0) {
                svc.getGeneralComments({ commentId: model.commentdata.commentID }, model.setComments).$promise.then(model.onTaskCommentRespSuccess, model.onTaskCommentRespError);
                model.source = "workspaces";
            }            
            else if (path.indexOf("/budgetmodel/") > 0) {
                svc.getBudgetModelComments({ commentId: model.commentdata.commentID }, model.setComments).$promise.then(model.onTaskCommentRespSuccess, model.onTaskCommentRespError);
                model.source = "budgetmodel";
               
            }            
            return model;
        };
        model.navigateToPage = function (data) {
            var distID = $stateParams.distID;
            console.log(data);
            switch (data.commentInfo.commentSource) {
                    case "AccountByAccount":
                        model.navToAccountByAccount(data, distID);
                        break;
                    case "AccountByAccountReviewer":
                        model.navToAccountByAccountReviewer(data, distID);
                        break;
                    case "OccupancyVacancy":
                        model.navToOccupancyVacancy(data, distID);
                        break;
                    case "LeaseRenewalProperty":
                        model.navToLeaseRenewalProperty(data, distID);
                        break;
                    case "LeaseRenewalUnitType":
                        model.navToLeaseRenewalUnitType(data, distID);
                        break;
                    case "MarketRentUnitType":
                        model.navToMarketRent(data, distID);
                        break;
                    case "MarketRentUnit":
                        model.navToMarketRent(data, distID);
                        break;
                    case "MarketRentUnitTypeStudent":
                        model.navToMarketRent(data, distID);
                        break;
                    case "MarketRentUnitStudent":
                        model.navToMarketRent(data, distID);
                        break;
                    case "MarketRentProgram":
                        model.navToMarketRent(data, distID);
                        break;
                    case "CustomWorksheet":
                        model.navToCustomWorksheet(data, distID);
                        break;
                    case "LossToLease":
                        model.navToLossToLease(data, distID);
                        break;
                    case "CapExROIInput":
                        model.navToCapExROIInput(data, distID);
                        break;
                    case "CapExROIUnit":
                        model.navToCapExROIUnit(data, distID);
                        break;
                    case "CapExROIUnitType":
                        model.navToCapExROIUnitType(data, distID);
                        break;
                    case "TenantRent":
                        model.navToTenantRent(data, distID);
                        break;
                    default:
                }
            };

        model.navToAccountByAccount = function (data, distID) {            
            //account-by-account/124/edit/4010.000            
            $location.path('/account-by-account/' + distID + '/edit/' + data.commentInfo.glAccountNumber);
        };
        model.navToAccountByAccountReviewer = function (data, distID) {
            $location.path('/account-by-account/' + distID + '/edit/' + data.commentInfo.glAccountNumber);
        };

        model.navToMarketRent = function (data, distID) {
            //rentalincome/124/marketrent
            $location.path('/rentalincome/' + distID + '/marketrent');
        };

        model.onTaskCommentRespSuccess = function () { 
        };
        model.onTaskCommentRespError = function (data) {
            commentsError.onTaskCommentRespError(data);
        };
        model.setShowForm = function (val) {
            model.showForm = val;
        }; 
        model.setshowComment = function (val) {
            model.showComment = val;
        }; 
        model.setComments = function (data) {            
            model.comments = data.records;
            if(data.records.commentInfo.pinUntilDate!=='')
            {
                model.comments.commentInfo.pinUntilDate= ' : '+data.records.commentInfo.pinUntilDate;
            }
            else {
                model.comments.commentInfo.pinUntilDate = ': N/A';
            }
            //console.log(data.records);
            model.commentID = data.records.commentInfo.commentID;
        };
        model.getNewCommentFields = function () {
            model.reset();
            model.pinToStart = moment(model.pinToStart, 'MM/DD/YYYY');
            model.getNewCommentPropertyFields();
            model.getNewCommentYearFields();             
            model.chooseModel = [{commentModelTypeID: 0, modelName : "Budget" }];
            angular.element('#user').modal('hide');
            angular.element('#userComment').modal('show');
           
        };
        model.getNewCommentPropertyFields = function () {
            svc.getNewCommentPropertyFields(model.setPropertyFields);
            return model;
        };
        model.setPropertyFields = function (data) {
            model.data.property = data.records;
            model.data.property.unshift({
                "propertyID": -1,
                "propertyName": "All Properties"
            });
        };
        model.getNewCommentYearFields = function () {
            svc.getNewCommentYearFields(model.setYearFields);
            return model;
        };
        model.setYearFields = function (data) {
            model.data.years = data.records;
            model.data.years.unshift({
                "budgetYearValue": "All Years",                
                "budgetYearText": "All Years",                
            });      
        };
        // Dashboard comment responses manupulation 
        model.postCommentResponse = function (commentID) { 
            model.commentdata = {
                commentID: model.commentdata.commentID,
                responseID: 0,
                response: model.commentsResponses
            };
            return svc.postCommentResponse(model.commentdata).$promise;
            //model.resetResponsedata();            
        };
        model.onResponseSaveSuccess = function () {
            model.taskCommentResp();
            commentsError.onResponseSaveSuccess();           
        };
        model.onResponseSaveError = function (data) {
            commentsError.onResponseSaveError(data);
        };
        model.postEditResponse = function (commentID, responseData) {
            model.commentdata = {
                commentID: model.commentdata.commentID,
                responseID: responseData.responseID,
                response: responseData.editResponse
            };
            svc.updateCommentResponse({}, model.commentdata).$promise.then(model.onResponseEditSuccess, model.onResponseEditError);
            model.resetResponsedata();
        };
        model.onResponseEditSuccess = function () {
            model.taskCommentResp();
            commentsError.onResponseEditSuccess();          
        };
        model.onResponseEditError = function (data) {
            commentsError.onResponseEditError(data);
        };     
        model.deleteCommentResponse = function (responseID, commentID) {
            return svc.deleteCommentResponse({ responseID: responseID }).$promise;          
        };
        model.onResponseDeleteSuccess = function () {
            model.taskCommentResp();
            commentsError.onResponseDeleteSuccess();
          //  model.reset();
        };
        model.onResponseDeleteError = function (data) {
            commentsError.onResponseDeleteError(data);
        };
       // getting new dashboard comment details
        model.getFormDetails = function () {
            var returnObj = {
                "glAccountComment": {
                    "commentID": 0,
                    "comment": model.commentsResponse,
                    "commentSource": "Dashboard",
                    "pinUntilDate": $filter('date')(new Date(model.pinToStart), 'MM/dd/yyyy'),
                },
                "commentRecipients": model.getValidPropertiesData(model.chooseProperty),
                "deleteCommentRecipients": [],
                "commentModelTypes": model.getValidModelsData(model.chooseModel),
                "deleteCommentModelTypes": [],
                "commentYears": model.getValidYearsData(model.chooseYear),
                "deleteCommentYears": []
            };
            return returnObj;
        };
        model.getValidPropertiesData = function (chooseProperties) {
            arr = [];
            chooseProperties.forEach(function (chooseProperty) {
                arr.push({
                    "commentRecipientID": 0,
                    "commentID": 0,
                    "recipientID": chooseProperty.propertyID,
                    "recipientName": chooseProperty.propertyName
                });
            });           
            return arr;
        };
        model.getValidModelsData = function (chooseModel) {
            arr = [];
            chooseModel.forEach(function (chooseModel) {
                arr.push({
                    "commentModelTypeID": 0,
                    "commentID": 0,
                    "modelType": chooseModel.modelName
                });
            });
            return arr;
        };
        model.getValidYearsData = function (chooseYear) {
            arr = [];
            chooseYear.forEach(function (chooseYear) {
                if (chooseYear.budgetYearValue === "All Years") {
                    arr.push({
                        "commentYearID": 0,
                        "commentID": 0,
                        "budgetYear": 0
                    });
                }
                else {
                    arr.push({
                        "commentYearID": 0,
                        "commentID": 0,
                        "budgetYear": chooseYear.budgetYearValue
                    });
                }
            });
            return arr;
        };
        model.saveData = function () {
            var postData = {};
            postData = model.getFormDetails();
            return svc.addDashboardCommentsDetails(postData).$promise;
        };
  
        model.onSaveSuccess = function (data) {
            commentsError.showDashboardSaveSuccess();
            angular.element('#userComment').modal('hide');
            model.reset();
        };
        model.onSaveError = function (data) {
            commentsError.showCommentsSaveException(data);            
        };
        //submitting edit dashboard comment data -----------------------------------------------------------------------------------------------------------
        model.getEditDetails = function () {
            var returnObj = {
                "glAccountComment": {
                    "commentID": model.commentID,
                    "comment": model.commentsResponse,
                    "commentSource": "Dashboard",
                    "pinUntilDate": $filter('date')(new Date(model.pinToStart), 'MM/dd/yyyy')
                },
                "commentRecipients": model.getValidPropertyData(model.chooseProperty),
                "deleteCommentRecipients": model.data.deletedProperties,
                "commentModelTypes": model.getValidModelData(model.chooseModel),
                "deleteCommentModelTypes": model.data.deletedModels,
                "commentYears": model.getValidYearData(model.chooseYear),
                "deleteCommentYears": model.data.deletedYears
            };         
            return returnObj;
        };
        model.getValidPropertyData = function (chooseProperties) {
            arr = [];
            chooseProperties.forEach(function (chooseProperty) {
                arr.push({
                    "commentRecipientID": 0,
                    "commentID": model.commentID,
                    "recipientID": chooseProperty.propertyID,
                    "recipientName": chooseProperty.propertyName
                });
            });
            return arr;
        };
        model.getValidModelData = function (chooseModel) {
            arr = [];
            chooseModel.forEach(function (chooseModel) {
                arr.push({
                    "commentModelTypeID": chooseModel.commentModelTypeID,
                    "commentID": model.commentID,
                    "modelType": chooseModel.modelName
                });
            });
            return arr;
        };
        model.getValidYearData = function (chooseYear) {
            arr = [];
            chooseYear.forEach(function (chooseYear) {
                if (chooseYear.budgetYearValue === 0 || chooseYear.budgetYearValue === "All Years")
                    {
                    arr.push({
                        "commentYearID": chooseYear.commentYearID,
                        "commentID": model.commentID,
                        "budgetYear": 0
                        });
                    }
                    else
                    {
                    arr.push({
                        "commentYearID": chooseYear.commentYearID,
                        "commentID": model.commentID,
                        "budgetYear": chooseYear.budgetYearValue
                        }); 
                    }
            });
            return arr;
        }; 
        model.getDeletedRecipientData = function () {
            var arr = [];
            if (model.data.deletedProperties.length > 0) {
                model.deletedProperties.forEach(function (chooseProperty) {
                    arr.push(chooseProperty.recipientID);
                });
            }
            return arr;
        };
        model.getDeletedModelData = function () {
            var arr = [];
            if (model.data.deletedModels.length > 0) {
                model.deletedModels.forEach(function (chooseProperty) {
                    arr.push(chooseProperty.commentModelTypeID);
                });
            }
            return arr;
        };
        model.getDeletedYearData = function () {
            var arr = [];
            if (model.data.deletedYears.length > 0) {
                model.deletedYears.forEach(function (chooseProperty) {
                    arr.push(chooseProperty.commentYearID);
                });
            }
            return arr;
        };
        model.saveEditData = function () {
            var postData = {};
            postData = model.getEditDetails();
            return svc.saveEditDashboardCommentsDetails(postData).$promise;
        };
     
        model.onUpdateSuccess = function (data) {
            commentsError.showDashboardUpdateSuccess();
            model.reset();            
        };    
        model.onEditError = function (data) {
            commentsError.showCommentsEditException(data);
        };          
        //Delete Dashboard Comment---------------------------------------------------------------------------------------------------------------------------------
        model.deleteDashboardComment = function (commentID) {
            var paramsData = {
                commentID: commentID
            };
            return svc.deleteDashboardComment(paramsData).$promise;

            //var promise = model.deleteDashboardCommentData(paramsData);
            //promise.then(model.onDeleteSuccess, model.onDeleteError);
        };     
        model.onDeleteSuccess = function (data) {
            commentsError.showDashboardDeleteSuccess();
        };
        //model.deleteDashboardCommentData = function (paramsData) {
        //    return svc.deleteDashboardComment(paramsData).$promise;
        //};
        model.onDeleteError = function (data) {
            commentsError.showCommentsDeleteException(data);
        };
        //Edit Dashboard Comment starts here      
        model.editDashboardComment = function (data) {
            model.commentsResponse = data.commentInfo.comment;
            model.chooseProperty = model.getValidPropertiesResp(data.commentRecipientList);
            model.chooseModel = model.getValidModelResp(data.commentModelTypeList);
            model.chooseYear = model.getValidYearResp(data.commentYearList);
            model.pinToStart = moment(data.commentInfo.pinUntilDate, 'MM/DD/YYYY');
           };
        model.getValidPropertiesResp = function (chooseProperties) {
            arr = [];            
            chooseProperties.forEach(function (chooseProperty) {
                arr.push({
                    "propertyID": chooseProperty.commentRecipientID,
                    "propertyName": chooseProperty.recipientName
                });
            });                       
            model.data.selectedProperties = arr;               
            return arr;
        };
        model.getValidModelResp = function (chooseModels) {
            arr = [];
            chooseModels.forEach(function (chooseModel) {
                arr.push({
                    "commentModelTypeID": chooseModel.commentModelTypeID,
                    "modelName": chooseModel.modelType
                });
            });            
            model.data.selectedModels = arr;
            return arr;
        };
        model.getValidYearResp = function (chooseYears) {
            arr = [];
            chooseYears.forEach(function (chooseYear) {
                if (chooseYear.budgetYear !== 0 && chooseYear.budgetYear !== "0") {
                    arr.push({
                        "commentYearID": chooseYear.commentYearID,
                        "budgetYearValue": chooseYear.budgetYear
                    });
                }
                else {
                    arr.push({
                        "commentYearID": chooseYear.commentYearID,
                        "budgetYearValue": "All Years"
                    });
                }
            });
            model.data.selectedYears = arr;
            return arr;
        };
        model.getProperties = function (query) {
            model.resetPropertiesData();
            if (query !== "") {
                model.getPropertiesList(query).then(model.assignProperties);
            }
        };
        model.getPropertiesList = function (query) {
            return svc.abortGetProperties().getTaskPropertiesList(query);
        };
        model.assignProperties = function (response) {           
            var records = response.data.records;   
            var isAllPropertyExists = false;
            model.chooseProperty.forEach(function (item) {

                if (item.propertyName.toLowerCase() === "all properties") {
                    isAllPropertyExists = true;
                }
                var propRecord = $filter('filter')(records, function (d) {
                    return d.propertyName === item.propertyName;
                });
                if (propRecord.length > 0) {
                    var index = records.indexOf(propRecord[0]);
                    records.remove(index);                   
                }
            });            
           if (!isAllPropertyExists) {
               records.unshift({
                   "propertyID": -1,
                   "propertyName": "All Properties"
               });
           }
            model.data.property = records;
        };
        model.getYears = function (query) {
            model.resetYearsData();
            model.getYearList(query).then(model.assignYears);
        };
        model.getYearList = function (query) {
            return svc.abortGetYears().getTaskYearsList(query);
        };
        model.assignYears = function (response) {
            var records = response.data.records;
            var isAllYearsExists = false;
            model.chooseYear.forEach(function (item) {
                if (item.budgetYearValue === "All Years") {
                    isAllYearsExists = true;
                }
                var propRecord = $filter('filter')(records, function (d) {
                    return d.budgetYearValue === item.budgetYearValue;
                });
                if (propRecord.length > 0) {
                    var index = records.indexOf(propRecord[0]);
                    records.remove(index);                  
                }
            });       
            if (!isAllYearsExists) {
                records.unshift({
                    "budgetYearText": "All Years",
                    "budgetYearValue": "All Years"
                });
            }
            model.data.years = records;
        };
        model.getModels = function (query) {
            model.assignModels(model.modelNames);
        };
        model.assignModels = function (response) {
            var records = response.records;
            model.chooseModel.forEach(function (item) {
                var propRecord = $filter('filter')(records, function (d) {
                    return d.modelName === item.modelName;
                });
                if (propRecord.length > 0) {
                    var index = records.indexOf(propRecord[0]);
                    records.remove(index); 
                }
            });
            model.data.modelNames = records;
        };
        model.addDeletedProperty = function (item) {
            if (item.propertyID > 0) {
                model.addDeletedPropertyItem(item);
            }
        };
        model.addDeletedModel = function (item) {
            if (item.commentModelTypeID > 0) {
                model.addDeletedModelItem(item);
            }
        };
        model.addDeletedYear = function (item) {
            if (item.commentYearID > 0) {
                model.addDeletedYearItem(item);
            }
        };
        model.addDeletedPropertyItem = function (item) {
            var record = $filter('filter')(model.data.deletedProperties, function (d) {
                return d.propertyID === item.propertyID;
            });
            if (record === undefined || record.length === 0) {
                model.data.deletedProperties.push(item.propertyID);              
            }
        };
        model.addDeletedModelItem = function (item) {
            var record = $filter('filter')(model.data.deletedModels, function (d) {
                return d.commentModelTypeID === item.commentModelTypeID;
            });
            if (record === undefined || record.length === 0) {
                model.data.deletedModels.push(item.commentModelTypeID);                
            }
        };
        model.addDeletedYearItem = function (item) {
            var record = $filter('filter')(model.data.deletedYears, function (d) {
                return d.commentYearID === item.commentYearID;
            });
            if (record === undefined || record.length === 0) {
                model.data.deletedYears.push(item.commentYearID);                
            }          
        };
        //Reset fields starts here ----------------------------------------------------------------------------------------------------------------------------
        model.resetYearsData = function () {
            model.data.years = [];
        };
        model.resetModelData = function () {
            model.data.modelNames = [];
        };
        model.resetPropertiesData = function () {
            model.data.property = [];
        };
      model.resetResponsedata = function () {
            model.commentdata = {
                commentID: model.commentdata.commentID,
                responseID: 0,
                response: ""
            };
            model.commentsResponses = "";
        };
           
        //Form Validations
        model.isValidCommentResponse = function () {
            if (model.commentsResponse === "") {
                return false;
            }
            else {
                return true;
            }
        };
        model.isValidCommentResponses = function () {
            if (model.commentsResponses === "") {
                return false;
            }
            else {
                return true;
            }
        };
        model.isValidProperty = function () {
            if (model.chooseProperty.length === 0) {
                return false;
            }
            else {
                return true;
            }
        };
        model.isValidModel = function () {
            if (model.chooseModel.length === 0) {
                return false;
            }
            else {
                return true;
            }
        };
        model.isValidYear = function () {
            if (model.chooseYear.length === 0) {
                return false;
            }
            else {
                return true;
            }
        };
        model.isValidEditResponse = function () {
            if (model.editResponse === "") {
                return false;
            }
            else {
                return true;
            }
        };
        model.reset = function (form) {                
            angular.copy(model.emptyData, model.form);
            model.commentID = 0;
            model.commentdata = {
                commentID: 0,
                responseID: 0,
                response: ""
            };
            model.commentsResponse = "";
            model.commentsResponses = "";
            model.chooseProperty = [];
            model.chooseModel = [];
            model.chooseYear = [];            
            model.pinToStart = undefined;
            model.source = "";
        };
        return model;
    }
    angular
        .module("budgeting")
        .factory('dashboardComment', ['appLangTranslate', 'baseForm', 'budgetCommentsResponses', 'commentsRespSvc', 'commentsError', '$filter', '$location','$stateParams','moment',
                factory
        ]);
})(angular);