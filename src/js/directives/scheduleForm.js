angular.module("miCalendar").
directive("scheduleForm", function(){
    return {
        scope: true,
        templateUrl: 'templates/scheduleForm.html',
        link: function(scope, element, attr){
            scope.num = scope.scheduleNum;
            scope.removeScheduleForm = function() {
                element.remove();
                delete scope.timeInit[scope.num];
                delete scope.timeEnd[scope.num];
                delete scope.selected[scope.num];
                scope.$destroy();
            }
            
            function validateDays(){
                scope.scheduleForm.days.$setValidity("required", !!scope.selected[scope.num].length);
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