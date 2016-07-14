/**
 * Created by Guillaume on 04.07.2016.
 */

// function  to calculate the rate of progression given the goal
function findRate(startValue,goal)
{
    goal = startValue + goal ;
    var diffYear = 2050-year+1;
    var percenttotal = goal/startValue*100-100 ;
    var rate = percenttotal/ diffYear ;
    return rate ;
}

// function to apply a linear rate to an array, starting at year 2015.
function applyRateLin(array,rate)
{
    var today = array[globalArray['years'].indexOf(year-2)];
    var j = 1 ;
    for(var i = year-1 ; i <= 2050 ; i ++)
    {
        array[globalArray['years'].indexOf(i)] =Math.round(today/100*(100+rate*j)) ;
        j ++ ;
    }
}
// function to
function applyRateExp(array,rate)
{
    for(var i = year-1 ; i <= 2050 ; i ++) {
        array[globalArray['years'].indexOf(i)] = Math.round(array[globalArray['years'].indexOf(i - 1)] * (1 + rate / 100));
    }
}
// function to apply an exponential rate to an array, starting at year 2015
function applyGoal(array,goal)
{
    var diffYear = 2050-year+1;
    var today = array[globalArray['years'].indexOf(year-2)];

    var gainPerYear = goal/diffYear ;
    var j = 1 ;
    for(var i = year-1 ; i <= 2050 ; i ++)
    {
        array[globalArray['years'].indexOf(i)] =Math.round(today+(gainPerYear*j)) ;
        j ++ ;
    }
}
