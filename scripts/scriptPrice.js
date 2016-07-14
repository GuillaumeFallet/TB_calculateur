/**
 * Created by Guillaume on 26.06.2016.
 */
var pollutionArray = [] ;
var pollutionTotalArray = [] ;

$(function () {

    // function declaration of the array containing the mix of energies
    mixArray = [];
    mixArray['years'] = years;
    mixArray['prod_nucl'] =  [];
    mixArray['prod_hydro'] = [];
    mixArray['prod_solar'] = [];
    mixArray['prod_eol'] = [];
    mixArray['prod_therm'] = [];
    mixArray['prod_gaz_centr'] = [];
    mixArray['import'] = [];

    $('#price_nuclear').prop('value',config.DEFAULT_NUCL_PRICE) ;
    $('#price_gaz').prop('value',config.DEFAULT_GAZ_PRICE) ;
    $('#price_hydro').prop('value',config.DEFAULT_HYDRO_PRICE) ;
    $('#price_eolien').prop('value',config.DEFAULT_EOL_PRICE) ;
    $('#price_solar').prop('value',config.DEFAULT_SOLAR_PRICE) ;
    $('#price_geotherm').prop('value',config.DEFAULT_GEOTHERM_PRICE) ;
    $('#price_import').prop('value',config.DEFAULT_IMPORT_PRICE) ;

    $('[id^="price_"]').change(function() {
        calculatePrice() ;
    }) ;

    $('#price_chart_modifier').change(function() {

        var value = $(this).val() ;
        if (value=="mchf")
        {
            $('#container_price_chart').css('display','none') ;
            $('#container_priceTotal_chart').css('display','inline-block') ;
        }
        else if (value=="ctkhw")
        {
            $('#container_priceTotal_chart').css('display','none') ;
            $('#container_price_chart').css('display','inline-block') ;

        }

    }) ;
    $('#pollution_chart_modifier').change(function() {
        var value = $(this).val() ;
        if (value=="tons")
        {
            $('#container_pollution_chart').css('display','none') ;
            $('#container_pollutionTotal_chart').css('display','inline-block') ;
        }
        else if (value=="gkwh")
        {
            $('#container_pollutionTotal_chart').css('display','none') ;
            $('#container_pollution_chart').css('display','inline-block') ;

        }

    }) ;
}) ;

// function to calculate the mix of energies
function calculateMix() {

    for (var i = 1960; i <= 2050; i++) {

        var indexYear = globalArray['years'].indexOf(i) ;
        var totalYear = globalArray['prod_nucl'][indexYear] +
            globalArray['prod_hydro'][indexYear] +
            globalArray['prod_therm'][indexYear] +
            globalArray['prod_solar'][indexYear] +
            globalArray['prod_eol'][indexYear] +
            globalArray['prod_gaz_centr'][indexYear] ;

        mixArray['prod_nucl'][indexYear] = globalArray['prod_nucl'][indexYear] / totalYear * 100 ;
        mixArray['prod_hydro'][indexYear] = globalArray['prod_hydro'][indexYear] / totalYear * 100 ;
        mixArray['prod_therm'][indexYear] = globalArray['prod_therm'][indexYear] / totalYear * 100 ;
        mixArray['prod_solar'][indexYear] = globalArray['prod_solar'][indexYear] / totalYear * 100 ;
        mixArray['prod_eol'][indexYear] = globalArray['prod_eol'][indexYear] / totalYear * 100 ;
        mixArray['prod_gaz_centr'][indexYear] = globalArray['prod_gaz_centr'][indexYear] / totalYear * 100 ;

    }

    // call the pollution method, ignoring the imported energy
    calculatePollution() ;


    // calculate the mix once more, this time using the imported energy
    for (var i = 1960; i <= 2050; i++) {

        var indexYear = globalArray['years'].indexOf(i) ;
        var totalYear = globalArray['prod_nucl'][indexYear] +
            globalArray['prod_hydro'][indexYear] +
            globalArray['prod_therm'][indexYear] +
            globalArray['prod_solar'][indexYear] +
            globalArray['prod_eol'][indexYear] +
            globalArray['prod_gaz_centr'][indexYear] ;

        var totalImport = parseInt(globalArray['conso'][indexYear] - totalYear) ;

        if(totalImport>0)
        {
            totalYear = totalYear + totalImport;
            mixArray['import'][indexYear] = totalImport / totalYear * 100 ;
        }
        else
        {
            mixArray['import'][indexYear] = 0 ;
        }


        mixArray['prod_nucl'][indexYear] = globalArray['prod_nucl'][indexYear] / totalYear * 100 ;
        mixArray['prod_hydro'][indexYear] = globalArray['prod_hydro'][indexYear] / totalYear * 100 ;
        mixArray['prod_therm'][indexYear] = globalArray['prod_therm'][indexYear] / totalYear * 100 ;
        mixArray['prod_solar'][indexYear] = globalArray['prod_solar'][indexYear] / totalYear * 100 ;
        mixArray['prod_eol'][indexYear] = globalArray['prod_eol'][indexYear] / totalYear * 100 ;
        mixArray['prod_gaz_centr'][indexYear] = globalArray['prod_gaz_centr'][indexYear] / totalYear * 100 ;

    }
    // call price method
    calculatePrice();

}


// calculate the price of the futur energy using the mix (with import)
function calculatePrice()
{
    var priceArray = [] ;
    var priceArrayTotal = [] ;

    var priceNucl = [] ;
    var priceNuclRate = $('#price_nuclear_evolution').val() ;
    priceNucl[globalArray['years'].indexOf(year)] = $('#price_nuclear').val() ;

    var priceHydro = [] ;
    var priceHydroRate = $('#price_hydro_evolution').val() ;
    priceHydro[globalArray['years'].indexOf(year)] = $('#price_hydro').val() ;

    var priceSolar = [] ;
    var priceSolarRate = $('#price_solar_evolution').val() ;
    priceSolar[globalArray['years'].indexOf(year)] = $('#price_solar').val() ;

    var priceEol = [] ;
    var priceEolRate = $('#price_eolien_evolution').val() ;
    priceEol[globalArray['years'].indexOf(year)] = $('#price_eolien').val() ;

    var priceGaz = [] ;
    var priceGazRate = $('#price_gaz_evolution').val() ;
    priceGaz[globalArray['years'].indexOf(year)] = $('#price_gaz').val() ;

    var priceGeotherm = [] ;
    var priceGeothermRate = $('#price_geotherm_evolution').val() ;
    priceGeotherm[globalArray['years'].indexOf(year)] = $('#price_geotherm').val() ;

    var priceImport = [] ;
    var priceImportRate = $('#price_import_evolution').val() ;
    priceImport [globalArray['years'].indexOf(year)] = $('#price_import').val() ;

    for (var i = year+1 ; i <=2050 ; i ++)
    {
        var indexYear = globalArray['years'].indexOf(i) ;

        priceNucl[indexYear] = priceNucl[indexYear-1] * (1 + priceNuclRate / 100);
        priceHydro[indexYear] = priceHydro[indexYear-1] * (1 + priceHydroRate / 100);
        priceSolar[indexYear] = priceSolar[indexYear-1] * (1 + priceSolarRate / 100);
        priceEol[indexYear] = priceEol[indexYear-1] * (1 + priceEolRate / 100);
        priceGaz[indexYear] = priceGaz[indexYear-1] * (1 + priceGazRate / 100);
        priceGeotherm[indexYear] = priceGeotherm[indexYear-1] * (1 + priceGeothermRate / 100);
        priceImport[indexYear] = priceImport[indexYear-1] * (1 + priceImportRate / 100);
    }

    var max = 0 ;
    var min = 100000 ;
    var total = 0 ;
    var yearMax = 0 ;
    var yearMin = 0 ;

    for (var i = year; i <= 2050; i++) {
        //console.log(mixArray['prod_hydro'][indexYear]) ;
        var indexYear = globalArray['years'].indexOf(i) ;
        var weightedMean = (
                priceNucl[indexYear]*mixArray['prod_nucl'][indexYear] +
                priceHydro[indexYear]*mixArray['prod_hydro'][indexYear] +
                priceSolar[indexYear]*mixArray['prod_solar'][indexYear] +
                priceEol[indexYear]*mixArray['prod_eol'][indexYear] +
                priceGaz[indexYear]*mixArray['prod_gaz_centr'][indexYear] +
                priceGeotherm[indexYear]*mixArray['prod_therm'][indexYear] +
                priceImport[indexYear]*mixArray['import'][indexYear]
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
        priceArrayTotal.push(Math.round(weightedMean*globalArray['conso'][indexYear]/100)/1000)
    }

    var avg = total/(2050-year+1) ;
    avg = Math.round(avg*100)/100 ;
    $('#label_elec_min').html(min+" ( année : "+yearMin+" )") ;
    $('#label_elec_max').html(max+" ( année : "+yearMax+" )") ;
    $('#label_elec_avg').html(avg) ;
    price_chart.series[0].setData(priceArray,true) ;
    priceTotal_chart.series[0].setData(priceArrayTotal,true) ;


}

// calculate the pollution of the futur energy using the mix (without import)
function calculatePollution()
{
    var pollutionArray = [] ;
    var pollutionTotalArray = [] ;
    var max = 0 ;
    var min = 100000 ;
    var total = 0 ;
    var yearMax = 0 ;
    var yearMin = 0 ;

    for (var i = year; i <= 2050; i++) {
        var indexYear = globalArray['years'].indexOf(i) ;

        var weightedMean = (config.DEFAULT_NUCL_POLLUTION*mixArray['prod_nucl'][indexYear] +
            config.DEFAULT_HYDRO_POLLUTION*mixArray['prod_hydro'][indexYear] +
            config.DEFAULT_SOLAR_POLLUTION*mixArray['prod_solar'][indexYear] +
            config.DEFAULT_EOL_POLLUTION*mixArray['prod_eol'][indexYear] +
            config.DEFAULT_GAZ_POLLUTION*mixArray['prod_gaz_centr'][indexYear] +
            config.DEFAULT_GEOTHERM_POLLUTION*mixArray['prod_therm'][indexYear])/100 ;

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
        pollutionTotalArray.push(Math.round(weightedMean*globalArray['prod'][indexYear]/10)/100 )

    }

    var avg = total/(2050-year+1) ;
    avg = Math.round(avg*100)/100 ;
    $('#label_poll_min').html(min+" ( année : "+yearMin+" )") ;
    $('#label_poll_max').html(max+" ( année : "+yearMax+" )") ;
    $('#label_poll_avg').html(avg) ;



    pollution_chart.series[0].setData(pollutionArray,true) ;
    pollutionTotal_chart.series[0].setData(pollutionTotalArray,true) ;
}
