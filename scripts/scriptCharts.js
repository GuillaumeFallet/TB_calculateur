/**
 * Created by Pydd on 14.07.2016.
 */

var prod_chart  ;
var consoprod_chart ;
var pollution_chart ;
var price_chart ;

// function to draw the charts using the charts containers
function Drawcharts() {

    // first chart, containing the production
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
                name: 'Nucléaire',
                color : '#D7DF01',
                data: globalArray['prod_nucl'],
                stacking: 'normal'
            },{
                marker: {
                    enabled: false
                },
                name: 'Hydraulique',
                data: globalArray['prod_hydro'],
                symbol: 'circle',
                color: '#0033cc',
                stacking: 'normal'
            },
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
            }
            ,{
                marker: {
                    enabled: false
                },
                name: 'Gaz',
                data: globalArray['prod_gaz_centr'],
                symbol: 'circle',
                color: '#8888A2',
                stacking: 'normal'
            },{
                marker: {
                    enabled: false
                },
                name: 'Géo-thermique',
                data: globalArray['prod_therm'],
                symbol: 'circle',
                color: '#821F0A',
                stacking: 'normal'
            },
            {
                marker: {
                    enabled: false
                },
                name: 'Consommation',
                data: globalArray['conso'],
                color: '#DF0101',
                type: 'line'

            }]

    });


    // second chart, containing the production vers the consumption
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

    // third chart, split into 2, containing the price
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
                value: 0, // Value of where the line will appear
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

    priceTotal_chart  = new Highcharts.Chart({
        chart: {
            renderTo : container_priceTotal_chart
        },
        title: {
            text: 'Évolution du prix de l\x27électricité'
        },
        xAxis: {
            categories: futurYears,
            text: 'Années',
            plotLines: [{
                color: 'black', // Color value
                value: 0, // Value of where the line will appear
                width: 3, // Width of the line
                zIndex: 10
            }]
        },
        yAxis: {
            title: {
                text: 'Prix en millions de CHF'
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

    // fourth chart, split into 2, containing the pollution
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
                value: 0, // Value of where the line will appear
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
            data: [],
            marker: {
                enabled: false
            }
        }]
    });

    pollutionTotal_chart  = new Highcharts.Chart({
        chart: {
            renderTo : container_pollutionTotal_chart
        },
        title: {
            text: 'Évolution des émissions de CO2'
        },
        xAxis: {
            categories: futurYears,
            text: 'Années',
            plotLines: [{
                color: 'black', // Color value
                value: 0, // Value of where the line will appear
                width: 3, // Width of the line
                zIndex: 10
            }]
        },
        yAxis: {
            title: {
                text: 'Émissions de CO2 en tonnes de CO2'
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'black'
            }]

        },
        series: [{
            name: 'Émissions de CO2',
            data: [],
            marker: {
                enabled: false
            }
        }]
    });


}
