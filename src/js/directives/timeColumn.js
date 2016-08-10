angular.module("miCalendar").
directive("timeColumn", function(){
    return {
        scope: {
            timeList: '=info'
        },
        replace: true,
        templateUrl: 'templates/timeColumn.html'
    }
});