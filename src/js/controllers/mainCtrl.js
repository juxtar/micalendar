angular.module("miCalendar").
controller("mainCtrl", function($scope, $mdSidenav, scheduler){
    
    $scope.showToolbar = function(){
        $mdSidenav("left").toggle();
    }
    
    $scope.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
    
    $scope.currentDay = "Miércoles";
    $scope.days = ["Lunes",  "Martes",  "Miércoles",  "Jueves",  "Viernes"];

    $scope.tiemposprueba = [
        {
            label: "9:00",
            duration: 0
        },
        {
            label: "14:00",
            duration: 5
        },
        {
            label: "15:30",
            duration: 1.5
        },
        {
            label: "17:15",
            duration: 1.75
        },
        {
            label: "18:00",
            duration: 0.75
        },
        {
            label: "19:45",
            duration: 1.75
        },
        {
            label: "21:15",
            duration: 1.5
        },
    ]
    
    var prueba = [
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
        }
    ];
  
    $scope.prueba = scheduler(prueba, 5);
})