/**
 * Created by Pydd on 09.06.2016.
 */

$(function (){

    $('#evolution_conso').change(function(event) {
        var conso_today = globalArray['conso'][globalArray['years'].indexOf(year-2)];
        var rate = $('#evolution_conso').prop("value");
        var last_conso_futur =  changeFuturConsoChart(rate) ;
        var goal = (last_conso_futur-conso_today) / 1000 ;
        goal = Math.round(goal) ;
        $('#evolution_conso_goal').prop("value",goal) ;

    }) ;

    $('#evolution_conso_goal').change(function(event){
        var conso_today = globalArray['conso'][globalArray['years'].indexOf(year-2)];
        var goal =  parseInt($('#evolution_conso_goal').prop("value"))*1000 + parseInt(conso_today) ;
      //  console.log("Le goal est "+goal) ;
        var percenttotal = goal/conso_today*100-100 ;
     //   console.log("le % total est "+percenttotal) ;
        var rate = percenttotal/ (2050-year-2) ;
      //  console.log("le rate par année est de "+rate);
        rate = Math.round(rate*10)/10 ;
        $('#evolution_conso').prop("value",rate) ;
        
        changeFuturConsoChart(rate);

    }) ;
}) ;


function changeFuturConsoChart(rate)
{

    var conso_today = globalArray['conso'][globalArray['years'].indexOf(year-2)];

    var j = 1 ;
    for(var i = year-1 ; i <= 2050 ; i ++)
    {
        globalArray['conso'][globalArray['years'].indexOf(i)] =Math.round(conso_today/100*(100+rate*j)) ;
        j ++ ;
    }
    prod_chart.series[5].update(globalArray['conso'],true) ;
    updateConsProdChart() ; 
    return  globalArray['conso'][globalArray['conso'].length-1] ;
}

function updateConsProdChart()
{
    var array_diff = [];
    for (var i = 0 ; i < globalArray['years'].length ; i ++)
    {
        array_diff[i] = (
        (globalArray['prod_nucl'][i]+
        globalArray['prod_hydro_acc'][i]+
        globalArray['prod_hydro_fil'][i]+
        globalArray['prod_solar'][i]+
        globalArray['prod_eol'][i]+
        globalArray['prod_therm_centr'][i])-
        globalArray['conso'][i]) ;
    }

    consoprod_chart.series[0].setData(array_diff,true) ;
}