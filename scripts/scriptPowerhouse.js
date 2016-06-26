/**
 * Created by Guillaume on 19.06.2016.
 */


var countNew = 0 ; // count the number of new centrals (used for the id's of the elements) 


$(function () {

    // event when the "nouvelle centrale" button is pressed
    $("#newCentralButton").click(function() {
       countNew = countNew + 1 ;
       var $newRow =  $('#rowToClone').clone() ;
        $newRow.addClass('showRow') ;
        $newRow.prop("id","newPlant_"+countNew);
        $('#id_new_centrales_table').append($newRow) ;
        $newRow.find('td').each(function() {
            var newID = $(this).attr('id')+'_'+countNew ;
            $(this).attr('id',newID) ;
        //    console.log($(this).attr('id')) ;
        }) ;
    }) ;
    // event when the "effacer" button is pressed
    $('body').on('click', '.deletePlantButton', function() {
        var idRow = $(this).closest("tr").attr("id") ;
        $('table#id_new_centrales_table tr#'+idRow).remove();
        calculateNuclAndGazProd() ;
    }) ;

    // event when the user choose the type of the new central
    $('body').on('change', '.changeNewType', function() {
        var type = this.value;
        var idRow = $(this).closest("td").attr("id").split('_')[1];
        var newDate ;
        var newLifetime ;
        var newPower ;
        var newUptime ;
        if (type=="nuclear")
        {
            newDate = year+7 ;
            newLifetime = 45 ;
            newPower = 1000 ;
            newUptime = 7000 ;
        }
        else if (type=="gaz")
        {
            newDate = year+3 ;
            newLifetime = 20 ;
            newPower = 400 ;
            newUptime = 4000 ;
        }

        $('#newDate_'+idRow).find('input').prop("value",newDate) ;
        $('#newLifetime_'+idRow).find('input').prop("value",newLifetime) ;
        $('#newPower_'+idRow).find('input').prop("value",newPower) ;
        $('#newUptime_'+idRow).find('input').prop("value",newUptime) ;
        $('#newDate_'+idRow).find('input').attr("readonly", false);
        $('#newLifetime_'+idRow).find('input').attr("readonly", false);
        $('#newPower_'+idRow).find('input').attr("readonly", false);
        $('#newUptime_'+idRow).find('input').attr("readonly", false);

        calculateNuclAndGazProd() ;
    }) ;

    // event when the user changes anything in the parameters of the new centrals
    $('body').on('change', '.changeNewPlantParam', function() {
        calculateNuclAndGazProd() ;
    }) ;

}) ;