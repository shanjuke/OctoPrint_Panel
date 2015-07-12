$(document).ready(function(){
		// Valeurs possibles de la variable menu: 
		//home, fichiers, detail, impression, filaments, infos, xyz, parametres	 
		var menu = "home"; 
		
		// Pages de l'application
		var pages = ['menu'];
		pages.push('extinction');
		pages.push('list_imgs');
		pages.push('img_detail');
		pages.push('heating_block');
		pages.push('printing_block');
		pages.push('filament_menu');
		pages.push('remove_filament');
		pages.push('infos_menu');
		pages.push('xyz_menu');
		pages.push('parametres_menu');

		//1.Gestion du menu
		$( "#btn_home" ).click(function(){
			if(menu == "home"){
				
			} else if(menu == "fichiers"){
				// Mise à jour du btn_home
				$( "#btn_home" ).animate(
					{ "left": "-=100px" }, 
					"slow", 
					function(){ 
						$( "#btn_home" ).css("left","0"); 
						$( "#btn_home_title" ).text("HOME");
						$( "#btn_home .glyphicon" ).removeClass("glyphicon-chevron-left");
						$( "#btn_home .glyphicon" ).addClass("glyphicon-home");
						menu = "home"
					}
				);
				//
				//$( "#list_imgs" ).animate({ "left": "=311px" }, "fast");
				$( "#list_imgs" ).css("left","311px");
				$( "#list_imgs" ).css("display","none");
				$( "#menu" ).css("display","block");
				$( "#menu" ).css("left","0");
				
			} else if(menu == "detail" || menu == "impression"){
				$( "#btn_home" ).animate(
					{ "left": "-=100px" }, 
					"slow", 
					function(){ 
						$( "#btn_home" ).css("left","0"); 
						$( "#btn_home_title" ).text("Fichiers"); 
						menu = "fichiers"
					}
				);
				//
				$( "#img_detail" ).css("left","311px");
				$( "#img_detail" ).css("display","none");
				$( "#list_imgs" ).css("display","block");
				$( "#list_imgs" ).css("left","0");
				
				if(menu == "impression"){
					$( "#printing_block" ).css("left","311px");
					$( "#printing_block" ).css("display","none");
					
					$( "#heating_block" ).css("left","311px");
					$( "#heating_block" ).css("display","none");
				}
			} else if(menu == "filaments" ){
				$( "#btn_home" ).animate(
					{ "left": "-=100px" }, 
					"slow", 
					function(){ 
						$( "#btn_home" ).css("left","0"); 
						$( "#btn_home_title" ).text("HOME"); 
						menu = "home"
					}
				);
				$( "#filament_menu" ).css("left","311px");
				$( "#filament_menu" ).css("display","none");
				$( "#remove_filament" ).css("left","311px");
				$( "#remove_filament" ).css("display","none");
				$( "#menu" ).css("display","block");
				$( "#menu" ).css("left","0");
			} else if(menu == "infos" ){
				$( "#btn_home" ).animate(
					{ "left": "-=100px" }, 
					"slow", 
					function(){ 
						$( "#btn_home" ).css("left","0"); 
						$( "#btn_home_title" ).text("HOME"); 
						$( "#btn_home .glyphicon" ).removeClass("glyphicon-chevron-left");
						$( "#btn_home .glyphicon" ).addClass("glyphicon-home");
						menu = "home"
					}
				);
				$( "#infos_menu" ).css("left","311px");
				$( "#infos_menu" ).css("display","none");
				$( "#menu" ).css("display","block");
				$( "#menu" ).css("left","0");
			} else if(menu == "xyz" ){
				$( "#btn_home" ).animate(
					{ "left": "-=100px" }, 
					"slow", 
					function(){ 
						$( "#btn_home" ).css("left","0"); 
						$( "#btn_home_title" ).text("HOME");  
						$( "#btn_home .glyphicon" ).removeClass("glyphicon-chevron-left");
						$( "#btn_home .glyphicon" ).addClass("glyphicon-home");
						menu = "home"
					}
				);
				$( "#xyz_menu" ).css("left","311px");
				$( "#xyz_menu" ).css("display","none");
				$( "#menu" ).css("display","block");
				$( "#menu" ).css("left","0");
			} else if(menu == "parametres" ){
				$( "#btn_home" ).animate(
					{ "left": "-=100px" }, 
					"slow", 
					function(){ 
						$( "#btn_home" ).css("left","0"); 
						$( "#btn_home_title" ).text("HOME");  
						$( "#btn_home .glyphicon" ).removeClass("glyphicon-chevron-left");
						$( "#btn_home .glyphicon" ).addClass("glyphicon-home");
						menu = "home"
					}
				);
				$( "#parametres_menu" ).css("left","311px");
				$( "#parametres_menu" ).css("display","none");
				$( "#menu" ).css("display","block");
				$( "#menu" ).css("left","0");
			}
			
		});
		//1.Imprimer
		//Menu
		$( "#print" ).click(function(){
			$( "#menu" ).animate(
				{ "left": "-=320px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#menu" ).css("display","none"); 
					$( "#list_imgs" ).css("display","block"); 
					$( "#list_imgs" ).animate({ "left": "-=311px" },"fast");
				}
			);
			$( "#btn_home" ).animate(
				{ "left": "-=100px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#btn_home" ).css("left","0"); 
					$( "#btn_home_title" ).text("Fichiers"); 
					$( "#btn_home .glyphicon" ).removeClass("glyphicon-home");
					$( "#btn_home .glyphicon" ).addClass("glyphicon-chevron-left");
					menu = "fichiers";
				}
			);
		});
		//Liste
		$( ".img_item" ).click(function(){
			$( "#list_imgs" ).animate(
				{ "left": "-=320px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#list_imgs" ).css("display","none"); 
					$( "#img_detail" ).css("display","block"); 
					$( "#img_detail" ).animate({ "left": "-=311px" },"fast");
				}
			);
			$( "#btn_home" ).animate(
				{ "left": "-=100px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#btn_home" ).css("left","0"); 
					$( "#btn_home_title" ).text("Lego");
					//$( ".glyphicon" ).removeClass("glyphicon-home");
					//$( ".glyphicon" ).addClass("glyphicon-chevron-left");
					menu = "detail";
				}
			);
		});
		//Lancer impression
		$('#btn_imprimer').on('click', function () {
		        //TODO: Send command to start the print
		        send(octopi_server+'start_print','');
		        
			$( "#img_detail" ).animate(
				{ "left": "-=320px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#img_detail" ).css("display","none"); 
					$( "#heating_block" ).css("display","block"); 
					$( "#heating_block" ).animate({ "left": "-=311px" },"fast");
				}
			);			
			menu = "impression";
			$( "#btn_home" ).animate(
				{ "left": "-=100px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#btn_home" ).css("left","0"); 
					$( "#btn_home_title" ).text("Impression"); 
					menu = "impression";
				}
			);
			
			//TODO: envoyer la commande "chauffer les buses et le plateau"
			
			setTimeout(function(){ 

				$( "#heating_block" ).animate(
					{ "left": "-=320px" }, 
					"easeOutBounce", 
					function(){ 
						$( "#heating_block" ).css("display","none"); 
						$( "#printing_block" ).css("display","block"); 
						$( "#printing_block" ).animate({ "left": "-=311px" },"fast");
						//TODO: afficher les paramètres d'impression
						$( "#en_cours" ).css("display","inline"); 
					}
				);

			 }, 3000);

		});
		

		//Revenir à l'impression
		$('#en_cours').on('click', function(){
			//TODO: Refresh - Remettre tous les blocks à droite et invisible
			for(var id in pages){
				var encre = "#"+pages[id]+"";
				//console.log(encre);
				$( encre ).css("display","none");
				$( encre ).css("left","311px");
			}
			// Afficher la page d'impression
			$( "#printing_block" ).css("display","block");
			$( "#printing_block" ).css("left","0");

			$( "#btn_home" ).animate(
				{ "left": "-=100px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#btn_home" ).css("left","0"); 
					$( "#btn_home_title" ).text("Impression"); 
					$( "#btn_home .glyphicon" ).removeClass("glyphicon-home");
					$( "#btn_home .glyphicon" ).addClass("glyphicon-chevron-left");
					menu = "impression";
				}
			);

		});

		//Arrêter l'impression
		$('#btn_arreter').on('click', function(){
			// TODO: Envoyer la commande "annuler impression"
			console.log("annuler l'impression !");
		        send(octopi_server+'cancel','');
		        
			stop_printing();
		});
		
		//Mettre l'impression en pause 
		$('#btn_pause').on('click', function () {
		        // TODO: Envoyer la commande "pause"
			console.log("impression sous pause !");	
			send(octopi_server+'pause','');		
		});
		
		//Reprendre l'impression 
		$('#btn_pause_continuer').on('click', function () {
		        // TODO: Envoyer la commande "resume"
			console.log("reprise de l'impression !");
			send(octopi_server+'resume','');			
		});
		
		//Arrêter l'impression après la pause
		$('#btn_pause_arreter').on('click', function () {
			// TODO: Envoyer la commande "annuler impression"
			console.log("annuler l'impression !");
			send(octopi_server+'cancel','');
			
			stop_printing();
		});
		
		/*****************************************************************/
		//2.Filament
		//Menu
		$( "#filament" ).click(function(){
			$( "#menu" ).animate(
				{ "left": "-=320px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#menu" ).css("display","none"); 
					$( "#filament_menu" ).css("display","block"); 
					//$( "#filament_menu" ).animate({ "left": "=0" },"fast");
				}
			);			
			$( "#filament_menu" ).css("left","0");
			$( "#btn_home" ).animate(
				{ "left": "-=100px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#btn_home" ).css("left","0"); 
					$( "#btn_home_title" ).text("Filaments");  
					$( "#btn_home .glyphicon" ).removeClass("glyphicon-home");
					$( "#btn_home .glyphicon" ).addClass("glyphicon-chevron-left");
					menu = "filaments";
				}
			);
		});
		//
		$( ".filament_item" ).click(function(){
			$( "#filament_menu" ).animate(
				{ "left": "-=320px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#filament_menu" ).css("display","none"); 
					$( "#heating_block" ).css("display","block"); 
					//$( "#filament_menu" ).animate({ "left": "=0" },"fast");
				}
			);
			$( "#heating_block" ).css("left","0");
			setTimeout(function(){ 

				$( "#heating_block" ).animate(
					{ "left": "-=320px" }, 
					"easeOutBounce", 
					function(){ 
						$( "#heating_block" ).css("display","none"); 
						$( "#remove_filament" ).css("display","block"); 
						$( "#remove_filament" ).animate({ "left": "-=311px" },"fast");
					}
				);

			}, 3000);
			
		});
		
		$( "#btn_remove_filament" ).click(function(){
			$( "#btn_home" ).animate(
				{ "left": "-=100px" }, 
				"slow", 
				function(){ 
					$( "#btn_home" ).css("left","0"); 
					$( "#btn_home" ).text("HOME"); 
					menu = "home"
				}
			);
			$( "#filament_menu" ).css("left","311px");
			$( "#filament_menu" ).css("display","none");
			$( "#remove_filament" ).css("left","311px");
			$( "#remove_filament" ).css("display","none");
			$( "#menu" ).css("display","block");
			$( "#menu" ).css("left","0");
			
			
		});
		
		/*****************************************************************/
		//3.Infos
		//Menu
		$( "#infos" ).click(function(){
			$( "#menu" ).animate(
				{ "left": "-=320px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#menu" ).css("display","none"); 
					$( "#infos_menu" ).css("display","block"); 
					$( "#infos_menu" ).animate({ "left": "-=311px" },"fast");
				}
			);
			$( "#btn_home" ).animate(
				{ "left": "-=100px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#btn_home" ).css("left","0"); 
					$( "#btn_home_title" ).text("Infos");  
					$( "#btn_home .glyphicon" ).removeClass("glyphicon-home");
					$( "#btn_home .glyphicon" ).addClass("glyphicon-chevron-left");
					menu = "infos";
				}
			);
		});
		
		/*****************************************************************/
		//4. X,Y,Z
		//Menu
		$( "#xyz" ).click(function(){
			$( "#menu" ).animate(
				{ "left": "-=320px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#menu" ).css("display","none"); 
					$( "#xyz_menu" ).css("display","block"); 
					$( "#xyz_menu" ).animate({ "left": "-=311px" },"fast");
				}
			);
			$( "#btn_home" ).animate(
				{ "left": "-=100px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#btn_home" ).css("left","0"); 
					$( "#btn_home_title" ).text("X,Y,Z");  
					$( "#btn_home .glyphicon" ).removeClass("glyphicon-home");
					$( "#btn_home .glyphicon" ).addClass("glyphicon-chevron-left");
					menu = "xyz";
				}
			);
		});
		//Gestion des boutons
		var X = 0; var Y = 0; var Z = 0;
		var XMax = 10; var YMax = 10; var ZMax = 10;
		
		$( "#x_plus" ).click(function(){
			var pas = $( ".selectpicker" ).val();
			X = X + parseFloat(pas);
			if(X >= 0 && X <= XMax){
			        var str = "X:"+X+" | Y:"+Y+" | Z:"+Z;
			        $( ".position_xyz" ).text(str);
			        // TODO: Envoyer la commande "jog"
			        send(octopi_server+'jog/'+X+'/'+Y+'/'+Z,'');
			}
		});
		$( "#x_moins" ).click(function(){
			var pas = $( ".selectpicker" ).val();
			X = X - parseFloat(pas);
			if(X >= 0 && X <= XMax){
			        var str = "X:"+X+" | Y:"+Y+" | Z:"+Z;
			        $( ".position_xyz" ).text(str); 
			        // TODO: Envoyer la commande "jog"
			        send(octopi_server+'jog/'+X+'/'+Y+'/'+Z,'');
			}
		});
		$( "#y_plus" ).click(function(){
			var pas = $( ".selectpicker" ).val();
			Y = Y + parseFloat(pas);
			if(Y >= 0 && Y <= XMax){
			        var str = "X:"+X+" | Y:"+Y+" | Z:"+Z;
			        $( ".position_xyz" ).text(str); 
			        // TODO: Envoyer la commande "jog"
			        send(octopi_server+'jog/'+X+'/'+Y+'/'+Z,'');
			}
		});
		$( "#y_moins" ).click(function(){
			var pas = $( ".selectpicker" ).val();
			Y = Y - parseFloat(pas);
			if(Y >= 0 && Y <= XMax){
			        var str = "X:"+X+" | Y:"+Y+" | Z:"+Z;
			        $( ".position_xyz" ).text(str); 
			        // TODO: Envoyer la commande "jog"
			        send(octopi_server+'jog/'+X+'/'+Y+'/'+Z,'');
			}
		});
		$( "#house_xy" ).click(function(){
			X = 0; Y = 0; 
			var str = "X:"+X+" | Y:"+Y+" | Z:"+Z;
			$( ".position_xyz" ).text(str); 
			// TODO: Envoyer la commande "jog"
			send(octopi_server+'homeXY','');
		});
		$( "#house_z" ).click(function(){
			Z = 0; 
			var str = "X:"+X+" | Y:"+Y+" | Z:"+Z;
			$( ".position_xyz" ).text(str); 
			// TODO: Envoyer la commande "jog"
			send(octopi_server+'homeZ','');
		});
		$( "#z_plus" ).click(function(){
			var pas = $( ".selectpicker" ).val();
			Z = Z + parseFloat(pas);
			if( Z >= 0 && Z <= XMax){
			        var str = "X:"+X+" | Y:"+Y+" | Z:"+Z;
			        $( ".position_xyz" ).text(str); 
			        // TODO: Envoyer la commande "jog"
			        send(octopi_server+'jog/'+X+'/'+Y+'/'+Z,'');
			}
		});
		$( "#z_moins" ).click(function(){
			var pas = $( ".selectpicker" ).val();
			Z = Z - parseFloat(pas);
			if(Z >= 0 && Z <= XMax){
			        var str = "X:"+X+" | Y:"+Y+" | Z:"+Z;
			        $( ".position_xyz" ).text(str); 
			        // TODO: Envoyer la commande "jog"
			        send(octopi_server+'jog/'+X+'/'+Y+'/'+Z,'');
			}
		});
		
		/*****************************************************************/
		//5.Paramètres
		$( "#settings" ).click(function(){
			$( "#menu" ).animate(
				{ "left": "-=320px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#menu" ).css("display","none"); 
					$( "#parametres_menu" ).css("display","block"); 
					$( "#parametres_menu" ).animate({ "left": "-=311px" },"fast");
				}
			);
			$( "#btn_home" ).animate(
				{ "left": "-=100px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#btn_home" ).css("left","0"); 
					$( "#btn_home_title" ).text("Paramètres"); 
					$( "#btn_home .glyphicon" ).removeClass("glyphicon-home");
					$( "#btn_home .glyphicon" ).addClass("glyphicon-chevron-left");
					menu = "parametres";
				}
			);
		});
		
		var pas_temperature = 1; var pas_vitesse = 10;
		var temp_value_init = 10; var vit_value_init = 20;
		var temp_value = $( "#temperature_value" );
		var vit_value = $( "#vitesse_value" );
		
		temp_value.text(temp_value_init + "°");
		vit_value.text(vit_value_init);
		
		$( "#led" ).click(function(){
		        if($("#led").is(':checked')){
		                console.log("switch led on");
		                send(octopi_server+'switch/on','');
		        }else{
		                console.log("switch led off");
		                send(octopi_server+'switch/off','');
		        }			
		});
		
		$( "#btn_vitesse_moins" ).click(function(){
			console.log("value "+ vit_value.value);
			var str = $( "#vitesse_value" ).val() - pas_vitesse;
			console.log("str " + str);
			vit_value.text(str);
		});
		
		$( "#btn_vitesse_plus" ).click(function(){
			
		});
		
		$( "#btn_vitesse_valider" ).click(function(){
			
		});
		
		$( "#btn_temperature_moins" ).click(function(){
			
		});
		
		$( "#btn_temperature_plus" ).click(function(){
			
		});
		
		$( "#btn_temperature_valider" ).click(function(){
			
		});
		/*****************************************************************/
		//6.Eteindre la machine
		$('#btn_shutdown').on('click', function () {			
			console.log("extinction des feux !");/**
			$("header").css("display","none");
			$("#menu").css("display","none");
			$("#extinction").css("display","block");**/

			// TODO: Envoyer la commande "shutdown"
			send(octopi_server+'stop','');
		});
		
		$('#btn_reboot').on('click', function () {			
			console.log("extinction des feux !");/**
			$("header").css("display","none");
			$("#menu").css("display","none");
			$("#extinction").css("display","block");**/

			// TODO: Envoyer la commande "shutdown"
			send(octopi_server+'reboot','');
		});
		

		/*****************************************************************/
		
		//Fonctions principales
		var xmlhttp;
		var octopi_server = "http://0.0.0.0:4000/";
		
		if (window.XMLHttpRequest){ 
		        xmlhttp = new XMLHttpRequest();
		}
		
		function send(url, value)
		{
			if(value == ''){
				xmlhttp.open("GET", url, true);
			}else{
				xmlhttp.open("GET", url +"?value=" + value, true);
			}
			xmlhttp.send();
		}

		//fonction arrêter
		function stop_printing(){
			// On efface les notification
			$('#en_cours').css("display","none");

			$( "#content" ).animate(
				{ "top": "=190px" }, 
				"easeOutBounce", 
				function(){ 
					$( "#content" ).css("display","none"); 
					$( "#content_cancel" ).css("display","block"); 
					$( "#content_cancel" ).animate({ "top": "=0" },"fast");
				}
			);
			
			setTimeout(function(){ 

				$( "#printing_block" ).animate(
					{ "left": "=311px" }, 
					"easeOutBounce", 
					function(){ 
						$( "#printing_block" ).css("display","none"); 
						//$( "#printing_block" ).css("left","311px");
						$( "#list_imgs" ).css("display","block"); 
						$( "#list_imgs" ).css("left","0");
					}
				);
				
				$( "#btn_home" ).animate(
					{ "left": "-=100px" }, 
					"easeOutBounce", 
					function(){ 
						$( "#btn_home" ).css("left","0"); 
						$( "#btn_home_title" ).text("Fichiers");  
						$( "#btn_home .glyphicon" ).removeClass("glyphicon-home");
						$( "#btn_home .glyphicon" ).addClass("glyphicon-chevron-left");
						menu = "fichiers";
					}
				);
				
			 }, 2000);
		};
		
		//fonction reprendre impression
		function resume_printing(){
		
		}
		
		//Acquition des paramètres de l'imprimante
		var freq = 1000;
		var url = octopi_server+'state/all';
		
		var print_progression = $("#print_progression");
		var time_left = $("#time_left");
		var printing_name = $("#printing_name");

		var progression = 0;

		setInterval(function(){		        
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

		// Calculer le pourcentage de progression
		function progression(timeLeft, time){
			var result = 0.0;
			if (time != "null" && timeLeft != "null"){
				result = (time - timeLeft) / time;
			}
			return result;
		};
	});
