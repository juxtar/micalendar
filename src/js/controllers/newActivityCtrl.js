angular.module("miCalendar").
controller("newActivityCtrl", function($scope, $mdDialog, scheduler, $mdpTimePicker, $compile){
    $scope.cancel = function(){
        $mdDialog.cancel();
    };
    $scope.hide = function(){
        $mdDialog.hide();
    };
    $scope.submit = function(){
        var newActivity = $scope.activity;
        var activitySchedule = [];
        for(var i in $scope.selected){ // Looping through schedule-form generated input
            for(var j = 0; j<$scope.selected[i].length; j++){ // Looping through days in a certain schedule-form
                activitySchedule.push({
                    day: $scope.selected[i][j],
                    timeInit: toTimestamp($scope.timeInit[i]),
                    timeEnd: toTimestamp($scope.timeEnd[i])
                });
            }
        }
        newActivity.schedule = activitySchedule;
        
        $mdDialog.hide(newActivity);
    };
  
    $scope.days = ["Lunes",  "Martes",  "Miércoles",  "Jueves",  "Viernes"];
    $scope.selectedDays = [];
    $scope.activity = {};
    $scope.timeInit = {};
    $scope.timeEnd = {};
    $scope.selected = {"0":[]};
    $scope.scheduleNum = 0;

    $scope.addScheduleForm = function(){
        $scope.scheduleNum += 1;
        $scope.selected[$scope.scheduleNum] = [];
        var form = $compile('<schedule-form></schedule-form>')($scope);
        angular.element("#schedule-forms").append(form);
    }
    
    function toTimestamp(datetime){
        return moment(datetime).format('HH:mm');
    };
});