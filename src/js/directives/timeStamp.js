angular.module("miCalendar").
directive("timeStamp", function(){
    return {
        scope: {
            time: '=info'
        },
        templateUrl: 'templates/timeStamp.html',
        link: function(scope, element, attr){
            element.children().css('height', 40*scope.time.duration+'px')
        }
    }
});