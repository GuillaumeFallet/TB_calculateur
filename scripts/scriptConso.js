/**
 * Created by Pydd on 09.06.2016.
 */


$(function (){

    // event listener when the rate of consumption is changed
    $('#evolution_conso').change(function(event) {
        var conso_today = globalArray['conso'][globalArray['years'].indexOf(year-2)];
        var rate = $('#evolution_conso').prop("value");
        changeFuturConsoChart(rate) ;
        var goal = (globalArray['conso'][globalArray['years'].indexOf(2050)]-conso_today) / 1000 ;
        goal = Math.round(goal) ;
        $('#evolution_conso_goal').prop("value",goal) ;

    }) ;

    // event listener when the goal of consumption is changed
    $('#evolution_conso_goal').change(function(event){
        var conso_today = globalArray['conso'][globalArray['years'].indexOf(year-2)];
        var goal =  parseInt($('#evolution_conso_goal').prop("value"))*1000 ;

        var rate = findRate(conso_today,goal) ;
        $('#evolution_conso').prop("value",rate) ;
        changeFuturConsoChart(rate);

    }) ;
}) ;

// function to modify the array containing the consumption and update the charts accordingly.
function changeFuturConsoChart(rate)
{
    applyRateLin(globalArray['conso'],rate) ;
    prod_chart.series[6].update(globalArray['conso'],true) ;
    updateConsProdChart() ;
}

// function to update the consumption vs production chart (with calculs)
function updateConsProdChart()
{
    globalArray['prod'] = []  ;
    var array_diff = [];
    for (var i = 0 ; i < globalArray['years'].length ; i ++)
    {
        globalArray['prod'][i] = (globalArray['prod_nucl'][i]+
        globalArray['prod_hydro'][i]+
        globalArray['prod_therm'][i]+
        globalArray['prod_solar'][i]+
        globalArray['prod_eol'][i]+
        globalArray['prod_gaz_centr'][i]) ;

        array_diff[i] = (Math.round(
            (globalArray['prod'][i]-
        globalArray['conso'][i])*10)/10) ;

    }

    consoprod_chart.series[0].setData(array_diff,true) ;

}