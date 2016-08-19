angular.module("miCalendar").
controller("mainCtrl", function($scope, $mdSidenav){
    
    $scope.showToolbar = function(){
        $mdSidenav("left").toggle();
    }
    
    $scope.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
    
    $scope.currentDay = "Miércoles";
    $scope.days = ["Lunes",  "Martes",  "Miércoles",  "Jueves",  "Viernes"];
    $scope.prueba = [
      {
        name: "",
        duration: 5,
        collision: false
      },
      {
        name: "Métodos Ágiles",
        duration: 1.5,
        collision: false
      },
      {
        name: "",
        duration: 1.75,
        collision: false
      },
      {
        collision: true,
        activities: [
          [
            {
              name: "Teoría de Control",
              duration: 2.5
            },
            {
              name: "",
              duration: 1.5
            }
          ],
          [
            {
              name: "",
              duration: 0.75
            },
            {
              name: "Redes de Información",
              duration: 2.5
            }
          ]
        ]
      },
    ]

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
})