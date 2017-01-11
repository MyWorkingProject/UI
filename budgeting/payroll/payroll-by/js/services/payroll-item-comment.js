//  Payroll Item Comment Service

(function (angular) {
    'use strict';
    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';
        function getPayrollItemComments() {
            var url = baseUrl + '/expenses/payroll/:payrollID/distribute/:distID/payrolltype/:payrollType/payrollitem/:payrollItemID/payrollnote',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }
        function payrollItemCommentResource() {
            var url = baseUrl + '/expenses/payrollnote/:noteID',
                defaults = {},
                actions = {
                    'update': {
                        method: 'PUT'
                    },
                    'post': {
                        method: 'POST'
                    },
                    'delete': {
                        method: 'DELETE'
                    }
                };
            return $resource(url, defaults, actions);
        }
       
        function getComments(response) {
            response.records.forEach(function (note) {
                note.commentID = note.payrollNoteID;
                note.comment = note.note;
                note.lastModifiedDate = note.lastModifiedDate;
                note.createdBy = note.createdBy;
            });
             return response;
        }
        function getCommentList(params) {
            var _params = {
                payrollID: params.payrollID,
                distID: params.distID,
                payrollType: params.payrollType,
                payrollItemID: params.payrollItemID,
            };
            return getPayrollItemComments().get(_params).$promise.then(getComments);
        }

        function postComment(params) {
            var comment = {
                "payrollNoteID": params.commentID,
                "propertyID": params.propertyID,
                "distributedID": params.distID,
                "payrollType": params.payrollType,
                "payrollItemID": params.payrollItemID,
                "note": params.commentText,
                "payrollID": params.payrollID

            };
            return payrollItemCommentResource().post(comment).$promise;
        }

        function updateComment(params) {
            var comment = {
                "payrollNoteID": params.commentID,
                "propertyID": params.propertyID,
                "distributedID": params.distID,
                "payrollType": params.payrollType,
                "payrollItemID": params.payrollItemID,
                "note": params.commentText,
                "payrollID": params.payrollID
            };
            return payrollItemCommentResource().update(comment).$promise;
        }

        function deleteComment(noteID) {
            return payrollItemCommentResource().delete({ noteID: noteID }).$promise;
        }
        
        svc.getCommentList = getCommentList;
        svc.postComment = postComment;
        svc.updateComment = updateComment;
        svc.deleteComment = deleteComment;
        return svc;
    }

    angular
        .module('budgeting')
        .factory('payrollItemCommentService', ['$resource', factory]);
})(angular);
