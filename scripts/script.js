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
            text: 'Historic and Estimated Worldwide Population Growth by Region'
        },
        subtitle: {
            text: 'Source: Wikipedia.org'
        },
        xAxis: {
            categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Billions'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000;
                }
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' millions'
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
            name: 'Asia',
            data: [502, 635, 809, 947, 1402, 3634, 5268]
        }, {
            name: 'Africa',
            data: [106, 107, 111, 133, 221, 767, 1766]
        }, {
            name: 'Europe',
            data: [163, 203, 276, 408, 547, 729, 628]
        }, {
            name: 'America',
            data: [18, 31, 54, 156, 339, 818, 1201]
        }, {
            name: 'Oceania',
            data: [2, 2, 2, 6, 13, 30, 46]
        }]
    });
});