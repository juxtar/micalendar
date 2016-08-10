angular.module("miCalendar").
directive("activity", function(){
    return {
        scope: {
            activityInfo: '=info'
        },
        templateUrl: 'templates/activity.html',
        link: function(scope, element, attr){
            element.children().css('height', 40*scope.activityInfo.duration+'px')
        }
    }
});