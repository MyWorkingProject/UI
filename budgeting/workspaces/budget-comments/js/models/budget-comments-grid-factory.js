//  User Properties Model

(function (angular) {
    "use strict";

    function factory(langTranslate, $filter, commentsSvc,  gridModel, commentsError, gridConfig,$window,budgetComment, dashboardComment) {
        var text, grid,
            model, translate;
        translate = langTranslate('budgetComments').translate;
        text = {
            showFilters: translate('bdgt_comments_showfilterText'),
            hideFilters: translate('bdgt_comments_hidefilterText'),
            pageHeading: translate('bdgt_comments_pageHeading'),
            addBtnText:  translate('bdgt_comments_addBtnText'),
            print:  translate('bdgt_comments_print')

        };

        model = {
            text: text,
            reLoad: false
        };

        model.init = function () {
            grid = model.grid = gridModel();
            grid.subscribe('sortBy', model.sort);
            grid.subscribe('filterBy', model.load);
            grid.subscribe('paginate', model.paginate);
            grid.setConfig(gridConfig).setEmptyMsg(translate('bdgt_comments_getEmptyMsg'));
            grid.taskCommentResp = function (commentId) {

            model.taskCommentResp(commentId);
              };
            return model;
        };
        model.taskCommentResp = function (commentId) {
            dashboardComment.commentdata.commentID = commentId;
            dashboardComment.taskCommentResp();
        };

         model.load = function () {
            var data = grid.busy(true).flushData().getQuery();
            return budgetComment.getCommentData(data).success(model.setGridData, commentsError.getTasksException);
        };

         model.sort = function () {
            var data = grid.busy(true).flushData().getQuery();
            data = data.replace("?datafilter=","");
            data = $window.atob(data);
            data = data.replace("thumb","createdBy");
            data = $window.btoa(data);
            data = "?datafilter=" + data;
            return  budgetComment.getCommentData(data).success(model.setGridData, commentsError.getTasksException);
        };

        model.paginate = function () {
            var data = grid.getQuery();
            return  budgetComment.getCommentData(data).success(model.addGridData, commentsError.getTasksException);
        };


        model.setGridData = function (response) {
         
            grid.setData(response).busy(false);
        };

      

        model.addGridData = function (response) {
        
            grid.addData(response).busy(false);
        };

        model.setGridFilterState = function (state) {
            grid.setFilterState(state);
            return model;
        };

        model.reset = function(){

        };

        return model.init();
    }
    angular
        .module("budgeting")
        .factory('budgetCommentsGridFactory', [
                 'appLangTranslate', 
                '$filter', 
                'commentsSvc', 
                'rpGridModel', 
                'commentsError', 
                'commentsConfig',               
                '$window',
                'budgetComment',
                'dashboardComment',
            factory
        ]);
})(angular);
