/**
 * Created by Pydd on 13.07.2016.
 */
$(function () {

    // fill the dropdown list with each consumption scenario
    $(consScenariiArray).each(function() {
        $('#selectConsScen').append($("<option>").attr('value',this.id).text(this.text));
    });

    // fill the dropdown list with each production scenario
    $(prodScenariiArray).each(function() {
        $('#selectProdScen').append($("<option>").attr('value',this.id).text(this.text));
    });

    // event listener when a consumption scenario is selected
    $('#selectConsScen').change(function() {
        var id = $(this).val();
        $('#evolution_conso').attr('value',consScenariiArray[id].cons) ;
        $('#evolution_conso').trigger("change");
    }) ;

    // event listener when a production scenario is selected
    $('#selectProdScen').change(function() {
        var id = $(this).val();
        $('#evolution_hydro_goal').val(prodScenariiArray[id].hydro) ;
        $('#rangeHydro').val('+ '+prodScenariiArray[id].hydro+' TWh') ;
        $('#evolution_solar_goal').val(prodScenariiArray[id].solar)
        $('#rangeSolar').val('+ '+prodScenariiArray[id].solar+' TWh') ;;
        $('#evolution_eolien_goal').val(prodScenariiArray[id].eol) ;
        $('#rangeEol').val('+ '+prodScenariiArray[id].eol+' TWh') ;
        $('#evolution_geoth_goal').val(prodScenariiArray[id].geoth) ;
        $('#rangeGeoth').val('+ '+prodScenariiArray[id].geoth+' TWh') ;

        $('#evolution_hydro_goal').trigger("change") ;

    }) ;


    // when the export button is pressed, fill a textarea with the content of global arrays then make it visible
    $('#idButtonExport').click(function() {

        $('#idExportArea').css('display','inline-block') ;
        $('#idExportArea').val('années : { ') ;
        $('#idExportArea').val($('#idExportArea').val() + globalArray['years'].join(',')) ;
        $('#idExportArea').val( $('#idExportArea').val() + '} ;') ;

        $('#idExportArea').val($('#idExportArea').val() + '\nproduction nucléaire : { ') ;
        $('#idExportArea').val($('#idExportArea').val() + globalArray['prod_nucl'].join(',')) ;
        $('#idExportArea').val( $('#idExportArea').val() + '} ;') ;

        $('#idExportArea').val($('#idExportArea').val() + '\nproduction hydroélectrique  : { ') ;
        $('#idExportArea').val($('#idExportArea').val() + globalArray['prod_hydro'].join(',')) ;
        $('#idExportArea').val( $('#idExportArea').val() + '} ;') ;

        $('#idExportArea').val($('#idExportArea').val() + '\nproduction solaire : { ') ;
        $('#idExportArea').val($('#idExportArea').val() + globalArray['prod_solar'].join(',')) ;
        $('#idExportArea').val( $('#idExportArea').val() + '} ;') ;

        $('#idExportArea').val($('#idExportArea').val() + '\nproduction éolienne : { ') ;
        $('#idExportArea').val($('#idExportArea').val() + globalArray['prod_eol'].join(',')) ;
        $('#idExportArea').val( $('#idExportArea').val() + '} ;') ;

        $('#idExportArea').val($('#idExportArea').val() + '\nproduction géothermique : { ') ;
        $('#idExportArea').val($('#idExportArea').val() + globalArray['prod_therm'].join(',')) ;
        $('#idExportArea').val( $('#idExportArea').val() + '} ;') ;

        $('#idExportArea').val($('#idExportArea').val() + '\nproduction à gaz : { ') ;
        $('#idExportArea').val($('#idExportArea').val() + globalArray['prod_gaz_centr'].join(',')) ;
        $('#idExportArea').val( $('#idExportArea').val() + '} ;') ;

        $('#idExportArea').val($('#idExportArea').val() + '\nconsommation : { ') ;
        $('#idExportArea').val($('#idExportArea').val() + globalArray['conso'].join(',')) ;
        $('#idExportArea').val( $('#idExportArea').val() + '} ;') ;

        $('#idButtonCopy').css('display','inline-block') ;


    }) ;

    // when the copy button is clicked, copy the content of the textarea in the clipboard
    $('#idButtonCopy').click(function() {

        $('#idExportArea').select() ;
        document.execCommand('copy');
    }) ;

});