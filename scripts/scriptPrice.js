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


    //var priceNucl = $('#price_nuclear').val() ;
    //var priceHydroAcc = $('#price_hydro').val() ;
    //var priceSolar = $('#price_solar').val() ;
    //var priceEol = $('#price_eolien').val() ;
    //var priceGaz = $('#price_gaz').val() ;

    var priceNucl = new Array() ;
    var priceNuclRate = $('#price_nuclear_evolution').val() ;
    priceNucl[globalArray['years'].indexOf(year)] = $('#price_nuclear').val() ;

    var priceHydroAcc = new Array() ;
    var priceHydroAccRate = $('#price_hydro_evolution').val() ;
    priceHydroAcc[globalArray['years'].indexOf(year)] = $('#price_hydro').val() ;

    var priceSolar = new Array() ;
    var priceSolarRate = $('#price_solar_evolution').val() ;
    priceSolar[globalArray['years'].indexOf(year)] = $('#price_solar').val() ;

    var priceEol = new Array() ;
    var priceEolRate = $('#price_eolien_evolution').val() ;
    priceEol[globalArray['years'].indexOf(year)] = $('#price_eolien').val() ;

    var priceGaz = new Array() ;
    var priceGazRate = $('#price_gaz_evolution').val() ;
    priceGaz[globalArray['years'].indexOf(year)] = $('#price_gaz').val() ;

    for (var i = year+1 ; i <=2050 ; i ++)
    {
        var indexYear = globalArray['years'].indexOf(i) ;

        priceNucl[indexYear] = priceNucl[indexYear-1] * (1 + priceNuclRate / 100);
        priceHydroAcc[indexYear] = priceHydroAcc[indexYear-1] * (1 + priceHydroAccRate / 100);
        priceSolar[indexYear] = priceSolar[indexYear-1] * (1 + priceSolarRate / 100);
        priceEol[indexYear] = priceEol[indexYear-1] * (1 + priceEolRate / 100);
        priceGaz[indexYear] = priceGaz[indexYear-1] * (1 + priceGazRate / 100);
    }

    var max = 0 ;
    var yearMax ;
    var min = 100000 ;
    var yearMin ;
    var total = 0 ;

    for (var i = year; i <= 2050; i++) {
        var indexYear = globalArray['years'].indexOf(i) ;
        var weightedMean = (
                priceNucl[indexYear]*mixArray['prod_nucl'][indexYear] +
                priceHydroAcc[indexYear]*mixArray['prod_hydro_acc'][indexYear] +
                priceSolar[indexYear]*mixArray['prod_solar'][indexYear] +
                priceEol[indexYear]*mixArray['prod_eol'][indexYear] +
                priceGaz[indexYear]*mixArray['prod_gaz_centr'][indexYear]
            )/100 ;

        weightedMean = Math.round(weightedMean*100)/100 ;
        if(weightedMean>max)
        {
            max = weightedMean ;
            yearMax = i ;
        }
        if (weightedMean<min)
        {
            min = weightedMean ;
            yearMin = i ;
        }
        total = total + weightedMean ;

        priceArray.push(weightedMean) ;
    }

    var avg = total/(2050-year+1) ;
    avg = Math.round(avg*100)/100 ;
    $('#label_elec_min').html(min+" (Année : "+yearMin+")") ;
    $('#label_elec_max').html(max+" (Année : "+yearMax+")") ;
    $('#label_elec_avg').html(avg) ;
    price_chart.series[0].setData(priceArray,true) ;


}

function calculatePollution()
{
    var pollutionArray = new Array () ;
    var max = 0 ;
    var yearMax ;
    var min = 100000 ;
    var yearMin ;
    var total = 0 ;

    for (var i = year; i <= 2050; i++) {
        var indexYear = globalArray['years'].indexOf(i) ;

        var weightedMean = (config.DEFAULT_NUCL_POLLUTION*mixArray['prod_nucl'][indexYear] +
            config.DEFAULT_HYDRO_POLLUTION*mixArray['prod_hydro_acc'][indexYear] +
            config.DEFAULT_SOLAR_POLLUTION*mixArray['prod_solar'][indexYear] +
            config.DEFAULT_EOL_POLLUTION*mixArray['prod_eol'][indexYear] +
            config.DEFAULT_GAZ_POLLUTION*mixArray['prod_gaz_centr'][indexYear])/100 ;

        weightedMean = Math.round(weightedMean*100)/100 ;
        if(weightedMean>max)
        {
            max = weightedMean ;
            yearMax = i ;
        }
        if (weightedMean<min)
        {
            min = weightedMean ;
            yearMin = i ;
        }
        total = total + weightedMean ;
        pollutionArray.push(weightedMean) ;
    }

    var avg = total/(2050-year+1) ;
    avg = Math.round(avg*100)/100 ;
    $('#label_poll_min').html(min+" (Année : "+yearMin+")") ;
    $('#label_poll_max').html(max+" (Année : "+yearMax+")") ;
    $('#label_poll_avg').html(avg) ;
    pollution_chart.series[0].setData(pollutionArray,true) ;
}