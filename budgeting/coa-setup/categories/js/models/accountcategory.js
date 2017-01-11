//  User Properties Model

(function (angular) {
    "use strict";

    function factory(langTranslate, $filter, dialogSvc, $location, notificationModel, catWizModel) {
        var text, model, translate, state, Header, rowMenuOptions, fieldLabel, form, errorMsgs, placeholder, slideCategoryForm,
            headerFooterList, addSubtractList, selOptions, glVisbilityList, notification = notificationModel();
        var groupState = {};
        groupState.open = true;
        translate = langTranslate('categories').translate;

        Header = {
            DescriptionText: translate('bdgt_categories_rowDescriptionText'),
            LevelText: translate('bdgt_categories_rowLevelText'),
            TypeText: translate('bdgt_categories_rowTypeText'),
            CatOptText: translate('bdgt_categories_rowCatOptnText'),
            GLOptText: translate('bdgt_categories_rowGLOptnText'),
        };

        text = {
            PageHeaderText: translate('bdgt_categories_PageHeaderText'),
            addButtonText: translate('bdgt_categories_addButtonText'),
            categoryFormTitle: translate('bdgt_categories_categoryFormTitle'),
            importCategory: translate('bdgt_categories_importCategory'),
            nextButtonText: translate('bdgt_categories_next'),
            backButtonText: translate('bdgt_categories_back'),
            print: translate('bdgt_categories_print'),
            toggleImpCategory: {
                state: {
                    open: false
                }
            }
        };

        rowMenuOptions = {
            section: translate('bdgt_categories_section'),
            subSection: translate('bdgt_categories_subSection'),
            category: translate('bdgt_categories_category'),
            refCategory: translate('bdgt_categories_refCategory'),
            textOnly: translate('bdgt_categories_textOnly'),
            blankRow: translate('bdgt_categories_blankRow'),
            pageBreak: translate('bdgt_categories_pageBreak'),
        };

        state = {
            menuIsOn: false,
            newGLForm: {
                open: false
            },
            edit: true
        };

        fieldLabel = {
            type: translate('bdgt_categories_type'),
            categoryOrheaderDesc: translate('bdgt_categories_categoryOrheaderDesc'),
            subtotalOrFooterDesc: translate('bdgt_categories_subtotalOrFooterDesc'),
            options: translate('bdgt_categories_options'),
            accountCategory: translate('bdgt_categories_accountCategory'),
            glAccount: translate('bdgt_categories_glAccount'),
            doNotDisplay: translate('bdgt_categories_doNotDisplay'),
            addOrSubtract: translate('bdgt_categories_addOrSubtract'),
            reveseSign: translate('bdgt_categories_reveseSign'),
            excludeFromTotal: translate('bdgt_categories_excludeFromTotal'),
            saveText: translate('bdgt_categories_saveText'),
            createText: translate('bdgt_categories_createText'),
            cancelText: translate('bdgt_categories_cancelText'),
            sectionOptionsLable: translate('bdgt_categories_sectionOptionsLable'),
            secCatVisblLable: translate('bdgt_categories_secCatVisblLable'),
            catCalLable: translate('bdgt_categories_catCalLable'),
            catOptionsLable: translate('bdgt_categories_catOptionsLable'),
            glOptionsLable: translate('bdgt_categories_glOptionsLable'),
            glVisblLable: translate('bdgt_categories_glVisblLable'),
            glCalLable: translate('bdgt_categories_glCalLable'),
            catVisbLable: translate('bdgt_categories_catVisblLable'),
            rowOptText: translate('bdgt_categories_row_opt_text'),
            rowAddText: translate('bdgt_categories_row_add_text'),
            rowSubText: translate('bdgt_categories_row_sub_text'),
            rowRSText: translate('bdgt_categories_row_rs_text'),
            rowETText: translate('bdgt_categories_row_et_text'),
            rowDNDText: translate('bdgt_categories_row_dnd_text'),
            rowDNDHText: translate('bdgt_categories_row_dndh_text'),
            rowDNDFText: translate('bdgt_categories_row_dndf_text'),
            rowDNDHFText: translate('bdgt_categories_row_dndhf_text'),
            rowSHFText: translate('bdgt_categories_row_shf_text'),
            report: translate('bdgt_categories_report')
        };

        errorMsgs = {
            categoryOrheaderDesc: {
                required: translate('bdgt_categories_error_categoryOrheaderDesc')
            },
            accountType: {
                required: translate('bdgt_categories_error_accountType')
            },
            accountCategory: {
                required: translate('bdgt_categories_error_accountCategory')
            }
        };

        placeholder = {
            categoryOrheaderDesc: translate('bdgt_categories_placeholder_categoryOrheaderDesc'),
            subtotalOrFooterDesc: translate('bdgt_categories_placeholder_accountType'),
        };

        slideCategoryForm = {
            state: {
                open: false
            },
            showCatForm: false
        };
        selOptions = {
            section: false,
            category: false,
            divGlAccount: false,
            refCategory: false,
            categoryOrheaderDesc: false,
            divAddorSub: true,
            divRevSign: true,
            divExTotal: true,
            type: true
        };

        model = {
            text: text,
            rowMenuOptions: rowMenuOptions,
            state: state,
            fieldLabel: fieldLabel,
            errorMsgs: errorMsgs,
            placeholder: placeholder,
            slideCategoryForm: slideCategoryForm,
            selOptions: selOptions,
            Header: Header,
            accountCategoryData: "",
            groupState: groupState,
            showPageHeader: false,
            categorySrc: ''
        };

        model.getGroupState = function () {
            return model.groupState;
        };

        model.toggleMenuIsOn = function () {
            model.state.menuIsOn = !model.state.menuIsOn;
        };

        model.setMenuIsOn = function (val) {
            model.state.menuIsOn = val;
        };

        model.isMenuIsOn = function () {
            return model.state.menuIsOn;
        };
        model.updateButtonText = function (isSave) {
            if (isSave) {
                model.fieldLabel.createText = translate('bdgt_categories_saveText');
            }
            else {
                model.fieldLabel.createText = translate('bdgt_categories_createText');
            }
        };

        model.showSection = function () {
            model.updateSelOptions(false, true, false, true, false, false, false, true, true);
            model.fieldLabel.subtotalOrFooterDesc = translate('bdgt_categories_subtotalOrFooterDesc');
            model.fieldLabel.categoryOrheaderDesc = translate('bdgt_section_categoryOrheaderDesc');
        };

        model.showCategory = function () {
            model.updateSelOptions(true, false, true, true, false, true, true, false, true);
            model.fieldLabel.categoryOrheaderDesc = translate('bdgt_categories_categoryOrheaderDesc');
        };

        model.showRefCategory = function () {
            model.updateSelOptions(false, false, true, false, true, true, true, true, false);
            model.fieldLabel.categoryOrheaderDesc = translate('bdgt_categories_RefCategory_Text');
            model.fieldLabel.subtotalOrFooterDesc = translate('bdgt_categories_CategoryDesc_Text');
        };

        model.showTextOnly = function () {
            model.fieldLabel.categoryOrheaderDesc = translate('bdgt_categories_categoryOrheaderDesc');
            model.updateSelOptions(false, true, false, true, false, false, false, false, true);
        };

        model.updateSelOptions = function (categoryVal, sectionVal, divGlAccountVal, categoryOrheaderDescVal, refCategoryVal, divAddorSubVal, divExTotalVal, subtotalFooterVal, typeVal) {
            model.selOptions.category = categoryVal;
            model.selOptions.section = sectionVal;
            model.selOptions.divGlAccount = divGlAccountVal;
            model.selOptions.categoryOrheaderDesc = categoryOrheaderDescVal;
            model.selOptions.refCategory = refCategoryVal;
            model.selOptions.divAddorSub = divAddorSubVal;
            model.selOptions.divExTotal = divExTotalVal;
            model.selOptions.subtotalFooter = subtotalFooterVal;
            model.selOptions.type = typeVal;
        };

        model.showSlide = function (rowType) {
            if (rowType === "HEADER") {
                model.updateTitle(translate('bdgt_categories_Edit_Sec_Text'));
                model.showSection();
            }
            else if (rowType === "CATEGORY") {
                model.updateTitle(translate('bdgt_categories_Edit_Cat_Text'));
                model.showCategory();
            }
            else if (rowType === "SUB-TOTAL") {
                model.updateTitle(translate('bdgt_categories_Edit_Sec_Text'));
                model.showSection();
            }
            else if (rowType === "REF-CATEGORY") {
                model.updateTitle(translate('bdgt_categories_Edit_RefCat_Text'));
                model.showRefCategory();
            }
            else if (rowType === "TEXT ONLY") {
                model.updateTitle(translate('bdgt_categories_Edit_Text_Text'));
                model.showTextOnly();
            }
            else {
                return;
            }
        };

        model.updateTitle = function (title) {
            model.text.categoryFormTitle = title;
        };

        model.toggleImpCategory = function () {
            model.text.toggleImpCategory.state.open = !model.text.toggleImpCategory.state.open;
        };

        model.updateSlideState = function (status) {
            model.slideCategoryForm.state.open = status;
            model.slideCategoryForm.showCatForm = status;
        };

        model.viewCategoryOptions = function (selType) {
            model.updateLable(selType);
            if (selType === "section" || selType === "subSection") {
                model.showSection();
            }
            else if (selType === "category") {
                model.showCategory();
            }
            else if (selType === 'refCategory') {
                model.showRefCategory();
            }
            else if (selType === 'text') {
                model.showTextOnly();
            }
        };

        model.updateLable = function (selType) {
            if (selType === "section" || selType === "subSection") {
                model.updateSecTitle(selType);
            }
            else if (selType === "category" || selType === 'refCategory') {
                model.assignCatRefLabl(selType);
            }
            else if (selType === 'text') {
                model.updateTitle(translate('bdgt_categories_New_Text_Text'));
            }
            if (selType === "category" || selType === "refCategory") {
                model.updateSectionLable(translate('bdgt_categories_catOptionsLable'), translate('bdgt_categories_catVisblLable'));
            }
        };

        model.updateSecTitle = function (selType) {
            if (selType === "section") {
                model.updateTitle(translate('bdgt_categories_New_Sec_Text'));
            }
            else {
                model.updateTitle(translate('bdgt_categories_New_SubSec_Text'));
            }
            model.updateSectionLable(translate('bdgt_categories_sectionOptionsLable'), translate('bdgt_categories_secCatVisblLable'));
        };

        model.assignCatRefLabl = function (selType) {
            if (selType === "category") {
                model.updateTitle(translate('bdgt_categories_New_Cat_Text'));
                model.updateSectionLable(translate('bdgt_categories_catOptionsLable'), translate('bdgt_categories_catVisblLable'));
            }
            if (selType === 'refCategory') {
                model.updateTitle(translate('bdgt_categories_New_RefCat_Text'));
                model.fieldLabel.sectionOptionsLable = translate('bdgt_categories_catOptionsLable');
            }
        };

        model.updateSectionLable = function (secOptnLabl, secCatVLabl) {
            model.fieldLabel.sectionOptionsLable = secOptnLabl;
            model.fieldLabel.secCatVisblLable = secCatVLabl;
        };

        model.getCOARowsFailure = function (response) {
            if (response.status === 400) {
                catWizModel.wrapShowMsg(response.data.message, catWizModel.getCoaErrorObj());
            }
        };

        model.getAccntTypeFailure = function (response) {
            if (response.status === 400) {
                catWizModel.wrapShowMsg(response.data.message, catWizModel.getAcctTypeErrorObj());
            }
        };

        model.getAccntCategoryFailure = function (response) {
            if (response.status === 400) {
                catWizModel.wrapShowMsg(response.data.message, catWizModel.getCatErrorObj());
            }
        };

        model.showNotification = function (data) {
            notification.flushAll();
            notification.extend(data).show();
        };

        model.showErrorNotification = function (msg) {
            var options = {
                type: "error",
                autoHideTime: -1,
                title: msg.title,
                descr: msg.desc
            };

            options.actions = [{
                text: 'Close',
                method: notification.hide
            }];

            model.showNotification(options);
        };

        model.toggleImportCategory = function (chartID) {
            if ($location.absUrl().indexOf('editmasterchart') > -1) {
                $location.path('/admin/coa/importcategory/' + chartID);
            }
            else {
                model.categorySrc = "coa-setup/import-category/index.html";
                model.toggleImpCategory();
            }
        };

        model.updateShowPageHeader = function () {
            if ($location.path().indexOf("editmasterchart") > -1) {
                model.showPageHeader = false;
            }
            else {
                model.showPageHeader = true;
            }
            model.updateSlideState(false);
        };

        model.updateText = function (slideState, buttonState) {
            model.updateSlideState(slideState);
            model.updateButtonText(buttonState);
        };

        model.updateEditData = function (category, reportRowType) {
            model.updateLable(reportRowType);
            model.showSlide(category.rowType);
            model.updateText(true, true);
        };

        model.getShowPageHeader = function () {
            return model.showPageHeader;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('accountCategoryModel', [
            'appLangTranslate', '$filter', 'rpDialogModel', '$location', 'rpNotificationModel', 'accountCategoryWiz',
            factory
        ]);
})(angular);
