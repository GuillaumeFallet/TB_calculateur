/**
 * Created by Pydd on 06.06.2016.
 */
var currentTime = new Date();
var year = currentTime.getFullYear() ;
var prod_chart  ;
var consoprod_chart ;
var globalArray  ;

$(function (){

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
        calculateNuclAndGazProd() ;
    });

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

        calculateNuclAndGazProd() ;

    });


    globalArray = new Array() ;
    globalArray['years'] = years ;
    globalArray['prod_nucl'] = prod_nucl ;
    globalArray['prod_hydro_acc'] =  prod_hydro_acc ;
    globalArray['prod_hydro_fil'] = prod_hydro_fil ;
    globalArray['prod_solar'] = prod_solar ;
    globalArray['prod_eol'] = prod_eol ;
    globalArray['prod_gaz_centr'] = prod_gaz_centr ;
    globalArray['conso'] = conso ;

    Drawcharts() ;
    calculateNuclAndGazProd() ;
    calculateProd() ;
    changeFuturConsoChart(0) ;
}) ;

function errorInput(input)
{
    input.css({ "background": "red" });
    setTimeout(setNoBackground,3000,input);

    function setNoBackground(input)
    {
        input.css({ "background": "none" }) ;
    }

}

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

    updateProdChart() ;
    updateConsProdChart() ;

}



function Drawcharts() {
    prod_chart  = new Highcharts.Chart({
        chart: {
            renderTo : container_nucl_chart,
            type: 'area'
        },
        title: {
            text: 'Évolution de la production et de la consommation d\x27électricité'
        },
        subtitle: {
            text: 'Source: Statistique suisse de l\x27électricité 2014'
        },
        xAxis: {
            categories: years,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            },
            plotLines: [{
                color: 'black', // Color value
                value: year-1960, // Value of where the line will appear
                width: 3, // Width of the line
                zIndex: 10
            }]
        },
        yAxis: {
            title: {
                text: 'GWh'
            }
        },
        tooltip: {
            shared: true
        },
        plotOptions: {
            area: {
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [
            {
                marker: {
                    enabled: false
                },
                name: 'Solaire',
                data: globalArray['prod_solar'],
                symbol: 'circle',
                color: '#ff9933',
                stacking: 'normal'
            },{
                marker: {
                    enabled: false
                },
                name: 'Eolien',
                data: globalArray['prod_eol'],
                symbol: 'circle',
                color: '#00ff00',
                stacking: 'normal'
            }, {
                marker: {
                    enabled: false
                },
                name: 'Hydraulique',
                data: globalArray['prod_hydro_acc'],
                symbol: 'circle',
                color: '#0033cc',
                stacking: 'normal'
            },{
                marker: {
                    enabled: false
                },
                name: 'Gaz',
                data: globalArray['prod_gaz_centr'],
                stacking: 'normal'
            }, {
                marker: {
                    enabled: false
                },
                name: 'Nucléaire',
                color : '#D7DF01',
                data: globalArray['prod_nucl'],
                stacking: 'normal'
            }, {
                marker: {
                    enabled: false
                },
                name: 'Consommation',
                data: globalArray['conso'],
                color: '#DF0101',
                type: 'line'

            }]

    });

    consoprod_chart  = new Highcharts.Chart({
        chart: {
            renderTo : container_cons_prod_chart
        },
        title: {
            text: 'Différence entre consommation et production'
        },
        subtitle: {
            text: 'Source: Statistique suisse de l\x27électricité 2014'
        },
        xAxis: {
            categories: years,
            text: 'Années',
            plotLines: [{
                color: 'black', // Color value
                value: year-1960, // Value of where the line will appear
                width: 3, // Width of the line
                zIndex: 10
            }]
        },
        yAxis: {
            title: {
                text: 'Difference (GWh)'
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'black'
            }]

        },
        series: [{
            name: 'Différence entre consommation et production',
            data: [] ,
            marker: {
                enabled: false
            }
        }]
    });

    price_chart  = new Highcharts.Chart({
        chart: {
            renderTo : container_price_chart
        },
        title: {
            text: 'Évolution du prix de l\x27électricité'
        },
        xAxis: {
            categories: futurYears,
            text: 'Années',
            plotLines: [{
                color: 'black', // Color value
                value: year-1960, // Value of where the line will appear
                width: 3, // Width of the line
                zIndex: 10
            }]
        },
        yAxis: {
            title: {
                text: 'Prix en ct./kWh'
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'black'
            }]

        },
        series: [{
            name: 'Prix de l\x27électricité',
            data: [] ,
            marker: {
                enabled: false
            }
        }]
    });

    pollution_chart  = new Highcharts.Chart({
        chart: {
            renderTo : container_pollution_chart
        },
        title: {
            text: 'Évolution des émissions de CO2'
        },
        xAxis: {
            categories: futurYears,
            text: 'Années',
            plotLines: [{
                color: 'black', // Color value
                value: year-1960, // Value of where the line will appear
                width: 3, // Width of the line
                zIndex: 10
            }]
        },
        yAxis: {
            title: {
                text: 'Émissions de CO2 en g de CO2/kWh'
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'black'
            }]

        },
        series: [{
            name: 'Émissions de CO2',
            data: [] ,
            marker: {
                enabled: false
            }
        }]
    });


}
