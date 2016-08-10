angular.module("miCalendar").
directive("activityColumn", function(){
    return {
        scope: {
            activityList: '=info'
        },
        replace: true,
        templateUrl: 'templates/activityColumn.html'
    }
});