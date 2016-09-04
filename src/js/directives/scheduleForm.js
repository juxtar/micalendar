angular.module("miCalendar").
directive("scheduleForm", function(){
    return {
        scope: true,
        templateUrl: 'templates/scheduleForm.html',
        link: function(scope, element, attr){
            scope.num = scope.scheduleNum;
            scope.timeEnd = scope.timeEnd[scope.num];
            scope.timeInit = scope.timeInit[scope.num];
            scope.selected = scope.selected[scope.num];

            scope.removeScheduleForm = function() {
                element.remove();
                delete scope.timeInit;
                delete scope.timeEnd;
                delete scope.selected;
                scope.$destroy();
            }

            function validateDays(){
                scope.scheduleForm.errors.$setValidity("required", !!scope.selected.length);
            }

            function setTimeError(){
                scope.errors = !(scope.scheduleForm.timeEnd.$invalid ||
                                    scope.scheduleForm.timeInit.$invalid) &&
                                (scope.timeEnd <= scope.timeInit);
            }

            scope.$watch('timeEnd', setTimeError);
            scope.$watch('timeInit', setTimeError);

            scope.scheduleForm.errors.$validators.validTime = function(modelValue){
                return !modelValue;
            }

            scope.toggle = function (item, list) {
                var idx = list.indexOf(item);
                if (idx > -1) {
                    list.splice(idx, 1);
                }
                else {
                    list.push(item);
                }
                validateDays();
            };
            scope.exists = function (item, list) {
                return list.indexOf(item) > -1;
            };
        }
    }
});