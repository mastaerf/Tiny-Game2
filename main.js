var larva = 10;
var worker, drone, hive, queen, king, nurse, greaterWorker, greaterDrone, greaterHive, greaterQueen, greaterKing, overWorker, overDrone, overHive, overQueen, overKing, basicSoldier, soldierTrainer, scraper, brawler, bulker, crusher, destructor, annihilator
var effectiveWorker, effectiveDrone, effectiveQueen, effectiveKing, effectiveHive, effectiveGreaterQueen, effectiveGreaterKing, effectiveGreaterHive, effectiveOverQueen, effectiveOverKing, effectiveOverHive

worker = drone = hive = queen = king = nurse = greaterWorker = greaterDrone = greaterHive = greaterQueen = greaterKing = overWorker = overDrone = overHive = overQueen = overKing = basicSoldier = soldierTrainer = scraper = brawler = bulker = crusher = destructor = annihilator = 0;




var minions = ["food","larva","worker", "drone", "hive", "queen", "king", "nurse", "greaterWorker", "greaterDrone", "greaterHive", "greaterQueen", "greaterKing", "overWorker", "overDrone", "overHive", "overQueen", "overKing"];
var requirements = {"worker": " 1 larva and 10 food","drone": " 1 larva and 10 food each","hive": " 1 drone, 1 worker, and 200 food each","queen": " 1 worker and 20 food each","king": " 1 drone and 20 food each","nurse": "1 worker and 50 food","greaterHive": " 1 hive, king, and queen and 10k food each","greaterQueen": " 1 queen and 10k food each","greaterKing": " 1 king and 10k food each","overHive": " 1 greater-Hive, -King, and -Queen and 100k food each","overQueen": " 1 greaterQueen and 10k food each","overKing": " 1 greaterKing and 10k food each"};
var resources = ["food"];
var soldiers = ["food","larva","basicSoldier","soldierTrainer","scraper","brawler","bulker","crusher","destructor","annihilator"];
var food = 100;


var currentPage = 0;
function writePage(number){
	currentPage = number;
	var autoBuildCode = "<br/><br/>";
	switch(number){
		case 1:
			var thingsToPurchase = minions;
			break;
		case 2:
			var thingsToPurchase = resources;
			break;
		case 3:
			var thingsToPurchase = soldiers;
			break;
	}
	
	var exceptions = ["food","larva"];
	for (i=0;i < thingsToPurchase.length;i++){
		var innerText = thingsToPurchase[i];
		var innerNumber = Math.floor(getAmount(thingsToPurchase[i]));
		autoBuildCode += "<br/><span class=\"col-xs-1\">"+innerText+"</span><span class=\"col-xs-1\" id=\""+innerText+"\">"+innerNumber+"</span>";
		if(exceptions.indexOf(innerText)>-1){
			autoBuildCode+="<span class=\"col-xs-10\"></span>";
		}
		else{
			autoBuildCode+="<span class=\"col-xs-2\">"+requirements[thingsToPurchase[i]]+"</span>";
			for(j=0;j<4;j++){
				var numberText = Math.pow(10,j);
				autoBuildCode+="<span class=\"col-xs-2\"><button type=\"submit\" onClick=\"purchase(\'"+innerText+"\',"+numberText+","+1+")\">"+numberText+" "+innerText+"</button></span>";
			}
		}
		autoBuildCode+="<br/>";
	}
	//console.log(autoBuildCode);
	document.getElementById("writeHere").innerHTML = autoBuildCode;
}

function addOrSubtract(aosFrom,number,aos){
	switch(aosFrom){
		case "larva":
			larva+=number*aos;
			break;
		case "worker":
			worker+=number*aos;
			break;
		case "drone":
			drone+=number*aos;
			break;
		case "hive":
			hive+=number*aos;
			break;
		case "queen":
			queen+=number*aos;
			break;
		case "king":
			king+=number*aos;
			break;
		case "nurse":
			nurse+=number*aos;
			break;
		case "greaterWorker":
			greaterWorker+=number*aos;
			break;
		case "greaterDrone":
			greaterDrone+=number*aos;
			break;
		case "greaterHive":
			greaterHive+=number*aos;
			break;
		case "greaterQueen":
			greaterQueen+=number*aos;
			break;
		case "greaterKing":
			greaterKing+=number*aos;
			break;
		case "overWorker":
			overWorker+=number*aos;
			break;
		case "overDrone":
			overDrone+=number*aos;
			break;
		case "overHive":
			overHive+=number*aos;
			break;
		case "overQueen":
			overQueen+=number*aos;
			break;
		case "overKing":
			overKing+=number*aos;
			break;
		case "basicSoldier":
			basicSoldier+=number*aos;
			break;
		case "soldierTrainer":
			soldierTrainer+=number*aos;
			break;
		case "scraper":
			scraper+=number*aos;
			break;
		case "brawler":
			brawler+=number*aos;
			break;
		case "bulker":
			bulker+=number*aos;
			break;
		case "crusher":
			crusher+=number*aos;
			break;
		case "destructor":
			destructor+=number*aos;
			break;
		case "annihilator":
			annihilator+=number*aos;
			break;
	}
}

function repeatIf(requiredLogic,deductFrom,addTo,number,foodLoss){
	if(requiredLogic){
		for(i=0;i<deductFrom.length;i++){
			addOrSubtract(deductFrom[i],number,-1);
		}
		for(i=0;i<addTo.length;i++){
			addOrSubtract(addTo[i],number,1);
		}
		food-=foodLoss;
		updateNumbers();
	}
}

function purchase(inputText, number, multiplier){
	switch(inputText){
		case "larva":
			break;
		case "worker":
			repeatIf(larva>=number && food>=10*number, ["larva"], ["worker"], number,10*number*multiplier);
			break;
		case "drone":
			repeatIf(larva>=number && food>=10*number, ["larva"], ["drone"], number,10*number*multiplier);
			break;
		case "hive":
			repeatIf(drone>=number && worker>=number && food>=200*number, ["drone","worker"], ["hive"], number, 200*number*multiplier);
			break;
		case "queen":
			repeatIf(hive-queen>=number && worker>=number && food>=20*number, ["worker"], ["queen"], number, 20*number*multiplier);
			break;
		case "king":
			repeatIf(hive-king>=number && drone>=number && food>=20*number, ["drone"], ["king"], number, 20*number*multiplier);
			break;
		case "nurse":
			repeatIf(worker>=number && food>=50*number, ["worker"], ["nurse"], number, 50*number*multiplier);
		case "greaterHive":
			repeatIf(hive>=number && queen>=number && king >= number && food>=10000*number, ["hive","queen","king"], ["greaterHive"], number, 10000*number*multiplier);
			break;
		case "greaterQueen":
			repeatIf(greaterHive-greaterQueen>=number && queen>=number && food>=10000*number, [], ["greaterQueen"], number, 1000*number*multiplier);
			break;
		case "greaterKing":
			repeatIf(greaterHive-greaterKing>=number&& king>=number && food>=10000*number, [], ["greaterKing"], number, 1000*number*multiplier);
			break;
		
			/*
		case "overQueen":
			repeatIf(, [], ["overQueen"], number*multiplier);
			break;
		case "overKing":
			repeatIf(, [], ["overKing"], number*multiplier);
			break;
		case "overHive":
			repeatIf(, [], ["overHive"], number*multiplier);
			break;
		case "basicSoldier":
			repeatIf(, [], ["basicSoldier"], number*multiplier);
			break;
		case "soldierTrainer":
			repeatIf(, [], ["soldierTrainer"], number*multiplier);
			break;
		case "scraper":
			repeatIf(, [], ["scraper"], number*multiplier);
			break;
		case "brawler":
			repeatIf(, [], ["brawler"], number*multiplier);
			break;
		case "bulker":
			repeatIf(, [], ["bulker"], number*multiplier);
			break;
		case "crusher":
			repeatIf(, [], ["crusher"], number*multiplier);
			break;
		case "destructor":
			repeatIf(, [], ["destructor"], number*multiplier);
			break;
		case "annihilator":
			repeatIf(, [], ["annihilator"], number*multiplier);
			break;
			*/
	}
}

function getAmount(item){
	switch(item){
		case "food":
			return food;
			break;
		case "larva":
			return larva;
			break;
		case "worker":
			return worker;
			break;
		case "drone":
			return drone;
			break;
		case "hive":
			return hive;
			break;
		case "queen":
			return queen;
			break;
		case "king":
			return king;
			break;
		case "nurse":
			return nurse;
			break;
		case "greaterWorker":
			return greaterWorker;
			break;
		case "greaterDrone":
			return greaterDrone;
			break;
		case "greaterHive":
			return greaterHive;
			break;
		case "greaterQueen":
			return greaterQueen;
			break;
		case "greaterKing":
			return greaterKing;
			break;
		case "overWorker":
			return overWorker;
			break;
		case "overDrone":
			return overDrone;
			break;
		case "overHive":
			return overHive;
			break;
		case "overQueen":
			return overQueen;
			break;
		case "overKing":
			return overKing;
			break;
		case "basicSoldier":
			return basicSoldier;
			break;
		case "soldierTrainer":
			return soldierTrainer;
			break;
		case "scraper":
			return scraper;
			break;
		case "brawler":
			return brawler;
			break;
		case "bulker":
			return bulker;
			break;
		case "crusher":
			return crusher;
			break;
		case "destructor":
			return destructor;
			break;
		case "annihilator":
			return annihilator;
			break;
		
	}
}

function updatePopulation(){
	larva+=Math.min(king/20,queen/20);
	//purchase(inputText,number,multiplier);
	purchase("worker",nurse/40,0.1);
	purchase("drone",nurse/40,0.1);
}

function updateResources(){
	food+=worker/20;
}

function updateNumbers(){
	var elementIds = [];
	switch(currentPage){
		case 1:
			elementIds = minions;
			break;
		case 2:
			elementIds = resources;
			break;
		case 3:
			elementIds = soldiers;
			break;
	}
	for(i=0;i<elementIds.length;i++){
		document.getElementById(elementIds[i]).innerHTML = Math.floor(getAmount(elementIds[i]));
	}
}

setInterval(updateGame, 50);//50ms is 20 fps
function updateGame(){
	updatePopulation();
	updateResources();
	updateNumbers();
	
}








