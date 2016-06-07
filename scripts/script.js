/**
 * Created by Pydd on 06.06.2016.
 */



$(function (){
  $.each(centrales,function(key,value)
    {
        var row = '<tr>' +
            '<td>'+value.name+'</td>' +
            '<td>'+value.constructYear+'</td>' +
            '<td>'+value.maxPower+'</td>' +
            '<td><form><input id="id_lifetime_'+key+'" size="1" type="number" min="0" max="100" value="'+value.lifetime+'"> années </form></td>' +
            '<td><form><input id="id_stopdate_'+key+'" size="1" type="number" min="2016" max="2100" value="'+value.stopdate+'"></form></td>' +
            '<td>'+value.percent+'</td>' +
            '<td>'+value.production+'</td>' +
            '</tr>' ;
        $('#id_nuclear_table').append(row);
        console.log(row);
    }) ;

    $('input').change(function(event){
        var obj = jQuery(this).attr("id");
        console.log(obj);
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