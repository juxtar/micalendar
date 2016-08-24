angular.module("miCalendar").
factory("scheduler", function(){

	//  ------------ -------------------------------------------------- ------------
	//  ------------ FUNCIONES AUXILIARES PARA LOGICAS DE ORDENAMIENTO: ------------
	//  ------------ -------------------------------------------------- ------------

  function parseSchedules(activityList){
    var parsedActivities = [];
    for(var i=0; i<activityList.length; i++){
      for(var j=0; j<activityList[i].schedule.length; j++){
        var newActivity = {
          name: activityList[i].name,
          day: activityList[i].schedule[j].day,
          timeInit: activityList[i].schedule[j].timeInit,
          timeEnd: activityList[i].schedule[j].timeEnd,
          duration: substractTimestamps(activityList[i].schedule[j].timeInit,
                                 activityList[i].schedule[j].timeEnd)
        };
        parsedActivities.push(newActivity);
      }
    }
    return parsedActivities;
  }

	// FILTRAR POR DIA
	// Para usar: var filtrados = actividades.filter(dayFilter("Martes"));
	function dayFilter(Day){
	  return function(Act) {
	    return (Act.day == Day);
	  }
	}


	// ORDENAR POR HORARIO DE INICIO
	// Para usar: var filtradosOrdenados = filtrados.sort(timeSort);    
	function timeSort(a, b) { 
	    if(a.timeInit > b.timeInit){
	        return 1;
	    }
	    else if(a.timeInit == b.timeInit) {
	        return 0;
	    }
	    else {
	        return -1;
	    }
	}

	// CORROBORA SI UNA ACTIVIDAD COINCIDE EN HORARIO CON OTRA DE LA LISTA
	// Recorre list y retorna true si time ocurre entre el tiempo de inicio
	// y el tiempo de final de alguno de los elementos de list, siempre y cuando ese
	// elemento no sea el correspondiente a time.
	function concurs(list, time, index) {
	  for (var j = 0; j < list.length; j++) {
	    if((list[j].timeInit <= time) && (list[j].timeEnd > time) && j != index) {
	      list[j].collision = true;
	      return true;
	      break;
	    }
	  }
	}


	// MARCAR COLLISION TRUE EN ACTIVIDADES QUE COINCIDEN CON OTRAS
	// Cambia el valor de la propiedad collision en el elemento activity a true,
	// si ese activity ocurre en el mismo tiempo que otro elemento de listFull.
	// Para usar: filtradosOrdenados.forEach(isColliding);
	function isColliding(activity, actIndex, listFull) {
	  var timeInit = activity.timeInit;

	  if(concurs(listFull, timeInit, actIndex)) {
	    activity.collision = true;
	  }
	}


	function substractTimestamps(inicial, final) {
	    var horasInicial = inicial.split(":")[0];
	    var minutosInicial = inicial.split(":")[1];
	    var horasFinal = final.split(":")[0];
	    var minutosFinal = final.split(":")[1];
	    
	    return horasFinal - horasInicial + minutosFinal/60 - minutosInicial/60;
	}


	function Blank(init, end, col){
	    this.name = "";
	    this.day = "";
	    this.timeInit = init;
	    this.timeEnd = end;
	    this.duration = substractTimestamps(init, end)
	    this.collision = col;
	}


	function getLastTime(list) {
	    if(parseInt(list.length)){
	        var lastAct = list[list.length -1];

	        try{
	            lastAct.timeEnd.split(":")[0]; // <--- va a dar error si lastAct es un block
	        }
	        catch(err){
	            if(lastAct[0].collision){
	                return lastAct[0].activities[0][lastAct[0].activities[0].length -1].timeEnd;
	            }
	        }

	        if (lastAct.collision) {  // Ejecuta para las actividades que no colisionan 
	            return lastAct.activities[0][lastAct.activities[0].length -1].timeEnd;
	        }
	        else {
	            return lastAct.timeEnd;
	        }  
	    }
	    else{
	        return "09:00";
	    }
	}


	function completeBlock(list) {
	    // Busco el timeEnd mayor para saber hasta donde llega el block
	    var max = list[0][list[0].length -1].timeEnd;
	    for (var i=1; i<list.length; i++) {
	        if(list[i][list[i].length -1].timeEnd > max) {
	            max = list[i][list[i].length -1].timeEnd;
	        }
	    }
	    
	    // Completo cada columna del block con una actividad vacia para llegar hasta el mayor timeEnd
	    list.forEach(function completeColumn(column){
	        var inicio = column[column.length -1].timeEnd;        
	        if(inicio != max){
	            var blank = new Blank(inicio, max, true);
	            column.push(blank);
	        }
	    });
	            
	}


	//  ------------ -------------------------------------------------- ------------
	//  ------------ FUNCIONES PARA LOGICAS DE ORDENAMIENTO: ---------- ------------
	//  ------------ -------------------------------------------------- ------------

	function filterNoCollision(list, parsedList){
	    var sortedActivities = [];
	    if(!list[0].collision){
	        if(list[0].timeInit != getLastTime(parsedList)){ // Tiempo libre entre ultima actividad en ordenadas y list[0] -> agregar actividad vacia
	            var blank = new Blank(getLastTime(parsedList), list[0].timeInit, false);
	            sortedActivities.push(blank);
	        }
	        sortedActivities.push(list[0]);
	        list.shift();
	    }
	    return sortedActivities;
	}


	function filterWithCollision(list, parsedList){
	    if(list[0].collision){
	        
	        if(list[0].timeInit != getLastTime(parsedList)){ // Tiempo libre entre ultima actividad en ordenadas y list[0] -> agregar actividad vacia
	            var blank = new Blank(getLastTime(parsedList), list[0].timeInit, false);
	            parsedList.push(blank);
	        }


	        var block = [[list[0]], []];      // Crear block de colision con 2 columnas inicialmente, pero agrego solamente la primer actividad en la primer columna
	        if (list[0].timeInit != list[1].timeInit) {         // Check if las primeras 2 actividades en list tienen tiempos de inicio distintos
	            var actEmpty = new Blank(list[0].timeInit, list[1].timeInit, true);      // Creo una actividad vacía para rellenar la diferencia entre los tiempos de inicio
	            block[1].push(actEmpty);        // Agrego actividad vacía como primer elemento en la segunda columna
	        }
	        block[1].push(list[1]);       // Agrego la segunda actividad en list en la segunda columna

	        // Elimino las primeras 2 actividades de la lista:
	        list.shift();
	        list.shift();

	        if(list.length){
	            while(list[0].collision) {
	                
	                for (var i = 0; i < block.length; i++) { // recorre todas las columnas de block
	                    var done = false;
	                    if(list[0].timeInit >= block[i][block[i].length -1].timeEnd ) { // NO hay colision en esta columna

	                        if(substractTimestamps(block[i][block[i].length-1].timeEnd, list[0].timeInit) > 0) { // Agrega el tiempo libre entre el fin de la ultima actividad de la columna y la actividad nueva a agregar
	                            var actEmpty = new Blank(block[i][block[i].length-1].timeEnd, list[0].timeInit, true);
	                            block[i].push(actEmpty);
	                        }

	                        block[i].push(list[0]);
	                        list.shift();
	                        done = true;
	                        break;
	                    }
	                    else if (i+1 == block.length && !done){
	                        var column = [];
	                        var actEmpty = new Blank(block[0][0].timeInit, list[0].timeInit, true);
	                        column.push(actEmpty);
	                        column.push(list[0]);
	                        list.shift();
	                        block.push(column);
	                        break;
	                    }
	                }
	                if (!list.length){
	                    break;
	                }
	            }
	        }


	        var blockWithCollisions = {
	                collision: true,
	                activities: block
	        }
	        completeBlock(blockWithCollisions.activities);
	        return blockWithCollisions;
	    }
	}

	function parseActivities(activityList, day){

		var parsedList = [];

		var auxList = parseSchedules(activityList);
    auxList = auxList.filter(dayFilter(day)).sort(timeSort);
		auxList.forEach(isColliding);
		while(auxList.length){

		    var temp = filterNoCollision(auxList, parsedList);
		    for(var j = 0; j < temp.length; j++){ // usamos este loop porque el concat no esta funcionando
		        parsedList.push(temp[j]);
		    }

		    if(!auxList.length){
		        break;
		    }

		    var withCollision = filterWithCollision(auxList, parsedList);
		    if(!(withCollision == null)){ // porque 'undefined' == null es true
		        parsedList.push(withCollision);
		    }
		}
		return parsedList;
	}

	return parseActivities;
});