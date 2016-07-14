/**
 * Created by Pydd on 06.06.2016.
 */
var currentTime = new Date();
var year = currentTime.getFullYear() ;


var globalArray  ;

$(function (){

    // fill the nuclear table with the data of the "centrales" array situated in the centrale_nucl.js data file
    $.each(centrales,function(key,value)
    {
        var row = '<tr>' +
            '<td>'+value.name+'</td>' +
            '<td id="constructYear_'+key+'">'+value.constructYear+'</td>' +
            '<td>'+value.maxPower+'</td>' +
            '<td><form><input class="input_lifetime" id="lifetime_'+key+'" size="1" type="number" min="'+(year-value.constructYear)+'" max="100" value="'+value.lifetime+'"> années </input></form></td>' +
            '<td><form><input class="input_stopdate" id="stopdate_'+key+'" size="1" type="number" min="'+year+'" max="'+(value.constructYear+100)+'" value="'+value.stopdate+'"/></form></td>' +
            '<td>'+value.percent+'</td>' +
            '<td>'+value.production+'</td>' +
            '</tr>' ;
        $('#id_nuclear_table').append(row);
    }) ;

    // event listener when the user changes the lifetime of a centrale
    $('.input_lifetime').change(function(event){
        var id = jQuery(this).attr("id");
        var splitid = id.split("_") ;
        var value =  parseFloat($(this).val()) ;
        var min = parseFloat($(this).attr("min")) ;
        var max = parseFloat($(this).attr("max")) ;
        var newValue = value ;
        if( value < min) {
            errorInput($(this)) ;
            newValue = min ;
        }
        else if (value > max) {
            errorInput($(this)) ;
            newValue = max ;
        }
        $(this).prop("value",newValue) ;
        $('#stopdate_'+splitid[1]).prop("value",parseFloat($('#constructYear_'+splitid[1]).text()) + newValue) ;
        calculateProd() ;
    });

    // event listener when the user changes the stopdate of a centrale
    $('.input_stopdate').change(function(event){
        var id = jQuery(this).attr("id");
        var splitid = id.split("_") ;


        var value =  parseFloat($(this).val()) ;
        var min = parseFloat($(this).attr("min")) ;
        var max = parseFloat($(this).attr("max")) ;
        var newValue = value ;
        if( value < min) {
            errorInput($(this)) ;
            newValue = min ;
        }
        else if (value > max) {
            errorInput($(this)) ;
            newValue = max ;
        }

        $(this).prop("value",newValue) ;
        $('#lifetime_'+splitid[1]).prop("value",parseFloat(newValue - parseFloat($('#constructYear_'+splitid[1]).text()))) ;

        calculateProd() ;

    });

    // declaration of the global arrays
    globalArray = [] ;
    globalArray['years'] = years ;
    globalArray['prod_nucl'] = prod_nucl ;
    globalArray['prod_hydro'] =  prod_hydro ;
    globalArray['prod_therm'] = prod_therm ;
    globalArray['prod_solar'] = prod_solar ;
    globalArray['prod_eol'] = prod_eol ;
    globalArray['prod_gaz_centr'] = prod_gaz_centr ;
    globalArray['conso'] = conso ;

    // call of differents methods to initialize the calculator when it starts
    Drawcharts() ;
    changeFuturConsoChart(0) ;
    calculateProd() ;

}) ;

// method called to fill the background of an input with red, meaning there is an error
function errorInput(input)
{
    input.css({ "background": "red" });
    setTimeout(setNoBackground,3000,input);

    function setNoBackground(input)
    {
        input.css({ "background": "none" }) ;
    }

}

// method to calculate the nuclear and gaz production using all the data contained in the HTML tables.
function calculateNuclAndGazProd()
{
    for(var i = year-1 ; i <= 2050 ; i ++)
    {
        globalArray['prod_nucl'][globalArray['years'].indexOf(i)] = 0 ;
        globalArray['prod_gaz_centr'][globalArray['years'].indexOf(i)] = 0 ;
    }

    $('#id_nuclear_table > tbody').find('tr').each(function (i, el) {
        var $tds = $(this).find('td') ;

        for(var i = year-1 ; i <= 2050 ; i ++)
        {
            if (i < $tds.eq(4).find("input").val())
            {
                globalArray['prod_nucl'][globalArray['years'].indexOf(i)] += parseInt($tds.eq(6).text()) ;
            }
        }

    });

    $('#id_new_centrales_table > tbody').find('tr').each(function (i, el) {
        var $tds = $(this).find('td') ;
        var type = $tds.eq(0).find('select').val()  ;
        //   console.log(type) ;

        var newDate = $tds.eq(1).find("input").val();
        var endDate = parseInt($tds.eq(1).find("input").val()) + parseInt($tds.eq(2).find("input").val());
        //console.log(endDate) ;
        var prodPerYear = $tds.eq(3).find("input").val() * $tds.eq(4).find("input").val() / 1000;
        if (type=="nuclear") {
            for (var i = year - 1; i <= 2050; i++) {
                if (i > newDate && i < endDate) {
                    globalArray['prod_nucl'][globalArray['years'].indexOf(i)] += prodPerYear;
                }
            }

        }
        else if (type="gaz")
        {
            for (var i = year - 1; i <= 2050; i++) {
                if (i > newDate && i < endDate) {
                    globalArray['prod_gaz_centr'][globalArray['years'].indexOf(i)] += prodPerYear;
                }
            }
        }
    });



}



