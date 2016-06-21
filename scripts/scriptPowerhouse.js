/**
 * Created by Guillaume on 19.06.2016.
 */

var countNew = 0 ;

$(function () {
    $("#newCentralButton").click(function() {
       countNew = countNew + 1 ;
       var $newRow =  $('#rowToClone').clone() ;
        $newRow.addClass('showRow') ;
        $('#id_new_centrales_table').append($newRow) ;

        $newRow.find('td').each(function() {
            var newID = $(this).attr('id')+'_'+countNew ;
            $(this).attr('id',newID) ;
        //    console.log($(this).attr('id')) ;
        }) ;
    }) ;

    $('body').on('change', '.changeNewType', function() {

        var type = this.value;
        var idRow = $(this).closest("td").attr("id");
        console.log(idRow) ;
        if (type=="nuclear")
        {
            console.log("nucl") ;
        }
        else if (type=="gaz")
        {
            console.log("gaz") ;
        }

    }) ;


}) ;