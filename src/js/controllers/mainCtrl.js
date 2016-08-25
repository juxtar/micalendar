angular.module("miCalendar").
controller("mainCtrl", function($scope, $mdSidenav, scheduler){
    
    $scope.showToolbar = function(){
        $mdSidenav("left").toggle();
    }
    
    $scope.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
    
    $scope.days = ["Lunes",  "Martes",  "Miércoles",  "Jueves",  "Viernes"];
    
    $scope.loadActivities = function(day){
        $scope.currentDay = day || (new Date()).getDay();

        var result = scheduler(colo, $scope.currentDay);
        $scope.activityTimes = result[0];
        $scope.activityBlocks = result[1];
    };

    var colo = [
        {
            name: "Métodos Ágiles",
            schedule: [
                {
                    day: 3,
                    timeInit: "14:00",
                    timeEnd: "15:30"
                },
                {
                    day: 5,
                    timeInit: "14:45",
                    timeEnd: "16:15"
                }
            ]
        },
        {
            name: "Teoría de Control",
            schedule: [
                {
                    day: 1,
                    timeInit: "19:00",
                    timeEnd: "21:15"
                },
                {
                    day: 3,
                    timeInit: "17:15",
                    timeEnd: "19:45"
                }
            ]
        },
        {
            name: "Redes de Información",
            schedule: [
                {
                    day: 3,
                    timeInit: "18:00",
                    timeEnd: "21:15"
                },
                {
                    day: 4,
                    timeInit: "15:30",
                    timeEnd: "18:45"
                }
            ]
        },
        {
            name: "Ingeniería de Software",
            schedule: [
                {
                    day: 2,
                    timeInit: "16:30",
                    timeEnd: "18:45"
                },
                {
                    day: 5,
                    timeInit: "17:15",
                    timeEnd: "19:45"
                }
            ]
        },
        {
            name: "Aplicaciones Móviles",
            schedule: [
                {
                    day: 2,
                    timeInit: "19:45",
                    timeEnd: "22:15"
                },
                {
                    day: 4,
                    timeInit: "19:45",
                    timeEnd: "22:15"
                }
            ]
        },
        {
            name: "Administración de Recursos",
            schedule: [
                {
                    day: 4,
                    timeInit: "14:45",
                    timeEnd: "19:45"
                }
            ]
        }
    ];
    
    $scope.loadActivities();
})