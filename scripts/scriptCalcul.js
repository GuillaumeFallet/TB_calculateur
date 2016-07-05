/**
 * Created by Guillaume on 04.07.2016.
 */


function findRate(startValue,goal)
{
    goal = startValue + goal ;
    var delta = goal/startValue ;
    var diffYear = 2050-year+1;
    var test = Math.pow((1210/1000),1/2) ;
    console.log(test) ;
    
    if (config.DEFAULT_EXP_METHOD == true){
        var rate = Math.pow(Math.abs(delta), 1/diffYear);
        console.log("delta : "+delta+" diff années : "+diffYear)
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
            array[globalArray['years'].indexOf(i)] = Math.round(array[globalArray['years'].indexOf(i - 1)] * (1 + rate / 100));
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
