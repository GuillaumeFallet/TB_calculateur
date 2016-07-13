/**
 * Created by Pydd on 13.07.2016.
 */
$(function () {

    $(consScenariiArray).each(function() {
        $('#selectConsScen').append($("<option>").attr('value',this.id).text(this.text));
    });

    $(prodScenariiArray).each(function() {
        $('#selectProdScen').append($("<option>").attr('value',this.id).text(this.text));
    });




    $('#selectConsScen').change(function() {
        var id = $(this).val();
        $('#evolution_conso').attr('value',consScenariiArray[id].cons) ;
        $('#evolution_conso').trigger("change");
    }) ;


    $('#selectProdScen').change(function() {
        var id = $(this).val();
        $('#evolution_hydro_goal').val(prodScenariiArray[id].hydro) ;
        $('#rangeHydro').val('+ '+prodScenariiArray[id].hydro+' TWh') ;
        $('#evolution_solar_goal').val(prodScenariiArray[id].solar)
        $('#rangeSolar').val('+ '+prodScenariiArray[id].solar+' TWh') ;;
        $('#evolution_eolien_goal').val(prodScenariiArray[id].eol) ;
        $('#rangeEol').val('+ '+prodScenariiArray[id].eol+' TWh') ;

        $('#evolution_hydro_goal').trigger("change") ;

    }) ;
});