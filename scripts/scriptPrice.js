/**
 * Created by Guillaume on 26.06.2016.
 */



function calculateMix() {
    var mixArray = new Array();
    mixArray['years'] = years;
    mixArray['prod_nucl'] =  new Array();
    mixArray['prod_hydro_acc'] = new Array();
    mixArray['prod_hydro_fil'] = new Array();
    mixArray['prod_solar'] = new Array();
    mixArray['prod_eol'] = new Array();
    mixArray['prod_gaz_centr'] = new Array();


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

}
function calculatePrice()
{

}

function calculatePollution()
{

}