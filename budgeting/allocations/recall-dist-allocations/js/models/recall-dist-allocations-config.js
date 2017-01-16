//  Recall Distributed Allocation Grid Config

(function (angular) {
    "use strict";

    function factory(
        gridConfig,
        recallDistAllocationsContent) {

        return function(isHistory){

            var model = gridConfig();
            var fieldLabels = recallDistAllocationsContent;

            model.get = function () {
                var cols = [];

                if(!isHistory){
                    cols.push({
                        key: "isRecalled",
                        idKey: 'allocationID',
                        type: 'select'
                    });
                }
                cols = cols.concat([{
                    key: "distributedAs",
                },
                {
                    key: "amount"
                },
                {
                    key: "distributedModel",
                },
                {
                    key: "distributedBy"
                },
                {
                    key: "distributedDate",
                }]);
                if(isHistory){
                    cols.push({
                        key: "isRecalled",
                        type: 'custom',
                        templateUrl: 'app/templates/allocations-history-status.html'
                    });
                }
                return cols;
            };

            model.getHeaders = function () {
                var headers = [];

                if(!isHistory){
                    headers.push({
                    key: 'isRecalled',
                    type: 'select',
                    //text: ''
                    });
                }
                headers = headers.concat([
                {
                    key: "distributedAs",
                    text: fieldLabels.DistributedAs,
                    isSortable: false,
                },
                {
                    key: "amount",
                    text: fieldLabels.TotalAmount,
                    isSortable: false
                },
                {
                    key: "distributedModel",
                    text: fieldLabels.ModelDistributedTo,
                    isSortable: false
                },
                {
                    key: "distributedBy",
                    text: fieldLabels.DistributedBy,
                    isSortable: false
                },
                {
                    key: "distributedDate",
                    text: fieldLabels.DistributedOn,
                    isSortable: false
                }]);
                if(isHistory){
                    headers.push({
                    key: "isRecalled",
                    text: "Status",
                    isSortable: false
                    });
                }
                return [headers];
            };

            return model;
        };        
    }
    angular
        .module("budgeting")
        .factory("recallDistGridConfig", [
            "rpGridConfig",
            "recallDistAllocationsContent",
            factory]);
})(angular);
