$(document).ready(function(){

        // Basic parameters : Set the carousel
		var owl = $("#owl-demo");
		var owl_car;

	    owl.owlCarousel({
	        navigation : false,
	        singleItem : true,
	        mouseDrag : false,
	        touchDrag : false,
	        pagination : false,
	        transitionStyle : "backSlide"
	    });

	    owl_car = $("#owl-demo").data('owlCarousel');

        /************************************************/
        // Global parameters & functions:
        // Valeurs possibles de la variable menu:
		//home, fichiers, detail, impression, filaments, infos, xyz, parametres
		var menu = "home";

        $( "#btn_home" ).click(function(){
		    //Gestion du menu
			if(menu == "home"){
				window.location.reload();
			} else {
				owl_car.goTo(0);
                refresh_navbar(true, "");
			}

		});

	    $( "#print" ).click(function(){
			owl_car.goTo(1);
			menu = "fichiers";
			refresh_navbar(false, "Impression");
			//send(octopi_server+'files');
		});
		$( "#filament" ).click(function(){
			owl_car.goTo(4);
			menu = "filaments";
			refresh_navbar(false, "Filament");
		});
		$( "#settings" ).click(function(){
			owl_car.goTo(8);
			menu = "parametres";
			refresh_navbar(false, "Settings");
		});
		$( "#xyz" ).click(function(){
			owl_car.goTo(7);
			menu = "xyz";
			refresh_navbar(false, "Jog");
		});
		$( "#infos" ).click(function(){
			owl_car.goTo(6);
			menu = "infos";
			refresh_navbar(false, "Infos");
		});

		$('#btn_shutdown').on('click', function () {
			console.log("extinction des feux !");
			send(octopi_server+'stop');
		});
		$('#btn_reboot').on('click', function () {
			console.log("extinction des feux !");
			send(octopi_server+'reboot');
		});

		/************************************************/
		//Printing menu:
        $( ".img_item" ).click(function(){
			owl_car.goTo(2);
		});
		$( "#btn_imprimer" ).click(function(){
			owl_car.goTo(10);
			//TODO: Put the machine on heat mode
			setTimeout(function(){ 
				owl_car.goTo(3);
				$('#en_cours').css("display","inline"); //Afficher la notification
			 }, 3000);
			 //send(octopi_server+'start_print');
			 //checkStatus();  // Request the server for printing infos

		});
		$( "#btn_arreter" ).click(function(){
			owl_car.goTo(1);
			refresh_navbar(false, "Impression");
			$('#en_cours').css("display","none"); //Supprimer la notification
			//TODO: Stop the printing operation

			//stop_printing();  // stop Request the server for printing infos
		});
		$( "#btn_pause_arreter" ).click(function(){
			owl_car.goTo(1);
			refresh_navbar(false, "Impression");
			$('#en_cours').css("display","none"); //Supprimer la notification
            //TODO: Stop the printing operation

            //stop_printing();  // stop Request the server for printing infos
		});
		$( "#btn_pause_continuer" ).click(function(){
			//TODO: Restart the printing operation
		});
		$('#en_cours').click(function(){
		    //Revenir à l'impression
			owl_car.goTo(3);
			refresh_navbar(false, "Impression");
			menu = "fichiers";
		});

		/*************************************************/
		//Filament menu:
		$( ".filament_item" ).click(function(){
			owl_car.goTo(10);
			//TODO: Put the machine on heat mode
			setTimeout(function(){ 
				owl_car.goTo(5);
			 }, 3000);
		});
		$( "#btn_remove_filament" ).click(function(){
			owl_car.goTo(0);
			refresh_navbar(true, "");
		});

        /*************************************************/
        //Settings menu:

		var pas_temperature = 1; var pas_vitesse = 10;
		var temp_value_init = 10; var vit_value_init = 20;
		var temp_value = $( "#temperature_value" );
		var vit_value = $( "#vitesse_value" );

		temp_value.text(temp_value_init + "°");
		vit_value.text(vit_value_init);

		$( "#slideThree" ).click(function(){
	        if($("#slideThree").is(':checked')){
                console.log("switch led on");
                send(octopi_server+'switch/on');
	        }else{
                console.log("switch led off");
                send(octopi_server+'switch/off');
	        }
		});

		$( "#btn_vitesse_moins" ).click(function(){
			console.log("value "+ vit_value.val());
			var str = $( "#vitesse_value" ).val() - pas_vitesse;
			console.log("str " + str);
			vit_value.text(str+"m/s");
		});

		$( "#btn_vitesse_plus" ).click(function(){
			console.log("value "+ vit_value.val());
			var str = $( "#vitesse_value" ).val() + pas_vitesse;
			console.log("str " + str);
			vit_value.text(str+"m/s");
		});

		$( "#btn_vitesse_valider" ).click(function(){

		});

		$( "#btn_temperature_moins" ).click(function(){

		});

		$( "#btn_temperature_plus" ).click(function(){

		});

		$( "#btn_temperature_valider" ).click(function(){

		});

		/*************************************************/
        //XYZ menu:
        var X = 0; var Y = 0; var Z = 0;
		var XMax = 300; var YMax = 300; var ZMax = 300;

		$( "#x_plus" ).click(function(){
			var pas = $( ".selectpicker" ).val();
	        send(octopi_server+'jogX/'+parseFloat(pas));

			X = "+" + parseFloat(pas);
			var str = "X:"+X;
	        $( ".position_xyz" ).text(str);

		});
		$( "#x_moins" ).click(function(){
			var pas = $( ".selectpicker" ).val();
			send(octopi_server+'jogX/'+ -parseFloat(pas));

			X = "-" + parseFloat(pas);
			var str = "X:"+X;
			$( ".position_xyz" ).text(str);

		});
		$( "#y_plus" ).click(function(){
			var pas = $( ".selectpicker" ).val();
			send(octopi_server+'jogY/'+parseFloat(pas));

			Y = "+" + parseFloat(pas);
			var str = "Y:"+Y;
			$( ".position_xyz" ).text(str);

		});
		$( "#y_moins" ).click(function(){
			var pas = $( ".selectpicker" ).val();
			send(octopi_server+'jogY/'+ -parseFloat(pas));

			Y = "-" + parseFloat(pas);
			var str = "Y:"+Y;
			$( ".position_xyz" ).text(str);

		});
		$( "#house_xy" ).click(function(){
			send(octopi_server+'homeXY');

			var str = "Home XY";
			$( ".position_xyz" ).text(str);

		});
		$( "#house_z" ).click(function(){
			send(octopi_server+'homeZ');

			var str = "Home Z";
			$( ".position_xyz" ).text(str);

		});
		$( "#z_plus" ).click(function(){
			var pas = $( ".selectpicker" ).val();
			send(octopi_server+'jogZ/'+parseFloat(pas));

			Z = "+" + parseFloat(pas);
			var str = "Z:"+Z;
			$( ".position_xyz" ).text(str);

		});
		$( "#z_moins" ).click(function(){
			var pas = $( ".selectpicker" ).val();
			send(octopi_server+'jogZ/'+ -parseFloat(pas));

			Z = "-" + parseFloat(pas);
			var str = "Z:"+Z;
			$( ".position_xyz" ).text(str);

		});

		/*****************************************************************/
		//Fonctions principales
		var xmlhttp;
		var octopi_server = "http://0.0.0.0:4000/";

		//Check status parameters
		var freq = 1000;
		var url = octopi_server+'state/all';
		var repeat;

		var print_progression = $("#print_progression");
		var time_left = $("#time_left");
		var printing_name = $("#printing_name");

		var progression = 0;

		if (window.XMLHttpRequest){ 
		    xmlhttp = new XMLHttpRequest();
		}

        function getJSON(response){
            try{
            	//console.log(response);
                var json_response = JSON.parse(response);
                //tab_files = json_response["files"];
                //return tab_files;
                //return JSON.stringify(json_response);
                return json_response;
            }catch(e){
                console.log("Le fichier n'est pas au format Json");
            }
        }

        function setFiles(json){
            var files_view = $("#list_imgs ul");
			var elt = $("#list_imgs ul li");
			var new_elt = "";
			var taille = 0;

			console.log("liste des fichiers imprimables");
            elt.remove(); //Retirer les précédents elts

            for (var i = json.length - 1; i >= 0; i--) {
                console.log(json[i]["name"]);

                taille = json.length*66;
                new_elt += '<li class="mod img_item">'
                                +'<div class="fl" style=""></div>'
                                +'<p class="mod ptm pls prs">'+json[i]["name"]+'</p>'
                           +'</li>';
                files_view.css("height", taille+"px"); //Redimentionner la vue
                //files_view.prepend(new_elt); // Ajouter le nouvel elt
            };

            files_view.html(new_elt);
        }

		function setInfos(json){
			var ip = $("#ip");
			var ap = $("#ap");
			var firmware = $("#firmware");
			var version_bmk = $("#version_bmk");
			var tps = $("#tps");

			ip.html(json.ip);
			ap.html(json.ap);
			firmware.html(json.firmware);
			version_bmk.html(json.version_bmk);
			tps.html(json.tps);
		}
		//Send command to the octoprint server
		send('http://127.0.0.1:4000/files'); //Get all printable files
		send('http://127.0.0.1:4000/infos'); //Get general infos
		function send(url)
		{
			var tab_files;

			xmlhttp.open("GET", url, true);
			xmlhttp.onreadystatechange = function (aEvt) {
                  if (xmlhttp.readyState == 4) {

                     if(xmlhttp.status == 200){

                        tab_files = getJSON(xmlhttp.responseText);
                        //console.log(tab_files);

                        if(tab_files.files && tab_files.files != ""){
                        	console.log("files received !" + tab_files);
                            setFiles(tab_files.files);
                        }else if(tab_files.ip){
							console.log("infos !" + tab_files);
							setInfos(tab_files);
                        }

                     }else{
                      console.log("Erreur pendant le chargement de la page.\n");
                     }
                  }
            };
			xmlhttp.send();
		}

        //Refresh the navbar
        function refresh_navbar(home, title){
			if(home){
			    $( "#btn_home_title" ).text("Home");
				$( "#btn_home .glyphicon" ).removeClass("glyphicon-chevron-left");
				$( "#btn_home .glyphicon" ).addClass("glyphicon-home");
				menu = "home";
			}else{
			    $( "#btn_home_title" ).text(title);
				$( "#btn_home .glyphicon" ).removeClass("glyphicon-home");
				$( "#btn_home .glyphicon" ).addClass("glyphicon-chevron-left");
			}
		};

        //Check status function
        function checkStatus(){
            //Acquition des paramètres de l'imprimante
            repeat = setInterval(function(){
                       xmlhttp.open("GET", url, true);
                       xmlhttp.onreadystatechange = function (aEvt) {
                           if (xmlhttp.readyState == 4) {
                              if(xmlhttp.status == 200){
                              	var response = xmlhttp.responseText;
                              	try{
                              		var json_response = JSON.parse(response);
                              	}catch(e){
                              		console.log("Fichier n'est pas au format Json");
                              	}
                          		//console.log(JSON.stringify(json_response));
                          		print_progression.text(progression+"%");
                          		time_left.text(json_response[1]["progress"]["printTimeLeft"]+"mn");
                          		printing_name.text(json_response[1]["job"]["file"]["name"]);

                         		console.log("print_progression :"+ progression);
                         		console.log("time_left :"+ json_response[1]["progress"]["printTimeLeft"]);
                          		console.log("printing_name :"+ json_response[1]["job"]["file"]["name"]);

                              }else{
                               console.log("Erreur pendant le chargement de la page.\n");
                              }
                           }
                       };

                       xmlhttp.send();

            }, freq);

        }

        //Cancel the checkStatus function
		function stop_printing(){
			//Arret du recueil d'infos 
			clearInterval(repeat);

		};

		
		// Calculer le pourcentage de progression
		function progression(timeLeft, time){
			var result = 0.0;
			if (time != "null" && timeLeft != "null"){
				result = (time - timeLeft) / time;
			}
			return result;
		};

});
