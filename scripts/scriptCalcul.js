/**
 * Created by Guillaume on 04.07.2016.
 */


function findRate(startValue,goal)
{
    goal = startValue + goal ;
    var delta = goal/startValue ;
    var diffYear = 2050-year+2;
    var power = 1/diffYear
 ;
 //  console.log("delta : "+delta+" diff années : "+diffYear)
    if (config.DEFAULT_EXP_METHOD == true){
        console.log("delta : "+delta+" diff années : "+diffYear)
        var rate = Math.pow(delta,power);
        console.log(rate) ;
        return rate
    }
    else {
        var percenttotal = goal/startValue*100-100 ;
        var rate = percenttotal/ diffYear ;
      //  rate = Math.round(rate*10)/10 ;
        return rate ;
    }
    

}


function applyRate(array,rate)
{

    if (config.DEFAULT_EXP_METHOD == true){
        for(var i = year-1 ; i <= 2050 ; i ++) {
            array[globalArray['years'].indexOf(i)] = Math.round(array[globalArray['years'].indexOf(i - 1)] * rate );
        }
    }
    else {
        var today = array[globalArray['years'].indexOf(year-2)];
        var j = 1 ;
        for(var i = year-1 ; i <= 2050 ; i ++)
        {
            array[globalArray['years'].indexOf(i)] =Math.round(today/100*(100+rate*j)) ;
            j ++ ;
        }
    }

  //  return array ;
}
