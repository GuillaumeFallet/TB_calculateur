/**
 * Created by Guillaume on 26.06.2016.
 */

$(function () {

    mixArray = new Array();
    mixArray['years'] = years;
    mixArray['prod_nucl'] =  new Array();
    mixArray['prod_hydro_acc'] = new Array();
    mixArray['prod_hydro_fil'] = new Array();
    mixArray['prod_solar'] = new Array();
    mixArray['prod_eol'] = new Array();
    mixArray['prod_gaz_centr'] = new Array();

    $('#price_nuclear').prop('value',config.DEFAULT_NUCL_PRICE) ;
    $('#price_gaz').prop('value',config.DEFAULT_GAZ_PRICE) ;
    $('#price_hydro').prop('value',config.DEFAULT_HYDRO_PRICE) ;
    $('#price_eolien').prop('value',config.DEFAULT_EOL_PRICE) ;
    $('#price_solar').prop('value',config.DEFAULT_SOLAR_PRICE) ;
    $('#price_import').prop('value',config.DEFAULT_IMPORT_PRICE) ;

    $('[id^="price_"]').change(function() {
        calculatePrice() ;
    }) ;
}) ;

function calculateMix() {

    for (var i = 1960; i <= 2050; i++) {

        var indexYear = globalArray['years'].indexOf(i) ;
        var totalYear = globalArray['prod_nucl'][indexYear] +
                        globalArray['prod_hydro_acc'][indexYear] +
                        globalArray['prod_hydro_fil'][indexYear] +
                        globalArray['prod_solar'][indexYear] +
                        globalArray['prod_eol'][indexYear] +
                        globalArray['prod_gaz_centr'][indexYear] ;

        mixArray['prod_nucl'][indexYear] = globalArray['prod_nucl'][indexYear] / totalYear * 100 ;
        mixArray['prod_hydro_acc'][indexYear] = globalArray['prod_hydro_acc'][indexYear] / totalYear * 100 ;
        mixArray['prod_hydro_fil'][indexYear] = globalArray['prod_hydro_fil'][indexYear] / totalYear * 100 ;
        mixArray['prod_solar'][indexYear] = globalArray['prod_solar'][indexYear] / totalYear * 100 ;
        mixArray['prod_eol'][indexYear] = globalArray['prod_eol'][indexYear] / totalYear * 100 ;
        mixArray['prod_gaz_centr'][indexYear] = globalArray['prod_gaz_centr'][indexYear] / totalYear * 100 ;

       // console.log("Années : "+mixArray['years'][indexYear]+" Total : "+totalYear+". Hydro Acc : "+globalArray['prod_hydro_acc'][indexYear]+" % : "+mixArray['prod_hydro_acc'][indexYear]) ;
    }

    calculatePrice();
    calculatePollution() ;
}
function calculatePrice()
{
    var priceArray = new Array () ;

    var priceNucl = $('#price_nuclear').val() ;
    var priceHydroAcc = $('#price_hydro').val() ;
    var priceSolar = $('#price_solar').val() ;
    var priceEol = $('#price_eolien').val() ;
    var priceGaz = $('#price_gaz').val() ;
   // var priceImport = $('#price_import').val() ;


    for (var i = 1960; i <= 2050; i++) {
        var indexYear = globalArray['years'].indexOf(i) ;

        var weightedMean = (priceNucl*mixArray['prod_nucl'][indexYear] +
            priceHydroAcc*mixArray['prod_hydro_acc'][indexYear] +
            priceSolar*mixArray['prod_solar'][indexYear] +
            priceEol*mixArray['prod_eol'][indexYear] +
            priceGaz*mixArray['prod_gaz_centr'][indexYear])/100 ;

        weightedMean = Math.round(weightedMean*100)/100 ;
        priceArray.push(weightedMean) ;

    }

    price_chart.series[0].setData(priceArray,true) ;


}

function calculatePollution()
{
    var pollutionArray = new Array () ;

    for (var i = 1960; i <= 2050; i++) {
        var indexYear = globalArray['years'].indexOf(i) ;

        var weightedMean = (config.DEFAULT_NUCL_POLLUTION*mixArray['prod_nucl'][indexYear] +
            config.DEFAULT_HYDRO_POLLUTION*mixArray['prod_hydro_acc'][indexYear] +
            config.DEFAULT_SOLAR_POLLUTION*mixArray['prod_solar'][indexYear] +
            config.DEFAULT_EOL_POLLUTION*mixArray['prod_eol'][indexYear] +
            config.DEFAULT_GAZ_POLLUTION*mixArray['prod_gaz_centr'][indexYear])/100 ;

        weightedMean = Math.round(weightedMean*100)/100 ;
        pollutionArray.push(weightedMean) ;
    }

    pollution_chart.series[0].setData(pollutionArray,true) ;
}