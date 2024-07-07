function désaffiche(){//fonction universelle qui désaffiche absolument tous les éléments de la page
	document.getElementById('erreur').style.display = "none";
	document.getElementById('erreur2').style.display = "none";
	document.getElementById('pageAcceuil').style.display = "inline-block";
	document.getElementById('doscartes').style.display = "none";
	document.getElementById('carte_selectionnee').style.display = "none";
	document.getElementById('jauges2').style.display = "none";
	document.getElementById('affi_mode').style.display = "none";
	document.getElementById('messages_mort').style.display = "none";
	document.getElementById('partie_bateau').style.display = "none";
	let r = document.getElementsByClassName('niv_bateau') ; 
	for (let g of r){
		g.style.display = 'none' ;
	}
	document.getElementById('niv0').style.display = 'inline-block' ;
	document.getElementById('tentative_fuir').style.display = "none";
	document.getElementById('affichage_folie').style.display = "none";
	document.getElementById('affichage_vivres').style.display = "none";
	document.getElementById('pageExplicative').style.display = "none";
	let events = document.getElementsByClassName('photo_personnage_grande') ;
	for (let ev of events){
		ev.style.display = "none";
	}

}
désaffiche();

// Toutes les définitions de variables
var lescartes = new Map();
var jour = 0;
var boutons = document.getElementsByClassName("dos_carte");
var mode;
var num_carte;
var vivres;
var genre;
var choixGenre ;
var nb = 0 ;

//Définition de toutes les cartes
lescartes.set (0,{
	action : "" ,
	nb_ex : 0 ,
	nb_ex_max : 0 
})

lescartes.set (1,{//carte n°1 (tempête) qu'on peut tirer 2 fois
	action : ['bois', 'pecher'],
	nb_ex : 0,
	nb_ex_max  : 2
});		
	
lescartes.set (2,{//carte n°2 (chaleur extrême) qu'on peut tirer 2 fois
	action : ['bois'],
	nb_ex : 0,
	nb_ex_max : 2
});

lescartes.set (3,{//carte n°3 (beau temps) qu'on peut tirer 3 fois
	action : ['bois', 'pecher', 'eau'],
	nb_ex : 0,
	nb_ex_max : 3
});

lescartes.set (4,{//carte n°4 (arc-en-ciel) qu'on peut tirer 1 fois
	action : ['bois', 'pecher', 'eau'],
	nb_ex : 0,
	nb_ex_max : 1
});

lescartes.set (5,{//carte n°5 (orage) qu'on peut tirer 2 fois
	action : ['pecher', 'eau'],
	nb_ex : 0,
	nb_ex_max : 2
});

//Début de la partie fonction

	//cette partie sert à agrandir ou rétrécir les images des perso en fonction de si elles sont sélectionnées/survolées ou non : 
	//Elle manque de clarté, il est possible de la rendre plus DRY, cela fait partie des améliorations futures
function affiche_f_petite(){//fonction qui sert à afficher l'image du perso F en petit
	document.getElementById("photo_f_petite").style.display = "inline-block" ;
	document.getElementById("photo_f_grande").style.display = "none" ;
}

function affiche_f_grande(){//fonction qui sert à afficher l'image du perso F en grand
	document.getElementById("photo_f_petite").style.display = "none";
	document.getElementById("photo_f_grande").style.display = "inline-block";
}

function affiche_h_petite(){//fonction qui sert à afficher l'image du perso H en petit
	document.getElementById("photo_h_petite").style.display = "inline-block" ;
	document.getElementById("photo_h_grande").style.display = "none" ;
}

function affiche_h_grande(){//fonction qui sert à afficher l'image du perso H en petit
	document.getElementById("photo_h_petite").style.display = "none";
	document.getElementById("photo_h_grande").style.display = "inline-block";
}

document.getElementById('photo_f_petite').addEventListener('mouseover', () =>{//fonction qui agrandit l'image F quand elle est survolée
	affiche_f_grande();
});

document.getElementById('photo_h_petite').addEventListener("mouseover", ()=>{//fonction qui agrandit l'image H quand elle est survolée
	affiche_h_grande();
});

document.getElementById('photo_f_grande').addEventListener("mouseout", ()=>{//fonction qui rétrécit l'image du personnage féminin quand elle n'est pas survolée
	choix_genre();
	if (genre == 'feminin'){
		affiche_f_grande();
		affiche_h_petite();
	}
	else if (genre == 'masculin'){
		affiche_f_petite();
		affiche_h_grande();
	}
	else{
		affiche_f_petite();
		affiche_h_petite();
	}
});

document.getElementById('photo_h_grande').addEventListener("mouseout", ()=>{ //fonction qui rétrécit l'image du personnage masculin quand elle n'est pas survolée
	choix_genre();
	if (genre == 'feminin'){
		affiche_f_grande();
		affiche_h_petite();
	}
	else if (genre == 'masculin'){
		affiche_f_petite();
		affiche_h_grande();
	}
	else{
		affiche_f_petite();
		affiche_h_petite();
	}
});//fin de la partie des images

function choix_genre(){//Fonction qui récupère le choix du genre du joueur
	choixGenre = document.getElementsByName('genre');
	genre = "" ;
	for (var i=0; i < choixGenre.length ; i++){
		if (choixGenre[i].checked){
			genre = choixGenre[i].value;
		}
	}
}

document.getElementById('soumettrePerso').addEventListener("click", ()=>{//fonction qui permet d'envoyer le formulaire du choix du personnage
	lescartes.forEach((carte,key) =>{//reset de la liste des cartes utilisées
		if(carte.hasOwnProperty('nb_ex')){
			carte.nb_ex = 0;
		}
	})
	choix_genre();
	if ((document.getElementById("surnom").value != "")&&(genre != "")){//on vérifie que le genre et le pseudo sont saisis
		var surnom = document.getElementById('surnom').value ; //si oui on affiche la suite
		document.getElementById('choixPersonnage').style.display = "none";
		afficherModeDeJeu(genre, surnom);
	}
	else{//sinon affichage du message d'erreur
		document.getElementById('erreur').style.display = "block";
	}
});

function afficherModeDeJeu (genre){//fonction qui permet d'afficher la page du choix du mode de jeu
	document.getElementById('pageExplicative').style.display = "inline-block";
	document.getElementById('explicationJeu').style.display = 'block';
	document.getElementById('texteExMascu').style.display = 'block';
	document.getElementById('texteExFem').style.display = 'block';
	document.getElementById('modeDeJeu').style.display = "inline-block";
	if (genre == "feminin"){//on affiche le message version femme
		document.getElementById('texteExMascu').style.display = "none";
	}
	else {//on affiche le message version homme
		document.getElementById('texteExFem').style.display = "none";
	}
}

document.getElementById('jouer').addEventListener('click', (surnom, genre) =>{//fonction qui permet d'envoyer le formulaire du choix de mode
	mode = "";
	let choixMode = document.getElementsByName('mode');
	for (var i=0; i < choixMode.length ; i++){
		if (choixMode[i].checked){
			mode = choixMode[i].value;
		}
	}
	if (mode != ""){//on regarde si le mode est bien saisi et si oui on affiche la suite
		lancerJeu(mode, surnom, genre);
	}
	else{//sinon message d'erreur
		document.getElementById('erreur2').style.display = "inline-block";
	}
});

function lancerJeu(mode){ //fonction qui permet d'afficher la page du jeu 
	//on désaffiche les parties affichées précédements :
	document.getElementById('pageExplicative').style.display = "none";
	document.getElementById('tentative_fuir').style.display = "none";
	//on affiche celles qui servent au fonctionnement du jeu
	document.getElementById('doscartes').style.display = "block";
	document.getElementById('affi_mode').style.display = "block";
	document.getElementById('jauges').style.display = "block";
	document.getElementById('jauges2').style.display = "block";
	document.getElementById('jauges_folie').style.display = "block";//la partie jauge folie est affichée
	document.getElementById('jauges_vivres').style.display = "block";//la partie jauge vivres est affichée
	let jauge_folie = document.querySelectorAll('.jauge.folie');//on enlève toutes les jauges de folie
	for (let et of jauge_folie){
	et.style.display = "none";
	}
	changement_jauge_vivres(vivres);//on enlève toutes les jauges de vivres sauf celle qu'il faut
	document.getElementById('jauge_folie0').style.display = "block";
	document.getElementById('partie_bateau').style.display = "block";
	if(mode == 'mode1'){//on définit les ressources en fonction du mode choisit
		affichage_mode.innerHTML = 1;
		affichage_vivres.innerHTML = 5;
		vivres = 5;
		affichage_folie.innerHTML = 0;
		affichage_bois.innerHTML = 0 ;
		niveau_bateau.innerHTML = 0;
		bois_bateau.innerHTML = 0;
		changement_jauge_vivres(vivres);
	}
	else{
		affichage_mode.innerHTML = 2;
		affichage_vivres.innerHTML = 3;
		vivres = 3;
		affichage_folie.innerHTML = -2;
		affichage_bois.innerHTML = 0 ;
		niveau_bateau.innerHTML = 0;
		bois_bateau.innerHTML = 0;
		changement_jauge_vivres(vivres);
	}
}

function Jour(mode){//Fonction qui sert à voir si le joueur peut tirer une carte ou non (manque de nourriture, ou trop de folie par exemple)
	if ((mode == 'mode2') && (document.getElementById('affichage_folie').innerHTML >= 7)){//si mode 2 alors regarder si la folie est à 7 et si c'est le cas alors mort par manque de cartes
		document.getElementById('messages_mort').style.display = 'inline-block';
		document.getElementById('mort_folie_h').style.display = 'none';
			document.getElementById('mort_faim_h').style.display = "none";
			document.getElementById('mort_folie_f').style.display = 'none';
			document.getElementById('mort_faim_f').style.display = "none";
		choix_genre();
		if (genre == 'masculin'){
			document.getElementById('mort_carte_h').style.display = "block";
			document.getElementById('mort_carte_f').style.display = "none";
		}
		else{
			document.getElementById('mort_carte_h').style.display = "none";
			document.getElementById('mort_carte_f').style.display = "block";
		}
		mort();
		console.log('mort par manque de cartes (mode2');
		document.getElementById('jauge_folie9').style.display = "none";
		document.getElementById('jauge_folie8').style.display = "none";
	}
	else if(document.getElementById('affichage_folie').innerHTML == 8){//sinon si mode 1 alors regarder si folie est à 8 (si oui mort par folie)
		document.getElementById('messages_mort').style.display = 'inline-block';
		document.getElementById('mort_carte_h').style.display = "none";
		document.getElementById('mort_carte_f').style.display = "none";
		document.getElementById('mort_faim_h').style.display = "none";
		document.getElementById('mort_faim_f').style.display = "none";
		choix_genre();
		if (genre == 'masculin'){
			document.getElementById('mort_folie_h').style.display = "block";
			document.getElementById('mort_folie_f').style.display = "none";
		}
		else{
			document.getElementById('mort_folie_h').style.display = "none";
			document.getElementById('mort_folie_f').style.display = "block";
		}
		mort();
		console.log('mort par folie (mode1');
		document.getElementById('jauge_folie9').style.display = "inline-block";
		document.getElementById('jauge_folie8').style.display = "none";
	}
	else {//sinon regarder si le joueur a encore à manger sinon il meurt
		if (document.getElementById('affichage_vivres').innerHTML <= 0){//si le joeur n'a plus de vivres
			document.getElementById('messages_mort').style.display = 'inline-block';
			document.getElementById('mort_folie_h').style.display = 'none';
			document.getElementById('mort_folie_f').style.display = 'none';
			document.getElementById('mort_carte_h').style.display = "none";
			document.getElementById('mort_carte_f').style.display = "none";
			if (genre == 'masculin'){
				document.getElementById('mort_faim_h').style.display = "block";
				document.getElementById('mort_faim_f').style.display = "none";
			}
			else{
				document.getElementById('mort_faim_h').style.display = "none";
				document.getElementById('mort_faim_f').style.display = "block";
			}
			mort();
			console.log('mort par faim');
			return ;
		}
		else{//sinon tirer une carte aléatoire
			tire_carte() ;
		}
	}
}

function tire_carte(){//Fonction qui tire une carte aléatoire
	var num;
	const carte_dispo = Array.from(lescartes).filter((carte) => carte[1].nb_ex < carte[1].nb_ex_max);//On crée un tableau qui répertorie les cartes disponibles
	if(carte_dispo.length !== 0) {//On regarde si il reste des cartes à tirer
		num = carte_dispo[Math.floor(Math.random() * carte_dispo.length)][0];
	}
	else {//Si il en reste pas, alors mort par manque de cartes
		document.getElementById('messages_mort').style.display = 'block';
		document.getElementById('mort_folie').style.display = 'none';
		mort();
		return ;
	}
	lescartes.get(num).nb_ex = lescartes.get(num).nb_ex + 1;//On rajoute un exemplaire utilisé au 'portrait' de la carte tirée
	affiche_carte(num);//on affiche la carte tirée
	choix_actions(num);//et les actions associées
	num_carte = num;
}

function affiche_carte(num){//Fonction qui affiche le nom et la description en fonction de la carte tirée
	var carte = document.getElementById("carte_selectionnee");
	carte.style.display = 'block' ;
	var carte_non = document.getElementsByClassName("carte_action");
	for (let en of carte_non){
		en.style.display = "none";
	}
	for(let i = 0; i <= 6; i++){
		if(i == num){
			document.getElementById(`carte_${i}`).style.display = 'block' ; 
		}
	}
	document.getElementById("doscartes").style.display = "none" ;
	document.getElementById('partie_bateau').style.display = "none" ;
	document.getElementById('action_non_valide').style.display = "none" ;
}

function choix_actions(num){//fonction qui affiche les actions en fonction de la carte tirée
	const choixElement = document.querySelectorAll('.action');//reset des boutons radios à chaque nouvelle carte tirée
	for(let i=0; i<choixElement.length; i++){
		const choix = choixElement[i] ;
		choix.style.display = "flex";
		choix.querySelector("input").checked = false ;
	}
	if (lescartes.get(num).action[0] != "bois"){//c'est la carte 5	
		document.getElementById('bois-container').style.display = 'none';// pk pas juste faire un if num == 4 ? par exemple ?
	}
	else {
		if ((lescartes.get(num).action[0] !== "bois") || (lescartes.get(num).action[2] !== "eau")){//c'est les cartes 4 et 3
			if (lescartes.get(num).action[1] === "pecher"){//c'est la carte 1
				document.getElementById('eau-container').style.display = 'none';
			}
			else { //c'est la carte 2
				document.getElementById('eau-container').style.display = 'none';
				document.getElementById('pecher-container').style.display = 'none';
			}
		}
	}
}

document.getElementById('suite').addEventListener('click', (event) => {//fonction qui quand on clique sur le bouton 'valider l'action' récupère l'action faite
	var num = num_carte;
	var choix = document.getElementsByName('action');
	var actions = "" ;
	for (var i=0; i < choix.length ; i++){
		if (choix[i].checked){
			actions = choix[i].value;
		}
	}
	if (actions != ""){
		changement_valeurs(actions, num);//fonction qui redirige après vers la fonction qui effectue l'action demandée
	}
	else{
		document.getElementById('action_non_valide').style.display = "block" ;
	}
});	

function changement_valeurs(actions, num){//fonction qui renvoie vers les fonctions associées à l'action demandée
	if (actions == 'bois'){
		boisAleatoire();
	}
	else{
		if (actions == 'pecher'){
			nourritureA(vivres);
		}
		else{
			eauA(vivres);
		}
	}
	passage_jour(num);
}

function boisAleatoire(){ //fonction qui récupère de façon aléatoire le nombre de bois et l'ajoute à la reserve de bois (+l'amélioration du bateau)
	var ajout_bois = Math.floor(Math.random()*3)+1 ;
	affichage_bois.innerHTML = ajout_bois + parseInt(document.getElementById('affichage_bois').innerHTML);
	bois_bateau.innerHTML = ajout_bois + parseInt(document.getElementById('bois_bateau').innerHTML);
	if ((document.getElementById('bois_bateau').innerHTML >= 0) && (document.getElementById('bois_bateau').innerHTML < 5)){//le bateau est niveau 0, entre 0 et 5 exclus
		console.log('le niveau du bateau est 0');
	}
	else{
		if ((document.getElementById('bois_bateau').innerHTML >= 5) && (document.getElementById('bois_bateau').innerHTML < 7)){//le bateau est niveau 1, entre 5 et 7 exclus
			document.getElementById('niv1').style.display = "block" ;
			document.getElementById('niv0').style.display = "none" ;
		}
		else{
			if ((document.getElementById('bois_bateau').innerHTML >= 7) && (document.getElementById('bois_bateau').innerHTML < 10)){//le bateau est niveau 2, entre 7 et 10 exclus
				document.getElementById('niv2').style.display = "block" ;
				document.getElementById('niv1').style.display = "none" ;
			}
			else{//le bateau est niveau 3, supérieur à 10
				document.getElementById('niv3').style.display = "block" ;
				document.getElementById('niv2').style.display = "none" ;
			}
		}
	}
}

function eauA(){//fonction qui ajoute 2 de vivres au perso quand il en fait l'action d'aller chercher de l'eau
	affichage_vivres.innerHTML = 2 + parseInt(document.getElementById('affichage_vivres').innerHTML) ;
}

function nourritureA(){//fonction qui ajoute 1 de vivres quand le joueur fait l'action d'aller chercher du poisson.
	var ajout_poissons = Math.floor(Math.random()*2) + 1 ;
	affichage_vivres.innerHTML = ajout_poissons + parseInt(document.getElementById('affichage_vivres').innerHTML) ;
}

function passage_jour(num){//fonction qui effectue le passage au jour suivant en changeant les ressources et caractéristiques du perso 
	var nb_folie = document.getElementById('affichage_folie').innerHTML ;
	document.getElementById("doscartes").style.display = "block";
	document.getElementById("carte_selectionnee").style.display = 'none';
	document.getElementById('partie_bateau').style.display = "block";
	if (num != 4){//si c'est pas la carte arc-en-ciel, le joueur devient un peu + fou
		affichage_folie.innerHTML = 1 + parseInt(nb_folie);//ajoute 1 pts de folie chaque jour
		nb_folie = document.getElementById('affichage_folie').innerHTML ;
		changement_jauge_folie(nb_folie);//change l'image de la jauge de folie
	}
	affichage_vivres.innerHTML = parseInt(document.getElementById('affichage_vivres').innerHTML) - 1 ;//enlève 1 de vivres chaque jour
	vivres = document.getElementById('affichage_vivres').innerHTML;
	changement_jauge_vivres(vivres);//change la jauge de vivres
}

function changement_jauge_folie(nb_folie){//change la jauge de folie en fonction du niveau du folie du joueur
	let jauge_avant = parseInt(nb_folie) - 1 ;
	if(nb_folie == '0'){
		document.getElementById(`jauge_folie${nb_folie}`).style.display = 'block';
	}
	else{
		document.getElementById(`jauge_folie${jauge_avant}`).style.display = 'none';
		document.getElementById(`jauge_folie${nb_folie}`).style.display = 'block';
	}
}

function changement_jauge_vivres(vivres){//change la jauge de vivres en fonction du niveau de ressources du joueur
	jauge_vivres_enlever();
	let jauge_avant = parseInt(vivres) - 1 ;
	if(vivres == '0'){
		document.getElementById(`jauge_vivres${vivres}`).style.display = 'block';
	}
	else if(vivres < 10){
		document.getElementById(`jauge_vivres${jauge_avant}`).style.display = 'none';
		document.getElementById(`jauge_vivres${vivres}`).style.display = 'block';
	}
	else{
		document.getElementById(`jauge_vivres10`).style.display = 'block';
	}
}//ici pour les deux fonctions qui changent les différentes jauges, j'aurai aimé les fusionner pour que ce soit moins répétitif (amélioration possible)

function jauge_vivres_enlever(){//enlève toutes les jauges de vivres
	let jauge = document.querySelectorAll('.jauge.vivres')
	for (let em of jauge){
	em.style.display = "none";
	}
}

function partir(){//fonction qui affiche tel ou tel message de fin (mort ou survie) quand le joeur part avec le bateau
	mort();//pour enlever tous les divs et ne plus rien n'afficher
	document.getElementById('tentative_fuir').style.display = 'inline-block';
	//on calcule si c'est réussit ou non
	if (niveau_bateau.innerHTML == '0'){//bateau de niveau 0
		//message de noyade car pas possiblité de construire un bateau
		document.getElementById('recommencez1').style.display = 'inline-block';
		document.getElementById('bateau_0').style.display = 'block';
	}
	else{
		if (niveau_bateau.innerHTML == '1'){//bateau de niveau 1
			//30% de chances de survie + 3%/pt de vivres
			var random = Math.random();
			var vivres = Math.floor(parseFloat(document.getElementById('affichage_vivres').innerHTML));
			var chance = 0.3 + (3 * vivres)/100 ;
			var reussite = random <= chance ;
			if (reussite){
				fuite();
			}
			else{
				mort();
				mort_fh_bat12();
			}
		}
		else if (niveau_bateau.innerHTML == '2'){//bateau de niveau 2
			//70% de chances de survie + 2%/pt de vivres
			var random = Math.random();
			var vivres = Math.floor(parseFloat(document.getElementById('affichage_vivres').innerHTML));
			var chance = 0.7 + (2 * vivres)/100 ;
			var reussite = random <= chance ;
			if (reussite){
				fuite();
			}
			else{
				mort();
				mort_fh_bat12();
			}
		}
		else{//bateau de niveau 3
			//90% de chances de survie + 1%/pt de vivres
			var random = Math.random();
			var vivres = Math.floor(parseFloat(document.getElementById('affichage_vivres').innerHTML));
			var chance = 0.9 + (1 * vivres)/100 ;
			var reussite = random <= chance ;
			if (reussite){
				fuite();
			}
			else{
				mort();
				choix_genre();
				if (genre == 'masculin'){
					document.getElementById('bateau_3_h').style.display = 'block';
				}
				else{
					document.getElementById('bateau_3_f').style.display = 'block';
				}
			}
		}
	}
}

function mort_fh_bat12(){//Fonction qui selon le genre du joueur affiche tel ou tel message de mort pour le bateau de niv 1&2
	choix_genre();
	if (genre == 'masculin'){
		document.getElementById('bateau_1&2_h').style.display = 'block';
	}
	else{
		document.getElementById('bateau_1&2_f').style.display = 'block';
	}
}

function mort(){//fonction qui désaffiche tous les divs non essentiels quand le joueur meurt ou gagne
	let event = document.getElementsByClassName('photo_personnage_petite')
	for (let ef of event){
		ef.style.display = "block";
	}
	//Ici nous aimerions pouvoir rendre cela plus DRY avec la fonction déssafichage() par exemple, 
	//c'est une des améliorations à venir
	document.getElementById('recommencez1').style.display = 'inline-block';
	document.getElementById('doscartes').style.display = 'none';
	document.getElementById('affi_mode').style.display = 'none';
	document.getElementById('carte_selectionnee').style.display = 'none';
	document.getElementById('partie_bateau').style.display = 'none';
	document.getElementById('bateau_1&2_h').style.display = 'none';
	document.getElementById('bateau_1&2_f').style.display = 'none';
	document.getElementById('bateau_3_h').style.display = 'none';
	document.getElementById('bateau_3_f').style.display = 'none';
	document.getElementById('reussite_critique_h').style.display = 'none';
	document.getElementById('reussite_critique_f').style.display = 'none';
	document.getElementById('bateau_0').style.display = 'none';
	document.getElementById('jauges').style.display = 'none';
	document.getElementById('explicationJeu').style.display = 'none';
}

function fuite(){//fonction qui est appellée quand le joueur réussit à s'enfuir
	mort();
	document.getElementById('reussite').style.display = 'block';
	choix_genre();
	if (genre == 'masculin'){
		document.getElementById('reussite_critique_h').style.display = 'block';
	}
	else{
		document.getElementById('reussite_critique_f').style.display = 'block';
	}
}

function recommencer(){//fonction qui recharche la page = recommence le jeu
	location.reload();
}