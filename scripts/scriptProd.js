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

    applyRate(globalArray['prod_hydro_acc'],hydro_acc_rate) ;
    applyRate(globalArray['prod_hydro_fil'],hydro_fil_rate) ;
    applyRate(globalArray['prod_solar'],solar_rate) ;
    applyRate(globalArray['prod_eol'],eol_rate) ;
    
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