 var threeLevelLink = {
        gradeClass: '.zd-grade-level',//一级容器类
        classList: '.zd-class-list',//二级容器集合类
        classClass: '.zd-class-level',//二级容器类
        studentClass: ".zd-student-level",//三级类
        gradeCheck: ".zd-grade-check",//一级input类
        classCheck: ".zd-class-check",//二级input类
        studentCheck: ".zd-stu-check",//三级input类
        init: function () {
            this.addClickEvent(this.gradeClass, this.classList);
            this.addClickEvent(this.classClass, this.studentClass);
            this.isStudentCheck(this.studentCheck);
            this.isClassCheck(this.classCheck);
            this.isGradeCheck(this.gradeCheck);
        },
        addClickEvent: function (parent, son) {//添加下拉事件
            $(document).on("click", parent, function (e) {
                e.stopPropagation();
                $(this).children(son).stop().slideToggle();
            });
            $(document).on("click", son, function (e) {
                e.stopPropagation();
            });
        },
        isStudentCheck: function (curStu) {//选择三级改变一级和二级状态
            var pClassClass = this.classClass;
            var pStuClass = this.studentClass;
            var pClass = this.classCheck;
            var sStu = this.studentCheck;
            var _this = this;
            $(document).on("click", curStu, function (e) {
                e.stopPropagation();
                switch (_this.isStuSiblingsCheck($(this).parents(pStuClass).find(sStu))) {
                    case 0:
                        _this.isParentsCheck({
                            'class': $(this).parents(pClassClass).find(pClass),
                            'checkAttr': 'indeterminate',
                            'classFlag': false
                        });
                        _this.isParentsCheck({
                            'class': $(this).parents(pClassClass).find(pClass),
                            'checkAttr': 'checked',
                            'classFlag': false
                        });
                        break;
                    case 1:
                        _this.isParentsCheck({
                            'class': $(this).parents(pClassClass).find(pClass),
                            'checkAttr': 'indeterminate',
                            'classFlag': true
                        });
                        break;
                    default:
                        _this.isParentsCheck({
                            'class': $(this).parents(pClassClass).find(pClass),
                            'checkAttr': 'indeterminate',
                            'classFlag': false
                        });
                        _this.isParentsCheck({
                            'class': $(this).parents(pClassClass).find(pClass),
                            'checkAttr': 'checked',
                            'classFlag': true
                        });
                }
                _this.isClassListCheck($(this));
            });
        },
        isClassCheck: function (curClass) {//选择二级改变一级和三级状态
            var _this = this;
            $(document).on("click", curClass, function (e) {
                e.stopPropagation();
                if ($(this).prop("checked")) {
                    $(this).parents(_this.classClass).find(_this.studentCheck).prop("indeterminate", false);
                    $(this).parents(_this.classClass).find(_this.studentCheck).prop("checked", true);
                } else {
                    $(this).parents(_this.classClass).find(_this.studentCheck).prop("checked", false);
                }
                _this.isClassListCheck($(this));
            });
        },
        isGradeCheck: function (curGrade) {//选择一级改变二级和三级状态
            var _this = this;
            $(document).on("click", curGrade, function (e) {
                e.stopPropagation();
                if ($(this).prop("checked")) {
                    $(this).parents(_this.gradeClass).find(_this.classCheck + "," + _this.studentCheck).prop("indeterminate", false);
                    $(this).parents(_this.gradeClass).find(_this.classCheck + "," + _this.studentCheck).prop("checked", true);
                } else {
                    $(this).parents(_this.gradeClass).find(_this.classCheck + "," + _this.studentCheck).prop("checked", false);
                }
            });
        },
        isParentsCheck: function (parents) {//设置checkbox的两种状态:'checked','indeterminate'
            if (parents.grade) {
                parents.grade.prop(parents.checkAttr, parents.gradeFlag);
            }
            if (parents.class) {
                parents.class.prop(parents.checkAttr, parents.classFlag);
            }
        },
        isStuSiblingsCheck: function (elements) {//选择三级时判断同级元素是何种状态:'checked=true','checked=false','indeterminate=true'
            var count = 0, flag = 0;
            for (var i = 0; i < elements.length; i++) {
                if ($(elements[i]).prop("checked")) {
                    count += 1;
                }
            }
            if (count === 0) {
                flag = 0;
            } else if (count > 0 && count < elements.length) {
                flag = 1;
            } else {
                flag = 2;
            }
            return flag;
        },
        isClassSiblingCheck: function (elements) {//选择二级时判断同级元素是何种状态:'checked=true','checked=false','indeterminate=true'
            var count = 0, flag = 0, countClass = 0;
            for (var i = 0; i < elements.length; i++) {
                if ($(elements[i]).prop("checked")) {
                    count += 1;
                }
                if ($(elements[i]).prop("indeterminate")) {
                    countClass += 1;
                }
            }
            if (count === 0 && countClass === 0) {
                flag = 0;
            } else if ((count > 0 && count < elements.length) || (countClass > 0 && countClass < elements.length) || (elements.length === 1 && countClass === 1)) {
                flag = 1;
            } else {
                flag = 2;
            }
            return flag;
        },
        isClassListCheck: function (obj) {//修改二级同级元素的状态
            var pGradeClass = this.gradeClass;
            var aClassList = this.classList;
            var pGrade = this.gradeCheck;
            var pClass = this.classCheck;
            switch (this.isClassSiblingCheck(obj.parents(aClassList).find(pClass))) {
                case 0:
                    this.isParentsCheck({
                        'grade': obj.parents(pGradeClass).find(pGrade),
                        'checkAttr': 'indeterminate',
                        'gradeFlag': false
                    });
                    this.isParentsCheck({
                        'grade': obj.parents(pGradeClass).find(pGrade),
                        'checkAttr': 'checked',
                        'gradeFlag': false
                    });
                    break;
                case 1:
                    this.isParentsCheck({
                        'grade': obj.parents(pGradeClass).find(pGrade),
                        'checkAttr': 'indeterminate',
                        'gradeFlag': true
                    });
                    break;
                default:
                    this.isParentsCheck({
                        'grade': obj.parents(pGradeClass).find(pGrade),
                        'checkAttr': 'indeterminate',
                        'gradeFlag': false
                    });
                    this.isParentsCheck({
                        'grade': obj.parents(pGradeClass).find(pGrade),
                        'checkAttr': 'checked',
                        'gradeFlag': true
                    });
            }
        }
    };