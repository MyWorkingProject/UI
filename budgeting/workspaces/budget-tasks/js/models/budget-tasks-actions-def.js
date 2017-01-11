//  Budget Task List Actions
(function (angular) {
    "use strict";

    function factory(gridActions, actionsMenuModel,langTranslate) {
        var model = gridActions();
        var translate = langTranslate('budgetTasks').translate;

        


        model.get = function (record) {
            var actionsModel = actionsMenuModel();

            actionsModel.className = "rp-actions-menu-1";

            var actionInfo={
                  view:  {
                         data: record,
                         text: translate('actions_view'),
                         iconClassName: "view",
                         href: '#/manage-tasks/' + record.taskID
                        // method: model.getMethod("view")
                     },
                   markAsComplete: {
                        data: record,
                        text: translate('actions_markComplete'),
                        //iconClassName: 'chart-edit',
                        method: model.getMethod('markTaskAsComplete')
                    },
                   addComment: {
                          data: record,
                        text: translate('actions_addComment'),
                        method:model.getMethod('addComments')
                        //iconClassName: 'chart-assign',
                        //href: '#/admin/coa/defadj/' + record.masterChartID
                    },
                   print: {

                       // data: copyParamsData,
                        text: translate('actions_print'),
                        //method: model.getMethod('copyMasterChart'),
                        //iconClassName: 'chart-copy'

                    },
                   del: {

                        data: record,
                        text: translate('actions_delete'),
                         method: model.getMethod('deleteTask')
                        //method: model.getMethod('copyMasterChart'),
                        //iconClassName: 'chart-copy'

                    }}; 
            

          var edit,comp,addComment,print,finalActions;
            if(record.isEditable){
                 edit=[{
                         data: record,
                         text: translate('actions_view'),
                         iconClassName: "view",
                         href: '#/manage-tasks/' + record.taskID                      
                     }];
            }
            else{
                    edit=[];
                }
            

            if(record.status!=="Complete"){                
               if(edit.length>0){
                    comp= edit.concat(actionInfo.markAsComplete);
                }
                else{
                     comp= [actionInfo.markAsComplete]; 
                } 
            }
            else{
               comp=edit;     
            }
            
            if(comp.length>0){
                addComment=comp.concat(actionInfo.addComment);
                print=addComment.concat(actionInfo.print);
            }
            else{
                addComment=[actionInfo.addComment];
                print=addComment.concat(actionInfo.print);
            }           

            if(record.isEditable){
               finalActions=  print.concat(actionInfo.del);
            }
            else{
                finalActions=print;
            }
             

            actionsModel.actions=finalActions;

            return actionsModel;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("budgetTaskActionsDef", ["rpGridActions", "rpActionsMenuModel","appLangTranslate", factory]);
})(angular);
