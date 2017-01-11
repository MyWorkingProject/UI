(function (angular, und) {
    "use strict";

    function factory(langTranslate, $filter, catWizmodel, accountCategoryRowModel, draggable, droppable, categoriesSVC, commonModel) {
        var model, translate, options = {},
            categories;
        var delCategoryList = {
            records: []
        };
        translate = langTranslate('categories').translate;
        categories = [{}];
        model = {
            accountCategoryList: categories,
            delCategoryList: delCategoryList
        };

        model.plhdrPosn = {};
        model.startPosn = {};
        model.plhdr = {
            id: 'plhdr',
            className: 'placeholder'
        };

        model.setAccountCategoryList = function (data) {
            model.accountCategoryList = data;
        };

        model.getAccountCategoryList = function () {
            return model.accountCategoryList;
        };

        model.getAccountCategoryRecords = function () {
            return model.accountCategoryList.records;
        };

        model.setDelAccountCategoryList = function (data) {
            model.delCategoryList = data;
        };

        model.getDelAccountCategoryList = function () {
            return model.delCategoryList;
        };

        model.getAccountCategoryListCount = function () {
            return model.accountCategoryList.records.length;
        };

        model.resetDelCategoryList = function () {
            model.delCategoryList = {
                records: []
            };
        };

        model.getCategory = function (index) {
            var categoryRow;
            model.accountCategoryList.records.forEach(function (category, itemIndex) {
                if (itemIndex === index) {
                    categoryRow = angular.copy(category);
                }
            });
            return categoryRow;
        };

        model.addDelAccountCategory = function (delCOARow) {
            model.delCategoryList.records.push(delCOARow);
        };

        model.updateSequence = function () {
            var sequence = 1;
            model.accountCategoryList.records.forEach(function (item) {
                item.sequence = sequence;
                sequence++;
            });
        };

        model.getParamData = function (chartID) {
            var params = {
                chartID: chartID
            };
            return params;
        };

        model.getCategoryParam = function (chartID, value) {
            var params = {
                chartID: chartID,
                accounttypeID: value
            };
            return params;
        };

        model.saveCoaRows = function (isNext, chartID) {
            var postData = {
                "coaReportRows": [],
                "deletedReportRows": []
            };
            if (model.accountCategoryList.records.length > 0) {
                model.updatePostSequence(postData);
                model.updateDelCatList(postData);
                var strPost = angular.toJson(eval(postData));
                catWizmodel.setChartID(chartID);
                catWizmodel.setisNext(isNext);
                //categoriesSVC.saveCOARows.post(model.getParamData(chartID), strPost).$promise.then(catWizmodel.updateWizard, catWizmodel.saveCOARowsFailure);
                var promise = model.getSaveRowsPromise(chartID, strPost);
                promise.then(catWizmodel.updateWizard, catWizmodel.saveCOARowsFailure);
            }
            else { //Show Error messge
                catWizmodel.showNoDataMessage();
            }
            model.resetDelCategoryList();
        };

        model.getSaveRowsPromise = function (chartID, strPost) {
            return categoriesSVC.saveCOARows(model.getParamData(chartID), strPost).$promise;
        };

        model.updatePostSequence = function (postData) {
            var sequence = 1;
            model.accountCategoryList.records.forEach(function (item) {
                item.sequence = sequence;
                sequence++;
                postData.coaReportRows.push(item);
            });
        };

        model.updateDelCatList = function (postData) {
            model.delCategoryList.records.forEach(function (item) {
                postData.deletedReportRows.push(item.coaReportRowID);
            });
        };

        model.updateCOARowLevels = function () {
            var level = 0,
                groupNumber = 0,
                prevGroupnumber = 0,
                i = 0,
                overWrite = true;
            var addedGroupList = {
                "records": []
            },
                returnData = {};
            model.accountCategoryList.records.forEach(function (item) {
                if (item.groupNumber !== "" && item.groupNumber !== 0 && item.groupNumber !== undefined) {
                    returnData = model.updateLevel(item, addedGroupList, level);
                    level = returnData.level;
                    overWrite = returnData.overWrite;
                }
                if (overWrite) {
                    item.level = level;
                }
                overWrite = true;
                i++;
            });
        };

        model.updateLevel = function (item, addedGroupList, level) {
            var groupState = {
                "open": true
            };
            if (angular.isUndefined(item.groupState)) {
                item.groupState = angular.copy(groupState);
            }
            return model.updateRowLevel(item, addedGroupList, level);
        };

        model.updateRowLevel = function (item, addedGroupList, level) {
            var returnData = {};
            returnData.overWrite = true;
            returnData.level = level;
            var existGroup = $filter('filter')(addedGroupList.records, function (d) {
                return d.groupNumber === item.groupNumber;
            });
            if (existGroup !== undefined && existGroup.length > 0) {
                item.level = level;
                returnData.overWrite = false;
                level--;
            }
            else {
                addedGroupList.records.push({
                    "groupNumber": item.groupNumber
                });
                level++;
            }
            returnData.level = level;
            return returnData;
        };

        model.updateUniqGroupData = function (categoriesData, uniqID, groupNumber) {
            var returnData = {};
            categoriesData.records.forEach(function (item) {
                uniqID++;
                item.id = uniqID;
                if (item.groupNumber !== "" && parseInt(item.groupNumber) > parseInt(groupNumber)) {
                    groupNumber = item.groupNumber;
                }
                accountCategoryRowModel.updateGLCatOption(item);
            });
            returnData.uniqID = uniqID;
            returnData.groupNumber = groupNumber;
            model.setAccountCategoryList(categoriesData);
            model.updateCOARowLevels();
            return returnData;
        };

        model.getPosition = function (curCategory) {
            var posn = {
                itemIndex: und
            };
            model.accountCategoryList.records.forEach(function (category, itemIndex) {
                if (curCategory.id === category.id) {
                    posn.itemIndex = itemIndex;
                }
            });
            return posn;
        };

        model.removeCategory = function (posn) {
            model.accountCategoryList.records.remove(posn.itemIndex);
            return model;
        };

        model.insertCategory = function (posn, categ) {
            model.accountCategoryList.records.insertAt(posn.itemIndex, categ);
        };

        model.moveDownCategory = function (plhdrPosn, startPosn, category) {
            model.removeCategory(plhdrPosn).removeCategory(startPosn);
            plhdrPosn.itemIndex--;
            var prevRow = model.getCategory(plhdrPosn.itemIndex - 1);
            if (prevRow.rowType === "HEADER" && !prevRow.groupState.open) {
                model.moevDownTotalRow(prevRow, category, plhdrPosn);
            }
            else {
                model.insertCategory(plhdrPosn, category);
            }
        };

        model.moevDownTotalRow = function (prevRow, category, plhdrPosn) {
            var totalRow = $filter('filter')(model.accountCategoryList.records, function (d) {
                return d.groupNumber === prevRow.groupNumber && d.rowType === "SUB-TOTAL";
            });
            if (totalRow[0] !== undefined) {
                var addIndex = model.getPosition(totalRow[0]);
                addIndex.itemIndex = addIndex.itemIndex + 1;
                model.insertCategory(addIndex, category);
            }
            else {
                model.insertCategory(plhdrPosn, category);
            }
        };

        model.moveSectionRows = function (category, moveCalled, uniqID) {
            if (category.groupState !== und && !category.groupState.open && category.rowType === "HEADER" && moveCalled) {
                var footerRow = $filter('filter')(model.accountCategoryList.records, function (d) {
                    return d.groupNumber === category.groupNumber && d.rowType === "SUB-TOTAL";
                });
                var height = 0,
                    minSeq = category.sequence,
                    maxSequence = 0;
                maxSequence = accountCategoryRowModel.getMaxSequence(footerRow);
                uniqID = model.moveRows(category, uniqID, maxSequence, minSeq);
            }
            return uniqID;
        };

        model.moveRows = function (category, uniqID, maxSequence, minSeq) {
            var curIndex = model.getPosition(category);
            for (var i = minSeq + 1; i <= maxSequence; i++) {
                var seqRow = $filter('filter')(model.accountCategoryList.records, function (d) {
                    return d.sequence === i;
                });
                if (seqRow[0] !== undefined) {
                    var copyExist = angular.copy(seqRow[0]);
                    uniqID++;
                    copyExist.id = uniqID;
                    curIndex.itemIndex = curIndex.itemIndex + 1;
                    model.moveUpdate(curIndex, copyExist, seqRow);
                }
            }
            return uniqID;
        };

        model.moveUpdate = function (curIndex, copyExist, seqRow) {
            model.insertCategory(curIndex, copyExist);
            var remvIndex = model.getPosition(seqRow[0]);
            model.removeCategory(remvIndex);
            curIndex = model.getPosition(copyExist);
        };

        model.getDropIndex = function (category, plhdrPosn) {
            var pt, posn = {
                itemIndex: und
            };
            pt = draggable(category.id).dragPoint();
            model.accountCategoryList.records.forEach(function (catItem, itemIndex) {
                var isPlhdr = catItem.id == 'plhdr',
                    isSelf = catItem.id == category.id,
                    inItem = droppable(catItem.id).contains(pt),
                    newItem = itemIndex != plhdrPosn.itemIndex;

                if (isPlhdr || isSelf || !inItem || !newItem) {
                    return;
                }
                posn.itemIndex = itemIndex;
            });

            return posn;
        };

        model.removeFromList = function (ReportRow) {
            var rowType = "";
            if (ReportRow.rowType == "HEADER") {
                rowType = "SUB-TOTAL";
                model.deleteDependentRow(ReportRow, rowType);
            }
            else if (ReportRow.rowType == "SUB-TOTAL") {
                rowType = "HEADER";
                model.deleteDependentRow(ReportRow, rowType);
            }
            model.removeCoaRow(ReportRow);
            model.updateSeqLevel();
        };

        model.removeCoaRow = function (ReportRow) {
            var delItem = model.getPosition(ReportRow);
            model.addToDeletedCOARows(ReportRow);
            model.removeCategory(delItem);
        };

        model.deleteDependentRow = function (ReportRow, RowType) {
            var dRow = $filter('filter')(model.accountCategoryList.records, function (d) {
                return d.groupNumber === ReportRow.groupNumber && d.rowType === RowType;
            });
            if (dRow.length > 0) {
                model.removeCoaRow(dRow[0]);
            }
        };

        model.addToDeletedCOARows = function (coaRow) {
            if (parseInt(coaRow.coaReportRowID) > 0) {
                var delCOARow = angular.copy(coaRow);
                model.addDelAccountCategory(delCOARow);
            }
        };

        model.updateSeqLevel = function () {
            model.updateSequence();
            model.updateCOARowLevels();
        };

        model.deactive = function (category) {
            var moveUp = model.plhdrPosn.itemIndex <= model.startPosn.itemIndex;
            if (moveUp) {
                model.removeCategory(model.plhdrPosn).removeCategory(model.startPosn).insertCategory(model.plhdrPosn, category);
            }
            else {
                model.moveDownCategory(model.plhdrPosn, model.startPosn, category);
            }
        };

        model.getLastClickedRow = function (lastClickedID) {
            var lastClickedRow = $filter('filter')(model.getAccountCategoryRecords(), function (d) {
                return d.id === lastClickedID;
            });
            if (lastClickedID === -1) {
                lastClickedRow[0] = {};
            }
            return lastClickedRow;
        };

        model.getPositionRow = function (lastClickedRow, reportRowType) {
            var positionRow = lastClickedRow[0];
            if (lastClickedRow[0].rowType === "HEADER" && reportRowType === "section") {
                positionRow = model.getSectionFooterRow(lastClickedRow);
            }
            return positionRow;
        };

        model.getSectionFooterRow = function (lastClickedRow) {
            var lastClickedRowFooter = $filter('filter')(model.getAccountCategoryRecords(), function (d) {
                return d.groupNumber === lastClickedRow[0].groupNumber && d.rowType === "SUB-TOTAL";
            });
            return lastClickedRowFooter[0];
        };

        model.addCoaRow = function (lastClickedRow, data) {
            var locationItem = model.getPosition(lastClickedRow);
            if (locationItem.itemIndex == und) {
                locationItem.itemIndex = -1;
            }
            locationItem.itemIndex = locationItem.itemIndex + 1;
            model.insertCategory(locationItem, data);
        };

        model.addSubTotalRow = function (data, newdata) {
            var lastClickedRow = $filter('filter')(model.getAccountCategoryRecords(), function (d) {
                return d.id === data.id;
            });
            accountCategoryRowModel.updateGLCatOption(newdata);
            model.addCoaRow(lastClickedRow[0], newdata);
        };

        model.isReferd = function (ReportRow) {
            var refCat = $filter('filter')(model.getAccountCategoryRecords(), function (d) {
                return commonModel.getaccountCategoryID(d) === commonModel.getaccountCategoryID(ReportRow) && commonModel.getRowType(d) === "REF-CATEGORY";
            });
            if (refCat.length > 0) {
                commonModel.showDelMsg(true);
                return true;
            }
            return false;
        };

        model.addSectionRow = function (data, lastClickedRow, reportRowType) {
            var positionRow = model.getPositionRow(lastClickedRow, reportRowType);
            model.addCoaRow(positionRow, data);
        };

        model.getLastClickedID = function (lastClickedID) {
            if (model.getAccountCategoryListCount() <= 0 || model.getAccountCategoryListCount() == und) {
                lastClickedID = -1;
            }
            return lastClickedID;
        };

        model.move = function (category) {
            var pt, posn;
            posn = {
                itemIndex: und
            };
            posn = model.getDropIndex(category, model.plhdrPosn);
            if (posn.itemIndex !== und) {
                model.removeCategory(model.plhdrPosn).insertCategory(posn, model.plhdr);
                commonModel.setDirtyBit(category, true);
                angular.extend(model.plhdrPosn, posn);
            }
        };

        model.activate = function (category) {
            model.plhdrPosn = model.getPosition(category);
            angular.extend(model.startPosn, model.plhdrPosn);
            model.insertCategory(model.plhdrPosn, model.plhdr);
            model.updateSeqLevel();
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('accountCategoryData', [
            'appLangTranslate', '$filter', 'accountCategoryWiz', 'accountCategoryRow', 'rpDraggableSvc', 'rpDroppableSvc', 'categoriesSVC', 'accountCategoryCommon', factory
        ]);
})(angular);
