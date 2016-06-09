/**
 * Created by Pydd on 09.06.2016.
 */

$(function (){

    $('#evolution_conso').change(function(event) {
        var rate = $('#evolution_conso').prop("value");
        var conso_today = conso_past[conso_past.length - 1];
        var last_conso_futur =  changeFuturConsoChart(rate) ;
        var goal = (last_conso_futur-conso_today) / 1000 ;
        goal = Math.round(goal) ;
        $('#evolution_conso_goal').prop("value",goal) ;

    }) ;

    $('#evolution_conso_goal').change(function(event){

        var conso_today = conso_past[conso_past.length - 1]/1000;
        var goal =  parseInt($('#evolution_conso_goal').prop("value")) + parseInt(conso_today) ;
        //console.log("Le goal est "+goal) ;
        var percenttotal = goal/conso_today*100-100 ;
        //console.log("le % total est "+percenttotal) ;
        var rate = percenttotal/ conso_futur.length ;
        //console.log("le rate par année est de "+rate);
        rate = Math.round(rate*10)/10 ;
       $('#evolution_conso').prop("value",rate) ;
        changeFuturConsoChart(rate);

    }) ;
}) ;


function changeFuturConsoChart(rate)
{
    var conso_today = conso_past[conso_past.length - 1];
    var new_conso_futur = [] ;
    for (var i = 1 ; i <= conso_futur.length ; i ++)
    {
        new_conso_futur[i-1] =Math.round(conso_today/100*(100+rate*i)) ;
    }
    nucl_chart.series[3].setData(conso_past.concat((new_conso_futur)),true)
    return new_conso_futur[new_conso_futur.length-1] ;
}