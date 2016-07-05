/**
 * Created by Pydd on 09.06.2016.
 */

$(function (){

    $('#evolution_conso').change(function(event) {
        var conso_today = globalArray['conso'][globalArray['years'].indexOf(year-2)];
        var rate = $('#evolution_conso').prop("value");
        changeFuturConsoChart(rate) ;
        var goal = (globalArray['conso'][globalArray['years'].indexOf(2050)]-conso_today) / 1000 ;
        goal = Math.round(goal) ;
        $('#evolution_conso_goal').prop("value",goal) ;

    }) ;

    $('#evolution_conso_goal').change(function(event){
        var conso_today = globalArray['conso'][globalArray['years'].indexOf(year-2)];
        var goal =  parseInt($('#evolution_conso_goal').prop("value"))*1000 ;

        console.log(goal) ;
        var rate = findRate(conso_today,goal) ;
        $('#evolution_conso').prop("value",rate) ;
        changeFuturConsoChart(rate);

    }) ;
}) ;


function changeFuturConsoChart(rate)
{
    applyRate(globalArray['conso'],rate) ;
    updateProdChart() ; 
    updateConsProdChart() ;
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
        globalArray['prod_gaz_centr'][i])-
        globalArray['conso'][i]) ;
    }

    consoprod_chart.series[0].setData(array_diff,true) ;
    
}