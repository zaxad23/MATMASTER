// MATMASTER reboot
// by skorupa (c)

function randomize(limit){
  var a = Math.pow(10, String(limit).length); 
  var readyNumber = Math.floor(Math.random()*a);
  if(readyNumber>=limit){
    return randomize(limit);
  } else {
    return readyNumber;
  }
}

function id(ID){
   return document.getElementById(ID);
}

// jakby ktoś nie wiedział: MTMST i mtmst to skróty od MATMASTER
// w *.js skrót pisać wielkimi literami, w *.html - małymi

var MTMST = {};
MTMST._1 = 0;
MTMST._znak = "";
MTMST._2 = 0;
MTMST.znaki = ["+","-","*","/"];
MTMST.tmp = {};
MTMST._dobrepunkty=0;
MTMST._zlepunkty=0;

MTMST.los_1_2 = function(){
   MTMST.tmp.znak = randomize(4);
   MTMST._znak = MTMST.znaki[MTMST.tmp.znak];
   id("mtmst_znak").innerHTML = MTMST._znak;
   console.log("1r = "+MTMST._znak);
   MTMST._1 = randomize(11);
   MTMST._2 = randomize(11);
   
   if(MTMST._znak=="-" && MTMST._1<MTMST._2) MTMST.los_1_2();
   if(MTMST._znak=="/" && MTMST._1<MTMST._2) MTMST.los_1_2();
   MTMST._znak = MTMST.znaki[MTMST.tmp.znak];
}

MTMST.engine = function(){
	// losowanie działania
   MTMST.los_1_2();
   MTMST._znak = MTMST.znaki[MTMST.tmp.znak];
   console.log("2r = "+MTMST._znak);
   MTMST.rozwiazanie = eval(MTMST._1+MTMST._znak+MTMST._2);
   console.log(MTMST._1+" "+MTMST._znak+" "+MTMST._2)
   if(MTMST.checkForErr()) MTMST.engine();
   else {
      id("mtmst_1").innerHTML = MTMST._1;
      id("mtmst_2").innerHTML = MTMST._2;
      if(MTMST.rozwiazanie>20) MTMST.engine();
      delete(MTMST.rozwiazanie); // spadaj hakerze XD
   }
}

MTMST.checkForErr = function(){
   // dla ułamków będzie inaczej!
   if(MTMST._znak=="/"){
      var tmp1 = String(MTMST.rozwiazanie);
      // pozycja kropki w ułamku
      var dotpoz = tmp1.indexOf(".")+1;
      // liczba po kropce
      var afterdot = tmp1.slice(dotpoz,tmp1.length);
      if(afterdot.length>0 && dotpoz!=0){
         return true;
      } else {
         return false;
      }
   } else return false;
}

MTMST.enter = function(eve){
   if(eve.keyCode == 13) MTMST.sprawdz();
}

MTMST.sprawdz = function(){
	MTMST.rozwiazanie = eval(MTMST._1+MTMST._znak+MTMST._2);
	MTMST.wynikUzytkownika = id("mtmst_input").value;
	
	MTMST.wynikUzytkownika = MTMST.wynikUzytkownika.replace(",",".");
	Number(MTMST.wynikUzytkownika);
	String(MTMST.wynikUzytkownika);
	if(id("mtmst_input").value != String(Number(MTMST.wynikUzytkownika)) && id("mtmst_input").value != ""){
		alert("Wykryto spację!\nAby system sprawdził ci wynik, usuń spacje.");
	} else if(MTMST.rozwiazanie != MTMST.wynikUzytkownika || id("mtmst_input").value=="") {
		// zle
		id("dobrze").style.display = "none";
		id("zle").style.display = "block";
		id("rozwiazanie").innerHTML = MTMST.rozwiazanie;
		MTMST._zlepunkty++;
		id("zlepunkty").innerHTML=MTMST._zlepunkty;
		MTMST.engine();
	} else {
		// dobrze
		id("zle").style.display = "none";
		id("dobrze").style.display = "block";
		MTMST._dobrepunkty++;
		id("dobrepunkty").innerHTML=MTMST._dobrepunkty;
		MTMST.engine();
	}
	id("mtmst_input").value="";
	delete(MTMST.wynikUzytkownika);
}

setInterval(function(){
	id("dobrepunkty").innerHTML=MTMST._dobrepunkty;
	id("zlepunkty").innerHTML=MTMST._zlepunkty;
},1000);

setInterval(function(){
	document.body.setAttribute("onerror","document.body.innerHTML = 'ERROR: prawdopodobnie hakowanie'")
},2000);