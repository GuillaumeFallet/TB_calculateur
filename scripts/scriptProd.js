/**
 * Created by Guillaume on 22.06.2016.
 */

$(function () {

    $('#evolution_hydro_goal').attr({
        "max" : config.DEFAULT_HYDRO_MAX,
        "min" : config.DEFAULT_HYDRO_MIN,
        "step" : 0.5
    }) ;
    $('#evolution_solar_goal').attr({
        "max" : config.DEFAULT_SOLAR_MAX,
        "min" : config.DEFAULT_SOLAR_MIN
    }) ;
    $('#evolution_eolien_goal').attr({
        "max" : config.DEFAULT_EOL_MAX,
        "min" : config.DEFAULT_EOL_MIN,
        "step" : 0.5
    }) ;
    $('#evolution_geoth_goal').attr({
        "max" : config.DEFAULT_GEOTHERM_MAX,
        "min" : config.DEFAULT_GEOTHERM_MIN,
        "step" : 0.5
    }) ;

    $('[id^="evolution_"]').change(function() {
        calculateProd() ;
    }) ;
}) ;


function calculateProd()
{

    var hydro_goal = parseFloat($('#evolution_hydro_goal').prop("value")*1000) ;
    var solar_goal = parseFloat($('#evolution_solar_goal').prop("value")*1000) ;
    var eol_goal = parseFloat($('#evolution_eolien_goal').prop("value")*1000) ;
    var geotherm_goal = parseFloat($('#evolution_geoth_goal').prop("value")*1000) ;
    

    applyGoal(globalArray['prod_hydro'],hydro_goal) ;
    applyGoal(globalArray['prod_solar'],solar_goal) ;
    applyGoal(globalArray['prod_eol'],eol_goal) ;
    applyGoal(globalArray['prod_therm'],geotherm_goal) ;

    calculateNuclAndGazProd() ;
    updateConsProdChart() ;
    updateProdChart() ;
    calculateMix() ;
}

function updateProdChart() {
    prod_chart.series[0].update(globalArray['prod_nucl'],true) ;
    prod_chart.series[1].update(globalArray['prod_hydro'],true) ;
    prod_chart.series[2].update(globalArray['prod_solar'],true) ;
    prod_chart.series[3].update(globalArray['prod_eol'],true) ;
    prod_chart.series[4].update(globalArray['prod_gaz_centr'],true) ;
    prod_chart.series[5].update(globalArray['prod_therm'],true) ;
    prod_chart.series[6].update(globalArray['conso'],true) ;

}