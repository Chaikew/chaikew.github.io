/* Console log formating */

var _log = console.log;

console.log = function(){
    var args = Array.from(arguments);
    args.unshift("[worker: " + (~[]) + "]: ");
    _log.apply(console, args);
}

$(window).bind('load', function(){
    $('.owo').effect("bounce", {
        times: .7,
        distance: 100
    }, 1000, "linear");
});


/* Sakura Background render*/
$("#sakura-container").load("leafs-js/leafs.html");