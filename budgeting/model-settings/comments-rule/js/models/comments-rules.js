//  Users List Model

(function (angular) {
    "use strict";

    function factory(langTranslate, svc, msgSVC, formConfig, budgetDetails) {
        var text, state, model;
        var translate = langTranslate('comments-rule').translate;    
        model = {};
        model.form = {};
        model.emptyData = {
            state: {
                    isEdit:false,
                    isView:true
            },
            formData: {
                source: [{
                    value: "None",
                    text: "None"
                }, {
                    value: "AccountType",
                    text: "Account Type"
                }]
            },
            commentRuleOption: {
                   budgetModelID: 0 ,
                   propertyID: 0,
                   distributedID: 0,
                   commentRuleMethod: "None",
                   editCommentRule: false
            },
            modelCommentRules: [],
            
        }; 
              
       //model.data = {"Test":"1234"};
       
       model.init = function () {
            angular.copy(model.emptyData, model.form);
            return model;
        };
  
       model.updateBudgetDetails = function(){
        
       }; 

        model.setOptions=function(){
              formConfig                
                .setOptions("source", model.form.formData.source);

        };


       model.load = function(){
        //get service calls
            //svc.getRuleBaseComments().success(model.setData,model.onError);
       }; 

       model.reset = function(){
         angular.copy(model.emptyData, model.form);
       }; 
        
       model.setData = function(resp){

       }; 

       model.onError = function(resp){

       }; 
 
       model.getKeyValue = function(key) {
          return translate(key);
       };

       model.onEdit = function(){
           model.form.state.isEdit = true;
           model.form.state.isView = false;
          
       };

       model.onCancel = function(){
           model.form.state.isEdit = false;
           model.form.state.isView = true; 
        
       };

       model.setState = function(val){
           model.form.state.isEdit = val;
           model.form.state.isView = !val; 
       }; 

       model.getState = function(){
            return model.form.state;
       };  

       model.updateModelData = function(resp){
           angular.extend(model.form.commentRuleOption, resp.records.commentRuleOptions);
         //  model.form.commentRuleMethodForAcntType = model.form.commentRuleOption.commentRuleMethod === "AccountType" ? "Account Type" : model.form.commentRuleOption.commentRuleMethod;
       };

       model.saveCommentRules = function(data){
        if(model.form.commentRuleOption.commentRuleMethod !== "None" && data.length === 0){
            model.showSelectMsg();
            return false;
        }
        else{
            var postData = {commentRuleOptions:{},modelCommentRules:[]};
            angular.copy(model.form.commentRuleOption, postData.commentRuleOptions);
          //  postData.commentRuleOptions.commentRuleMethod = model.form.commentRuleOption.commentRuleMethod === "Account Type" ? "AccountType" : model.form.commentRuleOption.commentRuleMethod;

            angular.forEach(data, function (item) {               
               // item.operator = item.operator === "Above OR Below" ? "AboveORBelow" : item.operator;
                    postData.modelCommentRules.push(item);
                });
            model.updateDetails(postData).then(model.showSaveNotification,model.showPutErrorNotification);
         }
       }; 

       model.updateDetails = function(postData){
            return svc.updateModelCommentsRules(postData).$promise;
       }; 

       model.showSelectMsg = function(){
            msgSVC.showNotification(model.getKeyValue('comments_rule_select_record_txt'));
       }; 

        model.showPutErrorNotification = function (data) {
            msgSVC.onPutError(data);
       };

       model.showSaveNotification = function () {
           msgSVC.showSaveSuccNotification();
           budgetDetails.forceLoad();
            model.onCancel();
        };

         model.isValidateAmount = function (data) {
           
            if (data === ""){
                return false;
            }
            else  if(data >= 0 ){
               return true;                
            }
            
           return false;
        };
       

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('budgetCommentsRules', [
                'appLangTranslate',
                'commentsRuleSvc',
                'CommentsRulesError',
                'comments-rule-config',
                'budgetDetails',
                 //'sessionInfo',
                // 'commentsSvc',
                // '$location',  
               //  '$stateParams',
                factory
        ]);
})(angular);
