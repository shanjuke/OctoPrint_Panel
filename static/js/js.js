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
				window.location.reload();

			} else if(menu == "fichiers"){
				go_backward("list_imgs", "menu", "HOME", "menu", true);

			} else if(menu == "detail" || menu == "impression"){
				go_backward("img_detail", "list_imgs", "Fichiers", "fichiers", false);

				if(menu == "impression"){
					$( "#printing_block" ).css("left","311px");
					$( "#printing_block" ).css("display","none");
					
					$( "#heating_block" ).css("left","311px");
					$( "#heating_block" ).css("display","none");
				}

			} else if(menu == "filaments" ){
				go_backward("filament_menu", "menu", "HOME", "home", true);

				$( "#remove_filament" ).css("left","311px");
				$( "#remove_filament" ).css("display","none");

			} else if(menu == "infos" ){
				go_backward("infos_menu", "menu", "HOME", "home", true);

			} else if(menu == "xyz" ){
				go_backward("xyz_menu", "menu", "HOME", "home", true);

			} else if(menu == "parametres" ){
				go_backward("parametres_menu", "menu", "HOME", "home", true);

			}
			
		});

		//2.Imprimer
		//Menu
		$( "#print" ).click(function(){
			go_forward("menu", "list_imgs", "Fichiers", "fichiers", true);
		});
		//Liste
		$( ".img_item" ).click(function(){
			go_forward("list_imgs", "img_detail", "Lego", "detail", false);
		});
		//Lancer impression
		$('#btn_imprimer').on('click', function () {
		    //TODO: Send command to start the print
		    send(octopi_server+'start_print','');
		    
		    go_forward("img_detail", "heating_block", null, null, false);
			
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
			refresh();

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
			console.log("annuler l'impression !");
		    send(octopi_server+'cancel','');
			stop_printing();
		});
		
		//Mettre l'impression en pause 
		$('#btn_pause').on('click', function () {
			console.log("impression sous pause !");	
			send(octopi_server+'pause','');		
		});
		
		//Reprendre l'impression 
		$('#btn_pause_continuer').on('click', function () {
			console.log("reprise de l'impression !");
			send(octopi_server+'resume','');			
		});
		
		//Arrêter l'impression après la pause
		$('#btn_pause_arreter').on('click', function () {
			console.log("annuler l'impression !");
			send(octopi_server+'cancel','');
			stop_printing();
		});
		
		/*****************************************************************/
		//3.Filament
		//Menu
		$( "#filament" ).click(function(){
			go_forward("menu", "filament_menu", "Filaments", "filaments", true);
		});
		//
		$( ".filament_item" ).click(function(){
			go_forward("filament_menu", "heating_block", null, null, false);

			//TODO: Remplacer par la commande chauffer les buses
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
					$( "#btn_home_title" ).text("HOME");  
					$( "#btn_home .glyphicon" ).removeClass("glyphicon-chevron-left");
					$( "#btn_home .glyphicon" ).addClass("glyphicon-home");
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
		//4.Infos
		//Menu
		$( "#infos" ).click(function(){
			go_forward("menu", "infos_menu", "Infos", "infos", true);
		});
		
		/*****************************************************************/
		//5. X,Y,Z
		//Menu
		$( "#xyz" ).click(function(){
			go_forward("menu", "xyz_menu", "X,Y,Z", "xyz", true);
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
		//6.Paramètres
		$( "#settings" ).click(function(){
			go_forward("menu", "parametres_menu", "Paramètres", "parametres", true);
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
		//7.Eteindre la machine
		//Shutdown
		$('#btn_shutdown').on('click', function () {			
			console.log("extinction des feux !");
			send(octopi_server+'stop','');
		});
		//Reboot
		$('#btn_reboot').on('click', function () {			
			console.log("extinction des feux !");
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

		// Avancer dans le menu...
		function go_forward(page, suivante, titre, titre_page_suivante, from_home){
			// Changement de Page
			$( "#"+page+"" ).animate(
				{ "left": "-=320px" }, 
				"fast", 
				function(){ 
					$( "#"+page+"" ).css("display","none"); 
					$( "#"+suivante+"" ).css("display","block"); 
					$( "#"+suivante+"" ).animate({ "left": "-=311px" },"fast");
				}
			);
			// Bouton retour
			if(titre != null && titre_page_suivante != null){
				$( "#btn_home" ).animate(
					{ "left": "-=100px" }, 
					"fast", 
					function(){ 
						$( "#btn_home" ).css("left","0"); 
						$( "#btn_home_title" ).text(titre); 
						if(from_home){
							$( "#btn_home .glyphicon" ).removeClass("glyphicon-home");
							$( "#btn_home .glyphicon" ).addClass("glyphicon-chevron-left");
						}
						menu = titre_page_suivante;
						
					}
				);		
			}

		};

		// Reculer dans le menu...
		function go_backward(page, precedente, titre, titre_page_precedente, to_home){
			// Mise à jour du btn_home
				$( "#btn_home" ).animate(
					{ "left": "-=100px" }, 
					"slow", 
					function(){ 
						$( "#btn_home" ).css("left","0"); 
						$( "#btn_home_title" ).text(titre);
						if(to_home){
							$( "#btn_home .glyphicon" ).removeClass("glyphicon-chevron-left");
							$( "#btn_home .glyphicon" ).addClass("glyphicon-home");
						}
						menu = titre_page_precedente
					}
				);

				$( "#"+page+"" ).css("left","311px");
				$( "#"+page+"" ).css("display","none");
				$( "#"+precedente+"" ).css("display","block");
				$( "#"+precedente+"" ).css("left","0");
		};

		// Remise à zéro de tous les menus
		function refresh(){
			//Refresh - Remettre tous les blocks à droite et invisible
			for(var id in pages){
				var encre = "#"+pages[id]+"";
				//console.log(encre);
				$( encre ).css("display","none");
				$( encre ).css("left","311px");
			}
		};
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
		
		};
		
		//Acquition des paramètres de l'imprimante
		var freq = 1000;
		var url = octopi_server+'state/all';
		
		var print_progression = $("#print_progression");
		var time_left = $("#time_left");
		var printing_name = $("#printing_name");

		var progression = 0;

		var repeat = setInterval(function(){		        
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
