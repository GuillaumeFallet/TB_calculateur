/**
 * Created by Guillaume on 19.06.2016.
 */
$(function () {
    $("#newCentralButton").click(function() {

        console.log("button pressed") ; 
        
       var newRow =  $('#rowToClone').clone() ;
        newRow.addClass('showRow') ;
        $('#id_new_centrales_table').append(newRow) ;
    }) ;

}) ;