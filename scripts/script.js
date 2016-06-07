/**
 * Created by Pydd on 06.06.2016.
 */



$(function (){
  $.each(centrales,function(key,value)
    {
        var row = '<tr>' +
            '<td>'+value.name+'</td>' +
            '<td id="constructYear_'+key+'">'+value.constructYear+'</td>' +
            '<td>'+value.maxPower+'</td>' +
            '<td><form><input class="input_lifetime" id="lifetime_'+key+'" size="1" type="number" min="0" max="100" value="'+value.lifetime+'"> années </form></td>' +
            '<td><form><input class="input_stopdate" id="stopdate_'+key+'" size="1" type="number" min="2016" max="2100" value="'+value.stopdate+'"></form></td>' +
            '<td>'+value.percent+'</td>' +
            '<td>'+value.production+'</td>' +
            '</tr>' ;
        $('#id_nuclear_table').append(row);
    }) ;

    $('.input_lifetime').change(function(event){
        var id = jQuery(this).attr("id");
        var splitid = id.split("_") ;
       $('#stopdate_'+splitid[1]).attr("value",parseFloat($('#constructYear_'+splitid[1]).text()) + parseFloat($('#lifetime_'+splitid[1]).val())) ;
    });

    $('.input_stopdate').change(function(event){
        var id = jQuery(this).attr("id");
        var splitid = id.split("_") ;
        $('#lifetime_'+splitid[1]).attr("value",parseFloat($('#stopdate_'+splitid[1]).val()) - parseFloat($('#constructYear_'+splitid[1]).text())) ;

    });
}) ;



$(function () {
    $('#container').highcharts({
        chart: {
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
            }
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
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: 'Hydraulique',
            data: prod_hydro
        }, {
            name: 'Nucléaire',
            color : '#D7DF01',
            data: prod_nucl
        }, {
            name: 'Thermique',
            data: prod_therm
        },/* {
            name: 'Consommation',
            data: conso
        }*/]
    });
});