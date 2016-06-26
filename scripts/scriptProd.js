/**
 * Created by Guillaume on 22.06.2016.
 */

$(function () {

    $('[id^="evolution_"]').change(function() {
        calculateProd() ;
    }) ;
}) ;


function calculateProd()
{
    var hydro_acc_rate = parseFloat($('#evolution_hydroacc').prop("value")) ;
    var hydro_fil_rate = parseFloat($('#evolution_hydrofil').prop("value")) ;
    var solar_rate = parseFloat($('#evolution_solar').prop("value")) ;
    var eol_rate = parseFloat($('#evolution_eolien').prop("value")) ;
    var therm_rate = parseFloat($('#evolution_geothe').prop("value")) ;

    for(var i = year-1 ; i <= 2050 ; i ++)
    {
        globalArray['prod_hydro_acc'][globalArray['years'].indexOf(i)] =Math.round(globalArray['prod_hydro_acc'][globalArray['years'].indexOf(i-1)]*(1+hydro_acc_rate/100)) ;
        globalArray['prod_hydro_fil'][globalArray['years'].indexOf(i)] =Math.round(globalArray['prod_hydro_fil'][globalArray['years'].indexOf(i-1)]*(1+hydro_fil_rate/100))
        globalArray['prod_solar'][globalArray['years'].indexOf(i)] =Math.round(globalArray['prod_solar'][globalArray['years'].indexOf(i-1)]*(1+solar_rate/100))
        globalArray['prod_eol'][globalArray['years'].indexOf(i)] =Math.round(globalArray['prod_eol'][globalArray['years'].indexOf(i-1)]*(1+eol_rate/100))
        globalArray['prod_gaz_centr'][globalArray['years'].indexOf(i)] =Math.round(globalArray['prod_gaz_centr'][globalArray['years'].indexOf(i-1)]*(1+therm_rate/100))
    }
    
    updateProdChart() ;
    updateConsProdChart() ;
}

function updateProdChart() {
    calculateMix() ;
    prod_chart.series[0].update(globalArray['prod_solar'],true) ;
    prod_chart.series[1].update(globalArray['prod_eol'],true) ;
    prod_chart.series[2].update(globalArray['prod_hydro_acc'],true) ;
    prod_chart.series[3].update(globalArray['prod_gaz_centr'],true) ;
    prod_chart.series[4].update(globalArray['prod_nucl'],true) ;
    prod_chart.series[5].update(globalArray['conso'],true) ;
}