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
				$( "#printing_buttons" ).css("display","block");
                $('.progress-bar').css("width","0%");
                $('#print_progression').html("0%");
                $('.progress-bar').html("0% complete...");
                $('#printing_name').removeClass("ptl");

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
		$( "#btn_imprimer" ).click(function(){
			owl_car.goTo(10);
			//TODO: Put the machine on heat mode
			setTimeout(function(){ 
				owl_car.goTo(3);
				$('#en_cours').css("display","inline"); //Afficher la notification
				loop();
			 }, 3000);
			 //send(octopi_server+'print/'+file_to_print);
			 //checkStatus();  // Request the server for printing infos

		});

		function loop(){
			var i = 0;
			var x = setInterval(function(){
				refresh_printing_infos(i);
				i +=10;
				if(i > 100){ clearTimeout(x); task_finish();}
			}, 2000);
		}
		function refresh_printing_infos(evolution){
			console.log("text : "+evolution+"% complete...");
			$('.progress-bar').css("width",evolution+"%");
			$('.progress-bar').html(evolution+"% complete...");
			$('#print_progression').html(evolution+"%");
		}
		function task_finish(){
			$('#en_cours').css("display", "none");
			$('#printing_buttons').css("display", "none");
			$('#printing_name').addClass("ptl");

			owl_car.goTo(3);
            menu = "fichiers";
            refresh_navbar(false, "Impression");
		}

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

		var files = [];
		var file_to_print = "";

		if (window.XMLHttpRequest){ 
		    xmlhttp = new XMLHttpRequest();
		}

        function getJSON(response){
        	var json_response;
            try{
            	//console.log(response);
                json_response = JSON.parse(response);
                return json_response;
            }catch(e){
                console.log("Le fichier n'est pas au format Json");
            }
        }

        function setFiles(json){
            var files_view = $("#list_imgs ul");
			var elt = $("#list_imgs ul li");
			var taille = json.length*66;

			console.log("liste des fichiers imprimables");
			console.log(json);

			files_view.css("height", taille+"px"); //Redimentionner la vue

			for (var i = 0 ; i <= json.length - 1; i++) {
            //for (var i = json.length - 1; i >= 0; i--) {
				var date = new Date(json[i]["date"]);
				var time = new Date(json[i]["gcodeAnalysis"]["estimatedPrintTime"]);

				files.push({"name": json[i]["name"],
				            "date": date.toDateString(),
				            "time": time.getHours()+"h"+time.getMinutes()+"mn"+time.getSeconds()+"s"
				            });

				var li = document.createElement("li");
				li.className = "mod";
				li.onclick = function() {
				    console.log($(this).children("p").text());
                    setFileInfos($(this).children("p").text());
                    owl_car.goTo(2);
				};

				/*var div = document.createElement("div");
				div.className = "fl";
                div.style.background = "url('"+ json[i]["refs"]["resource"] + "') center center /cover";*/

				var p = document.createElement("p");
				p.className = "mod ptm pls prs";
				p.innerHTML = json[i]["name"];

				files_view.append(li);
				//li.appendChild(div);
				li.appendChild(p);
            }

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

		function setFileInfos(selected_file){
			var img_name = $("#img_name");
			var img_estimated_time = $("#img_estimated_time");
			var img_date_creation = $("#img_date_creation");

			console.log("selected file : "+ selected_file);

			for(item in files){
				console.log(files[item].name);
				if(files[item].name == selected_file){
					img_name.html(files[item].name);
					img_estimated_time.html(files[item].time);
					img_date_creation.html(files[item].date);

					file_to_print = files[item].name;
					break;
				}
			}
			printing_name.html(file_to_print);
		}

		function setFilaments(json){

		}

		//Send command to the octoprint server
		send('http://127.0.0.1:4000/files'); //Get all printable files
		setTimeout(function(){send('http://127.0.0.1:4000/infos');}, 500);  //Get general infos

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
                        	console.log("files received !");
                            setFiles(tab_files.files);

                        }else if(tab_files.ip){
							console.log("infos !" + tab_files);
							setInfos(tab_files);

                        }else if(tab_files.filaments){
							console.log("filaments !" + tab_files);
							setFilaments(tab_files);
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
                                var json_response = getJSON(xmlhttp.responseText);

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
