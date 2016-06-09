/**
 * Created by Pydd on 06.06.2016.
 */

var currentTime = new Date();
var year = currentTime.getFullYear() ;
var nucl_chart  ;
var consoprod_chart ;
var array_diff_past = [] ;

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
            newValue = min ;
        }
        else if (value > max) {
            newValue = max ;
        }
        $(this).prop("value",newValue) ;
        $('#stopdate_'+splitid[1]).prop("value",parseFloat($('#constructYear_'+splitid[1]).text()) + newValue) ;
        calculateNuclProd() ;
    });

    $('.input_stopdate').change(function(event){
        var id = jQuery(this).attr("id");
        var splitid = id.split("_") ;


        var value =  parseFloat($(this).val()) ;
        var min = parseFloat($(this).attr("min")) ;
        var max = parseFloat($(this).attr("max")) ;
        var newValue = value ;
        if( value < min) {
            newValue = min ;
        }
        else if (value > max) {
            newValue = max ;
        }

        $(this).prop("value",newValue) ;
        $('#lifetime_'+splitid[1]).prop("value",parseFloat(newValue - parseFloat($('#constructYear_'+splitid[1]).text()))) ;
        calculateNuclProd() ;

    });
}) ;

function calculateNuclProd()
{
    var new_nucl_prod = Array.apply(null, Array(18)).map(Number.prototype.valueOf,0);

    $('#id_nuclear_table > tbody').find('tr').each(function (i, el) {
        var $tds = $(this).find('td') ;

        for(var i = 0 ; i < 18 ; i ++)
        {
            if (i+year+1 < $tds.eq(4).find("input").val())
            {
              new_nucl_prod[i] += parseInt($tds.eq(6).text()) ;
          //    console.log("année "+(i+year)+". La centrale de "+$tds.eq(0).text()+" produit encore") ;
            }

        }

    });
    var array_diff_futur = [];


    for (var i = 0 ; i < conso_futur.length ; i ++)
    {
        // console.log((prod_hydro_past[i]+prod_nucl_past[i]+prod_therm_past[i])-conso_past[i]) ;
        array_diff_futur.push(prod_hydro_futur[i]+new_nucl_prod[i]+prod_therm_futur[i]-conso_futur[i])
    }

    nucl_chart.series[2].setData(prod_nucl_past.concat(new_nucl_prod),true) ;
    consoprod_chart.series[0].setData(array_diff_past.concat((array_diff_futur)),true) ;
}

$(function () {
        nucl_chart  = new Highcharts.Chart({
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
            },
            labels: {
                formatter: function () {
                    return this.value / 1000;
                }
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
        series: [{
            marker: {
                symbol: 'circle'
            },
            name: 'Hydraulique',
            data: prod_hydro_past.concat(prod_hydro_futur),
            symbol: 'circle',
            stacking: 'normal'
        },{
            marker: {
                symbol: 'circle'
            },
            name: 'Thermique',
            data: prod_therm_past.concat(prod_therm_futur),
            stacking: 'normal'
        }, {
            marker: {
                symbol: 'circle'
            },
            name: 'Nucléaire',
            color : '#D7DF01',
            data: prod_nucl_past.concat(prod_nucl_futur),
            stacking: 'normal'
        }, {
            marker: {
                symbol: 'circle'
            },
            name: 'Consommation',
            data: conso_past.concat(conso_futur),
            color: '#DF0101',
            type: 'line'

        }]

    });


    var array_diff_futur = [];
    for (var i = 0 ; i < conso_past.length ; i ++)
    {
       // console.log((prod_hydro_past[i]+prod_nucl_past[i]+prod_therm_past[i])-conso_past[i]) ;
        array_diff_past.push(prod_hydro_past[i]+prod_nucl_past[i]+prod_therm_past[i]-conso_past[i])
    }
    for (var i = 0 ; i < conso_futur.length ; i ++)
    {
        // console.log((prod_hydro_past[i]+prod_nucl_past[i]+prod_therm_past[i])-conso_past[i]) ;
        array_diff_futur.push(prod_hydro_futur[i]+prod_nucl_futur[i]+prod_therm_futur[i]-conso_futur[i])
    }

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
            data: array_diff_past.concat(array_diff_futur)
        }]
    });
});
