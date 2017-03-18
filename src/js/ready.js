var $ = require('jquery');
var UIManager = require('./UIManager');
var likesManager = require('./LikesManager');
var likesService = require("./LikesService");
var dateManager = require("./DateManager");

var templateEvents = function() {
    //GESTION DE EVENTOS
    //Changing top menu by offset-top
    $(window).scroll(UIManager.headerSetTop);

    //Gestion de redireccionables
    $(".navigate").on("click", UIManager.navigate);

    //Busqueda abrir
    $(".buttons-grp").on("click", "button.search", UIManager.searchToggle);

    //Busqueda buscar   
    $(".buttons-grp").on("keyup", ".input-search", UIManager.runSearch);

};

var readyMain = function() {

    //Carga artículos
        //Aquí debería ir una llamada al servidor para cargar los primeros 10 artículos (será un servicio)
        // articlesService.list(10);

   //Comprueba si esos artículos le gustan al usuario
        likesManager.activarLikesPantalla();

   //Activamos los eventos generales de la plantilla
        templateEvents();        

  //Likes
        $("article.article").on("click", ".favorite-btn, .favoriteOn-btn", function(event){
            likesManager.procesarLike(event.delegateTarget.dataset.id);
        })

  //Formatear fechas respecto al día de hoy
        dateManager.actualizaFechas();



};

var readyDetail = function() {
    templateEvents();

    $(window).scroll(UIManager.watchCommentsSection);
    $(window).trigger("scroll");
}

$().ready(function(){ 

    var path = window.location.pathname;

    switch (path) {
        case "/":
            readyMain();
            break;
        case "/detail.html":
            readyDetail();
            break;
        default:
            templateEvents();
            break;          
    }





});